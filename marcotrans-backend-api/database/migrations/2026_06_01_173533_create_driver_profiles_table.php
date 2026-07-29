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
        Schema::create('driver_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained('users')->onDelete('cascade'); // Relation 1-1 [cite: 107, 197]
            $table->enum('vehicle_type', ['moto']); // ex: moto
            $table->string('license_number', 100)->nullable(); // Nullable (ex: les livreurs de motos n'ont pas toujours le permis enregistré immédiatement) [cite: 109]
            $table->string('license_plate', 50)->nullable(); // Nullable (le véhicule peut changer ou être en maintenance) [cite: 110]
            $table->boolean('is_available')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('driver_profiles');
    }
};
