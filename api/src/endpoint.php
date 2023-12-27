<?php
/**
 * Endpiont class 
 * 
 * A blueprint for the other endpoints in this project
 * that inherits it. It is responsible for connecting to
 * the database and returning the data in JSON format.
 * It does not support any parametere.
 * limits access to only GET requests. this only 
 * applys to the endpoints that inherit this class and
 * calls the parent constructor. in its constructor.
 * this also includes the initialise() method that
 * is used by some of the child classes.
 * 
 * @author Hassan
 */

class Endpoint
{
    private $sql;
    private $sqlParams;
    private $data;
    protected $db;

    public function __construct($data = ["message" => "No data found"])
    {
        switch (Request::method()) {
            case 'GET':
                $this->db = new Database("db/chi2023.sqlite");
                $this->initialiseSQL();
                $this->data = $this->db->executeSQL($this->getSQL(), $this->getSQLParams());
                $this->setData(
                    array(
                        "length" => count($this->data),
                        "message" => "Success",
                        "data" => $this->data
                    )
                );
                break;
            default:
                throw new ClientError(405);
        }
    }

    public function sanitise($input)
    {
        return htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
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