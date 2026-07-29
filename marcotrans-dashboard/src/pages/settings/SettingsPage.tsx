import { Globe, Laptop, Moon, Sun } from "lucide-react";
import useThemeStore, {
  resolveTheme,
  ThemeMode,
} from "@/core/stores/themeStore";
const themeOptions: {
  value: ThemeMode;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "light",
    label: "Clair",
    description: "Forcer le thème clair.",
    icon: <Sun size={20} />,
  },
  {
    value: "dark",
    label: "Sombre",
    description: "Forcer le thème sombre.",
    icon: <Moon size={20} />,
  },
  {
    value: "system",
    label: "Système",
    description: "Utiliser le thème du système.",
    icon: <Laptop size={20} />,
  },
];

export default function Settings() {
  const themeMode = useThemeStore((state) => state.themeMode);
  const setThemeMode = useThemeStore((state) => state.setThemeMode);
  const resolvedTheme = resolveTheme(themeMode);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-[0.24em] mb-2">
              Paramètres généraux
            </p>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Configuration du tableau de bord
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
              Choisissez un thème et préparez la page pour gérer d'autres
              préférences comme la langue ou les notifications.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            Mode actuel : <span className="capitalize">{themeMode}</span>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Thème appliqué : {resolvedTheme}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 mb-4 text-slate-900 dark:text-slate-100">
              <Sun size={20} />
              <div>
                <h2 className="text-lg font-semibold">Apparence</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Changez le mode d'affichage de l'interface.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {themeOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer flex-col rounded-3xl border p-4 transition ${
                    themeMode === option.value
                      ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-slate-800"
                      : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-blue-500">{option.icon}</span>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                          {option.label}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {option.description}
                        </p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="themeMode"
                      value={option.value}
                      checked={themeMode === option.value}
                      onChange={() => setThemeMode(option.value)}
                      className="h-4 w-4 text-blue-600 accent-blue-600"
                    />
                  </div>
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 mb-4 text-slate-900 dark:text-slate-100">
              <Globe size={20} />
              <div>
                <h2 className="text-lg font-semibold">Langue</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Cette page permettra bientôt de changer la langue de
                  l'application.
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
              Bientôt disponible.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
