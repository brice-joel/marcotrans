import { ColumnDef } from "@tanstack/react-table";
import { Order, OrderType, OrderStatut } from "@/core/types/api";
import { OrderStatusBadge, OrderTypeBadge } from "@/components/OrderBadge";
import { Eye } from "lucide-react";

export const columns: ColumnDef<Order>[] = [
  {
    id: "index",
    header: "N°",
    cell: ({ row, table }) => {
      const meta = table.options.meta as any;
      const pagination = meta?.paginationMeta;
      const index = pagination
        ? (pagination.current_page - 1) * pagination.per_page + row.index + 1
        : row.index + 1;

      return <div className="text-slate-600">{index}</div>;
    },
  },
  {
    accessorKey: "reference",
    header: "Réf.",
    cell: ({ row }) => (
      <div className="font-medium text-slate-800">
        {row.getValue("reference")}
      </div>
    ),
  },
  {
    id: "client",
    header: "Client",
    cell: ({ row }) => {
      const client = row.original.client;
      if (!client)
        return <span className="text-slate-400 italic text-sm">N/A</span>;
      return (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800">{client.name}</span>
          <span className="text-[11px] text-slate-500">{client.phone}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as OrderType;
      return (
        <div className="scale-90 origin-left">
          <OrderTypeBadge value={type} />
        </div>
      );
    },
  },
  {
    id: "locations",
    header: "Origine-Destination",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex flex-col gap-0.5 max-w-[180px]">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
            <p
              className="text-xs text-slate-500 truncate cursor-help"
              title={order.departure_address}
            >
              {order.departure_address || "Origine non spécifiée"}
            </p>
          </div>
          <div className="ml-[2.5px] border-l border-solid border-slate-200 h-2" />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <p
              className="text-xs font-medium text-slate-800 truncate cursor-help"
              title={order.delivery_address}
            >
              {order.delivery_address || "Destination non spécifiée"}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "total_price",
    header: "Prix Total",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("total_price"));
      return (
        <div className="font-medium text-slate-800">
          {price.toLocaleString("fr-FR")}{" "}
          <span className="text-[11px] text-slate-500 font-normal">FCFA</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.getValue("status") as OrderStatut;
      return (
        <div className="scale-90 origin-left">
          <OrderStatusBadge value={status} />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row, table }) => {
      const order = row.original;
      const meta = table.options.meta as {
        onManageOrder?: (ref: string) => void;
      };

      return (
        <div className="text-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (meta?.onManageOrder) {
                meta.onManageOrder(order.reference);
              }
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] uppercase tracking-wider font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 hover:border-blue-100 rounded-md transition-colors cursor-pointer"
            title="Gérer la commande"
          >
            <Eye size={14} /> Gérer
          </button>
        </div>
      );
    },
  },
];
