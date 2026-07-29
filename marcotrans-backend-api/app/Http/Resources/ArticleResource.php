<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'designation' => $this->designation,
            'nature' => $this->nature,
            'weight_kg' => (float) $this->unit_weight, // Cast explicite pour éviter les chaînes de caractères en JS
            'volume_m3' => (float) $this->unit_volume,
            // Récupère la quantité depuis la table pivot si l'article est rattaché à une commande
            'quantity' => $this->whenPivotLoaded('package_items', function () {
                return $this->pivot->quantity;
            }),
        ];
    }
}
