<?php 

namespace ApiRoutes;

use Controllers\Controllers;
use JsonResponse\JsonResponse;



class Routes {

    public static function methods (){
        
        if(isset($_SERVER["REQUEST_METHOD"])){


            switch ($_SERVER["REQUEST_METHOD"]) {
                case 'GET':
                    Controllers::get();
                break;

                case 'POST':
                    Controllers::post();
                break;

                case 'PUT':
                    Controllers::put();
                break;

                case 'PATCH':
                    Controllers::patch();
                break; 

                case 'DELETE':
                    Controllers::delete();
                break;

                default:
                    print JsonResponse::jsonResponseError(false,200,"Method invalid");
                break;
            }
        }
        else{
            print JsonResponse::jsonResponseError(false,404,"Method invalid");
        }
    }


    public static function get(){
        return $_SERVER["REQUEST_METHOD"]=="GET" ?  Controllers::get() : null;
    }

    public static function post(){
        return $_SERVER["REQUEST_METHOD"]=="POST" ?  Controllers::post() : null;
    }

    public static function put(){
        return $_SERVER["REQUEST_METHOD"]=="PUT" ?  Controllers::put() : null;
    }

    public static function delete(){
        return $_SERVER["REQUEST_METHOD"]=="DELETE" ?  Controllers::delete() : null;
    }


 

}



?>