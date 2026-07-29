// src/features/checkpoints/components/CheckpointTracker.tsx
import { CheckCircle2, Circle, MapPin, Calendar, Loader2 } from "lucide-react";
import { useCheckpoints } from "@/hooks/useCheckpoints";

interface CheckpointTrackerProps {
  packageId: number;
  packageStatus: string;
  isOpen: boolean; // Nécessaire pour déclencher le lazy loading du hook
}

export default function CheckpointTracker({
  packageId,
  packageStatus,
  isOpen,
}: CheckpointTrackerProps) {
  // Appel de notre hook sécurisé et typé
  const {
    data: checkpoints = [],
    isLoading,
    error,
  } = useCheckpoints(packageId, isOpen);

  console.log("checkpoints", checkpoints);

  // Trier les checkpoints par ordre chronologique de séquence
  const sortedCheckpoints = [...checkpoints].sort(
    (a, b) => a.sequence_order - b.sequence_order,
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6 text-xs text-slate-500 gap-2">
        <Loader2 size={14} className="animate-spin text-blue-600" />
        <span>Chargement du suivi de transit...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl">
        Impossible de charger les points de contrôle physiques.
      </div>
    );
  }

  return (
    <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100/80 mt-3 space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
        <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block">
          Flux de Transit Physique & Escales
        </span>
        <span className="text-xs bg-slate-200/80 font-bold px-2 py-0.5 rounded-md text-slate-700 uppercase tracking-wide">
          {packageStatus.replace("_", " ")}
        </span>
      </div>

      {sortedCheckpoints.length > 0 ? (
        <div className="relative pl-4 space-y-5 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {sortedCheckpoints.map((cp) => {
            const isDone = cp.status === "completed";
            const dateStr = cp.validated_at
              ? new Date(cp.validated_at).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : null;

            return (
              <div
                key={cp.id}
                className="relative flex items-start gap-4 animate-in fade-in-40 duration-200"
              >
                {/* Icône de statut sur la ligne verticale */}
                <div className="absolute -left-[14px] top-0.5 bg-white rounded-full p-0.5">
                  {isDone ? (
                    <CheckCircle2
                      size={15}
                      className="text-blue-600 bg-white rounded-full"
                    />
                  ) : (
                    <Circle
                      size={14}
                      className="text-slate-300 fill-slate-100"
                    />
                  )}
                </div>

                {/* Contenu textuel de l'escale */}
                <div className="flex-1 bg-white p-3 rounded-xl border border-slate-150/60 shadow-2xs group hover:border-slate-300 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5 font-semibold text-sm text-slate-800">
                      <MapPin
                        size={14}
                        className={isDone ? "text-blue-500" : "text-slate-400"}
                      />
                      <span>{cp.location_name}</span>
                    </div>
                    {dateStr && (
                      <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                        <Calendar size={11} />
                        <span>{dateStr}</span>
                      </div>
                    )}
                  </div>

                  {cp.description_note && (
                    <p className="text-xs text-slate-500 mt-1.5 italic pl-5 border-l border-slate-100">
                      "{cp.description_note}"
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-4 text-slate-400 text-xs italic">
          Aucune escale physique enregistrée pour le moment. En attente de scan
          aux points de contrôle.
        </div>
      )}
    </div>
  );
}
