<?php
/**
 * previews video links and associated title
 * 
 */

class Preview extends Endpoint
{

    public function __construct()
    {
        $db = new Database("chiplay.sqlite");
        $this->initialiseSQL();
        $this->data = $db->executeSQL($this->getSQL(), $this->getSQLParams());
        $nonEmptyData = $this->data;

        //remove objects with no video link
        foreach ($nonEmptyData as $index=>$data) {
            if ($data['video'] == null || $data['title'] == null) {
                if(array_key_exists($index, $nonEmptyData)){
                    unset($nonEmptyData[$index]);
                }
            }
        }
        $dataLength = count($this->data);
        $nonEmptyDataLength = count($nonEmptyData);
        $removed = $dataLength - $nonEmptyDataLength;
        $this->setData(
            array(
                "length" => count($this->data),
                "message" => "Success",
                "data" => $nonEmptyData,
                "Removed"=> $removed
            )
        );
    }
    public function initialiseSQL()
    {
        (!isset($_GET['limit'])) ? $limit = 20 : $limit = (int) $_GET['limit'];
        $sql = 'SELECT title, video FROM paper ORDER BY RANDOM() LIMIT ' . $limit;
        $this->setSQL($sql);
        $this->setSQLParams([]);
    }
}