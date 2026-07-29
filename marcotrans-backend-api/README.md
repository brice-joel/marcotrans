# ⚙️ MarcoTrans API (Backend)

API RESTful robuste et performante développée en PHP, fournissant l'ensemble de la logique métier et des données pour l'écosystème logiciel MarcoTrans.

## 🛠️ Stack Technique

- **Framework :** Laravel 11.x (PHP 8.3+)
- **Base de données :** MySQL / PostgreSQL
- **Authentification :** Laravel Sanctum (Tokens API d'authentification)
- **Architecture :** Pattern Repository (Séparation nette entre les contrôleurs et la logique de requêtage de base de données).
- **Documentation API :** L5-Swagger (Spécification OpenAPI)

## 📦 Concepts Clés & Architecture

### Le Pattern Repository
Afin de rendre le code maintenable et testable, l'API utilise massivement le **Repository Pattern**. 
Les requêtes éloquentes (`Eloquent ORM`) ne sont jamais écrites directement dans les contrôleurs (`Controllers`). Elles sont encapsulées dans des classes `Repository` (ex: `OrderRepository`, `PackageRepository`). 
Le contrôleur se charge uniquement de :
1. Récupérer et valider la requête entrante (via les `FormRequests`).
2. Appeler le `Repository` approprié.
3. Retourner la réponse formattée via des API `Resources`.

### Domaines Métier supportés
L'API expose des endpoints pour gérer de nombreux aspects de la logistique :
- **Fret & Groupage** : Gestion des vagues d'expédition, création de manifestes, etc.
- **Logistique Locale & Commandes** : Création et expédition de colis de porte-à-porte.
- **Gestion des Entrepôts** : Opérations in-bound/out-bound, transferts inter-agences, gestion des racks.
- **Douane** : Dossiers douaniers, déclarations, calcul des taxes et alertes litiges.
- **Flotte & Chauffeurs** : Gestion des livraisons du dernier kilomètre.
- **Finances** : Gestion de la caisse, des factures et des rapports.

## 🚀 Lancement Local

1. Installez les dépendances Composer :
   ```bash
   composer install
   ```
2. Configurez votre fichier d'environnement (Base de données locale, paramètres) :
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
3. Lancez les migrations et les seeders pour préremplir la base de données :
   ```bash
   php artisan migrate --seed
   ```
4. Démarrez le serveur HTTP Laravel :
   ```bash
   php artisan serve
   ```
   Le backend écoutera par défaut sur `http://127.0.0.1:8000`.

## 📖 Documentation de l'API (Swagger)

Une fois le serveur lancé, vous pouvez consulter la documentation technique interactive générée par Swagger (L5-Swagger) en accédant à :
**`http://localhost:8000/api/documentation`**
Cette documentation liste toutes les routes, les paramètres attendus, les schémas d'authentification et les réponses JSON.
