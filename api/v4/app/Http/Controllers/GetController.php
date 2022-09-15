<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class GetController extends Controller
{
    public function getTable (Request $request){

        $resposta = [
            "found"=>0,
            "total"=>0,
            "results"=>[],
            "table"=>$request->table,
            "response"=>true,
            "error"=>false,
            "message"=>""
        ];
        $status = 404;
        if(Schema::hasTable($request->table)){
            $result = DB::table($request->table)->get();
            $resposta = [
                "found"=>0,
                "total"=>0,
                "results"=>$result,
                "table"=>$request->table,
                "response"=>true,
                "error"=>false,
                "message"=>""
            ];
            $status = 200;
        }
        return response()->json($resposta,$status);
    }
}
