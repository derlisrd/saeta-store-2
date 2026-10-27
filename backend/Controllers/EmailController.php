<?php

namespace EmailController;

use JsonResponse\JsonResponse;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class EmailController {


    public static function send_email($data){
        $data = json_decode($data);
        
        $destino =  $data->email;
        
        if(!(filter_var($destino, FILTER_VALIDATE_EMAIL))){
            return JsonResponse::jsonResponseError(false,200,'Email invalid');
        }
        
        if(!isset($data->nombre)){
            return JsonResponse::jsonResponseError(false,200,'Nombre invalid');
        }
        $nombre = $data->nombre;
        
        $mail = new PHPMailer(true);
        try {
            $email = env('EMAIL');
            //Server settings
            //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
            $mail->SMTPDebug = 0;
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = $email;                     //SMTP username
            $mail->Password   = env('EMAIL_PASSWORD');                               //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
            $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //Recipients
            $mail->setFrom($email, 'Saeta Store');
            $mail->addAddress($destino, $nombre);     //Add a recipient
            //$mail->addAddress('ellen@example.com');               //Name is optional
            $mail->addReplyTo('derlisruizdiaz@hotmail.com', 'Derlis Ruiz Diaz');
            //$mail->addCC('saetatienda.com@gmail.com');
            //$mail->addBCC('bcc@example.com');

            //Attachments
            //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
            //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = 'Here is the subject';
            $mail->CharSet = 'UTF-8';
            $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            $mail->send();
            return JsonResponse::jsonMessage(true,200,'Message have to be sent');
        } catch (Exception $e) {
            return JsonResponse::jsonMessage(false,200,$mail->ErrorInfo);
        }
    }

}