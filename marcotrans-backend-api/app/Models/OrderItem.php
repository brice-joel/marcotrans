<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderItem extends Pivot
{
    use HasFactory;
    //
    protected $fillable = ['order_id', 'article_id', 'quantity'];
    public $timestamps = true; // On garde les timestamps pour suivre la création et mise à jour des items de commande
    // Relation inverse vers Order    public function order()

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    // Relation inverse vers Article
    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}
