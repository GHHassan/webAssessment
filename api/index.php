<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'config/autoloader.php';
$autoloader = new autoloader();
$autoloader::register();

$response = new Response();

$url = $_SERVER['REQUEST_URI'];
$path = parse_url($url)['path'];
$path = str_replace('/coursework/api/','', $path);


$endpoint = null;
switch($path) {
    case '/':
    case 'index':
    case 'home':
    case 'developer':
        $endpoint = new Developer();
    case 'country':
    case '/country':
        $endpoint = new Country();
        break;
    case 'preview':
    case '/preview':
        $endpoint = new Preview();
        break;
    case 'author-and-affiliation':
    case '/author-and-affiliation':
        $endpoint = new AuthorAndAffiliation();
        break;
    case 'contenct':
    case '/contenct':    
        $endpoint = new Content();
        break;
    default:
        $endpoint = new Developer();
        break;
}

$data = $endpoint->getData();
echo json_encode($data);
