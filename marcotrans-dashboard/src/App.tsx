import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes";
import ThemeProvider from "@/core/theme/ThemeProvider";
import { Toaster } from "./components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 1. Initialisation du QueryClient avec des configurations adaptées à un Dashboard ERP
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Évite les rechargements intempestifs des données logistiques dès que l'utilisateur change d'onglet Windows
      refetchOnWindowFocus: false,
      // Réessaie 1 fois maximum en cas d'échec réseau avant d'afficher une erreur
      retry: 1,
    },
  },
});

export default function App() {
  return (
    // 2. Le QueryClientProvider doit envelopper le RouterProvider pour que vos hooks (comme useAuthMutation) fonctionnent partout
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" richColors />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
