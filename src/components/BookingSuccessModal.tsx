import { CheckCircle, Calendar, Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

interface BookingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    bookingId: string;
    serviceName: string;
    date: string;
    time: string;
    customerName: string;
    price: string;
  };
}

const BookingSuccessModal = ({ isOpen, onClose, bookingData }: BookingSuccessModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto glass-card border-glass-border">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <DialogTitle className="font-playfair text-2xl text-foreground">
            Booking Confirmed!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground mb-2">Your appointment has been successfully booked</p>
            <p className="text-lg font-semibold text-rose-gold">
              Booking ID: {bookingData.bookingId}
            </p>
          </div>

          <div className="glass-card p-4 rounded-xl space-y-3">
            <h3 className="font-semibold text-foreground mb-3">Appointment Details</h3>
            
            <div className="flex items-center text-sm">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mr-3">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{bookingData.serviceName}</p>
                <p className="text-muted-foreground">{bookingData.date} at {bookingData.time}</p>
              </div>
            </div>

            <div className="flex items-center text-sm">
              <div className="w-8 h-8 bg-rose-gold/20 rounded-lg flex items-center justify-center mr-3">
                <Clock className="w-4 h-4 text-rose-gold" />
              </div>
              <div>
                <p className="font-medium text-foreground">Total Amount</p>
                <p className="text-muted-foreground">{bookingData.price} (Pay at salon)</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              <span>123 Beauty Plaza, Near City Mall, Jamnagar</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Phone className="w-4 h-4 mr-2" />
              <span>+91 98765 43210</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              variant="luxury" 
              className="w-full"
              asChild
            >
              <Link to="/booking-management">
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

          <div className="text-xs text-muted-foreground text-center">
            <p>A confirmation email has been sent to your email address.</p>
            <p className="mt-1">Please arrive 10 minutes early for your appointment.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingSuccessModal;