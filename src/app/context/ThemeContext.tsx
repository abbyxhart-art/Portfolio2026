import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

// Mirrors --color-surface-primary's two values (src/tokens/tokens.json) —
// keep in sync if that token ever changes. Duplicated as a literal rather
// than read from CSS since <meta name="theme-color"> needs a plain hex
// string, not a var() the browser chrome can't resolve.
const SURFACE_PRIMARY: Record<Theme, string> = { light: "#F2F2F6", dark: "#161617" };

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Light mode's toggle is temporarily removed from the UI (it looked bad),
  // so always start dark now — ignoring any "light" a visitor's browser may
  // still have stored from before, which would otherwise leave them stuck
  // there with no way back.
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    // Keeps the iOS status bar / notch safe-area strip matched to the app's
    // actual active theme — the static media-query meta tags in index.html
    // only track OS-level prefers-color-scheme, which can disagree with
    // this in-app toggle and leave that strip on the wrong (near-black) color.
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", SURFACE_PRIMARY[theme]);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
