import { useState } from "react";
import { SheetModal, SheetModalContent } from "@/components/ui/sheet-modal";
import { useOrderDetails } from "@/hooks/useOrders";
import { OrderTracker } from "@/components/OrderTracker";

import {
  Package as PackageIcon,
  FileText,
  ChevronDown,
  ChevronUp,
  Loader2,
  DollarSign,
  Truck,
  User,
  MapPin,
  Calendar,
  Globe,
  Layers,
} from "lucide-react";
import { OrderStatusBadge } from "@/components/OrderBadge";
import { useOrderPackages, usePackageItems } from "@/hooks/usePackages";
import { Order, Package, PackageItem } from "@/core/types/api";
import CheckpointTracker from "@/components/CheckpointTracker";

interface OrderManagementModalProps {
  reference: string | null;
  onClose: () => void;
}

type TabType = "general" | "packages";

export default function OrderManagementModal({
  reference,
  onClose,
}: OrderManagementModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const isOpen = !!reference;

  const { data: order, isLoading: isOrderLoading } = useOrderDetails(reference);

  return (
    <SheetModal open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetModalContent
        title={`Dossier Logistique — ${reference}`}
        description="Suivi de transit, informations de livraison, facturation et répartition des colis."
        className="p-0 sm:max-w-5xl lg:max-w-6xl xl:max-w-7xl" // Taille augmentée pour un rendu professionnel
      >
        {isOrderLoading ? (
          <div className="flex h-[70vh] flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="animate-spin text-blue-600" size={32} />
            <p className="text-sm font-medium animate-pulse">
              Chargement des données de transit...
            </p>
          </div>
        ) : order ? (
          <div className="flex flex-col md:flex-row h-full min-h-[75vh] bg-slate-50/40">
            {/* SIDEBAR DE NAVIGATION */}
            <div className="w-full md:w-72 bg-white border-b md:border-b-0 md:border-r border-slate-200/70 p-6 flex flex-col justify-between gap-6 shrink-0">
              <div className="space-y-6">
                {/* Bloc Client Éléguant */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/80">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">
                    Donneurs d'ordre / Client
                  </span>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0 mt-0.5">
                      <User size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-800 truncate">
                        {order.client?.name ?? "Client de passage"}
                      </p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {order.client?.email ?? "Pas d'adresse email"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Onglets de navigation */}
                <nav className="flex md:flex-col gap-1.5 bg-slate-100/80 md:bg-transparent p-1 md:p-0 rounded-xl">
                  <button
                    onClick={() => setActiveTab("general")}
                    className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                      activeTab === "general"
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/15"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <FileText size={18} />
                    <span>Vue générale</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("packages")}
                    className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                      activeTab === "packages"
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/15"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <PackageIcon size={18} />
                    <span>Colis & Articles</span>
                  </button>
                </nav>
              </div>

              {/* Pied de la sidebar : Statut et Horodatage */}
              <div className="hidden md:block border-t border-slate-100 pt-5 space-y-4">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                    Statut Actuel du Dossier
                  </p>
                  <OrderStatusBadge value={order.status} />
                </div>
                {order.created_at && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <Calendar size={13} />
                    <span>
                      Enregistré le{" "}
                      {new Date(order.created_at).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* ESPACE DE CONTENU PRINCIPAL */}
            <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-white">
              {activeTab === "general" && <GeneralTabPane order={order} />}
              {activeTab === "packages" && (
                <PackagesTabPane reference={order.reference} />
              )}
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400">
            Impossible de charger le dossier demandé.
          </div>
        )}
      </SheetModalContent>
    </SheetModal>
  );
}

/* ==========================================
   ONGLET 1 : VUE GÉNÉRALE (DÉTAILS COMMANDE)
   ========================================== */
function GeneralTabPane({ order }: { order: Order }) {
  const formattedPrice = new Intl.NumberFormat("fr-FR").format(
    Number(order.total_price),
  );

  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in-50 duration-200">
      <div>
        <h4 className="text-xl font-bold text-slate-900 tracking-tight">
          Fiche de Routage & Spécifications
        </h4>
        <p className="text-sm text-slate-500 mt-1">
          Aperçu complet des adresses d'expédition, indicateurs de valeur et
          mode de transit affecté.
        </p>
      </div>

      {/* Jauge globale interactive */}
      <OrderTracker status={order.status} />

      {/* DESIGN COMPOSANT : ITINÉRAIRE CARTOGRAPHIQUE VISUEL */}
      <div className="bg-slate-50/60 border border-slate-200/60 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 p-4 opacity-5 text-slate-900 pointer-events-none">
          <Globe size={140} />
        </div>

        <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-6">
          Axe d'Acheminement (Routage)
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Ligne pointillée décorative entre départ et arrivée en Desktop */}
          <div className="hidden md:block absolute left-1/2 top-5 -translate-x-1/2 w-[40%] border-t-2 border-dashed border-slate-300 z-0" />

          {/* Point de départ */}
          <div className="relative flex gap-4 z-10">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0 h-11 w-11 flex items-center justify-center font-bold ring-4 ring-white shadow-2xs">
              <MapPin size={18} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide block">
                Origine / Enlèvement
              </span>
              <p className="text-sm font-semibold text-slate-800 mt-1 leading-relaxed">
                {order.departure_address}
              </p>
            </div>
          </div>

          {/* Point d'arrivée */}
          <div className="relative flex gap-4 z-10">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0 h-11 w-11 flex items-center justify-center font-bold ring-4 ring-white shadow-2xs">
              <MapPin size={18} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide block">
                Destination / Livraison
              </span>
              <p className="text-sm font-semibold text-slate-800 mt-1 leading-relaxed">
                {order.delivery_address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Métriques Financières & Techniques */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-slate-100 bg-linear-to-b from-slate-50/50 to-slate-50 flex items-center gap-4 shadow-2xs">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <DollarSign size={20} />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Coût Global
            </span>
            <span className="text-lg font-extrabold text-slate-800 tracking-tight block mt-0.5">
              {formattedPrice} FCFA
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-100 bg-linear-to-b from-slate-50/50 to-slate-50 flex items-center gap-4 shadow-2xs">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Truck size={20} />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Typologie Flux
            </span>
            <span className="text-sm font-bold text-slate-700 capitalize block mt-1">
              {order.type}
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-100 bg-linear-to-b from-slate-50/50 to-slate-50 flex items-center gap-4 shadow-2xs">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Layers size={20} />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Référence Dossier
            </span>
            <span className="text-sm font-mono font-bold text-slate-700 block mt-1">
              {order.reference}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   ONGLET 2 : CARGAISON (COLIS & LOGISTIQUE)
   ========================================== */
function PackagesTabPane({ reference }: { reference: string }) {
  const { data: packages, isLoading } = useOrderPackages(reference, true);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2 animate-in fade-in-50">
        <Loader2 className="animate-spin text-blue-500" size={26} />
        <p className="text-xs font-medium tracking-wide">
          Analyse des manifestes de fret...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <div>
        <h4 className="text-xl font-bold text-slate-900 tracking-tight">
          Colisage & Manifestes
        </h4>
        <p className="text-sm text-slate-500 mt-1">
          Déployez chaque unité logistique pour visualiser ses escales
          spécifiques et son inventaire physique.
        </p>
      </div>

      <div className="space-y-4">
        {packages && packages.length > 0 ? (
          packages.map((pkg: Package) => (
            <PackageRowAccordion key={pkg.id} pkg={pkg} />
          ))
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/30">
            <PackageIcon size={36} className="mx-auto text-slate-300 mb-3" />
            <p className="text-sm text-slate-400 italic font-medium">
              Aucune unité de colisage enregistrée sur ce dossier.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* COMPOSANT INTERNE : ACCORDÉON DE COLIS */
function PackageRowAccordion({ pkg }: { pkg: Package }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: items, isLoading } = usePackageItems(pkg.id, isExpanded);

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        isExpanded
          ? "border-slate-300 shadow-xs"
          : "border-slate-200 shadow-2xs hover:border-slate-300"
      }`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between p-5 transition-colors text-left cursor-pointer ${
          isExpanded ? "bg-slate-50/80" : "bg-white hover:bg-slate-50/40"
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-xl transition-colors ${isExpanded ? "bg-blue-600 text-white shadow-md shadow-blue-500/10" : "bg-slate-100 text-slate-600"}`}
          >
            <PackageIcon size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">
              Unité Logistique N° {pkg.id}
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
              <span>
                Type :{" "}
                <span className="font-semibold text-slate-600 capitalize">
                  {pkg.type}
                </span>
              </span>
              <span className="h-3 w-px bg-slate-200" />
              <span>
                Poids :{" "}
                <span className="font-semibold text-slate-600">
                  {pkg.weight} kg
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="p-1.5 hover:bg-slate-200/50 rounded-lg transition-colors">
          {isExpanded ? (
            <ChevronUp size={16} className="text-slate-500" />
          ) : (
            <ChevronDown size={16} className="text-slate-500" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="bg-white border-t border-slate-100 p-5 space-y-5 animate-in slide-in-from-top-1 duration-200">
          {/* Jauge des escales logistiques physiques */}
          <CheckpointTracker
            packageId={pkg.id}
            packageStatus={pkg.status}
            isOpen={isExpanded}
          />

          {/* Inventaire du contenu */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Inventaire / Contenu Déclaré
            </span>
            {isLoading ? (
              <div className="flex items-center gap-2 text-xs text-slate-400 py-1 pl-1">
                <Loader2 className="animate-spin text-blue-500" size={14} />
                <span>Indexation des articles en cours...</span>
              </div>
            ) : items && items.length > 0 ? (
              <div className="bg-slate-50/50 rounded-xl border border-slate-200/60 p-2 divide-y divide-slate-100">
                {items.map((item: PackageItem) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-3 px-3 text-sm rounded-lg hover:bg-white transition-all group"
                  >
                    <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                      {item.designation}
                    </span>
                    <span className="bg-white border border-slate-200/80 text-slate-600 font-extrabold px-3 py-1 rounded-lg text-xs shadow-2xs">
                      × {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic py-1 pl-1">
                Aucun article listé pour cette unité.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
