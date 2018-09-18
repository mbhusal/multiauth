<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::group(['prefix'=>'admin'], function (){
    Route::GET('home', 'AdminController@index')->name('admin.home');
    Route::GET('login', 'Admin\LoginController@showLoginForm')->name('admin.login');
    Route::POST('login', 'Admin\LoginController@login');
    Route::POST('password/email','Admin\ForgotPasswordController@sendResetLinkEmail')->name('admin.passwords.email');
    Route::GET('password/reset','Admin\ForgotPasswordController@showLinkRequestForm')->name('admin.passwords.request');
    Route::POST('password/reset','Admin\ResetPasswordController@reset');
    Route::GET('password/reset/{token}','Admin\ResetPasswordController@showResetForm')->name('admin.passwords.reset');
    Route::GET('register', 'Admin\RegisterController@showRegistrationForm')->name('admin.register');
    Route::POST('register','Admin\RegisterController@registeradmin')->name('admin.as.register');
});

Route::get('verify/{email}/{verifyToken}','Auth\RegisterController@emailSent')->name('emailsent');
Route::get('verifyadmin/{email}/{verifyToken}','Admin\RegisterController@emailSent')->name('emailsentadmin');