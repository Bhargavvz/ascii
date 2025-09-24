'use client';

import { useEffect, useRef, useState } from 'react';
import { getThemeColors, getButtonClass } from '@/utils/theme';

interface SoundEffect {
  id: string;
  name: string;
  buffer?: AudioBuffer;
}

class SoundSystem {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private volume: number = 0.3;
  private isEnabled: boolean = true;

  async initialize() {
    if (typeof window === 'undefined') return;
    
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      await this.loadDefaultSounds();
    } catch (error) {
      console.warn('Audio context initialization failed:', error);
    }
  }

  private async loadDefaultSounds() {
    const soundConfigs = [
      { id: 'keypress', frequency: 800, duration: 0.1, type: 'square' },
      { id: 'enter', frequency: 600, duration: 0.2, type: 'sine' },
      { id: 'error', frequency: 200, duration: 0.3, type: 'sawtooth' },
      { id: 'success', frequency: 1200, duration: 0.4, type: 'sine' },
      { id: 'notification', frequency: 880, duration: 0.2, type: 'triangle' },
      { id: 'boot', frequency: 440, duration: 0.5, type: 'sine' },
      { id: 'shutdown', frequency: 220, duration: 1, type: 'sine' },
      { id: 'click', frequency: 1000, duration: 0.05, type: 'square' },
      { id: 'hover', frequency: 1400, duration: 0.05, type: 'sine' },
      { id: 'matrix', frequency: 400, duration: 0.1, type: 'square' }
    ];

    for (const config of soundConfigs) {
      const buffer = this.generateTone(config.frequency, config.duration, config.type as OscillatorType);
      if (buffer) {
        this.sounds.set(config.id, buffer);
      }
    }
  }

  private generateTone(frequency: number, duration: number, type: OscillatorType): AudioBuffer | null {
    if (!this.audioContext) return null;

    const sampleRate = this.audioContext.sampleRate;
    const bufferLength = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, bufferLength, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferLength; i++) {
      const t = i / sampleRate;
      let sample = 0;

      switch (type) {
        case 'sine':
          sample = Math.sin(2 * Math.PI * frequency * t);
          break;
        case 'square':
          sample = Math.sin(2 * Math.PI * frequency * t) > 0 ? 1 : -1;
          break;
        case 'sawtooth':
          sample = 2 * (t * frequency - Math.floor(t * frequency + 0.5));
          break;
        case 'triangle':
          sample = 2 * Math.abs(2 * (t * frequency - Math.floor(t * frequency + 0.5))) - 1;
          break;
      }

      // Apply envelope (fade in/out)
      const envelope = Math.sin((Math.PI * i) / bufferLength);
      data[i] = sample * envelope * 0.1; // Keep volume low
    }

    return buffer;
  }

  play(soundId: string, volumeMultiplier: number = 1) {
    if (!this.isEnabled || !this.audioContext || !this.sounds.has(soundId)) return;

    try {
      const buffer = this.sounds.get(soundId);
      if (!buffer) return;

      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = buffer;
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      gainNode.gain.value = this.volume * volumeMultiplier;
      source.start();
    } catch (error) {
      console.warn('Sound playback failed:', error);
    }
  }

  playSequence(soundIds: string[], interval: number = 100) {
    soundIds.forEach((soundId, index) => {
      setTimeout(() => this.play(soundId), index * interval);
    });
  }

  playBootSequence() {
    const sequence = ['boot', 'keypress', 'keypress', 'success'];
    this.playSequence(sequence, 200);
  }

  playMatrixSequence() {
    const sequence = Array(10).fill('matrix');
    this.playSequence(sequence, 100);
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  getVolume(): number {
    return this.volume;
  }

  isAudioEnabled(): boolean {
    return this.isEnabled;
  }
}

// Singleton instance
const soundSystem = new SoundSystem();

export const useSoundSystem = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    const initializeAudio = async () => {
      await soundSystem.initialize();
      setIsInitialized(true);
    };

    initializeAudio();
  }, []);

  const playSound = (soundId: string, volumeMultiplier?: number) => {
    soundSystem.play(soundId, volumeMultiplier);
  };

  const playSequence = (soundIds: string[], interval?: number) => {
    soundSystem.playSequence(soundIds, interval);
  };

  const updateVolume = (newVolume: number) => {
    soundSystem.setVolume(newVolume);
    setVolume(newVolume);
  };

  const toggleAudio = () => {
    const newState = !isEnabled;
    soundSystem.setEnabled(newState);
    setIsEnabled(newState);
  };

  return {
    isInitialized,
    volume,
    isEnabled,
    playSound,
    playSequence,
    updateVolume,
    toggleAudio,
    playBootSequence: () => soundSystem.playBootSequence(),
    playMatrixSequence: () => soundSystem.playMatrixSequence()
  };
};

// Sound Control Panel Component
interface SoundControlProps {
  isVisible: boolean;
  onToggle: () => void;
  theme: string;
}

export const SoundControl: React.FC<SoundControlProps> = ({ isVisible, onToggle, theme }) => {
  const {
    isInitialized,
    volume,
    isEnabled,
    playSound,
    updateVolume,
    toggleAudio,
    playBootSequence,
    playMatrixSequence
  } = useSoundSystem();

  const themeColors = getThemeColors(theme);

  const testSounds = [
    { id: 'keypress', name: 'Keypress', description: 'Typing sound' },
    { id: 'enter', name: 'Enter', description: 'Command execution' },
    { id: 'success', name: 'Success', description: 'Task completion' },
    { id: 'error', name: 'Error', description: 'Error notification' },
    { id: 'notification', name: 'Notification', description: 'Alert sound' },
    { id: 'click', name: 'Click', description: 'Button click' },
    { id: 'hover', name: 'Hover', description: 'Mouse hover' }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 w-72 z-50">
      <div className={`border-2 ${themeColors.border} ${themeColors.bg} ${themeColors.text} rounded-lg overflow-hidden shadow-2xl`}>
        <div className={`px-4 py-2 border-b ${themeColors.border} border-opacity-30 flex items-center justify-between`}>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isInitialized ? 'bg-green-400' : 'bg-red-400'}`} />
            <span className="text-sm font-bold">Sound System</span>
          </div>
          <button onClick={onToggle} className={`${getButtonClass(theme, 'close')}`}>×</button>
        </div>

        <div className="p-4 space-y-4">
          {/* Master Controls */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Audio:</span>
              <button
                onClick={toggleAudio}
                className={`${getButtonClass(theme, isEnabled ? 'primary' : 'secondary')} px-2 py-1 text-xs`}
              >
                {isEnabled ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-sm">Volume: {Math.round(volume * 100)}%</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => updateVolume(parseFloat(e.target.value))}
                className="w-full"
                disabled={!isEnabled}
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <span className="text-sm font-bold">Quick Tests:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={playBootSequence}
                disabled={!isEnabled}
                className={`${getButtonClass(theme, 'primary')} text-xs`}
              >
                Boot Sequence
              </button>
              <button
                onClick={playMatrixSequence}
                disabled={!isEnabled}
                className={`${getButtonClass(theme, 'primary')} text-xs`}
              >
                Matrix Rain
              </button>
            </div>
          </div>

          {/* Individual Sound Tests */}
          <div className="space-y-2">
            <span className="text-sm font-bold">Sound Effects:</span>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {testSounds.map(sound => (
                <button
                  key={sound.id}
                  onClick={() => playSound(sound.id)}
                  disabled={!isEnabled}
                  className={`${getButtonClass(theme, 'secondary')} w-full text-left text-xs`}
                >
                  <div className="flex justify-between">
                    <span>{sound.name}</span>
                    <span className="opacity-75">{sound.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="text-xs opacity-75">
            Status: {isInitialized ? 'Ready' : 'Initializing...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default soundSystem;