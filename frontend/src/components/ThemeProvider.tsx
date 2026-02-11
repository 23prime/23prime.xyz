import { createContext, useContext, useEffect, useState } from "react";

import { THEMES, type Theme } from "./theme";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: THEMES.SYSTEM,
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

function isValidTheme(value: string | null): value is Theme {
  if (!value) return false;
  const validThemes = Object.values(THEMES);
  return validThemes.includes(value as Theme);
}

export function ThemeProvider({
  children,
  defaultTheme = THEMES.SYSTEM,
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedValue = localStorage.getItem(storageKey);

    if (isValidTheme(storedValue)) {
      return storedValue;
    }

    if (storedValue !== null) {
      localStorage.removeItem(storageKey);
      console.warn(
        `Invalid theme value "${storedValue}" found in localStorage. ` +
          `Cleared and falling back to default theme "${defaultTheme}".`
      );
    }

    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(THEMES.LIGHT, THEMES.DARK);

    if (theme === THEMES.SYSTEM) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? THEMES.DARK : THEMES.LIGHT;

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
