<?php

use App\Http\Controllers\GetController;
use Illuminate\Support\Facades\Route;


//Route::get("/users",function(){});

//Route::get('/{table}',[GetController::class,'getTable'])->name('GetTables');


Route::group(['middleware' => ['jwt.auth']], function () {
   Route::get("/pdf",function(){
    return response()->json([
        "response"=>true,
        "results"=>[]
    ]);
   });
});
