import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Layers,
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function TransitDashboard() {
  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-full">
      {/* En-tête de bienvenue */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-800">
            Opérations Douane & Transit
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Supervisez les déclarations douanières, gérez le fret international
            et clôturez vos vagues de groupage.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#00E676] text-[#0B132B] text-xs font-black px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/10 hover:bg-emerald-400 transition-colors"
            to="/" //"/transit/new"
          >
            <FileText size={16} />
            Nouveau Dossier Transit
          </Link>
        </div>
      </div>

      {/* 📊 Statistiques Métier Fret & Douane */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Dossiers Douaniers Actifs
            </CardTitle>
            <FileText size={18} className="text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-black text-slate-800">14</div>
            <p className="text-[10px] text-slate-400 font-medium mt-1">
              En cours de traitement au port / aéroport
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Groupages ouverts (En cours)
            </CardTitle>
            <Layers size={18} className="text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-black text-slate-800">6 Lots</div>
            <p className="text-[10px] text-indigo-500 font-bold mt-1">
              4 maritimes, 2 aériens
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Déclarations Liquides (Ce mois)
            </CardTitle>
            <CheckCircle2 size={18} className="text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-black text-slate-800">42</div>
            <p className="text-[10px] text-emerald-500 font-bold mt-1 flex items-center gap-0.5">
              <TrendingUp size={12} /> Taux de fluidité au GUCE élevé
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Cargaisons Bloquées / Litiges
            </CardTitle>
            <ShieldAlert size={18} className="text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-black text-slate-800">2</div>
            <p className="text-[10px] text-red-500 font-bold mt-1">
              Inspections physiques exigées
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 🚢 Tableaux des Vagues de Fret & Documents en attente */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Statut des lots de groupage inter-agences / internationaux */}
        <Card className="lg:col-span-2 rounded-2xl border-slate-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-slate-800">
              Suivi des vagues de groupage majeures
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold bg-slate-50/50">
                    <th className="p-3 pl-6">ID Lot</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Conteneur/LTA</th>
                    <th className="p-3">Remplissage</th>
                    <th className="p-3 pr-6 text-right">État</th>
                  </tr>
                </thead>
                <tbody className="font-medium text-slate-600">
                  <tr className="border-b border-slate-50 hover:bg-slate-50/30">
                    <td className="p-3 pl-6 font-bold text-slate-800">
                      GRP-DLA-201
                    </td>
                    <td className="p-3 flex items-center gap-1.5">
                      🚢 Maritime
                    </td>
                    <td className="p-3">MSCU-772910</td>
                    <td className="p-3">
                      <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full w-[85%]"></div>
                      </div>
                    </td>
                    <td className="p-3 pr-6 text-right">
                      <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md font-bold text-[10px]">
                        Chargement
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-50 hover:bg-slate-50/30">
                    <td className="p-3 pl-6 font-bold text-slate-800">
                      GRP-ORY-402
                    </td>
                    <td className="p-3 flex items-center gap-1.5">✈️ Aérien</td>
                    <td className="p-3">AWB-072-991</td>
                    <td className="p-3">
                      <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[100%]"></div>
                      </div>
                    </td>
                    <td className="p-3 pr-6 text-right">
                      <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md font-bold text-[10px]">
                        Prêt / Scellé
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/30">
                    <td className="p-3 pl-6 font-bold text-slate-800">
                      GRP-YDE-105
                    </td>
                    <td className="p-3 flex items-center gap-1.5">
                      🚚 Terrestre
                    </td>
                    <td className="p-3">Camion LT-981-OA</td>
                    <td className="p-3">
                      <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full w-[45%]"></div>
                      </div>
                    </td>
                    <td className="p-3 pr-6 text-right">
                      <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded-md font-bold text-[10px]">
                        Ouvert
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Alertes d'inspections douanières ou blocages de vannes de fret */}
        <Card className="rounded-2xl border-slate-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-slate-800">
              Urgences Douanières
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs font-medium">
            <div className="p-3 rounded-xl bg-red-50/50 border border-red-50 flex gap-3">
              <AlertTriangle
                className="text-red-500 shrink-0 mt-0.5"
                size={16}
              />
              <div>
                <h4 className="font-bold text-slate-800">Dossier Bloqué SGS</h4>
                <p className="text-slate-500 mt-0.5 text-[11px]">
                  Écart de valeur déclaré sur le dossier client #Transit-990.
                  Rectification exigée sous 48h.
                </p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex gap-3">
              <Clock className="text-slate-400 shrink-0 mt-0.5" size={16} />
              <div>
                <h4 className="font-bold text-slate-800">
                  Inspection programmée
                </h4>
                <p className="text-slate-500 mt-0.5 text-[11px]">
                  Visite physique douanière prévue demain à 09h00 au Terminal
                  Conteneurs (DIT) pour le Lot #201.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
