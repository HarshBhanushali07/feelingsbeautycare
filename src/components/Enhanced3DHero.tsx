import React, { Suspense } from 'react';
import { Sparkles, Star, Heart, Crown, Palette, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import BeautyProduct3D from "@/components/BeautyProduct3D";
import heroSalon from "@/assets/hero-salon.jpg";

const Enhanced3DHero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroSalon}
          alt="Luxury salon interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/70 to-primary/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-rose-gold/10"></div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating beauty icons */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float ${
              i % 4 === 0 ? "text-rose-gold" : i % 4 === 1 ? "text-secondary" : i % 4 === 2 ? "text-primary" : "text-accent"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              fontSize: `${Math.random() * 15 + 15}px`,
            }}
          >
            {i % 6 === 0 ? (
              <Heart className="opacity-40 animate-pulse" />
            ) : i % 6 === 1 ? (
              <Sparkles className="opacity-50" />
            ) : i % 6 === 2 ? (
              <Star className="opacity-45" />
            ) : i % 6 === 3 ? (
              <Crown className="opacity-40" />
            ) : i % 6 === 4 ? (
              <Palette className="opacity-35" />
            ) : (
              <Scissors className="opacity-30" />
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Side - Content */}
          <div className="text-center lg:text-left">
            {/* Enhanced Badge */}
            <div className="inline-flex items-center space-x-3 glass-card px-6 py-3 rounded-full mb-8 animate-fade-in-up">
              <Crown className="h-5 w-5 text-rose-gold animate-pulse" />
              <span className="text-sm font-montserrat font-semibold text-foreground">
                ✨ Premium Beauty Experience Since 2010 ✨
              </span>
            </div>

            {/* Enhanced Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-playfair font-bold text-foreground mb-6 animate-fade-in-up leading-tight">
              Feel the{" "}
              <span className="relative">
                <span className="text-transparent bg-gradient-to-r from-primary via-rose-gold to-secondary bg-clip-text animate-glow">
                  Care
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-rose-gold/20 to-secondary/20 blur-lg animate-pulse"></div>
              </span>
              <br />
              Flaunt the{" "}
              <span className="text-transparent bg-gradient-to-r from-rose-gold via-primary to-accent bg-clip-text">
                Feelings
              </span>
            </h1>

            {/* Enhanced Subtitle */}
            <p className="text-xl lg:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 font-montserrat animate-fade-in-up leading-relaxed">
              Transform your beauty dreams into reality at Jamnagar's most luxurious salon. 
              <span className="text-primary font-semibold"> Professional excellence</span> meets 
              <span className="text-rose-gold font-semibold"> artistic perfection</span>.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up mb-12">
              <Button 
                variant="luxury" 
                size="lg" 
                className="text-xl px-10 py-7 transform hover:scale-105 transition-all duration-300 hover:animate-glow"
              >
                <Heart className="mr-2 h-5 w-5" />
                Book Your Transformation
              </Button>
              <Button 
                variant="glass" 
                size="lg" 
                className="text-xl px-10 py-7 hover:shadow-2xl hover:shadow-rose-gold/20 transform hover:scale-105 transition-all duration-300"
              >
                <Crown className="mr-2 h-5 w-5" />
                Explore Courses
              </Button>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto lg:mx-0">
              {[
                { number: "5000+", label: "Happy Clients", icon: Heart, color: "text-rose-gold" },
                { number: "4.9★", label: "Google Rating", icon: Star, color: "text-primary" },
                { number: "500+", label: "Students Trained", icon: Crown, color: "text-accent" },
              ].map((stat, index) => (
                <div key={index} className="glass-card p-6 rounded-2xl text-center animate-fade-in-up hover:animate-glow transition-all duration-500 hover:scale-105 group">
                  <stat.icon className={`h-10 w-10 ${stat.color} mx-auto mb-3 group-hover:animate-pulse`} />
                  <div className="text-3xl font-playfair font-bold text-primary mb-2 group-hover:text-rose-gold transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground font-montserrat font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - 3D Model */}
          <div className="relative h-96 lg:h-[600px] w-full">
            <div className="absolute inset-0 glass-card rounded-3xl overflow-hidden animate-glow">
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
                </div>
              }>
                <BeautyProduct3D />
              </Suspense>
            </div>
            
            {/* 3D Model Labels */}
            <div className="absolute top-4 right-4 glass-card px-3 py-2 rounded-full animate-pulse">
              <span className="text-xs font-montserrat font-bold text-primary">Interactive 3D</span>
            </div>
            
            <div className="absolute bottom-4 left-4 glass-card px-4 py-2 rounded-full">
              <span className="text-xs font-montserrat text-muted-foreground">Drag to rotate • Auto-spinning</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="glass-card p-3 rounded-full hover:animate-glow transition-all duration-300">
          <div className="w-1 h-6 bg-gradient-to-b from-primary via-rose-gold to-secondary rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Ambient Light Effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-gold/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
    </section>
  );
};

export default Enhanced3DHero;