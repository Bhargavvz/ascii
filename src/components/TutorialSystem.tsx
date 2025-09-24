'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getThemeColors, getButtonClass } from '@/utils/theme';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  command?: string;
  expectedOutput?: string;
  hints: string[];
  target?: string; // CSS selector for highlighting
  position?: 'top' | 'bottom' | 'left' | 'right';
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  steps: TutorialStep[];
  category: 'basics' | 'features' | 'advanced';
}

const tutorials: Tutorial[] = [
  {
    id: 'terminal_basics',
    title: 'Terminal Basics',
    description: 'Learn the fundamental commands to navigate the portfolio',
    difficulty: 'beginner',
    estimatedTime: 5,
    category: 'basics',
    steps: [
      {
        id: 'welcome',
        title: 'Welcome to the Terminal',
        description: 'This is a terminal-style portfolio. You can interact with it using commands just like a real terminal.',
        hints: ['Commands are typed at the prompt and executed with Enter', 'Try typing "help" to see available commands']
      },
      {
        id: 'help_command',
        title: 'Getting Help',
        description: 'The most important command is "help" - it shows you all available commands.',
        command: 'help',
        hints: ['Type "help" and press Enter', 'This will show you a list of all available commands']
      },
      {
        id: 'list_files',
        title: 'Listing Files',
        description: 'Use "ls" to see what\'s in the current directory.',
        command: 'ls',
        hints: ['Type "ls" to list directory contents', 'You\'ll see folders and files you can explore']
      },
      {
        id: 'navigation',
        title: 'Changing Directories',
        description: 'Navigate to different folders using the "cd" command.',
        command: 'cd projects',
        hints: ['Type "cd projects" to enter the projects folder', 'Use "cd .." to go back to the parent directory']
      },
      {
        id: 'reading_files',
        title: 'Reading File Contents',
        description: 'Use "cat" to read the contents of files.',
        command: 'cat README.md',
        hints: ['Type "cat README.md" to read the README file', 'This works with any text file in the current directory']
      }
    ]
  },
  {
    id: 'portfolio_exploration',
    title: 'Portfolio Exploration',
    description: 'Discover all the portfolio features and content',
    difficulty: 'beginner',
    estimatedTime: 8,
    category: 'features',
    steps: [
      {
        id: 'view_projects',
        title: 'Viewing Projects',
        description: 'Use the "projects" command to see all portfolio projects.',
        command: 'projects',
        hints: ['Type "projects" to see all available projects', 'You can view specific projects with "projects <project-id>"']
      },
      {
        id: 'check_skills',
        title: 'Technical Skills',
        description: 'See the technical skills and proficiency levels.',
        command: 'skills',
        hints: ['Type "skills" to see technical abilities', 'Skills are displayed with visual progress bars']
      },
      {
        id: 'work_experience',
        title: 'Work Experience',
        description: 'Review professional experience and career history.',
        command: 'experience',
        hints: ['Type "experience" to see work history', 'This shows detailed career progression']
      },
      {
        id: 'contact_info',
        title: 'Contact Information',
        description: 'Find ways to get in touch.',
        command: 'contact',
        hints: ['Type "contact" to see contact details', 'This includes email, GitHub, LinkedIn, and website']
      },
      {
        id: 'personal_info',
        title: 'Personal Information',
        description: 'Learn more about the portfolio owner.',
        command: 'whoami',
        hints: ['Type "whoami" to see personal information', 'This shows bio, location, and current role']
      }
    ]
  },
  {
    id: 'advanced_features',
    title: 'Advanced Features',
    description: 'Explore AI chat, code editor, games, and other advanced features',
    difficulty: 'intermediate',
    estimatedTime: 15,
    category: 'advanced',
    steps: [
      {
        id: 'ai_chat',
        title: 'AI Assistant',
        description: 'Open the AI chat assistant for interactive help.',
        hints: ['Look for the chat icon in the interface', 'The AI can help with questions about the portfolio and technology']
      },
      {
        id: 'code_editor',
        title: 'Code Editor',
        description: 'Try the integrated code editor with AI assistance.',
        hints: ['Open the code editor from the interface', 'You can generate and improve code with AI help']
      },
      {
        id: 'games',
        title: 'Terminal Games',
        description: 'Play interactive games built into the terminal.',
        hints: ['Access games through the interface or commands', 'Try Snake, Tetris, Memory game, or Speed typing']
      },
      {
        id: 'ascii_art',
        title: 'ASCII Art Studio',
        description: 'Create custom ASCII art with various fonts and animations.',
        command: 'ascii HELLO',
        hints: ['Use "ascii <text>" to generate ASCII art', 'Try different fonts and animation styles']
      },
      {
        id: 'themes',
        title: 'Theme Switching',
        description: 'Change the visual theme of the terminal.',
        command: 'theme matrix',
        hints: ['Use "theme <name>" to switch themes', 'Available themes: matrix, amber, blue, classic']
      },
      {
        id: 'easter_eggs',
        title: 'Easter Eggs',
        description: 'Discover hidden features and fun surprises.',
        command: 'matrix',
        hints: ['Try the "matrix" command for a special effect', 'There are other hidden commands to discover!']
      }
    ]
  },
  {
    id: 'productivity_tips',
    title: 'Productivity Tips',
    description: 'Learn shortcuts and advanced usage patterns',
    difficulty: 'advanced',
    estimatedTime: 10,
    category: 'advanced',
    steps: [
      {
        id: 'keyboard_shortcuts',
        title: 'Keyboard Shortcuts',
        description: 'Learn useful keyboard shortcuts for faster navigation.',
        hints: ['Press Ctrl+/ to see all keyboard shortcuts', 'Use arrow keys for command history', 'Tab key provides command completion']
      },
      {
        id: 'command_history',
        title: 'Command History',
        description: 'Navigate through previously used commands.',
        hints: ['Use up/down arrow keys to browse command history', 'This saves time when repeating commands']
      },
      {
        id: 'batch_operations',
        title: 'Multiple Commands',
        description: 'Execute multiple commands efficiently.',
        hints: ['Some commands can be chained together', 'Use specific project IDs for direct access']
      },
      {
        id: 'search_features',
        title: 'Search and Filter',
        description: 'Use advanced search and filtering capabilities.',
        hints: ['Many commands accept parameters for filtering', 'Try "skills programming" or "projects <id>"']
      }
    ]
  }
];

interface TutorialSystemProps {
  isVisible: boolean;
  onToggle: () => void;
  theme: string;
  onCommandSuggestion: (command: string) => void;
  onTutorialCompleted?: () => void;
}

export const TutorialSystem: React.FC<TutorialSystemProps> = ({
  isVisible,
  onToggle,
  theme,
  onCommandSuggestion,
  onTutorialCompleted
}) => {
  const [activeTutorial, setActiveTutorial] = useState<Tutorial | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedTutorials, setCompletedTutorials] = useState<string[]>([]);
  const [isStepComplete, setIsStepComplete] = useState(false);

  const themeColors = getThemeColors(theme);

  useEffect(() => {
    const saved = localStorage.getItem('completed-tutorials');
    if (saved) {
      setCompletedTutorials(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('completed-tutorials', JSON.stringify(completedTutorials));
  }, [completedTutorials]);

  const startTutorial = (tutorial: Tutorial) => {
    setActiveTutorial(tutorial);
    setCurrentStepIndex(0);
    setIsStepComplete(false);
  };

  const nextStep = () => {
    if (!activeTutorial) return;

    if (currentStepIndex < activeTutorial.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setIsStepComplete(false);
    } else {
      // Tutorial completed
      if (!completedTutorials.includes(activeTutorial.id)) {
        setCompletedTutorials(prev => [...prev, activeTutorial.id]);
        onTutorialCompleted?.(); // Notify parent component
      }
      setActiveTutorial(null);
      setCurrentStepIndex(0);
    }
  };

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setIsStepComplete(false);
    }
  };

  const closeTutorial = () => {
    setActiveTutorial(null);
    setCurrentStepIndex(0);
    setIsStepComplete(false);
  };

  const executeCommand = (command: string) => {
    onCommandSuggestion(command);
    setIsStepComplete(true);
  };

  const difficultyColors = {
    beginner: 'text-green-400',
    intermediate: 'text-yellow-400',
    advanced: 'text-red-400'
  };

  const categoryIcons = {
    basics: '📚',
    features: '⚙️',
    advanced: '[ADV]'
  };

  const currentStep = activeTutorial?.steps[currentStepIndex];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-8 z-50"
    >
      <div className={`border-2 ${themeColors.border} rounded-lg overflow-hidden shadow-2xl h-full flex flex-col`}>
        {/* Header */}
        <div className="px-4 py-2 border-b border-opacity-30 border-white flex items-center justify-between">
          <h2 className="text-lg font-bold">
            {activeTutorial ? `📖 ${activeTutorial.title}` : '🎓 Interactive Tutorials'}
          </h2>
          <button onClick={onToggle} className="text-xl hover:opacity-75">×</button>
        </div>

        {!activeTutorial ? (
          /* Tutorial Selection */
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-6">
              <p className="text-sm opacity-75 mb-4">
                Choose a tutorial to learn how to use this terminal portfolio effectively.
                Each tutorial is interactive and will guide you step by step.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {tutorials.map(tutorial => (
                  <motion.div
                    key={tutorial.id}
                    className="border border-opacity-30 border-white rounded-lg p-4 hover:bg-opacity-10 hover:bg-white transition-all cursor-pointer"
                    onClick={() => startTutorial(tutorial)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{categoryIcons[tutorial.category]}</span>
                        <h3 className="font-bold">{tutorial.title}</h3>
                      </div>
                      {completedTutorials.includes(tutorial.id) && (
                        <span className="text-green-400">[X]</span>
                      )}
                    </div>
                    
                    <p className="text-sm opacity-75 mb-3">{tutorial.description}</p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-bold ${difficultyColors[tutorial.difficulty]}`}>
                        {tutorial.difficulty.toUpperCase()}
                      </span>
                      <span className="opacity-75">
                        ~{tutorial.estimatedTime} minutes
                      </span>
                    </div>
                    
                    <div className="mt-2 text-xs opacity-50">
                      {tutorial.steps.length} steps
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 border border-opacity-30 border-white rounded-lg">
                <h3 className="font-bold mb-2">Quick Tips</h3>
                <ul className="text-sm space-y-1 opacity-75">
                  <li>• Use the up/down arrow keys to browse command history</li>
                  <li>• Press Tab for command auto-completion</li>
                  <li>• Type "help" anytime to see available commands</li>
                  <li>• Press Ctrl+/ to see keyboard shortcuts</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* Active Tutorial */
          <div className="flex-1 flex flex-col">
            {/* Progress Bar */}
            <div className="px-4 py-2 border-b border-opacity-30 border-white">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Step {currentStepIndex + 1} of {activeTutorial.steps.length}</span>
                <span className="opacity-75">
                  {Math.round(((currentStepIndex + 1) / activeTutorial.steps.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${((currentStepIndex + 1) / activeTutorial.steps.length) * 100}%` 
                  }}
                />
              </div>
            </div>

            {/* Current Step */}
            <div className="flex-1 p-6">
              {currentStep && (
                <motion.div
                  key={currentStep.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold">{currentStep.title}</h3>
                  <p className="text-sm opacity-75 leading-relaxed">
                    {currentStep.description}
                  </p>

                  {currentStep.command && (
                    <div className="space-y-2">
                      <p className="text-sm font-bold">Try this command:</p>
                      <div className="flex items-center space-x-2">
                        <code className="bg-opacity-20 bg-white px-3 py-2 rounded font-mono">
                          {currentStep.command}
                        </code>
                        <button
                          onClick={() => executeCommand(currentStep.command!)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                        >
                          Execute
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <p className="text-sm font-bold">Hints:</p>
                    <ul className="text-sm space-y-1">
                      {currentStep.hints.map((hint, index) => (
                        <li key={index} className="opacity-75">• {hint}</li>
                      ))}
                    </ul>
                  </div>

                  {isStepComplete && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-600 bg-opacity-20 border border-green-600 rounded-lg p-3"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">[X]</span>
                        <span className="text-sm">Step completed! Ready to continue.</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Navigation */}
            <div className="px-6 py-4 border-t border-opacity-30 border-white flex items-center justify-between">
              <div className="flex space-x-2">
                <button
                  onClick={previousStep}
                  disabled={currentStepIndex === 0}
                  className={`${getButtonClass(theme, 'secondary')} text-sm`}
                >
                  ← Previous
                </button>
                <button
                  onClick={closeTutorial}
                  className="px-3 py-1 border border-opacity-30 border-white rounded text-sm hover:bg-opacity-10 hover:bg-white"
                >
                  Exit Tutorial
                </button>
              </div>

              <button
                onClick={nextStep}
                className="px-4 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                {currentStepIndex === activeTutorial.steps.length - 1 ? 'Complete' : 'Next →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TutorialSystem;