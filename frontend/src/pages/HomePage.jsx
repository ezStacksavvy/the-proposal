import React, { useState, useEffect, useRef } from 'react';
import HeroSection from '../components/HeroSection';
import LoveMessage from '../components/LoveMessage';
import FloatingHearts from '../components/FloatingHearts';
import FinalQuestion from '../components/FinalQuestion';
import ResponseModal from '../components/ResponseModal';
import MusicPlayer from '../components/MusicPlayer';

const HomePage = () => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userResponse, setUserResponse] = useState(null);

  useEffect(() => {
    // Show question section after scrolling or timer
    const timer = setTimeout(() => {
      setShowQuestion(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleResponse = (response) => {
    setUserResponse(response);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating hearts background */}
      <FloatingHearts />
      
      {/* Music player */}
      <MusicPlayer />
      
      {/* Main content */}
      <div className="relative z-10">
        <HeroSection />
        <LoveMessage />
        
        {/* Final question with smooth fade-in */}
        <div className={`transition-all duration-1000 ${
          showQuestion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <FinalQuestion onResponse={handleResponse} />
        </div>
      </div>

      {/* Response modal */}
      {showModal && (
        <ResponseModal 
          response={userResponse} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
};

export default HomePage;