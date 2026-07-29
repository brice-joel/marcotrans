<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DriverProfile extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'user_id',
        'vehicle_type',
        'license_number',
        'license_plate',
        'is_available',
    ];

    protected $casts = [
        'is_available' => 'boolean',
    ];

    // Relation 1-1 inversée : Le profil appartient à un utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
