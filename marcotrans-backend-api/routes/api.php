<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CheckpointController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\OrderPackageController;
use App\Http\Controllers\Api\PackageController;
use App\Http\Controllers\Api\PackageItemController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



/*
|--------------------------------------------------------------------------
| API Routes - MarcoTrans Platform
|--------------------------------------------------------------------------
*/

// Routes Publiques (Accessibles sans connexion)
Route::post('/login', [AuthController::class, 'login']);

// Routes Protégées (Nécessitent un Bearer Token valide dans le Header)
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    // Gestion des Commandes Commerciales
    Route::get('/orders', [OrderController::class, 'index'])->withoutMiddleware('auth:sanctum'); // Permet d'accéder à la liste des commandes sans authentification
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{reference}', [OrderController::class, 'show'])->withoutMiddleware('auth:sanctum');

    Route::get('/orders/{reference}/packages', [OrderPackageController::class, 'index']);

    // Gestion de la Logistique & des Colis
    Route::prefix('packages')->controller(PackageController::class)->group( function () {
        Route::post('/', 'store');
        Route::post('/checkpoints', 'addCheckpoint');
        Route::patch('/{id}/status', 'updateStatus');
        Route::get('/', 'index')->withoutMiddleware('auth:sanctum');
        Route::get('/{id}', 'show')->withoutMiddleware('auth:sanctum');
        Route::get('/{id}/items', 'index')->withoutMiddleware('auth:sanctum');
    });

    Route::get('/packages/{id}/checkpoints', [CheckpointController::class, 'index'])->withoutMiddleware('auth:sanctum');
});
