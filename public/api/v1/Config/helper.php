<?php

function env($name,$default=null){

    if($default==null && isset($_ENV[$name])){
        return $_ENV[$name];   
    }

    return $default;

}