<?php

namespace App\EndpointController;

/** 
 * Country class
 * 
 * This endpoint connects to the database and returns
 * the distinct list of countries from the affiliation table.
 * The endpoint then filters the data to remove any duplicates.
 * It does not support any parameters and limits access to only GET requests.
 * Inherits the database connection from its parent.
 * 
 * @author G H Hassani <W20017074@northumbria.ac.uk>
 */

 use App\{
    Request,
    Database
};

class Country extends Endpoint
{
    private $db;
    private $allowedParams = [];
    private $sql = 'SELECT DISTINCT country FROM affiliation';
    private $sqlParams = [];

    private $allowedMethods = ['GET'];
    public function __construct()
    {
        $this->checkAllowedParams(Request::params(), $this->allowedParams);
        $this->checkAllowedMethod(Request::method(), $this->allowedMethods);
        $this->db = new Database(DB_PATH); 
        $data = $this->db->executeSQL($this->sql, $this->sqlParams);
        parent::__construct($data);
    }
}
