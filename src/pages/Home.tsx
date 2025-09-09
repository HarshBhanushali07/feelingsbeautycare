import UnifiedHeroSection from "@/components/UnifiedHeroSection";
import AboutSection from "@/components/AboutSection";
import UnifiedServicesSection from "@/components/UnifiedServicesSection";
import BookingSection from "@/components/BookingSection";
import CoursesSection from "@/components/CoursesSection";
import OwnerSection from "@/components/OwnerSection";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import QuickBookingWidget from "@/components/booking/QuickBookingWidget";
import FAQSection from "@/components/FAQSection";
import PriceCalculator from "@/components/PriceCalculator";

import { useIsMobile } from "@/hooks/use-mobile";

const Home = () => {
  const isMobile = useIsMobile();
  
  return (
    <main className="min-h-screen">
      {/* Unified Hero Section - Responsive */}
      <UnifiedHeroSection />
      
      <AboutSection />
      
      {/* Unified Services Section - Responsive */}
      <UnifiedServicesSection />
      
      {/* Price Calculator */}
      <PriceCalculator />
      
      {!isMobile && (
        <section className="py-12 lg:py-20 bg-gradient-to-b from-background/50 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <QuickBookingWidget />
          </div>
        </section>
      )}
      <CoursesSection />
      <OwnerSection />
      <TestimonialsCarousel />
      <FAQSection />
      <BookingSection />
      
      {/* Mobile spacing for bottom navigation */}
      <div className="h-20 lg:h-0"></div>
    </main>
  );
};

export default Home;