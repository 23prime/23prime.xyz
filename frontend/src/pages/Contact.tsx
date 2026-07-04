import { useTranslation } from "react-i18next";
import { SITE_CONFIG } from "@/lib/config";
import { ContactLink } from "@/components/ContactLink";

const CONTACT_LINKS = [
  {
    icon: "🐦",
    key: "twitter",
    href: SITE_CONFIG.links.twitter,
    external: true,
  },
  {
    icon: "💻",
    key: "github",
    href: SITE_CONFIG.links.github,
    external: true,
  },
  {
    icon: "📧",
    key: "email",
    href: `mailto:${SITE_CONFIG.email}`,
    external: false,
  },
] as const;

export function Contact() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("contact.pageTitle")}</h1>
          <p className="text-xl text-muted-foreground">{t("contact.description")}</p>
        </div>

        <div>
          {CONTACT_LINKS.map((link) => (
            <ContactLink
              key={link.key}
              icon={link.icon}
              label={t(`contact.links.${link.key}`)}
              href={link.href}
              external={link.external}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
