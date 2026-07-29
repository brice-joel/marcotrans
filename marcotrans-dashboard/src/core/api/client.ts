// src/core/api/client.ts
import { useAuthStore } from "@/core/stores/authStore";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Intercepteur : Injection dynamique du token depuis le store Zustand
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur : Gestion globale des erreurs (ex: 401 Session expirée)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // Nettoyage du store Zustand et redirection
      useAuthStore.getState().clearAuth();
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  },
);
