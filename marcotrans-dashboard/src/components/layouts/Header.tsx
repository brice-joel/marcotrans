import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  Globe,
  Search,
  MessageSquare,
  LogOut,
  User,
  Settings,
  Shield,
  Truck,
  AlertTriangle,
  Check,
  ChevronDown,
  Menu,
} from "lucide-react";
import { useAuthStore } from "@/core/stores/authStore";
import { toast } from "sonner";

import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  // 1. Récupération des données et de la fonction de déconnexion depuis Zustand
  //const { user, logout } = useAuthStore();

  // 1. Récupération de la fonction logout et de l'état de chargement
  const { logout, isLoggingOut } = useAuth();

  // 2. Récupération des infos utilisateur pour l'affichage (optionnel)
  const user = useAuthStore((state) => state.user);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // --- ÉTATS POUR LES SUPPORTS DÉROULANTS ---
  const [activeDropdown, setActiveDropdown] = useState<
    "notifications" | "messages" | "languages" | "profile" | null
  >(null);

  // Référence globale pour détecter les clics extérieurs
  const headerRef = useRef<HTMLDivElement>(null);

  // Fonction pour basculer un dropdown
  const toggleDropdown = (
    dropdown: "notifications" | "messages" | "languages" | "profile",
  ) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Fermer les dropdowns si on clique à l'extérieur du Header
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Déconnexion de démo
  const handleLogout = () => {
    // Nettoyer les caches de requêtes TanStack Query (sécurité des données logistiques)
    queryClient.clear();

    // Déconnexion Zustand & localStorage
    logout();

    toast.info("Déconnexion réussie", {
      description: "À bientôt sur le portail MarcoTrans.",
    });

    // Redirection
    navigate({ to: "/auth/login" });
    setActiveDropdown(null);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-30 h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 shrink-0 select-none"
    >
      {/* 🔍 Barre de recherche (Gauche) */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-xl">
        {/* Hamburger Menu pour Mobile */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-1.5 -ml-1 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>

        <h2 className="text-lg font-black text-slate-800 hidden md:block mr-4">
          Dashboard{" "}
          <span className="text-blue-500 text-xs font-bold bg-blue-50 px-2 py-0.5 rounded-lg ml-1">
            {user?.roles?.[0]?.name}
          </span>
        </h2>
        <div className="relative ">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Rechercher un colis, client, facture..."
            className="w-full pl-10 pr-16 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400 font-medium"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-xs">
            Ctrl + K
          </span>
        </div>
      </div>

      {/* 🔔 Profil & Actions (Droite) */}
      <div className="flex items-center gap-2.5">
        {/* 1. Bouton & Dropdown Notifications */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("notifications")}
            className={`p-2.5 rounded-full transition-colors relative ${activeDropdown === "notifications" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"}`}
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-black flex items-center justify-center rounded-full ring-2 ring-white">
              3
            </span>
          </button>

          {activeDropdown === "notifications" && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-100 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-4 py-2 border-b border-slate-50 flex justify-between items-center">
                <span className="font-bold text-slate-800 text-xs">
                  Notifications
                </span>
                <button className="text-[10px] font-bold text-blue-500 hover:underline">
                  Tout marquer lu
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <NotificationItem
                  icon={<AlertTriangle className="text-amber-500" size={14} />}
                  bg="bg-amber-50"
                  title="Alerte Douane - Blocage"
                  desc="Conteneur #FR-DLA-092 suspecté d'anomalie de poids."
                  time="Il y a 5 min"
                />
                <NotificationItem
                  icon={<Truck className="text-blue-500" size={14} />}
                  bg="bg-blue-50"
                  title="Tournée assignée"
                  desc="Livreur Landry M. a démarré la tournée Akwa."
                  time="Il y a 25 min"
                />
                <NotificationItem
                  icon={<Check className="text-emerald-500" size={14} />}
                  bg="bg-emerald-50"
                  title="Paiement COD validé"
                  desc="25 000 FCFA encaissés pour le colis MTL2505."
                  time="Il y a 1 heure"
                />
              </div>
            </div>
          )}
        </div>

        {/* 2. Bouton & Dropdown Messages */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("messages")}
            className={`p-2.5 rounded-full transition-colors relative ${activeDropdown === "messages" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"}`}
          >
            <MessageSquare size={20} />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-blue-500 text-white text-[9px] font-black flex items-center justify-center rounded-full ring-2 ring-white">
              2
            </span>
          </button>

          {activeDropdown === "messages" && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-100 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-4 py-2 border-b border-slate-50">
                <span className="font-bold text-slate-800 text-xs">
                  Messages récents
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <MessageItem
                  name="Landry (Livreur)"
                  text="Client introuvable à la rue 12.233 Akwa, j'appelle sans succès."
                  time="9:14 AM"
                  unread
                />
                <MessageItem
                  name="Agence Yaoundé"
                  text="Avons-nous reçu la LTA pour le fret aérien de ce matin ?"
                  time="Hier"
                />
              </div>
            </div>
          )}
        </div>

        {/* 3. Bouton & Dropdown Langues */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("languages")}
            className={`p-2.5 rounded-full transition-colors ${activeDropdown === "languages" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"}`}
          >
            <Globe size={20} />
          </button>

          {activeDropdown === "languages" && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl border border-slate-100 shadow-xl py-1 z-50 text-xs font-semibold">
              <button className="w-full px-4 py-2 text-left flex items-center justify-between text-blue-600 bg-slate-50/60">
                <span>🇫🇷 Français</span>
                <Check size={14} />
              </button>
              <button className="w-full px-4 py-2 text-left text-slate-600 hover:bg-slate-50 transition-colors">
                <span>🇬🇧 English</span>
              </button>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-slate-200 mx-1.5"></div>

        {/* 4. Bloc Profil Utilisateur avec Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("profile")}
            className="flex items-center gap-2.5 p-1.5 hover:bg-slate-50 rounded-xl transition-colors text-left"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
              alt="Avatar Admin"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
            />
            <div className="hidden sm:block">
              <p className="text-xs font-black text-slate-800 leading-none">
                {user?.name}
              </p>
              <span className="text-[9px] text-slate-400 font-bold tracking-wide uppercase mt-0.5 block">
                {user?.roles?.map((role) => role.name).join(", ")}
              </span>
            </div>
            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform hidden sm:block ${activeDropdown === "profile" ? "rotate-180" : ""}`}
            />
          </button>

          {activeDropdown === "profile" && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-slate-100 shadow-xl py-1.5 z-50 text-xs font-medium text-slate-600 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 sm:hidden">
                <p className="font-bold text-slate-800">{user?.name}</p>
                <p className="text-[10px] text-slate-400">
                  {user?.roles?.map((role) => role.name).join(", ")}
                </p>
              </div>

              <button className="w-full px-4 py-2 text-left flex items-center gap-2.5 hover:bg-slate-50 transition-colors">
                <User size={14} className="text-slate-400" /> Mon Profil
              </button>
              <button className="w-full px-4 py-2 text-left flex items-center gap-2.5 hover:bg-slate-50 transition-colors">
                <Settings size={14} className="text-slate-400" /> Paramètres
                compte
              </button>
              <button className="w-full px-4 py-2 text-left flex items-center gap-2.5 hover:bg-slate-50 transition-colors">
                <Shield size={14} className="text-slate-400" /> Sécurité & Logs
              </button>

              <div className="border-t border-slate-100 my-1"></div>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left flex items-center gap-2.5 text-red-500 hover:bg-red-50 font-bold transition-colors"
                disabled={isLoggingOut}
              >
                <LogOut size={14} /> Se déconnecter
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// --- SOUS-COMPOSANT SQUELETTE POUR UNE LIGNE NOTIFICATION ---
function NotificationItem({
  icon,
  bg,
  title,
  desc,
  time,
}: {
  icon: React.ReactNode;
  bg: string;
  title: string;
  desc: string;
  time: string;
}) {
  return (
    <div className="px-4 py-2.5 hover:bg-slate-50 border-b border-slate-50/60 flex gap-3 last:border-0 cursor-pointer transition-colors">
      <div
        className={`w-7 h-7 ${bg} rounded-xl flex items-center justify-center shrink-0 mt-0.5`}
      >
        {icon}
      </div>
      <div className="text-[11px]">
        <h5 className="font-bold text-slate-800 leading-tight">{title}</h5>
        <p className="text-slate-500 font-medium mt-0.5 leading-snug">{desc}</p>
        <span className="text-[9px] text-slate-400 mt-1 block font-medium">
          {time}
        </span>
      </div>
    </div>
  );
}

// --- SOUS-COMPOSANT SQUELETTE POUR UNE LIGNE MESSAGE ---
function MessageItem({
  name,
  text,
  time,
  unread = false,
}: {
  name: string;
  text: string;
  time: string;
  unread?: boolean;
}) {
  return (
    <div
      className={`px-4 py-2.5 border-b border-slate-50/60 flex justify-between gap-2 last:border-0 cursor-pointer transition-colors ${unread ? "bg-blue-50/20 hover:bg-blue-50/40" : "hover:bg-slate-50"}`}
    >
      <div className="text-[11px] min-w-0">
        <div className="flex items-center gap-1.5">
          {unread && (
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
          )}
          <h5 className="font-bold text-slate-800 truncate">{name}</h5>
        </div>
        <p
          className={`text-slate-500 mt-0.5 truncate max-w-[210px] ${unread ? "font-semibold text-slate-700" : "font-medium"}`}
        >
          {text}
        </p>
      </div>
      <span className="text-[9px] text-slate-400 shrink-0 font-medium whitespace-nowrap mt-0.5">
        {time}
      </span>
    </div>
  );
}
