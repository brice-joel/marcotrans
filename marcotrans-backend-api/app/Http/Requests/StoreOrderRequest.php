<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        // On permet la création si l'utilisateur est authentifié
        return auth()->check();
    }

    public function rules(): bool|array
    {
        return [
            'client_id' => 'required|exists:users,id',
            'order_type' => 'required|string|in:urbain,interurbain,international',
            'delivery_address' => 'required|string|min:5',
            'total_price' => 'required|numeric|min:0',
            // Validation du tableau d'articles inclus dans la commande
            'items' => 'required|array|min:1',
            'items.*.article_id' => 'required|exists:articles,id',
            'items.*.quantity' => 'required|integer|min:1',
        ];
    }

    public function messages(): array
    {
        return [
            'order_type.in' => 'Le type de commande doit être : urbain, interurbain ou international.',
            'items.required' => 'Une commande doit contenir au moins un article.',
            'items.*.article_id.exists' => 'L\'un des articles sélectionnés n\'existe pas dans le catalogue.',
            'items.*.quantity.min' => 'La quantité d\'un article ne peut pas être inférieure à 1.',
        ];
    }
}
