
import { Bell, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Navbar = () => {
  const { user, profile, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getUserInitials = () => {
    if (profile?.username) {
      return profile.username.substring(0, 2).toUpperCase();
    } else if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              PathWise
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Home
              </Link>
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
              )}
              <Link
                to="/path"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                My Paths
              </Link>
              <Link
                to="/leaderboard"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Leaderboard
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" className="hover:bg-muted">
                  <Bell className="h-5 w-5" />
                </Button>
                <div className="relative">
                  <Avatar 
                    className="h-8 w-8 cursor-pointer"
                    onClick={() => navigate("/dashboard")}
                  >
                    {profile?.avatar ? (
                      <AvatarImage src={profile.avatar} />
                    ) : null}
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
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
