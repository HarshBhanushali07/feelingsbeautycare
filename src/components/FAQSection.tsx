import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, MessageSquare, Phone, HelpCircle } from "lucide-react";

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  popular?: boolean;
}

const faqs: FAQ[] = [
  {
    id: "1",
    category: "Services",
    question: "What services do you offer?",
    answer: "We offer a comprehensive range of beauty services including bridal makeup, party makeup, hair styling, facial treatments, nail art, eyebrow threading, and complete beauty courses. We also provide specialized bridal packages for weddings.",
    popular: true
  },
  {
    id: "2",
    category: "Booking",
    question: "How can I book an appointment?",
    answer: "You can book an appointment through our website by clicking the 'Book Now' button on any service. Select your preferred service, date, and time, then complete the booking form. You'll receive instant confirmation with your booking details.",
    popular: true
  },
  {
    id: "3",
    category: "Pricing",
    question: "What are your service charges?",
    answer: "Our pricing varies by service. Hair cuts start from ₹800, party makeup from ₹1500, bridal makeup from ₹4000, and courses from ₹10,000. We offer package deals for multiple services. Please contact us for detailed pricing.",
    popular: true
  },
  {
    id: "4",
    category: "Courses",
    question: "Do you provide beauty courses and certifications?",
    answer: "Yes! We offer professional beauty courses including basic makeup, advanced bridal makeup, hair styling, nail art, and skincare treatments. All courses include hands-on training and industry-recognized certification.",
    popular: true
  },
  {
    id: "5",
    category: "Location",
    question: "Where are you located?",
    answer: "We are located at 123 Beauty Plaza, Near City Mall, Jamnagar, Gujarat - 361001. We have ample parking space and the salon is easily accessible by public transport.",
  },
  {
    id: "6",
    category: "Services",
    question: "Do you use professional grade products?",
    answer: "Absolutely! We use only premium, professional-grade cosmetics and beauty products from renowned brands like MAC, Lakme, L'Oreal Professional, and other trusted beauty brands.",
  },
  {
    id: "7",
    category: "Booking",
    question: "Can I reschedule or cancel my appointment?",
    answer: "Yes, you can reschedule or cancel your appointment up to 24 hours in advance. For bridal bookings, we require 48 hours notice. Please contact us via phone at +91 98765 43210 or through our booking system to make changes.",
  },
  {
    id: "8",
    category: "Pricing",
    question: "Do you offer any discounts or packages?",
    answer: "We offer various packages like bridal complete, party ready, and monthly glow packages that provide significant savings. We also have special discounts for students and bulk bookings for events.",
  },
  {
    id: "9",
    category: "Courses",
    question: "What is the duration of beauty courses?",
    answer: "Course duration varies: Basic courses are 1-2 months, advanced courses are 2-3 months, and our complete beauty professional course is 6 months. We offer flexible timings including weekend batches.",
  },
  {
    id: "10",
    category: "Services",
    question: "Do you provide home services?",
    answer: "Yes, we provide home services for bridal makeup, party makeup, and hair styling within Jamnagar city. Additional charges apply for home services. Please contact us to check availability in your area.",
  }
];

const categories = ["All", "Services", "Booking", "Pricing", "Courses", "Location"];

const FAQSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const filteredFAQs = selectedCategory === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const handleContactSupport = () => {
    const message = `Hi! I have a question that's not covered in your FAQ section. Can you please help me?`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background to-secondary/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-8">
            <HelpCircle className="h-5 w-5 text-rose-gold" />
            <span className="text-sm font-montserrat font-medium">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Frequently Asked{" "}
            <span className="text-transparent bg-gradient-to-r from-primary to-rose-gold bg-clip-text">
              Questions
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-montserrat">
            Find answers to common questions about our services, booking process, and beauty courses
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "luxury" : "glass"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Popular FAQs Badge */}
        {selectedCategory === "All" && (
          <div className="mb-8">
            <h3 className="text-xl font-playfair font-bold text-foreground mb-4 text-center">
              📌 Most Asked Questions
            </h3>
          </div>
        )}

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.map((faq) => (
            <Card 
              key={faq.id} 
              className={`glass-card border-glass-border transition-all duration-300 ${
                expandedFAQ === faq.id ? 'shadow-xl' : 'hover:shadow-lg'
              } ${faq.popular && selectedCategory === "All" ? 'ring-2 ring-rose-gold/30' : ''}`}
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-secondary/5 transition-colors duration-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">
                        {faq.category}
                      </span>
                      {faq.popular && selectedCategory === "All" && (
                        <span className="text-xs bg-rose-gold/20 text-rose-gold px-2 py-1 rounded-full font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-montserrat font-semibold text-foreground">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="ml-4">
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-primary" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </button>
                
                {expandedFAQ === faq.id && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-border pt-4">
                      <p className="text-muted-foreground leading-relaxed font-montserrat">
                        {faq.answer}
                      </p>
                      <div className="mt-4 flex items-center space-x-3">
                        <span className="text-sm text-muted-foreground">Was this helpful?</span>
                        <Button
                          variant="glass"
                          size="sm"
                          onClick={handleContactSupport}
                        >
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Ask More
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Support Section */}
        <div className="mt-16 text-center">
          <Card className="glass-card border-glass-border max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
                Still Have Questions?
              </h3>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? Our friendly team is here to help you with any questions about our services or courses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="luxury"
                  onClick={() => window.location.href = '/booking'}
                  className="flex-1 sm:flex-none"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Book Appointment
                </Button>
                <Button 
                  variant="glass"
                  onClick={() => window.open('tel:+919876543210', '_self')}
                  className="flex-1 sm:flex-none"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us Now
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Available: Monday - Saturday, 9 AM - 8 PM
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;