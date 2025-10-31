import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Heart, Sparkles, Loader2 } from 'lucide-react';

const FinalQuestion = ({ onResponse, isLoading }) => {
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <section className="relative py-20 px-6 min-h-screen flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-soft"></div>
      </div>
      
      <div className="relative z-10 max-w-3xl mx-auto w-full">
        <Card className="p-12 sm:p-16 bg-card/95 backdrop-blur-sm border-2 border-primary/40 shadow-[0_25px_80px_-15px_hsl(var(--primary)/0.4)] animate-scale-in">
          {/* Sparkles decoration */}
          <div className="flex justify-center gap-4 mb-8">
            <Sparkles className="w-8 h-8 text-primary animate-pulse-soft" />
            <Heart className="w-10 h-10 text-primary fill-primary animate-pulse-soft" />
            <Sparkles className="w-8 h-8 text-primary animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
          </div>
          
          {/* The question */}
          <div className="text-center space-y-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient leading-tight">
              Will You Be Mine
              <br />
              Forever?
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
              I want to wake up every day knowing you're by my side. 
              Will you make me the happiest person alive?
            </p>
            
            {/* Response buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button
                size="lg"
                className="group relative px-12 py-7 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 overflow-hidden"
                onMouseEnter={() => setHoveredButton('yes')}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={() => onResponse('yes')}
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <span className="relative flex items-center gap-2">
                  <Heart className={`w-5 h-5 fill-current transition-transform duration-500 ${
                    hoveredButton === 'yes' ? 'scale-125' : 'scale-100'
                  }`} />
                  Yes, Forever!
                  <Heart className={`w-5 h-5 fill-current transition-transform duration-500 ${
                    hoveredButton === 'yes' ? 'scale-125' : 'scale-100'
                  }`} />
                </span>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="px-12 py-7 text-lg font-semibold border-2 border-primary/40 text-foreground hover:bg-primary/5 hover:border-primary/60 rounded-full transition-all duration-500 hover:scale-105"
                onMouseEnter={() => setHoveredButton('maybe')}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={() => onResponse('maybe')}
              >
                <span className="flex items-center gap-2">
                  I need time...
                </span>
              </Button>
            </div>
            
            {/* Decorative hearts */}
            <div className="flex justify-center gap-2 pt-8">
              {[...Array(7)].map((_, i) => (
                <Heart 
                  key={i}
                  className="w-3 h-3 text-primary fill-primary animate-pulse-soft"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </Card>
        
        {/* Bottom message */}
        <p className="text-center text-muted-foreground mt-8 text-sm sm:text-base animate-fade-in">
          Whatever you choose, know that my love for you is real and true ❤️
        </p>
      </div>
    </section>
  );
};

export default FinalQuestion;