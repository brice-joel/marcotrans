import { Link } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border border-slate-100 shadow-xl shadow-slate-200/40 rounded-3xl p-8 text-center">
        <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
          <AlertCircle size={40} className="stroke-[1.5]" />
        </div>
        
        <h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-slate-700 mb-4">
          Page introuvable
        </h2>
        
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          Oups ! La page que vous essayez d'atteindre n'existe pas ou a été déplacée.
          Vérifiez l'URL ou retournez au tableau de bord.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 rounded-xl font-medium transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Retour
          </button>
          
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2979FF] text-white hover:bg-blue-600 rounded-xl font-medium shadow-md shadow-blue-500/20 transition-colors text-sm"
          >
            <Home size={16} />
            Tableau de bord
          </Link>
        </div>
      </div>
    </div>
  );
}
