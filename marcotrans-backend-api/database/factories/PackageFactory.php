<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class PackageFactory extends Factory
{
    public function definition(): array
    {
        return [
            'order_id' => Order::factory(),
            'package_type' => $this->faker->randomElement(['carton', 'palette', 'sachet', 'conteneur']),
            'total_weight' => $this->faker->randomFloat(2, 1, 1500),
            'total_volume' => $this->faker->randomFloat(2, 1, 1500),
            'dimensions' => $this->faker->numberBetween(1, 3) . 'm x ' . $this->faker->numberBetween(1, 2) . 'm x ' . $this->faker->numberBetween(1, 2) . 'm',
            'delivery_status' => $this->faker->randomElement([
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
            ]),
        ];
    }
}
