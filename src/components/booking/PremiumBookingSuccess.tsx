import React, { useState, useEffect } from "react";
import { CheckCircle, Calendar, Clock, MapPin, Phone, Mail, Download, Share2, Star, Gift, QrCode, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
}

interface BookingData {
  bookingId: string;
  service: Service;
  date: string;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalPrice: number;
  status: string;
  createdAt: Date;
}

interface PremiumBookingSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: BookingData;
}

const PremiumBookingSuccess = ({ isOpen, onClose, bookingData }: PremiumBookingSuccessProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [isOpen]);

  const handleDownloadConfirmation = () => {
    toast({
      title: "Download Started",
      description: "Your booking confirmation is being downloaded.",
    });
  };

  const handleShareBooking = () => {
    if (navigator.share) {
      navigator.share({
        title: "Appointment Confirmed",
        text: `My appointment at Feelings Beauty Care is confirmed for ${bookingData.date} at ${bookingData.time}`,
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(`Appointment confirmed: ${bookingData.service.name} on ${bookingData.date} at ${bookingData.time}`);
      toast({
        title: "Copied to Clipboard",
        description: "Booking details copied to clipboard.",
      });
    }
  };

  const generateQrCodeData = () => {
    return `BOOKING:${bookingData.bookingId}|${bookingData.customerName}|${bookingData.date}|${bookingData.time}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg mx-auto glass-card border-glass-border p-0 overflow-hidden">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-50">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-primary to-rose-gold rounded-full animate-petal-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Header with Success Animation */}
        <div className="bg-gradient-to-r from-primary to-rose-gold p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-rose-gold/20 animate-shimmer"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-background/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-glow backdrop-blur-sm">
              <CheckCircle className="w-8 h-8 text-background animate-pulse" />
            </div>
            <h2 className="text-2xl font-playfair font-bold text-background mb-2">
              Booking Confirmed!
            </h2>
            <p className="text-background/90 font-montserrat">
              Your premium appointment is secured
            </p>
            <Badge className="mt-3 bg-background/20 text-background border-background/30 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 mr-1" />
              VIP Experience
            </Badge>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Booking ID with Premium Styling */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full border border-glass-border">
              <QrCode className="w-4 h-4 text-primary" />
              <span className="text-sm font-montserrat font-medium text-muted-foreground">Booking ID</span>
              <span className="text-lg font-playfair font-bold text-primary">{bookingData.bookingId}</span>
            </div>
          </div>

          {/* Service Details Card */}
          <div className="glass-card p-5 rounded-2xl space-y-4 border border-glass-border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-rose-gold rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-background" />
              </div>
              <div className="flex-1">
                <h3 className="font-playfair text-lg font-bold text-foreground">
                  {bookingData.service.name}
                </h3>
                <p className="text-sm text-muted-foreground font-montserrat">
                  {bookingData.service.duration} minutes • Premium Service
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-playfair font-bold text-primary">
                  ₹{bookingData.totalPrice}
                </p>
                <p className="text-xs text-muted-foreground">Pay at salon</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-glass-border">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{bookingData.date}</p>
                  <p className="text-xs text-muted-foreground">Date</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-rose-gold" />
                <div>
                  <p className="text-sm font-medium text-foreground">{bookingData.time}</p>
                  <p className="text-xs text-muted-foreground">Time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="font-playfair font-semibold text-foreground">Salon Details</h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-3 text-primary" />
                <span>123 Beauty Plaza, Near City Mall, Jamnagar</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mr-3 text-rose-gold" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mr-3 text-primary" />
                <span>hello@feelingsbeautycare.com</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="glass" 
                size="sm"
                onClick={handleDownloadConfirmation}
                className="flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button 
                variant="glass" 
                size="sm"
                onClick={handleShareBooking}
                className="flex items-center"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            <Button 
              variant="luxury" 
              className="w-full"
              asChild
            >
              <Link to="/booking-management">
                <Gift className="w-4 h-4 mr-2" />
                Manage My Bookings
              </Link>
            </Button>
            
            <Button 
              variant="glass" 
              className="w-full"
              onClick={onClose}
            >
              Continue Browsing
            </Button>
          </div>

          {/* Premium Features */}
          <div className="glass-card p-4 rounded-xl border border-glass-border bg-gradient-to-r from-primary/5 to-rose-gold/5">
            <h4 className="font-playfair font-semibold text-foreground mb-3 flex items-center">
              <Gift className="w-4 h-4 mr-2 text-primary" />
              Premium Benefits
            </h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                <span>Free consultation & skin analysis</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                <span>Complimentary refreshments</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                <span>Free rescheduling up to 2 hours before</span>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="text-xs text-muted-foreground text-center space-y-1 pt-2 border-t border-glass-border">
            <p>📧 Confirmation email sent to {bookingData.customerEmail}</p>
            <p>⏰ Please arrive 10 minutes early for your appointment</p>
            <p>💝 Bring a friend and get 10% off your next visit</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumBookingSuccess;