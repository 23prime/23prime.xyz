import { useTranslation } from "react-i18next";
import { NavigationCard } from "@/components/NavigationCard";
import { SITE_CONFIG } from "@/lib/config";

const NAVIGATION_CARDS = [
  { to: "/about", key: "about" },
  { to: "/contact", key: "contact" },
] as const;

export function Home() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Profile Section */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <img
              src={SITE_CONFIG.profileImage}
              alt={`${SITE_CONFIG.name} profile`}
              className="w-32 h-32 mx-auto rounded-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            {t("home.greeting", { nickname: SITE_CONFIG.nickname, name: SITE_CONFIG.name })}
          </h1>
          <p className="text-xl text-muted-foreground">{t("home.tagline")}</p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NAVIGATION_CARDS.map((card) => (
            <NavigationCard
              key={card.to}
              to={card.to}
              title={t(`home.cards.${card.key}.title`)}
              description={t(`home.cards.${card.key}.description`)}
              buttonText={t(`home.cards.${card.key}.button`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
