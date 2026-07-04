import { useTranslation } from "react-i18next";
import { SITE_CONFIG } from "@/lib/config";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {t("footer.copyright", { year: new Date().getFullYear(), name: SITE_CONFIG.name })}
          </p>
          <div className="flex gap-4">
            <a
              href={SITE_CONFIG.links.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t("footer.repository")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
