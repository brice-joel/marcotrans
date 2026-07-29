<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCheckpointRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'package_id' => 'required|exists:packages,id',
            'sequence_order' => 'required|integer|min:1',
            'location_name' => 'required|string|max:255',
            'status' => 'required|string|in:pending,completed',
            'description_note' => 'nullable|string|max:1000',
            'validated_at' => 'nullable|date_format:Y-m-d H:i:s', // Permet de forcer une date/heure précise si besoin
        ];
    }

    public function messages(): array
    {
        return [
            'sequence_order.min' => 'L\'ordre de l\'escale doit être un entier positif commençant à 1.',
            'status.in' => 'Le statut d\'étape doit être soit "pending" (en attente), soit "completed" (validé).',
        ];
    }
}
