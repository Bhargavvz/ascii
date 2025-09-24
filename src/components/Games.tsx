'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

// Snake Game Component
export const SnakeGame: React.FC<{ onGameEnd: (score: number) => void }> = ({ onGameEnd }) => {
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([15, 15]);
  const [direction, setDirection] = useState([0, 1]);
  const [gameRunning, setGameRunning] = useState(true);
  const [score, setScore] = useState(0);
  
  const BOARD_SIZE = 20;

  const moveSnake = useCallback(() => {
    if (!gameRunning) return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = [...newSnake[0]];
      head[0] += direction[0];
      head[1] += direction[1];

      // Check wall collision
      if (head[0] < 0 || head[0] >= BOARD_SIZE || head[1] < 0 || head[1] >= BOARD_SIZE) {
        setGameRunning(false);
        onGameEnd(score);
        return prevSnake;
      }

      // Check self collision
      for (let segment of newSnake) {
        if (head[0] === segment[0] && head[1] === segment[1]) {
          setGameRunning(false);
          onGameEnd(score);
          return prevSnake;
        }
      }

      newSnake.unshift(head);

      // Check food collision
      if (head[0] === food[0] && head[1] === food[1]) {
        setScore(prev => prev + 10);
        setFood([
          Math.floor(Math.random() * BOARD_SIZE),
          Math.floor(Math.random() * BOARD_SIZE)
        ]);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameRunning, score, onGameEnd]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': setDirection([-1, 0]); break;
        case 'ArrowDown': setDirection([1, 0]); break;
        case 'ArrowLeft': setDirection([0, -1]); break;
        case 'ArrowRight': setDirection([0, 1]); break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 200);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  const renderCell = (row: number, col: number) => {
    const isSnake = snake.some(([r, c]) => r === row && c === col);
    const isFood = food[0] === row && food[1] === col;
    const isHead = snake[0] && snake[0][0] === row && snake[0][1] === col;
    
    return (
      <div
        key={`${row}-${col}`}
        className={`w-4 h-4 border border-gray-600 ${
          isHead ? 'bg-green-300' :
          isSnake ? 'bg-green-500' :
          isFood ? 'bg-red-500' :
          'bg-gray-800'
        }`}
      />
    );
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <span className="text-sm">Score: {score}</span>
        <span className="text-xs block mt-1">Use arrow keys to move</span>
      </div>
      <div className="grid grid-cols-20 gap-0 mx-auto w-max">
        {Array.from({ length: BOARD_SIZE }, (_, row) =>
          Array.from({ length: BOARD_SIZE }, (_, col) => renderCell(row, col))
        )}
      </div>
    </div>
  );
};

// ASCII Art Tetris-style Game
export const ASCIITetris: React.FC<{ onGameEnd: (score: number) => void }> = ({ onGameEnd }) => {
  const [board, setBoard] = useState<string[][]>(
    Array(20).fill(null).map(() => Array(10).fill(' '))
  );
  const [score, setScore] = useState(0);
  const [currentPiece, setCurrentPiece] = useState({ x: 4, y: 0, shape: '█' });
  const [gameRunning, setGameRunning] = useState(true);

  const pieces = ['█', '▓', '▒', '░', '●', '◆', '▲'];

  const isValidPosition = (x: number, y: number, newBoard: string[][] = board) => {
    return x >= 0 && x < 10 && y >= 0 && y < 20 && newBoard[y][x] === ' ';
  };

  const dropPiece = useCallback(() => {
    if (!gameRunning) return;

    setCurrentPiece(prev => {
      const newY = prev.y + 1;
      
      // Check if piece can move down
      if (!isValidPosition(prev.x, newY)) {
        // Place piece and create new one
        const newBoard = board.map(row => [...row]);
        newBoard[prev.y][prev.x] = prev.shape;
        
        // Check for line clear
        let linesCleared = 0;
        for (let y = 19; y >= 0; y--) {
          if (newBoard[y].every(cell => cell !== ' ')) {
            newBoard.splice(y, 1);
            newBoard.unshift(Array(10).fill(' '));
            linesCleared++;
            y++; // Check the same line again
          }
        }
        
        setBoard(newBoard);
        setScore(s => s + linesCleared * 100 + 10);
        
        // Check game over
        if (!isValidPosition(4, 0, newBoard)) {
          setGameRunning(false);
          onGameEnd(score + linesCleared * 100 + 10);
          return prev;
        }
        
        return {
          x: 4,
          y: 0,
          shape: pieces[Math.floor(Math.random() * pieces.length)]
        };
      }
      
      return { ...prev, y: newY };
    });
  }, [board, gameRunning, score, pieces, onGameEnd, isValidPosition]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameRunning) return;
      
      e.preventDefault();
      
      switch (e.key) {
        case 'ArrowLeft':
          setCurrentPiece(prev => {
            const newX = prev.x - 1;
            return isValidPosition(newX, prev.y) ? { ...prev, x: newX } : prev;
          });
          break;
        case 'ArrowRight':
          setCurrentPiece(prev => {
            const newX = prev.x + 1;
            return isValidPosition(newX, prev.y) ? { ...prev, x: newX } : prev;
          });
          break;
        case 'ArrowDown':
          dropPiece();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [gameRunning, dropPiece, isValidPosition]);

  useEffect(() => {
    const gameLoop = setInterval(dropPiece, 1000);
    return () => clearInterval(gameLoop);
  }, [dropPiece]);

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    
    // Add current piece to display
    if (gameRunning && isValidPosition(currentPiece.x, currentPiece.y)) {
      displayBoard[currentPiece.y][currentPiece.x] = currentPiece.shape;
    }
    
    return displayBoard.map((row, y) => (
      <div key={y} className="font-mono text-xs leading-none">
        {row.join('')}
      </div>
    ));
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <span className="text-sm">Score: {score}</span>
        <span className="text-xs block mt-1">← → arrows to move, ↓ to drop</span>
      </div>
      <div className="border border-gray-500 p-2 inline-block">
        {renderBoard()}
      </div>
    </div>
  );
};

// Terminal Typing Game
export const TypingGame: React.FC<{ onGameEnd: (wpm: number) => void }> = ({ onGameEnd }) => {
  const [text] = useState('The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  useEffect(() => {
    if (userInput.length === 1 && !startTime) {
      setStartTime(new Date());
    }
    
    if (userInput === text) {
      const endTime = new Date();
      const timeMinutes = startTime ? (endTime.getTime() - startTime.getTime()) / 60000 : 1;
      const wordsTyped = text.split(' ').length;
      const finalWpm = Math.round(wordsTyped / timeMinutes);
      setWpm(finalWpm);
      onGameEnd(finalWpm);
    }

    // Calculate accuracy
    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === text[i]) correct++;
    }
    setAccuracy(userInput.length > 0 ? Math.round((correct / userInput.length) * 100) : 100);
  }, [userInput, text, startTime, onGameEnd]);

  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = 'bg-gray-700';
      if (index < userInput.length) {
        className = userInput[index] === char ? 'bg-green-600' : 'bg-red-600';
      } else if (index === userInput.length) {
        className = 'bg-blue-600 animate-pulse';
      }
      
      return (
        <span key={index} className={`${className} px-1`}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="text-center space-y-4">
      <div className="flex justify-center space-x-4 text-sm">
        <span>WPM: {wpm}</span>
        <span>Accuracy: {accuracy}%</span>
      </div>
      <div className="text-sm font-mono leading-relaxed max-w-2xl mx-auto">
        {renderText()}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="w-full max-w-2xl p-2 bg-transparent border border-gray-500 rounded focus:outline-none focus:border-blue-500"
        placeholder="Start typing..."
        autoFocus
      />
    </div>
  );
};

// Memory Game
export const MemoryGame: React.FC<{ onGameEnd: (score: number) => void }> = ({ onGameEnd }) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [displaySequence, setDisplaySequence] = useState<number[]>([]);
  const [gameState, setGameState] = useState<'showing' | 'input' | 'waiting'>('waiting');
  const [score, setScore] = useState(0);

  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];

  const startRound = useCallback(() => {
    const newNumber = Math.floor(Math.random() * 4);
    const newSequence = [...sequence, newNumber];
    setSequence(newSequence);
    setUserSequence([]);
    setGameState('showing');
    
    // Show sequence
    let index = 0;
    setDisplaySequence([]);
    const showInterval = setInterval(() => {
      setDisplaySequence([newSequence[index]]);
      index++;
      
      if (index >= newSequence.length) {
        clearInterval(showInterval);
        setTimeout(() => {
          setDisplaySequence([]);
          setGameState('input');
        }, 500);
      }
    }, 800);
  }, [sequence]);

  const handleColorClick = (colorIndex: number) => {
    if (gameState !== 'input') return;
    
    const newUserSequence = [...userSequence, colorIndex];
    setUserSequence(newUserSequence);
    
    // Check if current input is correct
    if (colorIndex !== sequence[newUserSequence.length - 1]) {
      onGameEnd(score);
      return;
    }
    
    // Check if sequence is complete
    if (newUserSequence.length === sequence.length) {
      setScore(prev => prev + sequence.length * 10);
      setGameState('waiting');
      setTimeout(startRound, 1000);
    }
  };

  useEffect(() => {
    if (sequence.length === 0) {
      startRound();
    }
  }, [startRound, sequence.length]);

  return (
    <div className="text-center space-y-4">
      <div className="text-sm">
        Score: {score} | Round: {sequence.length}
      </div>
      <div className="text-xs">
        {gameState === 'showing' && 'Watch the sequence...'}
        {gameState === 'input' && 'Repeat the sequence!'}
        {gameState === 'waiting' && 'Get ready for next round...'}
      </div>
      <div className="grid grid-cols-2 gap-4 w-48 mx-auto">
        {colors.map((color, index) => (
          <motion.button
            key={index}
            className={`${color} w-20 h-20 rounded ${
              displaySequence.includes(index) ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={() => handleColorClick(index)}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: displaySequence.includes(index) ? 1.1 : 1,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Main Games Component
interface GamesProps {
  isVisible: boolean;
  onToggle: () => void;
  theme: string;
  onAchievement: (achievement: string) => void;
}

const Games: React.FC<GamesProps> = ({ isVisible, onToggle, theme, onAchievement }) => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [highScores, setHighScores] = useState({
    snake: 0,
    tetris: 0,
    typing: 0,
    memory: 0
  });

  const themeClasses = {
    matrix: 'bg-black border-green-500 text-green-400',
    amber: 'bg-amber-900 border-amber-400 text-amber-200',
    blue: 'bg-blue-900 border-blue-400 text-blue-200',
    classic: 'bg-gray-900 border-gray-500 text-gray-200'
  };

  const currentTheme = themeClasses[theme as keyof typeof themeClasses];

  const handleGameEnd = (game: string, score: number) => {
    const currentHigh = highScores[game as keyof typeof highScores];
    if (score > currentHigh) {
      setHighScores(prev => ({ ...prev, [game]: score }));
      onAchievement(`New ${game} high score: ${score}!`);
    }
    setCurrentGame(null);
  };

  const games = [
    { id: 'snake', name: 'Snake', icon: '[S]', description: 'Classic snake game' },
    { id: 'tetris', name: 'ASCII Tetris', icon: '[T]', description: 'Block stacking fun' },
    { id: 'typing', name: 'Speed Typing', icon: '[K]', description: 'Test your WPM' },
    { id: 'memory', name: 'Memory Game', icon: '[M]', description: 'Remember the sequence' }
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-2 sm:inset-4 md:inset-8 z-50"
    >
      <div className={`border-2 ${currentTheme} rounded-lg overflow-hidden shadow-2xl h-full flex flex-col`}>
        <div className="px-3 sm:px-4 py-2 border-b border-opacity-30 border-white flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold">Terminal Games</h2>
          <button onClick={onToggle} className="text-xl hover:opacity-75">×</button>
        </div>

        <div className="flex-1 p-3 sm:p-6 overflow-auto">
          {!currentGame ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {games.map(game => (
                  <motion.button
                    key={game.id}
                    onClick={() => setCurrentGame(game.id)}
                    className="p-4 border border-opacity-30 border-white rounded-lg hover:bg-opacity-10 hover:bg-white transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-2xl mb-2">{game.icon}</div>
                    <div className="font-bold">{game.name}</div>
                    <div className="text-xs opacity-75">{game.description}</div>
                    <div className="text-xs mt-2">
                      High Score: {highScores[game.id as keyof typeof highScores]}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setCurrentGame(null)}
                className="mb-4 px-3 py-1 border border-opacity-30 border-white rounded hover:bg-opacity-10 hover:bg-white transition-all"
              >
                ← Back to Games
              </button>
              
              {currentGame === 'snake' && <SnakeGame onGameEnd={(score) => handleGameEnd('snake', score)} />}
              {currentGame === 'tetris' && <ASCIITetris onGameEnd={(score) => handleGameEnd('tetris', score)} />}
              {currentGame === 'typing' && <TypingGame onGameEnd={(wpm) => handleGameEnd('typing', wpm)} />}
              {currentGame === 'memory' && <MemoryGame onGameEnd={(score) => handleGameEnd('memory', score)} />}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Games;