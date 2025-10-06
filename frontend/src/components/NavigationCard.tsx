import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface NavigationCardProps {
  to: string;
  title: string;
  description: string;
  buttonText: string;
}

export function NavigationCard({ to, title, description, buttonText }: NavigationCardProps) {
  return (
    <Link to={to} className="block">
      <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button variant="outline" className="w-full">
          {buttonText}
        </Button>
      </div>
    </Link>
  );
}
