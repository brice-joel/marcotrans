import { createRootRoute, Outlet } from "@tanstack/react-router";

// 1. Racine globale : Simple conteneur sans mise en page figée (Outlet)
export const rootRoute = createRootRoute({
  component: Outlet,
});
