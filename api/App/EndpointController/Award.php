<?php

namespace App\EndpointController;




use App\Request;
use App\Database;

class Award extends Endpoint{
    private $sql = "SELECT content.id as content_id, award.name AS award_name
    FROM award
    JOIN content_has_award ON award.id = content_has_award.award
    JOIN content ON content_has_award.content = content.id";
    private $allowedParams = ["content_id"];
    private $sqlParams = [];
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
        $contentId = Request::params()['content_id'] ?? null;
        $validatedContentId = null;
        if ($contentId) {
            $validatedContentId = $this->validateNumParam($contentId);
        }
        if (isset($validatedContentId)) {
            $this->sql .= " WHERE content.id =" . $validatedContentId;
        }
    }
}