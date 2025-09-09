import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star, Quote, MessageSquare } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  service: string;
  rating: number;
  review: string;
  date: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    service: "Bridal Makeup",
    rating: 5,
    review: "Urmi did my bridal makeup and it was absolutely perfect! She understood exactly what I wanted and made me feel like a princess on my wedding day. The makeup lasted the entire day and looked flawless in all photos.",
    date: "2 weeks ago"
  },
  {
    id: "2",
    name: "Kavya Patel",
    service: "Hair Styling Course",
    rating: 5,
    review: "I completed the hair styling course and it completely changed my career! The training was hands-on, practical, and Urmi's guidance was exceptional. I'm now working at a top salon in Mumbai.",
    date: "1 month ago"
  },
  {
    id: "3",
    name: "Anita Joshi",
    service: "Facial Treatment",
    rating: 5,
    review: "The facial treatment here is amazing! My skin has never looked better. The products used are high quality and the techniques are professional. I'm a regular customer now!",
    date: "3 days ago"
  },
  {
    id: "4",
    name: "Mehta Family",
    service: "Bridal Package",
    rating: 5,
    review: "For our daughter's wedding, we chose Feelings Beauty Care for the complete bridal package. Every event from mehendi to reception was handled perfectly. Highly recommend!",
    date: "1 week ago"
  },
  {
    id: "5",
    name: "Riya Shah",
    service: "Party Makeup",
    rating: 5,
    review: "Got my party makeup done for a friend's wedding. The look was glamorous yet elegant. Everyone complimented my makeup! Will definitely come back for more occasions.",
    date: "5 days ago"
  },
  {
    id: "6",
    name: "Neha Gupta",
    service: "Complete Beauty Course",
    rating: 5,
    review: "Just finished the 6-month complete beauty course. The curriculum is comprehensive and the practical training is excellent. I feel confident to start my own beauty business now!",
    date: "2 months ago"
  }
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const handleShareReview = (testimonial: Testimonial) => {
    const message = `⭐ Check out this review for Feelings Beauty Care!

"${testimonial.review}"

- ${testimonial.name} (${testimonial.service})
${testimonial.rating}/5 stars

Experience the same quality service! Contact us today 🌟`;

    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-rose-gold/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            What Our{" "}
            <span className="text-transparent bg-gradient-to-r from-primary to-rose-gold bg-clip-text">
              Clients Say
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-montserrat">
            Real stories from our satisfied clients who trusted us with their beauty needs
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <Card className="glass-card border-glass-border mb-8 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="relative">
                <Quote className="absolute -top-4 -left-4 h-12 w-12 text-rose-gold/30" />
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-playfair font-bold text-foreground">
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {testimonials[currentIndex].service} • {testimonials[currentIndex].date}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < testimonials[currentIndex].rating ? 'fill-rose-gold text-rose-gold' : 'text-muted-foreground'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <blockquote className="text-lg text-foreground leading-relaxed mb-6 font-montserrat">
                  "{testimonials[currentIndex].review}"
                </blockquote>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Verified Customer Review
                  </div>
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => handleShareReview(testimonials[currentIndex])}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Share Review
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="glass"
              size="sm"
              onClick={prevTestimonial}
              className="p-3"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-rose-gold scale-125' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="glass"
              size="sm"
              onClick={nextTestimonial}
              className="p-3"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Testimonial Grid Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <Card 
                key={testimonial.id}
                className={`glass-card border-glass-border cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  index === currentIndex % 3 ? 'ring-2 ring-rose-gold' : ''
                }`}
                onClick={() => goToTestimonial(testimonials.findIndex(t => t.id === testimonial.id))}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-montserrat font-semibold text-sm text-foreground">
                      {testimonial.name}
                    </h4>
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-rose-gold text-rose-gold" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {testimonial.service}
                  </p>
                  <p className="text-xs text-foreground line-clamp-2">
                    "{testimonial.review}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-playfair font-bold text-foreground mb-2">
                Ready to Experience the Same Quality?
              </h3>
              <p className="text-muted-foreground mb-4">
                Join hundreds of satisfied customers who trust us with their beauty needs
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  variant="luxury"
                  asChild
                >
                  <Link to="/booking">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Book Your Appointment
                  </Link>
                </Button>
                <Button 
                  variant="glass"
                  onClick={() => window.open('https://wa.me/919876543210?text=I would like to leave a review for Feelings Beauty Care.', '_blank')}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Leave a Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;