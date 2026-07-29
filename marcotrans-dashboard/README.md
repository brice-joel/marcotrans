# 🖥️ MarcoTrans Dashboard (Frontend)

Ce sous-projet contient l'interface web (Dashboard d'administration) de l'écosystème MarcoTrans. Il est conçu pour être l'outil quotidien des administrateurs, agents de transit, commerciaux et autres rôles de gestion.

## 🛠️ Stack Technique

- **Framework :** React 19 (avec TypeScript)
- **Bundler :** Vite 8
- **Routage :** TanStack Router (File-based routing & Type-safe)
- **Gestion d'état asynchrone :** TanStack Query v5 (React Query)
- **Gestion d'état local :** Zustand
- **UI & Design :** Tailwind CSS v4, composants Shadcn UI, Lucide Icons pour les icônes
- **Gestion des tableaux :** TanStack Table v8 (avec pagination, filtrage, recherche globale et persistance d'affichage)

## 📦 Architecture & Design

Le projet adopte une **Architecture Layer-First** visant la simplicité de développement pour ce MVP, tout en gardant une forte scalabilité.

### Structure des dossiers
- `/src/components` : Composants UI réutilisables (Layouts, Boutons, Skeletons, DataTable générique, badges).
- `/src/core` : Logique métier centrale (Instances Axios, types globaux, stores Zustand).
- `/src/hooks` : Hooks React personnalisés (ex: `useAuth`).
- `/src/pages` : Pages complètes correspondant aux vues du Dashboard (Commandes, Groupage, Paramètres, etc.).
- `/src/routes` : Configuration du routage avec TanStack Router (fichiers `.route.tsx`).

### Design UI/UX
L'interface a été conçue pour être **Premium, épurée et professionnelle**.
- Un mode "sidebar" (barre latérale) avec un menu riche organisé par section métier (Logistique internationale, Logistique Locale, Entrepôts, Douane, Flotte, Finance).
- Une interface 100% **responsive**, s'adaptant parfaitement aux écrans d'ordinateurs, de tablettes et de téléphones portables grâce à un mode "off-canvas".
- L'utilisation de "Skeleton Loaders" pour des transitions fluides lors du chargement des données de l'API.

## 🚀 Lancement Local

1. Installez les dépendances :
   ```bash
   npm install
   ```
2. Démarrez le serveur de développement :
   ```bash
   npm run dev
   ```
3. Rendez-vous sur `http://localhost:5173`. L'application se connectera automatiquement au backend (configuré via `/src/core/api/axios.ts`).
