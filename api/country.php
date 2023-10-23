<?php

/** 
 * Country class
 * 
 * this class is using the affiliates table of the database
 * duplicate values are not allowed to be returned
 * 
 * 
 */
include 'endpoint.php';

 class Country extends Endpoint{

    public function initialiseSQL(){
        $sql = 'SELECT DISTINCT country FROM affiliation';
        $this->setSQL($sql);
        $this->setSQLParams([]);
    }
 }
