
import { Bell, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              LearnFlow
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              {isAuthenticated && (
                <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                  Dashboard
                </Link>
              )}
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Paths
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Leaderboard
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" className="hover:bg-muted">
                  <Bell className="h-5 w-5" />
                </Button>
                <div className="relative">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="h-8 w-8 rounded-full cursor-pointer"
                      onClick={() => navigate("/dashboard")}
                    />
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:bg-muted"
                      onClick={() => navigate("/dashboard")}
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-muted"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => navigate("/login")}
                className="bg-primary hover:bg-primary/90"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
