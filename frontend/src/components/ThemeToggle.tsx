import { useTheme } from "./ThemeProvider";
import { THEMES, type Theme } from "./theme";
import { Button } from "@/components/ui/button";

const THEME_CONFIG: Record<Theme, { icon: string; label: string; next: Theme }> = {
  [THEMES.LIGHT]: { icon: "☀️", label: "Light", next: THEMES.DARK },
  [THEMES.DARK]: { icon: "🌙", label: "Dark", next: THEMES.SYSTEM },
  [THEMES.SYSTEM]: { icon: "💻", label: "System", next: THEMES.LIGHT },
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themeConfig = THEME_CONFIG[theme];

  const toggleTheme = () => {
    setTheme(themeConfig.next);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      title={`Current theme: ${themeConfig.label}`}
      className="relative"
    >
      <span className="text-lg">{themeConfig.icon}</span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
