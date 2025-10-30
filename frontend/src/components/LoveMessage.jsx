import React, { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';
import { Heart, Sparkles, Star } from 'lucide-react';

const messages = [
  {
    icon: Heart,
    title: "You Light Up My World",
    text: "From the moment I met you, my life has been filled with joy and happiness. Your smile brightens even my darkest days.",
    delay: 200
  },
  {
    icon: Sparkles,
    title: "Every Moment with You",
    text: "Every conversation, every laugh, every moment we share is precious to me. You make ordinary moments feel extraordinary.",
    delay: 400
  },
  {
    icon: Star,
    title: "You're My Everything",
    text: "I can't imagine my life without you. You've become the most important person in my world, and I treasure everything about you.",
    delay: 600
  }
];

const MessageCard = ({ message, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), message.delay);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [message.delay]);

  const Icon = message.icon;

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card className="p-8 bg-card/80 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.3)] group">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-primary to-accent p-4 rounded-full">
              <Icon className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-foreground">
          {message.title}
        </h3>
        
        {/* Text */}
        <p className="text-base sm:text-lg text-muted-foreground text-center leading-relaxed">
          {message.text}
        </p>
        
        {/* Decorative element */}
        <div className="flex justify-center mt-6">
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <Heart 
                key={i}
                className="w-3 h-3 text-primary fill-primary opacity-50"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

const LoveMessage = () => {
  return (
    <section className="relative py-20 px-6">
      {/* Background decoration */}
      <div className="absolute inset-0 romantic-gradient opacity-5"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            What You Mean to Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let me tell you from the depths of my heart...
          </p>
        </div>
        
        {/* Message cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {messages.map((message, index) => (
            <MessageCard key={index} message={message} index={index} />
          ))}
        </div>
        
        {/* Central love declaration */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/30 shadow-[0_20px_60px_-10px_hsl(var(--primary)/0.3)] animate-scale-in">
            <div className="text-center space-y-6">
              {/* Large heart */}
              <div className="flex justify-center">
                <div className="relative">
                  <Heart className="w-16 h-16 text-primary fill-primary animate-pulse-soft" />
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl animate-pulse-soft"></div>
                </div>
              </div>
              
              {/* Main message */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient leading-tight">
                I Love You
              </h2>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                These three words don't seem enough to express what I feel for you. 
                You've captured my heart completely, and I want to spend every moment showing you how much you mean to me.
              </p>
              
              {/* Decorative hearts */}
              <div className="flex justify-center gap-3 pt-4">
                {[...Array(5)].map((_, i) => (
                  <Heart 
                    key={i}
                    className="w-4 h-4 text-primary fill-primary animate-pulse-soft"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LoveMessage;