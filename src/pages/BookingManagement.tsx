import { BookingManager } from "@/components/booking/BookingManager";

const BookingManagement = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-playfair font-bold text-foreground mb-4">
            Booking Management
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage and track all your salon appointments
          </p>
        </div>
        
        <BookingManager />
      </div>
    </div>
  );
};

export default BookingManagement;