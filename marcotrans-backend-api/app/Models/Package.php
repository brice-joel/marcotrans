<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Package extends Model
{
    use HasFactory;
    //
    protected $fillable = [
        'order_id',
        'package_type',
        'total_weight',
        'dimensions',
        'delivery_status',
    ];

    protected $casts = [
        'total_weight' => 'decimal:2',
    ];

    // Relation 1-N inversée : Le colis appartient à une commande (peut être nul au début)
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // : Le colis peux contenir plusieurs articles dans le cas de la market place ou du sourcing
    public function articles() // cas de la table pivot
    {
        return $this->belongsToMany(Article::class, 'package_items')
            ->using(PackageItem::class) // le modele pivot
            ->withPivot('quantity')
            ->withTimestamps();
    }
    // Le colis peux contenur plusieurs elements (articles) dans le cas des expedition et livraison
    public function items() // cas sans table pivot
    {
        return $this->hasMany(PackageItem::class, 'package_id');
    }




    // Relation 1-N : Un colis passe par plusieurs checkpoints internationaux
    public function shipmentCheckpoints()
    {
        return $this->hasMany(ShipmentCheckpoint::class)->orderBy('sequence_order', 'asc');
    }
}
