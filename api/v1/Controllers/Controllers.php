<?php

namespace Controllers;
use AuthController\AuthController;
use JsonResponse\JsonResponse;
use GetController\GetController;
use PostController\PostController;
use PutController\PutController;
use DeleteController\DeleteController;
use PDFController\PDFController;
use ExportController;
use OptionsController\OptionsController;
use PhpParser\Node\Stmt\Return_;

class Controllers {


    public static function get(){
        
        $tableURIArray = explode("/",RAIZ);
        
        $tableArray = array_filter($tableURIArray); // convierte en array

        $TOKEN = isset($_GET['token']) || !empty($_GET['token']) ? $_GET['token'] : null; 
        
        if($tableArray){
            $table = $tableArray[1];
            $table = explode("?",$table);
            $table = $table[0];

            if($table==='backup'){
                if($TOKEN && AuthController::ValidateToken($TOKEN,false)){
                    $export = new ExportController();
                    return $export->Export_Database();
                }

                return false;
            }

            if($table==='pdf_factura'){
                
                $id = $tableArray[2];
                if(isset($id)){
                    $datos = ["id"=>$id];
                    
                    return PDFController::factura($datos);
                }
                return false;
            }

            if($table==='view_pdf_factura'){
                
                $id = $tableArray[2];
                if(isset($id)){
                    $datos = ["id"=>$id];
                    
                    return PDFController::view($datos);
                }
                return false;
            }

            
            $include = isset($_GET['include']) && !empty($_GET['include'])  ? explode(",",$_GET['include'])  : null;       
            $on = isset($_GET['on']) && !empty($_GET['on'])  ? explode(",",$_GET['on'])  : null;       
            
            $where = isset($_GET['where']) && !empty($_GET['where'])  ? explode(",",$_GET['where'])  : null;

            $sort = isset($_GET['sort']) && !empty($_GET['sort'])  ? $_GET['sort']  : null;

            $fields = isset($_GET['fields']) && !empty($_GET['fields'])  ? $_GET['fields']  : null;

            $page = isset($_GET['page']) && !empty($_GET['page'])  ? $_GET['page']  : null;

            $filters = isset($_GET['filters']) && !empty($_GET['filters'])  ? $_GET['filters']  : null;

            if(!in_array($table, TABLES_PRIVATES)){
                GetController::GetTabla($table,$include,$on,$fields,$where,$sort,$page,$filters);
            }
            else{
                
                if($TOKEN && AuthController::ValidateToken($TOKEN,false)){
                    GetController::GetTabla($table,$include,$on,$fields,$where,$sort,$page,$filters);
                }
                else{
                    if($TOKEN===null) { echo  JsonResponse::jsonResponseError(false,404,"Token invalid"); }
                }
            }
            
        }
        else{
            echo JsonResponse::jsonResponseError(false,404,"Not found");
            
        }
        
        
    }






    public static function post(){
        $tableURIArray = explode("/",RAIZ);
        $tableArray = array_filter($tableURIArray);
        $table = $tableArray[1];
        $data = file_get_contents("php://input");


        
        

        if($table === "Auth"){
            $method = $tableArray[2];
            if($method && $method === "Login"){
                AuthController::Login($data);
            }
            else if($method && $method === "Register"){
                AuthController::Register($data);
            }
            else if($method && $method==="ReValidateToken" ){
                $data = json_decode($data,true);
                AuthController::ReValidateToken($data['token']);
            }
            else if($method && $method==="ValidateToken" ){
                $data = json_decode($data,true);
                AuthController::ValidateToken($data['token']);
            }
            else if($method && $method==="ConfirmPassword" ){
                AuthController::ConfirmPassword($data);
            }
            else if($method && $method==="UpdatePassword" ){
                AuthController::UpdatePassword($data);
            }
            else{
                echo JsonResponse::jsonResponseError(false,404,"No method exits");
            }

        }
        else{

            $TOKEN = isset($_GET['token']) || !empty($_GET['token']) ? $_GET['token'] : null;
             
            if($table === "Upload"){
                if(!$TOKEN==null && AuthController::ValidateToken($TOKEN,false)){
                    PostController::UploadImages($_FILES,$_POST);
                }
                else{
                    if($TOKEN===null) { echo  JsonResponse::jsonResponseError(false,404,"Token invalid"); }
                }
            }
            else{
                
                if(!$TOKEN==null && AuthController::ValidateToken($TOKEN,false)){
                    PostController::InsertTable($table,$data);
                }
                else{
                    if($TOKEN===null) { echo  JsonResponse::jsonResponseError(false,404,"Token invalid"); }
                }
            }
            
        }

        
    }


    public static function patch(){
        
        $TOKEN = isset($_GET['token']) || !empty($_GET['token']) ? $_GET['token'] : null;

        
        if(!$TOKEN==null && AuthController::ValidateToken($TOKEN,false)){      
            $raiz = substr(RAIZ,0,-(strlen($TOKEN.'?token=')) );
            $tableURIArray = explode("/",$raiz);
            $tableArray = array_filter($tableURIArray);
            $table = $tableArray[1];
            $data = file_get_contents("php://input");
            $id = isset($tableArray[2]) ? $tableArray[2] : null;
            OptionsController::updateOrInsert($table,$id,$data);
        }
        else{
            if($TOKEN===null) { echo  JsonResponse::jsonResponseError(false,404 || !empty($_GET['token']),"Token invalid"); }
        }


        
    }



    public static function put(){
        $tableURIArray = explode("/",RAIZ);
        $tableArray = array_filter($tableURIArray);
        $table = $tableArray[1];
        $id = isset($tableArray[2]) ? $tableArray[2] : null;
        $data = file_get_contents("php://input");    
        $set = isset($_GET['set']) && !empty($_GET['set']) ? $_GET['set'] : null;
        $operator = isset($_GET['operator']) && !empty($_GET['operator']) ? $_GET['operator'] : null;
        
        $TOKEN = isset($_GET['token']) || !empty($_GET['token']) ? $_GET['token'] : null; 
        if(!$TOKEN==null && AuthController::ValidateToken($TOKEN,false)){            
            PutController::UpdateTable($table,$id,$data,$set,$operator);
        }
        else{
            if($TOKEN===null) { echo  JsonResponse::jsonResponseError(false,404 || !empty($_GET['token']),"Token invalid"); }
        }

        

    }






   public static function delete(){
        $tableURIArray = explode("/",RAIZ);
        $tableArray = array_filter($tableURIArray);
        $table = $tableArray[1];
        
        if(isset($_GET['namecolumns']) && !empty($_GET['namecolumns']) && isset($_GET['ids']) && !empty($_GET['ids'])){
            $namecolumns = $_GET['namecolumns']; $ids = $_GET['ids'];
            $id = null;
        }else{
            $id = isset($tableArray[2]) ? $tableArray[2] : null;
            $namecolumns = null; $ids = null;
        }
        
        $idImage = isset($_GET['idImage']) ? $_GET['idImage'] : null;

        $TOKEN = isset($_GET['token']) || !empty($_GET['token']) ? $_GET['token'] : null; 

        if(!$TOKEN==null && AuthController::ValidateToken($TOKEN,false)){
            if(isset($_GET['accion']) && $_GET['accion']=='deleteImage'){
                 $idImage= $_GET['idImage'];
                DeleteController::DeleteImage($table,$id,$idImage);
            }else{
                DeleteController::DeleteTable($table,$id,$namecolumns,$ids);
            }
        }  
        else{
            if($TOKEN===null) { echo  JsonResponse::jsonResponseError(false,404,"Token invalid"); }
        } 

    } 




    
 }

