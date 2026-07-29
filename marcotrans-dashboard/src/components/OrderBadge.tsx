import { OrderStatut, OrderType } from "@/core/types/api";
import React from "react";
interface TypeBadgeProps {
  value: OrderType;
}
interface StatusBadgeProps {
  value: OrderStatut;
}
export const OrderStatusBadge: React.FC<StatusBadgeProps> = ({ value }) => {
  const configs: Record<OrderStatut, string> = {
    pending: "bg-amber-50 text-amber-600",
    in_transit: "bg-blue-50 text-blue-600",
    delivered: "bg-emerald-50 text-emerald-600",
    processing: "bg-purple-50 text-purple-600",
    cancelled: "bg-red-50 text-red-600",
  };

  const labels: Record<OrderStatut, string> = {
    pending: "En attente",
    in_transit: "En transit",
    delivered: "Livrée",
    processing: "Encours",
    cancelled: "Annulée",
  };

  return (
    <span
      className={`${configs[value] || "bg-slate-100 text-slate-600"} px-2.5 py-1 rounded-md text-xs font-bold`}
    >
      {labels[value] || value}
    </span>
  );
};

export const OrderTypeBadge: React.FC<TypeBadgeProps> = ({ value }) => {
  const icons: Record<OrderType, string> = {
    international: "🌍 International",
    interurban: "🛣️ Interurbain",
    urban: "🏙️ Urbain",
  };
  return (
    <span className="text-slate-600 font-semibold text-xs">
      {icons[value] || value}
    </span>
  );
};
