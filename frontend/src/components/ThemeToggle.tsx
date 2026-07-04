import { useTranslation } from "react-i18next";
import { useTheme } from "./ThemeProvider";
import { THEMES, type Theme } from "./theme";
import { Button } from "@/components/ui/button";

const THEME_CONFIG: Record<Theme, { icon: string; next: Theme }> = {
  [THEMES.LIGHT]: { icon: "☀️", next: THEMES.DARK },
  [THEMES.DARK]: { icon: "🌙", next: THEMES.SYSTEM },
  [THEMES.SYSTEM]: { icon: "💻", next: THEMES.LIGHT },
};

export function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  const themeConfig = THEME_CONFIG[theme];
  const label = t(`theme.${theme}`);

  const toggleTheme = () => {
    setTheme(themeConfig.next);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      title={t("theme.current", { label })}
      className="relative"
    >
      <span className="text-lg">{themeConfig.icon}</span>
      <span className="sr-only">{t("theme.toggle")}</span>
    </Button>
  );
}
