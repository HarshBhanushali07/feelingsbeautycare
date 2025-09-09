import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, Users, Clock, Sparkles } from "lucide-react";
import { Service } from "@/data/services";
import makeupStation from "@/assets/makeup-station.jpg";

interface ServiceRecommendationsProps {
  currentService: Service;
  onServiceSelect: (service: Service) => void;
}

const ServiceRecommendations = ({ currentService, onServiceSelect }: ServiceRecommendationsProps) => {
  // Mock recommended services based on current selection
  const recommendations: Service[] = [
    {
      id: "luxury-facial-addon",
      name: "Luxury Facial Add-on",
      description: "Perfect complement to your service",
      price: 1200,
      duration: 30,
      category: "Beauty",
      icon: Sparkles,
      image: makeupStation,
      rating: 4.9,
      bookings: 89
    },
    {
      id: "eyebrow-threading-addon",
      name: "Eyebrow Threading",
      description: "Complete your look",
      price: 300,
      duration: 15,
      category: "Beauty",
      icon: Sparkles,
      image: makeupStation,
      rating: 4.8,
      bookings: 156,
      discount: 20
    },
    {
      id: "hand-massage-addon",
      name: "Hand Massage",
      description: "Relax while you wait",
      price: 500,
      duration: 20,
      category: "Beauty",
      icon: Sparkles,
      image: makeupStation,
      rating: 4.7,
      bookings: 67
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="font-playfair text-lg font-semibold text-foreground">
          Recommended Add-ons
        </h3>
        <Badge className="bg-rose-gold/20 text-rose-gold border-0 text-xs">
          Popular
        </Badge>
      </div>
      
      <p className="text-sm text-muted-foreground font-montserrat">
        Enhance your {currentService.name} experience with these popular additions
      </p>

      <div className="grid grid-cols-1 gap-3">
        {recommendations.map((service) => (
          <div
            key={service.id}
            className="glass-card p-4 rounded-xl border border-glass-border hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-montserrat font-semibold text-foreground text-sm">
                    {service.name}
                  </h4>
                  {service.discount && (
                    <Badge className="bg-green-500/20 text-green-600 border-0 text-xs">
                      {service.discount}% OFF
                    </Badge>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">
                  {service.description}
                </p>
                
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span>{service.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{service.bookings} booked</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{service.duration}m</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right ml-4">
                <div className="space-y-1">
                  {service.discount ? (
                    <>
                      <p className="text-xs text-muted-foreground line-through">
                        ₹{service.price}
                      </p>
                      <p className="text-sm font-bold text-green-600">
                        ₹{Math.round(service.price * (1 - service.discount / 100))}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm font-bold text-primary">
                      ₹{service.price}
                    </p>
                  )}
                </div>
                
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => onServiceSelect(service)}
                  className="mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-3 rounded-xl border border-glass-border bg-gradient-to-r from-primary/5 to-rose-gold/5">
        <div className="flex items-center space-x-2 text-sm">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="font-montserrat font-medium text-foreground">
            Bundle Discount:
          </span>
          <span className="text-primary font-semibold">
            Save 15% when booking 2+ services
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceRecommendations;