<?php

namespace App\EndpointController;

/**
 * Type endpoint
 * 
 * enables users to get all types of content
 * 
 * @package App\EndpointController
 * @return JSON data of the type of content
 * 
 * @author 
 */

use App\{
    Request,
    Database,
    ClientError
};
class Type extends Endpoint
{
    private $allowedMethods = ['GET'];
    private $allowedParams = [];
    private $sql = "SELECT type.id as type_id, type.name as type_name FROM type";
    private $sqlParams = [];
    private $db;
    public function __construct()
    {
        $this->db = new Database(DB_PATH);
        $this->checkAllowedMethod(Request::method(), $this->allowedMethods);
        $data = $this->db->executeSQL($this->sql, $this->sqlParams);
        parent::__construct($data);
    }
}