import { Heart, Award, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const OwnerSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Owner Image */}
          <div className="relative">
            <div className="glass-card p-8 rounded-3xl">
              <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-rose-gold/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary to-rose-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Heart className="h-16 w-16 text-white" />
                  </div>
                  <p className="text-sm text-muted-foreground">Founder's Photo</p>
                </div>
              </div>
              
              {/* Floating Achievement Badge */}
              <div className="absolute -top-4 -right-4 glass-card p-4 rounded-full">
                <Award className="h-8 w-8 text-rose-gold" />
              </div>
            </div>
          </div>

          {/* Owner Story */}
          <div>
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                Meet Our{" "}
                <span className="text-transparent bg-gradient-to-r from-primary to-rose-gold bg-clip-text">
                  Founder
                </span>
              </h2>
              <p className="text-lg text-rose-gold font-montserrat font-medium">
                Master Beauty Expert & Educator
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <p className="text-lg text-muted-foreground font-montserrat leading-relaxed">
                "Beauty is not just about looking good, it's about feeling confident and radiating happiness from within. This belief drives everything we do at Feelings Beauty Care."
              </p>
              
              <p className="text-foreground font-montserrat leading-relaxed">
                With over <strong className="text-primary">15 years of passion and expertise</strong> in the beauty industry, our founder has transformed thousands of lives through artistry and dedication. Starting with a simple dream to make every woman feel beautiful, we have built Jamnagar's most trusted beauty destination.
              </p>

              <p className="text-foreground font-montserrat leading-relaxed">
                From mastering the latest international beauty techniques to training the next generation of beauty professionals, our commitment to excellence has earned recognition across Gujarat.
              </p>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: Users, number: "5000+", label: "Clients Transformed" },
                { icon: Star, number: "500+", label: "Students Trained" },
                { icon: Award, number: "15+", label: "Years Experience" },
                { icon: Heart, number: "4.9", label: "Google Rating" },
              ].map((achievement, index) => (
                <div key={index} className="glass-card p-4 rounded-xl text-center">
                  <achievement.icon className="h-6 w-6 text-rose-gold mx-auto mb-2" />
                  <div className="text-xl font-playfair font-bold text-primary">
                    {achievement.number}
                  </div>
                  <div className="text-xs text-muted-foreground font-montserrat">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="luxury" size="lg" className="flex-1" asChild>
                <Link to="/booking">Book Personal Consultation</Link>
              </Button>
              <Button variant="glass" size="lg" className="flex-1" asChild>
                <Link to="/courses">Learn About Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerSection;