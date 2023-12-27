<?php

/** 
 * Country class
 * 
 * This endpoint connects to the database and returns
 * the distinct list of countris from the affiliation table.
 * The endpoint then filters the data to remove any
 * It does not support any parametere.
 * limits access to only GET requests.
 * inherits database connection from its parent.
 * 
 * @author  G H Hassani <W20017074@northumbria.ac.uk>
 */

class Country extends Endpoint
{

    public function __construct()
    {
        parent::__construct();
        $this->initialiseSQL();
        $this->data = $this->db->executeSQL($this->getSQL(), $this->getSQLParams());
    }
    public function initialiseSQL()
    {
        $sql = 'SELECT DISTINCT country FROM affiliation';
        $this->setSQL($sql);
        $this->setSQLParams([]);
    }
}
