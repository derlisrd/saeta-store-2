<?php

namespace PostController;
use JsonResponse\JsonResponse;
use Models\Models;

class PostController {


    public static function InsertTable($table,$data){

        
        $valor = json_decode($data, true);
        $CAMPOS ="(";
        $VALUES = "VALUES (";
        
        foreach ($valor as $key => $value) {
            $CAMPOS .= $key.",";
            $VALUES .= "'".$value."',";
        }
        $CAMPOS  = substr($CAMPOS,0,-1);
        $CAMPOS .= ")";
        $VALUES  = substr($VALUES,0,-1);
        $VALUES .=")";

        $sql = "INSERT INTO $table $CAMPOS $VALUES";
        $response = Models::POST($sql,$table);
        echo $response;

    }

    
    

/** codigo momentaneo para subir foto a productos images, pq este debe ser dinamico */
    public static function UploadImages($file,$data){


        if($data && $data["table"] && $data['path'] && $file["image"] ){
            

            
            
            $path = UPLOADPATH."/".$data["table"]."/".$data['path']."/";
            if (!file_exists($path)) {mkdir($path, 0777, true);}
            $imageTmp = $file["image"]["tmp_name"];
            $imageMove = $path.$file["image"]["name"];
            $imageURLbase = PROTOCOLO.DOMINIO.UPLOADPATHNAME."/".$data["table"]."/".$data['path']."/".$file["image"]["name"];
            $table = $data['table'];
            $campos = "url_imagen,";
            $values = "'$imageURLbase',";
            foreach (json_decode($data["data"], true) as $key => $value) {
                $campos .= $key.",";
                $values .= "'".$value."',";
            }
            $campos = substr($campos,0,-1);
            $values = substr($values,0,-1);
            
            $NEWVALUES = '';
            foreach (json_decode($data["data"], true) as $key => $value) {
                $NEWVALUES .= $key. "=" . $value. "',";
            }
            $NEWVALUES = substr($NEWVALUES,0,-1);
            //$sql = "INSERT INTO $table ($campos) VALUES ($values)";
            $sql = "INSERT INTO $table ($campos) VALUES ($values) ON DUPLICATE KEY UPDATE $NEWVALUES ";

            
             if(move_uploaded_file($imageTmp,$imageMove)){
                $max_res = 640;
                
                if($file["image"]["type"]=="image/jpeg")
                {
                    $original_img = imagecreatefromjpeg($imageMove);
                    
                }
                else if($file["image"]["type"]=="image/png"){
                    $original_img = imagecreatefrompng($imageMove);
                }
                else{
                    return;
                }        
                


                $original_w = imagesx($original_img);
                $original_h = imagesy($original_img);
                $ratio = $max_res / $original_w;
                $new_w = $max_res;
                $new_h = $original_h * $ratio;
                if($new_h > $max_res){
                    $ratio = $max_res / $original_h;
                    $new_h = $max_res;
                    $new_w = $original_w * $ratio;
                }
                if($original_img){
                    $new_img = imagecreatetruecolor($new_w,$new_h);
                    imagecopyresampled($new_img,$original_img,0,0,0,0,$new_w,$new_h,$original_w,$original_h);
                    if($file["image"]["type"]=="image/jpeg")
                    {    
                        imagejpeg($new_img,$imageMove,90);   
                    }
                    else if($file["image"]["type"]=="image/png"){
                        imagepng($new_img,$imageMove,9);
                    }
                   
                }


                $response = Models::POST($sql,$data['table']);
                echo $response;    
            }  
        }
        else{
            echo JsonResponse::jsonResponseError(false,404,"File no uploaded!");
        }
       
    }






}