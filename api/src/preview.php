<?php
/**
 * fetches titles and preview_video links
 * from database
 * 
 * the class accepts a limit parameter from the url ($_GET['limit])
 * that specify the number of rows to be returned from the databse.
 * 
 * if the limit parameter is not set or is not a number or is less than 1
 * the parameter will be ignored and the default value of 20 will be used.
 * 
 * @param int $limit
 * @return JSON object with list of titles and preview_video links
 * @author @author G H Hassani <w20017074@northumbria.ac.uk>
 */

 //====================== question 1 ======================
 //should the result be the same as the limit
 //or whate ever is left after the empty objects are removed

class Preview extends Endpoint
{

    public function __construct()
    {
        parent::__construct();
        $this->initialiseSQL();
        $data = $this->getData();
       
        //remove objects with no video link from the list
        $nonEmptyData = $this->removeEmptyObjects($data["data"]);
        $this->setData(
            array(
                "length" => count($nonEmptyData),
                "message" => "Success",
                "data" => $nonEmptyData,
                )
            );
        }
        
    public function initialiseSQL()
    {   
        $param= null;
        (isset($_GET['limit'])) ? $param = $_GET['limit'] : $param = null;
        $param = $this->sanitise($param);
        is_numeric($param) && $param > 0 ? $limit = $param : $limit = 20;
        $sql = 'SELECT title, preview_video FROM content ORDER BY RANDOM() LIMIT ' . $limit;
        $this->setSQL($sql);
        $this->setSQLParams([]);
    }
    private function removeEmptyObjects($data){
        $nonEmptyData = [];
        foreach($data as $value){
            if($value['preview_video'] != ""){
                array_push($nonEmptyData, $value);
            }
        }
        return $nonEmptyData;
    }
}