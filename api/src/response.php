<?php
/**
 * formats and set the response headers
 * 
 * this class is responsible for formatting the response to
 * JSON and setting the response headers
 * 
 * @author @author G H Hassani <w20017074@northumbria.ac.uk>
 */

class Response
{
    public function __construct(){
        $this->outputHeader();
    }

    public function outputHeader(){
        header('Content-Type: Application/json');
    }
    public function outputBody($body){
        echo json_encode($body);
    }
}