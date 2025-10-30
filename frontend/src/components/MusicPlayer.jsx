import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  // Romantic instrumental music URL (free to use)
  const musicUrl = "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3"; // Romantic Piano

  useEffect(() => {
    // Try to play music after user interaction
    const playAudio = async () => {
      if (audioRef.current && hasInteracted) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Autoplay prevented:", error);
        }
      }
    };

    playAudio();
  }, [hasInteracted]);

  useEffect(() => {
    // Enable interaction on first click/touch
    const enableAudio = () => {
      setHasInteracted(true);
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };

    document.addEventListener('click', enableAudio);
    document.addEventListener('touchstart', enableAudio);

    return () => {
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };
  }, []);

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setHasInteracted(true);
        } catch (error) {
          console.log("Play failed:", error);
        }
      }
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        preload="auto"
      />

      {/* Music control button - fixed position */}
      <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
        <Button
          onClick={togglePlay}
          size="lg"
          className="group relative h-14 w-14 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-110 backdrop-blur-sm"
          title={isPlaying ? "Pause music" : "Play music"}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          
          {/* Icon with animation */}
          <div className="relative">
            {isPlaying ? (
              <Volume2 className="w-6 h-6 animate-pulse-soft" />
            ) : (
              <VolumeX className="w-6 h-6" />
            )}
          </div>

          {/* Pulsing ring when playing */}
          {isPlaying && (
            <div className="absolute inset-0 rounded-full border-2 border-primary-foreground/30 animate-ping"></div>
          )}
        </Button>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-foreground/90 text-background px-3 py-1.5 rounded-lg text-sm whitespace-nowrap backdrop-blur-sm">
            {isPlaying ? "Pause romantic music" : "Play romantic music"}
          </div>
        </div>
      </div>

      {/* Music info badge - shows initially then fades */}
      {!hasInteracted && (
        <div className="fixed top-6 right-6 z-40 animate-fade-in">
          <div className="flex items-center gap-2 bg-primary/90 text-primary-foreground px-4 py-2 rounded-full shadow-lg backdrop-blur-sm animate-pulse-soft">
            <Music className="w-4 h-4" />
            <span className="text-sm font-medium">Click anywhere to start music</span>
          </div>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
