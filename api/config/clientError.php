<?php

/**
 * client erro class to handle any errors by client.
 * 
 * this is a subclass of Exception class. and used to 
 * handle client error request errors.
 * 
 * @return error message based on the error code.
 * @author H Hassani <w20017074@northumbria.ac.uk>
 */

class ClientError extends Exception
{
    public function __construct($code)
    {
        parent::__construct($this->errorResponseCode($code));
    }

    public function errorResponseCode($code)
    {
        switch ($code) {
            case '200':
                http_response_code(200);
                $message = 'OK';
                break;
            case '400':
                http_response_code(400);
                $message = 'Bad request';
                break;
            case '401':
                http_response_code(401);
                $message = 'Unauthorized parameter';
                break;
            case '403':
                http_response_code(403);
                $message = 'Forbidden';
                break;
            case '404':
                http_response_code(404);
                $message = 'Invalid endpoint, not found';
                break;
            case '405':
                http_response_code(405);
                $message = 'Invalid request method';
                break;
            case '500':
                http_response_code(500);
                $message = 'Internal server error';
                break;
            case '501':
                http_response_code(501);
                $message = 'Not implemented';
                break;
            default:
                $message = 'something went wrong, please, contact your administrator ';
                break;
        }
        return $message;
    }
}