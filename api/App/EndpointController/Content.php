<?php

namespace App\EndpointController;

/**
 * Class Content
 * 
 * This endpoint connects to the database and returns
 * the title, abstract, author name, and type of
 * each item of content requested.
 * The endpoint supports two optional type and page parameters
 * that limit the items of content returned to those
 * of the specified type and page. Each page contains
 * 20 items of content. Non-numeric or negative values
 * will throw an error.
 * 
 * Access to this endpoint is limited to GET requests
 * which is inherited from its parent class.
 * 
 * @return array of JSON content objects with title, abstract, 
 * author name, and type name in JSON format
 * 
 * @param string type
 * @param int page
 * @throws object ClientError
 * 
 * @author Ghulam Hassan Hassani <w20017074@northumbria.ac.uk>
 */

use App\Request;
use App\Database;
use App\ClientError;

class Content extends Endpoint
{
    private $db;
    private $sql = "SELECT content.id as content_id, type.name as type_name, 
        content.title as content_title, 
        content.abstract as content_abstract
        FROM content
        JOIN type on content.type = type.id";
    private $sqlParams = [];
    private $allowedParams = ["type", "page"];
    private $allowedMethods = ["GET"];

    public function __construct()
    {
        $this->checkAllowedMethod(Request::method(), $this->allowedMethods);
        $this->db = new Database(DB_PATH);
        $this->initialiseSQL();
        $this->data = $this->db->executeSQL($this->sql, $this->sqlParams);
        parent::__construct($this->data);
    }

    public function initialiseSQL()
    {
        $this->checkAllowedParams(Request::params(), $this->allowedParams);
        $type = Request::params()['type'] ?? null;
        $page = Request::params()['page'] ?? null;

        if (is_string($type)) {
            $type = $this->sanitiseString($type);
            $type = $this->normaliseString($type);
        }

        if ($page !== null) {
            if (is_numeric($page)) {
                $page = $this->sanitiseNum($page);
                if ($page < 1) {
                    throw new ClientError(422);
                }
            } else {
                throw new ClientError(422);
            }
        }

        if ($type !== null) {
            $this->sql .= " WHERE type.name = :type";
            $this->sqlParams[':type'] = $type;
        }

        if ($page !== null) {
            $pageSize = 20;
            $offset = ($page - 1) * $pageSize;
            $this->sql .= " LIMIT " . $pageSize . " OFFSET " . $offset;
        }
    }
}
