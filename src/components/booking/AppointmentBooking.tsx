import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar, Clock, User, Phone, Mail, CreditCard, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { DatePicker } from "./DatePicker";
import { ServiceSelector } from "./ServiceSelector";
import { TimeSlotSelector } from "./TimeSlotSelector";
import { BookingConfirmation } from "./BookingConfirmation";

const bookingSchema = z.object({
  service: z.string().min(1, "Please select a service"),
  date: z.date(),
  time: z.string().min(1, "Please select a time slot"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),  
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  category: string;
}

const SERVICES: Service[] = [
  // Hair Services
  {
    id: "haircut-style",
    name: "Hair Cut & Style",
    duration: "60 min",
    price: 800,
    description: "Professional haircut with styling",
    category: "Hair"
  },
  {
    id: "hair-color",
    name: "Hair Coloring",
    duration: "2 hours",
    price: 3500,
    description: "Hair coloring with premium products",
    category: "Hair"
  },
  {
    id: "hair-treatment",
    name: "Hair Treatment & Spa",
    duration: "90 min",
    price: 1800,
    description: "Deep conditioning and hair spa treatment",
    category: "Hair"
  },
  {
    id: "bridal-hair",
    name: "Bridal Hair Styling",
    duration: "2 hours",
    price: 4500,
    description: "Professional bridal hair styling",
    category: "Hair"
  },
  
  // Makeup Services
  {
    id: "professional-makeup",
    name: "Professional Makeup",
    duration: "90 min",
    price: 2000,
    description: "Party and event makeup by certified artists",
    category: "Makeup"
  },
  {
    id: "bridal-makeup",
    name: "Bridal Makeup",
    duration: "3 hours",
    price: 8000,
    description: "Complete bridal makeup package",
    category: "Makeup"
  },
  {
    id: "photoshoot-makeup",
    name: "Photoshoot Makeup",
    duration: "2 hours",
    price: 3000,
    description: "HD makeup for professional photography",
    category: "Makeup"
  },
  {
    id: "engagement-makeup",
    name: "Engagement Makeup",
    duration: "90 min",
    price: 2800,
    description: "Special makeup for engagement ceremonies",
    category: "Makeup"
  },

  // Skincare Services
  {
    id: "facial-treatment",
    name: "Facial Treatment",
    duration: "90 min",
    price: 1500,
    description: "Deep cleansing facial treatment",
    category: "Skincare"
  },
  {
    id: "anti-aging-facial",
    name: "Anti-Aging Facial",
    duration: "90 min",
    price: 2000,
    description: "Advanced anti-aging treatment",
    category: "Skincare"
  },
  {
    id: "hydrating-facial",
    name: "Hydrating Facial",
    duration: "75 min",
    price: 1500,
    description: "Deep hydration facial treatment",
    category: "Skincare"
  },
  {
    id: "acne-treatment",
    name: "Acne Treatment",
    duration: "60 min",
    price: 1300,
    description: "Specialized acne clearing treatment",
    category: "Skincare"
  },

  // Nail Services
  {
    id: "nail-art",
    name: "Nail Art & Care",
    duration: "45 min",
    price: 1200,
    description: "Professional nail art and manicure",
    category: "Nails"
  },
  {
    id: "manicure-pedicure",
    name: "Manicure & Pedicure",
    duration: "90 min",
    price: 1500,
    description: "Complete nail care package",
    category: "Nails"
  },

  // Beauty Services
  {
    id: "eyebrow-threading",
    name: "Eyebrow Threading",
    duration: "30 min",
    price: 400,
    description: "Precise eyebrow shaping",
    category: "Beauty"
  },

  // Bridal Packages
  {
    id: "bridal-package",
    name: "Bridal Package Complete",
    duration: "4 hours",
    price: 15000,
    description: "Complete bridal transformation package",
    category: "Bridal"
  },
  {
    id: "bridal-trial",
    name: "Bridal Trial",
    duration: "2 hours",
    price: 2500,
    description: "Pre-wedding makeup and hair trial",
    category: "Bridal"
  },
  {
    id: "mehendi-function",
    name: "Mehendi Function",
    duration: "3 hours",
    price: 4000,
    description: "Mehendi ceremony makeup and styling",
    category: "Bridal"
  },
  {
    id: "reception-look",
    name: "Reception Look",
    duration: "2.5 hours",
    price: 5500,
    description: "Wedding reception styling",
    category: "Bridal"
  },

  // Package Services
  {
    id: "party-ready-package",
    name: "Party Ready Package",
    duration: "2 hours",
    price: 3500,
    description: "Complete party look with makeup, hair styling and nail art",
    category: "Package"
  },
  {
    id: "monthly-glow-package",
    name: "Monthly Glow Package",
    duration: "Multiple sessions",
    price: 5000,
    description: "Monthly beauty maintenance package",
    category: "Package"
  }
];

const TIME_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM"
];

interface AppointmentBookingProps {
  preSelectedService?: string;
  preSelectedTime?: string;
}

export const AppointmentBooking = ({ preSelectedService, preSelectedTime }: AppointmentBookingProps = {}) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState<string>("");

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: preSelectedService || "",
      notes: "",
    },
  });

  // Auto-select service if preSelectedService is provided
  useEffect(() => {
    if (preSelectedService) {
      const service = SERVICES.find(s => s.id === preSelectedService);
      if (service) {
        form.setValue('service', service.id);
        setSelectedService(service);
      }
    }
  }, [preSelectedService, form]);

  const onSubmit = async (data: BookingFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const id = `BC${Date.now().toString().slice(-6)}`;
      const bookingData = {
        bookingId: id,
        service: selectedService,
        date: data.date,
        time: data.time,
        name: data.name,
        phone: data.phone,
        email: data.email,
        notes: data.notes,
        status: 'confirmed' as const,
        createdAt: new Date()
      };
      
      // Store booking in localStorage
      localStorage.setItem(`booking_${id}`, JSON.stringify(bookingData));
      
      setBookingId(id);
      setIsSubmitted(true);
      
      // Simulate sending confirmation email
      setTimeout(() => {
        toast({
          title: "Confirmation Email Sent!",
          description: `Booking confirmation sent to ${data.email}`,
        });
      }, 3000);
      
      toast({
        title: "Booking Confirmed Successfully!",
        description: `Your appointment has been booked. Booking ID: ${id}`,
      });
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (isSubmitted) {
    const bookingData = {
      bookingId,
      service: selectedService!,
      date: form.getValues('date'),
      time: form.getValues('time'),
      name: form.getValues('name'),
      phone: form.getValues('phone'),
      email: form.getValues('email'),
      notes: form.getValues('notes')
    };

    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="glass" 
            onClick={() => {
              setStep(1);
              setIsSubmitted(false);
              form.reset();
              setSelectedService(null);
            }}
          >
            ← Book Another Appointment
          </Button>
        </div>
        <BookingConfirmation 
          bookingData={bookingData}
          onNewBooking={() => {
            setStep(1);
            setIsSubmitted(false);
            form.reset();
            setSelectedService(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center glass-card border-2 transition-all duration-300 ${
                  step >= stepNumber
                    ? 'border-rose-gold text-rose-gold'
                    : 'border-glass-border text-muted-foreground'
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < 4 && (
                <div
                  className={`w-12 h-0.5 transition-all duration-300 ${
                    step > stepNumber ? 'bg-rose-gold' : 'bg-glass-border'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <span className="text-sm text-muted-foreground font-montserrat">
            Step {step} of 4
          </span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Service Selection */}
          {step === 1 && (
            <Card className="glass-card border-glass-border">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl flex items-center">
                  <User className="w-6 h-6 mr-3 text-rose-gold" />
                  Select Service
                </CardTitle>
                <CardDescription>
                  Choose the service you'd like to book
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ServiceSelector
                          services={SERVICES}
                          selectedService={field.value}
                          onServiceSelect={(service) => {
                            field.onChange(service.id);
                            setSelectedService(service);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end mt-6">
                  <Button
                    type="button"
                    variant="luxury"
                    onClick={nextStep}
                    disabled={!form.watch('service')}
                  >
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Date & Time Selection */}
          {step === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle className="font-playfair text-xl flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-rose-gold" />
                    Select Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <DatePicker
                            date={field.value}
                            onDateSelect={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle className="font-playfair text-xl flex items-center">
                    <Clock className="w-5 h-5 mr-3 text-rose-gold" />
                    Select Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TimeSlotSelector
                            timeSlots={TIME_SLOTS}
                            selectedTime={field.value}
                            onTimeSelect={field.onChange}
                            selectedDate={form.watch('date')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="lg:col-span-2 flex justify-between">
                <Button type="button" variant="glass" onClick={prevStep}>
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="luxury"
                  onClick={nextStep}
                  disabled={!form.watch('date') || !form.watch('time')}
                >
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Personal Information */}
          {step === 3 && (
            <Card className="glass-card border-glass-border">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl flex items-center">
                  <User className="w-6 h-6 mr-3 text-rose-gold" />
                  Your Information
                </CardTitle>
                <CardDescription>
                  Please provide your contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 98765 43210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Requests (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any special requests or notes..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="glass" onClick={prevStep}>
                    Previous
                  </Button>
                  <Button
                    type="button"
                    variant="luxury"
                    onClick={nextStep}
                    disabled={!form.formState.isValid}
                  >
                    Review Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Review & Confirm */}
          {step === 4 && (
            <Card className="glass-card border-glass-border">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl flex items-center">
                  <CreditCard className="w-6 h-6 mr-3 text-rose-gold" />
                  Review Your Booking
                </CardTitle>
                <CardDescription>
                  Please review your appointment details before confirming
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="glass-card p-6 rounded-xl space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Service Details</h4>
                      <p className="text-rose-gold font-semibold">{selectedService?.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedService?.description}</p>
                      <p className="text-sm text-muted-foreground mt-1">Duration: {selectedService?.duration}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Date & Time</h4>
                      <p className="text-foreground">
                        {form.getValues('date') ? format(form.getValues('date'), 'EEEE, MMMM do, yyyy') : ''}
                      </p>
                      <p className="text-foreground">{form.getValues('time')}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Contact Information</h4>
                      <p className="text-foreground">{form.getValues('name')}</p>
                      <p className="text-sm text-muted-foreground">{form.getValues('phone')}</p>
                      <p className="text-sm text-muted-foreground">{form.getValues('email')}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Price</h4>
                      <p className="text-2xl font-bold text-rose-gold">₹{selectedService?.price}</p>
                      <p className="text-sm text-muted-foreground">Pay at salon</p>
                    </div>
                  </div>
                  
                  {form.getValues('notes') && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Special Requests</h4>
                      <p className="text-muted-foreground">{form.getValues('notes')}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="glass" onClick={prevStep}>
                    Previous
                  </Button>
                  <Button
                    type="submit"
                    variant="luxury"
                    className="animate-glow"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Confirming..." : "Confirm Booking"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </Form>
    </div>
  );
};