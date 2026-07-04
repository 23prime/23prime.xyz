import { useTranslation } from "react-i18next";

interface UnderConstructionProps {
  pageName: string;
}

export function UnderConstruction({ pageName }: UnderConstructionProps) {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-6xl mb-8">🚧</div>
        <h1 className="text-4xl font-bold mb-4">{pageName}</h1>
        <p className="text-xl text-muted-foreground mb-8">{t("underConstruction.message")}</p>
        <p className="text-muted-foreground">{t("underConstruction.checkBack")}</p>
      </div>
    </div>
  );
}
