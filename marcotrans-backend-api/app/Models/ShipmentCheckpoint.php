<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ShipmentCheckpoint extends Model
{
    use HasFactory;
    //
    protected $fillable = [
        'package_id',
        'sequence_order',
        'location_name',
        'status',
        'description_note',
        'validated_at',
    ];

    protected $casts = [
        'sequence_order' => 'integer',
        'validated_at' => 'datetime',
    ];

    // Relation 1-N inversée : Le checkpoint est lié à un colis spécifique
    public function package()
    {
        return $this->belongsTo(Package::class);
    }
}
