<?php
/* header('Access-Control-Allow-Origin:*');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept,X-Api-Token,Authorization");
header('Access-Control-Allow-Methods: POST,GET, PUT, DELETE, OPTIONS'); */

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept,X-Api-Token");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH');
header('charset=utf-8');
/* header('content-type: application/json; charset=utf-8'); */

require "./vendor/autoload.php";

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

require "./Config/helper.php";
require "./Globals/Globals.php";
require "./Config/DataBaseConnect.php";
require "./Controllers/Controllers.php";
require "./Controllers/GetController.php";
require "./Controllers/ExportController.php";
require "./Controllers/PDFController.php";
require "./Controllers/ExcelController.php";
require "./Controllers/EmailController.php";
//require "./App/Helper.php";
require "./Controllers/PutController.php";
require "./Controllers/PostController.php";
require './Controllers/PatchController.php';
require './Controllers/OptionsController.php';
require "./Controllers/DeleteController.php";
require "./Controllers/AuthController.php";
require "./Models/Models.php";
require "./Routes/Routes.php";
require "./Routes/JsonResponse.php";
require "./Routes/Response.php";



/* include_once 'App/Request.php';
include_once 'App/Router.php'; */