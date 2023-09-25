<?php

use App\Http\Controllers\BalanceController;
use App\Http\Controllers\CurrentStatusController;
use App\Http\Controllers\DailybazarController;
use App\Http\Controllers\DailymealController;
use App\Http\Controllers\DeleteController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// User Registration;
Route::post('/login', [UserController::class, 'Login']);
Route::post('/verify', [UserController::class, 'verifyToken']);

// Request Mess Manager;
Route::post('/request-manager', [RequestController::class, 'requestManager']);

// Member Table
Route::post('/add-member', [MemberController::class, 'addMember']);
Route::put('/update-member/{id?}', [MemberController::class, 'updateMember']);
Route::delete('/delete-member/{id?}', [MemberController::class, 'deleteMember']);

// Balance Table;
Route::post('/add-balance', [BalanceController::class, 'addBalance']);
Route::put('/update-balance/{id?}', [BalanceController::class, 'updateBalance']);

// Daily Meal Table;
Route::post('/save-dailymeal', [DailymealController::class, 'saveDailyMealData']);
Route::put('/update-meal-number/{id?}', [DailymealController::class, 'updateMealNumber']);

// Daily Bazar Table;
Route::post('/save-dailybazar', [DailybazarController::class, 'saveDailyBazar']);
Route::put('/update-dailybazar', [DailybazarController::class, 'updateDailyBazar']);

// Delete all data;
Route::post('/delete-data', [DeleteController::class, 'deleteAlldata']);


Route::get('/user/{email}', [UserController::class, 'getUserByEmail']);
//All secure URL's
Route::group(['middleware' => 'auth:sanctum'], function () {
    // User information secured;
    Route::get('/user-req-details/{email?}', [RequestController::class, 'getReqUserById']);
    Route::get('/user-req-status/{email?}', [RequestController::class, 'getReqStatus']);
    Route::get('/member/{email?}', [MemberController::class, 'getMember']);
    Route::get('/member-id/{id?}', [MemberController::class, 'getMemberDetails']);
    Route::get('/show-balance/{email?}', [BalanceController::class, 'showBalance']);
    Route::get('/view-meal-status', [DailymealController::class, 'getMealStatus']);
    Route::get('/show-daily-bazar', [DailybazarController::class, 'showDailyBazar']);

    Route::get('/collected-amount', [CurrentStatusController::class, 'getBalances']);
    Route::get('/cost-bazar', [CurrentStatusController::class, 'getBazarCost']);
    Route::get('/cost-meal', [CurrentStatusController::class, 'getTotalMeal']);
    Route::get('/total-meal-for-member', [CurrentStatusController::class, 'getTotalMealForMember']);

});