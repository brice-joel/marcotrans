<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateDeliveryStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        return [
            'delivery_status' => [
                'required',
                'string',
                'in:received,assigned,accepted,in_agency,customs_export,in_transit,customs_import,distribution,available_for_pickup,delivered'
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'delivery_status.in' => 'Le statut logistique fourni est invalide.',
        ];
    }
}
