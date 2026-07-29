<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePackageRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Seuls les utilisateurs avec des privilèges de gestion (commercial, admin) peuvent enregistrer un colis
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'order_id' => 'nullable|exists:orders,id', // Nullable pour permettre le groupage ou l'attente de liaison
            'package_type' => 'required|string|in:carton,palette,sachet,conteneur',
            'total_weight' => 'required|numeric|gt:0', // Strictement supérieur à 0 kg
            'dimensions' => ['required', 'string', 'regex:/^\d+(\.\d+)?m?\s*x\s*\d+(\.\d+)?m?\s*x\s*\d+(\.\d+)?m?$/i'], // Force le format standardisé : ex "1x1x1.2" ou "1m x 1m x 1.2m"
        ];
    }

    public function messages(): array
    {
        return [
            'package_type.in' => 'Le type de colis doit être un carton, une palette, un sachet ou un conteneur.',
            'total_weight.gt' => 'Le poids total du colis doit être supérieur à 0 kg.',
            'dimensions.regex' => 'Le format des dimensions doit respecter la convention standard (ex: 1x1x1.2).',
        ];
    }
}
