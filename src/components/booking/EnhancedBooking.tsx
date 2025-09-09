import { useState, useEffect } from "react";
import { EnhancedAppointmentBooking } from "./EnhancedAppointmentBooking";
import { BookingManager } from "./BookingManager";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Phone, MessageSquare, Star, CheckCircle, AlertCircle, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const EnhancedBooking = () => {
  const [showFullBooking, setShowFullBooking] = useState(false);
  const [showBookingManager, setShowBookingManager] = useState(false);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  useEffect(() => {
    // Load recent bookings from localStorage
    const loadRecentBookings = () => {
      const bookings = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('booking_')) {
          const booking = JSON.parse(localStorage.getItem(key) || '{}');
          bookings.push(booking);
        }
      }
      setRecentBookings(bookings.slice(-3)); // Show last 3 bookings
    };
    
    loadRecentBookings();
    // Check every 30 seconds for new bookings
    const interval = setInterval(loadRecentBookings, 30000);
    return () => clearInterval(interval);
  }, []);

  const quickServices = [
    { name: "Hair Cut & Style", price: "₹800", duration: "60 min", popular: true },
    { name: "Bridal Makeup", price: "₹8000", duration: "3 hours", popular: true },
    { name: "Facial Treatment", price: "₹1500", duration: "90 min" },
    { name: "Nail Art", price: "₹1200", duration: "45 min" },
  ];

  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", 
    "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
  ];

  const getAvailableSlots = () => {
    const now = new Date();
    const currentHour = now.getHours();
    
    return timeSlots.filter(slot => {
      const slotHour = parseInt(slot.split(':')[0]);
      const isPM = slot.includes('PM');
      const hour24 = isPM && slotHour !== 12 ? slotHour + 12 : slotHour;
      return hour24 > currentHour;
    });
  };

  const handleQuickBook = (service: any) => {
    // Redirect to booking page with pre-selected service
    setShowFullBooking(true);
  };

  const handleEmergencyBooking = () => {
    toast({
      title: "Emergency Booking",
      description: "Please call us directly at +91 98765 43210 for urgent appointments",
    });
    window.open('tel:+919876543210', '_self');
  };

  if (showBookingManager) {
    return (
      <div>
        <div className="mb-6">
          <Button 
            variant="glass" 
            onClick={() => setShowBookingManager(false)}
            className="mb-4"
          >
            ← Back to Booking Options
          </Button>
        </div>
        <BookingManager />
      </div>
    );
  }

  if (showFullBooking) {
    return (
      <div>
        <div className="mb-6 flex gap-3">
          <Button 
            variant="glass" 
            onClick={() => setShowFullBooking(false)}
          >
            ← Back to Quick Options
          </Button>
          <Button 
            variant="glass" 
            onClick={() => {
              setShowFullBooking(false);
              setShowBookingManager(true);
            }}
          >
            <Settings className="w-4 h-4 mr-2" />
            Manage Bookings
          </Button>
        </div>
        <EnhancedAppointmentBooking />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Quick Booking Options */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
          Book Your{" "}
          <span className="text-transparent bg-gradient-to-r from-primary to-rose-gold bg-clip-text">
            Appointment
          </span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-montserrat mb-8">
          Choose from quick booking options or use our detailed appointment system
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button 
            variant="luxury" 
            size="lg"
            onClick={() => setShowFullBooking(true)}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book Appointment
          </Button>
          <Button 
            variant="glass" 
            size="lg"
            onClick={() => setShowBookingManager(true)}
          >
            <Settings className="mr-2 h-5 w-5" />
            Manage Bookings
          </Button>
          <Button 
            variant="glass" 
            size="lg"
            onClick={handleEmergencyBooking}
          >
            <AlertCircle className="mr-2 h-5 w-5" />
            Emergency Booking
          </Button>
        </div>
      </div>

      {/* Quick Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickServices.map((service, index) => (
          <Card key={index} className="glass-card border-glass-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-playfair">{service.name}</CardTitle>
                {service.popular && (
                  <Badge className="bg-rose-gold/20 text-rose-gold border-0">
                    Popular
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {service.duration}
                </span>
                <span className="font-semibold text-primary">{service.price}</span>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                variant="premium" 
                className="w-full"
                onClick={() => handleQuickBook(service)}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Quick Book
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Available Today Slots */}
      <Card className="glass-card border-glass-border">
        <CardHeader>
          <CardTitle className="font-playfair flex items-center">
            <Clock className="mr-3 text-rose-gold" />
            Available Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {getAvailableSlots().slice(0, 8).map((slot, index) => (
              <Button
                key={index}
                variant="glass"
                size="sm"
                onClick={() => setShowFullBooking(true)}
                className="text-xs"
              >
                {slot}
              </Button>
            ))}
          </div>
          {getAvailableSlots().length === 0 && (
            <div className="text-center text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No more slots available today. Book for tomorrow!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card border-glass-border text-center">
          <CardContent className="pt-8 pb-8">
            <div className="p-4 bg-gradient-to-br from-primary to-rose-gold rounded-2xl inline-block mb-4">
              <MessageSquare className="h-8 w-8 text-background" />
            </div>
            <h3 className="text-xl font-playfair font-bold text-foreground mb-2">
              Direct Booking
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Book your appointment directly through our website system
            </p>
            <Button 
              variant="luxury"
              onClick={() => setShowFullBooking(true)}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book Now
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card border-glass-border text-center">
          <CardContent className="pt-8 pb-8">
            <div className="p-4 bg-gradient-to-br from-primary to-rose-gold rounded-2xl inline-block mb-4">
              <Phone className="h-8 w-8 text-background" />
            </div>
            <h3 className="text-xl font-playfair font-bold text-foreground mb-2">
              Call Directly
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Speak directly with our team for immediate booking
            </p>
            <Button 
              variant="glass"
              onClick={() => window.open('tel:+919876543210', '_self')}
            >
              <Phone className="mr-2 h-4 w-4" />
              +91 98765 43210
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card border-glass-border text-center">
          <CardContent className="pt-8 pb-8">
            <div className="p-4 bg-gradient-to-br from-primary to-rose-gold rounded-2xl inline-block mb-4">
              <MapPin className="h-8 w-8 text-background" />
            </div>
            <h3 className="text-xl font-playfair font-bold text-foreground mb-2">
              Visit Us
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              123 Beauty Plaza, Near City Mall, Jamnagar
            </p>
            <Button 
              variant="glass"
              onClick={() => window.open('https://maps.google.com/?q=Beauty Plaza, Jamnagar, Gujarat', '_blank')}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Get Directions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings (if any) */}
      {recentBookings.length > 0 && (
        <Card className="glass-card border-glass-border">
          <CardHeader>
            <CardTitle className="font-playfair flex items-center">
              <CheckCircle className="mr-3 text-rose-gold" />
              Recent Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBookings.map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/10 rounded-xl">
                  <div>
                    <p className="font-medium text-foreground">
                      {booking.selectedService?.name || 'Service'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Booking ID: {booking.bookingId}
                    </p>
                  </div>
                  <Badge className="bg-primary/20 text-primary">
                    Confirmed
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedBooking;