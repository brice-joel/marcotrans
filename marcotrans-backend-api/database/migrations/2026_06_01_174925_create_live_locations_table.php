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
        Schema::create('live_locations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->foreignId('driver_id')->constrained('users'); // Référence au livreur actif [cite: 192, 197]
            $table->decimal('latitude', 10, 8); // Pas de nul possible pour des coordonnées GPS [cite: 193]
            $table->decimal('longitude', 11, 8);
            $table->timestamp('recorded_at'); // Moment du ping GPS [cite: 195]
            // Pas de timestamps() Laravel classiques ici, la table doit rester très légère car hautement sollicitée
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('live_locations');
    }
};
