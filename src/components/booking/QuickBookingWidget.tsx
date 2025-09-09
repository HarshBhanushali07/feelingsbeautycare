import { useState } from "react";
import { Calendar, Clock, User, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const QuickBookingWidget = () => {
  const [selectedService, setSelectedService] = useState<string>("");

  const popularServices = [
    { 
      id: "haircut-style", 
      name: "Hair Cut & Style", 
      price: "₹800", 
      duration: "60 min", 
      available: "Today 3:00 PM",
      popular: true 
    },
    { 
      id: "bridal-makeup", 
      name: "Bridal Makeup", 
      price: "₹8,000", 
      duration: "3 hours", 
      available: "Tomorrow 10:00 AM",
      popular: true 
    },
    { 
      id: "facial-treatment", 
      name: "Facial Treatment", 
      price: "₹1,500", 
      duration: "90 min", 
      available: "Today 5:00 PM",
      popular: false 
    },
  ];

  const nextAvailableSlots = [
    "2:00 PM Today",
    "3:30 PM Today", 
    "10:00 AM Tomorrow",
    "11:30 AM Tomorrow"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full">
          <Sparkles className="h-4 w-4 text-rose-gold" />
          <span className="text-sm font-montserrat font-medium text-muted-foreground">Quick Booking</span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-playfair font-bold text-foreground">
          Book in{" "}
          <span className="text-transparent bg-gradient-to-r from-primary to-rose-gold bg-clip-text">
            3 Simple Steps
          </span>
        </h2>
        
        <p className="text-muted-foreground font-montserrat max-w-xl mx-auto">
          Choose your service, pick a time, and you're all set. No phone calls needed!
        </p>
      </div>

      {/* Popular Services Quick Select */}
      <Card className="glass-card border-glass-border">
        <CardHeader>
          <CardTitle className="font-playfair text-lg flex items-center">
            <User className="mr-3 text-rose-gold" />
            Popular Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {popularServices.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`p-4 rounded-xl text-left transition-all duration-300 hover:scale-105 ${
                  selectedService === service.id
                    ? 'glass-card border-rose-gold bg-rose-gold/10 animate-glow'
                    : 'glass-card border-glass-border hover:border-rose-gold/50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-montserrat font-semibold text-foreground">
                    {service.name}
                  </h3>
                  {service.popular && (
                    <Badge className="bg-rose-gold/20 text-rose-gold border-0 text-xs">
                      Popular
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {service.duration}
                    </span>
                    <span className="font-bold text-rose-gold">{service.price}</span>
                  </div>
                  <div className="text-xs text-primary">
                    Next available: {service.available}
                  </div>
                </div>

                {selectedService === service.id && (
                  <div className="mt-3 flex items-center text-sm text-rose-gold font-semibold">
                    <div className="w-2 h-2 bg-rose-gold rounded-full mr-2 animate-pulse"></div>
                    Selected
                  </div>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Available Slots */}
      <Card className="glass-card border-glass-border">
        <CardHeader>
          <CardTitle className="font-playfair text-lg flex items-center">
            <Clock className="mr-3 text-rose-gold" />
            Next Available Slots
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {nextAvailableSlots.map((slot, index) => (
              <Button
                key={index}
                variant="glass"
                size="sm"
                asChild
                className="hover:bg-rose-gold/10 hover:text-rose-gold hover:border-rose-gold/50 transition-all duration-300"
              >
                <Link to="/booking" state={{ preSelectedTime: slot }}>
                  {slot}
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Button 
          variant="luxury" 
          size="lg"
          className="w-full sm:w-auto"
          asChild
        >
          <Link to="/booking" state={{ preSelectedService: selectedService }}>
            <Calendar className="mr-2 h-5 w-5" />
            Book Full Appointment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        
        <Button 
          variant="glass" 
          size="lg"
          className="w-full sm:w-auto"
          asChild
        >
          <Link to="/booking-management">
            <User className="mr-2 h-5 w-5" />
            Manage Existing Bookings
          </Link>
        </Button>
      </div>

      {/* Trust Indicators */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <span className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Instant Confirmation
          </span>
          <span className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            No Payment Required
          </span>
          <span className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            Easy Rescheduling
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Book with confidence • Free cancellation up to 2 hours before your appointment
        </p>
      </div>
    </div>
  );
};

export default QuickBookingWidget;