import { api } from "@/core/api/client";
import { Checkpoint } from "@/core/types/api";

export const checkpointService = {
  /**
   * Récupère tous les checkpoints d'un colis précis.
   */
  getCheckpointsForPackage: async (
    packageId: number,
  ): Promise<Checkpoint[]> => {
    const response = await api.get<{ data: Checkpoint[] }>(
      `/packages/${packageId}/checkpoints`,
    );
    return response.data.data;
  },

  getCheckpointsForPackages: async (
    packageId: number,
  ): Promise<Checkpoint[]> => {
    const response = await api.get<{ data: Checkpoint[] }>(
      `/packages/${packageId}/checkpoints`,
    );
    return response.data.data;
  },
};
