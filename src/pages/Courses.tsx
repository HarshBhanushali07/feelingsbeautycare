import CoursesSection from "@/components/CoursesSection";
import { GraduationCap, Users, Award, BookOpen, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Courses = () => {
  const courseDetails = [
    {
      id: 1,
      title: "Professional Makeup Artistry",
      duration: "3 Months",
      level: "Beginner to Advanced",
      price: "₹25,000",
      modules: [
        "Basic Makeup Techniques",
        "Color Theory & Skin Tones",
        "Bridal Makeup Mastery", 
        "Party & Event Makeup",
        "Airbrush Techniques",
        "Business & Client Management"
      ],
      certifications: ["ISO Certified", "Government Approved"],
      placement: true,
      students: 150,
      rating: 4.9
    },
    {
      id: 2,
      title: "Advanced Hair Styling",
      duration: "2 Months", 
      level: "Intermediate",
      price: "₹18,000",
      modules: [
        "Hair Cutting Techniques",
        "Color & Highlighting",
        "Bridal Hair Styling",
        "Hair Treatment & Care",
        "Salon Management",
        "Client Consultation"
      ],
      certifications: ["ISO Certified"],
      placement: true,
      students: 120,
      rating: 4.8
    },
    {
      id: 3,
      title: "Nail Art & Design",
      duration: "1 Month",
      level: "Beginner",
      price: "₹12,000",
      modules: [
        "Basic Nail Care",
        "Nail Art Techniques",
        "Gel & Acrylic Application",
        "3D Nail Design",
        "Hygiene & Sanitation",
        "Business Setup"
      ],
      certifications: ["Industry Certified"],
      placement: false,
      students: 80,
      rating: 4.7
    }
  ];

  const instructors = [
    {
      name: "Priya Sharma",
      role: "Lead Makeup Instructor",
      experience: "15+ Years",
      specialization: "Bridal & Fashion Makeup",
      image: "/api/placeholder/300/400",
      achievements: ["Celebrity Makeup Artist", "International Trainer"]
    },
    {
      name: "Neha Patel", 
      role: "Hair Styling Expert",
      experience: "12+ Years",
      specialization: "Creative Hair Design",
      image: "/api/placeholder/300/400",
      achievements: ["Award Winning Stylist", "Salon Owner"]
    },
    {
      name: "Kavita Singh",
      role: "Beauty Educator",
      experience: "10+ Years", 
      specialization: "Comprehensive Beauty Training",
      image: "/api/placeholder/300/400",
      achievements: ["Master Trainer", "Curriculum Developer"]
    }
  ];

  const testimonials = [
    {
      name: "Ritika Mehta",
      course: "Professional Makeup Artistry",
      review: "The course completely transformed my career. Now I'm running my own successful makeup studio in Rajkot!",
      rating: 5,
      image: "/api/placeholder/100/100"
    },
    {
      name: "Sneha Parmar",
      course: "Advanced Hair Styling", 
      review: "Excellent training with hands-on practice. The placement support helped me get a job immediately after completion.",
      rating: 5,
      image: "/api/placeholder/100/100"
    },
    {
      name: "Pooja Joshi",
      course: "Nail Art & Design",
      review: "Comprehensive course with latest techniques. Started my own nail studio within 2 months of completion!",
      rating: 5,
      image: "/api/placeholder/100/100"
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
              <GraduationCap className="h-5 w-5 text-rose-gold" />
              <span className="text-sm font-montserrat font-medium">Beauty Academy</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-foreground mb-6">
              Master the Art of
              <span className="text-transparent bg-gradient-to-r from-primary via-rose-gold to-primary bg-clip-text"> Beauty</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-montserrat mb-8">
              Launch your beauty career with our comprehensive professional courses. Learn from industry experts and get certified to start your own beauty business.
            </p>
            <Button variant="luxury" size="lg" asChild>
              <Link to="/course-enrollment">Explore Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Courses Overview */}
      <CoursesSection />

      {/* Detailed Course Information */}
      <section className="py-20 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
              Course Details & Curriculum
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive course information with detailed modules, certification details, and career prospects.
            </p>
          </div>

          <div className="space-y-8">
            {courseDetails.map((course, index) => (
              <div key={course.id} className="glass-card rounded-3xl p-8 hover:shadow-2xl transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Course Info */}
                  <div className="lg:col-span-2">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-2xl font-playfair font-bold text-foreground">
                        {course.title}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-3 bg-background/50 rounded-xl">
                        <Clock className="h-6 w-6 text-rose-gold mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground">{course.duration}</p>
                        <p className="text-xs text-muted-foreground">Duration</p>
                      </div>
                      <div className="text-center p-3 bg-background/50 rounded-xl">
                        <BookOpen className="h-6 w-6 text-rose-gold mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground">{course.level}</p>
                        <p className="text-xs text-muted-foreground">Level</p>
                      </div>
                      <div className="text-center p-3 bg-background/50 rounded-xl">
                        <Users className="h-6 w-6 text-rose-gold mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground">{course.students}+</p>
                        <p className="text-xs text-muted-foreground">Students</p>
                      </div>
                      <div className="text-center p-3 bg-background/50 rounded-xl">
                        <Award className="h-6 w-6 text-rose-gold mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground">Certified</p>
                        <p className="text-xs text-muted-foreground">Industry</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-playfair font-bold text-lg text-foreground mb-3">Course Modules:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {course.modules.map((module, moduleIndex) => (
                          <div key={moduleIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-primary to-rose-gold rounded-full"></div>
                            <span className="text-sm text-muted-foreground">{module}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.certifications.map((cert, certIndex) => (
                        <span key={certIndex} className="bg-gradient-to-r from-primary to-rose-gold text-background px-3 py-1 rounded-full text-xs font-montserrat font-semibold">
                          {cert}
                        </span>
                      ))}
                      {course.placement && (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-montserrat font-semibold">
                          Placement Support
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-primary/10 to-rose-gold/10 rounded-2xl p-6 text-center">
                      <div className="text-4xl font-playfair font-bold text-primary mb-2">
                        {course.price}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Complete Course Fee
                      </p>
                      <Button variant="luxury" size="lg" className="w-full mb-4" asChild>
                        <Link to="/course-enrollment">Enroll Now</Link>
                      </Button>
                      <Button variant="glass" size="sm" className="w-full">
                        Download Brochure
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
              Learn from Industry Experts
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our experienced instructors bring years of industry expertise and are passionate about sharing their knowledge with aspiring beauty professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((instructor, index) => (
              <div key={index} className="group glass-card rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img 
                    src={instructor.image} 
                    alt={instructor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-playfair font-bold text-foreground mb-1">
                    {instructor.name}
                  </h3>
                  <p className="text-primary font-montserrat font-medium mb-1">
                    {instructor.role}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {instructor.experience} | {instructor.specialization}
                  </p>
                  <div className="space-y-1">
                    {instructor.achievements.map((achievement, achievementIndex) => (
                      <span key={achievementIndex} className="inline-block bg-rose-gold/20 text-rose-gold px-2 py-1 rounded-full text-xs font-montserrat">
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-rose-gold/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
              Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from our successful graduates who have built thriving careers in the beauty industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card rounded-3xl p-6 text-center hover:shadow-xl transition-all duration-300">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <div className="flex justify-center mb-3">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "{testimonial.review}"
                </p>
                <h4 className="font-playfair font-bold text-foreground">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-rose-gold">
                  {testimonial.course}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;