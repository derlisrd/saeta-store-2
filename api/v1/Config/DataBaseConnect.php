<?php

namespace DataBaseConnect;

use JsonResponse\JsonResponse;
use PDO;
use PDOException;

class DataBaseConnect{

    private static $CON;

    static public function connect(){
        
            $host = env('DBHOST');
            $db = env('DBNAME');
            $user = env('DBUSER');
            $pass = env('DBPASS');
            $apikey = env('X_API_TOKEN');
        

        try {
            if(strval($apikey) === strval(API_TOKEN)){
                self::$CON = new PDO("mysql:host=".$host.";dbname=".$db,$user,$pass);
                self::$CON->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$CON->exec("set names utf8");
            }else{
                $response = JsonResponse::jsonResponseError(false,404,"Not autorized api token");
                die($response);
            }
        } catch (PDOException $e) {
            $response = JsonResponse::jsonResponseError(false,404,$e->getMessage());
            die($response);
        }

        return self::$CON;


    }

    static public function connect_interno(){
        
        $host = env('DBHOST');
        $db = env('DBNAME');
        $user = env('DBUSER');
        $pass = env('DBPASS');
        //$apikey = env('X_API_TOKEN');
    

    try {
        
            self::$CON = new PDO("mysql:host=".$host.";dbname=".$db,$user,$pass);
            self::$CON->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            self::$CON->exec("set names utf8");
        
    } catch (PDOException $e) {
        $response = JsonResponse::jsonResponseError(false,404,$e->getMessage());
        die($response);
    }

    return self::$CON;


}

    static public function CloseConnect(){
        return self::$CON = NULL;
    }


}