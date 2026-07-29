<?php

namespace Tests\Feature\Api;

use App\Models\Article;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class OrderAndLogisticsTest extends TestCase
{
    // Ce trait vide la base de données de test en mémoire avant chaque méthode de test et rejoue les migrations
    use RefreshDatabase;

    protected $commercialUser;
    protected $clientUser;
    protected $sampleArticle;

    /**
     * Configuration initiale exécutée avant chaque test.
     */
    protected function setUp(): void
    {
        parent::setUp();

        // 1. Création des rôles requis
        $commercialRole = Role::create(['name' => 'commercial', 'description' => 'Commercial']);
        $clientRole = Role::create(['name' => 'client', 'description' => 'Client']);

        // 2. Création d'un utilisateur de test (Commercial)
        $this->commercialUser = User::factory()->create([
            'email' => 'commercial@marcotrans.com',
            'password' => bcrypt('password'),
        ]);
        $this->commercialUser->roles()->attach($commercialRole);

        // 3. Création d'un client fictif pour l'associer aux commandes
        $this->clientUser = User::factory()->create();
        $this->clientUser->roles()->attach($clientRole);

        // 4. Création d'un article de base dans le catalogue
        $this->sampleArticle = Article::create([
            'designation' => 'Carton de composants électroniques',
            'nature' => 'electronique',
            'unit_weight' => 14.20,
            'unit_volume' => 0.090,
        ]);
    }

    /**
     * Test de l'authentification avec génération de jeton Sanctum.
     */
    public function test_user_can_login_via_api_and_receive_sanctum_token(): void
    {
        $response = $this->postJson('/api/login', [
            'email' => 'commercial@marcotrans.com',
            'password' => 'password',
        ]);

        // On vérifie que le statut est 200 OK
        $response->assertStatus(200);

        // On s'assure que la structure JSON contient le token d'accès
        $response->assertJsonStructure([
            'access_token',
            'token_type',
            'user' => [
                'id',
                'name',
                'email',
                'phone'
            ]
        ]);
    }

    /**
     * Test de la création d'une commande valide avec des articles rattachés.
     */
    public function test_authenticated_user_can_create_an_order_with_items(): void
    {
        // Authentifier de force l'utilisateur via Sanctum pour ce test précis
        Sanctum::actingAs($this->commercialUser);

        $payload = [
            'client_id' => $this->clientUser->id,
            'order_type' => 'international',
            'delivery_address' => 'Agence MarcoTrans Bastos, Yaoundé',
            'total_price' => 250000.00,
            'items' => [
                [
                    'article_id' => $this->sampleArticle->id,
                    'quantity' => 3
                ]
            ]
        ];

        $response = $this->postJson('/api/orders', $payload);

        // Le contrôleur retourne une ressource créée (201 Created ou 200 OK selon ton implémentation, ici 200/201)
        $response->assertStatus(201);

        // Vérification de la présence des données clés dans la réponse JSON
        $response->assertJsonPath('data.type', 'international');
        $response->assertJsonPath('data.status', 'pending');

        // Vérification de l'écriture effective dans la base de données
        $this->assertDatabaseHas('orders', [
            'client_id' => $this->clientUser->id,
            'order_type' => 'international',
            'order_status' => 'pending'
        ]);

        // Vérification que la table pivot des articles a bien été alimentée
        $this->assertDatabaseHas('order_items', [
            'article_id' => $this->sampleArticle->id,
            'quantity' => 3
        ]);
    }

    /**
     * Test de blocage par les Form Requests en cas de données erronées.
     */
    public function test_order_creation_fails_if_required_fields_are_missing(): void
    {
        Sanctum::actingAs($this->commercialUser);

        // On envoie un payload volontairement incomplet (pas d'articles, prix négatif)
        $payload = [
            'client_id' => $this->clientUser->id,
            'order_type' => 'spatial_fret', // Type invalide au regard des règles de validation du Form Request
            'delivery_address' => 'Douala',
            'total_price' => -5000,
            'items' => []
        ];

        $response = $this->postJson('/api/orders', $payload);

        // Doit retourner un statut 422 Unprocessable Entity
        $response->assertStatus(422);

        // On vérifie que l'erreur pointe bien sur les champs erronés
        $response->assertJsonValidationErrors(['order_type', 'total_price', 'items']);
    }
}
