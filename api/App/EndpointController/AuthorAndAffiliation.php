<?php

namespace App\EndpointController;

/**
 * Authors and their affiliation.
 * 
 * This endpoint returns the country, 
 * city, and institution each author is affiliated
 * with for each publication they are associated
 * with. For each of these affiliations, the author id,
 * author name, content id, and content name 
 * should also be returned. Note that authors can 
 * have more than one affiliation for each item 
 * of content and that authors can have different 
 * affiliations on different items of content. 
 * Therefore, authors may have multiple 
 * records returned by this endpoint.
 * 
 * @param number content
 * @param string country 
 * 
 * @author H Hassani <w20017074>
 * 
 */

use App\{
    Request,
    Database,
    ClientError
};

class AuthorAndAffiliation extends Endpoint
{
    private $db;
    private $sql = 'SELECT content.id as content_id, content.title as contenet_title, author.id as author_id, author.name as author_name, 
        affiliation.country as country, affiliation.city as city, 
        affiliation.institution as institution 
        FROM author
        JOIN affiliation on author.id = affiliation.author
        JOIN content on content.id = affiliation.content';
    private $sqlParams = [];
    private $allowedParams = ["content", "country"];
    private $allowedMethods = ["GET"];

    public function __construct()
    {
        $this->checkAllowedMethod(Request::method(), $this->allowedMethods);
        $this->checkAllowedParams(Request::params(), $this->allowedParams);
        $this->initialiseSQL();
        $this->db = new Database(DB_PATH);
        $data = $this->db->executeSQL($this->sql, $this->sqlParams);
        parent::__construct($data);
    }

    protected function initialiseSQL()
    {
        $this->checkAllowedParams(Request::params(), $this->allowedParams);
        $contentId = Request::params()['content'] ?? null;
        $country = Request::params()['country'] ?? null;
        $normalisedCountry = $this->normaliseString($country);

        $validatedContentId = null;
        if ($contentId) {
            $validatedContentId = $this->validateNumParam($contentId);
        }

        if (isset($validatedContentId) && isset($normalisedCountry)) {
            throw new ClientError(422);
        }

        if (isset($validatedContentId)) {
            $this->sql .= " WHERE affiliation.content =" . $validatedContentId;
        } else if (isset($normalisedCountry)) {
            $this->sql .= " WHERE affiliation.country ='" . $normalisedCountry . "'";
        }
    }
}
