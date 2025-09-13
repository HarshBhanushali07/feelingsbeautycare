import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";

import Booking from "./pages/Booking";
import CourseEnrollment from "./pages/CourseEnrollment";
import BookingManagement from "./pages/BookingManagement";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import MobileNavigation from "./components/MobileNavigation";
import Footer from "./components/Footer";
import QuickBookingWidget from "./components/QuickBookingWidget";

import { useIsMobile } from "@/hooks/use-mobile";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen">
              <Navigation />
              <MobileNavigation />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/contact" element={<Contact />} />
                
                <Route path="/booking" element={<Booking />} />
                <Route path="/course-enrollment" element={<CourseEnrollment />} />
                <Route path="/booking-management" element={<BookingManagement />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
              {!isMobile && <QuickBookingWidget />}
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
