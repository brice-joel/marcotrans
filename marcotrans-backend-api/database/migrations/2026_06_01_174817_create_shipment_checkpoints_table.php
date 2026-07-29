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
        Schema::create('shipment_checkpoints', function (Blueprint $table) {
            $table->id();
            $table->foreignId('package_id')->constrained('packages')->onDelete('cascade');
            $table->integer('sequence_order'); // Ordre chronologique de l'escale [cite: 179]
            $table->string('location_name', 255); // ex: Port de Douala, Aéroport d'Istanbul [cite: 180]
            $table->enum('status', ['pending', 'completed'])->default('pending'); // pending, completed.
            $table->text('description_note')->nullable(); // Remarques optionnelles de l'agent de transit [cite: 184]
            $table->timestamp('validated_at')->nullable(); // Rempli uniquement quand l'étape est validée ('completed') [cite: 185]
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipment_checkpoints');
    }
};
