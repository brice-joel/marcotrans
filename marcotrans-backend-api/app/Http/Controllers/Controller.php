<?php

namespace App\Http\Controllers;

use OpenApi\Attributes as OA;

#[OA\Info(
    version: "1.0.0",
    description: "Documentation de l'API Backend pour le système Marcotrans",
    title: "API Marcotrans",
    contact: new OA\Contact(email: "contact@marcotrans.com")
)]
#[OA\Server(
    url: L5_SWAGGER_CONST_HOST,
    description: "Serveur API"
)]
#[OA\SecurityScheme(
    securityScheme: "bearerAuth",
    type: "http",
    scheme: "bearer"
)]
abstract class Controller
{
    //
}
