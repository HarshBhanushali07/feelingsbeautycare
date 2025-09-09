import { Heart, Users, Award, Star, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import AboutSection from "@/components/AboutSection";

const About = () => {
  const team = [
    {
      name: "Priya Sharma",
      role: "Founder & Master Stylist",
      experience: "15+ years",
      speciality: "Bridal Makeup & Hair Styling",
      image: "/api/placeholder/300/400",
    },
    {
      name: "Neha Patel",
      role: "Senior Beauty Expert",
      experience: "12+ years", 
      speciality: "Skin Care & Facial Treatments",
      image: "/api/placeholder/300/400",
    },
    {
      name: "Kavita Singh",
      role: "Course Director",
      experience: "10+ years",
      speciality: "Beauty Education & Training",
      image: "/api/placeholder/300/400",
    },
  ];

  const achievements = [
    { icon: Award, title: "Best Salon Award 2023", description: "Gujarat Beauty Excellence" },
    { icon: Star, title: "4.9/5 Rating", description: "Based on 1000+ reviews" },
    { icon: Users, title: "5000+ Happy Clients", description: "Served since 2010" },
    { icon: Crown, title: "Premium Certified", description: "International Standards" },
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
              <span className="text-sm font-montserrat font-medium">Our Story</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-foreground mb-6">
              Where Beauty Meets
              <span className="text-transparent bg-gradient-to-r from-primary via-rose-gold to-primary bg-clip-text"> Excellence</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-montserrat">
              Founded in 2010 with a vision to revolutionize beauty care in Jamnagar, Feelings Beauty Care has become the most trusted name in luxury beauty services and professional education.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
              Meet Our Expert Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our passionate team of beauty professionals brings years of expertise and dedication to make you look and feel your best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="glass-card rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-playfair font-bold text-foreground mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary font-montserrat font-medium mb-1">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {member.experience} Experience
                    </p>
                    <p className="text-sm text-rose-gold">
                      {member.speciality}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
              Our Achievements
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Recognition and trust from our clients and industry peers drives us to maintain the highest standards of beauty care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl text-center hover:animate-glow transition-all duration-300">
                <achievement.icon className="h-12 w-12 text-rose-gold mx-auto mb-4" />
                <h3 className="text-lg font-playfair font-bold text-foreground mb-2">
                  {achievement.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-rose-gold/5">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <Sparkles className="h-16 w-16 text-rose-gold mx-auto mb-6" />
            <h2 className="text-3xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients who have made Feelings Beauty Care their trusted beauty destination.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button variant="luxury" size="lg" className="text-lg px-8 py-6">
                Book Your Appointment
              </Button>
              <Button variant="glass" size="lg" className="text-lg px-8 py-6">
                View Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mobile spacing for bottom navigation */}
      <div className="h-20 lg:h-0"></div>
    </div>
  );
};

export default About;