import { Calendar, Clock, User, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const BookingSection = () => {
  const quickServices = [
    { name: "Hair Cut & Style", duration: "60 min", price: "₹800" },
    { name: "Bridal Makeup", duration: "3 hours", price: "₹8,000" },
    { name: "Facial Treatment", duration: "90 min", price: "₹1,500" },
    { name: "Nail Art", duration: "45 min", price: "₹1,200" },
  ];

  const timeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
  ];

  return (
    <section id="booking" className="py-20 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10"
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
              animationDelay: `${i * 2}s`,
            }}
          >
            <Calendar className="h-12 w-12 text-rose-gold" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-5 w-5 text-rose-gold" />
            <span className="text-sm font-montserrat font-medium">Complete Booking System</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-foreground mb-6">
            Book Your{" "}
            <span className="text-transparent bg-gradient-to-r from-primary to-rose-gold bg-clip-text">
              Beauty Session
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-montserrat">
            Our complete inbuilt booking system makes it easy to schedule, manage, and track your appointments - all within our website!
          </p>
        </div>

        {/* Quick Booking Options */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          <Button variant="luxury" size="lg" asChild>
            <Link to="/booking">
              <Calendar className="mr-2 h-5 w-5" />
              Book Appointment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="glass" size="lg" asChild>
            <Link to="/booking-management">
              <CheckCircle className="mr-2 h-5 w-5" />
              Manage Bookings
            </Link>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Instant Booking */}
          <Card className="glass-card border-glass-border hover:animate-glow transition-all duration-300 text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-rose-gold rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-background" />
              </div>
              <CardTitle className="font-playfair text-lg text-foreground">
                Instant Booking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground font-montserrat mb-4">
                Book your appointment instantly through our website with immediate confirmation
              </p>
              <Button 
                variant="luxury" 
                size="sm" 
                className="w-full"
                asChild
              >
                <Link to="/booking">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Easy Management */}
          <Card className="glass-card border-glass-border hover:animate-glow transition-all duration-300 text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-rose-gold rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <User className="h-8 w-8 text-background" />
              </div>
              <CardTitle className="font-playfair text-lg text-foreground">
                Easy Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground font-montserrat mb-4">
                View, reschedule, or cancel your appointments anytime through our booking portal
              </p>
              <Button 
                variant="glass" 
                size="sm" 
                className="w-full"
                asChild
              >
                <Link to="/booking-management">
                  <User className="w-4 h-4 mr-2" />
                  Manage Bookings
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="glass-card border-glass-border hover:animate-glow transition-all duration-300 text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-rose-gold rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-background" />
              </div>
              <CardTitle className="font-playfair text-lg text-foreground">
                Contact Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground font-montserrat mb-4">
                Need help? Visit our contact page for location details and support
              </p>
              <Button 
                variant="glass" 
                size="sm" 
                className="w-full"
                asChild
              >
                <Link to="/contact">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Get Help
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Available Today Slots Preview */}
        <div className="text-center">
          <h3 className="text-xl font-playfair font-bold text-foreground mb-6">
            Available Slots Today
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-4xl mx-auto mb-8">
            {timeSlots.slice(0, 6).map((slot, index) => (
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

          <div className="glass-card p-6 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-xl font-playfair font-bold text-foreground mb-3">
              Ready to book your appointment?
            </h3>
            <p className="text-muted-foreground font-montserrat mb-4">
              Experience our seamless inbuilt booking system. No external apps or phone calls needed!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button 
                variant="luxury"
                asChild
              >
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Start Booking Process
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
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
            <span className="flex items-center">
              <div className="w-2 h-2 bg-rose-500 rounded-full mr-2"></div>
              Secure & Private
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;