<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            // Renvoie la liste des rôles sous forme de tableau d'objets
            'roles' => $this->whenLoaded('roles', function () {
                return $this->roles->map(function ($role) {
                    return [
                        'name'        => $role->name,
                        'description' => $role->description, // Assurez-vous que cette colonne existe en BDD
                    ];
                })->toArray();
            }),
            // Charge le profil chauffeur uniquement si la relation a été demandée au préalable
            'driver_profile' => $this->whenLoaded('driverProfile', function () {
                return [
                    'vehicle_type' => $this->driverProfile->vehicle_type,
                    'license_plate' => $this->driverProfile->license_plate,
                    'is_available' => $this->driverProfile->is_available,
                ];
            }),
        ];
    }
}
