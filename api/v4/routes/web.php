<?php

use App\Http\Controllers\GetController;
use Illuminate\Support\Facades\Route;


Route::get("/users",function(){

});
Route::get('/{table}',[GetController::class,'getTable'])->name('GetTables');
