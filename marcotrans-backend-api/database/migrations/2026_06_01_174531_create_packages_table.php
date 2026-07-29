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
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            // Nullable : Un colis peut être scanné et groupé en entrepôt avant d'être rattaché à une commande/facture finale 
            $table->foreignId('order_id')->nullable()->constrained('orders')->onDelete('set null');
            $table->string('package_type', 50); // carton, palette, conteneur [cite: 153]
            $table->decimal('total_weight', 8, 2); // Poids réel mesuré en agence [cite: 154, 198]
            $table->decimal('total_volume', 8, 2); // Volume réel mesuré en agence [cite: 154, 198]
            $table->string('dimensions', 100); // Format textuel ex: '1mx1mx1.2m' [cite: 155]
            $table->enum('delivery_status', [
                'received',
                'assigned',
                'accepted',
                'in_agency',
                'customs_export',
                'in_transit',
                'customs_import',
                'distribution',
                'available_for_pickup',
                'delivered'
            ])->default('received'); // received , assigned , accepted, in_agency, custom_export, custom_import, distribution, available_for_pickup, delivered. 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};
