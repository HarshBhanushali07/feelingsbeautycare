import { Scissors, Palette, Crown, Sparkles, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import UnifiedServicesSection from "@/components/UnifiedServicesSection";
import PriceCalculator from "@/components/PriceCalculator";

const Services = () => {
  const serviceCategories = [
    {
      title: "Hair Styling",
      description: "Professional cuts, colors, and treatments",
      icon: Scissors,
      services: [
        { name: "Hair Cut & Styling", price: "₹800-1500", duration: "60-90 min" },
        { name: "Hair Color & Highlights", price: "₹2000-5000", duration: "120-180 min" },
        { name: "Hair Treatment & Spa", price: "₹1200-2500", duration: "90-120 min" },
        { name: "Bridal Hair Styling", price: "₹3000-6000", duration: "120-150 min" },
      ]
    },
    {
      title: "Makeup Services",
      description: "Glamorous looks for every occasion",
      icon: Palette,
      services: [
        { name: "Party Makeup", price: "₹1500-2500", duration: "60-90 min" },
        { name: "Bridal Makeup", price: "₹4000-8000", duration: "120-180 min" },
        { name: "Pre-Wedding Shoot", price: "₹2500-4000", duration: "90-120 min" },
        { name: "Engagement Makeup", price: "₹2000-3500", duration: "90-120 min" },
      ]
    },
    {
      title: "Skin Care",
      description: "Rejuvenating facial treatments",
      icon: Sparkles,
      services: [
        { name: "Classic Facial", price: "₹800-1200", duration: "60 min" },
        { name: "Anti-Aging Facial", price: "₹1500-2500", duration: "90 min" },
        { name: "Hydrating Facial", price: "₹1200-1800", duration: "75 min" },
        { name: "Acne Treatment", price: "₹1000-1600", duration: "60-75 min" },
      ]
    },
    {
      title: "Bridal Packages",
      description: "Complete bridal transformation",
      icon: Crown,
      services: [
        { name: "Bridal Trial", price: "₹2000-3000", duration: "120 min" },
        { name: "Wedding Day Package", price: "₹8000-15000", duration: "4-6 hours" },
        { name: "Mehendi Function", price: "₹3000-5000", duration: "120-180 min" },
        { name: "Reception Look", price: "₹4000-7000", duration: "120-150 min" },
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/10 to-primary/5"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-8">
              <Heart className="h-5 w-5 text-rose-gold" />
              <span className="text-sm font-montserrat font-medium">Our Services</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-foreground mb-6">
              Luxury Beauty
              <span className="text-transparent bg-gradient-to-r from-primary via-rose-gold to-primary bg-clip-text"> Services</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-montserrat mb-8">
              Discover our comprehensive range of premium beauty services designed to enhance your natural beauty and boost your confidence.
            </p>
            <Button variant="luxury" size="lg" asChild>
              <Link to="/booking" state={{ preSelectedService: "facial-treatment" }}>
                Book Free Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <UnifiedServicesSection />
      <PriceCalculator />

      {/* Detailed Services */}
      <section className="py-20 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
              Service Categories & Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing for all our professional beauty services. All prices are inclusive of premium products and expert consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {serviceCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="glass-card rounded-3xl p-8 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-primary to-rose-gold rounded-2xl">
                    <category.icon className="h-8 w-8 text-background" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-playfair font-bold text-foreground">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="flex items-center justify-between p-4 bg-background/50 rounded-2xl hover:bg-background/70 transition-all duration-300">
                      <div className="flex-1">
                        <h4 className="font-montserrat font-semibold text-foreground mb-1">
                          {service.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Duration: {service.duration}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-playfair font-bold text-primary text-lg">
                          {service.price}
                        </p>
                        {category.title === "Bridal Packages" || 
                         service.name === "Bridal Hair Styling" || 
                         service.name === "Bridal Makeup" ? (
                          <Button variant="glass" size="sm" className="mt-2" asChild>
                            <Link to="/contact">
                              Discuss with Team
                            </Link>
                          </Button>
                        ) : (
                          <Button variant="glass" size="sm" className="mt-2" asChild>
                             <Link 
                               to="/booking" 
                               state={{ 
                                 preSelectedService: service.name === "Hair Cut & Styling" ? "hair-cut-style" :
                                                   service.name === "Hair Color & Highlights" ? "hair-coloring" :
                                                   service.name === "Hair Treatment & Spa" ? "hair-spa" :
                                                   service.name === "Party Makeup" ? "party-makeup" :
                                                   service.name === "Pre-Wedding Shoot" ? "photoshoot-makeup" :
                                                   service.name === "Engagement Makeup" ? "party-makeup" :
                                                   service.name === "Classic Facial" ? "facial-treatment" :
                                                   service.name === "Anti-Aging Facial" ? "facial-treatment" :
                                                   service.name === "Hydrating Facial" ? "facial-treatment" :
                                                   service.name === "Acne Treatment" ? "facial-treatment" : "facial-treatment"
                               }}
                            >
                              Book Now
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
              Popular Packages
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Save more with our specially curated beauty packages designed for different occasions and needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Bridal Complete",
                price: "₹25,000",
                originalPrice: "₹30,000",
                features: ["Pre-wedding Trial", "Wedding Day Makeup", "Hair Styling", "Saree Draping", "Touch-ups"],
                popular: true
              },
              {
                name: "Party Ready",
                price: "₹3,500",
                originalPrice: "₹4,200",
                features: ["Party Makeup", "Hair Styling", "Nail Art", "Accessories", "Photography Tips"],
                popular: false
              },
              {
                name: "Monthly Glow",
                price: "₹5,000",
                originalPrice: "₹6,500",
                features: ["3 Facials", "Hair Treatment", "Manicure & Pedicure", "Eyebrow Shaping", "Skin Analysis"],
                popular: false
              }
            ].map((pkg, index) => (
              <div key={index} className={`relative glass-card rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 ${pkg.popular ? 'ring-2 ring-rose-gold scale-105' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-rose-gold text-background px-4 py-2 rounded-full text-sm font-montserrat font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-playfair font-bold text-foreground mb-2">
                    {pkg.name}
                  </h3>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-3xl font-playfair font-bold text-primary">
                      {pkg.price}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      {pkg.originalPrice}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-rose-gold" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={pkg.popular ? "luxury" : "glass"} 
                  className="w-full"
                  size="lg"
                  asChild
                >
                  {pkg.name === "Bridal Complete" ? (
                    <Link to="/contact">
                      Discuss with Team
                    </Link>
                  ) : (
                    <Link 
                      to="/booking" 
                      state={{ 
                        preSelectedService: pkg.name === "Party Ready" ? "party-ready-package" :
                                          pkg.name === "Monthly Glow" ? "monthly-glow-package" : "party-ready-package"
                      }}
                    >
                      Select Package
                    </Link>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Mobile spacing for bottom navigation */}
      <div className="h-20 lg:h-0"></div>
    </div>
  );
};

export default Services;