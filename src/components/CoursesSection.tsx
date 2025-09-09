import { GraduationCap, Clock, Award, Users, Sparkles, Crown, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const CoursesSection = () => {
  const courses = [
    {
      icon: Palette,
      title: "Professional Makeup Artistry",
      description: "Master the art of professional makeup from basic to advanced techniques including bridal and fashion makeup.",
      duration: "3 Months",
      price: "₹25,000",
      modules: ["Basic Makeup Techniques", "Bridal Makeup", "Fashion Makeup", "Airbrush Techniques"],
      certification: true,
      placement: true,
      popular: true,
    },
    {
      icon: Crown,
      title: "Bridal Makeup Specialist",
      description: "Specialize in bridal makeup with traditional and contemporary styles, hair styling, and draping techniques.",
      duration: "2 Months",
      price: "₹18,000",
      modules: ["Bridal Trends", "Hair Styling", "Saree Draping", "Pre-Bridal Treatments"],
      certification: true,
      placement: true,
      popular: true,
    },
    {
      icon: Sparkles,
      title: "Advanced Skincare & Facial",
      description: "Learn professional skincare treatments, facial techniques, and skin analysis for various skin types.",
      duration: "1.5 Months",
      price: "₹15,000",
      modules: ["Skin Analysis", "Facial Techniques", "Product Knowledge", "Treatment Planning"],
      certification: true,
      placement: false,
      popular: false,
    },
    {
      icon: GraduationCap,
      title: "Complete Beauty Course",
      description: "Comprehensive course covering all aspects of beauty - makeup, skincare, hair styling, and nail art.",
      duration: "6 Months",
      price: "₹45,000",
      modules: ["Makeup Artistry", "Skincare", "Hair Styling", "Nail Art", "Business Skills"],
      certification: true,
      placement: true,
      popular: true,
    },
  ];

  const features = [
    {
      icon: Award,
      title: "Certified Training",
      description: "Industry-recognized certificates upon course completion",
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from experienced professionals with 10+ years in the industry",
    },
    {
      icon: GraduationCap,
      title: "Hands-on Practice",
      description: "Practical training with real clients and live projects",
    },
  ];

  return (
    <section id="courses" className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10"
            style={{
              right: `${10 + i * 20}%`,
              top: `${15 + i * 25}%`,
              animationDelay: `${i * 2.5}s`,
            }}
          >
            <GraduationCap className="h-12 w-12 text-rose-gold" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-6">
            <GraduationCap className="h-5 w-5 text-rose-gold" />
            <span className="text-sm font-montserrat font-medium">Feelings Beauty Academy</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-foreground mb-6">
            Learn from the{" "}
            <span className="text-transparent bg-gradient-to-r from-primary to-rose-gold bg-clip-text">
              Best
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-montserrat leading-relaxed">
            Transform your passion for beauty into a rewarding career. Our comprehensive courses are designed by industry experts 
            to provide practical skills and professional certification.
          </p>
        </div>

        {/* Course Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-6 rounded-2xl text-center hover:animate-glow transition-all duration-300"
            >
              <div className="glass-card p-3 rounded-xl w-fit mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-rose-gold" />
              </div>
              <h3 className="text-lg font-playfair font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground font-montserrat text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {courses.map((course, index) => (
            <Card 
              key={index} 
              className="glass-card border-glass-border hover:animate-glow transition-all duration-500 hover:transform hover:scale-105 relative overflow-hidden"
            >
              {/* Popular Badge */}
              {course.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-primary to-rose-gold text-background px-3 py-1 rounded-full text-xs font-montserrat font-bold">
                    Popular
                  </div>
                </div>
              )}

              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className="glass-card p-3 rounded-xl">
                    <course.icon className="h-6 w-6 text-rose-gold" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="font-playfair text-xl text-foreground mb-2">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="font-montserrat">
                      {course.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Course Details */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="font-montserrat">{course.duration}</span>
                    </div>
                    <div className="text-2xl font-playfair font-bold text-primary">
                      {course.price}
                    </div>
                  </div>
                </div>

                {/* Modules */}
                <div>
                  <h4 className="font-montserrat font-semibold text-foreground mb-3">Course Modules:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {course.modules.map((module, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-rose-gold"></div>
                        <span className="text-muted-foreground font-montserrat">{module}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="flex items-center space-x-4 text-sm">
                  {course.certification && (
                    <div className="flex items-center space-x-1 text-rose-gold">
                      <Award className="h-4 w-4" />
                      <span className="font-montserrat">Certified</span>
                    </div>
                  )}
                  {course.placement && (
                    <div className="flex items-center space-x-1 text-primary">
                      <Users className="h-4 w-4" />
                      <span className="font-montserrat">Placement Support</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="flex space-x-3">
                  <Button variant="luxury" className="flex-1" asChild>
                    <Link to="/course-enrollment">Enroll Now</Link>
                  </Button>
                  <Button 
                    variant="glass" 
                    className="px-4"
                    onClick={() => window.open('tel:+919876543210', '_self')}
                  >
                    Brochure
                  </Button>
                </div>
              </CardContent>

              {/* Shimmer Effect */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-shimmer/10 to-transparent animate-shimmer"></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Academy Stats */}
        <div className="glass-card p-8 rounded-2xl text-center mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-playfair font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground font-montserrat">Students Trained</div>
            </div>
            <div>
              <div className="text-3xl font-playfair font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground font-montserrat">Placement Support</div>
            </div>
            <div>
              <div className="text-3xl font-playfair font-bold text-primary mb-2">4.9★</div>
              <div className="text-muted-foreground font-montserrat">Student Rating</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="glass-card p-8 lg:p-12 rounded-2xl max-w-3xl mx-auto">
            <GraduationCap className="h-12 w-12 text-rose-gold mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-playfair font-bold text-foreground mb-6">
              Start Your Beauty Career Today
            </h3>
            <p className="text-lg text-muted-foreground font-montserrat mb-8 leading-relaxed">
              Join hundreds of successful beauty professionals who started their journey with us. 
              Get industry-recognized certification and ongoing placement support.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button variant="luxury" size="lg" asChild>
                <Link to="/courses">View All Courses</Link>
              </Button>
              <Button 
                variant="glass" 
                size="lg"
                onClick={() => window.open('tel:+919876543210', '_self')}
              >
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;