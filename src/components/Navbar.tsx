import { Link, useLocation } from "react-router-dom";
import { Bus, Trophy, Info, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { path: "/about", label: "About", icon: Info },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary border-b-4 border-secondary shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <Bus className="w-6 h-6 text-primary" />
            </div>
            <span className="font-black text-lg text-primary-foreground hidden sm:block">
              ETHMumbai Maxi
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-sm transition-all",
                    isActive
                      ? "bg-secondary text-primary shadow-md"
                      : "text-primary-foreground/90 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
