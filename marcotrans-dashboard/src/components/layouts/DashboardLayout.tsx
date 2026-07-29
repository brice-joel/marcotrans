import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "@tanstack/react-router";
import { useState } from "react";

//layout a utiliser avec TanStack Router pour les pages du dashboard
export default function DashboardLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] text-[#1E293B] font-sans antialiased">
      {/* 1. SIDEBAR DE GAUCHE */}
      <Sidebar isOpen={isMobileSidebarOpen} setIsOpen={setIsMobileSidebarOpen} />

      {/* RESTE DE LA PAGE (HEADER + CONTENU) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* 2. TOP NAVBAR */}
        <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />

        {/* 3. GRILLE DU CONTENU DU DASHBOARD */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* CONTENU PRINCIPAL (Rendu des routes enfants) */}
          <Outlet />
        </main>
      </div>

      {/* Overlay pour mobile */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
}
