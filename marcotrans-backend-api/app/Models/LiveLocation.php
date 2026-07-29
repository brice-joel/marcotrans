<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LiveLocation extends Model
{
    use HasFactory;
    //
    // On désactive les timestamps Laravel par défaut car la table utilise uniquement recorded_at
    public $timestamps = false;

    protected $fillable = [
        'order_id',
        'driver_id',
        'latitude',
        'longitude',
        'recorded_at',
    ];

    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'recorded_at' => 'datetime',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }
}
