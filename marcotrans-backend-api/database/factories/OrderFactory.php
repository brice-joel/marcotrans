<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    public function definition(): array
    {
        $quartiers = ['Bastos', 'Akwa', 'Bonapriso', 'Mvan', 'Biyem-Assi', 'Kribi Port', 'Cocody', 'Lekki Phase 1'];

        return [
            'reference' => 'MT-' . now()->year . '-' . $this->faker->unique()->numerify('#####'),
            'client_id' => User::factory(),
            'order_type' => $this->faker->randomElement([
                'urban',
                'interurban',
                'international'
            ]),
            'departure_address' => $this->faker->randomElement($quartiers) . ', face ' . $this->faker->company(),
            'delivery_address' => $this->faker->randomElement($quartiers) . ', face ' . $this->faker->company(),
            'total_price' => $this->faker->randomFloat(2, 5000, 750000), // de 5 000 à 750 000 XAF
            'order_status' => $this->faker->randomElement([
                'pending',
                'processing',
                'in_transit',
                'delivered',
                'cancelled'
            ]),
        ];
    }
}
