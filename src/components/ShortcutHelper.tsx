'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface KeyboardShortcuts {
  [key: string]: () => void;
}

interface ShortcutHelperProps {
  shortcuts: KeyboardShortcuts;
  theme: string;
  isVisible: boolean;
  onToggle: () => void;
}

const ShortcutHelper: React.FC<ShortcutHelperProps> = ({ shortcuts, theme, isVisible, onToggle }) => {
  const themeClasses = {
    matrix: 'bg-black border-green-500 text-green-400',
    amber: 'bg-amber-900 border-amber-400 text-amber-200',
    blue: 'bg-blue-900 border-blue-400 text-blue-200',
    classic: 'bg-gray-900 border-gray-500 text-gray-200'
  };

  const currentTheme = themeClasses[theme as keyof typeof themeClasses];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        onToggle();
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        const shortcutKey = `ctrl+${e.key.toLowerCase()}`;
        if (shortcuts[shortcutKey]) {
          e.preventDefault();
          shortcuts[shortcutKey]();
        }
      }

      if (e.key.startsWith('F') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const shortcutKey = e.key.toLowerCase();
        if (shortcuts[shortcutKey]) {
          e.preventDefault();
          shortcuts[shortcutKey]();
        }
      }

      if (e.key === 'Escape' && isVisible) {
        onToggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, isVisible, onToggle]);

  const shortcutList = [
    { key: 'Ctrl+/', description: 'Show/hide this help' },
    { key: 'Ctrl+L', description: 'Clear terminal screen' },
    { key: 'Ctrl+T', description: 'Change theme' },
    { key: 'Ctrl+H', description: 'Show help command' },
    { key: 'Ctrl+P', description: 'Show projects' },
    { key: 'Ctrl+S', description: 'Show skills' },
    { key: 'Ctrl+C', description: 'Show contact info' },
    { key: 'F1', description: 'Quick help' },
    { key: 'F2', description: 'Toggle matrix effect' },
    { key: 'F3', description: 'Generate random ASCII art' },
    { key: 'Esc', description: 'Close this dialog' }
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onToggle}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`border-2 ${currentTheme} rounded-lg p-6 max-w-md w-full font-mono`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Keyboard Shortcuts</h3>
          <button
            onClick={onToggle}
            className="text-xl hover:opacity-75"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-2 text-sm">
          {shortcutList.map((shortcut, index) => (
            <div key={index} className="flex justify-between">
              <span className="font-mono bg-opacity-20 bg-white px-2 py-1 rounded text-xs">
                {shortcut.key}
              </span>
              <span className="ml-4 flex-1 text-right opacity-75">
                {shortcut.description}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-opacity-30 border-white text-xs opacity-75 text-center">
          Press Esc to close or click outside
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShortcutHelper;