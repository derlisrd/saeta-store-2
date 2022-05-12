<?php

namespace PutController;

use Models\Models;

class PutController {


    public static function UpdateTable($table,$id,$data,$set=null,$resp=true){

        
        $valor = json_decode($data, true);
        $SET = "SET ";
        foreach ($valor as $key => $value) {
            $SET .= $key. "='" . $value. "', ";
        }
        if($set!==null){
            $set = explode(",",$set);
            foreach($set as $value){
                $SET .= $value;
            }
        }
        $SET  = substr($SET,0,-2);

        
        $CAMPO_ID = "id_";
        $CAMPO_ID .= substr($table,0,-1); 
        $WHERE = "$CAMPO_ID = $id";
        
            
        

        $sql = "UPDATE $table $SET WHERE  $WHERE ";
        
        $response = Models::PUT($sql);
        if($resp){
            echo $response;
        }
        

    }

}