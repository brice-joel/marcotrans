# Projet Marcotrans

Marcotrans est une application composée de deux parties principales : une API backend et un tableau de bord (dashboard) frontend. Ce dépôt ou dossier racine contient ces deux sous-projets.

## Architecture du Projet

Le projet est divisé en deux sous-dossiers :

### 1. Backend API (`marcotrans-backend-api`)
C'est le serveur backend de l'application, construit avec le framework PHP **Laravel**.

**Technologies principales :**
- PHP 8.3+
- Laravel 13.x
- Base de données (configurée via `.env`)
- Sanctum pour l'authentification API

### 2. Dashboard Frontend (`marcotrans-dashboard`)
C'est l'interface d'administration utilisateur, construite en tant qu'application monopage (SPA) avec **React** et propulsée par **Vite**.

**Technologies principales :**
- React 19 (TypeScript)
- Vite 8
- Tailwind CSS 4 & Shadcn (pour le design et les composants UI)
- TanStack Router (pour le routage)
- TanStack Query (pour la gestion de l'état asynchrone et des appels API)
- Zustand (pour la gestion d'état global)
- Recharts (pour les graphiques)

---

## Instructions d'installation

### Prérequis
- PHP 8.3 et Composer (pour le backend)
- Node.js (version 20+ recommandée) et npm/yarn/pnpm (pour le frontend)

### Configuration du Backend
1. Naviguer vers le dossier du backend :
   ```bash
   cd marcotrans-backend-api
   ```
2. Installer les dépendances PHP :
   ```bash
   composer install
   ```
3. Configurer l'environnement :
   Copier le fichier `.env.example` en `.env` et ajuster les variables (notamment la connexion à la base de données).
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
4. Exécuter les migrations :
   ```bash
   php artisan migrate
   ```
5. Lancer le serveur de développement :
   ```bash
   php artisan serve
   ```

### Configuration du Dashboard
1. Naviguer vers le dossier du dashboard :
   ```bash
   cd marcotrans-dashboard
   ```
2. Installer les dépendances Node :
   ```bash
   npm install
   ```
3. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```

Le dashboard devrait maintenant être accessible localement (généralement sur `http://localhost:5173`) et communiquera avec l'API backend servie par Laravel.
