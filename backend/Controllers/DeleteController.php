<?php

namespace DeleteController;

use Models\Models;

class DeleteController {

    public static function DeleteImage($table,$path,$idImage){
        
        $CAMPO_ID = "id_";
        $CAMPO_ID .= substr($table,0,-1);
            
        $sql = "DELETE FROM $table  WHERE $CAMPO_ID = $idImage ";
        $sql2 = "SELECT * FROM $table  WHERE $CAMPO_ID = $idImage";
        $value = Models::GET_INTERNO($sql2);
        $name = $value[0]->image_name;
        $path = "../".UPLOADPATH."/".$table."/".$path."/".$name;
        if(file_exists($path)){
            @unlink($path);
        }
        
        echo Models::DELETE($sql);
    }

    public static function DeleteTable($table,$id,$namecolumns=null,$ids=null){

        if($ids==null && $namecolumns==null){
            $CAMPO_ID = "id_";
            $CAMPO_ID .= substr($table,0,-1); 
            $sql = "DELETE FROM $table  WHERE $CAMPO_ID = $id ";
        }
        else{
            $DELETE = "";
            $namecolumns = explode(",",$namecolumns);
            $ids = explode(",",$ids);
            foreach ($namecolumns as $key => $columnValue) {
                $DELETE .= $columnValue." = '".$ids[$key]."' AND ";
            }
            $DELETE = substr($DELETE,0,-4);
            $sql = "DELETE FROM $table WHERE $DELETE ";
        }
        
        //echo $sql; return;
        $response = Models::DELETE($sql);
        echo $response;

    }
    

}