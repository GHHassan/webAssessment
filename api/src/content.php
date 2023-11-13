<?php
/**
 * Content class
 * 
 * this class is used to return information of 
 * all the contents of content table in the database.
 * this class is accepting a numeric parameter from the url ($_GET['page]
 * or content?page=2), 
 * the parameter is used to specify the page number of the results 
 * i.e page 1 will return the first 20 results, page 2 will return 
 * second 20 results and so on.
 * 
 * this endpoint will also accept a string parameter and this specifies
 * the type of content to be returned i.e content?type=journal will return
 * this parammeter should be one of the type_name of the type table not 
 * the type_id.
 * 
 * both parameters are also accepted together and if both are provided
 * i.e content?type=journal&page=1 will return the first 20 results of
 * type journal.
 * 
 * if no parameter is provided the default value of page=1 and type=paper
 *  will be set as default values.
 * 
 * @param int $page
 * @param string $type
 * @return JSON object containing list of content details of 
 * specified page or type
 * @author @author G H Hassani <w20017074@northumbria.ac.uk>
 */

class Content extends Endpoint
{
    public function __construct(){
        parent::__construct();

    }

    public function initialiseSQL(){
        $sql = 'SELECT * FROM content
        JOIN type ON content.type = type.id ';
        count($_GET[]) === 0 ? $sql .= 'WHERE type.name = paper AND limit = 20':
        $sql .= 'WHERE type.name = :type AND page = :page';
        
        $this->setSQL($sql);
        $this->setSQLParams([]);
    }
}