'use client';

import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import vinhetaAnimation from '../../../../1920x1080.json';

interface SplashScreenProps {
  onComplete?: () => void;
  onFinish?: () => void;
  duration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  onFinish,
  duration = 2400,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const animationContainerRef = useRef<HTMLDivElement | null>(null);

  const handleDone = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
      if (onFinish) onFinish();
    }, 600);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleDone();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (!animationContainerRef.current) return;

    const animation = lottie.loadAnimation({
      container: animationContainerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: vinhetaAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
        clearCanvas: true,
        progressiveLoad: true,
      },
    });

    return () => {
      animation.destroy();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      onClick={handleDone}
      className={`fixed inset-0 z-[9999] bg-[#050611] overflow-hidden cursor-pointer select-none transition-all duration-700 ease-in-out ${isExiting ? 'opacity-0 scale-[1.02] pointer-events-none blur-sm' : 'opacity-100 scale-100'}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,46,151,0.18),_transparent_45%),linear-gradient(180deg,_#0a0d18_0%,_#050611_100%)]" />
      <div
        ref={animationContainerRef}
        className="absolute inset-0 z-10 w-screen h-screen overflow-hidden"
        style={{ transform: 'scale(1.08)' }}
      />
    </div>
  );
};
