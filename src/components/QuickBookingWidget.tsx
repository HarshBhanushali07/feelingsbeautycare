import { useState, useEffect } from "react";
import { Calendar, Clock, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { addTouchFeedback } from "@/components/TouchFeedback";

const QuickBookingWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Add touch feedback for better mobile interaction
  addTouchFeedback();

  if (!isVisible) return null;

  const quickServices = [
    { name: "Hair Styling", id: "haircut-style" },
    { name: "Professional Makeup", id: "bridal-makeup" },
    { name: "Facial Treatment", id: "facial-treatment" },
    { name: "Bridal Package", id: "bridal-package" }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Quick Booking Panel */}
      {isOpen && (
        <Card className="mb-4 w-80 glass-card border-glass-border animate-in slide-in-from-bottom-2 duration-300">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-playfair font-semibold text-foreground">Quick Booking</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0 hover:bg-background/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground mb-3">
                Select a service to book instantly:
              </div>
              
              {quickServices.map((service) => (
                <Button
                  key={service.id}
                  variant="glass"
                  size="sm"
                  className="w-full justify-start text-left"
                  asChild
                >
                  <Link 
                    to="/booking" 
                    state={{ preSelectedService: service.id }}
                    onClick={() => setIsOpen(false)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {service.name}
                  </Link>
                </Button>
              ))}
              
              <div className="border-t border-glass-border pt-3 mt-3">
                <Button variant="luxury" size="sm" className="w-full" asChild>
                  <Link to="/booking" onClick={() => setIsOpen(false)}>
                    <Clock className="w-4 h-4 mr-2" />
                    View All Services
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative bg-gradient-to-r from-primary to-rose-gold text-background p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-glow"
        aria-label="Quick booking"
      >
        <Calendar className="h-6 w-6" />
        
        {/* Floating sparkles animation */}
        <div className="absolute -top-1 -right-1">
          <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Quick Booking
        </div>
      </button>
    </div>
  );
};

export default QuickBookingWidget;