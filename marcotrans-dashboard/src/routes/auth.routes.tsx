import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "./root.route";
import LoginPage from "@/pages/auth/LoginPage";
import { useAuthStore } from "@/core/stores/authStore";

// 2. Route Publique : Page de connexion autonome
export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/login",
  component: LoginPage,
  beforeLoad: () => {
    // Si l'utilisateur est déjà connecté, on le redirige directement vers le dashboard
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
});
