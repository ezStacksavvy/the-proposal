import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Create initial hearts
    const initialHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
      size: 20 + Math.random() * 20,
      opacity: 0.1 + Math.random() * 0.2
    }));
    setHearts(initialHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            animation: `floatUp ${heart.duration}s ease-in infinite`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity
          }}
        >
          <Heart
            className="text-primary fill-primary"
            style={{
              width: `${heart.size}px`,
              height: `${heart.size}px`
            }}
          />
        </div>
      ))}
      
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--opacity);
          }
          90% {
            opacity: var(--opacity);
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingHearts;