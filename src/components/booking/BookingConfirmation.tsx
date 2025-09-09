import { useState } from "react";
import { format } from "date-fns";
import { Check, Calendar, Clock, User, Phone, Mail, Download, Share2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface BookingConfirmationProps {
  bookingData: {
    bookingId: string;
    service: {
      name: string;
      duration: string;
      price: number;
      description: string;
    };
    date: Date;
    time: string;
    name: string;
    phone: string;
    email: string;
    notes?: string;
  };
  onNewBooking: () => void;
}

export const BookingConfirmation = ({ bookingData, onNewBooking }: BookingConfirmationProps) => {
  const [emailSent, setEmailSent] = useState(false);

  const handleSendConfirmationEmail = () => {
    // Simulate sending confirmation email
    setTimeout(() => {
      setEmailSent(true);
    }, 1000);
  };

  const handleDownloadConfirmation = () => {
    const confirmationText = `
BOOKING CONFIRMATION
====================

Booking ID: ${bookingData.bookingId}
Date: ${format(bookingData.date, 'EEEE, MMMM do, yyyy')}
Time: ${bookingData.time}

SERVICE DETAILS
===============
Service: ${bookingData.service.name}
Duration: ${bookingData.service.duration}
Price: ₹${bookingData.service.price}
Description: ${bookingData.service.description}

CUSTOMER DETAILS
================
Name: ${bookingData.name}
Phone: ${bookingData.phone}
Email: ${bookingData.email}
${bookingData.notes ? `Notes: ${bookingData.notes}` : ''}

SALON INFORMATION
=================
Feelings Beauty Care
123 Beauty Street, Jamnagar
Phone: +91 98765 43210

Thank you for choosing Feelings Beauty Care!
Please arrive 10 minutes before your appointment time.
    `;

    const blob = new Blob([confirmationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `booking-confirmation-${bookingData.bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleAddToCalendar = () => {
    const startDate = new Date(bookingData.date);
    const [time, period] = bookingData.time.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    let hour24 = hours;
    if (period === 'PM' && hours !== 12) hour24 += 12;
    if (period === 'AM' && hours === 12) hour24 = 0;
    
    startDate.setHours(hour24, minutes, 0, 0);
    
    const endDate = new Date(startDate);
    const durationMinutes = parseInt(bookingData.service.duration.match(/\d+/)?.[0] || "60");
    endDate.setMinutes(endDate.getMinutes() + durationMinutes);

    const formatDateForCalendar = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const calendarEvent = {
      title: `${bookingData.service.name} - Feelings Beauty Care`,
      start: formatDateForCalendar(startDate),
      end: formatDateForCalendar(endDate),
      description: `Booking ID: ${bookingData.bookingId}\nService: ${bookingData.service.name}\nDuration: ${bookingData.service.duration}\nPrice: ₹${bookingData.service.price}`,
      location: '123 Beauty Street, Jamnagar'
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarEvent.title)}&dates=${calendarEvent.start}/${calendarEvent.end}&details=${encodeURIComponent(calendarEvent.description)}&location=${encodeURIComponent(calendarEvent.location)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const handleShareBooking = async () => {
    const shareText = `🎉 Appointment booked at Feelings Beauty Care!\n\nService: ${bookingData.service.name}\nDate: ${format(bookingData.date, 'EEEE, MMMM do, yyyy')}\nTime: ${bookingData.time}\nBooking ID: ${bookingData.bookingId}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Appointment Confirmation',
          text: shareText,
        });
      } catch (err) {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(shareText);
      }
    } else {
      navigator.clipboard.writeText(shareText);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Success Header */}
      <Card className="glass-card border-glass-border text-center">
        <CardContent className="pt-8 pb-8">
          <div className="glass-card w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
            Booking Confirmed Successfully!
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Your appointment has been booked and confirmed. You'll receive a confirmation email shortly.
          </p>
          <Badge className="bg-primary/20 text-primary text-lg px-4 py-2">
            Booking ID: {bookingData.bookingId}
          </Badge>
        </CardContent>
      </Card>

      {/* Booking Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service & Appointment Details */}
        <Card className="glass-card border-glass-border">
          <CardHeader>
            <CardTitle className="font-playfair flex items-center">
              <Calendar className="w-5 h-5 mr-3 text-primary" />
              Appointment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-muted-foreground">Service:</span>
                <div className="text-right">
                  <p className="font-semibold text-primary">{bookingData.service.name}</p>
                  <p className="text-sm text-muted-foreground">{bookingData.service.description}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-semibold">{format(bookingData.date, 'EEEE, MMMM do, yyyy')}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-semibold flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-primary" />
                  {bookingData.time}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-semibold">{bookingData.service.duration}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Price:</span>
                <span className="text-xl font-bold text-primary">₹{bookingData.service.price}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Details */}
        <Card className="glass-card border-glass-border">
          <CardHeader>
            <CardTitle className="font-playfair flex items-center">
              <User className="w-5 h-5 mr-3 text-primary" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-semibold">{bookingData.name}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{bookingData.phone}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{bookingData.email}</span>
              </div>
              
              {bookingData.notes && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Special Requests:</p>
                    <p className="text-sm bg-secondary/20 p-3 rounded-lg">{bookingData.notes}</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Location & Important Information */}
      <Card className="glass-card border-glass-border">
        <CardHeader>
          <CardTitle className="font-playfair flex items-center">
            <MapPin className="w-5 h-5 mr-3 text-primary" />
            Salon Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Location</h4>
              <p className="text-muted-foreground mb-2">Feelings Beauty Care</p>
              <p className="text-muted-foreground mb-4">123 Beauty Street, Jamnagar, Gujarat</p>
              <Button 
                variant="glass" 
                size="sm"
                onClick={() => window.open('https://maps.google.com?q=Feelings+Beauty+Care+Jamnagar', '_blank')}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Important Notes</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Please arrive 10 minutes before your appointment</li>
                <li>• Cancellations must be made 24 hours in advance</li>
                <li>• Bring a valid ID for verification</li>
                <li>• Contact us immediately if you need to reschedule</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button 
          variant="luxury" 
          onClick={handleSendConfirmationEmail}
          disabled={emailSent}
        >
          <Mail className="w-4 h-4 mr-2" />
          {emailSent ? 'Email Sent!' : 'Send Email'}
        </Button>
        
        <Button variant="glass" onClick={handleDownloadConfirmation}>
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        
        <Button variant="glass" onClick={handleAddToCalendar}>
          <Calendar className="w-4 h-4 mr-2" />
          Add to Calendar
        </Button>
        
        <Button variant="glass" onClick={handleShareBooking}>
          <Share2 className="w-4 h-4 mr-2" />
          Share Booking
        </Button>
      </div>

      {/* New Booking Button */}
      <div className="text-center pt-6">
        <Button variant="luxury" size="lg" onClick={onNewBooking}>
          Book Another Appointment
        </Button>
      </div>
    </div>
  );
};