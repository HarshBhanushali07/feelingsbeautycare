import React, { useState, useEffect } from "react";
import { ServiceSelector } from "./EnhancedServiceSelector";
import { DatePicker } from "./DatePicker";
import { TimeSlotSelector } from "./TimeSlotSelector";
import { BookingConfirmation } from "./EnhancedBookingConfirmation";
import PremiumBookingSuccess from "./PremiumBookingSuccess";
import PremiumLoadingState from "./PremiumLoadingState";
import ServiceRecommendations from "./ServiceRecommendations";
import BookingInsights from "./BookingInsights";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, User, CheckCircle, ArrowLeft, ArrowRight, Sparkles, Star, Shield, Gift, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Service, getServiceById } from "@/data/services";

interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

interface EnhancedAppointmentBookingProps {
  preSelectedService?: string;
  preSelectedServices?: any[];
  pricingInfo?: any;
}

export const EnhancedAppointmentBooking = ({ preSelectedService, preSelectedServices, pricingInfo }: EnhancedAppointmentBookingProps = {}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    phone: "",
    email: "",
    notes: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);
  const [addOns, setAddOns] = useState<Service[]>([]);

  const timeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM"
  ];

  const progress = (currentStep / 4) * 100;

  const steps = [
    { id: 1, title: "Select Service", icon: Sparkles, completed: currentStep > 1 },
    { id: 2, title: "Choose Date", icon: Calendar, completed: currentStep > 2 },
    { id: 3, title: "Pick Time", icon: Clock, completed: currentStep > 3 },
    { id: 4, title: "Confirm", icon: CheckCircle, completed: currentStep > 4 }
  ];

  // Auto-save booking draft to localStorage
  useEffect(() => {
    const bookingDraft = {
      selectedService,
      selectedDate,
      selectedTime,
      customerInfo,
      currentStep
    };
    localStorage.setItem('bookingDraft', JSON.stringify(bookingDraft));
  }, [selectedService, selectedDate, selectedTime, customerInfo, currentStep]);

  // Load booking draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('bookingDraft');
    if (savedDraft && currentStep === 1) {
      try {
        const draft = JSON.parse(savedDraft);
        if (draft.selectedService && !selectedService) {
          setSelectedService(draft.selectedService);
        }
      } catch (e) {
        // Ignore invalid draft
      }
    }
  }, []);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleBookingConfirm();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedService !== null;
      case 2: return selectedDate !== undefined;
      case 3: return selectedTime !== "";
      case 4: return customerInfo.name !== "" && customerInfo.phone !== "";
      default: return false;
    }
  };

  const handleBookingConfirm = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API call with premium loading experience
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const bookingId = `FBC${Date.now().toString().slice(-6)}`;
      const totalPrice = selectedService ? selectedService.price + addOns.reduce((sum, addon) => sum + addon.price, 0) : 0;
      
      const newBookingData = {
        bookingId,
        service: selectedService!,
        date: selectedDate!.toLocaleDateString('en-GB', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        time: selectedTime,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        totalPrice,
        addOns,
        status: 'confirmed' as const,
        createdAt: new Date()
      };
      
      // Store booking in localStorage
      localStorage.setItem(`booking_${bookingId}`, JSON.stringify(newBookingData));
      
      setBookingData(newBookingData);
      setIsLoading(false);
      setShowSuccessModal(true);
      
      // Clear draft
      localStorage.removeItem('bookingDraft');
      
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // Reset form after success
    setCurrentStep(1);
    setSelectedService(null);
    setSelectedDate(undefined);
    setSelectedTime("");
    setCustomerInfo({ name: "", phone: "", email: "", notes: "" });
    setAddOns([]);
  };

  const handleAddOnSelect = (addon: Service) => {
    setAddOns(prev => [...prev, addon]);
    toast({
      title: "Add-on Added",
      description: `${addon.name} has been added to your booking.`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
      {/* Mobile-Optimized Progress Header */}
      <div className="glass-card p-4 md:p-6 rounded-2xl border-glass-border">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-primary to-rose-gold rounded-xl">
              <Star className="w-5 h-5 text-background" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-playfair font-bold text-foreground">
                Book Your Appointment
              </h2>
              <p className="text-sm text-muted-foreground font-montserrat">
                Quick & Easy • 3 Minutes
              </p>
            </div>
          </div>
          <Badge className="bg-rose-gold/20 text-rose-gold border-0 text-xs md:text-sm">
            {currentStep}/{steps.length}
          </Badge>
        </div>
        
        <Progress value={progress} className="mb-4 md:mb-6 h-2 md:h-3" />
        
        {/* Mobile: Horizontal scrollable steps, Desktop: Full view */}
        <div className="overflow-x-auto md:overflow-visible">
          <div className="flex justify-between min-w-max md:min-w-0 space-x-4 md:space-x-0 pb-2 md:pb-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center space-y-2 min-w-0">
                  <div className={`
                    w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 transform
                    ${step.completed 
                      ? 'bg-gradient-to-r from-primary to-rose-gold text-background scale-110 animate-glow' 
                      : currentStep === step.id
                      ? 'bg-rose-gold/20 text-rose-gold border-2 border-rose-gold animate-pulse'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                    }
                  `}>
                    <Icon className="w-4 h-4 md:w-6 md:h-6" />
                  </div>
                  <span className={`text-xs font-montserrat font-medium text-center whitespace-nowrap ${
                    step.completed || currentStep === step.id 
                      ? 'text-foreground' 
                      : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center space-x-4 md:space-x-6 mt-4 pt-4 border-t border-glass-border">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Shield className="w-3 h-3 text-green-500" />
            <span>Secure</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <CheckCircle className="w-3 h-3 text-blue-500" />
            <span>Instant Confirm</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3 text-purple-500" />
            <span>Free Reschedule</span>
          </div>
        </div>
      </div>

      {/* Enhanced Step Content with Animations */}
      <div className="relative">
        <Card className="glass-card border-glass-border overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              {steps.find(s => s.id === currentStep)?.icon && (
                <div className="p-2 bg-gradient-to-r from-primary to-rose-gold rounded-lg animate-fade-in">
                  {React.createElement(steps.find(s => s.id === currentStep)!.icon, {
                    className: "w-5 h-5 text-background"
                  })}
                </div>
              )}
              <div>
                <CardTitle className="font-playfair text-lg md:text-xl">
                  {steps.find(s => s.id === currentStep)?.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground font-montserrat mt-1">
                  {currentStep === 1 && "Choose from our premium beauty services"}
                  {currentStep === 2 && "Select your preferred appointment date"}
                  {currentStep === 3 && "Pick the perfect time for your visit"}
                  {currentStep === 4 && "Review and confirm your booking"}
                </p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-4 md:p-6">
            {isLoading ? (
              <PremiumLoadingState 
                message="Securing your premium appointment..."
                submessage="Preparing your luxury experience"
              />
            ) : (
              <div className="transition-all duration-500 animate-fade-in">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <ServiceSelector
                      selectedService={selectedService}
                      onServiceSelect={(service) => setSelectedService(service)}
                      preSelectedServices={preSelectedServices}
                      pricingInfo={pricingInfo}
                    />
                    {selectedService && (
                      <ServiceRecommendations
                        currentService={selectedService}
                        onServiceSelect={handleAddOnSelect}
                      />
                    )}
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <DatePicker
                      date={selectedDate}
                      onDateSelect={setSelectedDate}
                    />
                    <BookingInsights 
                      selectedDate={selectedDate}
                      serviceName={selectedService?.name}
                    />
                  </div>
                )}
                
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <TimeSlotSelector
                      timeSlots={timeSlots}
                      selectedTime={selectedTime}
                      onTimeSelect={setSelectedTime}
                      selectedDate={selectedDate}
                    />
                    <BookingInsights 
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      serviceName={selectedService?.name}
                    />
                  </div>
                )}
                
                {currentStep === 4 && (
                  <BookingConfirmation
                    selectedService={selectedService}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    customerInfo={customerInfo}
                    onCustomerInfoChange={setCustomerInfo}
                    onConfirm={handleBookingConfirm}
                  />
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Mobile-First Navigation */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-md border-t border-glass-border p-4 -mx-4 md:mx-0 md:relative md:bg-transparent md:backdrop-blur-none md:border-0 md:p-0">
        <div className="flex justify-between space-x-3">
          <Button
            variant="glass"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center flex-1 md:flex-none transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Back</span>
          </Button>
          
          <Button
            variant="luxury"
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center flex-1 md:flex-none min-w-0 transition-all duration-300 transform hover:scale-105"
          >
            {currentStep === steps.length ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2 animate-pulse" />
                <span className="hidden sm:inline">Complete Booking</span>
                <span className="sm:hidden">Book Now</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Continue</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
        
        {/* Progress indicator for mobile */}
        <div className="flex justify-center mt-3 md:hidden">
          <div className="flex space-x-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index + 1 <= currentStep ? 'bg-primary' : 'bg-secondary'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Premium Success Modal */}
      {bookingData && (
        <PremiumBookingSuccess
          isOpen={showSuccessModal}
          onClose={handleSuccessModalClose}
          bookingData={bookingData}
        />
      )}
    </div>
  );
};