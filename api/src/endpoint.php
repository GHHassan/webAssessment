<?php
/**
 * Endpiont class 
 * 
 * a blueprint for the rest of endpoints for this project
 * also provides the database connection
 * 
 * @author @author G H Hassani <w20017074@northumbria.ac.uk>
 */

class Endpoint
{
    private $sql;
    private $sqlParams;
    private $data;

    private $db;
    public function __construct()
    {
        $this->db = new Database("./db/chi2023.sqlite");
        $this->initialiseSQL();
        $this->data = $this->db->executeSQL($this->getSQL(), $this->getSQLParams());

        $this->setData(
            array(
                "length" => count($this->data),
                "message" => "Success",
                "data" => $this->data
            )
        );
    }

    public function sanitise($input)
    {
        $input = trim($input);
        $input = stripslashes($input);
        $input = htmlspecialchars($input);
        return $input;
    }
    public function setSql($sql)
    {
        $this->sql = $sql;
    }

    public function getSQL()
    {
        return $this->sql;
    }
    public function getSQLParams()
    {
        return $this->sqlParams;
    }
    public function getData()
    {
        return $this->data;
    }
    public function setData($data)
    {
        $this->data = $data;
    }
    public function setSQLParams($sqlParams)
    {
        $this->sqlParams = $sqlParams;
    }
    public function initialiseSQL()
    {
        $sql = "";
        $this->setSql($sql);
        $this->setSQLParams([]);
    }

}