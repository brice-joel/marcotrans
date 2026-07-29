// src/features/orders/components/OrderTracker.tsx
import { OrderStatut } from "@/core/types/api";
import { Check, AlertCircle, Clock, Loader2, Truck } from "lucide-react";

interface OrderTrackerProps {
  status: OrderStatut;
}

const STEPS = [
  { key: "pending", label: "En attente", desc: "Commande créée" },
  { key: "processing", label: "Traitement", desc: "Préparation en agence" },
  { key: "in_transit", label: "En transit", desc: "Acheminement en cours" },
  { key: "delivered", label: "Livré", desc: "Remis au destinataire" },
];

export function OrderTracker({ status }: OrderTrackerProps) {
  if (status === "cancelled") {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl border border-red-100 text-red-900 animate-in fade-in">
        <AlertCircle className="text-red-600 shrink-0" size={22} />
        <div>
          <p className="font-bold text-red-950">Commande Annulée</p>
          <p className="text-red-800/80 text-xs mt-0.5">
            Ce dossier logistique a été interrompu et archivé.
          </p>
        </div>
      </div>
    );
  }

  // Calcul du pourcentage de progression
  const currentIdx = STEPS.findIndex((s) => s.key === status);
  const progressPercent = (currentIdx / (STEPS.length - 1)) * 100;

  return (
    <div className="w-full bg-slate-50/50 border border-slate-100 p-6 rounded-2xl space-y-6">
      <div className="flex justify-between items-center">
        <h5 className="text-xs uppercase font-bold tracking-wider text-slate-400">
          Suivi Global du Dossier
        </h5>
        <span className="text-xs font-semibold px-2.5 py-1 bg-green-50 text-green-700 rounded-lg capitalize">
          Étape {currentIdx + 1} / {STEPS.length}
        </span>
      </div>

      {/* Barre de Progression Visuelle */}
      <div className="relative flex justify-between items-center w-full px-2">
        {/* Ligne de fond */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 rounded-full z-0" />
        {/* Ligne active animée */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-green-600 rounded-full transition-all duration-500 ease-out z-0"
          style={{ width: `${progressPercent}%` }}
        />

        {/* Génération des Puces/Checkpoints */}
        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentIdx;
          const isCurrent = idx === currentIdx;
          //   const isUpcoming = idx > currentIdx;

          return (
            <div
              key={step.key}
              className="relative flex flex-col items-center z-10"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                  isCompleted
                    ? "bg-green-600 border-green-600 text-white shadow-md shadow-green-500/20"
                    : isCurrent
                      ? "bg-white border-green-600 text-green-600 ring-4 ring-green-50 animate-pulse"
                      : "bg-white border-slate-300 text-slate-400"
                }`}
              >
                {isCompleted ? (
                  <Check size={16} strokeWidth={3} />
                ) : isCurrent && status === "in_transit" ? (
                  <Truck size={16} />
                ) : isCurrent && status === "processing" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Clock size={16} />
                )}
              </div>

              {/* Textes descriptifs sous le bouton */}
              <div className="absolute top-11 text-center min-w-[110px]">
                <p
                  className={`text-xs font-bold tracking-tight ${isCurrent ? "text-green-600" : "text-slate-700"}`}
                >
                  {step.label}
                </p>
                <p className="text-[10px] text-slate-400 font-medium hidden sm:block mt-0.5 leading-tight">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Spacer pour compenser les libellés absolus */}
      <div className="h-6" />
    </div>
  );
}
