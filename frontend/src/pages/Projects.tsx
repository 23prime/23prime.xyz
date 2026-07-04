import { useTranslation } from "react-i18next";
import { UnderConstruction } from "@/components/UnderConstruction";

export function Projects() {
  const { t } = useTranslation();

  return <UnderConstruction pageName={t("projects.pageName")} />;
}
