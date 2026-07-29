import { useOrders } from "@/hooks/useOrders";
import OrderManagementModal from "@/components/shared/modals/OrderManagementModal";
import { useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export default function OrdersPage() {
  //
  const {
    orders,
    meta,
    isLoading,
    page,
    setPage,
    statusFilter,
    setStatusFilter,
    searchFilter,
    setSearchFilter,
  } = useOrders();

  // État local pour mémoriser la commande active à gérer
  const [selectedOrderRef, setSelectedOrderRef] = useState<string | null>(null);

  return (
    <>
      <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-6">
        {/* En-tête épuré de la page */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Commandes
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Gérez vos expéditions et suivez leur statut en temps réel.
            </p>
          </div>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm">
            Nouvelle Commande
          </button>
        </div>

        <DataTable
          columns={columns}
          data={orders || []}
          isLoading={isLoading}
          onManageOrder={setSelectedOrderRef}
          meta={meta}
          page={page}
          setPage={setPage}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </div>

      {/* RENDU DE LA MODALE GLOBLALE DE GESTION */}
      <OrderManagementModal
        reference={selectedOrderRef}
        onClose={() => setSelectedOrderRef(null)}
      />
    </>
  );
}
