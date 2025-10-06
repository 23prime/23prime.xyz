import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Profile Section */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <img
              src="/23prime.png"
              alt="23prime profile"
              className="w-32 h-32 mx-auto rounded-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">23prime</h1>
          <p className="text-xl text-muted-foreground">
            Software Engineer
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/about" className="block">
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-2">About</h2>
              <p className="text-muted-foreground mb-4">
                Learn more about my background and skills
              </p>
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
            </div>
          </Link>

          <Link to="/projects" className="block">
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-2">Projects</h2>
              <p className="text-muted-foreground mb-4">
                Check out my portfolio and works
              </p>
              <Button variant="outline" className="w-full">
                View Projects
              </Button>
            </div>
          </Link>

          <Link to="/contact" className="block">
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-2">Contact</h2>
              <p className="text-muted-foreground mb-4">
                Get in touch with me
              </p>
              <Button variant="outline" className="w-full">
                Contact Me
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
