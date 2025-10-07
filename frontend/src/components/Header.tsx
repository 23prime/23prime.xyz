import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SITE_CONFIG } from "@/lib/config";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type NavItem = { to: string; label: string; external?: false } | { href: string; label: string; external: true };

const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { href: SITE_CONFIG.links.blog, label: "Blog", external: true },
  { to: "/contact", label: "Contact" },
];

function NavLinks({ onClick }: { onClick?: () => void }) {
  return (
    <>
      {NAV_ITEMS.map((item) => (
        <li key={item.label}>
          {item.external ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              onClick={onClick}
            >
              {item.label}
            </a>
          ) : (
            <Link to={item.to} className="hover:text-primary transition-colors" onClick={onClick}>
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </>
  );
}

export function Header() {
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
            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
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
