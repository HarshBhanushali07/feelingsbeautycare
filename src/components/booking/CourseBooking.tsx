import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, Clock, User, Phone, Mail, GraduationCap, Check, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const courseBookingSchema = z.object({
  course: z.string().min(1, "Please select a course"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  address: z.string().min(10, "Please enter your complete address"),
  education: z.string().min(1, "Please select your education level"),
  experience: z.string().min(1, "Please select your experience level"),
  motivation: z.string().min(20, "Please tell us more about your motivation (minimum 20 characters)"),
  preferredBatch: z.string().min(1, "Please select your preferred batch timing"),
});

type CourseBookingFormData = z.infer<typeof courseBookingSchema>;

interface Course {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  level: string;
}

const COURSES: Course[] = [
  {
    id: "professional-makeup",
    name: "Professional Makeup Artistry",
    duration: "3 Months",
    price: 25000,
    description: "Complete makeup artistry course from basic to advanced techniques",
    level: "Beginner to Advanced"
  },
  {
    id: "advanced-hair",
    name: "Advanced Hair Styling",
    duration: "2 Months",
    price: 18000,
    description: "Professional hair styling and cutting techniques",
    level: "Intermediate"
  },
  {
    id: "nail-art",
    name: "Nail Art & Design",
    duration: "1 Month",
    price: 12000,
    description: "Complete nail art and design course",
    level: "Beginner"
  },
  {
    id: "bridal-specialist",
    name: "Bridal Beauty Specialist",
    duration: "4 Months",
    price: 35000,
    description: "Comprehensive bridal makeup and styling course",
    level: "Advanced"
  },
  {
    id: "beauty-therapy",
    name: "Beauty Therapy & Skincare",
    duration: "2.5 Months",
    price: 22000,
    description: "Professional beauty therapy and skincare treatments",
    level: "Beginner to Intermediate"
  }
];

const EDUCATION_LEVELS = [
  "10th Pass",
  "12th Pass", 
  "Graduate",
  "Post Graduate",
  "Other"
];

const EXPERIENCE_LEVELS = [
  "Complete Beginner",
  "Some Basic Knowledge",
  "Self-Taught",
  "Previous Course Experience",
  "Professional Experience"
];

const BATCH_TIMINGS = [
  "Morning Batch (9 AM - 12 PM)",
  "Afternoon Batch (1 PM - 4 PM)", 
  "Evening Batch (5 PM - 8 PM)",
  "Weekend Batch (Sat-Sun)",
  "Flexible Timing"
];

export const CourseBooking = () => {
  const [step, setStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState<string>("");

  const form = useForm<CourseBookingFormData>({
    resolver: zodResolver(courseBookingSchema),
    defaultValues: {
      course: "",
      motivation: "",
      address: "",
      education: "",
      experience: "",
      preferredBatch: "",
    },
  });

  const onSubmit = async (data: CourseBookingFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const id = `EC${Date.now().toString().slice(-6)}`;
      const enrollmentData = {
        enrollmentId: id,
        course: selectedCourse,
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        education: data.education,
        experience: data.experience,
        motivation: data.motivation,
        preferredBatch: data.preferredBatch,
        status: 'pending' as const,
        createdAt: new Date()
      };
      
      // Store enrollment in localStorage
      localStorage.setItem(`enrollment_${id}`, JSON.stringify(enrollmentData));
      
      setEnrollmentId(id);
      setIsSubmitted(true);
      
      // Simulate sending confirmation email
      setTimeout(() => {
        toast({
          title: "Enrollment Information Sent!",
          description: `Course details sent to ${data.email}`,
        });
      }, 3000);
      
      toast({
        title: "Enrollment Application Submitted!",
        description: `Your application has been submitted. Enrollment ID: ${id}`,
      });
    } catch (error) {
      toast({
        title: "Enrollment Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="glass" 
            onClick={() => {
              setStep(1);
              setIsSubmitted(false);
              form.reset();
              setSelectedCourse(null);
            }}
          >
            ← Submit Another Application
          </Button>
        </div>
        
        <Card className="glass-card border-glass-border">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-rose-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-10 w-10 text-background" />
            </div>
            <CardTitle className="text-2xl font-playfair text-foreground">
              Application Submitted Successfully!
            </CardTitle>
            <CardDescription>
              We'll contact you within 24 hours with course details and next steps
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-primary/5 rounded-xl p-6">
              <h3 className="font-playfair font-bold text-lg text-foreground mb-4">
                Application Summary
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Enrollment ID:</span>
                  <span className="ml-2 font-medium text-foreground">{enrollmentId}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Course:</span>
                  <span className="ml-2 font-medium text-foreground">{selectedCourse?.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Name:</span>
                  <span className="ml-2 font-medium text-foreground">{form.getValues('name')}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <span className="ml-2 font-medium text-foreground">{form.getValues('email')}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="ml-2 font-medium text-foreground">{form.getValues('phone')}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Preferred Batch:</span>
                  <span className="ml-2 font-medium text-foreground">{form.getValues('preferredBatch')}</span>
                </div>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <h4 className="font-playfair font-bold text-foreground">Next Steps:</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>1. Our counselor will call you within 24 hours</p>
                <p>2. Course schedule and fee structure will be discussed</p>
                <p>3. Seat confirmation with advance payment</p>
                <p>4. Course materials and kit details</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="luxury" 
                className="flex-1"
                onClick={() => window.open('tel:+919876543210', '_self')}
              >
                <Phone className="mr-2 h-4 w-4" />
                Call for Quick Response
              </Button>
              <Button 
                variant="glass" 
                className="flex-1"
                onClick={() => window.open('https://wa.me/919876543210?text=Hi! I submitted course enrollment application. ID: ' + enrollmentId, '_blank')}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center glass-card border-2 transition-all duration-300 ${
                  step >= stepNumber
                    ? 'border-rose-gold text-rose-gold'
                    : 'border-glass-border text-muted-foreground'
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div
                  className={`w-12 h-0.5 transition-all duration-300 ${
                    step > stepNumber ? 'bg-rose-gold' : 'bg-glass-border'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <span className="text-sm text-muted-foreground font-montserrat">
            Step {step} of 3
          </span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Course Selection */}
          {step === 1 && (
            <Card className="glass-card border-glass-border">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3 text-rose-gold" />
                  Select Course
                </CardTitle>
                <CardDescription>
                  Choose the beauty course you'd like to enroll in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid grid-cols-1 gap-4">
                          {COURSES.map((course) => (
                            <div
                              key={course.id}
                              className={`glass-card p-6 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                                field.value === course.id
                                  ? 'border-rose-gold bg-rose-gold/10'
                                  : 'border-glass-border hover:border-rose-gold/50'
                              }`}
                              onClick={() => {
                                field.onChange(course.id);
                                setSelectedCourse(course);
                              }}
                            >
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="flex-1">
                                  <h3 className="font-playfair font-bold text-lg text-foreground mb-2">
                                    {course.name}
                                  </h3>
                                  <p className="text-muted-foreground text-sm mb-2">
                                    {course.description}
                                  </p>
                                  <div className="flex items-center gap-4 text-sm">
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-4 w-4 text-rose-gold" />
                                      {course.duration}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <BookOpen className="h-4 w-4 text-rose-gold" />
                                      {course.level}
                                    </span>
                                  </div>
                                </div>
                                <div className="mt-4 md:mt-0 md:ml-6 text-right">
                                  <div className="text-2xl font-playfair font-bold text-primary">
                                    ₹{course.price.toLocaleString()}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Complete Course
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end mt-6">
                  <Button
                    type="button"
                    variant="luxury"
                    onClick={nextStep}
                    disabled={!form.watch('course')}
                  >
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Personal Information */}
          {step === 2 && (
            <Card className="glass-card border-glass-border">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl flex items-center">
                  <User className="w-6 h-6 mr-3 text-rose-gold" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Please provide your personal and contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 98765 43210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complete Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your complete address including city and pincode"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your education level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {EDUCATION_LEVELS.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Beauty Experience</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {EXPERIENCE_LEVELS.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="glass" onClick={prevStep}>
                    Previous
                  </Button>
                  <Button
                    type="button"
                    variant="luxury"
                    onClick={nextStep}
                    disabled={!form.getValues('name') || !form.getValues('phone') || !form.getValues('email') || !form.getValues('address') || !form.getValues('education') || !form.getValues('experience')}
                  >
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Additional Details */}
          {step === 3 && (
            <Card className="glass-card border-glass-border">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl flex items-center">
                  <Calendar className="w-6 h-6 mr-3 text-rose-gold" />
                  Course Preferences
                </CardTitle>
                <CardDescription>
                  Tell us about your motivation and preferred timing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="preferredBatch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Batch Timing</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your preferred batch timing" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {BATCH_TIMINGS.map((timing) => (
                            <SelectItem key={timing} value={timing}>
                              {timing}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="motivation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Why do you want to join this course?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your motivation, career goals, and what you hope to achieve from this course..."
                          className="resize-none min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Course Summary */}
                {selectedCourse && (
                  <div className="bg-primary/5 rounded-xl p-6">
                    <h4 className="font-playfair font-bold text-lg text-foreground mb-4">
                      Selected Course Summary
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Course:</span>
                        <span className="ml-2 font-medium text-foreground">{selectedCourse.name}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="ml-2 font-medium text-foreground">{selectedCourse.duration}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Level:</span>
                        <span className="ml-2 font-medium text-foreground">{selectedCourse.level}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Fee:</span>
                        <span className="ml-2 font-medium text-primary">₹{selectedCourse.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="glass" onClick={prevStep}>
                    Previous
                  </Button>
                  <Button
                    type="submit"
                    variant="luxury"
                    disabled={!form.formState.isValid}
                  >
                    Submit Application
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </Form>
    </div>
  );
};