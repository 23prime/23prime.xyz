import { useTheme, THEMES } from "./ThemeProvider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === THEMES.LIGHT) {
      setTheme(THEMES.DARK);
    } else if (theme === THEMES.DARK) {
      setTheme(THEMES.SYSTEM);
    } else {
      setTheme(THEMES.LIGHT);
    }
  };

  const getThemeIcon = () => {
    if (theme === THEMES.LIGHT) return "☀️";
    if (theme === THEMES.DARK) return "🌙";
    return "💻";
  };

  const getThemeLabel = () => {
    if (theme === THEMES.LIGHT) return "Light";
    if (theme === THEMES.DARK) return "Dark";
    return "System";
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      title={`Current theme: ${getThemeLabel()}`}
      className="relative"
    >
      <span className="text-lg">{getThemeIcon()}</span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
