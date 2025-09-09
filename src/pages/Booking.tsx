import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { EnhancedAppointmentBooking } from "@/components/booking/EnhancedAppointmentBooking";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Booking = () => {
  const location = useLocation();
  const [preSelectedService, setPreSelectedService] = useState<string>("");
  const [preSelectedServices, setPreSelectedServices] = useState<any[]>([]);
  const [preSelectedTime, setPreSelectedTime] = useState<string>("");
  const [pricingInfo, setPricingInfo] = useState<any>(null);

  useEffect(() => {
    // Check if there are pre-selected values from navigation state
    if (location.state?.preSelectedService) {
      setPreSelectedService(location.state.preSelectedService);
    }
    if (location.state?.preSelectedServices) {
      setPreSelectedServices(location.state.preSelectedServices);
    }
    if (location.state?.preSelectedTime) {
      setPreSelectedTime(location.state.preSelectedTime);
    }
    if (location.state?.pricingInfo) {
      setPricingInfo(location.state.pricingInfo);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Button variant="glass" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-4">
            <Calendar className="h-4 w-4 text-rose-gold" />
            <span className="text-sm font-montserrat font-medium">Appointment Booking</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
            Book Your{" "}
            <span className="text-transparent bg-gradient-to-r from-primary to-rose-gold bg-clip-text">
              Beauty Appointment
            </span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Schedule your beauty treatment with our expert professionals. Complete booking in just a few simple steps.
          </p>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-muted-foreground">
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Instant Confirmation
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-blue-500" />
              Flexible Rescheduling
            </span>
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-purple-500" />
              No Advance Payment
            </span>
          </div>
        </div>
        
        <EnhancedAppointmentBooking 
          preSelectedService={preSelectedService}
          preSelectedServices={preSelectedServices}
          pricingInfo={pricingInfo}
        />
      </div>
      
      {/* Mobile spacing for bottom navigation */}
      <div className="h-20 lg:h-0"></div>
    </div>
  );
};

export default Booking;