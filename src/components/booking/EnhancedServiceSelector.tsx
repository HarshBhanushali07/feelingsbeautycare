import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, Sparkles, TrendingUp, Heart } from "lucide-react";
import { services, Service, serviceCategories, getServiceById, calculateServicePrice } from "@/data/services";

interface ServiceSelectorProps {
  selectedService: Service | null;
  onServiceSelect: (service: Service) => void;
  preSelectedServices?: Service[];
  pricingInfo?: any;
}

export const ServiceSelector = ({ selectedService, onServiceSelect, preSelectedServices, pricingInfo }: ServiceSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Convert emoji representations for services
  const getServiceEmoji = (service: Service): string => {
    switch (service.category) {
      case "Hair": return "💇‍♀️";
      case "Makeup": return "👰";
      case "Skincare": return "🧴";
      case "Nails": return "💅";
      case "Beauty": return "✨";
      case "Bridal": return "👑";
      default: return "🌟";
    }
  };

  const filteredServices = selectedCategory === "All" 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const popularServices = services.filter(service => service.popular);

  return (
    <div className="space-y-6">
      {/* Pre-selected Services from Price Calculator */}
      {preSelectedServices && preSelectedServices.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-rose-gold" />
            <h3 className="text-lg font-playfair font-semibold text-foreground">Your Selected Services</h3>
            <Badge className="bg-rose-gold/20 text-rose-gold border-0 text-xs">
              From Price Calculator
            </Badge>
          </div>
          
          {pricingInfo && (
            <div className="glass-card p-4 rounded-xl border border-rose-gold/30">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Total Services:</span>
                  <span className="ml-2 font-semibold text-foreground">{preSelectedServices.length}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Duration:</span>
                  <span className="ml-2 font-semibold text-foreground">
                    {Math.floor(pricingInfo.duration / 60)}h {pricingInfo.duration % 60}m
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Original Total:</span>
                  <span className="ml-2 font-semibold text-foreground">₹{pricingInfo.original}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Final Total:</span>
                  <span className="ml-2 font-bold text-primary">₹{Math.round(pricingInfo.total)}</span>
                </div>
              </div>
              {pricingInfo.totalDiscount > 0 && (
                <div className="mt-2 text-center text-sm text-green-600">
                  💰 You save ₹{Math.round(pricingInfo.totalDiscount)} with discounts & combo offers!
                </div>
              )}
            </div>
          )}
          
          <p className="text-sm text-muted-foreground font-montserrat">
            Please select one service below to book your appointment. You can add additional services during checkout.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {preSelectedServices.map((service, index) => (
              <div
                key={`pre-selected-${service.id}`}
                onClick={() => onServiceSelect(service)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedService && selectedService.id === service.id
                    ? "border-rose-gold bg-rose-gold/10 shadow-lg"
                    : "border-glass-border bg-glass-card hover:border-rose-gold/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {getServiceEmoji(service)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-montserrat font-semibold text-foreground text-sm truncate">
                      {service.name}
                    </h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span className={service.discount ? 'line-through' : 'font-semibold text-primary'}>
                        ₹{service.price}
                      </span>
                      {service.discount && (
                        <span className="font-semibold text-primary">
                          ₹{calculateServicePrice(service)}
                        </span>
                      )}
                      <span>•</span>
                      <span>{service.duration}min</span>
                      {service.popular && (
                        <>
                          <span>•</span>
                          <Heart className="w-3 h-3 text-rose-gold" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Popular Services Quick Access */}
      {selectedCategory === "All" && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-rose-gold" />
            <h3 className="text-lg font-playfair font-semibold text-foreground">Most Popular</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {popularServices.map((service) => (
              <div
                key={`popular-${service.id}`}
                onClick={() => onServiceSelect(service)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedService?.id === service.id
                    ? "border-rose-gold bg-rose-gold/10 shadow-lg"
                    : "border-glass-border bg-glass-card hover:border-rose-gold/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getServiceEmoji(service)}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-montserrat font-semibold text-foreground text-sm truncate">
                      {service.name}
                    </h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>₹{service.price}</span>
                      <span>•</span>
                      <span>{service.duration}min</span>
                      <Star className="w-3 h-3 fill-current text-yellow-500" />
                      <span>{service.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-playfair font-semibold text-foreground">Browse Services</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 rounded-full text-sm font-montserrat font-medium transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === "All"
                ? "bg-gradient-to-r from-primary to-rose-gold text-background shadow-lg"
                : "glass-card text-foreground hover:bg-secondary/80"
            }`}
          >
            All Services
          </button>
          {serviceCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-montserrat font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-primary to-rose-gold text-background shadow-lg"
                  : "glass-card text-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            className={`glass-card border-2 cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:scale-105 group ${
              selectedService?.id === service.id
                ? "border-rose-gold bg-rose-gold/10 shadow-lg animate-glow"
                : "border-glass-border hover:border-rose-gold/50"
            }`}
            onClick={() => onServiceSelect(service)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {service.image}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="font-playfair text-lg text-foreground">
                      {service.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-montserrat mt-1 line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <div className="flex flex-wrap justify-end gap-1">
                    {service.popular && (
                      <Badge className="bg-rose-gold/20 text-rose-gold border-0 text-xs">
                        <Heart className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    {service.trending && (
                      <Badge className="bg-blue-500/20 text-blue-500 border-0 text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                    {service.discount && service.discount > 0 && (
                      <Badge className="bg-green-500/20 text-green-500 border-0 text-xs">
                        {service.discount}% OFF
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current text-yellow-500" />
                    <span className="text-sm font-medium text-foreground">{service.rating}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration} min</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{service.bookings}</span>
                  </span>
                </div>
                <div className="text-right">
                  {service.discount && service.discount > 0 ? (
                    <div>
                      <div className="text-sm text-muted-foreground line-through">
                        ₹{service.price}
                      </div>
                      <div className="text-xl font-bold text-green-600 font-montserrat">
                        ₹{calculateServicePrice(service)}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xl font-bold text-primary font-montserrat">
                      ₹{service.price}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <Sparkles className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-playfair font-semibold text-foreground mb-2">
            No services found
          </h3>
          <p className="text-muted-foreground">
            Try selecting a different category or contact us for custom services.
          </p>
        </div>
      )}
    </div>
  );
};