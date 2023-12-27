<?php

namespace App\EndpointController;

/**
 * Class Preview
 * 
 * This endpoint connects to the database and returns
 * the title and preview video for each item of the 
 * contents requested. 
 * The endpoint then filters the data to remove any
 * items of content that do not have a preview video. 
 * It supports an optional limit numeric parameter that
 * limits the number of items of content returned.
 * Non-numeric or negative values will throw an error. 
 * Access to this endpoint is limited to GET requests,
 * which is inherited from its parent class.
 *  
 * @param $limit
 * @return content objects with title and preview video in JSON format
 * returned object will contain a length property that represents the
 * number of items of content requested 
 * @package App\EndpointController
 * @author G H Hassani <W20017074@northumbria.ac.uk>
 */

 use App\{
    Request,
    Database,
    ClientError
};

class Preview extends Endpoint
{
    private $db;
    private $sql = "SELECT title, preview_video FROM content ORDER BY RANDOM()";
    protected $allowedParams = ["limit"];
    private $sqlParams;
    private $data = [];
    private $allowedMethods = ['GET'];

    public function __construct()
    {
        $this->checkAllowedMethod(Request::method(), $this->allowedMethods);
        $this->db = new Database(DB_PATH);
        $this->data = $this->db->executeSQL($this->sql, $this->sqlParams);
        $nonEmptyData = $this->removeEmptyObjects($this->data);
        $requestedData = $this->fixDataQuantity($nonEmptyData);
        parent::__construct($requestedData);
    }    

    private function removeEmptyObjects($data)
    {
        foreach ($data as $index => $item) {
            if ($item['preview_video'] == null) {
                unset($data[$index]);
            }
        }
        return array_values($data);
    }

    private function fixDataQuantity($data)
    {
        if (isset(Request::params()['limit'])) {
            $this->checkAllowedParams(Request::params(), $this->allowedParams);
            $limit = Request::params()['limit'];
            $limit = $this->validateNumParam($limit);

            if (!is_numeric($limit) || $limit < 0) {
                throw new ClientError(422);
            }

            if ($limit > 0) {
                $randomKeys = (array) array_rand($data, $limit);
                $randdomData = [];

                foreach ($randomKeys as $key) {
                    $randdomData[] = $data[$key];
                }

                return $randdomData;
            }
        }

        return $data;
    }
}
