<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use App\Models\Article;
use App\Models\Order;
use App\Models\Package;
use App\Models\DriverProfile;
use App\Models\ShipmentCheckpoint;
use App\Models\LiveLocation;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. CRÉATION DES RÔLES STANDARD
        $adminRole = Role::create(['name' => 'admin', 'description' => 'Gérant - Supervision globale']);
        $commercialRole = Role::create(['name' => 'commercial', 'description' => 'Gestion de la chaîne des opérations']);
        $driverRole = Role::create(['name' => 'delivery_person', 'description' => 'Livreurs Moto / Chauffeurs']);
        $clientRole = Role::create(['name' => 'client', 'description' => 'Particuliers et Entreprises clientes']);
        $transitRole = Role::create(['name' => 'transit_agent', 'description' => 'Gestionnaire aéroportuaire et douane']);

        // 2. CRÉATION DE COMPTES DE TEST FIXES (Pour ton développement)
        $adminUser = User::factory()->create([
            'name' => 'Marco Gérant',
            'email' => 'admin@marcotrans.com',
        ]);
        $adminUser->roles()->attach($adminRole);

        $commercialUser = User::factory()->create([
            'name' => 'Commercial',
            'email' => 'commercial@marcotrans.com',
        ]);
        $commercialUser->roles()->attach($commercialRole);

        $deliveryUser = User::factory()->create([
            'name' => 'Livreur',
            'email' => 'delivery@marcotrans.com',
        ]);
        $deliveryUser->roles()->attach($driverRole);
        $transitUser = User::factory()->create([
            'name' => 'Agent de Transit',
            'email' => 'transit@marcotrans.com',
        ]);
        $transitUser->roles()->attach($transitRole);

        // 3. GÉNÉRATION DE LA FLOTTE DE LIVREURS (Tes 2 motos + partenaires)
        $drivers = User::factory(10)->create();
        foreach ($drivers as $index => $driver) {
            $driver->roles()->attach($driverRole);

            // On configure les 2 premières motos comme tes assets propres
            DriverProfile::factory()->create([
                'user_id' => $driver->id,
                'vehicle_type' => 'moto',
                'license_plate' => $index < 2 ? 'CE MOTO ' . ($index + 1) : null
            ]);
        }

        // 4. CRÉATION DU CATALOGUE D'ARTICLES DE BASE
        $articles = Article::factory(15)->create();

        // 5. SATURATION MASSIVE DES COMMANDES ET DE LA LOGISTIQUE
        // On génère 50 clients
        $clients = User::factory(50)->create();
        foreach ($clients as $client) {
            $client->roles()->attach($clientRole);

            // Chaque client passe entre 1 et 3 commandes
            $numberOfOrders = rand(1, 3);

            Order::factory($numberOfOrders)->create([
                'client_id' => $client->id
            ])->each(function ($order) use ($articles) {

                // Générer l'unité physique (les colis) liée à cette commande
                // Scénario de groupage : 1 commande peut avoir 1 ou 2 colis distincts
                $packageCount = rand(1, 2);

                Package::factory($packageCount)->create([
                    'order_id' => $order->id,
                    // Harmonisation du statut du colis avec le type de commande
                    'delivery_status' => $order->order_status === 'delivered' ? 'delivered' : 'in_transit'
                ])->each(function ($package) use ($articles, $order) {
                    // inserer les articles dans le package des commandes
                    $assignedArticles = $articles->random(rand(1, 4));
                    foreach ($assignedArticles as $article) {
                        $package->articles()->attach($article->id, [
                            'quantity' => rand(1, 5),
                            'designation' => $article->designation,
                            'nature' => $article->nature
                        ]);
                    }


                    // Récupérer les lignes d'articles du package de la commande (depuis la table pivot package_items)
                    $packageItems = \Illuminate\Support\Facades\DB::table('package_items')
                        ->where('package_id', $package->id)
                        ->get();

                    // CORRECTION ICI : Insertion directe sans passer par la relation 'Article' qui cherchait la colonne manquante
                    foreach ($packageItems as $item) {
                        \Illuminate\Support\Facades\DB::table('package_items')->insert([
                            'package_id'    => $package->id,
                            'designation' => $item->designation,
                            'nature' => $item->nature,
                            'quantity' => $item->quantity,
                            'created_at'    => now(),
                            'updated_at'    => now(),
                        ]);
                    }

                    // CONDITIONNEL : Si la commande est INTERNATIONALE, on peuple sa timeline de checkpoints
                    if ($order->order_type === 'international') {
                        $hubs = ['Entrepôt Istanbul', 'Zone Fret Aéroport', 'Douane Transit Douala', 'Hub Dispatch Yaoundé'];
                        foreach ($hubs as $sequence => $hubName) {
                            ShipmentCheckpoint::create([
                                'package_id' => $package->id,
                                'sequence_order' => $sequence + 1,
                                'location_name' => $hubName,
                                'status' => $package->delivery_status === 'delivered' ? 'completed' : ($sequence == 0 ? 'completed' : 'pending'),
                                'description_note' => 'Traitement des colis MarcoTrans.',
                                'validated_at' => $package->delivery_status === 'delivered' ? now()->subDays(3 - $sequence) : ($sequence == 0 ? now() : null)
                            ]);
                        }
                    }

                    // CONDITIONNEL : Si la commande est URBAINE et active (in_transit), on génère un historique GPS fictif
                    if ($order->order_type === 'urbain' && $order->order_status === 'in_transit') {
                        $randomDriver = DriverProfile::where('vehicle_type', 'moto')->inRandomOrder()->first();

                        if ($randomDriver) {
                            // On simule 5 pings GPS consécutifs à Yaoundé (autour de Bastos/Mvan)
                            for ($i = 0; $i < 5; $i++) {
                                LiveLocation::create([
                                    'order_id' => $order->id,
                                    'driver_id' => $randomDriver->user_id,
                                    'latitude' => 3.8480 + ($i * 0.002), // Légère variation de trajectoire
                                    'longitude' => 11.5021 + ($i * 0.002),
                                    'recorded_at' => now()->subMinutes(20 - ($i * 4))
                                ]);
                            }
                        }
                    }
                });
            });
        }
    }
}
