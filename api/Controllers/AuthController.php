<?php

namespace AuthController;


use DataBaseConnect\DataBaseConnect;
use DateTimeImmutable;
use Firebase\JWT\JWT;
use JsonResponse\JsonResponse;
use PDO;
use PostController\PostController;
use PutController\PutController;

class AuthController {


    private static $secret_key = 'S9d1e5.xx';
    private static $encrypt = ['HS256'];




    public static function Login($data){


        $data = json_decode($data,true);
        date_default_timezone_set(TIME_ZONE);
        $last_login = date('Y-m-d H:i:s');
        $intentos = 5; // el usuario al principio tiene 5 intentos
        $password = $data['password_user'];
        $userOrEmail = $data['username_user'];
        //print_r($last_login);return;
        $res = self::ExistUser($userOrEmail);
  
        if (!empty($res) && count($res) > 0 && $res != null) {
            //verificamos si no intenta ingresar muchas veces a fuerza bruta
            if ($res[0]->try_user < $intentos) {
                // verificamos si la contra es igual
                if (password_verify($password, $res[0]->password_user)) {
                    if($res[0]->estado_user==0){
                        echo JsonResponse::jsonResponseError("Error",200,"User inactive");
                    }else{
                        $data_pa_token = array(
                            "id_user" => $res[0]->id_user,
                            "username_user"=>$res[0]->username_user,
                            "nombre_user" => $res[0]->nombre_user,
                            "rol_user"=>$res[0]->rol_user
                        );
                        $token = self::GenerateToken($data_pa_token);
                        $data = '{"try_user": "0","last_login_user":"' .$last_login.'"}';
                        
                        PutController::UpdateTable(USERS_TABLE,$res[0]->id_user,$data,null,false);
                        $result = array(
                            "id_user" => $res[0]->id_user,
                            "username_user"=>$res[0]->username_user,
                            "nombre_user" => $res[0]->nombre_user,
                            "rol_user"=>$res[0]->rol_user,
                            "token_user" => $token,
                        );
                        echo JsonResponse::jsonResponseGET(array($result),"ok",200,1);
                    }
                } // si no es igual aumentamos los try intentos
                else {
                    $try = $res[0]->try_user + 1;
                    $data = ["try_user" => $try];
                    PutController::UpdateTable(USERS_TABLE,$res[0]->id_user,json_encode($data,true),null,false);
                    echo JsonResponse::jsonResponseError("Error",200,"Password invalid.");
                    return;
                }
            } else {
                echo JsonResponse::jsonResponseError("Error",200,"Your accounts has be blocked.");
            }
        } else {
            echo JsonResponse::jsonResponseError("Error",200,"User doesn't exist.");
            return;
        }

    }








    public static function ExistUser($user,$email=null){

        try {
            if($email===null){
                $sql = "SELECT id_user,username_user,nombre_user,email_user,password_user,try_user,rol_user,estado_user FROM ".USERS_TABLE." WHERE username_user = :user OR email_user= :user LIMIT 1;";
            }
            else{
                $sql = "SELECT username_user,email_user FROM ".USERS_TABLE." WHERE username_user = :user OR email_user= :email LIMIT 1;";
            }
            $pdo = DataBaseConnect::connect();
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":user", $user);
            if($email!==null){ $stmt->bindParam(":email", $email); }
            $stmt->execute();
            $res = $stmt->fetchAll(PDO::FETCH_CLASS);
            return $res;
        } catch (\Throwable $th) {
            echo JsonResponse::jsonResponseError("Error",200,$th->getMessage());
            return;
            die();
        }


    }
    
    public static function UpdatePassword($data){
        try{
            $data = json_decode($data, true);
            $password = $data['password_user'];
            $id = $data['id_user'];
            $passwordHash = password_hash($password, PASSWORD_DEFAULT); 
            $values = '{"password_user": "'.$passwordHash.'"}';
            PutController::UpdateTable(USERS_TABLE,$id,$values,null,true);
        }
        catch (\Throwable $th) {
            
            echo JsonResponse::jsonResponseError("Error",200,$th->getMessage());
            return;
            die();
        }

    }


    public static function ConfirmPassword ($data){
        try {
            
            $data = json_decode($data,true);
            $user = $data['username_user'];
            $password = $data['password_user'];
            $res = self::ExistUser($user);

            
            if (!empty($res) && count($res) > 0 && $res != null) {
                if (password_verify($password, $res[0]->password_user)) {
                    echo JsonResponse::jsonResponseGET([],"ok",200,1,1);
                }
                else{
                    echo JsonResponse::jsonResponseError("Error",200,"Error password");
                }
            }
            else{
                echo JsonResponse::jsonResponseError("Error",200,"No user found");
            }
            

        } catch (\Throwable $th) {
            
            echo JsonResponse::jsonResponseError("Error",200,$th->getMessage());
            return;
            die();
        }

    }




    public static function Register($data){


        $valor = json_decode($data, true);

        $email = str_replace('"', '', str_replace("'", "", str_replace("`", "", $valor['email_user'] ) ));
        $user = str_replace('"', '', str_replace("'", "", str_replace("`", "", $valor['username_user'] ) ));
        $password = str_replace('"', '', str_replace("'", "", str_replace("`", "", $valor['password_user'] ) ));
        $res = self::ExistUser($user,$email);
        
        
        if (count($res) < 1) {
            
            $valor['password_user'] = password_hash($password, PASSWORD_DEFAULT); 
            $data = json_encode($valor);
            PostController::InsertTable(USERS_TABLE,$data);
        }
        else{
            echo JsonResponse::jsonResponseError("Error",200,"Ya existe ese usuario.");
        }
        
        

    }

    public static function UpdateUser (){

    }


    
    




    public static function ValidateToken($token,$json=true){

        try {
            $decode = JWT::decode(
                $token,
                self::$secret_key,
                self::$encrypt
            );

            if ($decode->aud !== self::Aud() || $decode->iss !== DOMAIN_AUTH) {
                return false;
                die();
            } else {
                if($json){
                    $res = self::GetData($token);
                    echo JsonResponse::jsonResponseGET($res,"ok",200,1); 
                }
                return true;
            }

        } catch (\Exception $e) {

            echo JsonResponse::jsonResponseError("Error",200,$e->getMessage());
            return false;
            die();
        }
            

    }

    public static function GenerateToken($data){

        $time = new DateTimeImmutable();
        $expire = $time->modify('+1380 minutes')->getTimestamp();
        $serverName = DOMAIN_AUTH;

        $token = array(
            'iat'=> $time->getTimestamp(),
            'iss'=> $serverName,
            'nbf'=>$time->getTimestamp(),
            'exp' => $expire,
            'aud' => self::Aud(),
            'data' => $data
        );

        return JWT::encode($token, self::$secret_key);

    }


    public static function GetData($token)
    {
        $decode = JWT::decode(
            $token,
            self::$secret_key,
            self::$encrypt
        )->data;
        
        return [$decode];
    }



    private static function Aud()
    {
        $aud = '';

        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $aud = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $aud = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $aud = $_SERVER['REMOTE_ADDR'];
        }

        $aud .= @$_SERVER['HTTP_USER_AGENT'];
        $aud .= gethostname();

        return sha1($aud);
    }


}