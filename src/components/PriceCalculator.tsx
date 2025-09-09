import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calculator, Clock, Star, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { services, Service, calculateTotalPrice, serviceCategories } from "@/data/services";

const PriceCalculator = () => {
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  
  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getSelectedServicesData = () => {
    return services.filter(service => selectedServices.includes(service.id));
  };

  const handleBookSelected = () => {
    if (selectedServices.length === 0) {
      toast({
        title: "No services selected",
        description: "Please select at least one service to proceed.",
        variant: "destructive",
      });
      return;
    }

    const selected = getSelectedServicesData();
    const pricing = calculateTotalPrice(selected);
    
    // Navigate to booking page with selected services
    navigate("/booking", {
      state: { 
        preSelectedServices: selected,
        pricingInfo: pricing
      }
    });
  };

  const pricing = calculateTotalPrice(getSelectedServicesData());

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/5 to-primary/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Service{" "}
            <span className="text-transparent bg-gradient-to-r from-primary to-rose-gold bg-clip-text">
              Price Calculator
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-montserrat">
            Select multiple services and get instant pricing with automatic discounts
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Service Selection */}
          <div className="lg:col-span-2 space-y-6">
            {serviceCategories.map(category => (
              <Card key={category} className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle className="font-playfair flex items-center">
                    <Star className="mr-3 text-rose-gold" />
                    {category} Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {services
                      .filter(service => service.category === category)
                      .map(service => (
                        <div 
                          key={service.id} 
                          className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                            selectedServices.includes(service.id) 
                              ? 'bg-primary/10 border border-primary/20' 
                              : 'hover:bg-secondary/10'
                          }`}
                          onClick={() => toggleService(service.id)}
                        >
                          <Checkbox 
                            checked={selectedServices.includes(service.id)}
                            onChange={() => toggleService(service.id)}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-montserrat font-semibold text-foreground">
                                {service.name}
                              </h4>
                              {service.popular && (
                                <Badge className="bg-rose-gold/20 text-rose-gold border-0 text-xs">
                                  Popular
                                </Badge>
                              )}
                              {service.discount && (
                                <Badge className="bg-green-500/20 text-green-700 border-0 text-xs">
                                  {service.discount}% OFF
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {service.duration} min
                              </span>
                              <span className={service.discount ? 'line-through text-muted-foreground' : 'font-semibold text-primary'}>
                                ₹{service.price}
                              </span>
                              {service.discount && (
                                <span className="font-semibold text-primary">
                                  ₹{service.price - (service.price * service.discount / 100)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <Card className="glass-card border-glass-border sticky top-24">
              <CardHeader>
                <CardTitle className="font-playfair flex items-center">
                  <Calculator className="mr-3 text-rose-gold" />
                  Price Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedServices.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <Calculator className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Select services to see pricing</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      {getSelectedServicesData().map(service => (
                        <div key={service.id} className="flex justify-between text-sm">
                          <span className="text-foreground">{service.name}</span>
                          <span className="text-primary font-medium">
                            ₹{service.discount ? service.price - (service.price * service.discount / 100) : service.price}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-border pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>₹{pricing.original}</span>
                      </div>
                      
                      {pricing.totalDiscount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Total Savings:</span>
                          <span>-₹{Math.round(pricing.totalDiscount)}</span>
                        </div>
                      )}
                      
                      {selectedServices.length >= 3 && (
                        <div className="flex justify-between text-sm text-rose-gold">
                          <span>Combo Bonus:</span>
                          <span>Extra 10% OFF!</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-primary">₹{Math.round(pricing.total)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Duration:</span>
                        <span>{Math.floor(pricing.duration / 60)}h {pricing.duration % 60}m</span>
                      </div>
                    </div>
                    
                    <Button 
                      variant="luxury" 
                      className="w-full animate-glow"
                      onClick={handleBookSelected}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Selected Services
                    </Button>
                    
                    <div className="text-xs text-center text-muted-foreground">
                      All prices include GST. Final pricing confirmed during booking.
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;