import { ColumnDef } from "@tanstack/react-table";
import { Package } from "@/core/types/api";
import { ChevronDown, ChevronRight, Package as PackageIcon, User, Layers } from "lucide-react";

export const getStatusBadge = (status: string) => {
  switch (status?.toLowerCase()) {
    case "delivered":
    case "completed":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
          Livré
        </span>
      );
    case "in_transit":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
          En Transit
        </span>
      );
    case "customs_export":
    case "customs_import":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
          En Douane
        </span>
      );
    case "received":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
          Reçu en Hub
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
          {status || "En attente"}
        </span>
      );
  }
};

export const columns: ColumnDef<Package>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      const isExpanded = row.getIsExpanded();
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            row.toggleExpanded();
          }}
          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
          title={isExpanded ? "Masquer les articles" : "Voir les articles du colis"}
        >
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
      );
    },
  },
  {
    accessorKey: "id",
    id: "id",
    header: "Code Colis",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 font-mono font-medium text-slate-900 text-xs">
        <div className="p-1 bg-slate-100 rounded text-slate-600">
          <PackageIcon size={14} />
        </div>
        #{String(row.original.id).padStart(4, "0")}
      </div>
    ),
  },
  {
    accessorKey: "order",
    id: "order",
    header: "Commande Réf.",
    cell: ({ row }) => {
      const orderRef = row.original.order?.reference || (row.original.order_id ? `CMD-${row.original.order_id}` : "N/A");
      return (
        <span className="font-semibold text-xs text-blue-600 bg-blue-50/80 border border-blue-100 px-2 py-1 rounded-md">
          {orderRef}
        </span>
      );
    },
  },
  {
    accessorKey: "client",
    id: "client",
    header: "Client Expéditeur",
    cell: ({ row }) => {
      const client = row.original.order?.client;
      if (!client) return <span className="text-slate-400 text-xs font-normal">Non spécifié</span>;
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-medium text-slate-800 text-xs">
            <User size={13} className="text-slate-400" />
            {client.name}
          </div>
          <span className="text-[11px] text-slate-400 pl-4">{client.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    id: "type",
    header: "Type & Format",
    cell: ({ row }) => (
      <span className="capitalize text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
        {row.original.type || "Carton Standard"}
      </span>
    ),
  },
  {
    accessorKey: "weight",
    id: "weight",
    header: "Poids / Dimensions",
    cell: ({ row }) => {
      const weight = row.original.weight;
      const dims = row.original.dimensions;
      return (
        <div className="flex flex-col text-xs text-slate-700">
          <span className="font-medium">{weight ? `${weight} kg` : "N/A"}</span>
          {dims && <span className="text-[11px] text-slate-400">{dims}</span>}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    id: "status",
    header: "Statut Livraison",
    cell: ({ row }) => getStatusBadge(row.original.status),
  },
  {
    accessorKey: "items_count",
    id: "items_count",
    header: "Contenu",
    cell: ({ row }) => {
      const items = row.original.package_items || [];
      const articles = row.original.articles || [];
      const totalCount = items.length > 0 ? items.length : articles.length;
      return (
        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
          <Layers size={14} className="text-slate-400" />
          {totalCount} {totalCount > 1 ? "articles" : "article"}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    id: "created_at",
    header: "Date d'enregistrement",
    cell: ({ row }) => {
      const rawDate = row.original.created_at;
      if (!rawDate) return <span className="text-slate-400 text-xs">--</span>;
      return (
        <span className="text-xs text-slate-500">
          {new Date(rawDate).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      );
    },
  },
];
