// src/features/auth/services/authService.ts
import { api } from "@/core/api/client";
import { User } from "@/core/types/api";

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export const authService = {
  login: async (
    credentials: Record<string, string>,
  ): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/login", credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    // Applique le Bearer token automatiquement grâce à l'intercepteur
    await api.post("/logout");
  },
};
