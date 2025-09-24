'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  category: 'exploration' | 'interaction' | 'mastery' | 'secret';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  condition: string;
  progress?: number;
  maxProgress?: number;
}

interface AchievementStats {
  totalAchievements: number;
  unlockedAchievements: number;
  lastUnlocked?: Achievement;
  totalScore: number;
}

// Achievement definitions
const achievementDefinitions: Achievement[] = [
  // Exploration (Basic discovery)
  {
    id: 'first_command',
    title: 'Hello World',
    description: 'Execute your first terminal command',
    icon: '👋',
    unlocked: false,
    category: 'exploration',
    rarity: 'common',
    condition: 'Execute any command'
  },
  {
    id: 'navigator',
    title: 'Navigator',
    description: 'Explore different directories',
    icon: '🧭',
    unlocked: false,
    category: 'exploration',
    rarity: 'common',
    condition: 'Use cd command 5 times',
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'file_reader',
    title: 'File Reader',
    description: 'Read 10 different files',
    icon: '📖',
    unlocked: false,
    category: 'exploration',
    rarity: 'rare',
    condition: 'Use cat command 10 times',
    progress: 0,
    maxProgress: 10
  },
  {
    id: 'help_seeker',
    title: 'Help Seeker',
    description: 'Check help documentation',
    icon: '❓',
    unlocked: false,
    category: 'exploration',
    rarity: 'common',
    condition: 'Use help command'
  },
  {
    id: 'curious_cat',
    title: 'Curious Cat',
    description: 'View your personal information',
    icon: '🐱',
    unlocked: false,
    category: 'exploration',
    rarity: 'common',
    condition: 'Use whoami command'
  },
  {
    id: 'skill_checker',
    title: 'Skill Inspector',
    description: 'Check out the technical skills',
    icon: '🔍',
    unlocked: false,
    category: 'exploration',
    rarity: 'common',
    condition: 'Use skills command'
  },
  {
    id: 'project_explorer',
    title: 'Project Explorer',
    description: 'Browse the project portfolio',
    icon: '💼',
    unlocked: false,
    category: 'exploration',
    rarity: 'common',
    condition: 'Use projects command'
  },
  {
    id: 'contact_finder',
    title: 'Contact Finder',
    description: 'Find contact information',
    icon: '📞',
    unlocked: false,
    category: 'exploration',
    rarity: 'common',
    condition: 'Use contact command'
  },
  
  // Interaction (Active engagement)
  {
    id: 'ai_chatbot',
    title: 'AI Whisperer',
    description: 'Have a conversation with the AI assistant',
    icon: '🤖',
    unlocked: false,
    category: 'interaction',
    rarity: 'common',
    condition: 'Send message to AI chat'
  },
  {
    id: 'code_editor',
    title: 'Code Wizard',
    description: 'Use the code editor to write some code',
    icon: '🧙‍♂️',
    unlocked: false,
    category: 'interaction',
    rarity: 'rare',
    condition: 'Generate code with AI'
  },
  {
    id: 'gamer',
    title: 'Retro Gamer',
    description: 'Play a terminal game',
    icon: '🎮',
    unlocked: false,
    category: 'interaction',
    rarity: 'common',
    condition: 'Start any game'
  },
  {
    id: 'high_scorer',
    title: 'High Scorer',
    description: 'Achieve a high score in any game',
    icon: '🏆',
    unlocked: false,
    category: 'interaction',
    rarity: 'epic',
    condition: 'Score 100+ in any game'
  },
  {
    id: 'chatterbox',
    title: 'Chatterbox',
    description: 'Send 10 messages to AI chat',
    icon: '💬',
    unlocked: false,
    category: 'interaction',
    rarity: 'rare',
    condition: 'Send 10 AI messages',
    progress: 0,
    maxProgress: 10
  },
  {
    id: 'cleaner',
    title: 'Clean Freak',
    description: 'Clear the terminal screen',
    icon: '🧹',
    unlocked: false,
    category: 'interaction',
    rarity: 'common',
    condition: 'Use clear command'
  },
  {
    id: 'tutorial_student',
    title: 'Eager Student',
    description: 'Complete a tutorial',
    icon: '🎓',
    unlocked: false,
    category: 'interaction',
    rarity: 'rare',
    condition: 'Complete any tutorial'
  },
  
  // Mastery (Advanced usage)
  {
    id: 'command_master',
    title: 'Command Master',
    description: 'Use 15 different commands',
    icon: '⚡',
    unlocked: false,
    category: 'mastery',
    rarity: 'rare',
    condition: 'Execute 15 unique commands',
    progress: 0,
    maxProgress: 15
  },
  {
    id: 'theme_collector',
    title: 'Theme Collector',
    description: 'Try all available themes',
    icon: '🎨',
    unlocked: false,
    category: 'mastery',
    rarity: 'rare',
    condition: 'Use all 4 themes',
    progress: 0,
    maxProgress: 4
  },
  {
    id: 'ascii_artist',
    title: 'ASCII Artist',
    description: 'Create custom ASCII art',
    icon: '🎭',
    unlocked: false,
    category: 'mastery',
    rarity: 'epic',
    condition: 'Generate ASCII art'
  },
  {
    id: 'explorer',
    title: 'Digital Explorer',
    description: 'Spend more than 10 minutes exploring',
    icon: '🗺️',
    unlocked: false,
    category: 'mastery',
    rarity: 'epic',
    condition: 'Session time > 10 minutes'
  },
  {
    id: 'feature_hunter',
    title: 'Feature Hunter',
    description: 'Try all major features',
    icon: '🔎',
    unlocked: false,
    category: 'mastery',
    rarity: 'epic',
    condition: 'Use 5+ features',
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'terminal_veteran',
    title: 'Terminal Veteran',
    description: 'Execute 100 commands total',
    icon: '👴',
    unlocked: false,
    category: 'mastery',
    rarity: 'epic',
    condition: 'Execute 100 commands',
    progress: 0,
    maxProgress: 100
  },
  {
    id: 'power_user',
    title: 'Power User',
    description: 'Use advanced shortcuts and features',
    icon: '⚙️',
    unlocked: false,
    category: 'mastery',
    rarity: 'legendary',
    condition: 'Use tab completion 10 times',
    progress: 0,
    maxProgress: 10
  },
  
  // Secret (Hidden achievements)
  {
    id: 'matrix_lover',
    title: 'The One',
    description: 'Discover the Matrix easter egg',
    icon: '💊',
    unlocked: false,
    category: 'secret',
    rarity: 'legendary',
    condition: 'Execute matrix command'
  },
  {
    id: 'konami_code',
    title: 'Konami Master',
    description: 'Enter the famous cheat code',
    icon: '🎯',
    unlocked: false,
    category: 'secret',
    rarity: 'legendary',
    condition: 'Enter Konami code sequence'
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Execute 10 commands in under 30 seconds',
    icon: '💨',
    unlocked: false,
    category: 'secret',
    rarity: 'epic',
    condition: 'Fast command execution',
    progress: 0,
    maxProgress: 10
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Use the portfolio between midnight and 6 AM',
    icon: '🦉',
    unlocked: false,
    category: 'secret',
    rarity: 'rare',
    condition: 'Use during night hours'
  },
  {
    id: 'easter_egg_hunter',
    title: 'Easter Egg Hunter',
    description: 'Find multiple hidden features',
    icon: '🥚',
    unlocked: false,
    category: 'secret',
    rarity: 'epic',
    condition: 'Find 3 easter eggs',
    progress: 0,
    maxProgress: 3
  },
  {
    id: 'persistent_visitor',
    title: 'Persistent Visitor',
    description: 'Visit the portfolio 5 different times',
    icon: '🔄',
    unlocked: false,
    category: 'secret',
    rarity: 'rare',
    condition: 'Multiple visits',
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'early_bird',
    title: 'Early Bird',
    description: 'Use the portfolio between 5 AM and 8 AM',
    icon: '🐦',
    unlocked: false,
    category: 'secret',
    rarity: 'rare',
    condition: 'Use during morning hours'
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Execute 50 commands without any errors',
    icon: '💎',
    unlocked: false,
    category: 'secret',
    rarity: 'legendary',
    condition: 'No command errors streak',
    progress: 0,
    maxProgress: 50
  }
];

// Achievement Manager Hook
export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats] = useState<AchievementStats>({
    totalAchievements: achievementDefinitions.length,
    unlockedAchievements: 0,
    totalScore: 0
  });
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [sessionStartTime] = useState(new Date());
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);
  const [lastCommandTime, setLastCommandTime] = useState<Date>(new Date());
  const [fastCommandCount, setFastCommandCount] = useState(0);

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

  // Initialize achievements from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-achievements');
    if (saved) {
      const savedAchievements = JSON.parse(saved);
      setAchievements(savedAchievements);
    } else {
      setAchievements(achievementDefinitions);
    }
  }, []);

  // Update stats when achievements change
  useEffect(() => {
    const unlocked = achievements.filter(a => a.unlocked);
    const score = unlocked.reduce((sum, a) => {
      const rarityScores = { common: 10, rare: 25, epic: 50, legendary: 100 };
      return sum + rarityScores[a.rarity];
    }, 0);

    setStats({
      totalAchievements: achievements.length,
      unlockedAchievements: unlocked.length,
      lastUnlocked: unlocked[unlocked.length - 1],
      totalScore: score
    });

    // Save to localStorage
    localStorage.setItem('portfolio-achievements', JSON.stringify(achievements));
  }, [achievements]);

  // Konami code listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKonamiSequence(prev => {
        const newSeq = [...prev, e.code].slice(-konamiCode.length);
        if (newSeq.length === konamiCode.length && 
            newSeq.every((key, i) => key === konamiCode[i])) {
          unlockAchievement('konami_code');
        }
        return newSeq;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize visit tracking
  useEffect(() => {
    const visits = parseInt(localStorage.getItem('portfolio-visits') || '0') + 1;
    localStorage.setItem('portfolio-visits', visits.toString());
    
    if (visits >= 5) {
      updateProgress('persistent_visitor', visits);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Early bird and night owl checker
  useEffect(() => {
    const checkTimeBasedAchievements = () => {
      const hour = new Date().getHours();
      if (hour >= 0 && hour < 6) {
        unlockAchievement('night_owl');
      } else if (hour >= 5 && hour < 8) {
        unlockAchievement('early_bird');
      }
    };

    checkTimeBasedAchievements();
    const interval = setInterval(checkTimeBasedAchievements, 60000); // Check every minute
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Session time checker
  useEffect(() => {
    const interval = setInterval(() => {
      const sessionTime = (Date.now() - sessionStartTime.getTime()) / 1000 / 60; // minutes
      if (sessionTime > 10) {
        unlockAchievement('explorer');
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStartTime]);

  const unlockAchievement = useCallback((achievementId: string) => {
    setAchievements(prev => {
      const updated = prev.map(achievement => {
        if (achievement.id === achievementId && !achievement.unlocked) {
          const unlockedAchievement = {
            ...achievement,
            unlocked: true,
            unlockedAt: new Date()
          };
          setNewAchievement(unlockedAchievement);
          return unlockedAchievement;
        }
        return achievement;
      });
      return updated;
    });
  }, []);

  const updateProgress = useCallback((achievementId: string, increment: number = 1) => {
    setAchievements(prev => {
      return prev.map(achievement => {
        if (achievement.id === achievementId && !achievement.unlocked && achievement.maxProgress) {
          const newProgress = Math.min((achievement.progress || 0) + increment, achievement.maxProgress);
          const updated = { ...achievement, progress: newProgress };
          
          if (newProgress >= achievement.maxProgress) {
            updated.unlocked = true;
            updated.unlockedAt = new Date();
            setNewAchievement(updated);
          }
          
          return updated;
        }
        return achievement;
      });
    });
  }, []);

  const trackCommand = useCallback((command: string, isError: boolean = false) => {
    const now = new Date();
    const timeDiff = now.getTime() - lastCommandTime.getTime();
    
    // Track fast commands (under 3 seconds)
    if (timeDiff < 3000 && commandHistory.length > 0) {
      setFastCommandCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 10) {
          unlockAchievement('speed_demon');
        }
        return newCount;
      });
    } else {
      setFastCommandCount(0);
    }
    
    setLastCommandTime(now);

    // Update command history
    const newHistory = [...commandHistory, command];
    setCommandHistory(newHistory);

    // Track visit count
    const visitCount = parseInt(localStorage.getItem('portfolio-visits') || '1');
    updateProgress('persistent_visitor', visitCount > 1 ? 1 : 0);

    // Track perfection streak
    if (isError) {
      setAchievements(prev => prev.map(a => 
        a.id === 'perfectionist' ? { ...a, progress: 0 } : a
      ));
    } else {
      updateProgress('perfectionist');
    }

    // First command
    if (newHistory.length === 1) {
      unlockAchievement('first_command');
    }

    // Total command count
    updateProgress('terminal_veteran');

    // Command-specific achievements
    switch (command) {
      case 'cd':
      case 'chdir':
        updateProgress('navigator');
        break;
      case 'cat':
      case 'view':
      case 'show':
        updateProgress('file_reader');
        break;
      case 'help':
      case 'h':
      case '?':
        unlockAchievement('help_seeker');
        break;
      case 'whoami':
      case 'user':
      case 'info':
        unlockAchievement('curious_cat');
        break;
      case 'skills':
      case 'tech':
      case 'stack':
        unlockAchievement('skill_checker');
        break;
      case 'projects':
      case 'work':
      case 'portfolio':
        unlockAchievement('project_explorer');
        break;
      case 'contact':
      case 'reach':
      case 'connect':
        unlockAchievement('contact_finder');
        break;
      case 'clear':
      case 'cls':
      case 'clean':
        unlockAchievement('cleaner');
        break;
      case 'matrix':
      case 'hack':
      case 'neo':
        unlockAchievement('matrix_lover');
        updateProgress('easter_egg_hunter');
        break;
    }

    // Command master achievement
    const uniqueCommands = new Set(newHistory);
    if (uniqueCommands.size >= 15) {
      unlockAchievement('command_master');
    }
  }, [commandHistory, lastCommandTime, unlockAchievement, updateProgress]);

  const trackThemeChange = useCallback((theme: string) => {
    const usedThemes = JSON.parse(localStorage.getItem('used-themes') || '[]');
    if (!usedThemes.includes(theme)) {
      const newThemes = [...usedThemes, theme];
      localStorage.setItem('used-themes', JSON.stringify(newThemes));
      
      setAchievements(prev => {
        return prev.map(achievement => {
          if (achievement.id === 'theme_collector') {
            const newProgress = newThemes.length;
            const updated = { ...achievement, progress: newProgress };
            
            if (newProgress >= 4) {
              updated.unlocked = true;
              updated.unlockedAt = new Date();
              setNewAchievement(updated);
            }
            
            return updated;
          }
          return achievement;
        });
      });
    }
  }, []);

  const trackEvent = useCallback((event: string, data?: Record<string, unknown>) => {
    switch (event) {
      case 'ai_chat':
        unlockAchievement('ai_chatbot');
        updateProgress('chatterbox');
        updateProgress('feature_hunter');
        break;
      case 'code_generated':
        unlockAchievement('code_editor');
        updateProgress('feature_hunter');
        break;
      case 'game_started':
        unlockAchievement('gamer');
        updateProgress('feature_hunter');
        break;
      case 'high_score':
        if (data && typeof data === 'object' && 'score' in data && typeof data.score === 'number' && data.score >= 100) {
          unlockAchievement('high_scorer');
        }
        break;
      case 'ascii_generated':
        unlockAchievement('ascii_artist');
        updateProgress('easter_egg_hunter');
        break;
      case 'tutorial_completed':
        unlockAchievement('tutorial_student');
        break;
      case 'tab_completion':
        updateProgress('power_user');
        break;
      case 'sound_toggled':
        updateProgress('feature_hunter');
        break;
      case 'analytics_viewed':
        updateProgress('feature_hunter');
        break;
      case 'studio_opened':
        updateProgress('feature_hunter');
        break;
    }
  }, [unlockAchievement, updateProgress]);

  const dismissNewAchievement = useCallback(() => {
    setNewAchievement(null);
  }, []);

  return {
    achievements,
    stats,
    newAchievement,
    trackCommand,
    trackThemeChange,
    trackEvent,
    unlockAchievement,
    dismissNewAchievement
  };
};

// Achievement Notification Component
interface AchievementNotificationProps {
  achievement: Achievement | null;
  onDismiss: () => void;
  theme: string;
}

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  achievement,
  onDismiss
}) => {
  useEffect(() => {
    if (achievement) {
      const timer = setTimeout(onDismiss, 5000); // Auto dismiss after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [achievement, onDismiss]);

  if (!achievement) return null;

  const rarityColors = {
    common: 'border-gray-400 bg-gray-900',
    rare: 'border-blue-400 bg-blue-900',
    epic: 'border-purple-400 bg-purple-900',
    legendary: 'border-yellow-400 bg-yellow-900'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -100, scale: 0.8 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className={`border-2 ${rarityColors[achievement.rarity]} rounded-lg p-4 font-mono shadow-2xl max-w-sm`}>
        <div className="text-center">
          <div className="text-4xl mb-2">{achievement.icon}</div>
          <div className="text-yellow-400 text-lg font-bold">Achievement Unlocked!</div>
          <div className="text-white font-bold">{achievement.title}</div>
          <div className="text-sm opacity-75 mt-1">{achievement.description}</div>
          <div className="text-xs mt-2 opacity-50 capitalize">{achievement.rarity} • {achievement.category}</div>
          <button
            onClick={onDismiss}
            className="mt-3 px-3 py-1 bg-gray-700 text-white rounded text-xs hover:bg-gray-600"
          >
            Dismiss
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Achievement Panel Component
interface AchievementPanelProps {
  isVisible: boolean;
  onToggle: () => void;
  achievements: Achievement[];
  stats: AchievementStats;
  theme: string;
}

export const AchievementPanel: React.FC<AchievementPanelProps> = ({
  isVisible,
  onToggle,
  achievements,
  stats,
  theme
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const themeClasses = {
    matrix: 'bg-black border-green-500 text-green-400',
    amber: 'bg-amber-900 border-amber-400 text-amber-200',
    blue: 'bg-blue-900 border-blue-400 text-blue-200',
    classic: 'bg-gray-900 border-gray-500 text-gray-200'
  };

  const currentTheme = themeClasses[theme as keyof typeof themeClasses];

  const categories = ['all', 'exploration', 'interaction', 'mastery', 'secret'];
  
  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter((a: Achievement) => a.category === selectedCategory);

  const completionPercentage = Math.round((stats.unlockedAchievements / stats.totalAchievements) * 100);

  const rarityColors = {
    common: 'border-gray-400',
    rare: 'border-blue-400',
    epic: 'border-purple-400',
    legendary: 'border-yellow-400'
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-8 z-50"
    >
      <div className={`border-2 ${currentTheme} rounded-lg overflow-hidden shadow-2xl h-full flex flex-col`}>
        {/* Header */}
        <div className="px-4 py-2 border-b border-opacity-30 border-white flex items-center justify-between">
          <h2 className="text-lg font-bold">Achievements</h2>
          <button onClick={onToggle} className="text-xl hover:opacity-75">×</button>
        </div>

        {/* Stats */}
        <div className="p-4 border-b border-opacity-30 border-white">
          <div className="grid grid-cols-4 gap-4 text-center text-sm">
            <div>
              <div className="text-2xl font-bold">{stats.unlockedAchievements}</div>
              <div className="opacity-75">Unlocked</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.totalAchievements}</div>
              <div className="opacity-75">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{completionPercentage}%</div>
              <div className="opacity-75">Complete</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.totalScore}</div>
              <div className="opacity-75">Score</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="p-4 border-b border-opacity-30 border-white">
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded text-sm capitalize transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'border border-opacity-30 border-white hover:bg-opacity-10 hover:bg-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAchievements.map((achievementItem: Achievement) => (
              <motion.div
                key={achievementItem.id}
                className={`border-2 ${
                  achievementItem.unlocked 
                    ? rarityColors[achievementItem.rarity as keyof typeof rarityColors] 
                    : 'border-gray-600 opacity-50'
                } rounded-lg p-4 text-center transition-all hover:scale-105`}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`text-3xl mb-2 ${achievementItem.unlocked ? '' : 'grayscale'}`}>
                  {achievementItem.icon}
                </div>
                <div className="font-bold text-sm">{achievementItem.title}</div>
                <div className="text-xs opacity-75 mt-1">{achievementItem.description}</div>
                
                {achievementItem.maxProgress && (
                  <div className="mt-2">
                    <div className="text-xs">
                      {achievementItem.progress || 0} / {achievementItem.maxProgress}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ 
                          width: `${((achievementItem.progress || 0) / achievementItem.maxProgress) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="text-xs mt-2 opacity-50 capitalize">
                  {achievementItem.rarity} • {achievementItem.category}
                </div>
                
                {achievementItem.unlocked && achievementItem.unlockedAt && (
                  <div className="text-xs opacity-50 mt-1">
                    Unlocked: {achievementItem.unlockedAt.toLocaleDateString()}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default useAchievements;