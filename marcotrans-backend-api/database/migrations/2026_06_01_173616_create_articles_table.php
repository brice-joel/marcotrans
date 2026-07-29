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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('designation');
            $table->string('nature', 100); // ex: electronique, alimentaire [cite: 118]       
            $table->decimal('unit_weight', 8, 2)->nullable(); //Poids nullable
            $table->decimal('unit_volume', 8, 2)->nullable(); // Volume

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
