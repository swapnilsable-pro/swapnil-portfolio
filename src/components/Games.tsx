import React, { useState } from 'react';
import NumberGuess from './games/NumberGuess';
import SnakeGame from './games/SnakeGame';
import TicTacToe from './games/TicTacToe';
import MemoryGame from './games/MemoryGame';

interface GameStats {
  gamesPlayed: number;
  totalScore: number;
  favoriteGame: string;
}

const Games: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [gameStats, setGameStats] = useState<GameStats>({
    gamesPlayed: 0,
    totalScore: 0,
    favoriteGame: 'number-guess'
  });

  const games = [
    {
      id: 'number-guess',
      name: 'Number Guessing Game',
      description: 'Guess the number between 1-100. Classic with a nerdy twist!',
      command: './number_guess.sh',
      difficulty: 'Easy',
      icon: '🎯'
    },
    {
      id: 'snake',
      name: 'ASCII Snake',
      description: 'Classic Snake game rendered in terminal ASCII. Use WASD to move.',
      command: './snake_game.py',
      difficulty: 'Medium',
      icon: '🐍'
    },
    {
      id: 'tic-tac-toe',
      name: 'Tic-Tac-Toe AI',
      description: 'Challenge the minimax algorithm. Good luck winning!',
      command: './tic_tac_toe.cpp',
      difficulty: 'Hard',
      icon: '⭕'
    },
    {
      id: 'memory',
      name: 'Memory Pattern',
      description: 'Remember and repeat the color sequence. Simon says style!',
      command: './memory_game.js',
      difficulty: 'Medium',
      icon: '🧠'
    }
  ];

  const handleGameSelect = (gameId: string) => {
    setActiveGame(gameId);
  };

  const handleGameExit = () => {
    setActiveGame(null);
  };

  const updateGameStats = (score: number) => {
    setGameStats(prev => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1,
      totalScore: prev.totalScore + score
    }));
  };

  const renderGame = () => {
    switch (activeGame) {
      case 'number-guess':
        return <NumberGuess onExit={handleGameExit} onScore={updateGameStats} />;
      case 'snake':
        return <SnakeGame onExit={handleGameExit} onScore={updateGameStats} />;
      case 'tic-tac-toe':
        return <TicTacToe onExit={handleGameExit} onScore={updateGameStats} />;
      case 'memory':
        return <MemoryGame onExit={handleGameExit} onScore={updateGameStats} />;
      default:
        return null;
    }
  };

  if (activeGame) {
    return (
      <div className="section">
        <div className="section-title">&gt;_ games/{activeGame}</div>
        <div className="content">
          {renderGame()}
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="section-title">&gt;_ games.sh</div>
      <div className="content">
        <div className="prompt-line">
          <span className="green">swapnil@portfolio</span>
          <span className="white">:</span>
          <span className="blue">~</span>
          <span className="white">$ </span>
          <span className="yellow">ls -la ~/games/</span>
        </div>
        
        <div className="games-directory">
          <div className="games-header">
            <span className="cyan">╭─ Available Games ─╮</span><br />
            <span className="cyan">│</span> <span className="white">Choose your poison!</span> <span className="cyan">│</span><br />
            <span className="cyan">╰───────────────────╯</span>
          </div>
          
          <div className="games-list">
            {games.map((game) => (
              <div key={game.id} className="game-item" onClick={() => handleGameSelect(game.id)}>
                <div className="game-info">
                  <span className="game-icon">{game.icon}</span>
                  <div className="game-details">
                    <div className="game-line">
                      <span className="green">./</span>
                      <span className="yellow">{game.command}</span>
                      <span className="gray"> - {game.difficulty}</span>
                    </div>
                    <div className="game-description">
                      <span className="white"># {game.description}</span>
                    </div>
                  </div>
                </div>
                <div className="game-action">
                  <span className="cyan">[ENTER]</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="games-stats">
            <div className="stats-header">
              <span className="cyan">┌─ Gaming Stats ─┐</span><br />
              <span className="cyan">│</span> <span className="white">Games Played:</span> <span className="yellow">{gameStats.gamesPlayed}</span> <span className="cyan">│</span><br />
              <span className="cyan">│</span> <span className="white">Total Score:</span> <span className="yellow">{gameStats.totalScore}</span>  <span className="cyan">│</span><br />
              <span className="cyan">│</span> <span className="white">Nerd Level:</span> <span className="bright-green">OVER 9000!</span> <span className="cyan">│</span><br />
              <span className="cyan">└─────────────────┘</span>
            </div>
          </div>
          
          <div className="games-footer">
            <div className="command-tip">
              <span className="gray"># Pro tip: Each game teaches different CS concepts!</span><br />
              <span className="gray"># Number Guessing = Binary Search</span><br />
              <span className="gray"># Snake = Graph Traversal</span><br />
              <span className="gray"># Tic-Tac-Toe = Minimax Algorithm</span><br />
              <span className="gray"># Memory = Pattern Recognition</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
