import {
  FileText,
  Wallet,
  PlusCircle,
  UserPlus,
  Calculator,
  FolderPlus,
  UserCheck2,
  Scan,
  TrendingUp,
  AlertCircle,
  Printer,
  Package,
  Truck,
} from "lucide-react";
import ActionButton from "@/components/ActionButton";
import AlertItem from "@/components/AlertItem";
import MapIndicator from "@/components/MapIndicator";
import StatCard from "@/components/StatCard";
// --- TYPES & INTERFACES ---

interface DestinationRowProps {
  country: string;
  count: number;
  percentage: number;
}

interface ShipmentRowProps {
  id: string;
  route: string;
  sender: string;
  status: "En transit" | "En douane" | "En livraison" | "Livré";
}

export default function AdminDashboard() {
  return (
    <>
      {/* Cartes Statistiques Top (6 colonnes sur grand écran) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard
          title="Colis aujourd'hui"
          value="152"
          change="+ 18% vs hier"
          isPositive={true}
          icon={<Package size={18} />}
          iconBg="bg-green-50"
          iconColor="text-green-500"
          chartColor="#10B981"
        />
        <StatCard
          title="En transit"
          value="342"
          change="+ 12% vs hier"
          isPositive={true}
          icon={<Truck size={18} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-500"
          chartColor="#3B82F6"
        />
        <StatCard
          title="Livrés aujourd'hui"
          value="98"
          change="+ 20% vs hier"
          isPositive={true}
          icon={<UserCheck2 size={18} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-500"
          chartColor="#F97316"
        />
        <StatCard
          title="Chiffre d'affaires"
          value="8 450 000 FCFA"
          change="+ 15% vs hier"
          isPositive={true}
          icon={<Wallet size={18} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-500"
          chartColor="#A855F7"
        />
        <StatCard
          title="En attente douane"
          value="27"
          change="- 5% vs hier"
          isPositive={false}
          icon={<FileText size={18} />}
          iconBg="bg-cyan-50"
          iconColor="text-cyan-500"
          chartColor="#06B6D4"
        />
        <StatCard
          title="Incidents"
          value="8"
          change="- 11% vs hier"
          isPositive={false}
          icon={<AlertCircle size={18} />}
          iconBg="bg-red-50"
          iconColor="text-red-500"
          chartColor="#EF4444"
        />
      </div>

      {/* Section Centrale : Suivi Temps Réel (Carte) + Alertes & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Suivi des Expéditions (Carte) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-sm">
              Suivi des expéditions en temps réel
            </h3>
            <div className="flex items-center gap-2">
              <select className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none text-slate-600 font-medium">
                <option>Tous les pays</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            {/* Métriques à gauche */}
            <div className="space-y-3 text-[12px]">
              <MapIndicator
                color="bg-green-500"
                label="En préparation"
                count={56}
              />
              <MapIndicator
                color="bg-orange-500"
                label="En douane"
                count={27}
              />
              <MapIndicator
                color="bg-blue-500"
                label="En transit"
                count={342}
              />
              <MapIndicator
                color="bg-indigo-500"
                label="Arrivé pays dest."
                count={120}
              />
              <MapIndicator
                color="bg-cyan-500"
                label="En livraison"
                count={64}
              />
              <MapIndicator
                color="bg-emerald-600"
                label="Livrés"
                count={1245}
              />
            </div>

            {/* Simulation Simplifiée Map SVG interactive / Design */}
            <div className="sm:col-span-2 relative flex items-center justify-center min-h-45 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
              <span className="text-xs text-slate-400 font-medium">
                [ Représentation Visuelle Map & Tracés ]
              </span>
              {/* Des cercles d'indicateurs absolus simulant les points de la carte */}
              <span className="absolute top-1/4 left-1/3 w-3 h-3 bg-orange-500 rounded-full animate-ping"></span>
              <span className="absolute top-1/4 left-1/3 w-2.5 h-2.5 bg-orange-500 rounded-full"></span>
              <span className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 bg-green-500 rounded-full"></span>
              <span className="absolute top-1/2 right-1/3 w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
            </div>
          </div>
        </div>

        {/* Alertes & Notifications */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-sm">
                Alertes & notifications
              </h3>
              <button className="text-xs font-semibold text-blue-500 hover:underline">
                Tout voir
              </button>
            </div>

            <div className="space-y-3">
              <AlertItem
                type="danger"
                title="Dossier douane en attente"
                subtitle="C2390 · Douala → Paris"
                time="Il y a 10 min"
              />
              <AlertItem
                type="warning"
                title="Paiement non confirmé"
                subtitle="MTL2505120041 · 250 000 FCFA"
                time="Il y a 30 min"
              />
              <AlertItem
                type="danger"
                title="Colis bloqué en douane"
                subtitle="C2388 · Douala → Bruxelles"
                time="Il y a 1 h"
              />
              <AlertItem
                type="info"
                title="Livraison en retard"
                subtitle="MTL2505090088 · Yaoundé"
                time="Il y a 2 h"
              />
              <AlertItem
                type="info"
                title="Nouveau client entreprise"
                subtitle="Global Market SARL"
                time="Il y a 3 h"
              />
            </div>
          </div>

          <button className="w-full text-center text-xs font-semibold text-slate-500 border border-slate-200 rounded-lg py-2 mt-4 hover:bg-slate-50 transition-colors">
            Voir toutes les notifications
          </button>
        </div>
      </div>

      {/* Section Basse : Répartition, Top Destinations, Revenus, Dernières Expéditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Répartition des colis par statut */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <h3 className="font-bold text-slate-800 text-sm mb-4">
            Répartition des colis par statut
          </h3>
          <div className="flex flex-col items-center justify-center flex-1">
            {/* Donut Chart de simulation natif */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15.91"
                  fill="none"
                  stroke="#F1F5F9"
                  strokeWidth="3.5"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.91"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3.5"
                  strokeDasharray="53 100"
                  strokeDashoffset="0"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.91"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3.5"
                  strokeDasharray="18.5 100"
                  strokeDashoffset="-53"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.91"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="3.5"
                  strokeDasharray="1.5 100"
                  strokeDashoffset="-71.5"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.91"
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="3.5"
                  strokeDasharray="16.8 100"
                  strokeDashoffset="-73"
                />
              </svg>
              <div className="absolute text-center">
                <p className="text-xl font-black text-slate-800">1 854</p>
                <p className="text-[10px] text-slate-400 uppercase font-medium tracking-wider">
                  Total colis
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 w-full mt-4 text-[11px] text-slate-600">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  En prép.
                </span>{" "}
                <b>16.8%</b>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  Douane
                </span>{" "}
                <b>1.5%</b>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Transit
                </span>{" "}
                <b>18.5%</b>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  Arr. pays
                </span>{" "}
                <b>6.5%</b>
              </div>
            </div>
          </div>
        </div>

        {/* Top 5 destinations */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-sm">
              Top 5 destinations
            </h3>
            <select className="text-[11px] bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none font-medium text-slate-600">
              <option>Ce mois</option>
            </select>
          </div>

          <div className="space-y-3 flex-1 flex flex-col justify-center">
            <DestinationRow country="France" count={512} percentage={27.6} />
            <DestinationRow
              country="Côte d'Ivoire"
              count={298}
              percentage={16.1}
            />
            <DestinationRow country="Belgique" count={215} percentage={11.6} />
            <DestinationRow country="USA" count={184} percentage={9.9} />
            <DestinationRow country="Gabon" count={132} percentage={7.1} />
          </div>

          <button className="w-full text-center text-xs font-semibold text-blue-500 mt-4 hover:underline">
            Voir toutes les destinations
          </button>
        </div>

        {/* Revenus (FCFA) Graphique */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-800 text-sm">Revenus (FCFA)</h3>
            <select className="text-[11px] bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none font-medium text-slate-600">
              <option>Ce mois</option>
            </select>
          </div>

          <div>
            <p className="text-xl font-black text-slate-800">
              85 450 000{" "}
              <span className="text-xs font-normal text-slate-400">FCFA</span>
            </p>
            <p className="text-[11px] text-green-500 flex items-center gap-1 font-medium mt-0.5">
              <TrendingUp size={12} /> +15% vs mois dernier
            </p>
          </div>

          {/* Simulation Graphique Linéaire SVG */}
          <div className="h-28 w-full mt-4">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="revenue-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0,35 Q15,25 30,28 T60,15 T90,8 T100,5 L100,40 L0,40 Z"
                fill="url(#revenue-grad)"
              />
              <path
                d="M0,35 Q15,25 30,28 T60,15 T90,8 T100,5"
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
              />
            </svg>
            <div className="flex justify-between text-[9px] text-slate-400 mt-1 px-1 font-mono">
              <span>01 Mai</span>
              <span>15 Mai</span>
              <span>31 Mai</span>
            </div>
          </div>
        </div>

        {/* Dernières Expéditions */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-800 text-sm">
              Dernières expéditions
            </h3>
            <button className="text-xs font-semibold text-blue-500 hover:underline">
              Voir tout
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100">
                  <th className="pb-2 font-semibold">N° Tracking</th>
                  <th className="pb-2 font-semibold">Route</th>
                  <th className="pb-2 font-semibold">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <ShipmentRow
                  id="MTL2505120056"
                  sender="Jean Paul · Douala → Paris"
                  route=""
                  status="En transit"
                />
                <ShipmentRow
                  id="MTL2505120055"
                  sender="Aicha · Yaoundé → Bruxelles"
                  route=""
                  status="En douane"
                />
                <ShipmentRow
                  id="MTL2505120054"
                  sender="ETS Global · Douala → Abidjan"
                  route=""
                  status="En livraison"
                />
                <ShipmentRow
                  id="MTL2505120053"
                  sender="Patrick · Bafoussam → USA"
                  route=""
                  status="En transit"
                />
                <ShipmentRow
                  id="MTL2505120052"
                  sender="Marie · Douala → Libreville"
                  route=""
                  status="Livré"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. SECTIONS ACTIONS RAPIDES */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 text-sm mb-4">
          Actions rapides
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          <ActionButton
            icon={<PlusCircle className="text-blue-500" />}
            label="Nouveau colis"
          />
          <ActionButton
            icon={<UserPlus className="text-purple-500" />}
            label="Client rapide"
          />
          <ActionButton
            icon={<Calculator className="text-orange-500" />}
            label="Calculer tarif"
          />
          <ActionButton
            icon={<FolderPlus className="text-cyan-500" />}
            label="Dossier douane"
          />
          <ActionButton
            icon={<UserCheck2 className="text-green-500" />}
            label="Affecter livreur"
          />
          <ActionButton
            icon={<Scan className="text-indigo-500" />}
            label="Scan document"
          />
          <ActionButton
            icon={<Printer className="text-slate-500" />}
            label="Imprimer"
          />
        </div>
      </div>
    </>
  );
}

function DestinationRow({ country, count, percentage }: DestinationRowProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[11px] font-medium text-slate-600">
        <span>{country}</span>
        <span>
          {count} colis{" "}
          <span className="text-slate-400 font-normal">({percentage}%)</span>
        </span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

function ShipmentRow({ id, sender, status }: ShipmentRowProps) {
  const statusBadges = {
    "En transit": "bg-blue-50 text-blue-600 border-blue-100",
    "En douane": "bg-orange-50 text-orange-600 border-orange-100",
    "En livraison": "bg-cyan-50 text-cyan-600 border-cyan-100",
    Livré: "bg-green-50 text-green-600 border-green-100",
  };

  return (
    <tr className="hover:bg-slate-50/80 transition-colors">
      <td className="py-2.5 font-mono font-bold text-slate-700">{id}</td>
      <td className="py-2.5 text-slate-500 font-medium">{sender}</td>
      <td className="py-2.5 text-right">
        <span
          className={`px-2 py-0.5 rounded-md border text-[9px] font-bold ${statusBadges[status]}`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}
