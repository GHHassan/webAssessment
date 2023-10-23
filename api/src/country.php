<?php

/** 
 * Country class
 * 
 * this class is using the affiliates table of the database
 * duplicate values are not allowed to be returned
 * 
 * @author @author G H Hassani <w20017074@northumbria.ac.uk>
 */
include 'endpoint.php';

 class Country extends Endpoint{

    public function initialiseSQL(){
        $sql = 'SELECT DISTINCT country FROM affiliation';
        $this->setSQL($sql);
        $this->setSQLParams([]);
    }
 }
