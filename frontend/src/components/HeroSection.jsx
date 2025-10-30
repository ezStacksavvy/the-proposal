import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 hero-gradient opacity-30"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-pulse-soft"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-accent/10 blur-3xl animate-pulse-soft"></div>
      
      {/* Content */}
      <div className={`relative z-10 text-center max-w-4xl transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Animated heart icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Heart 
              className="w-20 h-20 text-primary fill-primary animate-pulse-soft" 
            />
            <div className="absolute inset-0 w-20 h-20">
              <Heart 
                className="w-20 h-20 text-primary/30 fill-primary/30 animate-float" 
              />
            </div>
          </div>
        </div>
        
        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          To Someone
          <br />
          <span className="text-gradient">Very Special</span>
        </h1>
        
        {/* Subheading */}
        <p className="text-xl sm:text-2xl text-muted-foreground font-medium mb-8 leading-relaxed">
          Every moment with you feels like a beautiful dream
        </p>
        
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary"></div>
          <Heart className="w-6 h-6 text-primary fill-primary" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary"></div>
        </div>
        
        {/* Scroll indicator */}
        <div className="animate-bounce mt-12">
          <div className="inline-flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-sm">Scroll to see my heart</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;