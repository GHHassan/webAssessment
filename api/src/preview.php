<?php
/**
 * fetches titles and preview_video links
 * from database
 * 
 * @author @author G H Hassani <w20017074@northumbria.ac.uk>
 */

class Preview extends Endpoint
{

    public function __construct()
    {
        parent::__construct();
        $this->initialiseSQL();
        
        //needs to be fixed
        //always returns empty array
        //remove objects with no video link
        $nonEmptyData = [];
        $original = $this->data['data'];
        foreach ($original as $key => $value) {
            if ($value !== null && $value !== "") {
                $nonEmptyData[$key] = $value;
            }            
        }
        $dataLength = count($this->getData());
        $nonEmptyDataLength = count($nonEmptyData);
        $removed = $dataLength - $nonEmptyDataLength;
        $this->setData(
            array(
                "length" => count($this->data["data"]),
                "message" => "Success",
                "original" => $this->data["data"],
                "notEmptyLength" => $nonEmptyDataLength,
                "notEmptyData" => $nonEmptyData,
                "Removed" => $removed,
                )
            );
        }
    public function initialiseSQL()
    {
        (!isset($_GET['limit'])) ? $limit = 20 : $limit = (int) $_GET['limit'];
        $sql = 'SELECT title, preview_video FROM content ORDER BY RANDOM() LIMIT ' . $limit;
        $this->setSQL($sql);
        $this->setSQLParams([]);
    }
}