import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";

export const resolveTheme = (themeMode: ThemeMode) => {
  if (themeMode === "system") {
    if (typeof window === "undefined") {
      return "light";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return themeMode;
};

interface ThemeState {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeMode: "system",
      setThemeMode: (themeMode) => set({ themeMode }),
    }),
    {
      name: "dashboard-theme",
      version: 1,
    },
  ),
);

export default useThemeStore;
