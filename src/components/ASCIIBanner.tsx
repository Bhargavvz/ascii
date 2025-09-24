'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ASCIIBannerProps {
  text: string;
  className?: string;
  animation?: 'typewriter' | 'fade' | 'none';
  speed?: number;
}

const ASCIIBanner: React.FC<ASCIIBannerProps> = ({ 
  text, 
  className = '', 
  animation = 'fade',
  speed = 50 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (animation === 'typewriter') {
      const timer = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        } else {
          clearInterval(timer);
        }
      }, speed);

      return () => clearInterval(timer);
    } else {
      setDisplayText(text);
    }
  }, [text, animation, speed, currentIndex]);

  const renderWithAnimation = () => {
    switch (animation) {
      case 'typewriter':
        return (
          <pre className={`font-mono whitespace-pre-wrap ${className}`}>
            {displayText}
            {currentIndex < text.length && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                █
              </motion.span>
            )}
          </pre>
        );
      case 'fade':
        return (
          <motion.pre
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`font-mono whitespace-pre-wrap ${className}`}
          >
            {displayText}
          </motion.pre>
        );
      default:
        return (
          <pre className={`font-mono whitespace-pre-wrap ${className}`}>
            {displayText}
          </pre>
        );
    }
  };

  return renderWithAnimation();
};

export default ASCIIBanner;