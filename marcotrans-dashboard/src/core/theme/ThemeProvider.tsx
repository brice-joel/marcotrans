import { useEffect } from "react";
import useThemeStore, { resolveTheme } from "@/core/stores/themeStore";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeMode = useThemeStore((state) => state.themeMode);

  useEffect(() => {
    const applyTheme = () => {
      const resolved = resolveTheme(themeMode);
      document.documentElement.classList.toggle("dark", resolved === "dark");
      document.documentElement.style.colorScheme = resolved;
    };

    applyTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (themeMode === "system") {
        applyTheme();
      }
    };

    mediaQuery.addEventListener?.("change", handleChange);
    if (!mediaQuery.addEventListener) {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      mediaQuery.removeEventListener?.("change", handleChange);
      if (!mediaQuery.removeEventListener) {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [themeMode]);

  return <>{children}</>;
}
