import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Ajuste le chemin selon ton setup Shadcn
import {
  PlusCircle,
  UserPlus,
  Wallet,
  AlertCircle,
  Package,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function CommercialDashboard() {
  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-full">
      {/* En-tête de bienvenue */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-800">
            Espace Commercial & Guichet
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Gérez vos clients, enregistrez les colis et suivez vos encaissements
            du jour.
          </p>
        </div>

        {/* Actions rapides indispensables au comptoir */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link
            to="/" //shipments/create"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#2979FF] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-500/10 hover:bg-blue-600 transition-colors"
          >
            <PlusCircle size={16} />
            Nouveau Colis
          </Link>
          <Link
            to="/" //"/management/clients"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <UserPlus size={16} />
            Nouveau Client
          </Link>
        </div>
      </div>

      {/* 📊 Statistiques de performance du Guichet */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Colis Enregistrés (Aujourd'hui)
            </CardTitle>
            <Package size={18} className="text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-black text-slate-800">24</div>
            <p className="text-[10px] text-emerald-500 font-bold mt-1 flex items-center gap-0.5">
              <ArrowUpRight size={12} /> +12% vs hier
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Caisse / Recettes Espèces
            </CardTitle>
            <Wallet size={18} className="text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-black text-slate-800">
              450 000 FCFA
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">
              Fonds de caisse validé
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Encaissements Mobile Money
            </CardTitle>
            <Wallet size={18} className="text-[#FF9100]" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-black text-slate-800">
              185 000 FCFA
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">
              MTN MoMo & Orange Money
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Litiges Actifs à Traiter
            </CardTitle>
            <AlertCircle size={18} className="text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-black text-slate-800">3</div>
            <p className="text-[10px] text-red-500 font-bold mt-1">
              2 réclamations critiques
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 🕒 Listes opérationnelles (Derniers colis saisis au comptoir) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 rounded-2xl border-slate-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-slate-800">
              Vos derniers enregistrements
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                    <th className="p-3 pl-6">Code</th>
                    <th className="p-3">Client</th>
                    <th className="p-3">Destination</th>
                    <th className="p-3">Montant</th>
                    <th className="p-3 pr-6 text-right">Statut Paiement</th>
                  </tr>
                </thead>
                <tbody className="font-medium text-slate-600">
                  <tr className="border-b border-slate-50 hover:bg-slate-50/30">
                    <td className="p-3 pl-6 font-bold text-slate-800">
                      MTL-8932
                    </td>
                    <td className="p-3">Samuel Eto'o</td>
                    <td className="p-3">Paris (Aérien)</td>
                    <td className="p-3">85 000 F</td>
                    <td className="p-3 pr-6 text-right">
                      <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md font-bold text-[10px]">
                        Payé (Cash)
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-50 hover:bg-slate-50/30">
                    <td className="p-3 pl-6 font-bold text-slate-800">
                      MTL-8931
                    </td>
                    <td className="p-3">Sita Ndonda</td>
                    <td className="p-3">Douala ↔ Ydé</td>
                    <td className="p-3">15 000 F</td>
                    <td className="p-3 pr-6 text-right">
                      <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md font-bold text-[10px]">
                        Payé (MoMo)
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/30">
                    <td className="p-3 pl-6 font-bold text-slate-800">
                      MTL-8929
                    </td>
                    <td className="p-3">Alhadji Mohamadou</td>
                    <td className="p-3">Garoua (Fret)</td>
                    <td className="p-3">145 000 F</td>
                    <td className="p-3 pr-6 text-right">
                      <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded-md font-bold text-[10px]">
                        En Attente
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Section Événements / Alertes Commerciales */}
        <Card className="rounded-2xl border-slate-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-slate-800">
              Suivi des Retours & Tarifs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs font-medium">
            <div className="p-3 rounded-xl bg-blue-50/40 border border-blue-50 flex gap-3">
              <CheckCircle2
                className="text-blue-500 shrink-0 mt-0.5"
                size={16}
              />
              <div>
                <h4 className="font-bold text-slate-800">
                  Mise à jour de la grille
                </h4>
                <p className="text-slate-500 mt-0.5 text-[11px]">
                  Zone Ouest (Bafoussam) : baisse de 5% sur le fret maritime ce
                  mois.
                </p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-50 flex gap-3">
              <AlertCircle
                className="text-amber-500 shrink-0 mt-0.5"
                size={16}
              />
              <div>
                <h4 className="font-bold text-slate-800">
                  Colis en souffrance
                </h4>
                <p className="text-slate-500 mt-0.5 text-[11px]">
                  Le colis #MTL-7120 attend son retrait à l'agence de Mvan
                  depuis 10 jours.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
