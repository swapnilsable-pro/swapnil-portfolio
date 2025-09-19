import React, { useState, useEffect, useCallback } from 'react';

interface SnakeGameProps {
  onExit: () => void;
  onScore: (score: number) => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 10;
const INITIAL_SNAKE = [{ x: 10, y: 5 }];
const INITIAL_DIRECTION: Direction = 'RIGHT';
const GAME_SPEED = 150;

const SnakeGame: React.FC<SnakeGameProps> = ({ onExit, onScore }) => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 15, y: 5 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [gameState, setGameState] = useState<'playing' | 'paused' | 'over'>('playing');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const generateFood = useCallback((snakeBody: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_WIDTH),
        y: Math.floor(Math.random() * BOARD_HEIGHT)
      };
    } while (snakeBody.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const moveSnake = useCallback(() => {
    if (gameState !== 'playing') return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_WIDTH || head.y < 0 || head.y >= BOARD_HEIGHT) {
        setGameState('over');
        onScore(score);
        return prevSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameState('over');
        onScore(score);
        return prevSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prevScore => prevScore + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameState, score, generateFood, onScore]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          setDirection(prev => prev !== 'DOWN' ? 'UP' : prev);
          break;
        case 's':
        case 'arrowdown':
          setDirection(prev => prev !== 'UP' ? 'DOWN' : prev);
          break;
        case 'a':
        case 'arrowleft':
          setDirection(prev => prev !== 'RIGHT' ? 'LEFT' : prev);
          break;
        case 'd':
        case 'arrowright':
          setDirection(prev => prev !== 'LEFT' ? 'RIGHT' : prev);
          break;
        case ' ':
          setGameState(prev => prev === 'playing' ? 'paused' : 'playing');
          break;
        case 'escape':
          onExit();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onExit]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood({ x: 15, y: 5 });
    setDirection(INITIAL_DIRECTION);
    setGameState('playing');
    setHighScore(Math.max(highScore, score));
    setScore(0);
  };

  const renderBoard = () => {
    const board = Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(' '));
    
    // Place snake
    snake.forEach((segment, index) => {
      if (segment.x >= 0 && segment.x < BOARD_WIDTH && segment.y >= 0 && segment.y < BOARD_HEIGHT) {
        board[segment.y][segment.x] = index === 0 ? '🟢' : '🟩';
      }
    });
    
    // Place food
    if (food.x >= 0 && food.x < BOARD_WIDTH && food.y >= 0 && food.y < BOARD_HEIGHT) {
      board[food.y][food.x] = '🍎';
    }
    
    return board.map((row, y) => (
      <div key={y} className="snake-row">
        <span className="cyan">│</span>
        {row.map((cell, x) => (
          <span key={x} className="snake-cell">
            {cell === ' ' ? '⬛' : cell}
          </span>
        ))}
        <span className="cyan">│</span>
      </div>
    ));
  };

  return (
    <div className="game-container">
      <div className="prompt-line">
        <span className="green">swapnil@portfolio</span>
        <span className="white">:</span>
        <span className="blue">~/games</span>
        <span className="white">$ </span>
        <span className="yellow">python3 snake_game.py</span>
      </div>
      
      <div className="game-content">
        <div className="game-ascii">
          <pre className="ascii-art-game">{`
    ███████╗███╗   ██╗ █████╗ ██╗  ██╗███████╗
    ██╔════╝████╗  ██║██╔══██╗██║ ██╔╝██╔════╝
    ███████╗██╔██╗ ██║███████║█████╔╝ █████╗  
    ╚════██║██║╚██╗██║██╔══██║██╔═██╗ ██╔══╝  
    ███████║██║ ╚████║██║  ██║██║  ██╗███████╗
    ╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
          `}</pre>
        </div>
        
        <div className="game-stats">
          <div className="stat-line">
            <span className="cyan">[SCORE]</span> <span className="yellow">{score}</span>
            <span className="white"> | </span>
            <span className="cyan">[HIGH]</span> <span className="yellow">{highScore}</span>
            <span className="white"> | </span>
            <span className="cyan">[LENGTH]</span> <span className="yellow">{snake.length}</span>
          </div>
          {gameState === 'paused' && (
            <div className="pause-indicator">
              <span className="bright-green">[PAUSED - Press SPACE to continue]</span>
            </div>
          )}
        </div>
        
        <div className="snake-board">
          <div className="board-border">
            <span className="cyan">╭{'─'.repeat(BOARD_WIDTH * 2)}╮</span>
          </div>
          {renderBoard()}
          <div className="board-border">
            <span className="cyan">╰{'─'.repeat(BOARD_WIDTH * 2)}╯</span>
          </div>
        </div>
        
        {gameState === 'over' && (
          <div className="game-result">
            <div className="game-over-ascii">
              <pre className="red">{`
    ╔══════════════════════════╗
    ║        GAME OVER!        ║
    ║                          ║
    ║  Final Score: ${score.toString().padStart(3, ' ')}        ║
    ║  Snake Length: ${snake.length.toString().padStart(2, ' ')}        ║
    ║  ${score > highScore ? 'NEW HIGH SCORE! 🎉' : 'Try again! 🐍'}    ║
    ╚══════════════════════════╝
              `}</pre>
            </div>
            <div className="game-actions">
              <button onClick={resetGame} className="game-button">
                <span className="green">[PLAY AGAIN]</span>
              </button>
              <button onClick={onExit} className="game-button">
                <span className="red">[EXIT]</span>
              </button>
            </div>
          </div>
        )}
        
        <div className="game-controls">
          <div className="control-hint">
            <span className="gray"># Controls:</span><br />
            <span className="gray"># WASD or Arrow Keys to move</span><br />
            <span className="gray"># SPACE to pause/unpause</span><br />
            <span className="gray"># ESC to exit</span><br />
            <span className="gray"># Goal: Eat apples, avoid walls & yourself!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
