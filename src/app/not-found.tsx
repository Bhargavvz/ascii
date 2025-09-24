'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const NotFoundPage = () => {
  const [theme, setTheme] = useState('matrix');
  const [animatedText, setAnimatedText] = useState('');
  const [showGlitch, setShowGlitch] = useState(false);

  const themes = {
    matrix: {
      bg: 'bg-black',
      text: 'text-green-400',
      accent: 'text-green-300',
      border: 'border-green-500'
    },
    amber: {
      bg: 'bg-amber-900',
      text: 'text-amber-200',
      accent: 'text-amber-100',
      border: 'border-amber-400'
    },
    blue: {
      bg: 'bg-blue-900',
      text: 'text-blue-200',
      accent: 'text-blue-100',
      border: 'border-blue-400'
    },
    classic: {
      bg: 'bg-gray-900',
      text: 'text-gray-200',
      accent: 'text-gray-100',
      border: 'border-gray-500'
    }
  };

  const currentTheme = themes[theme as keyof typeof themes];

  const ascii404 = `
    ██╗  ██╗ ██████╗ ██╗  ██╗
    ██║  ██║██╔═████╗██║  ██║
    ███████║██║██╔██║███████║
    ╚════██║████╔╝██║╚════██║
         ██║╚██████╔╝     ██║
         ╚═╝ ╚═════╝      ╚═╝
                             
    ███╗   ██╗ ██████╗ ████████╗
    ████╗  ██║██╔═══██╗╚══██╔══╝
    ██╔██╗ ██║██║   ██║   ██║   
    ██║╚██╗██║██║   ██║   ██║   
    ██║ ╚████║╚██████╔╝   ██║   
    ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   
                              
    ███████╗ ██████╗ ██╗   ██╗███╗   ██╗██████╗ 
    ██╔════╝██╔═══██╗██║   ██║████╗  ██║██╔══██╗
    █████╗  ██║   ██║██║   ██║██╔██╗ ██║██║  ██║
    ██╔══╝  ██║   ██║██║   ██║██║╚██╗██║██║  ██║
    ██║     ╚██████╔╝╚██████╔╝██║ ╚████║██████╔╝
    ╚═╝      ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═════╝ 
  `;

  const terminalMessages = [
    'ERROR: File not found in the matrix...',
    'SCANNING: /dev/null/404.html',
    'STATUS: Page does not exist in this dimension',
    'SUGGESTION: Try navigating back to reality',
    'HINT: The path you seek is not in this terminal'
  ];

  useEffect(() => {
    // Animated typing effect
    const message = "Page not found. The terminal cannot locate the requested resource.";
    let i = 0;
    const interval = setInterval(() => {
      if (i < message.length) {
        setAnimatedText(message.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    // Glitch effect
    const glitchInterval = setInterval(() => {
      setShowGlitch(true);
      setTimeout(() => setShowGlitch(false), 200);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
    };
  }, []);

  const matrixRain = () => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    return Array.from({ length: 20 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute text-green-400 opacity-30 text-xs font-mono"
        style={{
          left: `${Math.random() * 100}%`,
          top: '-20px'
        }}
        animate={{
          y: screenHeight + 20,
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2
        }}
      >
        {characters[Math.floor(Math.random() * characters.length)]}
      </motion.div>
    ));
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} font-mono relative overflow-hidden`}>
      {/* Matrix rain effect for matrix theme */}
      {theme === 'matrix' && (
        <div className="absolute inset-0 pointer-events-none">
          {matrixRain()}
        </div>
      )}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`w-full max-w-4xl border-2 ${currentTheme.border} rounded-lg overflow-hidden shadow-2xl`}
        >
          {/* Terminal Header */}
          <div className={`${currentTheme.accent} bg-opacity-20 px-4 py-2 border-b ${currentTheme.border} flex items-center justify-between`}>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-sm">terminal://error/404</span>
            <div className="flex space-x-2">
              {Object.keys(themes).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`w-6 h-6 rounded-full border-2 ${theme === t ? 'border-white' : 'border-gray-600'} ${
                    t === 'matrix' ? 'bg-green-500' :
                    t === 'amber' ? 'bg-amber-500' :
                    t === 'blue' ? 'bg-blue-500' :
                    'bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 space-y-6">
            {/* ASCII Art */}
            <motion.div
              className={`text-center font-mono text-xs sm:text-sm ${currentTheme.accent} ${showGlitch ? 'animate-pulse' : ''}`}
              style={{ 
                fontFamily: 'monospace',
                lineHeight: '1.2',
                transform: showGlitch ? 'translateX(2px)' : 'none',
                filter: showGlitch ? 'blur(1px)' : 'none'
              }}
            >
              <pre className="whitespace-pre-wrap">{ascii404}</pre>
            </motion.div>

            {/* Error Messages */}
            <div className="space-y-2">
              {terminalMessages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3 + 1 }}
                  className="flex items-center space-x-2"
                >
                  <span className={currentTheme.accent}>$</span>
                  <span className="text-sm">{message}</span>
                </motion.div>
              ))}
            </div>

            {/* Animated typing text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="border-t border-opacity-30 border-white pt-4"
            >
              <div className="flex items-center space-x-2">
                <span className={currentTheme.accent}>user@portfolio:~$</span>
                <span className="text-sm">{animatedText}</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className={currentTheme.accent}
                >
                  █
                </motion.span>
              </div>
            </motion.div>

            {/* Navigation Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3 }}
              className="space-y-4 border-t border-opacity-30 border-white pt-6"
            >
              <div className="text-center">
                <h3 className={`text-lg font-bold ${currentTheme.accent} mb-4`}>
                  Available Commands:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full px-6 py-3 border ${currentTheme.border} rounded font-mono text-sm hover:bg-opacity-20 hover:bg-white transition-all`}
                    >
                      cd ~/home
                    </motion.button>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.history.back()}
                    className={`w-full px-6 py-3 border ${currentTheme.border} rounded font-mono text-sm hover:bg-opacity-20 hover:bg-white transition-all`}
                  >
                    cd ../
                  </motion.button>
                </div>
              </div>

              {/* Fun facts */}
              <div className={`text-center text-xs opacity-75 ${currentTheme.text}`}>
                <p>Fun fact: HTTP 404 means "Not Found" - first documented in 1992</p>
                <p>This terminal has been running for {Math.floor(Math.random() * 365)} days without errors (until now)</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          className={`mt-8 text-center text-sm opacity-75 ${currentTheme.text}`}
        >
          <p>Error 404 - Page not found in the matrix</p>
          <p className="mt-2">Built with ❤️ and lots of ASCII art</p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;