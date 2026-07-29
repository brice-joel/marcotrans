<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reference' => $this->reference,
            'type' => $this->order_type, // urbain, interurbain, international
            'status' => $this->order_status,
            'departure_address' => $this->departure_address,
            'delivery_address' => $this->delivery_address,
            'total_price' => (float) $this->total_price,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),

            // Relations imbriquées conditionnelles
            'client' => new UserResource($this->whenLoaded('client')),
            'packages' => PackageResource::collection($this->whenLoaded('packages')),

        ];
    }
}
