<?php


namespace GetController;

use Models\Models;
use JsonResponse\JsonResponse;

class GetController {


    public static function GetTabla ($table,$include,$on,$fields,$where,$sort,$page,$filters){



        $TABLE = $table;


        /*================================================================================================*/
        if(($where!==null) && count($where)<3 ){
            echo JsonResponse::jsonResponseError("Error",404,"An error has occurred in where params.");
            return;
        }
        else{
            if($where){
                $WHERE="WHERE ";
                foreach($where as $value){
                    $WHERE .= $value." ";
                }
            }
            else{
                $WHERE = " WHERE 1 ";
            }
        }
        /*================================================================================================*/
        


        /*================================================================================================*/
        if($filters){
            if(!empty($filters['search']) && !empty($filters['field'])){

                $explodeField = explode(",",$filters['field']);
                $WHERE .=" AND (";
                
                if(count($explodeField)>1){
                    foreach ($explodeField as $key => $value) {
                        $WHERE .= " ".$value." LIKE '%".$filters['search']."%' OR";    
                    }
                    $WHERE = substr($WHERE,0,-2);
                }
                else{
                    
                    $WHERE .= $filters['field']." LIKE '%".$filters['search']."%' ";
                    
                }
                $WHERE .=" )";
            }
        
        }
        /*================================================================================================*/



        /*================================================================================================*/
        $FIELDS = $fields ? $fields : "*";
        /*================================================================================================*/




        /*================================================================================================*/
        if($sort){
             $SORT = "ORDER BY ";
            
            $explodesort = explode(",",$sort);

            foreach ($explodesort as $key => $value) {
                $e = explode("-",$value);
                if(count($e)>1){
                    $SORT .= $e[1]." ASC,";
                 }
                 else{
                    $SORT .= $e[0]." DESC,";
                 }
            }
            $SORT = substr($SORT,0,-1);
        }
        else{
            $SORT = " ";
        }
        /*================================================================================================*/
        
        
        /*================================================================================================*/
        $PAGELIMITER = "";
        if($page!==null && count($page)>1 &&  isset($page['size']) && $page['size']!=="" ){
            
            if(!empty($page['size']) && !empty($page['number'])){
                $PAGELIMITER = "LIMIT ".$page['number'].",".$page['size'];
            }
            else if(!empty($page['size'])){
                $PAGELIMITER = "LIMIT ".$page['size'];
            }
            else{
                $PAGELIMITER = " ";
            }
            
            
        }
        else{
            $PAGELIMITER =" ";
        }
        /*================================================================================================*/


        /*================================================================================================*/
        if($include && $on){
            $i=0;                
            foreach($include as $valor){
                $TABLE .=",$valor";
            
                $WHERE .= " AND ". $on[$i]."=".$on[$i+1]." ";
                $i = $i+2;
            }
        }
        
            $SQL = "SELECT $FIELDS FROM $TABLE $WHERE $SORT $PAGELIMITER";
        
        /*================================================================================================*/
        //echo $SQL;return;
        echo Models::GET($SQL,$table);


    }


}