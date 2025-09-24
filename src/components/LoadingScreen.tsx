'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [loadingStep, setLoadingStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingSteps = [
    'Initializing terminal...',
    'Loading ASCII fonts...',
    'Connecting to portfolio server...',
    'Generating ASCII art...',
    'Setting up command interface...',
    'Welcome to the Matrix...'
  ];

  const asciiLoader = `
    ╔═════════════════════════════════════╗
    ║                                     ║
    ║   █████╗ ███████╗ ██████╗██╗██╗     ║
    ║  ██╔══██╗██╔════╝██╔════╝██║██║     ║
    ║  ███████║███████╗██║     ██║██║     ║
    ║  ██╔══██║╚════██║██║     ██║██║     ║
    ║  ██║  ██║███████║╚██████╗██║██║     ║
    ║  ╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝╚═╝     ║
    ║                                     ║
    ║         P O R T F O L I O           ║
    ║                                     ║
    ╚═════════════════════════════════════╝
  `;

  const mobileAsciiLoader = `
    ╔════════════════════╗
    ║                    ║
    ║    [█] [█] [█]     ║
    ║                    ║
    ║  P O R T F O L I O ║
    ║                    ║
    ╚════════════════════╝
  `;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setLoadingStep(prev => (prev + 1) % loadingSteps.length);
    }, 800);

    return () => clearInterval(stepTimer);
  }, []);

  const createProgressBar = (percentage: number) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const totalBlocks = isMobile ? 15 : 30;
    const filledBlocks = Math.floor((percentage / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black text-green-400 font-mono flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center w-full max-w-lg">
        <motion.pre
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-xs sm:text-sm md:text-base text-green-300 mb-4 sm:mb-8 overflow-x-auto"
        >
          <div className="hidden sm:block">{asciiLoader}</div>
          <div className="block sm:hidden">{mobileAsciiLoader}</div>
        </motion.pre>
        
        <motion.div 
          className="mb-4 sm:mb-6 px-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-xs sm:text-sm mb-2 break-words">{loadingSteps[loadingStep]}</div>
          <div className="text-xs mb-2 sm:mb-4 text-green-300 overflow-x-auto">
            <div className="whitespace-nowrap">
              [{createProgressBar(progress)}] {progress}%
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-xs sm:text-sm text-green-500 px-2"
        >
          <span className="hidden sm:inline">Press any key to continue...</span>
          <span className="inline sm:hidden">Tap to continue...</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;