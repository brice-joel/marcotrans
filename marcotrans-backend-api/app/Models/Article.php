<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Article extends Model
{
    use HasFactory;
    //
    protected $fillable = ['designation', 'nature', 'unit_weight', 'unit_volume'];

    protected $casts = [
        'unit_weight' => 'decimal:2',
        'unit_volume' => 'decimal:3',
    ];

    // un article peux etre contenu dans plusieurs packages
    public function packages() // cas de la table pivot
    {
        return $this->belongsToMany(Package::class, 'package_items')
            ->withPivot('quantity')
            ->withTimestamps();
    }

    /*
    // Relation N-N à travers la table pivot order_items
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_items')
            ->withPivot('quantity')
            ->withTimestamps();
    }
            */
}
