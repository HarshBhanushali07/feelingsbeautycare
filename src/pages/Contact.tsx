import { Calendar, MessageCircle, MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  const handleContactAction = (info: any, index: number) => {
    switch(index) {
      case 0: // Phone
        window.open('tel:+919876543210', '_self');
        break;
      case 1: // Book Appointment
        window.location.href = '/booking';
        break;
      case 2: // Email
        window.open('mailto:info@feelingsbeauty.com?subject=Beauty Services Inquiry', '_self');
        break;
      case 3: // Location
        window.open('https://maps.google.com/?q=Beauty Plaza, Jamnagar, Gujarat', '_blank');
        break;
    }
  };
  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 98765 43210", "+91 87654 32109"],
      action: "Call Now"
    },
    {
      icon: Calendar,
      title: "Book Appointment",
      details: ["Online Booking Available"],
      action: "Book Now"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@feelingsbeauty.com", "bookings@feelingsbeauty.com"],
      action: "Send Email"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Beauty Plaza, Near City Mall", "Jamnagar, Gujarat - 361001"],
      action: "Get Directions"
    }
  ];

  const businessHours = [
    { day: "Monday - Friday", time: "9:00 AM - 8:00 PM" },
    { day: "Saturday", time: "9:00 AM - 9:00 PM" },
    { day: "Sunday", time: "10:00 AM - 7:00 PM" },
  ];

  const services = [
    "Hair Styling & Cut",
    "Makeup Services", 
    "Bridal Packages",
    "Facial Treatments",
    "Beauty Courses",
    "Other Services"
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/10 to-primary/5"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-8">
              <MessageCircle className="h-5 w-5 text-rose-gold" />
              <span className="text-sm font-montserrat font-medium">Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-foreground mb-6">
              Let's Connect &
              <span className="text-transparent bg-gradient-to-r from-primary via-rose-gold to-primary bg-clip-text"> Create Magic</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-montserrat">
              Ready to transform your look or start your beauty career? We're here to help you every step of the way. Contact us today!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, index) => (
              <div key={index} className="glass-card rounded-3xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="p-4 bg-gradient-to-br from-primary to-rose-gold rounded-2xl inline-block mb-4">
                  <info.icon className="h-8 w-8 text-background" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-foreground mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1 mb-4">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-muted-foreground text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
                <Button 
                  variant="glass" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleContactAction(info, index)}
                >
                  {info.action}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass-card rounded-3xl p-8">
              <h2 className="text-3xl font-playfair font-bold text-foreground mb-6">
                Send us a Message
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <ContactForm />
            </div>

            {/* Business Hours & Map */}
            <div className="space-y-8">
              {/* Business Hours */}
              <div className="glass-card rounded-3xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="h-8 w-8 text-rose-gold" />
                  <h3 className="text-2xl font-playfair font-bold text-foreground">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-4">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-border/50 last:border-b-0">
                      <span className="font-montserrat font-medium text-foreground">
                        {schedule.day}
                      </span>
                      <span className="text-primary font-medium">
                        {schedule.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="glass-card rounded-3xl p-8">
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-6">
                  Find Us Here
                </h3>
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-rose-gold/10 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-rose-gold mx-auto mb-4" />
                    <p className="text-lg font-montserrat font-medium text-foreground">
                      Interactive Map Coming Soon
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      123 Beauty Plaza, Near City Mall<br />
                      Jamnagar, Gujarat - 361001
                    </p>
                    <Button 
                      variant="luxury" 
                      size="sm" 
                      className="mt-4"
                      onClick={() => window.open('https://maps.google.com/?q=Beauty Plaza, Jamnagar, Gujarat', '_blank')}
                    >
                      Get Directions
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media & Newsletter */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Social Media */}
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-playfair font-bold text-foreground mb-6">
                Follow Our Beauty Journey
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Stay updated with our latest work, beauty tips, and behind-the-scenes content on social media.
              </p>
              <div className="flex justify-center lg:justify-start space-x-4">
                  {[
                    { icon: Instagram, name: "Instagram", followers: "10K+", url: "https://instagram.com/feelingsbeauty" },
                    { icon: Facebook, name: "Facebook", followers: "5K+", url: "https://facebook.com/feelingsbeauty" },
                    { icon: Youtube, name: "YouTube", followers: "2K+", url: "https://youtube.com/@feelingsbeauty" },
                  ].map((social, index) => (
                    <Button
                      key={index}
                      variant="glass"
                      size="lg"
                      className="flex flex-col items-center p-6 h-auto"
                      onClick={() => window.open(social.url, '_blank')}
                    >
                      <social.icon className="h-8 w-8 mb-2" />
                      <span className="text-sm font-medium">{social.name}</span>
                      <span className="text-xs text-muted-foreground">{social.followers}</span>
                    </Button>
                  ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="glass-card rounded-3xl p-8">
              <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
                Beauty Tips Newsletter
              </h3>
              <p className="text-muted-foreground mb-6">
                Get weekly beauty tips, exclusive offers, and be the first to know about our new services and courses.
              </p>
              <div className="space-y-4">
                <Input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="rounded-xl"
                />
                <Button 
                  variant="luxury" 
                  className="w-full"
                  onClick={() => {
                    const email = (document.querySelector('input[type="email"]') as HTMLInputElement)?.value;
                    if (email) {
                      // Store newsletter signup
                      localStorage.setItem(`newsletter_${email}`, JSON.stringify({
                        email,
                        subscribed: true,
                        date: new Date().toISOString()
                      }));
                      window.location.href = '/booking';
                    }
                  }}
                >
                  Subscribe Now
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;