<?php

namespace PutController;

use DateTime;
use DateTimeZone;
use Models\Models;

class PutController {


    public static function UpdateTable($table,$id,$data,$set=null,$resp=true,$operator="="){

        
        $valor = json_decode($data, true);
        $SET = "SET ";
        foreach ($valor as $key => $value) {
            $SET .= $key. " $operator '" . $value. "', ";
        }
        if($set!==null){
            $set = explode(",",$set);
            foreach($set as $value){
                $SET .= $value;
            }
        }
        //$SET  = substr($SET,0,-2);

        
        $CAMPO_ID = "id_";
        $CAMPO_ID .= substr($table,0,-1); 
        $WHERE = "$CAMPO_ID = $id";
        $UPDATED_AT = " updated_at= '".self::datenow('Y-m-d H:i:s')."'";
            
        

        $sql = "UPDATE $table $SET $UPDATED_AT WHERE  $WHERE ";
        
        $response = Models::PUT($sql);
        if($resp){
            echo $response;
        }
        

    }

    public static function datenow($format){
        $date = new DateTime(date('Y-m-d H:i:s'), new DateTimeZone(TIME_ZONE));
        return $date->format($format);
    }

}