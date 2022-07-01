<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept,X-Api-Token,Authorization");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

require "./vendor/autoload.php";
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

require "./Globals/Globals.php";
require "./Config/DataBaseConnect.php";
require "./Controllers/Controllers.php";
require "./Controllers/GetController.php";
require "./Controllers/PutController.php";
require "./Controllers/PostController.php";
require "./Controllers/DeleteController.php";
require "./Controllers/AuthController.php";
require "./Models/Models.php";
require "./Routes/Routes.php";
require "./Routes/JsonResponse.php";

use ApiRoutes\Routes;


Routes::methods();

?>