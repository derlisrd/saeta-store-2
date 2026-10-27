<?php


 if(isset($_SERVER['HTTPS']) and $_SERVER['HTTPS'] == 'on') $protocol = 'https://';  else $protocol = 'http://';
 
$domainName = $_SERVER['HTTP_HOST'].'/';

$phpself = $_SERVER['PHP_SELF'];

$phpself = substr($phpself,0,-9);

$countphpSelf = strlen($phpself);


//$request =  substr( $_SERVER['REQUEST_URI'],$countphpSelf-1);
$countrootpath = strlen($_ENV['ROOTPATH']);
$request = substr($_SERVER['REQUEST_URI'],$countrootpath);
define("RAIZ",$request);

define("UPLOADPATH",env('UPLOADPATH'));

define("UPLOADPATHNAME",env('UPLOADPATHNAME'));

define("API_TOKEN",isset($_SERVER['HTTP_X_API_TOKEN']) ? $_SERVER['HTTP_X_API_TOKEN'] : "");

define("PROTOCOLO",$protocol);
define("DOMINIO",$domainName);

define("TABLES_PRIVATES",array('users'));

define("USERS_TABLE","users");

define("TIME_ZONE",'America/Asuncion');

define("DOMAIN_AUTH",$_SERVER['SERVER_NAME']);


?>