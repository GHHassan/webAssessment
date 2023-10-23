<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'country.php';
include 'developer.php';
include 'preview.php';
$countries = new Country();

header('Content-Type: Application/json');

$data = $countries->getData();

// echo json_encode($data);

$dev = new Developer();
$devData = $dev->getData();
// echo json_encode($devData);
$preview = new Preview();
$prevData = $preview->getData();

echo json_encode($prevData);