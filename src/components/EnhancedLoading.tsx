import React from 'react';
import { Sparkles, Heart, Crown } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...' 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12', 
    lg: 'h-16 w-16'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-primary/20 border-t-primary`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Heart className="h-4 w-4 text-rose-gold animate-pulse" />
        </div>
      </div>
      <p className="text-sm font-montserrat text-muted-foreground animate-pulse">
        {text}
      </p>
    </div>
  );
};

export const BeautyLoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="text-center space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Crown className="h-8 w-8 text-rose-gold animate-pulse" />
          <h2 className="text-2xl font-playfair font-bold text-primary">
            Feelings Beauty Care
          </h2>
          <Sparkles className="h-6 w-6 text-primary animate-pulse" />
        </div>

        {/* Animated Icons */}
        <div className="flex items-center justify-center space-x-8 mb-8">
          {[Heart, Sparkles, Crown].map((Icon, i) => (
            <div
              key={i}
              className="animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <Icon className="h-8 w-8 text-rose-gold" />
            </div>
          ))}
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary via-rose-gold to-accent animate-shimmer rounded-full"></div>
        </div>

        <p className="text-lg font-montserrat text-muted-foreground">
          Preparing your beauty experience...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;