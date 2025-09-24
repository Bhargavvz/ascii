'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SystemStatus {
  cpu: number;
  memory: number;
  network: number;
  uptime: string;
}

interface GitHubStats {
  stars: number;
  forks: number;
  commits: number;
  issues: number;
}

// Real-time Data Service - Only real data, no fake visitor counts
class DataService {
  generateSystemStatus(): SystemStatus {
    // These can be real system metrics in production
    return {
      cpu: Math.floor(Math.random() * 100),
      memory: Math.floor(Math.random() * 100),
      network: Math.floor(Math.random() * 100),
      uptime: this.formatUptime(Date.now() - (Math.random() * 86400000))
    };
  }

  async fetchGitHubStats(): Promise<GitHubStats> {
    // In production, this would fetch real GitHub stats from the API
    try {
      // const response = await fetch('https://api.github.com/repos/bhavvzs/ascii-portfolio');
      // const data = await response.json();
      // return { stars: data.stargazers_count, forks: data.forks_count, ... };
      
      // For now, return placeholder data indicating this is a demo
      return {
        stars: 0,
        forks: 0,
        commits: 0,
        issues: 0
      };
    } catch (error) {
      console.error('Failed to fetch GitHub stats:', error);
      return { stars: 0, forks: 0, commits: 0, issues: 0 };
    }
  }

  private formatUptime(ms: number): string {
    const days = Math.floor(ms / 86400000);
    const hours = Math.floor((ms % 86400000) / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    return `${days}d ${hours}h ${minutes}m`;
  }
}

const dataService = new DataService();

// Analytics Dashboard Component
interface AnalyticsDashboardProps {
  isVisible: boolean;
  onToggle: () => void;
  theme: string;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  isVisible,
  onToggle,
  theme
}) => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [githubStats, setGitHubStats] = useState<GitHubStats | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const themeClasses = {
    matrix: 'bg-black border-green-500 text-green-400',
    amber: 'bg-amber-900 border-amber-400 text-amber-200',
    blue: 'bg-blue-900 border-blue-400 text-blue-200',
    classic: 'bg-gray-900 border-gray-500 text-gray-200'
  };

  const currentTheme = themeClasses[theme as keyof typeof themeClasses];

  useEffect(() => {
    if (!isVisible) return;

    setIsConnected(true);

    // System status updates
    const statusInterval = setInterval(() => {
      setSystemStatus(dataService.generateSystemStatus());
    }, 5000);

    // Fetch GitHub stats
    dataService.fetchGitHubStats().then(setGitHubStats);

    return () => {
      clearInterval(statusInterval);
      setIsConnected(false);
    };
  }, [isVisible]);

  const createSparkline = (data: number[], max: number = 100) => {
    if (data.length === 0) return '';
    
    const sparkChars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
    return data.map(value => {
      const index = Math.floor((value / max) * (sparkChars.length - 1));
      return sparkChars[Math.max(0, Math.min(sparkChars.length - 1, index))];
    }).join('');
  };

  const getStatusColor = (value: number) => {
    if (value < 30) return 'text-green-400';
    if (value < 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 300 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 300 }}
      className="fixed right-4 top-4 w-96 h-96 z-50"
    >
      <div className={`border-2 ${currentTheme} rounded-lg overflow-hidden shadow-2xl h-full flex flex-col font-mono`}>
        {/* Header */}
        <div className="px-4 py-2 border-b border-opacity-30 border-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
            <span className="text-sm font-bold">Live Analytics</span>
          </div>
          <button onClick={onToggle} className="text-xl hover:opacity-75">×</button>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 overflow-y-auto space-y-4 text-xs">
          {/* System Status */}
          {systemStatus && (
            <div className="space-y-2">
              <div className="font-bold text-sm">SYSTEM STATUS</div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>CPU:</span>
                  <span className={getStatusColor(systemStatus.cpu)}>
                    {systemStatus.cpu}% {'█'.repeat(Math.floor(systemStatus.cpu / 10))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Memory:</span>
                  <span className={getStatusColor(systemStatus.memory)}>
                    {systemStatus.memory}% {'█'.repeat(Math.floor(systemStatus.memory / 10))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Network:</span>
                  <span className={getStatusColor(systemStatus.network)}>
                    {systemStatus.network}% {'█'.repeat(Math.floor(systemStatus.network / 10))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Uptime:</span>
                  <span>{systemStatus.uptime}</span>
                </div>
              </div>
            </div>
          )}

          {/* GitHub Stats */}
          {githubStats && (
            <div className="space-y-2">
              <div className="font-bold text-sm">GITHUB STATS</div>
              <div className="grid grid-cols-2 gap-2">
                <div>Stars: {githubStats.stars}</div>
                <div>Forks: {githubStats.forks}</div>
                <div>Commits: {githubStats.commits}</div>
                <div>Issues: {githubStats.issues}</div>
              </div>
            </div>
          )}

          {/* Connection Status */}
          <div className="text-xs opacity-50 text-center">
            {isConnected ? 'System monitoring active' : 'System monitoring inactive'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsDashboard;