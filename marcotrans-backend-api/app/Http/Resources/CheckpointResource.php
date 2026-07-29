<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CheckpointResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sequence_order' => $this->sequence_order,
            'location_name' => $this->location_name,
            'status' => $this->status, // pending ou completed
            'description_note' => $this->description_note,
            'validated_at' => $this->validated_at ? $this->validated_at->format('Y-m-d H:i:s') : null,
        ];
    }
}
