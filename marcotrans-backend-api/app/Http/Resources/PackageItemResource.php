<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PackageItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'article_id' => $this->article_id,
            'designation' => $this->designation,
            'nature' => $this->nature,
            // Récupère la quantité depuis la table pivot si l'article est rattaché à une commande
            'quantity' => $this->quantity

        ];
    }
}
