import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { SITE_CONFIG } from "@/lib/config";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type NavItem = { to: string; labelKey: string; external?: false } | { href: string; labelKey: string; external: true };

const NAV_ITEMS: NavItem[] = [
  { to: "/", labelKey: "header.nav.home" },
  { to: "/about", labelKey: "header.nav.about" },
  { to: "/projects", labelKey: "header.nav.projects" },
  { href: SITE_CONFIG.links.blog, labelKey: "header.nav.blog", external: true },
  { to: "/contact", labelKey: "header.nav.contact" },
];

function NavLinks({ onClick }: { onClick?: () => void }) {
  const { t } = useTranslation();

  return (
    <>
      {NAV_ITEMS.map((item) => (
        <li key={item.labelKey}>
          {item.external ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              onClick={onClick}
            >
              {t(item.labelKey)}
            </a>
          ) : (
            <Link to={item.to} className="hover:text-primary transition-colors" onClick={onClick}>
              {t(item.labelKey)}
            </Link>
          )}
        </li>
      ))}
    </>
  );
}

export function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            {SITE_CONFIG.name}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex gap-6">
              <NavLinks />
            </ul>
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={t("header.openMenu")}>
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  <ul className="flex flex-col gap-4">
                    <NavLinks onClick={() => setOpen(false)} />
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
