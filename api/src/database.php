<?php

/** 
 * 
 * The Database class
 * 
 * this class is reponsible for connecting and
 * running CRUD operation on the database
 * 
 * @author G H Hassani w20017074
 * 
 * @return database connection
 */

 class Database{
    private $pdo;

    public function __construct($databaseName){
        $this->setDatabaseConnection($databaseName);
    }

    public function setDatabaseConnection ($databaseName){
        $this->pdo = new PDO('sqlite:'.$databaseName);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }


    public function executeSql($sql, $params=[]){
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
 }