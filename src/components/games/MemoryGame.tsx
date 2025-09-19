import React, { useState, useEffect } from 'react';

interface MemoryGameProps {
  onExit: () => void;
  onScore: (score: number) => void;
}

type Color = 'red' | 'green' | 'blue' | 'yellow';

interface ColorButton {
  color: Color;
  isActive: boolean;
  isPlayerActive: boolean;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onExit, onScore }) => {
  const [sequence, setSequence] = useState<Color[]>([]);
  const [playerSequence, setPlayerSequence] = useState<Color[]>([]);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [gameState, setGameState] = useState<'waiting' | 'showing' | 'input' | 'won' | 'lost'>('waiting');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [activeColor, setActiveColor] = useState<Color | null>(null);

  const colors: Color[] = ['red', 'green', 'blue', 'yellow'];
  
  const colorMap = {
    red: { bg: 'background: #ff4444', symbol: '🟥', name: 'RED' },
    green: { bg: 'background: #44ff44', symbol: '🟩', name: 'GREEN' },
    blue: { bg: 'background: #4444ff', symbol: '🟦', name: 'BLUE' },
    yellow: { bg: 'background: #ffff44', symbol: '🟨', name: 'YELLOW' }
  };

  const generateSequence = (level: number): Color[] => {
    const newSequence: Color[] = [];
    for (let i = 0; i < level; i++) {
      newSequence.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return newSequence;
  };

  const startNewRound = () => {
    const newSequence = generateSequence(currentLevel);
    setSequence(newSequence);
    setPlayerSequence([]);
    setGameState('showing');
    setIsShowingSequence(true);
    
    // Show sequence
    showSequence(newSequence);
  };

  const showSequence = async (seq: Color[]) => {
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setActiveColor(seq[i]);
      await new Promise(resolve => setTimeout(resolve, 400));
      setActiveColor(null);
    }
    
    setIsShowingSequence(false);
    setGameState('input');
  };

  const handleColorClick = (color: Color) => {
    if (gameState !== 'input' || isShowingSequence) return;

    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    // Check if current input is correct
    if (color !== sequence[newPlayerSequence.length - 1]) {
      setGameState('lost');
      onScore(score);
      return;
    }

    // Check if sequence is complete
    if (newPlayerSequence.length === sequence.length) {
      const points = currentLevel * 10;
      setScore(prev => prev + points);
      
      if (currentLevel >= 10) {
        setGameState('won');
        onScore(score + points);
      } else {
        setCurrentLevel(prev => prev + 1);
        setTimeout(() => {
          startNewRound();
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setGameState('waiting');
    setCurrentLevel(1);
    setHighScore(Math.max(highScore, score));
    setScore(0);
    setActiveColor(null);
    setIsShowingSequence(false);
  };

  const startGame = () => {
    resetGame();
    setTimeout(() => startNewRound(), 500);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit();
      } else if (gameState === 'input' && !isShowingSequence) {
        switch (e.key.toLowerCase()) {
          case 'r':
          case '1':
            handleColorClick('red');
            break;
          case 'g':
          case '2':
            handleColorClick('green');
            break;
          case 'b':
          case '3':
            handleColorClick('blue');
            break;
          case 'y':
          case '4':
            handleColorClick('yellow');
            break;
        }
      } else if (e.key === ' ' && gameState === 'waiting') {
        startGame();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, isShowingSequence, onExit]);

  const renderColorButton = (color: Color) => {
    const isActive = activeColor === color;
    const config = colorMap[color];
    
    return (
      <div
        key={color}
        className={`memory-color-btn ${color} ${isActive ? 'active' : ''}`}
        onClick={() => handleColorClick(color)}
        style={{
          opacity: isActive ? 1 : 0.6,
          transform: isActive ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 0.2s ease'
        }}
      >
        <div className="color-content">
          <span className="color-symbol">{config.symbol}</span>
          <span className="color-name">{config.name}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="game-container">
      <div className="prompt-line">
        <span className="green">swapnil@portfolio</span>
        <span className="white">:</span>
        <span className="blue">~/games</span>
        <span className="white">$ </span>
        <span className="yellow">node memory_game.js</span>
      </div>
      
      <div className="game-content">
        <div className="game-ascii">
          <pre className="ascii-art-game">{`
    ███╗   ███╗███████╗███╗   ███╗ ██████╗ ██████╗ ██╗   ██╗
    ████╗ ████║██╔════╝████╗ ████║██╔═══██╗██╔══██╗╚██╗ ██╔╝
    ██╔████╔██║█████╗  ██╔████╔██║██║   ██║██████╔╝ ╚████╔╝ 
    ██║╚██╔╝██║██╔══╝  ██║╚██╔╝██║██║   ██║██╔══██╗  ╚██╔╝  
    ██║ ╚═╝ ██║███████╗██║ ╚═╝ ██║╚██████╔╝██║  ██║   ██║   
    ╚═╝     ╚═╝╚══════╝╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   
          `}</pre>
        </div>
        
        <div className="game-stats">
          <div className="stat-line">
            <span className="cyan">[LEVEL]</span> <span className="yellow">{currentLevel}</span>
            <span className="white"> | </span>
            <span className="cyan">[SCORE]</span> <span className="yellow">{score}</span>
            <span className="white"> | </span>
            <span className="cyan">[HIGH]</span> <span className="yellow">{highScore}</span>
          </div>
          <div className="game-status">
            {gameState === 'waiting' && (
              <span className="bright-green">[PRESS SPACE TO START]</span>
            )}
            {gameState === 'showing' && (
              <span className="cyan">[WATCH THE SEQUENCE...]</span>
            )}
            {gameState === 'input' && (
              <span className="yellow">[REPEAT THE SEQUENCE]</span>
            )}
          </div>
        </div>
        
        {gameState !== 'waiting' && (
          <div className="memory-game-area">
            <div className="sequence-display">
              <span className="gray"># Target sequence length: {sequence.length}</span><br />
              <span className="gray"># Your progress: {playerSequence.length}/{sequence.length}</span>
            </div>
            
            <div className="memory-board">
              <div className="color-grid">
                {colors.map(color => renderColorButton(color))}
              </div>
            </div>
            
            <div className="sequence-info">
              {sequence.length > 0 && (
                <>
                  <span className="gray"># Sequence: </span>
                  {isShowingSequence || gameState === 'input' ? 
                    sequence.slice(0, playerSequence.length).map((color, index) => (
                      <span key={index} className={`sequence-color ${color}`}>
                        {colorMap[color].symbol}
                      </span>
                    )) :
                    sequence.map((color, index) => (
                      <span key={index} className={`sequence-color ${color}`}>
                        {colorMap[color].symbol}
                      </span>
                    ))
                  }
                </>
              )}
            </div>
          </div>
        )}
        
        {gameState === 'waiting' && (
          <div className="game-instructions">
            <div className="instructions-content">
              <span className="cyan">╭─ HOW TO PLAY ─╮</span><br />
              <span className="cyan">│</span> <span className="white">1. Watch the color sequence</span> <span className="cyan">│</span><br />
              <span className="cyan">│</span> <span className="white">2. Repeat it by clicking colors</span> <span className="cyan">│</span><br />
              <span className="cyan">│</span> <span className="white">3. Each level adds one more color</span> <span className="cyan">│</span><br />
              <span className="cyan">│</span> <span className="white">4. Reach level 10 to win!</span> <span className="cyan">│</span><br />
              <span className="cyan">╰─────────────────────╯</span><br />
              <br />
              <span className="gray"># Keyboard shortcuts:</span><br />
              <span className="gray"># R or 1 = Red, G or 2 = Green</span><br />
              <span className="gray"># B or 3 = Blue, Y or 4 = Yellow</span>
            </div>
            
            <div className="start-button-area">
              <button onClick={startGame} className="game-button start-btn">
                <span className="bright-green">[START GAME]</span>
              </button>
            </div>
          </div>
        )}
        
        {gameState === 'won' && (
          <div className="game-result">
            <div className="victory-ascii">
              <pre className="bright-green">{`
    🧠 MEMORY MASTER! 🧠
    ┌─────────────────────────┐
    │  You completed 10 levels│
    │  Your memory is perfect!│
    │  Final Score: ${score.toString().padStart(3, ' ')}       │
    │  🏆 COGNITIVE CHAMPION 🏆│
    └─────────────────────────┘
              `}</pre>
            </div>
            <div className="game-actions">
              <button onClick={startGame} className="game-button">
                <span className="green">[PLAY AGAIN]</span>
              </button>
              <button onClick={onExit} className="game-button">
                <span className="red">[EXIT]</span>
              </button>
            </div>
          </div>
        )}

        {gameState === 'lost' && (
          <div className="game-result">
            <div className="defeat-ascii">
              <pre className="red">{`
    💭 MEMORY OVERLOAD! 💭
    ┌─────────────────────────┐
    │  You reached level ${currentLevel.toString().padStart(2, ' ')}   │
    │  Final Score: ${score.toString().padStart(3, ' ')}       │
    │  Keep training that     │
    │  neural network! 🧠     │
    └─────────────────────────┘
              `}</pre>
            </div>
            <div className="game-actions">
              <button onClick={startGame} className="game-button">
                <span className="green">[TRY AGAIN]</span>
              </button>
              <button onClick={onExit} className="game-button">
                <span className="red">[EXIT]</span>
              </button>
            </div>
          </div>
        )}
        
        <div className="game-controls">
          <div className="control-hint">
            <span className="gray"># Memory training improves cognitive function!</span><br />
            <span className="gray"># This game tests working memory capacity</span><br />
            <span className="gray"># Average human can remember 7±2 items</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
