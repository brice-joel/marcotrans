import { usePackages } from "@/hooks/usePackages";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { Package as PackageIcon, Plus } from "lucide-react";

export default function Index() {
  const {
    packages,
    meta,
    isLoading,
    page,
    setPage,
    statusFilter,
    setStatusFilter,
    searchFilter,
    setSearchFilter,
  } = usePackages();

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6">
        {/* En-tête de la page des Colis */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                Logistique & Expéditions
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <PackageIcon className="text-slate-700" size={24} />
              Gestion des Colis
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Consultez l'ensemble des colis physiques, filtrez par statut ou
              par client, et cliquez sur une ligne pour dérouler la liste des
              articles contenus.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm self-start sm:self-auto">
            <Plus size={16} />
            Enregistrer un Colis
          </button>
        </div>

        {/* Tableau de Données TanStack */}
        <DataTable
          columns={columns}
          data={packages || []}
          isLoading={isLoading}
          meta={meta}
          page={page}
          setPage={setPage}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </div>
    </div>
  );
}
