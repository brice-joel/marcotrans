// src/features/checkpoints/hooks/useCheckpoints.ts
import { useQuery } from "@tanstack/react-query";
import { checkpointService } from "@/services/checkpointService";

/**
 * Hook de lazy loading pour récupérer les checkpoints d'un colis.
 * Se déclenche uniquement si le conteneur ou l'accordéon est déplié.
 */
export function useCheckpoints(
  packageId: number | null | undefined,
  isOpen: boolean,
) {
  return useQuery({
    queryKey: ["checkpoints", packageId],
    queryFn: () => {
      if (!packageId) throw new Error("ID du colis manquant.");
      return checkpointService.getCheckpointsForPackage(packageId);
    },
    // S'exécute uniquement si l'accordéon est ouvert et que l'ID est valide
    enabled: isOpen && !!packageId,
    // Mis à 5 minutes : évite le spam serveur tout en restant frais
    staleTime: 1000 * 60 * 5,
  });
}
