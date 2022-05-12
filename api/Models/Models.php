<?php

namespace Models;

use DataBaseConnect\DataBaseConnect;
use GetController\GetController;
use JsonResponse\JsonResponse;
use PDO;

class Models {

    
    public static function GET($sql,$table){

        try {
            $stmt = DataBaseConnect::connect()->prepare($sql);
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_CLASS);
            $found = count($results);
            $sql2 = "SELECT COUNT(*) FROM $table";
            $stmt2 = DataBaseConnect::connect()->prepare($sql2);
            $stmt2->execute();
            $results2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);
            $total = intval($results2[0]['COUNT(*)']);
            return JsonResponse::jsonResponseGET($results,"ok",200,$found,$total);
            
            DataBaseConnect::CloseConnect();
        } catch (\Throwable $th) {
            return JsonResponse::jsonResponseError("Error",200,$th->getMessage(),$sql);
            die();
        }

    }
    public static function GET_INTERNO($sql){
        try {
            $stmt = DataBaseConnect::connect()->prepare($sql);
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_CLASS);
            DataBaseConnect::CloseConnect();
            return($results);
        } catch (\Throwable $th) {
            
            die($th);
        }
    }


    public static function POST($sql,$table){

        try {
            $stmt = DataBaseConnect::connect()->prepare($sql);
            $stmt->execute();
            
            $idcolumn = "id_".substr($table,0,-1);
            $stmt = DataBaseConnect::connect()->prepare("SELECT MAX($idcolumn) as last_id from $table");
            $stmt->execute();
            $last = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return JsonResponse::jsonResponsePOST("ok",200,"Inserted",$last[0]['last_id']);
            DataBaseConnect::CloseConnect();
            
        } catch (\Throwable $th) {
            return JsonResponse::jsonResponseError("Error",200,$th->getMessage(),$sql);
            die();
        }

    }



    public static function PUT($sql){


        try {
            $stmt = DataBaseConnect::connect()->prepare($sql);
            $stmt->execute();
            return JsonResponse::jsonResponsePUT("ok",200,"Updated!");
            DataBaseConnect::CloseConnect();
        } catch (\Throwable $th) {
            return JsonResponse::jsonResponseError("Error",200,$th->getMessage(),$sql);
            die();
        }

    }

    public static function DELETE($sql){


        try {
            $stmt = DataBaseConnect::connect()->prepare($sql);
            $stmt->execute();
            return JsonResponse::jsonResponsePUT("ok",200,"Deleted!");
            DataBaseConnect::CloseConnect();
        } catch (\Throwable $th) {
            return JsonResponse::jsonResponseError("Error",200,$th->getMessage(),$sql);
            die();
        }

    }


}


?>