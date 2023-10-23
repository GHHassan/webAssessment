<?php
/**
 * Endpiont class 
 * 
 * a blueprint for the rest of endpoints for this project
 * 
 * @author Hassan
 */

include 'database.php';
class Endpoint
{
    private $sql;
    private $sqlParams;
    private $data;

    public function __construct()
    {
        $db = new Database("chi2023.sqlite");
        $this->initialiseSQL();
        $this->data = $db->executeSQL($this->getSQL(), $this->getSQLParams());

        $this->setData(
            array(
                "length" => count($this->data),
                "message" => "Success",
                "data" => $this->data
            )
        );
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