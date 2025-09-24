'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GeminiService from '@/services/gemini';
import { getThemeColors, getButtonClass } from '@/utils/theme';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIChatProps {
  isVisible: boolean;
  onToggle: () => void;
  theme: string;
  currentContext?: string;
}

const AIChat: React.FC<AIChatProps> = ({ isVisible, onToggle, theme, currentContext }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to Bhavana\'s AI Assistant! I can help you navigate the portfolio, explain technologies, generate code, or just chat about development.',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const themeColors = getThemeColors(theme);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await GeminiService.chatWithAI(input, currentContext);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickCommands = [
    { text: 'Explain React', action: () => setInput('Explain React framework') },
    { text: 'Show projects', action: () => setInput('Tell me about the projects') },
    { text: 'Generate code', action: () => setInput('Generate a React component') },
    { text: 'ASCII art', action: () => setInput('Create ASCII art of a cat') }
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-4 bottom-4 w-80 sm:w-96 h-96 z-50"
    >
      <div className={`border-2 ${themeColors.border} ${themeColors.bg} ${themeColors.text} rounded-lg overflow-hidden shadow-2xl font-mono h-full flex flex-col`}>
        {/* Header */}
        <div className={`px-4 py-2 border-b ${themeColors.border} border-opacity-30 flex items-center justify-between`}>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold">AI Assistant</span>
          </div>
          <button
            onClick={onToggle}
            className="text-xl hover:opacity-75 transition-opacity"
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs p-2 rounded ${
                  message.isUser 
                    ? `${themeColors.accent} text-white` 
                    : `${themeColors.secondary} ${themeColors.text}`
                }`}>
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <span className="text-xs opacity-50 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className={`${themeColors.secondary} p-2 rounded`}>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  AI is thinking...
                </motion.div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Commands */}
        <div className={`px-3 py-2 border-t ${themeColors.border} border-opacity-30`}>
          <div className="flex flex-wrap gap-1 mb-2">
            {quickCommands.map((cmd, index) => (
              <button
                key={index}
                onClick={cmd.action}
                className={`${getButtonClass(theme, 'secondary')} text-xs px-2 py-1`}
              >
                {cmd.text}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className={`p-3 border-t ${themeColors.border} border-opacity-30`}>
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className={`flex-1 ${themeColors.bg} ${themeColors.text} border ${themeColors.border} rounded px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-opacity-50`}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className={`${getButtonClass(theme, 'primary')} text-xs disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIChat;