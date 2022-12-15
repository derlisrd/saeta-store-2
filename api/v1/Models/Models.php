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
            return JsonResponse::jsonResponseGET($results,true,200,$found,$total);
            
            DataBaseConnect::CloseConnect();
        } catch (\Throwable $th) {
            return JsonResponse::jsonResponseError(false,404,$th->getMessage(),$sql);
            die();
        }

    }
    public static function GET_INTERNO($sql){
        try {
            $stmt = DataBaseConnect::connect_interno()->prepare($sql);
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            DataBaseConnect::CloseConnect();
            return($results);
        } catch (\Throwable $th) {
            
            die($th);
        }
    }


    public static function OPTIONS($sql, $table){

        try {
            $stmt = DataBaseConnect::connect()->prepare($sql);
            $stmt->execute();
            
            $idcolumn = "id_".substr($table,0,-1);
            $stmt = DataBaseConnect::connect()->prepare("SELECT * from $table order by $idcolumn desc limit 1");
            $stmt->execute();
            $last = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return JsonResponse::jsonResponseOPTIONS(true,200,"Inserted or updated");
            DataBaseConnect::CloseConnect();
            
        } catch (\Throwable $th) {
            return JsonResponse::jsonResponseError(false,404,$th->getMessage(),$sql);
            die();
        }


    }


    public static function POST($sql,$table){

        try {
            $stmt = DataBaseConnect::connect()->prepare($sql);
            $stmt->execute();
            
            $idcolumn = "id_".substr($table,0,-1);
            $stmt = DataBaseConnect::connect()->prepare("SELECT * from $table order by $idcolumn desc limit 1");
            $stmt->execute();
            $last = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return JsonResponse::jsonResponsePOST(true,200,"Inserted",$last[0][$idcolumn],$last);
            DataBaseConnect::CloseConnect();
            
        } catch (\Throwable $th) {
            return JsonResponse::jsonResponseError(false,404,$th->getMessage(),$sql);
            die();
        }

    }



    public static function PUT($sql){


        try {
            $stmt = DataBaseConnect::connect()->prepare($sql);
            $stmt->execute();
            return JsonResponse::jsonResponsePUT(true,200,"Updated!");
            DataBaseConnect::CloseConnect();
        } catch (\Throwable $th) {
            return JsonResponse::jsonResponseError(false,404,$th->getMessage(),$sql);
            die();
        }

    }

    public static function DELETE($sql){


        try {
            $stmt = DataBaseConnect::connect()->prepare($sql);
            $stmt->execute();
            return JsonResponse::jsonResponsePUT(true,200,"Deleted!");
            DataBaseConnect::CloseConnect();
        } catch (\Throwable $th) {
            return JsonResponse::jsonResponseError(false,404,$th->getMessage(),$sql);
            die();
        }

    }


}


?>