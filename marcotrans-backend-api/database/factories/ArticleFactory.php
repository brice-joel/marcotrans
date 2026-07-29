<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ArticleFactory extends Factory
{
    public function definition(): array
    {
        $articles = [
            ['designation' => 'Téléviseur Smart LED 55"', 'nature' => 'electronique', 'weight' => 15.50, 'volume' => 0.250],
            ['designation' => 'Carton de Chaussures de sport', 'nature' => 'habillement', 'weight' => 12.00, 'volume' => 0.080],
            ['designation' => 'Sac de riz parfumé 25kg', 'nature' => 'alimentaire', 'weight' => 25.00, 'volume' => 0.040],
            ['designation' => 'Documents Douaniers Import', 'nature' => 'documents', 'weight' => 0.50, 'volume' => 0.005],
            ['designation' => 'Pièces de rechange Toyota', 'nature' => 'divers', 'weight' => 45.00, 'volume' => 0.180],
        ];

        $selected = $this->faker->randomElement($articles);

        return [
            'designation' => $selected['designation'],
            'nature' => $selected['nature'],
            'unit_weight' => $selected['weight'],
            'unit_volume' => $selected['volume'],
        ];
    }
}
