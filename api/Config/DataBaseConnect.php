<?php

namespace DataBaseConnect;

use JsonResponse\JsonResponse;
use PDO;
use PDOException;

class DataBaseConnect{

    private static $CON;

    static public function connect(){
        
        $direccion = dirname(__FILE__);
        $jsonData = file_get_contents($direccion."/"."dbdata.json");
        $listaDatos = json_decode($jsonData, true);
        foreach($listaDatos as  $value){
            $host = $value['host'];
            $db = $value['db'];
            $user = $value['user'];
            $pass = $value['pass'];
            $apikey = $value['apikey'];
        }
        

        try {
            if(strval($apikey) === strval(API_TOKEN)){
                self::$CON = new PDO("mysql:host=".$host.";dbname=".$db,$user,$pass);
                self::$CON->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$CON->exec("set names utf8");
            }else{
                $response = JsonResponse::jsonResponseError("Error",404,"Not autorized api token");
                die($response);
            }
        } catch (PDOException $e) {
            $response = JsonResponse::jsonResponseError("Error",404,$e->getMessage());
            die($response);
        }

        return self::$CON;


    }

    static public function CloseConnect(){
        return self::$CON = NULL;
    }


}