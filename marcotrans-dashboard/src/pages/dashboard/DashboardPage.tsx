import { useAuthStore } from "@/core/stores/authStore";
import CommercialDashboard from "./CommercialDashboard";
import TransitDashboard from "./TransitDashboard";
import AdminDashboard from "./AdminDashboard";

export default function DashboardPage() {
  const role = useAuthStore((state) => state.user?.roles?.[0].name); // Supposons que le rôle principal est à l'index 0

  switch (role) {
    case "admin":
      return <AdminDashboard />;
    case "commercial":
      return <CommercialDashboard />;
    case "transit_agent":
      return <TransitDashboard />;
    default:
      return <div>Rôle non reconnu ou accès non autorisé.</div>;
  }
}
