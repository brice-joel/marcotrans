<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('reference', 100)->unique();
            $table->foreignId('client_id')->constrained('users'); // L'acheteur/expéditeur [cite: 126, 197]
            $table->enum('order_type', ['urban', 'interurban', 'international']); // urbain, interurbain, international [cite: 127]
            $table->text('departure_address'); //adresse de depart         
            $table->text('delivery_address'); // adresse de destination (adresse de livraison)
            $table->decimal('total_price', 10, 2); // Montant en XAF/Naira/etc [cite: 132, 198]
            $table->enum(
                'order_status',
                [
                    'pending',
                    'processing',
                    'in_transit',
                    'delivered',
                    'cancelled'
                ]
            )->default('pending'); // pending, processing, in_transit, delivered, cancelled 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
