import { createBrowserHistory, createRouter } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import { loginRoute } from "./auth.routes";
import {
  authenticatedRoute,
  indexRoute,
  packageRoute,
  orderRoute,
  settingsRoute,
} from "./dashboard.routes";
import NotFoundPage from "@/pages/errors/NotFoundPage";

export const history = createBrowserHistory();

// 5. Assemblage de l'arbre des routes
export const router = createRouter({
  routeTree: rootRoute.addChildren([
    loginRoute,
    // On ajoute le groupe sécurisé avec ses enfants à l'intérieur
    authenticatedRoute.addChildren([
      indexRoute,
      packageRoute,
      settingsRoute,
      orderRoute,
    ]),
  ]),
  history,
  defaultNotFoundComponent: NotFoundPage,
});

// Déclarer les types pour le support TypeScript complet de TanStack Router
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Export the search type directly from where it's defined so others can still import it from index if needed
export type { OrdersSearch } from "./dashboard.routes";
