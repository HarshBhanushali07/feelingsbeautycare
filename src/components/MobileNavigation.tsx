import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin, Home, Info, Scissors, Camera, GraduationCap, MessageCircle, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const MobileNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const isMobile = useIsMobile();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Services", href: "/services", icon: Scissors },
    { name: "Gallery", href: "/gallery", icon: Camera },
    { name: "Courses", href: "/courses", icon: GraduationCap },
    { name: "Contact", href: "/contact", icon: MessageCircle },
  ];

  const filteredNavItems = navItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname === href;
  };

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen])

  // Early return to prevent any rendering issues
  if (!isMobile) return null

  return (
    <>
      {/* Mobile Header */}
      <nav className="fixed top-0 left-0 right-0 z-[60] glass-card backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-lg font-playfair font-bold text-primary">
              Feelings Beauty
            </h1>
          </Link>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="glass" size="sm" asChild>
              <Link to="/booking">
                <Calendar className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="glass"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-primary" />
              ) : (
                <Menu className="h-5 w-5 text-primary" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[50] lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Slide-in Menu */}
          <div className="absolute top-16 left-0 right-0 bottom-0 glass-card border-t border-glass-border overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass-input h-12"
                />
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                {filteredNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-300 ${
                      isActive(item.href) 
                        ? 'bg-gradient-to-r from-primary/20 to-rose-gold/20 text-primary border border-primary/20' 
                        : 'hover:bg-secondary/20 text-foreground'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-montserrat font-medium text-lg">{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="space-y-4 pt-6 border-t border-glass-border">
                <Button variant="luxury" className="w-full h-14 text-lg" asChild>
                  <Link to="/booking">
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Appointment
                  </Link>
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="glass" className="h-12" asChild>
                    <a href="tel:+919876543210">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                  <Button variant="glass" className="h-12" asChild>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                      <MapPin className="h-4 w-4 mr-2" />
                      Directions
                    </a>
                  </Button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="glass-card p-4 rounded-xl space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>123 Beauty Plaza, Jamnagar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation for easier thumb access */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] glass-card border-t border-glass-border lg:hidden safe-area-inset-bottom">
        <div className="flex items-center justify-around py-2">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 min-h-[48px] min-w-[48px] ${
                isActive(item.href) 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1 font-montserrat font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;