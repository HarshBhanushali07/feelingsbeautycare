import React from "react";
import { Sparkles, Heart, Star } from "lucide-react";

interface PremiumLoadingStateProps {
  message?: string;
  submessage?: string;
}

const PremiumLoadingState = ({ 
  message = "Processing your booking...", 
  submessage = "Creating your perfect appointment" 
}: PremiumLoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      {/* Main loading animation */}
      <div className="relative mb-6">
        {/* Outer ring */}
        <div className="w-20 h-20 border-4 border-rose-gold/20 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-rose-gold rounded-full animate-pulse"></div>
        </div>
        
        {/* Inner content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-gradient-to-r from-primary to-rose-gold rounded-full flex items-center justify-center animate-glow">
            <Sparkles className="w-6 h-6 text-background animate-pulse" />
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-float" style={{ animationDelay: '0s' }}>
          <Heart className="w-3 h-3 text-background m-0.5" />
        </div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-rose-gold rounded-full animate-float" style={{ animationDelay: '1s' }}>
          <Star className="w-2 h-2 text-background m-0.5" />
        </div>
        <div className="absolute top-1/2 -right-4 w-2 h-2 bg-accent rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Loading text */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-playfair font-semibold text-foreground animate-pulse">
          {message}
        </h3>
        <p className="text-sm text-muted-foreground font-montserrat animate-fade-in-up">
          {submessage}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex space-x-2 mt-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.3}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PremiumLoadingState;