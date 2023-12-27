<?php

namespace App\EndpointController;

/**
 * ContentTypes endpoint
 * 
 * This endpoint returns the types of content 
 * from the "type" table of the CHI2023 database. 
 * 
 * @package App\EndpointController
 * @return array[string] name
 * 
 * @author Hassan <w20017074>
 */

 use App\Database;
 use App\Request;

class ContentTypes extends Endpoint{

    private $allowedMethods = array('GET');
    private $allowedParams = [];
    private $params = [];
    private $sql = "SELECT DISTINCT name FROM type";
    public function __construct(){
        $this->db = new Database(DB_PATH);
        $this->checkAllowedMethod(Request::method(), $this->allowedMethods);
        $this->checkAllowedParams(Request::params(), $this->allowedParams);
        $data = $this->db->executeSQL($this->sql, $this->params);
        parent::__construct($data);
    }
}