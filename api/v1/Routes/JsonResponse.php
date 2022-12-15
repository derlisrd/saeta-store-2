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
                "error"=>!$response,
                "message"=>null,
                "first"=>$results[0] ?? []
            );
        }
        else{
            $json = array(
                "found"=>$found,
                "response" =>$response,
                "results"=>$results,
                "status"=> $status,
                "total"=>$total,
                "error"=>!$response,
                "message"=>null,
                "first"=>$results[0] ?? []
            );
        }
        
        return json_encode($json,http_response_code($status));
    }

    public static function jsonResponseOPTIONS($response,$status,$message){


        $json = array(
            "response" =>$response,            
            "status"=> $status,
            "message"=>$message,
            "error"=>!$response,
        );

        return json_encode($json,http_response_code($status));
    }

    public static function jsonResponsePUT ($response,$status,$message){
        
        $json = array(
            "response" =>$response,            
            "status"=> $status,
            "message"=>$message,
            "error"=>!$response,
        );
    
    return json_encode($json,http_response_code($status));
    }

    public static function jsonResponsePOST ($response,$status,$message,$last_id,$results=[]){
        
        $json = array(
            "response" =>$response,            
            "status"=> $status,
            "message"=>$message,
            "error"=>!$response,
            "last_id"=>$last_id,
            "results"=>$results
        );
    
    return json_encode($json,http_response_code($status));
    }


    public static function jsonResponseError ($response,int $status,String $message, string $sql=null){
        
        if($sql){
            $json = array(
                "message"=>$message,
                "response" =>$response,
                "status"=> $status,
                "sql"=>$sql,
                "error"=>!$response,
            );
        }
        else{
            $json = array(
                "message"=>$message,
                "response" =>$response,
                "status"=> $status,
                "error"=> !$response,
            );
        }
        
    
    return json_encode($json,http_response_code($status));
}


}



?>