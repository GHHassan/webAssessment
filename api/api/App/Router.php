<?php

namespace App;

/**
 * Router class
 * 
 * This abstract class is responsible for routing incoming requests to the appropriate endpoint.
 * It uses the endpoint name from the request to determine which endpoint to instantiate.
 * If the endpoint is not found, it catches a `ClientError` exception.
 * 
 * @package App
 */
abstract class Router
{
    
    public static function routeRequest()
    {
        try {
            switch (strtolower(Request::endpointName())) {
                case '/':
                case 'developer':
                case '/developer':
                    $endpoint = new EndpointController\Developer();
                    break;
                case 'countries':
                case '/countries':
                    $endpoint = new EndpointController\Country();
                    break;
                case 'preview':
                case '/preview':
                    $endpoint = new EndpointController\Preview();
                    break;
                case 'author-and-affiliation':
                case '/author-and-affiliation':
                    $endpoint = new EndpointController\AuthorAndAffiliation();
                    break;
                case 'content':
                case '/content':
                    $endpoint = new EndpointController\Content();
                    break;
                case 'token':
                case '/token':
                    $endpoint = new Auth\Token();
                    break;
                case 'note':
                case '/note':
                    $endpoint = new EndpointController\Note();
                    break;
                default:
                    throw new ClientError(404);
            }
        } catch (ClientError $e) {
            $data = ['message' => $e->getMessage()];
            $endpoint = new EndpointController\Endpoint($data);
        }

        return $endpoint;
    }
}
