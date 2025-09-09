import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sparkles, Star, Clock, TrendingUp, Heart, ChevronRight } from "lucide-react";
import { services, calculateServicePrice } from "@/data/services";

const UnifiedServicesSection = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Mobile Layout
    return (
      <section className="py-12 bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto px-4">
          {/* Mobile Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-rose-gold/20 text-rose-gold border-0">
              <Sparkles className="h-4 w-4 mr-1" />
              Premium Services
            </Badge>
            
            <h2 className="text-2xl font-playfair font-bold text-foreground mb-3">
              Beauty{" "}
              <span className="text-transparent bg-gradient-to-r from-primary to-rose-gold bg-clip-text">
                Services
              </span>
            </h2>
            
            <p className="text-sm text-muted-foreground font-montserrat">
              Professional beauty care by certified experts
            </p>
          </div>

          {/* Mobile Services List */}
          <div className="space-y-4">
            {services.slice(0, 6).map((service) => (
              <div
                key={service.id}
                className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="flex">
                  {/* Service Image */}
                  <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    {service.popular && (
                      <Badge className="absolute top-1 left-1 bg-primary text-background text-xs px-1 py-0">
                        Hot
                      </Badge>
                    )}
                    {service.discount && service.discount > 0 && (
                      <Badge className="absolute bottom-1 left-1 bg-green-500 text-background text-xs px-1 py-0">
                        -{service.discount}%
                      </Badge>
                    )}
                  </div>

                  {/* Service Info */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-playfair font-bold text-foreground text-lg leading-tight">
                          {service.name}
                        </h3>
                        <p className="text-xs text-muted-foreground font-montserrat mt-1">
                          {service.description}
                        </p>
                      </div>
                      <service.icon className="h-5 w-5 text-rose-gold ml-2 flex-shrink-0" />
                    </div>

                    {/* Service Details */}
                    <div className="flex items-center space-x-3 mb-3 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {service.duration}min
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-500" />
                        {service.rating}
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        {service.isConsultation ? (
                          <div className="text-sm font-montserrat text-muted-foreground">
                            Price varies by requirements
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            {service.discount && service.discount > 0 && (
                              <span className="text-xs text-muted-foreground line-through">
                                ₹{service.price}
                              </span>
                            )}
                            <span className="text-lg font-bold text-primary font-montserrat">
                              ₹{calculateServicePrice(service)}
                            </span>
                          </div>
                        )}
                      </div>
                      <Button 
                        variant="glass" 
                        size="sm"
                        className="h-8 px-3"
                        asChild
                      >
                        {service.isConsultation ? (
                          <Link to="/contact">
                            Discuss
                          </Link>
                        ) : (
                          <Link 
                            to="/booking" 
                            state={{ preSelectedService: service.id }}
                          >
                            Book
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Link>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="text-center mt-8">
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-playfair font-bold text-foreground mb-2">
                Need Help Choosing?
              </h3>
              <p className="text-sm text-muted-foreground mb-4 font-montserrat">
                Get a free consultation with our beauty experts
              </p>
              <Button variant="luxury" className="w-full h-12" asChild>
                <Link to="/booking" state={{ preSelectedService: "facial-treatment" }}>
                  Free Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop Layout
  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          >
            <Sparkles className="h-16 w-16 text-rose-gold" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-5 w-5 text-rose-gold" />
            <span className="text-sm font-montserrat font-medium">Our Premium Services</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-foreground mb-6">
            Luxury Beauty{" "}
            <span className="text-transparent bg-gradient-to-r from-primary to-rose-gold bg-clip-text">
              Services
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-montserrat">
            Experience the finest in beauty care with our comprehensive range of premium services, crafted by certified professionals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="group relative glass-card rounded-2xl overflow-hidden hover:animate-glow transition-all duration-500 hover:transform hover:scale-105"
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-gradient-to-r from-primary to-rose-gold text-background px-3 py-1 rounded-full text-xs font-montserrat font-bold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Trending Badge */}
              {service.trending && (
                <div className="absolute top-4 left-4 z-20">
                  <Badge className="bg-blue-500/20 text-blue-500 border-0 text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                </div>
              )}

              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                
                {/* Floating Icon */}
                <div className="absolute top-4 left-4 glass-card p-3 rounded-xl">
                  <service.icon className="h-6 w-6 text-rose-gold" />
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-playfair font-bold text-foreground mb-2">
                      {service.name}
                    </h3>
                    <p className="text-muted-foreground mb-3 font-montserrat text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    {service.discount && service.discount > 0 ? (
                      <>
                        <span className="text-sm text-muted-foreground line-through">₹{service.price}</span>
                        <span className="text-lg font-montserrat font-bold text-green-600">
                          ₹{calculateServicePrice(service)}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-montserrat font-bold text-primary">
                        {service.isConsultation ? "Custom Quote" : `₹${service.price}`}
                      </span>
                    )}
                  </div>
                   <Button 
                     variant="glass" 
                     size="sm"
                     asChild
                   >
                     {service.isConsultation ? (
                       <Link to="/contact">
                         Discuss with Team
                       </Link>
                     ) : (
                       <Link 
                         to="/booking" 
                         state={{ preSelectedService: service.id }}
                       >
                         Book Now
                       </Link>
                     )}
                   </Button>
                </div>
              </div>

              {/* Hover Shimmer Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-shimmer/20 to-transparent animate-shimmer"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
              Can't decide? Let our experts help!
            </h3>
            <p className="text-muted-foreground mb-6 font-montserrat">
              Book a free consultation and discover the perfect beauty treatments for you.
            </p>
            <Button variant="luxury" size="lg" asChild>
              <Link to="/booking" state={{ preSelectedService: "facial-treatment" }}>
                Free Consultation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnifiedServicesSection;