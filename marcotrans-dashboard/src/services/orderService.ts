// src/features/orders/services/orderService.ts
import { api } from "@/core/api/client";
import { ApiResponse, Order, PaginatedResponse } from "@/core/types/api";

export interface GetOrdersParams {
  page: number;
  status?: string;
  search?: string;
}

export const orderService = {
  // Renvoie directement le PaginatedResponse de Laravel (contenant data et meta)
  getOrders: async (
    params: GetOrdersParams,
  ): Promise<PaginatedResponse<Order>> => {
    const response = await api.get<PaginatedResponse<Order>>("/orders", {
      params,
    });
    return response.data;
  },

  // Renvoie directement l'objet Order contenu dans le ApiResponse
  getOrderDetails: async (reference: string): Promise<Order> => {
    const response = await api.get<ApiResponse<Order>>(`/orders/${reference}`);
    return response.data.data; // Le service s'occupe du nettoyage !
  },
};
