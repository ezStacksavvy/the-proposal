import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Heart, Sparkles, PartyPopper } from 'lucide-react';
import { Button } from './ui/button';

const ResponseModal = ({ response, onClose }) => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    if (response === 'yes') {
      // Create confetti effect
      const confettiItems = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2
      }));
      setConfetti(confettiItems);
    }
  }, [response]);

  const yesContent = (
    <div className="text-center space-y-6 py-8">
      {/* Celebration icons */}
      <div className="flex justify-center gap-4 animate-bounce">
        <PartyPopper className="w-12 h-12 text-primary" />
        <Heart className="w-16 h-16 text-primary fill-primary animate-pulse-soft" />
        <PartyPopper className="w-12 h-12 text-primary" />
      </div>
      
      {/* Main message */}
      <div className="space-y-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-gradient">
          You Made Me The
          <br />
          Happiest Person!
        </h2>
        
        <p className="text-xl text-muted-foreground leading-relaxed max-w-md mx-auto">
          I promise to love you, cherish you, and make you smile every single day.
          This is the beginning of our beautiful forever! 💕
        </p>
      </div>
      
      {/* Animated hearts */}
      <div className="flex justify-center gap-2 pt-4">
        {[...Array(9)].map((_, i) => (
          <Heart 
            key={i}
            className="w-4 h-4 text-primary fill-primary animate-pulse-soft"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
      
      <Button
        onClick={onClose}
        size="lg"
        className="mt-8 px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
      >
        <Heart className="w-5 h-5 mr-2 fill-current" />
        Close
      </Button>
    </div>
  );

  const maybeContent = (
    <div className="text-center space-y-6 py-8">
      {/* Gentle icons */}
      <div className="flex justify-center">
        <div className="relative">
          <Heart className="w-16 h-16 text-primary fill-primary/30" />
          <Sparkles className="w-8 h-8 text-primary absolute -top-2 -right-2" />
        </div>
      </div>
      
      {/* Understanding message */}
      <div className="space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          I Understand
        </h2>
        
        <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
          Take all the time you need. My feelings won't change.
          I'll be here, waiting patiently, because you're worth the wait. 💝
        </p>
      </div>
      
      <Button
        onClick={onClose}
        size="lg"
        variant="outline"
        className="mt-8 px-8 py-6 text-lg border-2 border-primary/40 rounded-full"
      >
        Close
      </Button>
    </div>
  );

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl border-2 border-primary/30 shadow-[0_30px_100px_-20px_hsl(var(--primary)/0.5)]">
          {response === 'yes' ? yesContent : maybeContent}
        </DialogContent>
      </Dialog>
      
      {/* Confetti effect for 'yes' response */}
      {response === 'yes' && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          {confetti.map((item) => (
            <div
              key={item.id}
              className="absolute"
              style={{
                left: `${item.left}%`,
                top: '-20px',
                animation: `fall ${item.duration}s linear forwards`,
                animationDelay: `${item.delay}s`
              }}
            >
              <Heart
                className="text-primary fill-primary"
                style={{
                  width: '20px',
                  height: '20px',
                  transform: 'rotate(' + (Math.random() * 360) + 'deg)'
                }}
              />
            </div>
          ))}
          <style jsx>{`
            @keyframes fall {
              to {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default ResponseModal;