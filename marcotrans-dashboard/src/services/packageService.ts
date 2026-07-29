// src/features/packages/services/packageService.ts
import { api } from "@/core/api/client";
import { Package, PackageItem, PaginatedResponse } from "@/core/types/api";

export const packageService = {
  /**
   * Récupère la liste globale de tous les colis avec filtres et pagination.
   */
  getAllPackages: async (params?: {
    page?: number;
    per_page?: number;
    search?: string;
    status?: string;
    client_id?: string | number;
  }): Promise<PaginatedResponse<Package>> => {
    const response = await api.get<PaginatedResponse<Package>>("/packages", {
      params,
    });
    return response.data;
  },

  /**
   * Récupère la liste de tous les colis associés à une commande spécifique.
   * Laravel retourne généralement les colis enveloppés dans un tableau 'data'.
   */
  getPackagesForOrder: async (reference: string): Promise<Package[]> => {
    // api.get effectue la requête avec Axios
    const response = await api.get<{ data: Package[] }>(
      `/orders/${reference}/packages`,
    );
    return response.data.data; // Renvoie directement le tableau typé de Package
  },

  /**
   * Récupère tous les articles/items contenus à l'intérieur d'un colis précis.
   */
  getItemsForPackage: async (packageId: number): Promise<PackageItem[]> => {
    const response = await api.get<{ data: PackageItem[] }>(
      `/packages/${packageId}/items`,
    );
    return response.data.data; // Renvoie directement le tableau typé de PackageItem
  },
};
