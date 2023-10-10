<?php

/**
 * Parent Endpoint class
 * 
 * this communicates with the database class
 * who runs sql queries and performing CRUD 
 * the database
 * 
 * @author G H Hassani w20017074
 * 
 */

 class Endpoint {
    private $sql ;
    private $data;
    private $sqlParams;

    private $db;

    function __construct(){
        $db = new Database('chiplay.sqlite');
        $this->initialiseSQL();
        $this->data = $db->executeSql($this->getSQL(), $this->getSQLParams());
        $this->setData(array(
            "length" => $this->data->length,
            "message"=> 'success',
            "data"=> $this->data
        ));
    }

    public function initialiseSQL(){
        $sql = "";
        $sqlParams = "";
        $this->setSql($sql);
        $this->setSQLParams($sqlParams);
    }

    public function getSQL(){
        return $this->sql;
    }    

    public function setSQL($sql){
        $this->sql = $sql;
    }

    public function getSQLParams(){
        return $this->sqlParams;
    }

    public function setSQLParams($array){
        $this->setSQLParams($array);
    }

    public function getData(){
        return $this->data;
    }

    public function setData($data){
        $this->data =  $data;
    }

 }