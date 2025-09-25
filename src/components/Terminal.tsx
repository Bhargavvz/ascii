'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { generateASCIIText, createSkillBar, createTreeStructure, matrixEffect } from '@/utils/ascii';
import { personalInfo, projects, skills, experience, commands, fileSystem } from '@/data/portfolio';
import { TerminalState } from '@/types/portfolio';
import AIChat from '@/components/AIChat';
import CodeEditor from '@/components/CodeEditor';
import Games from '@/components/Games';
import AdvancedASCII from '@/components/AdvancedASCII';
import { SoundControl, useSoundSystem } from '@/components/SoundSystem';
import { AnalyticsDashboard } from '@/components/Analytics';
import { AchievementNotification, AchievementPanel, useAchievements } from '@/components/Achievements';
import { TutorialSystem } from '@/components/TutorialSystem';
import GeminiDebug from '@/components/GeminiDebug';
import { getThemeColors, getButtonClass } from '@/utils/theme';

const Terminal: React.FC = () => {
  const [state, setState] = useState<TerminalState>({
    currentPath: '/home/portfolio',
    history: [],
    output: [],
    isLoading: false
  });
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState('matrix');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // New feature states
  const [showAIChat, setShowAIChat] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [showGames, setShowGames] = useState(false);
  const [showASCIIStudio, setShowASCIIStudio] = useState(false);
  const [showSoundControl, setShowSoundControl] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showTutorials, setShowTutorials] = useState(false);
  const [showGeminiDebug, setShowGeminiDebug] = useState(false);

  // Hooks for new features
  const { playSound, isEnabled: audioEnabled } = useSoundSystem();
  const {
    achievements,
    stats,
    newAchievement,
    trackCommand,
    trackThemeChange,
    trackEvent,
    dismissNewAchievement,
    debugUnlockAchievement
  } = useAchievements();

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
      accent: 'text-white',
      border: 'border-gray-500'
    }
  };

  const currentTheme = themes[theme as keyof typeof themes];

  useEffect(() => {
    // Initial welcome message
    const initializeTerminal = async () => {
      const welcomeArt = await generateASCIIText(personalInfo.name, { font: 'ANSI Shadow' });
      addOutput([
        welcomeArt,
        '',
        `Welcome to ${personalInfo.name}'s ASCII Portfolio!`,
        `${personalInfo.title}`,
        '',
        'Type "help" to see available commands.',
        'Use "ls" to explore the file system.',
        'Type "theme <name>" to change themes (matrix, amber, blue, classic)',
        '',
        '═'.repeat(80)
      ]);
      
      // Track first visit for achievements
      trackCommand('init', false);
    };
    
    initializeTerminal();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.output]);

  const addOutput = useCallback((lines: string[]) => {
    setState(prev => ({
      ...prev,
      output: [...prev.output, ...lines]
    }));
  }, []);

  const getPath = (path: string): any => {
    const parts = path.split('/').filter(p => p);
    let current: any = fileSystem['/'];
    
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part as keyof typeof current];
      } else {
        return null;
      }
    }
    return current;
  };

  const listDirectory = (path: string): string[] => {
    const dir = getPath(path);
    if (!dir || typeof dir !== 'object') {
      return ['Directory not found'];
    }
    
    const items = Object.keys(dir).map(key => {
      const item = dir[key];
      if (typeof item === 'object') {
        return `📁 ${key}/`;
      } else {
        return `📄 ${key}`;
      }
    });
    
    return items.length > 0 ? items : ['Empty directory'];
  };

  const readFile = (filename: string): string[] => {
    const fullPath = state.currentPath === '/' ? `/${filename}` : `${state.currentPath}/${filename}`;
    const file = getPath(fullPath);
    
    if (file && typeof file === 'string') {
      return file.split('\n');
    } else {
      return [`cat: ${filename}: No such file or directory`];
    }
  };

  const changeDirectory = (newPath: string): string[] => {
    let targetPath: string;
    
    if (newPath.startsWith('/')) {
      targetPath = newPath;
    } else if (newPath === '..') {
      const parts = state.currentPath.split('/').filter(p => p);
      parts.pop();
      targetPath = parts.length > 0 ? `/${parts.join('/')}` : '/';
    } else if (newPath === '.') {
      targetPath = state.currentPath;
    } else {
      targetPath = state.currentPath === '/' ? `/${newPath}` : `${state.currentPath}/${newPath}`;
    }
    
    const dir = getPath(targetPath);
    if (dir && typeof dir === 'object') {
      setState(prev => ({ ...prev, currentPath: targetPath }));
      return [];
    } else {
      return [`cd: ${newPath}: No such directory`];
    }
  };

  const showHelp = (command?: string): string[] => {
    if (command) {
      const cmd = commands.find(c => c.name === command || c.aliases?.includes(command));
      if (cmd) {
        return [
          `Command: ${cmd.name}`,
          `Description: ${cmd.description}`,
          `Usage: ${cmd.usage}`,
          cmd.aliases ? `Aliases: ${cmd.aliases.join(', ')}` : ''
        ].filter(Boolean);
      } else {
        return [`Help: No such command: ${command}`];
      }
    }
    
    return [
      'Available Commands:',
      '═'.repeat(50),
      ...commands.map(cmd => `${cmd.name.padEnd(12)} - ${cmd.description}`)
    ];
  };

  const showSkills = (category?: string): string[] => {
    const filteredSkills = category 
      ? skills.filter(skill => skill.category.toLowerCase() === category.toLowerCase())
      : skills;
    
    if (filteredSkills.length === 0) {
      return [`No skills found for category: ${category}`];
    }
    
    const skillsByCategory = filteredSkills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, typeof skills>);
    
    const result: string[] = ['Technical Skills:', '═'.repeat(50)];
    
    Object.entries(skillsByCategory).forEach(([cat, skillList]) => {
      result.push('', `${cat}:`);
      skillList.forEach(skill => {
        result.push(createSkillBar(skill.name, skill.level));
      });
    });
    
    return result;
  };

  const showProjects = (projectId?: string): string[] => {
    if (projectId) {
      const project = projects.find(p => p.id === projectId);
      if (!project) {
        return [`Project not found: ${projectId}`];
      }
      
      return [
        `Project: ${project.name}`,
        '═'.repeat(50),
        `Description: ${project.description}`,
        '',
        'Technologies:',
        ...project.technologies.map(tech => `• ${tech}`),
        '',
        'Features:',
        ...project.features.map(feature => `• ${feature}`),
        '',
        'Links:',
        project.githubUrl ? `GitHub: ${project.githubUrl}` : '',
        project.liveUrl ? `Live Demo: ${project.liveUrl}` : '',
        '',
        'Architecture:',
        project.architecture || 'No architecture diagram available'
      ].filter(Boolean);
    }
    
    return [
      'Projects:',
      '═'.repeat(50),
      ...projects.map(project => 
        `${project.id.padEnd(20)} - ${project.name}\n  ${project.description.substring(0, 80)}...`
      ),
      '',
      'Use "projects <project-id>" to view details'
    ];
  };

  const showExperience = (): string[] => {
    const result = ['Work Experience:', '═'.repeat(50)];
    
    experience.forEach(exp => {
      result.push(
        '',
        `${exp.position} at ${exp.company}`,
        `Duration: ${exp.duration}`,
        '',
        'Responsibilities:',
        ...exp.description.map(desc => `• ${desc}`),
        '',
        `Technologies: ${exp.technologies.join(', ')}`
      );
    });
    
    return result;
  };

  const processCommand = async (command: string): Promise<void> => {
    const [cmd, ...args] = command.trim().split(' ');
    const arg = args.join(' ');
    
    setState(prev => ({
      ...prev,
      history: [...prev.history, command],
      isLoading: true
    }));
    
    addOutput([`${state.currentPath} $ ${command}`]);
    
    // Track command for achievements
    const isCommandError = false; // We'll set this based on command success
    trackCommand(cmd.toLowerCase(), isCommandError);
    
    // Play sound effect
    if (audioEnabled) {
      playSound('keypress');
    }
    
    // Simulate command processing delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    switch (cmd.toLowerCase()) {
      case 'help':
      case 'h':
      case '?':
        addOutput(showHelp(arg));
        break;
        
      case 'ls':
      case 'list':
      case 'dir':
        const listPath = arg || state.currentPath;
        addOutput(listDirectory(listPath));
        break;
        
      case 'cd':
      case 'chdir':
        if (!arg) {
          addOutput(['cd: missing directory argument']);
        } else {
          const result = changeDirectory(arg);
          if (result.length > 0) addOutput(result);
        }
        break;
        
      case 'cat':
      case 'view':
      case 'show':
        if (!arg) {
          addOutput(['cat: missing file argument']);
        } else {
          addOutput(readFile(arg));
        }
        break;
        
      case 'pwd':
      case 'path':
        addOutput([state.currentPath]);
        break;
        
      case 'whoami':
      case 'user':
      case 'info':
        addOutput([
          `Name: ${personalInfo.name}`,
          `Title: ${personalInfo.title}`,
          `Location: ${personalInfo.location}`,
          `Bio: ${personalInfo.bio}`
        ]);
        break;
        
      case 'skills':
      case 'tech':
      case 'stack':
        addOutput(showSkills(arg));
        break;
        
      case 'projects':
      case 'work':
      case 'portfolio':
        addOutput(showProjects(arg));
        break;
        
      case 'experience':
      case 'career':
      case 'jobs':
        addOutput(showExperience());
        break;
        
      case 'contact':
      case 'reach':
      case 'connect':
        addOutput([
          'Contact Information:',
          '═'.repeat(30),
          `Email: ${personalInfo.contact.email}`,
          `GitHub: ${personalInfo.contact.github}`,
          `LinkedIn: ${personalInfo.contact.linkedin}`,
          personalInfo.contact.website ? `Website: ${personalInfo.contact.website}` : ''
        ].filter(Boolean));
        break;
        
      case 'clear':
      case 'cls':
      case 'clean':
        setState(prev => ({ ...prev, output: [] }));
        break;
        
      case 'theme':
      case 'color':
      case 'style':
        if (!arg || !themes[arg as keyof typeof themes]) {
          addOutput([
            'Available themes:',
            ...Object.keys(themes).map(t => `• ${t}`)
          ]);
        } else {
          setTheme(arg);
          trackThemeChange(arg);
          addOutput([`Theme changed to: ${arg}`]);
        }
        break;
        
      case 'matrix':
      case 'hack':
      case 'neo':
        addOutput([
          'Welcome to the Matrix...',
          '',
          matrixEffect(),
          '',
          'Red pill or blue pill?'
        ]);
        break;
        
      case 'ascii':
      case 'art':
      case 'figlet':
        if (!arg) {
          addOutput(['ascii: missing text argument']);
        } else {
          const [text, font] = arg.split(' ');
          try {
            const art = await generateASCIIText(text, { font: font || 'ANSI Shadow' });
            addOutput([art]);
            trackEvent('ascii_generated');
          } catch (error) {
            addOutput(['ascii: error generating art']);
          }
        }
        break;
        
      case 'tree':
        const treeData = {
          'portfolio/': {
            'projects/': {
              'ascii-portfolio/': {},
              'ecommerce-api/': {},
              'ml-classifier/': {}
            },
            'skills/': {
              'programming.txt': null,
              'frontend.txt': null,
              'backend.txt': null
            },
            'about.txt': null,
            'contact.txt': null,
            'resume.txt': null
          }
        };
        addOutput([createTreeStructure(treeData)]);
        break;

      // New feature commands
      case 'ai':
      case 'chat':
        setShowAIChat(true);
        addOutput(['AI Chat Assistant opened']);
        trackEvent('ai_chat');
        break;
        
      case 'code':
      case 'editor':
      case 'ide':
        setShowCodeEditor(true);
        addOutput(['Code Editor opened']);
        trackEvent('code_generated'); // This will unlock the code editor achievement
        break;
        
      case 'games':
      case 'play':
        setShowGames(true);
        addOutput(['Games menu opened']);
        trackEvent('game_started');
        break;
        
      case 'studio':
      case 'asciiart':
        setShowASCIIStudio(true);
        addOutput(['ASCII Art Studio opened']);
        trackEvent('studio_opened');
        break;
        
      case 'sound':
      case 'audio':
        setShowSoundControl(true);
        addOutput(['Sound Control opened']);
        trackEvent('sound_toggled');
        break;
        
      case 'analytics':
      case 'stats':
        setShowAnalytics(true);
        addOutput(['Analytics Dashboard opened']);
        trackEvent('analytics_viewed');
        break;
        
      case 'achievements':
      case 'trophies':
        setShowAchievements(true);
        addOutput(['Achievements panel opened']);
        break;
        
      case 'tutorial':
      case 'help-me':
      case 'guide':
        setShowTutorials(true);
        addOutput(['Interactive Tutorial opened']);
        break;
        
      case 'debug':
      case 'api-debug':
      case 'gemini-debug':
        setShowGeminiDebug(true);
        addOutput(['Gemini API Debug panel opened']);
        break;

      case 'achievement-debug':
      case 'debug-achievements':
        addOutput([
          'Achievement Debug Info:',
          '═'.repeat(50),
          `Total achievements: ${achievements.length}`,
          `Unlocked achievements: ${stats.unlockedAchievements}`,
          `Total score: ${stats.totalScore}`,
          '',
          'Recent achievements:',
          ...achievements.filter(a => a.unlocked).slice(-5).map(a => 
            `✓ ${a.title} - ${a.description}`
          ),
          '',
          'LocalStorage check:',
          localStorage.getItem('portfolio-achievements') ? '✓ Achievements data found' : '✗ No achievements data',
          '',
          'Test unlock achievement with: unlock-test'
        ]);
        break;
        
      case 'unlock-test':
        debugUnlockAchievement('help_seeker');
        addOutput(['Test achievement unlocked!']);
        break;
        
      case 'features':
      case 'new':
        addOutput([
          'NEW FEATURES AVAILABLE:',
          '═'.repeat(50),
          'ai/chat      - AI-powered assistant',
          'code/editor  - Real-time code editor with AI',
          'games/play   - Interactive terminal games',
          'studio       - Advanced ASCII art creator',
          'sound/audio  - Sound system controls',
          'analytics    - Live portfolio analytics',
          'achievements - Achievement system',
          'tutorial     - Interactive tutorials',
          '',
          'Try any of these commands to explore new features!'
        ]);
        break;
        
      default:
        addOutput([`Command not found: ${cmd}. Type 'help' for available commands.`]);
        trackCommand(cmd.toLowerCase(), true); // Mark as error
        if (audioEnabled) {
          playSound('error');
        }
        break;
    }
    
    setState(prev => ({ ...prev, isLoading: false }));
    
    if (audioEnabled && cmd !== 'clear') {
      playSound('success', 0.3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      processCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const lastCommand = state.history[state.history.length - 1];
      if (lastCommand) setInput(lastCommand);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion for commands
      const matches = commands.filter(cmd => 
        cmd.name.startsWith(input) || cmd.aliases?.some(alias => alias.startsWith(input))
      );
      if (matches.length === 1) {
        setInput(matches[0].name + ' ');
        trackEvent('tab_completion');
      }
    }
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} font-mono flex items-center justify-center py-4`}>
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border-2 ${currentTheme.border} rounded-lg overflow-hidden shadow-2xl`}
        >
          <div className={`${currentTheme.accent} bg-opacity-20 px-3 sm:px-4 py-2 border-b ${currentTheme.border} flex items-center justify-between text-xs sm:text-sm`}>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="hidden sm:inline text-sm truncate">{personalInfo.name} - ASCII Terminal Portfolio</span>
            <span className="text-xs sm:text-sm">{theme}</span>
          </div>
          
          <div 
            ref={terminalRef}
            className="h-64 sm:h-80 md:h-96 lg:h-[32rem] overflow-y-auto p-3 sm:p-4 bg-opacity-90 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
          >
            {state.output.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.01 }}
                className="whitespace-pre-wrap break-words text-xs sm:text-sm leading-relaxed"
              >
                {line}
              </motion.div>
            ))}
            
            {state.isLoading && (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className={`${currentTheme.accent} text-xs sm:text-sm`}
              >
                Processing...
              </motion.div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className={`border-t ${currentTheme.border} p-3 sm:p-4`}>
            <div className="flex items-center space-x-2">
              <span className={`${currentTheme.accent} text-xs sm:text-sm flex-shrink-0`}>
                {state.currentPath.length > 20 && window.innerWidth < 640 
                  ? '...' + state.currentPath.slice(-15) 
                  : state.currentPath} $
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`flex-1 bg-transparent ${currentTheme.text} outline-none text-xs sm:text-sm min-w-0`}
                placeholder="Type a command..."
                autoFocus
              />
              {isTyping && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className={`${currentTheme.accent} hidden sm:inline`}
                >
                  █
                </motion.span>
              )}
            </div>
          </form>
        </motion.div>
        
        <div className="mt-4 text-center text-xs sm:text-sm opacity-75 px-4">
          <p className="mb-2">Made with love using ASCII art and terminal interfaces</p>
          <div className="flex flex-wrap justify-center gap-2 text-xs mb-4">
            <span className={`px-2 py-1 rounded ${getThemeColors(theme).secondary} ${currentTheme.text} border ${currentTheme.border}`}>help</span>
            <span className={`px-2 py-1 rounded ${getThemeColors(theme).secondary} ${currentTheme.text} border ${currentTheme.border}`}>features</span>
            <span className={`px-2 py-1 rounded ${getThemeColors(theme).secondary} ${currentTheme.text} border ${currentTheme.border}`}>ai</span>
            <span className={`px-2 py-1 rounded ${getThemeColors(theme).secondary} ${currentTheme.text} border ${currentTheme.border}`}>games</span>
            <span className={`px-2 py-1 rounded ${getThemeColors(theme).secondary} ${currentTheme.text} border ${currentTheme.border}`}>code</span>
            <span className={`px-2 py-1 rounded ${getThemeColors(theme).secondary} ${currentTheme.text} border ${currentTheme.border}`}>tutorial</span>
          </div>
          
          {/* Interface Controls */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <button
              onClick={() => setShowAIChat(!showAIChat)}
              className={`${getButtonClass(theme, 'primary')} text-xs`}
              title="AI Chat Assistant"
            >
              AI
            </button>
            <button
              onClick={() => setShowCodeEditor(!showCodeEditor)}
              className={`${getButtonClass(theme, 'primary')} text-xs`}
              title="Code Editor"
            >
              Code
            </button>
            <button
              onClick={() => setShowGames(!showGames)}
              className={`${getButtonClass(theme, 'primary')} text-xs`}
              title="Games"
            >
              Games
            </button>
            <button
              onClick={() => setShowASCIIStudio(!showASCIIStudio)}
              className={`${getButtonClass(theme, 'primary')} text-xs`}
              title="ASCII Art Studio"
            >
              Art
            </button>
            <button
              onClick={() => setShowSoundControl(!showSoundControl)}
              className={`${getButtonClass(theme, 'primary')} text-xs`}
              title="Sound Control"
            >
              Sound
            </button>
            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className={`${getButtonClass(theme, 'primary')} text-xs`}
              title="Analytics"
            >
              Stats
            </button>
            <button
              onClick={() => setShowAchievements(!showAchievements)}
              className={`${getButtonClass(theme, 'primary')} text-xs`}
              title="Achievements"
            >
              Achievements
            </button>
            <button
              onClick={() => setShowGeminiDebug(!showGeminiDebug)}
              className={`${getButtonClass(theme, 'primary')} text-xs`}
              title="Debug Gemini API"
            >
              Debug
            </button>
          </div>
          
          {/* Live Data Feed */}
          {/* Analytics data removed - no fake visitor counts */}
        </div>
      </div>
      
      {/* All Feature Components */}
      {showAIChat && (
        <AIChat
          isVisible={showAIChat}
          onToggle={() => setShowAIChat(false)}
          theme={theme}
          currentContext={state.currentPath}
        />
      )}
      
      {showCodeEditor && (
        <CodeEditor
          isVisible={showCodeEditor}
          onToggle={() => setShowCodeEditor(false)}
          theme={theme}
        />
      )}
      
      {showGames && (
        <Games
          isVisible={showGames}
          onToggle={() => setShowGames(false)}
          theme={theme}
          onAchievement={(achievement) => trackEvent('high_score', { score: 100 })}
        />
      )}
      
      {showASCIIStudio && (
        <AdvancedASCII
          isVisible={showASCIIStudio}
          onToggle={() => setShowASCIIStudio(false)}
          theme={theme}
        />
      )}
      
      {showSoundControl && (
        <SoundControl
          isVisible={showSoundControl}
          onToggle={() => setShowSoundControl(false)}
          theme={theme}
        />
      )}
      
      {showAnalytics && (
        <AnalyticsDashboard
          isVisible={showAnalytics}
          onToggle={() => setShowAnalytics(false)}
          theme={theme}
        />
      )}
      
      {showAchievements && (
        <AchievementPanel
          isVisible={showAchievements}
          onToggle={() => setShowAchievements(false)}
          achievements={achievements}
          stats={stats}
          theme={theme}
        />
      )}
      
      {showTutorials && (
        <TutorialSystem
          isVisible={showTutorials}
          onToggle={() => setShowTutorials(false)}
          theme={theme}
          onCommandSuggestion={(cmd) => {
            setInput(cmd);
            setShowTutorials(false);
          }}
          onTutorialCompleted={() => trackEvent('tutorial_completed')}
        />
      )}
      
      {showGeminiDebug && (
        <GeminiDebug
          isVisible={showGeminiDebug}
          onToggle={() => setShowGeminiDebug(false)}
          theme={theme}
        />
      )}
      
      {/* Achievement Notification */}
      <AchievementNotification
        achievement={newAchievement}
        onDismiss={dismissNewAchievement}
        theme={theme}
      />
    </div>
  );
};

export default Terminal;