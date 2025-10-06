import { SITE_CONFIG } from "@/lib/config";
import { ContactLink } from "@/components/ContactLink";

const CONTACT_LINKS = [
  {
    icon: "🐦",
    label: "Twitter",
    href: SITE_CONFIG.links.twitter,
    external: true,
  },
  {
    icon: "💻",
    label: "GitHub",
    href: SITE_CONFIG.links.github,
    external: true,
  },
  {
    icon: "📧",
    label: "Email",
    href: `mailto:${SITE_CONFIG.email}`,
    external: false,
  },
] as const;

export function Contact() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact</h1>
          <p className="text-xl text-muted-foreground">
            Feel free to reach out to me through any of the following channels.
          </p>
        </div>

        <div>
          {CONTACT_LINKS.map((link) => (
            <ContactLink key={link.label} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
}
