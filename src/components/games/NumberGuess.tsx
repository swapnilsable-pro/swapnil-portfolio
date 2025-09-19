import React, { useState, useEffect } from 'react';

interface NumberGuessProps {
  onExit: () => void;
  onScore: (score: number) => void;
}

const NumberGuess: React.FC<NumberGuessProps> = ({ onExit, onScore }) => {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [guesses, setGuesses] = useState<Array<{value: number, hint: string}>>([]);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [attemptsLeft, setAttemptsLeft] = useState<number>(7);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newTarget = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(newTarget);
    setGuess('');
    setGuesses([]);
    setGameState('playing');
    setAttemptsLeft(7);
    setGameStarted(true);
  };

  const getHint = (guessValue: number, target: number): string => {
    const diff = Math.abs(guessValue - target);
    if (guessValue === target) return '🎯 BULLSEYE!';
    if (diff <= 5) return guessValue < target ? '🔥 Very close, go higher!' : '🔥 Very close, go lower!';
    if (diff <= 15) return guessValue < target ? '🌡️ Getting warm, go higher!' : '🌡️ Getting warm, go lower!';
    if (diff <= 30) return guessValue < target ? '❄️ Too low, aim higher!' : '❄️ Too high, aim lower!';
    return guessValue < target ? '🧊 Way too low!' : '🧊 Way too high!';
  };

  const handleGuess = () => {
    const guessValue = parseInt(guess);
    
    if (isNaN(guessValue) || guessValue < 1 || guessValue > 100) {
      return;
    }

    const hint = getHint(guessValue, targetNumber);
    const newGuess = { value: guessValue, hint };
    
    setGuesses(prev => [...prev, newGuess]);
    
    if (guessValue === targetNumber) {
      setGameState('won');
      const score = Math.max(100 - (7 - attemptsLeft) * 10, 10);
      onScore(score);
    } else {
      const newAttemptsLeft = attemptsLeft - 1;
      setAttemptsLeft(newAttemptsLeft);
      
      if (newAttemptsLeft === 0) {
        setGameState('lost');
        onScore(0);
      }
    }
    
    setGuess('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (gameState === 'playing') {
        handleGuess();
      }
    } else if (e.key === 'Escape') {
      onExit();
    }
  };

  return (
    <div className="game-container">
      <div className="prompt-line">
        <span className="green">swapnil@portfolio</span>
        <span className="white">:</span>
        <span className="blue">~/games</span>
        <span className="white">$ </span>
        <span className="yellow">./number_guess.sh</span>
      </div>
      
      <div className="game-content">
        <div className="game-ascii">
          <pre className="ascii-art-game">{`
    ███╗   ██╗██╗   ██╗███╗   ███╗██████╗ ███████╗██████╗ 
    ████╗  ██║██║   ██║████╗ ████║██╔══██╗██╔════╝██╔══██╗
    ██╔██╗ ██║██║   ██║██╔████╔██║██████╔╝█████╗  ██████╔╝
    ██║╚██╗██║██║   ██║██║╚██╔╝██║██╔══██╗██╔══╝  ██╔══██╗
    ██║ ╚████║╚██████╔╝██║ ╚═╝ ██║██████╔╝███████╗██║  ██║
    ╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
          `}</pre>
        </div>
        
        {gameStarted && (
          <>
            <div className="game-info">
              <div className="info-line">
                <span className="cyan">[INFO]</span> <span className="white">I'm thinking of a number between 1 and 100</span>
              </div>
              <div className="info-line">
                <span className="cyan">[INFO]</span> <span className="white">Attempts remaining: </span>
                <span className="yellow">{attemptsLeft}</span>
              </div>
              <div className="info-line">
                <span className="cyan">[INFO]</span> <span className="white">Algorithm hint: Try binary search! 🤓</span>
              </div>
            </div>

            {gameState === 'playing' && (
              <div className="game-input">
                <div className="input-line">
                  <span className="green">guess$</span>
                  <span className="white"> </span>
                  <input
                    type="number"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    onKeyPress={handleKeyPress}
                    min="1"
                    max="100"
                    className="game-number-input"
                    placeholder="Enter number (1-100)"
                    autoFocus
                  />
                  <button onClick={handleGuess} className="game-button">
                    <span className="cyan">[SUBMIT]</span>
                  </button>
                </div>
              </div>
            )}

            <div className="guesses-history">
              {guesses.map((g, index) => (
                <div key={index} className="guess-line">
                  <span className="yellow">#{index + 1}</span>
                  <span className="white"> You guessed: </span>
                  <span className="bright-green">{g.value}</span>
                  <span className="white"> → </span>
                  <span className="cyan">{g.hint}</span>
                </div>
              ))}
            </div>

            {gameState === 'won' && (
              <div className="game-result">
                <div className="victory-ascii">
                  <pre className="cyan">{`
    🎉 CONGRATULATIONS! 🎉
    ┌─────────────────────┐
    │  You guessed it!    │
    │  Number was: ${targetNumber.toString().padStart(2, ' ')}     │
    │  Attempts: ${(7 - attemptsLeft).toString()}/7         │
    │  Score: ${Math.max(100 - (7 - attemptsLeft) * 10, 10).toString().padStart(3, ' ')} pts    │
    └─────────────────────┘
                  `}</pre>
                </div>
                <div className="game-actions">
                  <button onClick={startNewGame} className="game-button">
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
    💀 GAME OVER! 💀
    ┌─────────────────────┐
    │  Better luck next!  │
    │  Number was: ${targetNumber.toString().padStart(2, ' ')}     │
    │  You were close!    │
    └─────────────────────┘
                  `}</pre>
                </div>
                <div className="game-actions">
                  <button onClick={startNewGame} className="game-button">
                    <span className="green">[TRY AGAIN]</span>
                  </button>
                  <button onClick={onExit} className="game-button">
                    <span className="red">[EXIT]</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        
        <div className="game-controls">
          <div className="control-hint">
            <span className="gray"># Controls: Enter to guess, ESC to exit</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberGuess;
