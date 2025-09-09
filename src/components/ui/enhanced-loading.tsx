import React from 'react';
import { Loader2, Heart, Sparkles } from 'lucide-react';

interface EnhancedLoadingProps {
  message?: string;
  variant?: 'default' | 'beauty' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
}

const EnhancedLoading: React.FC<EnhancedLoadingProps> = ({ 
  message = "Loading...", 
  variant = 'default',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12'
  };

  const containerClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  if (variant === 'beauty') {
    return (
      <div className={`flex flex-col items-center justify-center ${containerClasses[size]}`}>
        <div className="relative">
          <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-primary border-t-transparent`}></div>
          <Heart className={`absolute inset-0 m-auto ${size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-6 w-6'} text-rose-gold animate-pulse`} />
        </div>
        {message && (
          <p className="mt-4 text-sm font-montserrat text-muted-foreground animate-pulse">
            {message}
          </p>
        )}
        <div className="flex space-x-1 mt-2">
          {[...Array(3)].map((_, i) => (
            <Sparkles 
              key={i} 
              className="h-3 w-3 text-rose-gold animate-pulse" 
              style={{animationDelay: `${i * 0.5}s`}}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center justify-center ${containerClasses[size]}`}>
        <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${containerClasses[size]}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary mb-2`} />
      {message && (
        <p className="text-sm font-montserrat text-muted-foreground animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export { EnhancedLoading };