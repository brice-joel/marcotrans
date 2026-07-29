import React, { useState, useEffect } from "react";
import { useLocation, Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  Globe,
  Layers,
  Eye,
  FileText,
  FileCheck,
  Percent,
  ShieldAlert,
  History,
  Users,
  Truck,
  Building2,
  MapPin,
  Wallet,
  Receipt,
  CreditCard,
  BarChart3,
  UserCheck,
  Settings,
  ScrollText,
  ChevronDown,
  User,
  Inbox,
  ArrowRightLeft,
  Boxes,
  X,
} from "lucide-react";
import { useAuthStore } from "@/core/stores/authStore";
import { UserRole } from "@/core/types/api";

// --- TYPES DE CONFIGURATION DE LA NAVIGATION ---
export interface SubMenuItem {
  label: string;
  to: string;
}

export interface MenuItem {
  label: string;
  icon: React.ReactNode;
  to?: string;
  children?: SubMenuItem[];
  allowedRoles?: UserRole["name"][];
}

export interface NavigationSection {
  sectionTitle: string;
  items: MenuItem[];
}

// --- CONFIGURATION CENTRALISÉE ET SÉCURISÉE DES ONGLETS ---
const navigationConfig: NavigationSection[] = [
  {
    sectionTitle: "Tableau de bord",
    items: [
      {
        label: "Tableau de Bord",
        icon: <LayoutDashboard size={18} />,
        to: "/",
        // Accessible par tout le monde, le composant de la page se chargera d'injecter la bonne vue selon le rôle
      },
    ],
  },
  {
    sectionTitle: "Fret & International",
    items: [
      {
        label: "Nouveau colis",
        icon: <PlusCircle size={18} />,
        to: "/shipments/packages/new",
        allowedRoles: ["commercial"], // Le guichet/commercial crée les colis
      },
      {
        label: "Colis",
        icon: <Package size={18} />,
        to: "/shipments/packages",
        allowedRoles: ["admin", "commercial", "transit_agent"], // Onglet partagé
      },
      {
        label: "Commandes",
        icon: <Package size={18} />,
        to: "/orders",
        allowedRoles: ["admin", "commercial", "transit_agent"], // Onglet partagé
      },
      {
        label: "Expéditions internationales",
        icon: <Globe size={18} />,
        to: "/shipments/international",
        allowedRoles: ["admin", "transit_agent"], // Focus douane/fret international
      },
      {
        label: "Retours & Litiges",
        icon: <ScrollText size={18} />,
        to: "/shipments/returns-litiges",
        allowedRoles: ["admin", "commercial"],
      },
      {
        label: "Groupage / Fret",
        icon: <Layers size={18} />,
        allowedRoles: ["admin", "transit_agent"],
        children: [
          { label: "Lots en cours", to: "/groupage/active" },
          { label: "Historique des vagues", to: "/groupage/history" },
        ],
      },
      {
        label: "Suivi en temps réel",
        icon: <Eye size={18} />,
        // Aucun role spécifié = accessible par défaut pour TOUS les rôles du dashboard
        children: [
          { label: "Carte en direct", to: "/tracking/live-map" },
          { label: "Checkpoints", to: "/tracking/checkpoints" },
        ],
      },
    ],
  },

  {
    sectionTitle: "LOGISTIQUE LOCALE",
    items: [
      {
        label: "Nouvelle commande",
        icon: <PlusCircle size={18} />,
        to: "/delivery/orders/create",
        allowedRoles: ["commercial"], // Le guichet/commercial crée les colis
      },

      {
        label: "Suivi en temps réel",
        icon: <Eye size={18} />,
        // Aucun role spécifié = accessible par défaut pour TOUS les rôles du dashboard
        children: [
          { label: "Carte en direct", to: "/delivery/tracking/live-map" },
        ],
      },
    ],
  },
  {
    sectionTitle: "ENTREPÔTS & STOCKS",
    items: [
      {
        label: "Réceptions",
        icon: <Inbox size={18} />,
        to: "/warehouses/inbound",
        allowedRoles: ["admin", "transit_agent"],
      },
      {
        label: "Emplacements (Racks)",
        icon: <Boxes size={18} />,
        to: "/warehouses/racks",
        allowedRoles: ["admin"],
      },
      {
        label: "Transferts Inter-Agences",
        icon: <ArrowRightLeft size={18} />,
        to: "/warehouses/transfers",
        allowedRoles: ["admin", "transit_agent"],
      },
    ],
  },
  {
    sectionTitle: "Douane",
    items: [
      {
        label: "Dossiers douaniers",
        icon: <FileText size={18} />,
        to: "/customs/folders",
        allowedRoles: ["admin", "transit_agent"],
      },
      {
        label: "Déclarations",
        icon: <FileCheck size={18} />,
        to: "/customs/declarations",
        allowedRoles: ["admin", "transit_agent"],
      },
      {
        label: "Taxes & droits",
        icon: <Percent size={18} />,
        to: "/customs/taxes",
        allowedRoles: ["admin", "transit_agent"],
      },
      {
        label: "Produits interdits",
        icon: <ShieldAlert size={18} />,
        to: "/customs/prohibited",
        allowedRoles: ["admin", "transit_agent", "commercial"], // Utile aussi au commercial pour conseiller un client
      },
      {
        label: "Historiques inspections",
        icon: <History size={18} />,
        to: "/customs/inspections",
        allowedRoles: ["admin", "transit_agent"],
      },
    ],
  },
  {
    sectionTitle: "FLOTTE & RÉSEAUX",
    items: [
      {
        label: "Clients",
        icon: <User size={18} />,
        to: "/management/clients",
        allowedRoles: ["admin", "commercial"],
      },
      {
        label: "Fournisseurs / Partenaires",
        icon: <Users size={18} />,
        to: "/management/suppliers",
        allowedRoles: ["admin", "transit_agent"],
      },
      {
        label: "Livreurs",
        icon: <Truck size={18} />,
        to: "/management/drivers",
        allowedRoles: ["admin"],
      },
      {
        label: "Véhicules",
        icon: <Truck size={18} />,
        to: "/management/fleet",
        allowedRoles: ["admin"],
      },
      {
        label: "Agences",
        icon: <Building2 size={18} />,
        to: "/management/branches",
        allowedRoles: ["admin"],
      },
      {
        label: "Zones & Tarifs",
        icon: <MapPin size={18} />,
        to: "/management/pricing",
        allowedRoles: ["admin"],
      },
    ],
  },
  {
    sectionTitle: "Finances",
    items: [
      {
        label: "Caisse / Encaissements",
        icon: <Wallet size={18} />,
        to: "/finances/cash-desk",
        allowedRoles: ["admin", "commercial"], // Pour encaisser les colis au comptoir
      },
      {
        label: "Factures",
        icon: <Receipt size={18} />,
        to: "/finances/invoices",
        allowedRoles: ["admin", "commercial"],
      },
      {
        label: "Dépenses",
        icon: <CreditCard size={18} />,
        to: "/finances/expenses",
        allowedRoles: ["admin", "transit_agent"], // L'agent de transit déclare les frais de douane/route
      },
      {
        label: "Rapports financiers",
        icon: <BarChart3 size={18} />,
        to: "/finances/reports",
        allowedRoles: ["admin"], // Chiffre d'affaires global exclusif à l'admin
      },
    ],
  },
  {
    sectionTitle: "Paramètres",
    items: [
      {
        label: "Utilisateurs & rôles",
        icon: <UserCheck size={18} />,
        to: "/settings/users",
        allowedRoles: ["admin"],
      },
      {
        label: "Paramètres",
        icon: <Settings size={18} />,
        to: "/settings",
        allowedRoles: ["admin", "commercial", "transit_agent"], // Tout le monde peut accéder à la page de paramètres, mais certains onglets seront cachés selon le rôle
      },
      {
        label: "Journal d'activités",
        icon: <ScrollText size={18} />,
        to: "/settings/audit-logs",
        allowedRoles: ["admin"],
      },
    ],
  },
];

export default function Sidebar({ isOpen, setIsOpen }: { isOpen?: boolean; setIsOpen?: (v: boolean) => void }) {
  //const currentRole = useAuthStore((state) => state.role);
  const { user } = useAuthStore();
  const currentRole = user?.roles?.[0]?.name as string;

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 lg:static h-full w-64 bg-[#0B132B] text-slate-400 flex flex-col shrink-0 border-r border-slate-800 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* Brand Header */}
      <div className="p-4 flex items-center justify-between border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-[#00E676] text-[#0B132B] px-2.5 py-1.5 rounded-xl font-black text-xl tracking-wider select-none">
            S
          </div>
          <div>
            <h1 className="text-white font-black text-sm tracking-wide leading-none">
              MARCO TRANS LTD
            </h1>
            <span className="text-[9px] text-[#FF9100] font-bold tracking-wider uppercase block mt-1">
              Expédition & Livraison
            </span>
          </div>
        </div>
        {/* Bouton de fermeture sur mobile */}
        <button 
          onClick={() => setIsOpen?.(false)}
          className="lg:hidden p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 custom-scrollbar text-[13px]">
        {navigationConfig.map((section, idx) => {
          // 1. Filtrer les onglets de la section courante en fonction du rôle de l'utilisateur
          const visibleItems = section.items.filter(
            (item) =>
              !item.allowedRoles || item.allowedRoles.includes(currentRole),
          );

          // 2. Si aucun onglet de la section n'est autorisé pour ce rôle, on masque toute la section
          if (visibleItems.length === 0) return null;

          return (
            <div key={idx} className="space-y-1.5">
              {/* Titre de Section */}
              <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest select-none">
                {section.sectionTitle}
              </p>

              {/* Éléments visibles de la section */}
              <div className="space-y-0.5">
                {visibleItems.map((item, itemIdx) => (
                  <SidebarItem 
                    key={itemIdx} 
                    item={item} 
                    onLinkClick={() => setIsOpen?.(false)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

// --- COMPOSANT INTERNE POUR UN ONGLET (AVEC OU SANS DROPDOWN) ---
function SidebarItem({ item, onLinkClick }: { item: MenuItem; onLinkClick?: () => void }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isParentActive = item.to ? location.pathname === item.to : false;
  const isChildActive =
    item.children?.some((child) => location.pathname === child.to) ?? false;
  const isActive = isParentActive || isChildActive;

  useEffect(() => {
    if (isChildActive) {
      setIsOpen(true);
    }
  }, [isChildActive]);

  // Onglet avec sous-onglets (Dropdown)
  if (item.children && item.children.length > 0) {
    return (
      <div className="w-full space-y-0.5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-medium group text-left ${
            isActive
              ? "bg-slate-800/40 text-white"
              : "text-slate-400 hover:text-white hover:bg-slate-800/30"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`transition-colors ${isActive ? "text-[#2979FF]" : "text-slate-500 group-hover:text-blue-400"}`}
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </div>
          <ChevronDown
            size={14}
            className={`text-slate-500 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 text-white" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="pl-9 pr-2 py-0.5 space-y-0.5 border-l border-slate-800 ml-5 mt-0.5">
            {item.children.map((child, index) => {
              const isSubActive = location.pathname === child.to;
              return (
                <Link
                  key={index}
                  to={child.to}
                  onClick={onLinkClick}
                  className={`block py-1.5 px-3 rounded-lg text-[12px] font-medium transition-all ${
                    isSubActive
                      ? "text-[#00E676] bg-[#00E676]/5 font-bold"
                      : "text-slate-400 hover:text-white hover:pl-4"
                  }`}
                >
                  {child.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Onglet standard direct (sans sous-onglets)
  return (
    <Link
      to={item.to || "/"}
      onClick={onLinkClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all group ${
        isParentActive
          ? "bg-[#2979FF] text-white shadow-lg shadow-blue-500/15"
          : "text-slate-400 hover:text-white hover:bg-slate-800/30"
      }`}
    >
      <span
        className={`transition-colors ${isParentActive ? "text-white" : "text-slate-500 group-hover:text-blue-400"}`}
      >
        {item.icon}
      </span>
      <span>{item.label}</span>
    </Link>
  );
}
