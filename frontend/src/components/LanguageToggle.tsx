import { useTranslation } from "react-i18next";
import { LANGUAGES, type Language } from "@/i18n/config";
import { Button } from "@/components/ui/button";

const NEXT_LANGUAGE: Record<Language, Language> = {
  [LANGUAGES.EN]: LANGUAGES.JA,
  [LANGUAGES.JA]: LANGUAGES.EN,
};

export function LanguageToggle() {
  const { t, i18n } = useTranslation();

  const currentLanguage: Language = i18n.resolvedLanguage === LANGUAGES.JA ? LANGUAGES.JA : LANGUAGES.EN;
  const label = t(`language.${currentLanguage}`);

  const toggleLanguage = () => {
    i18n.changeLanguage(NEXT_LANGUAGE[currentLanguage]);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      title={t("language.current", { label })}
      data-testid="language-toggle"
    >
      <span className="text-sm font-semibold uppercase">{currentLanguage}</span>
      <span className="sr-only">{t("language.toggle")}</span>
    </Button>
  );
}
