import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Mail, Phone, MapPin, CreditCard, Shield, CheckCircle, Gift, Star } from "lucide-react";
import { format } from "date-fns";
import { Service } from "@/data/services";

interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

interface BookingConfirmationProps {
  selectedService: Service | null;
  selectedDate: Date | undefined;
  selectedTime: string;
  customerInfo: CustomerInfo;
  onCustomerInfoChange: (info: CustomerInfo) => void;
  onConfirm: () => void;
}

export const BookingConfirmation = ({
  selectedService,
  selectedDate,
  selectedTime,
  customerInfo,
  onCustomerInfoChange,
  onConfirm
}: BookingConfirmationProps) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Booking Summary */}
      <Card className="glass-card border-glass-border overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-rose-gold/5">
          <CardTitle className="font-playfair flex items-center">
            <div className="p-2 bg-gradient-to-r from-primary to-rose-gold rounded-lg mr-3">
              <Star className="w-5 h-5 text-background" />
            </div>
            Your Appointment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Service Details Card */}
          <div className="glass-card p-4 rounded-xl border border-glass-border">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{selectedService?.name?.includes('Hair') ? '💇‍♀️' : selectedService?.name?.includes('Bridal') ? '👰' : selectedService?.name?.includes('Facial') ? '🧴' : selectedService?.name?.includes('Nail') ? '💅' : '✨'}</div>
              <div className="flex-1">
                <h3 className="font-playfair text-lg font-semibold text-foreground mb-1">
                  {selectedService?.name}
                </h3>
                <p className="text-sm text-muted-foreground font-montserrat mb-3">
                  {selectedService?.description || 'Professional beauty service'}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary/20 text-primary border-0">
                    <Clock className="w-3 h-3 mr-1" />
                    {selectedService?.duration} min
                  </Badge>
                  <Badge className="bg-rose-gold/20 text-rose-gold border-0">
                    <Star className="w-3 h-3 mr-1" />
                    Premium Service
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary font-montserrat">
                  ₹{selectedService?.price}
                </div>
                <div className="text-xs text-muted-foreground">
                  Incl. all taxes
                </div>
              </div>
            </div>
          </div>

          {/* Date & Time Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-4 rounded-xl border border-glass-border">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-rose-gold to-primary rounded-xl">
                  <Calendar className="w-6 h-6 text-background" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-montserrat">Appointment Date</p>
                  <p className="font-semibold text-foreground text-lg">
                    {selectedDate ? format(selectedDate, 'EEEE') : 'Not selected'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedDate ? format(selectedDate, 'MMMM do, yyyy') : ''}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-4 rounded-xl border border-glass-border">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <Clock className="w-6 h-6 text-background" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-montserrat">Appointment Time</p>
                  <p className="font-semibold text-foreground text-lg">
                    {selectedTime || 'Not selected'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Duration: {selectedService?.duration} minutes
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Salon Information */}
          <div className="glass-card p-4 rounded-xl border border-glass-border bg-gradient-to-r from-secondary/10 to-background">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-rose-gold mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Beauty Paradise Salon</h4>
                <p className="text-sm text-muted-foreground">123 Beauty Plaza, Near City Mall, Jamnagar, Gujarat</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    +91 98765 43210
                  </span>
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    4.8 Rating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Customer Information Form */}
      <Card className="glass-card border-glass-border">
        <CardHeader>
          <CardTitle className="font-playfair flex items-center">
            <div className="p-2 bg-gradient-to-r from-primary to-rose-gold rounded-lg mr-3">
              <User className="w-5 h-5 text-background" />
            </div>
            Your Details
          </CardTitle>
          <p className="text-sm text-muted-foreground font-montserrat">
            We'll use this information to confirm your appointment and send updates
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-montserrat font-semibold flex items-center">
                Full Name
                <span className="ml-1 text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={customerInfo.name}
                onChange={(e) => onCustomerInfoChange({ ...customerInfo, name: e.target.value })}
                className="glass-input h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-montserrat font-semibold flex items-center">
                Phone Number
                <span className="ml-1 text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={customerInfo.phone}
                onChange={(e) => onCustomerInfoChange({ ...customerInfo, phone: e.target.value })}
                className="glass-input h-12 text-base"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="font-montserrat font-semibold flex items-center">
              Email Address
              <Badge className="ml-2 bg-secondary/50 text-xs">Optional</Badge>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={customerInfo.email}
              onChange={(e) => onCustomerInfoChange({ ...customerInfo, email: e.target.value })}
              className="glass-input h-12 text-base"
            />
            <p className="text-xs text-muted-foreground">
              We'll send booking confirmation and reminders to this email
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes" className="font-montserrat font-semibold">
              Special Requests
              <Badge className="ml-2 bg-secondary/50 text-xs">Optional</Badge>
            </Label>
            <Textarea
              id="notes"
              placeholder="Any special requests, allergies, or preferences we should know about..."
              value={customerInfo.notes}
              onChange={(e) => onCustomerInfoChange({ ...customerInfo, notes: e.target.value })}
              className="glass-input resize-none"
              rows={4}
            />
          </div>

          {/* Privacy & Policy */}
          <div className="glass-card p-4 rounded-xl border border-glass-border bg-secondary/10">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-green-500 mt-0.5" />
              <div className="text-sm">
                <p className="text-foreground font-medium mb-1">Your privacy is protected</p>
                <p className="text-muted-foreground">
                  We use your information only for appointment management and will never share it with third parties.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile-Optimized Policies */}
      <Card className="glass-card border-glass-border">
        <CardHeader>
          <CardTitle className="font-playfair flex items-center text-lg">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-3">
              <Gift className="w-5 h-5 text-background" />
            </div>
            Important Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="glass-card p-4 rounded-xl border border-green-200 bg-green-50/50">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-800 font-montserrat">No Advance Payment</h4>
                  <p className="text-sm text-green-600 font-montserrat mt-1">
                    Pay after your service is complete. We accept all payment methods.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <span className="font-medium">Free cancellation</span> up to 2 hours before
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                <div className="text-sm">
                  <span className="font-medium">Easy rescheduling</span> available online
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5" />
                <div className="text-sm">
                  <span className="font-medium">SMS reminders</span> sent 1 day & 1 hour before
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Confirm Button */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-md border-t border-glass-border p-4 -mx-4 md:mx-0 md:relative md:bg-transparent md:backdrop-blur-none md:border-0 md:p-0">
        <Button
          onClick={handleConfirm}
          disabled={!customerInfo.name || !customerInfo.phone}
          variant="luxury"
          size="lg"
          className="w-full h-14 text-lg font-semibold transition-all duration-300 transform hover:scale-105 animate-glow"
        >
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Confirm Appointment</span>
          </div>
        </Button>
        
        <p className="text-center text-xs text-muted-foreground mt-3">
          By confirming, you agree to our terms of service and cancellation policy
        </p>
      </div>
    </div>
  );
};