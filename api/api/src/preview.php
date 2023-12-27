<?php
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
 * Access to this endpoint is limited to GET requests. 
 * whic is inherited from its parent class.
 *  
 * @author  G H Hassani <W20017074@northumbria.ac.uk>
 */

class Preview extends Endpoint
{

    public function __construct()
    {
        Parent::__construct();
        $this->initialiseSQL();
        $this->data = $this->db->executeSQL($this->getSQL(), $this->getSQLParams());
        $nonEmptyData = $this->removeEmptyObjects($this->data);
        
        $dataLength = count($this->data);
        $nonEmptyDataLength = count($nonEmptyData);
        $removed = $dataLength - $nonEmptyDataLength;
        $this->setData(
            array(
                "length" => count($this->data),
                "message" => "Success",
                "data" => $nonEmptyData,
                "Removed" => $removed
            )
        );
    }
    public function initialiseSQL()
    {
        (isset($_GET['limit']))? $limit = $this->sanitise($_GET['limit']) : $limit = 20;
        if(!is_numeric($limit) || $limit < 1){
            throw new ClientError(401);
        }
        if($limit == null){
            $limit = 20;
        }
        $sql = 'SELECT title, preview_video FROM content ORDER BY RANDOM() LIMIT ' . $limit;
        $this->setSQL($sql);
        $this->setSQLParams([]);
    }

    private function removeEmptyObjects($nonEmptyData)
    {
        foreach ($nonEmptyData as $index=>$data) {
            if ($data['preview_video'] == null) {
                if(array_key_exists($index, $nonEmptyData)){
                    unset($nonEmptyData[$index]);
                }
            }
        }
        return $nonEmptyData;
    }
}