// src/features/orders/hooks/useOrders.ts
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { orderService } from "@/services/orderService";

export function useOrders() {
  // 1. Spécifier l'origine permet à TanStack Router de typer strictement 'search'
  const navigate = useNavigate();
  const search = useSearch({ strict: false });

  const page = search.page ?? 1;
  const statusFilter = search.status ?? "";
  const searchFilter = search.search ?? "";

  // 2. Fonction centrale pour mettre à jour les filtres dans l'URL sans pollution
  const updateFilters = (newFilters: Record<string, any>) => {
    navigate({
      // @ts-ignore : TanStack router type mismatch for search state
      search: (prev: Record<string, any>) => {
        const updated = { ...prev, ...newFilters };

        if (updated.status === "") delete updated.status;
        if (updated.search === "") delete updated.search;

        const hasFilterChanged =
          (newFilters.status !== undefined &&
            newFilters.status !== prev.status) ||
          (newFilters.search !== undefined &&
            newFilters.search !== prev.search);

        updated.page = newFilters.page ?? (hasFilterChanged ? 1 : prev.page);

        return updated;
      },
    });
  };
  // 3. TanStack Query consomme directement les valeurs synchronisées
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders", "list", { page, statusFilter, searchFilter }],
    queryFn: () =>
      orderService.getOrders({
        page,
        status: statusFilter || undefined,
        search: searchFilter || undefined,
      }),
    placeholderData: (previousData) => previousData,
  });

  return {
    orders: data?.data ?? [],
    meta: data?.meta ?? null,
    isLoading,
    error: error instanceof Error ? error.message : null,

    // Getters et Setters interfaçés avec l'URL
    page,
    setPage: (newPage: number) => updateFilters({ page: newPage }),
    statusFilter,
    setStatusFilter: (status: string) => updateFilters({ status }),
    searchFilter,
    setSearchFilter: (term: string) => updateFilters({ search: term }),
  };
}
export function useOrderDetails(reference: string | null) {
  return useQuery({
    queryKey: ["orders", "detail", reference],
    // Sécurisation contre le crash : on n'exécute la fonction que si la référence existe vraiment
    queryFn: () => {
      if (!reference) throw new Error("Référence de commande manquante.");
      return orderService.getOrderDetails(reference);
    },
    enabled: !!reference,
    staleTime: 1000 * 60 * 5, // Cache de 5 minutes
  });
}
