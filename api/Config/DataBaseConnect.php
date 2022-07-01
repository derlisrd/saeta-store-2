<?php

namespace DataBaseConnect;

use JsonResponse\JsonResponse;
use PDO;
use PDOException;

class DataBaseConnect{

    private static $CON;

    static public function connect(){
        
            $host = $_ENV['DBHOST'];
            $db = $_ENV['DBNAME'];
            $user = $_ENV['DBUSER'];
            $pass = $_ENV['DBPASS'];
            $apikey = $_ENV['X_API_TOKEN'];
        

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