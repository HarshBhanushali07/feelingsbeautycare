import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          >
            <Heart className="h-8 w-8 text-rose-gold" />
          </div>
        ))}
      </div>

      <div className="text-center relative z-10 max-w-md mx-auto px-4">
        <div className="glass-card p-8 rounded-2xl">
          <div className="text-6xl font-playfair font-bold text-primary mb-4">404</div>
          <h1 className="text-2xl font-playfair font-bold text-foreground mb-4">
            Oops! Page not found
          </h1>
          <p className="text-muted-foreground mb-6 font-montserrat">
            The page you're looking for doesn't exist. But don't worry, our beauty services are just a click away!
          </p>
          <Button variant="luxury" size="lg" className="animate-shimmer" asChild>
            <a href="/" className="inline-flex items-center space-x-2">
              <Home className="h-5 w-5" />
              <span>Return to Home</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
