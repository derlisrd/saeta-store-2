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

                case 'DELETE':
                    Controllers::delete();
                break;

                default:
                    print JsonResponse::jsonResponseError("Error",200,"Method invalid");
                break;
            }
        }
        else{
            print JsonResponse::jsonResponseError("Error",200,"Method invalid");
        }

    }
 

}



?>