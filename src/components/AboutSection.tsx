import { Award, Users, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  const stats = [
    {
      icon: Users,
      number: "5000+",
      label: "Happy Clients",
      color: "text-rose-gold",
    },
    {
      icon: Award,
      number: "10+",
      label: "Years Experience",
      color: "text-primary",
    },
    {
      icon: Clock,
      number: "500+",
      label: "Students Trained",
      color: "text-rose-gold",
    },
    {
      icon: Heart,
      number: "4.9★",
      label: "Google Rating",
      color: "text-primary",
    },
  ];

  const values = [
    {
      title: "Luxury Experience",
      description: "Premium services in an elegant, comfortable environment designed for your relaxation and beauty transformation.",
      icon: "✨",
    },
    {
      title: "Personalized Care",
      description: "Every client receives individual attention with customized treatments tailored to their unique beauty needs.",
      icon: "💎",
    },
    {
      title: "Certified Professionals",
      description: "Our team consists of trained and certified beauty experts committed to delivering exceptional results.",
      icon: "🏆",
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, hsl(var(--rose-gold)) 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-6">
            <Heart className="h-5 w-5 text-rose-gold" />
            <span className="text-sm font-montserrat font-medium">About Feelings Beauty Care</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-foreground mb-6">
            Your Beauty,{" "}
            <span className="text-transparent bg-gradient-to-r from-primary to-rose-gold bg-clip-text">
              Our Passion
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-montserrat leading-relaxed">
            Since 2010, Feelings Beauty Care has been Jamnagar's premier destination for luxury beauty services. 
            We combine traditional techniques with modern innovations to create unforgettable beauty experiences 
            that enhance your natural radiance and boost your confidence.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-card p-6 rounded-2xl text-center hover:animate-glow transition-all duration-300 group"
            >
              <div className="flex justify-center mb-4">
                <div className="glass-card p-3 rounded-xl group-hover:animate-float">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-playfair font-bold text-foreground mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground font-montserrat">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-playfair font-bold text-center text-foreground mb-12">
            Why Choose Feelings Beauty Care?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="glass-card p-8 rounded-2xl text-center hover:animate-glow transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:animate-float">
                  {value.icon}
                </div>
                <h4 className="text-xl font-playfair font-bold text-foreground mb-4">
                  {value.title}
                </h4>
                <p className="text-muted-foreground font-montserrat leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="glass-card p-8 lg:p-12 rounded-2xl max-w-4xl mx-auto text-center">
          <div className="text-4xl mb-6">🌺</div>
          <h3 className="text-2xl md:text-3xl font-playfair font-bold text-foreground mb-6">
            Our Mission
          </h3>
          <p className="text-lg text-muted-foreground font-montserrat leading-relaxed mb-8">
            "To empower every individual with confidence and beauty through our premium services, 
            expert training programs, and personalized care. We believe that true beauty comes from 
            feeling comfortable in your own skin, and we're here to help you achieve that perfect look 
            and feeling."
          </p>
          <Button variant="luxury" size="lg">
            Meet Our Team
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;