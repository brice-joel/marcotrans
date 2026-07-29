import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Search, Settings2 } from "lucide-react";
import { PaginationMeta } from "@/core/types/api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DataTableSkeleton } from "@/components/shared/skeletons/DataTableSkeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  onManageOrder?: (ref: string) => void;
  meta?: PaginationMeta | null;
  page?: number;
  setPage?: (page: number) => void;
  searchFilter?: string;
  setSearchFilter?: (search: string) => void;
  statusFilter?: string;
  setStatusFilter?: (status: string) => void;
  storageKey?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  onManageOrder,
  meta,
  page,
  setPage,
  searchFilter,
  setSearchFilter,
  statusFilter,
  setStatusFilter,
  storageKey = "marcotrans-orders-columns-visibility",
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    () => {
      if (typeof window !== "undefined" && storageKey) {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          try {
            return JSON.parse(saved);
          } catch (e) {
            // ignore
          }
        }
      }
      return {};
    },
  );

  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(columnVisibility));
    }
  }, [columnVisibility, storageKey]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
    meta: {
      onManageOrder,
      paginationMeta: meta,
    },
  });

  return (
    <div className="space-y-4">
      {/* Contrôles du tableau (Recherche, Filtres, Colonnes) */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          {/* Barre de recherche */}
          <div className="relative w-full sm:max-w-xs">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              placeholder="Rechercher réf, client, adresse..."
              value={searchFilter || ""}
              onChange={(e) => setSearchFilter?.(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow placeholder:text-slate-400"
            />
          </div>

          {/* Filtre Statut */}
          <div className="relative w-full sm:max-w-[180px]">
            <Filter
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <select
              value={statusFilter || ""}
              onChange={(e) => {
                setStatusFilter?.(e.target.value);
                setPage?.(1);
              }}
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none transition-shadow"
            >
              <option value="">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="in_transit">En transit</option>
              <option value="delivered">Livrée</option>
              <option value="cancelled">Annulée</option>
            </select>
          </div>
        </div>

        {/* Colonne Toggles */}
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-2 px-3 py-2 border border-slate-200 bg-white rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                <Settings2 size={16} />
                Colonnes
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize text-sm"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id === "reference"
                        ? "Référence"
                        : column.id === "type"
                          ? "Type"
                          : column.id === "client"
                            ? "Client"
                            : column.id === "total_price"
                              ? "Prix Total"
                              : column.id === "status"
                                ? "Statut"
                                : column.id === "locations"
                                  ? "Origine-Destination"
                                  : column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/80">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-slate-100 hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="px-4 py-3 text-[11px] uppercase tracking-wider font-semibold text-slate-500 h-auto"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="divide-y divide-slate-100">
            {isLoading ? (
              <DataTableSkeleton columnCount={columns.length} rowCount={5} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-slate-50/50 transition-colors border-none"
                  onDoubleClick={() => {
                    const order = row.original as { reference: string };
                    if (onManageOrder && order.reference) {
                      onManageOrder(order.reference);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-sm text-slate-500"
                >
                  Aucune commande trouvée.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {meta && meta.last_page > 1 && setPage && page && (
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <p className="text-sm text-slate-500">
            Affichage de{" "}
            <span className="font-semibold text-slate-700">
              {(meta.current_page - 1) * meta.per_page + 1}
            </span>{" "}
            à{" "}
            <span className="font-semibold text-slate-700">
              {Math.min(meta.current_page * meta.per_page, meta.total)}
            </span>{" "}
            sur{" "}
            <span className="font-semibold text-slate-700">{meta.total}</span>{" "}
            résultats
          </p>
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) setPage(page - 1);
                  }}
                  className={
                    page === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < meta.last_page) setPage(page + 1);
                  }}
                  className={
                    page === meta.last_page
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
