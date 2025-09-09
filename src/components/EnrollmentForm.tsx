import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Award, Phone, Mail, User, MessageSquare, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Course {
  id: string;
  name: string;
  duration: string;
  price: string;
  popular?: boolean;
}

const courses: Course[] = [
  { id: "basic-makeup", name: "Basic Makeup Artistry", duration: "2 months", price: "₹15,000", popular: true },
  { id: "advanced-bridal", name: "Advanced Bridal Makeup", duration: "3 months", price: "₹25,000", popular: true },
  { id: "hair-styling", name: "Professional Hair Styling", duration: "2 months", price: "₹18,000" },
  { id: "nail-art", name: "Nail Art & Manicure", duration: "1 month", price: "₹10,000" },
  { id: "skincare", name: "Advanced Skincare & Facial", duration: "2 months", price: "₹20,000" },
  { id: "complete", name: "Complete Beauty Professional", duration: "6 months", price: "₹45,000", popular: true },
];

const EnrollmentForm = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    experience: "",
    goals: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCourse) {
      toast({
        title: "Please select a course",
        description: "Choose a course to proceed with enrollment.",
        variant: "destructive",
      });
      return;
    }

    // Generate application ID
    const applicationId = `APP${Date.now().toString().slice(-6)}`;
    
    // Store application locally
    const applicationData = {
      id: applicationId,
      course: selectedCourseData,
      student: formData,
      applicationDate: new Date().toISOString(),
      status: 'pending'
    };
    
    localStorage.setItem(`application_${applicationId}`, JSON.stringify(applicationData));
    
    toast({
      title: "Application Submitted Successfully! 🎉",
      description: `Application ID: ${applicationId}. We'll contact you within 24 hours to discuss your enrollment.`,
    });

    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      experience: "",
      goals: ""
    });
    setSelectedCourse("");

    // Redirect to booking page to schedule a consultation
    setTimeout(() => {
      window.location.href = '/booking?service=facial-treatment';
    }, 2000);
  };

  const handleDownloadBrochure = () => {
    // Create a detailed brochure content
    const brochureContent = `
FEELINGS BEAUTY CARE - COURSE BROCHURE
======================================

📚 AVAILABLE COURSES:

${courses.map(course => `
🎓 ${course.name.toUpperCase()}
Duration: ${course.duration}
Fee: ${course.price}
${course.popular ? '⭐ MOST POPULAR' : ''}
`).join('\n')}

📍 INSTITUTE DETAILS:
Address: 123 Beauty Plaza, Near City Mall, Jamnagar
Phone: +91 98765 43210
Email: info@feelingsbeauty.com

🎯 WHY CHOOSE US:
✅ Expert trainers with 10+ years experience
✅ Hands-on practical training
✅ Industry-recognized certification
✅ Job placement assistance
✅ Small batch sizes for personalized attention
✅ Latest equipment and products
✅ Flexible payment options

📞 CONTACT FOR ADMISSION:
Call: +91 98765 43210

Visit our website or contact us today to start your beauty career!
    `;

    // Create and download text file (PDF would require a library)
    const blob = new Blob([brochureContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Feelings_Beauty_Care_Courses.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Brochure Downloaded! 📄",
      description: "Course brochure has been downloaded to your device.",
    });
  };

  const selectedCourseData = courses.find(course => course.id === selectedCourse);

  return (
    <section className="py-20 bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Enroll in{" "}
            <span className="text-transparent bg-gradient-to-r from-primary to-rose-gold bg-clip-text">
              Beauty Courses
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-montserrat">
            Start your journey to becoming a certified beauty professional under expert guidance
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Course Selection */}
          <div className="space-y-6">
            <h3 className="text-2xl font-playfair font-bold text-foreground mb-6">
              Choose Your Course
            </h3>
            
            <div className="space-y-4">
              {courses.map((course) => (
                <Card 
                  key={course.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedCourse === course.id 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedCourse(course.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-montserrat font-semibold text-foreground">
                            {course.name}
                          </h4>
                          {course.popular && (
                            <Badge variant="secondary" className="bg-rose-gold/10 text-rose-gold">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            Certificate Included
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-playfair font-bold text-primary">
                          {course.price}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          + Materials
                        </div>
                      </div>
                    </div>
                    
                    {selectedCourse === course.id && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex items-center text-sm text-primary">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Course selected - Complete enrollment below
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button 
              variant="glass" 
              onClick={handleDownloadBrochure}
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Course Brochure
            </Button>
          </div>

          {/* Enrollment Form */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl font-playfair">
                Enrollment Application
              </CardTitle>
              {selectedCourseData && (
                <div className="text-sm text-muted-foreground">
                  Enrolling for: <span className="text-primary font-medium">{selectedCourseData.name}</span>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="course" className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Select Course *
                    </Label>
                    <Select value={selectedCourse} onValueChange={setSelectedCourse} required>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Choose a course to enroll" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name} - {course.duration} ({course.price})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your full name"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+91 98765 43210"
                        required
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your@email.com"
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="experience">Previous Beauty Experience</Label>
                    <Select value={formData.experience} onValueChange={(value) => setFormData({...formData, experience: value})}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Complete Beginner</SelectItem>
                        <SelectItem value="some">Some Basic Knowledge</SelectItem>
                        <SelectItem value="intermediate">Intermediate Level</SelectItem>
                        <SelectItem value="advanced">Advanced/Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="goals" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Career Goals & Expectations
                    </Label>
                    <Textarea
                      id="goals"
                      value={formData.goals}
                      onChange={(e) => setFormData({...formData, goals: e.target.value})}
                      placeholder="Tell us about your career goals and what you expect from this course..."
                      rows={4}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Button type="submit" variant="luxury" size="lg" className="w-full">
                    Submit Enrollment Application
                  </Button>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    After submission, our team will contact you within 24 hours
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EnrollmentForm;