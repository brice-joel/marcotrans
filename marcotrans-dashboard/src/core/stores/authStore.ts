// src/core/stores/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/api";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean; // <-- Assurez-vous que le type est présent
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false, // Initialisé à false

      setAuth: (token, user) =>
        set({
          token,
          user,
          isAuthenticated: true, // <-- Trés important : passer à true à la connexion
        }),

      clearAuth: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false, // <-- Passer à false au logout
        }),
    }),
    {
      name: "marcotrans_auth_storage", // Votre clé de persistence localStorage
    },
  ),
);
