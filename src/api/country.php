<?php

/** 
 * Country class
 * 
 * this class is using the affiliates table of the database
 * duplicate values are not allowed to be returned
 * 
 * @return Country.countryNames
 */
include 'endpoint.php';

 class Country extends Endpoint{
    private $countryNames;

    public function __construct(){
        $this->setSql('SELECT DISTINCT country FROM affiliation');
        $this->initialiseSQL();
        $this->data = $this->db->executeSql($this->getSQL(), $this->getSQLParams());
    }
 }