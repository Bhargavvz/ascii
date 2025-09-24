'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateASCIIText } from '@/utils/ascii';
import GeminiService from '@/services/gemini';
import { getThemeColors, getButtonClass } from '@/utils/theme';

interface AdvancedASCIIProps {
  isVisible: boolean;
  onToggle: () => void;
  theme: string;
}

const AdvancedASCII: React.FC<AdvancedASCIIProps> = ({ isVisible, onToggle, theme }) => {
  const [asciiArt, setAsciiArt] = useState('');
  const [customText, setCustomText] = useState('HELLO');
  const [selectedFont, setSelectedFont] = useState('ANSI Shadow');
  const [animationType, setAnimationType] = useState('typewriter');
  const [isAnimating, setIsAnimating] = useState(false);
  const [artHistory, setArtHistory] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const themeColors = getThemeColors(theme);

  const fonts = [
    'ANSI Shadow', 'Big', 'Block', 'Doom', 'Isometric1', 'Isometric2',
    'Larry 3D', 'Slant', 'Small', 'Speed', 'Starwars', 'Stop'
  ];

  const animationTypes = [
    { id: 'typewriter', name: 'Typewriter', description: 'Character by character' },
    { id: 'fadeIn', name: 'Fade In', description: 'Gradual appearance' },
    { id: 'slideIn', name: 'Slide In', description: 'Slide from side' },
    { id: 'matrix', name: 'Matrix Rain', description: 'Matrix-style effect' },
    { id: 'wave', name: 'Wave', description: 'Wavy animation' },
    { id: 'glitch', name: 'Glitch', description: 'Digital glitch effect' }
  ];

  const generateArt = async () => {
    if (!customText.trim()) return;
    
    setIsAnimating(true);
    try {
      const art = await generateASCIIText(customText, { font: selectedFont });
      setAsciiArt(art);
      setArtHistory(prev => [art, ...prev.slice(0, 4)]); // Keep last 5
    } catch (error) {
      setAsciiArt('Error generating ASCII art');
    } finally {
      setIsAnimating(false);
    }
  };

  const generateAIArt = async () => {
    const description = prompt('Describe what ASCII art you want (e.g., "a cat", "a house"):');
    if (!description) return;

    setIsAnimating(true);
    try {
      const art = await GeminiService.generateASCIIArt(description);
      setAsciiArt(art);
      setArtHistory(prev => [art, ...prev.slice(0, 4)]);
    } catch (error) {
      setAsciiArt('Error generating AI ASCII art');
    } finally {
      setIsAnimating(false);
    }
  };

  const createMatrixRain = () => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const width = 80;
    const height = 20;
    let result = '';
    
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (Math.random() > 0.85) {
          result += chars[Math.floor(Math.random() * chars.length)];
        } else {
          result += ' ';
        }
      }
      result += '\n';
    }
    
    setAsciiArt(result);
    setIsAnimating(false);
  };

  const createWaveEffect = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIndex) => (
      <motion.div
        key={lineIndex}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ 
          delay: lineIndex * 0.1,
          type: 'spring',
          stiffness: 100
        }}
        style={{
          transform: `translateY(${Math.sin(lineIndex * 0.5) * 5}px)`
        }}
      >
        {line}
      </motion.div>
    ));
  };

  const createGlitchEffect = (text: string) => {
    const GlitchText: React.FC<{ text: string }> = ({ text }) => {
      const [glitchText, setGlitchText] = useState(text);
      
      useEffect(() => {
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        let glitchCount = 0;
        
        const glitchInterval = setInterval(() => {
          if (glitchCount < 5) {
            const lines = text.split('\n');
            const glitchedLines = lines.map(line => {
              return line.split('').map(char => {
                if (Math.random() < 0.1 && char !== ' ') {
                  return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                }
                return char;
              }).join('');
            });
            setGlitchText(glitchedLines.join('\n'));
            glitchCount++;
          } else {
            setGlitchText(text);
            clearInterval(glitchInterval);
          }
        }, 100);

        return () => clearInterval(glitchInterval);
      }, [text]);

      return <pre className="font-mono whitespace-pre">{glitchText}</pre>;
    };

    return <GlitchText text={text} />;
  };

  const createTypewriterEffect = (text: string) => {
    const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
      const [displayText, setDisplayText] = useState('');
      const [currentIndex, setCurrentIndex] = useState(0);

      useEffect(() => {
        setDisplayText('');
        setCurrentIndex(0);
      }, [text]);

      useEffect(() => {
        if (currentIndex < text.length) {
          const timer = setTimeout(() => {
            setDisplayText(prev => prev + text[currentIndex]);
            setCurrentIndex(prev => prev + 1);
          }, 20);
          return () => clearTimeout(timer);
        }
      }, [currentIndex, text]);

      return (
        <pre className="font-mono whitespace-pre">
          {displayText}
          {currentIndex < text.length && (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="bg-green-400 text-black"
            >
              █
            </motion.span>
          )}
        </pre>
      );
    };

    return <TypewriterText text={text} />;
  };

  const renderAnimatedArt = () => {
    if (!asciiArt) return null;

    switch (animationType) {
      case 'typewriter':
        return createTypewriterEffect(asciiArt);
      case 'fadeIn':
        return (
          <motion.pre
            className="font-mono whitespace-pre"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            {asciiArt}
          </motion.pre>
        );
      case 'slideIn':
        return (
          <motion.pre
            className="font-mono whitespace-pre"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            {asciiArt}
          </motion.pre>
        );
      case 'wave':
        return <div className="font-mono">{createWaveEffect(asciiArt)}</div>;
      case 'glitch':
        return createGlitchEffect(asciiArt);
      case 'matrix':
        return (
          <motion.pre
            className="font-mono whitespace-pre text-green-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {asciiArt}
          </motion.pre>
        );
      default:
        return <pre className="font-mono whitespace-pre">{asciiArt}</pre>;
    }
  };

  const downloadArt = () => {
    const blob = new Blob([asciiArt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ascii-art-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(asciiArt);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-2 sm:inset-4 z-50"
    >
      <div className={`border-2 ${themeColors.border} ${themeColors.bg} ${themeColors.text} rounded-lg overflow-hidden shadow-2xl h-full flex flex-col`}>
        {/* Header */}
        <div className="px-4 py-2 border-b border-opacity-30 border-white flex items-center justify-between">
          <h2 className="text-lg font-bold">Advanced ASCII Art Studio</h2>
          <button onClick={onToggle} className={getButtonClass(theme, 'close')}>×</button>
        </div>

        <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
          {/* Controls Panel */}
          <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-opacity-30 border-white p-3 sm:p-4 overflow-y-auto max-h-60 lg:max-h-none">
            <div className="space-y-4">
              {/* Text Input */}
              <div>
                <label className="block text-sm font-bold mb-2">Text:</label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full p-2 bg-transparent border border-opacity-30 border-white rounded"
                  placeholder="Enter text..."
                />
              </div>

              {/* Font Selection */}
              <div>
                <label className="block text-sm font-bold mb-2">Font:</label>
                <select
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value)}
                  className={`${themeColors.bg} ${themeColors.text} border ${themeColors.border} rounded`}
                >
                  {fonts.map(font => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>

              {/* Animation Type */}
              <div>
                <label className="block text-sm font-bold mb-2">Animation:</label>
                <div className="grid grid-cols-2 gap-2">
                  {animationTypes.map(anim => (
                    <button
                      key={anim.id}
                      onClick={() => setAnimationType(anim.id)}
                      className={`p-2 text-xs border rounded transition-all ${
                        animationType === anim.id 
                          ? `${themeColors.accent} border-current` 
                          : `${themeColors.border} hover:${themeColors.secondary}`
                      }`}
                    >
                      <div className="font-bold">{anim.name}</div>
                      <div className="opacity-75">{anim.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={generateArt}
                  disabled={isAnimating || !customText.trim()}
                  className={`w-full p-2 ${getButtonClass(theme, 'primary')} disabled:opacity-50`}
                >
                  {isAnimating ? 'Generating...' : 'Generate ASCII Art'}
                </button>
                
                <button
                  onClick={generateAIArt}
                  disabled={isAnimating}
                  className={`w-full p-2 ${getButtonClass(theme, 'secondary')} disabled:opacity-50`}
                >
                  AI Generate Art
                </button>
                
                <button
                  onClick={createMatrixRain}
                  className={`w-full p-2 ${getButtonClass(theme, 'secondary')}`}
                >
                  Matrix Rain
                </button>
              </div>

              {/* Export Options */}
              {asciiArt && (
                <div className="space-y-2">
                  <button
                    onClick={copyToClipboard}
                    className={`w-full p-2 ${getButtonClass(theme, 'secondary')}`}
                  >
                    Copy to Clipboard
                  </button>
                  <button
                    onClick={downloadArt}
                    className={`w-full p-2 ${getButtonClass(theme, 'secondary')}`}
                  >
                    Download as TXT
                  </button>
                </div>
              )}

              {/* History */}
              {artHistory.length > 0 && (
                <div>
                  <label className="block text-sm font-bold mb-2">History:</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {artHistory.map((art, index) => (
                      <button
                        key={index}
                        onClick={() => setAsciiArt(art)}
                        className={`w-full p-2 text-xs border ${themeColors.border} rounded hover:${themeColors.secondary} transition-all text-left`}
                      >
                        <pre className="whitespace-pre overflow-hidden text-ellipsis">
                          {art.split('\n')[0].substring(0, 20)}...
                        </pre>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ASCII Art Display */}
          <div className="flex-1 p-4 overflow-auto">
            <div className="h-full flex items-center justify-center">
              {asciiArt ? (
                <div className="text-center">
                  <AnimatePresence mode="wait" key={animationType + asciiArt}>
                    {renderAnimatedArt()}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center opacity-50">
                  <div className="text-4xl mb-4">[ART]</div>
                  <div>Enter text and click &quot;Generate ASCII Art&quot; to begin</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdvancedASCII;