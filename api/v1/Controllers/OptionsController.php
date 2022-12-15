<?php



namespace OptionsController;

use Models\Models;
use JsonResponse\JsonResponse;

class OptionsController {


    public static function updateOrInsert($table,$id='',$data,$resp=true){

        $valor = json_decode($data, true);
        
        $CAMPO_ID = "id_";
        $CAMPO_ID .= substr($table,0,-1). ','; 
        $idvalue = $id.',';
        if($id==''){
            $CAMPO_ID = '';    
            $idvalue = '';
        }
        

        

        $CAMPOS_INSERT ="($CAMPO_ID";
        $VALUES_INSERT = "VALUES ($idvalue";
        
        foreach ($valor as $key => $value) {
            $CAMPOS_INSERT .= $key.",";
            $VALUES_INSERT .= "'".$value."',";
        }
        $CAMPOS_INSERT  = substr($CAMPOS_INSERT,0,-1);
        $CAMPOS_INSERT .= ")";
        $VALUES_INSERT  = substr($VALUES_INSERT,0,-1);
        $VALUES_INSERT .=")";
        

        $SET = "";
        foreach ($valor as $key => $value) {
            $SET .= $key. " = '" . $value. "', ";
        }

        $SET  = substr($SET,0,-2);

        $sql = "INSERT INTO $table $CAMPOS_INSERT $VALUES_INSERT ON DUPLICATE KEY UPDATE  $SET ";
        
        $response = Models::OPTIONS($sql,$table);

        if($resp){
            echo $response;
        }

    }

}