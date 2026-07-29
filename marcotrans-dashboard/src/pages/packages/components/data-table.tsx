import React, { useState, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  VisibilityState,
  ExpandedState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Search, Settings2, Box, Tag, FileText } from "lucide-react";
import { PaginationMeta, Package, PackageItem } from "@/core/types/api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DataTableSkeleton } from "@/components/shared/skeletons/DataTableSkeleton";
import { usePackageItems } from "@/hooks/usePackages";

interface DataTableProps {
  columns: ColumnDef<Package, any>[];
  data: Package[];
  isLoading?: boolean;
  meta?: PaginationMeta | null;
  page?: number;
  setPage?: (page: number) => void;
  searchFilter?: string;
  setSearchFilter?: (search: string) => void;
  statusFilter?: string;
  setStatusFilter?: (status: string) => void;
  storageKey?: string;
}

/**
 * Composant de sous-tableau affichant les articles contenus dans un colis lorsqu'il est déroulé
 */
function PackageExpandedArticles({ packageItem }: { packageItem: Package }) {
  const [isOpen] = useState(true);
  const { data: fetchedItems, isLoading } = usePackageItems(packageItem.id, isOpen);

  const items = (packageItem.package_items && packageItem.package_items.length > 0)
    ? packageItem.package_items
    : (fetchedItems || []);

  const articles = packageItem.articles || [];

  if (isLoading && items.length === 0 && articles.length === 0) {
    return (
      <div className="py-3 px-4 text-xs text-slate-500 animate-pulse flex items-center gap-2">
        <Box size={14} className="animate-spin text-blue-500" />
        Chargement du contenu du colis #{packageItem.id}...
      </div>
    );
  }

  if (items.length === 0 && articles.length === 0) {
    return (
      <div className="py-3 px-4 text-xs text-slate-400 italic bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
        Aucun article spécifié à l'intérieur de ce colis.
      </div>
    );
  }

  return (
    <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-blue-100 rounded text-blue-600">
            <Box size={14} />
          </div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Articles & Marchandises dans le colis #{String(packageItem.id).padStart(4, "0")}
          </h4>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">
          {items.length || articles.length} élément(s) au total
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200 text-[11px] font-semibold uppercase text-slate-500 tracking-wider">
              <th className="py-2 px-3">Désignation</th>
              <th className="py-2 px-3">Nature / Catégorie</th>
              <th className="py-2 px-3 text-right">Quantité</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {items.length > 0 ? (
              items.map((item: PackageItem, index: number) => (
                <tr key={item.id || index} className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-medium text-slate-800 flex items-center gap-1.5">
                    <FileText size={13} className="text-slate-400" />
                    {item.designation || "Marchandise Diverses"}
                  </td>
                  <td className="py-2 px-3 text-slate-600">
                    <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      <Tag size={11} className="text-slate-400" />
                      {item.nature || "Standard"}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right font-semibold text-slate-900">
                    {item.quantity || 1}
                  </td>
                </tr>
              ))
            ) : (
              articles.map((art: any, index: number) => (
                <tr key={art.id || index} className="hover:bg-slate-50/50">
                  <td className="py-2 px-3 font-medium text-slate-800 flex items-center gap-1.5">
                    <FileText size={13} className="text-slate-400" />
                    {art.designation}
                  </td>
                  <td className="py-2 px-3 text-slate-600">
                    <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      <Tag size={11} className="text-slate-400" />
                      {art.nature || "Général"}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right font-semibold text-slate-900">
                    {art.pivot?.quantity || 1}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DataTable({
  columns,
  data,
  isLoading,
  meta,
  page,
  setPage,
  searchFilter,
  setSearchFilter,
  statusFilter,
  setStatusFilter,
  storageKey = "marcotrans-packages-columns-visibility",
}: DataTableProps) {
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

  const [expanded, setExpanded] = useState<ExpandedState>({});

  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(columnVisibility));
    }
  }, [columnVisibility, storageKey]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onExpandedChange: setExpanded,
    state: {
      columnVisibility,
      expanded,
    },
  });

  return (
    <div className="space-y-4">
      {/* Barre de Filtres et Paramètres */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          {/* Barre de recherche */}
          <div className="relative w-full sm:max-w-xs">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              placeholder="Rechercher colis, commande, client..."
              value={searchFilter || ""}
              onChange={(e) => setSearchFilter?.(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow placeholder:text-slate-400"
            />
          </div>

          {/* Filtre par Statut */}
          <div className="relative w-full sm:max-w-[200px]">
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
              <option value="received">Reçu en Hub</option>
              <option value="in_transit">En transit</option>
              <option value="customs_export">En Douane</option>
              <option value="delivered">Livré</option>
            </select>
          </div>
        </div>

        {/* Bouton pour sélectionner / afficher les colonnes */}
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
                      {column.id === "id"
                        ? "Code Colis"
                        : column.id === "order"
                          ? "Commande Réf."
                          : column.id === "client"
                            ? "Client Expéditeur"
                            : column.id === "type"
                              ? "Type & Format"
                              : column.id === "weight"
                                ? "Poids / Dimensions"
                                : column.id === "status"
                                  ? "Statut Livraison"
                                  : column.id === "items_count"
                                    ? "Contenu"
                                    : column.id === "created_at"
                                      ? "Date d'enregistrement"
                                      : column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tableau des Colis */}
      <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/80">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-slate-100 hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => (
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
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="divide-y divide-slate-100">
            {isLoading ? (
              <DataTableSkeleton columnCount={columns.length} rowCount={5} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  {/* Ligne Principale du Colis */}
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-slate-50/60 transition-colors cursor-pointer border-none"
                    onClick={() => row.toggleExpanded()}
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

                  {/* Ligne Déroulante pour afficher les Articles du Colis */}
                  {row.getIsExpanded() && (
                    <TableRow className="bg-slate-50/40 hover:bg-slate-50/40">
                      <TableCell
                        colSpan={row.getVisibleCells().length}
                        className="px-6 py-4"
                      >
                        <PackageExpandedArticles packageItem={row.original} />
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-sm text-slate-500"
                >
                  Aucun colis trouvé.
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
            colis
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
