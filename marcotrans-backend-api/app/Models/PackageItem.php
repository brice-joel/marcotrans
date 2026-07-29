<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class PackageItem extends Pivot
{
    //
    protected $table = 'package_items'; // on specifie la table pivot
    // 
    protected $fillable = [
        'package_id',
        'article_id',
        'designation',
        'nature',
        'unit_weight',
        'unit_volume',
    ];
    public $incrementing = true; // indispensable car, on a un ID unique sur cette table

    // Relation 1-N :un article expedier appartient à un et un seul colis
    public function package()
    {
        return $this->belongsTo(Package::class);
    }
}
