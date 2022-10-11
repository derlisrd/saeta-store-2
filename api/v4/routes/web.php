<?php

use App\Http\Controllers\GetController;
use Illuminate\Support\Facades\Route;


//Route::get("/users",function(){});

//Route::get('/{table}',[GetController::class,'getTable'])->name('GetTables');


Route::post('login', [ApiController::class, 'authenticate']);
Route::post('register', [ApiController::class, 'register']);

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('pdf',function(){
        return response()->json(
           [
            "response"=>true,
            "results"=>[]
           ]
        );
    });
});
