import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { packageService } from "@/services/packageService";

export interface PackageFilters {
  page?: number;
  status?: string;
  search?: string;
  client_id?: string | number;
  per_page?: number;
}

/**
 * Hook pour la gestion paginée et filtrée de la liste globale des colis
 */
export function usePackages(initialFilters: PackageFilters = {}) {
  const [page, setPage] = useState(initialFilters.page || 1);
  const [statusFilter, setStatusFilter] = useState(initialFilters.status || "");
  const [searchFilter, setSearchFilter] = useState(initialFilters.search || "");
  const [clientIdFilter, setClientIdFilter] = useState(initialFilters.client_id || "");

  const queryFilters = {
    page,
    status: statusFilter || undefined,
    search: searchFilter || undefined,
    client_id: clientIdFilter || undefined,
    per_page: initialFilters.per_page || 15,
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["packages", queryFilters],
    queryFn: () => packageService.getAllPackages(queryFilters),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  return {
    packages: data?.data || [],
    meta: data?.meta || null,
    isLoading,
    isError,
    refetch,
    page,
    setPage,
    statusFilter,
    setStatusFilter,
    searchFilter,
    setSearchFilter,
    clientIdFilter,
    setClientIdFilter,
  };
}

/**
 * Hook de lazy loading pour récupérer les colis d'une commande spécifique.
 * S'exécute uniquement si l'onglet ou la section associée est active.
 */
export function useOrderPackages(
  reference: string | null | undefined,
  active: boolean,
) {
  return useQuery({
    queryKey: ["orders", reference, "packages"],
    queryFn: () => {
      if (!reference) throw new Error("Référence de commande manquante.");
      return packageService.getPackagesForOrder(reference);
    },
    // Déclenchement conditionnel sécurisé
    enabled: active && !!reference,
    staleTime: 1000 * 60 * 5, // Cache de 5 minutes pour éviter les requêtes répétitives
  });
}

/**
 * Hook de lazy loading pour récupérer les articles à l'intérieur d'un colis (ex: Accordéon).
 * Se déclenche uniquement lorsque le composant visuel s'ouvre.
 */
export function usePackageItems(
  packageId: number | null | undefined,
  isOpen: boolean,
) {
  return useQuery({
    queryKey: ["packages", packageId, "items"],
    queryFn: () => {
      if (packageId === null || packageId === undefined) {
        throw new Error("ID du colis manquant.");
      }
      return packageService.getItemsForPackage(packageId);
    },
    // Déclenchement conditionnel sécurisé
    enabled: isOpen && packageId !== null && packageId !== undefined,
    staleTime: 1000 * 60 * 10, // Cache plus long (10m) car le contenu d'un colis change rarement
  });
}
