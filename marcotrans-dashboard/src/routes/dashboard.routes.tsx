import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useAuthStore } from "@/core/stores/authStore";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import SettingsPage from "@/pages/settings/SettingsPage";
import { z } from "zod";
import OrdersPage from "@/pages/orders/OrdersPage";
import Index from "@/pages/packages/Index";

/*--------------------------------------------------*/
/*******  VALIDATION DES PARAMETRE DE ROUTES  *****/
/*--------------------------------------------------*/

// 1. Définir le schéma de validation des filtres de commandes avec Zod
const ordersSearchSchema = z.object({
  page: z.coerce.number().catch(1), // Coerce string from URL to number
  status: z.string().optional().catch(""),
  search: z.string().optional().catch(""),
});

// 2. Inférer le type TypeScript pour pouvoir l'utiliser ailleurs si besoin
export type OrdersSearch = z.infer<typeof ordersSearchSchema>;

// 3. GROUPE SÉCURISÉ (Pathless Route ID: "authenticated")
// Ce groupe applique la vérification de sécurité et injecte le DashboardLayout
export const authenticatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "authenticated",
  component: DashboardLayout, // Le layout s'applique uniquement à ce sous-arbre
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;

    // Si l'utilisateur n'est pas connecté, redirection stricte vers le login
    if (!isAuthenticated) {
      throw redirect({
        to: "/auth/login",
        // Optionnel : sauvegarde la page demandée pour y revenir après connexion
        search: {
          redirect: window.location.pathname,
        },
      });
    }
  },
});

// 4. Routes Privées : Elles ont toutes comme parent "authenticatedRoute"
export const indexRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/",
  component: DashboardPage,
});

export const packageRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/shipments/packages",
  component: Index,
});

export const orderRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "orders",
  component: OrdersPage,
  // Injection de la validation
  validateSearch: (search) => ordersSearchSchema.parse(search),
});

export const settingsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "settings",
  component: SettingsPage,
});
