"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeProviderProps {
  children: ReactNode;
  attribute?: string | string[];
  defaultTheme?: Theme;
  enableSystem?: boolean;
  enableColorScheme?: boolean;
  storageKey?: string;
  themes?: string[];
  forcedTheme?: Theme;
  value?: Record<string, string>;
  nonce?: string;
}

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  forcedTheme?: Theme;
  resolvedTheme: "light" | "dark" | undefined;
  themes: string[];
  systemTheme?: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const MEDIA = "(prefers-color-scheme: dark)";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia(MEDIA).matches ? "dark" : "light";
}

function getStored(key: string): Theme | undefined {
  if (typeof window === "undefined") return;
  try {
    const v = localStorage.getItem(key);
    if (v === "light" || v === "dark" || v === "system") return v;
  } catch {}
}

function applyThemeToDOM(
  newTheme: Theme,
  attribute: string | string[],
  themes: string[],
  value?: Record<string, string>,
  enableColorScheme?: boolean,
) {
  const resolved = newTheme === "system" ? getSystemTheme() : newTheme;
  const root = document.documentElement;
  const attrs = Array.isArray(attribute) ? attribute : [attribute];

  for (const attr of attrs) {
    if (attr === "class") {
      root.classList.remove(...themes);
      root.classList.add(value?.[resolved] ?? resolved);
    } else {
      const val = value?.[resolved] ?? resolved;
      root.setAttribute(attr, val);
    }
  }

  if (enableColorScheme) {
    root.style.colorScheme = resolved;
  }
}

export function ThemeProvider({
  children,
  attribute = "data-theme",
  defaultTheme = "system",
  enableSystem = true,
  enableColorScheme = true,
  storageKey = "theme",
  themes: themeList = ["light", "dark"],
  forcedTheme,
  value: themeValue,
}: ThemeProviderProps) {
  const effectiveDefault: Theme = enableSystem ? "system" : (defaultTheme === "system" ? "light" : defaultTheme);

  const [theme, setThemeState] = useState<Theme>(() =>
    forcedTheme ?? getStored(storageKey) ?? effectiveDefault,
  );

  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

  const applyTheme = useCallback(
    (t: Theme) => {
      if (forcedTheme) return;
      applyThemeToDOM(t, attribute, themeList, themeValue, enableColorScheme);
    },
    [attribute, forcedTheme, themeList, themeValue, enableColorScheme],
  );

  const setTheme = useCallback(
    (t: Theme) => {
      setThemeState(t);
      try { localStorage.setItem(storageKey, t); } catch {}
      applyTheme(t);
    },
    [storageKey, applyTheme],
  );

  useEffect(() => {
    const mq = window.matchMedia(MEDIA);
    const handler = () => {
      const sys = getSystemTheme();
      setSystemTheme(sys);
      if (theme === "system") applyTheme("system");
    };
    mq.addEventListener("change", handler);
    handler();
    return () => mq.removeEventListener("change", handler);
  }, [theme, applyTheme]);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        const t = e.newValue as Theme;
        if (themeList.includes(t) || t === "system") {
          setThemeState(t);
          applyTheme(t);
        }
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [storageKey, applyTheme, themeList]);

  const resolvedTheme: "light" | "dark" | undefined =
    forcedTheme === "system" ? systemTheme : (forcedTheme ?? (theme === "system" ? systemTheme : theme));

  const ctxValue = useMemo<ThemeContextValue>(
    () => ({
      theme: forcedTheme ?? theme,
      setTheme,
      forcedTheme,
      resolvedTheme,
      themes: enableSystem ? [...themeList, "system"] : themeList,
      systemTheme: enableSystem ? systemTheme : undefined,
    }),
    [theme, setTheme, forcedTheme, resolvedTheme, themeList, enableSystem, systemTheme],
  );

  return (
    <ThemeContext.Provider value={ctxValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
