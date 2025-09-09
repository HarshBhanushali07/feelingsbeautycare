import { CourseBooking } from "@/components/booking/CourseBooking";

const CourseEnrollment = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-playfair font-bold text-foreground mb-4">
            Course Enrollment
          </h1>
          <p className="text-lg text-muted-foreground">
            Apply for our professional beauty courses and start your career
          </p>
        </div>
        
        <CourseBooking />
      </div>
    </div>
  );
};

export default CourseEnrollment;