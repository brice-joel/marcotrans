<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PackageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_id' => $this->order_id,
            'type' => $this->package_type,
            'weight' => (float) $this->total_weight,
            'volume' => (float) $this->total_volume,
            'dimensions' => $this->dimensions,
            'status' => $this->delivery_status, // Le statut standardisé issu de notre correction
            'created_at' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : null,
            'order' => $this->whenLoaded('order', function () {
                return [
                    'id' => $this->order->id,
                    'reference' => $this->order->reference,
                    'status' => $this->order->order_status,
                    'type' => $this->order->order_type,
                    'client' => $this->order->relationLoaded('client') && $this->order->client ? [
                        'id' => $this->order->client->id,
                        'name' => $this->order->client->name,
                        'email' => $this->order->client->email,
                    ] : null,
                ];
            }),
            // Inclusion automatique et ordonnée des étapes de suivi si la relation est chargée
            'tracking_timeline' => CheckpointResource::collection($this->whenLoaded('shipmentCheckpoints')),
            'articles' => ArticleResource::collection($this->whenLoaded('articles')),
            'package_items' => PackageItemResource::collection($this->whenLoaded('items'))
        ];
    }
}
