<?php

namespace Route\Response;

class Response {


    public static function json(Array $array, int $status = 200){

        return json_encode($array,http_response_code($status));
    }
}