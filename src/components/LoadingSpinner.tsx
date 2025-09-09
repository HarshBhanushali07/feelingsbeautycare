import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner = ({ size = "md", text, fullScreen = false }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  };

  const containerClasses = fullScreen 
    ? "fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
    : "flex items-center justify-center p-4";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center space-y-3">
        <div className="relative">
          <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
          <div className="absolute inset-0 animate-ping">
            <Loader2 className={`${sizeClasses[size]} text-rose-gold opacity-30`} />
          </div>
        </div>
        {text && (
          <p className="text-sm text-muted-foreground font-montserrat animate-pulse">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;