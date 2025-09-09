import { useState, useEffect } from "react";
import { Sparkles, Star, Heart, Crown, Play, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import heroSalon from "@/assets/hero-salon.jpg";

const UnifiedHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();

  const heroSlides = [
    {
      title: "Feel the Care.",
      subtitle: "Flaunt the Feelings.",
      description: "Experience luxury beauty care at Jamnagar's most premium salon.",
      cta: "Book Your Appointment",
      ctaLink: "/booking"
    },
    {
      title: "Learn Beauty.",
      subtitle: "Master the Art.",
      description: "Professional beauty courses with certified expert training.",
      cta: "Explore Courses",
      ctaLink: "/courses"
    },
    {
      title: "Bridal Perfection.",
      subtitle: "Your Special Day.",
      description: "Complete bridal transformation packages for your dream wedding.",
      cta: "Bridal Packages",
      ctaLink: "/booking"
    }
  ];

  // Auto-slide for mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isMobile, heroSlides.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  if (isMobile) {
    // Mobile Layout
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Parallax Effect */}
        <div className="absolute inset-0">
          <img
            src={heroSalon}
            alt="Luxury salon interior"
            className="w-full h-full object-cover"
            style={{ transform: `translateY(${currentSlide * -10}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-primary/30"></div>
        </div>

        {/* Floating Elements Optimized for Mobile */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`absolute animate-float opacity-40 ${
                i % 2 === 0 ? "text-rose-gold" : "text-secondary"
              }`}
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 6}s`,
                fontSize: "24px",
              }}
            >
              {i % 3 === 0 ? (
                <Heart className="opacity-60" />
              ) : i % 3 === 1 ? (
                <Sparkles className="opacity-60" />
              ) : (
                <Star className="opacity-60" />
              )}
            </div>
          ))}
        </div>

        {/* Mobile-Optimized Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-lg mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 glass-card px-3 py-2 rounded-full mb-6">
              <Crown className="h-4 w-4 text-rose-gold" />
              <span className="text-xs font-montserrat font-medium">
                Premium Beauty Since 2010
              </span>
            </div>

            {/* Dynamic Content */}
            <div className="space-y-6 transition-all duration-500">
              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-foreground">
                {heroSlides[currentSlide].title}{" "}
                <span className="text-transparent bg-gradient-to-r from-primary to-rose-gold bg-clip-text block mt-2">
                  {heroSlides[currentSlide].subtitle}
                </span>
              </h1>

              <p className="text-base text-muted-foreground font-montserrat leading-relaxed">
                {heroSlides[currentSlide].description}
              </p>

              {/* Mobile CTA */}
              <div className="space-y-4">
                <Button 
                  variant="luxury" 
                  size="lg" 
                  className="w-full h-14 text-lg"
                  asChild
                >
                  <Link to={heroSlides[currentSlide].ctaLink}>
                    {heroSlides[currentSlide].cta}
                  </Link>
                </Button>
                
                <Button 
                  variant="glass" 
                  size="sm"
                  className="w-full"
                  asChild
                >
                  <Link to="/gallery">
                    <Play className="w-4 h-4 mr-2" />
                    View Our Work
                  </Link>
                </Button>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-primary w-6' 
                      : 'bg-muted-foreground/40'
                  }`}
                />
              ))}
            </div>

            {/* Mobile Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              {[
                { number: "5000+", label: "Clients", icon: Heart },
                { number: "4.9★", label: "Rating", icon: Star },
                { number: "500+", label: "Students", icon: Crown },
              ].map((stat, index) => (
                <div key={index} className="glass-card p-4 rounded-xl text-center">
                  <stat.icon className="h-5 w-5 text-rose-gold mx-auto mb-2" />
                  <div className="text-lg font-playfair font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-xs text-muted-foreground font-montserrat">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-8 glass-card rounded-full flex justify-center">
            <ArrowDown className="w-4 h-4 text-primary mt-2" />
          </div>
        </div>
      </section>
    );
  }

  // Desktop Layout
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroSalon}
          alt="Luxury salon interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/60 to-primary/20"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating petals/sparkles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`absolute animate-petal ${
              i % 2 === 0 ? "text-rose-gold" : "text-secondary"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              fontSize: `${Math.random() * 20 + 20}px`,
            }}
          >
            {i % 3 === 0 ? (
              <Heart className="opacity-60" />
            ) : i % 3 === 1 ? (
              <Sparkles className="opacity-60" />
            ) : (
              <Star className="opacity-60" />
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-8 animate-fade-in-up">
            <Crown className="h-5 w-5 text-rose-gold" />
            <span className="text-sm font-montserrat font-medium text-foreground">
              Premium Beauty Experience Since 2010
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-foreground mb-6 animate-fade-in-up">
            Feel the Care.{" "}
            <span className="text-transparent bg-gradient-to-r from-primary via-rose-gold to-primary bg-clip-text animate-glow">
              Flaunt the Feelings.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-montserrat animate-fade-in-up">
            Experience luxury beauty care at Jamnagar's most premium salon. From bridal makeovers to professional beauty courses, we craft perfection with every touch.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up">
            <Button 
              variant="luxury" 
              size="lg" 
              className="text-lg px-8 py-6"
              asChild
            >
              <Link to="/booking">Book Your Appointment</Link>
            </Button>
            <Button 
              variant="glass" 
              size="lg" 
              className="text-lg px-8 py-6"
              asChild
            >
              <Link to="/course-enrollment">Explore Courses</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
            {[
              { number: "5000+", label: "Happy Clients", icon: Heart },
              { number: "4.9★", label: "Google Rating", icon: Star },
              { number: "500+", label: "Students Trained", icon: Crown },
            ].map((stat, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl text-center animate-fade-in-up hover:animate-glow transition-all duration-300">
                <stat.icon className="h-8 w-8 text-rose-gold mx-auto mb-3" />
                <div className="text-2xl font-playfair font-bold text-primary mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-montserrat">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 glass-card rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-primary to-rose-gold rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default UnifiedHeroSection;