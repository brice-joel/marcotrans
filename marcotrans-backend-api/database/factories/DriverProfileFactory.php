<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DriverProfileFactory extends Factory
{
    public function definition(): array
    {
        $provincesCameroun = ['LT', 'CE', 'OU', 'NO', 'SW', 'EN', 'AD', 'OU']; // Littoral, Centre, Ouest...
        $plate = $this->faker->randomElement($provincesCameroun) . ' ' . $this->faker->numerify('####') . ' ' . strtoupper($this->faker->randomLetter() . $this->faker->randomLetter());

        return [
            'user_id' => User::factory(), // Génère un utilisateur automatiquement s'il n'est pas fourni
            'vehicle_type' => $this->faker->randomElement(['moto', 'triporteur', 'camionnette', 'cargo']),
            'license_number' => strtoupper($this->faker->bothify('NW-######-??')),
            'license_plate' => $plate, // Exemple: CE 1234 AB
            'is_available' => $this->faker->boolean(80), // 80% de chances d'être disponible
        ];
    }
}
