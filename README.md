# 🚀 MarcoTrans - ERP Logistique & Transport

MarcoTrans est un logiciel SaaS moderne, complet et évolutif conçu pour la gestion de la logistique de bout en bout (Terrestre, Maritime, Aérienne). 

L'objectif de cette plateforme est de permettre à n'importe quel acteur de la chaîne logistique (entreprise d'import/export, douanier, livreur, logisticien) d'acheter ou de faire transiter n'importe quel article depuis/vers n'importe quel endroit du globe, avec une traçabilité totale et en temps réel.

Ce dépôt racine est un "monorepo" qui regroupe les deux fondations du projet :
1. **L'API Backend** (`marcotrans-backend-api`)
2. **Le Dashboard Frontend** (`marcotrans-dashboard`)

---

## 🏗️ Architecture du Projet

Le projet est divisé en deux sous-dossiers distincts. Chacun possède son propre `README.md` détaillé.

### 1. Backend API (`marcotrans-backend-api`)
Serveur API RESTful construit avec **Laravel 11**.
- **Architecture :** Repository Pattern
- **Authentification :** Sanctum
- **Documentation :** Swagger / OpenAPI

### 2. Dashboard Frontend (`marcotrans-dashboard`)
Interface d'administration SPA construite avec **React 19** et **Vite**.
- **État & Routage :** TanStack Query, TanStack Router, Zustand
- **Interface Utilisateur :** Tailwind CSS 4, Shadcn UI, TanStack Table
- **Design :** Premium, épuré, responsive et professionnel.

*Note : Deux applications supplémentaires sont prévues pour compléter cet écosystème :*
- *Une Marketplace Web/Mobile (Interface client).*
- *Une application Mobile Delivery (Pour les livreurs et chauffeurs).*

---

## 🚀 Instructions de lancement rapide

### Prérequis
- PHP 8.3+ & Composer
- Node.js 20+ & npm

### Démarrer le Backend
```bash
cd marcotrans-backend-api
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### Démarrer le Frontend (Dashboard)
```bash
cd marcotrans-dashboard
npm install
npm run dev
```

L'application sera alors accessible sur `http://localhost:5173`.
