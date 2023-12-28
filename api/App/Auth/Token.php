<?php

namespace App\Auth;

/**
 * Token endpoint
 * 
 * This endpoint is used to generate a JWT token 
 * if the user provides a valide credentials for the user.
 * The token is valid for 1 hour. and the user can use it
 * to access restricted personalised materials to them.
 * inherits validateToken() and more from the Endpoint class and uses the
 * 
 * @package App\Auth
 * @return JWT token if the user provides a valid credentials
 * 
 * @author John Rooksby <john.rooksby@northumbria.ac.uk>
 * @author Hassan <w20017074>
 * 
 */

use Firebase\JWT\JWT;
use App\Request;

class Token extends \App\EndpointController\Endpoint 
{
    private $allowedParams = ['GET','POST'];
    private $sqlParams = [];
    private $data = [];

    public function __construct() {
        $this->checkAllowedParams(Request::params(), $this->allowedParams);
        $this->checkAllowedMethod(Request::method(), $this->allowedParams);
        $id = $this->checkCredentials();
        $data['token'] = $this->generateJWT($id);
        $data['message'] = 'success';
        parent::__construct($data);
    }

    private function generateJWT($id) {
        $secretKey = SECRET;
        $iat = time();
        $iss = $_SERVER['HTTP_HOST'];
        $payload = [
            'sub' => $id,
            'iat' => $iat,
            'exp' => $iat + 3600,
            'iss' => $iss
        ];
        $jwt = JWT::encode($payload, $secretKey, 'HS256');
        return $jwt;
    }
}