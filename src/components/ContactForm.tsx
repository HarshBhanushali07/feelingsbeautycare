import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const services = [
  "Hair Styling & Cut",
  "Makeup Services", 
  "Bridal Packages",
  "Facial Treatments",
  "Beauty Courses",
  "Other Services"
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isBusinessHours = () => {
    const now = new Date();
    const hours = now.getHours();
    const day = now.getDay();
    
    // Business hours: Mon-Fri 9-20, Sat 9-21, Sun 10-19
    if (day === 0) return hours >= 10 && hours < 19; // Sunday
    if (day === 6) return hours >= 9 && hours < 21;  // Saturday
    return hours >= 9 && hours < 20; // Monday-Friday
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Generate inquiry ID
    const inquiryId = `INQ${Date.now().toString().slice(-6)}`;
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store inquiry data
    const inquiryData = {
      inquiryId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
      status: 'pending' as const,
      businessHours: isBusinessHours(),
      createdAt: new Date()
    };
    
    localStorage.setItem(`inquiry_${inquiryId}`, JSON.stringify(inquiryData));

    toast({
      title: "Message Sent Successfully! 🎉",
      description: `Inquiry ID: ${inquiryId}. ${isBusinessHours() ? 'We\'ll respond within 2 hours!' : 'We\'ll respond within 24 hours!'}`,
    });

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      message: ""
    });

    setIsSubmitting(false);

    // Redirect to booking page after a delay
    setTimeout(() => {
      window.location.href = '/booking';
    }, 2000);
  };

  const handleQuickService = (serviceName: string) => {
    // Redirect to booking page with pre-selected service
    const serviceId = serviceName === "Hair Styling" ? "haircut-style" :
                     serviceName === "Makeup Services" ? "professional-makeup" :
                     serviceName === "Facial Treatments" ? "facial-treatment" :
                     serviceName === "Bridal Package" ? "bridal-package" : "facial-treatment";
    
    window.location.href = `/booking?service=${serviceId}`;
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-montserrat font-medium text-foreground mb-2">
              First Name *
            </label>
            <Input 
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              placeholder="Your first name" 
              className="rounded-xl"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-montserrat font-medium text-foreground mb-2">
              Last Name *
            </label>
            <Input 
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              placeholder="Your last name" 
              className="rounded-xl"
              required 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-montserrat font-medium text-foreground mb-2">
              Email *
            </label>
            <Input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="your@email.com" 
              className="rounded-xl"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-montserrat font-medium text-foreground mb-2">
              Phone Number *
            </label>
            <Input 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+91 98765 43210" 
              className="rounded-xl"
              required 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-montserrat font-medium text-foreground mb-2">
            Service Interested In
          </label>
          <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service, index) => (
                <SelectItem key={index} value={service.toLowerCase().replace(/\s+/g, '-')}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-montserrat font-medium text-foreground mb-2">
            Message *
          </label>
          <Textarea 
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            placeholder="Tell us about your beauty needs or questions..."
            className="rounded-xl min-h-[120px]"
            required
          />
        </div>

        <Button variant="luxury" size="lg" className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending Message..." : "Send Message"}
        </Button>

        {!isBusinessHours() && (
          <div className="text-center text-sm text-muted-foreground bg-secondary/20 p-3 rounded-xl">
            📅 Outside business hours - We'll respond within 24 hours
          </div>
        )}
      </form>

      {/* Quick Service Buttons */}
      <div className="mt-8 p-6 glass-card rounded-2xl">
        <h4 className="text-lg font-playfair font-bold text-foreground mb-4">
          Quick Service Inquiry
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {services.slice(0, 6).map((service, index) => (
            <Button
              key={index}
              variant="glass"
              size="sm"
              onClick={() => handleQuickService(service)}
              className="text-xs h-auto py-2 px-3"
            >
              {service}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContactForm;