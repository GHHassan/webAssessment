<?php
 
class Response
{
 
    public function __construct()
    {
        $this->outputHeaders();
        if(Request::method() == "OPTIONS") exit();
    }
    
    private function outputHeaders()
    {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, OPTIONS');
    }
 
    public function outputJSON($data)
    {
        if(empty($data)){
            http_response_code(204);
            $data = ['message' => 'No data found'];
        }else{
            echo json_encode($data);
        }
    }
 
}
