<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;
    //
    protected $fillable = [
        'reference',
        'client_id',
        'order_type',
        'delivery_address',
        'total_price',
        'order_status',
    ];

    protected $casts = [
        'total_price' => 'decimal:2',
    ];

    // Relation 1-N inversée : La commande appartient à un client (User)
    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }
    /*
    // Relation N-N avec les Articles via order_items
    public function articles()
    {
        return $this->belongsToMany(Article::class, 'order_items')
            ->withPivot('id', 'quantity')
            ->withTimestamps();
    }
            */

    // Relation 1-N : Une commande peut contenir plusieurs colis (Packages)
    public function packages()
    {
        return $this->hasMany(Package::class);
    }

    // Relation 1-N : Une commande (urbaine) génère des pings GPS de tracking
    public function liveLocations()
    {
        return $this->hasMany(LiveLocation::class);
    }
}
