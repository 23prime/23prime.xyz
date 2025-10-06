import { NavigationCard } from "@/components/NavigationCard";
import { SITE_CONFIG } from "@/lib/config";

const NAVIGATION_CARDS = [
  {
    to: "/about",
    title: "About",
    description: "Learn more about my background and skills",
    buttonText: "View Profile",
  },
  {
    to: "/projects",
    title: "Projects",
    description: "Check out my portfolio and works",
    buttonText: "View Projects",
  },
  {
    to: "/contact",
    title: "Contact",
    description: "Get in touch with me",
    buttonText: "Contact Me",
  },
] as const;

export function Home() {
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
          <h1 className="text-4xl font-bold mb-4">{SITE_CONFIG.name}</h1>
          <p className="text-xl text-muted-foreground">
            {SITE_CONFIG.title}
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NAVIGATION_CARDS.map((card) => (
            <NavigationCard key={card.to} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}
