import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import LoveMessage from '../components/LoveMessage';
import FloatingHearts from '../components/FloatingHearts';
import FinalQuestion from '../components/FinalQuestion';
import ResponseModal from '../components/ResponseModal';
import MusicPlayer from '../components/MusicPlayer';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userResponse, setUserResponse] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Show question section after scrolling or timer
    const timer = setTimeout(() => {
      setShowQuestion(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleResponse = async (response) => {
    setUserResponse(response);
    setIsSaving(true);

    try {
      // Save response to backend
      await axios.post(`${API}/confession/response`, {
        response: response,
        ip_address: null, // Optional: can add IP detection
        user_agent: navigator.userAgent
      });

      console.log('Response saved successfully:', response);
    } catch (error) {
      console.error('Error saving response:', error);
      // Still show modal even if save fails
    } finally {
      setIsSaving(false);
      setShowModal(true);
    }
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
          <FinalQuestion onResponse={handleResponse} isLoading={isSaving} />
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