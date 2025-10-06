import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { SITE_CONFIG } from "@/lib/config";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            {SITE_CONFIG.name}
          </Link>
          <div className="flex items-center gap-6">
            <ul className="flex gap-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
