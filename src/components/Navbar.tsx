
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              LearnFlow
            </h1>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Paths
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Leaderboard
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:bg-muted">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-muted">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
