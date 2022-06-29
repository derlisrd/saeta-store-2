<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept,X-Api-Token,Authorization");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE,OPTIONS,HEAD');

require "./Config/DataBaseConnect.php";
require "./Globals/Globals.php";
require "./Controllers/Controllers.php";
require "./Controllers/GetController.php";
require "./Controllers/PutController.php";
require "./Controllers/PostController.php";
require "./Controllers/DeleteController.php";
require "./Controllers/AuthController.php";
require "./vendor/autoload.php";
require "./Models/Models.php";
require "./Routes/Routes.php";
require "./Routes/JsonResponse.php";

use ApiRoutes\Routes;

Routes::methods();

?>