// src/features/auth/hooks/useAuth.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/core/stores/authStore";
import { toast } from "sonner";
import axios from "axios";
import { authService } from "@/services/authService";

export function useAuth() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Mutation pour la connexion
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setAuth(data.access_token, data.user);
      toast.success(`Bienvenue, ${data.user.name} !`, {
        description: "Accès au Portail Logistique accordé.",
      });
      navigate({ to: "/" });
    },
    onError: (error) => {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Identifiants incorrects ou serveur MarcoTrans indisponible.";

      toast.error("Échec d'authentification", { description: message });
    },
  });

  // Mutation pour la déconnexion
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onMutate: async () => {
      // Efface immédiatement les données locales pour une UI instantanée (Optimistic)
      clearAuth();
      queryClient.clear(); // Optionnel : Vide le cache React Query pour des raisons de sécurité
      navigate({ to: "/auth/login" });
    },
    onSuccess: () => {
      toast.success("Déconnexion réussie", {
        description: "À bientôt sur le Portail Logistique.",
      });
    },
    onError: () => {
      // Même si l'API échoue, l'utilisateur est déconnecté localement
      toast.error("Déconnexion incomplète", {
        description:
          "Votre session locale a été fermée, mais le serveur n'a pas pu être notifié.",
      });
    },
  });

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}
