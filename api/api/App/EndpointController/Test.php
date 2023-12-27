<?php

namespace App\EndpointController;
use App\Request;

/**
 * class previews
 * 
 * This endpoint connects to the database and returns
 * the title and preview video for each item of the 
 * contents requested. 
 * The endpoint then filters the data to remove any
 * items of content that do not have a preview video. 
 * it supports an optional limit numric parameter that
 * limits the number of items of content returned.
 * non numeric or negative values will throw an error. 
 * Access to this endpoint is limited to GET requests
 * whic is inherited from its parent class.
 *  
 * @return content objects with title and preview video in JSON format
 * returned object will contain a length property that represents the
 * number of items of content requested and a removed property that
 * represents the number of items of content removed because they did
 * not have a preview video.
 * 
 * @author  G H Hassani <W20017074@northumbria.ac.uk>
 */

class Preview extends Endpoint
{
    private $sql;
    private $sqlParams;
    protected $allowedParams = ["limit"];
    public function __construct()
    {
        parent::__construct();
        echo 'sql '. $this->getSQL();
        echo 'params '.json_encode($this->getSQLParams());
        echo json_encode($this->allowedParams);
        $this->initialiseSQL();
        $this->data = $this->db->executeSQL($this->getSQL(), $this->getSQLParams());
        $nonEmptyData = $this->validateData($this->data);       
        $this->setData(
            array(
                "length" => count($this->data),
                "removed" => count($this->data) - count($nonEmptyData),
                "message" => "Success",
                "data" => $nonEmptyData
                )
            );
    }
    public function initialiseSQL()
    {
        $this->checkAllowedParameters();
        $limit = 0;
        if(isset(Request::params()["limit"])) {
            $this->validateNumParam("limit");
            $limit = Request::params()["limit"];
            echo $limit;
        } 
        if ($limit > 0) {
            $sql = 'SELECT title, preview_video FROM content ORDER BY RANDOM() LIMIT ' . $limit;
        } else {
            $sql = 'SELECT title, preview_video FROM content ORDER BY RANDOM()';
        }
        $this->setSQL($sql);
        $this->setSQLParams([]);
    }
    
    private function removeEmptyObjects($nonEmptyData)
    {
        foreach ($nonEmptyData as $index => $data) {
            if ($data['preview_video'] == null) {
                if (array_key_exists($index, $nonEmptyData)) {
                    unset($nonEmptyData[$index]);
                }
            }
        }
        return array_values($nonEmptyData);
    }
    private function fetchAnotherPreview()
    {
        $data = $this->db->executeSQL($this->getSQL(), $this->getSQLParams());
        return array_values($data);
    }
    
    private function validateData($nonEmptyData)
    {
        $nonEmptyData = $this->removeEmptyObjects($this->data);
        while($nonEmptyData == null) {
            $data = $this->fetchAnotherPreview();
            $nonEmptyData = $this->removeEmptyObjects($data);
        }
        return $nonEmptyData;
    }
}