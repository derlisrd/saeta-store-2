<?php

namespace JsonResponse;


class JsonResponse {


    public static function jsonResponseGET ($results,$response,$status,$found,$total=null){
        
        if($total==null){
            $json = array(
                "found"=>$found,
                "response" =>$response,
                "results"=>$results,
                "status"=> $status,
                "error"=>false,
                "message"=>null
            );
        }
        else{
            $json = array(
                "found"=>$found,
                "response" =>$response,
                "results"=>$results,
                "status"=> $status,
                "total"=>$total,
                "error"=>false,
                "message"=>null
            );
        }
        
        return json_encode($json,http_response_code($status));
    }

    public static function jsonResponsePUT ($response,$status,$message){
        
        $json = array(
            "response" =>$response,            
            "status"=> $status,
            "message"=>$message,
            "error"=>false,
        );
    
    return json_encode($json,http_response_code($status));
    }

    public static function jsonResponsePOST ($response,$status,$message,$last_id){
        
        $json = array(
            "response" =>$response,            
            "status"=> $status,
            "message"=>$message,
            "error"=>false,
            "last_id"=>$last_id
        );
    
    return json_encode($json,http_response_code($status));
    }


    public static function jsonResponseError (string $response,int $status,String $message, string $sql=null){
        
        if($sql){
            $json = array(
                "message"=>$message,
                "response" =>$response,
                "status"=> $status,
                "sql"=>$sql,
                "error"=>false,
            );
        }
        else{
            $json = array(
                "message"=>$message,
                "response" =>$response,
                "status"=> $status,
                "error"=>false,
            );
        }
        
    
    return json_encode($json,http_response_code($status));
}


}



?>