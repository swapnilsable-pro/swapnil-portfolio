import React, { useState, useEffect } from 'react';

interface TicTacToeProps {
  onExit: () => void;
  onScore: (score: number) => void;
}

type Player = 'X' | 'O' | null;
type Board = Player[];

const TicTacToe: React.FC<TicTacToeProps> = ({ onExit, onScore }) => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost' | 'draw'>('playing');
  const [playerSymbol] = useState<Player>('X');
  const [aiSymbol] = useState<Player>('O');
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [draws, setDraws] = useState(0);

  const checkWinner = (board: Board): Player => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const isBoardFull = (board: Board): boolean => {
    return board.every(cell => cell !== null);
  };

  const minimax = (board: Board, depth: number, isMaximizing: boolean): number => {
    const winner = checkWinner(board);
    
    if (winner === aiSymbol) return 10 - depth;
    if (winner === playerSymbol) return depth - 10;
    if (isBoardFull(board)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = aiSymbol;
          const score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = playerSymbol;
          const score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const getBestMove = (board: Board): number => {
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = aiSymbol;
        const score = minimax(board, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const handleCellClick = (index: number) => {
    if (board[index] !== null || gameState !== 'playing' || !isPlayerTurn) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = playerSymbol;
    setBoard(newBoard);
    setIsPlayerTurn(false);

    // Check for game end after player move
    const winner = checkWinner(newBoard);
    if (winner === playerSymbol) {
      setGameState('won');
      setWins(prev => prev + 1);
      onScore(100);
    } else if (isBoardFull(newBoard)) {
      setGameState('draw');
      setDraws(prev => prev + 1);
      onScore(50);
    }
  };

  useEffect(() => {
    if (!isPlayerTurn && gameState === 'playing') {
      const timer = setTimeout(() => {
        const aiMove = getBestMove(board);
        if (aiMove !== -1) {
          const newBoard = [...board];
          newBoard[aiMove] = aiSymbol;
          setBoard(newBoard);
          
          const winner = checkWinner(newBoard);
          if (winner === aiSymbol) {
            setGameState('lost');
            setLosses(prev => prev + 1);
            onScore(0);
          } else if (isBoardFull(newBoard)) {
            setGameState('draw');
            setDraws(prev => prev + 1);
            onScore(50);
          } else {
            setIsPlayerTurn(true);
          }
        }
      }, 500); // AI thinking delay

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, gameState, aiSymbol, onScore]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameState('playing');
  };

  const renderCell = (index: number) => {
    const value = board[index];
    let cellContent = '   ';
    let cellClass = 'tic-cell empty';

    if (value === 'X') {
      cellContent = ' X ';
      cellClass = 'tic-cell player';
    } else if (value === 'O') {
      cellContent = ' O ';
      cellClass = 'tic-cell ai';
    }

    return (
      <span
        key={index}
        className={cellClass}
        onClick={() => handleCellClick(index)}
        style={{ cursor: value === null && isPlayerTurn && gameState === 'playing' ? 'pointer' : 'default' }}
      >
        {cellContent}
      </span>
    );
  };

  const renderBoard = () => {
    return (
      <div className="tic-board">
        <div className="tic-row">
          {renderCell(0)}<span className="cyan">│</span>{renderCell(1)}<span className="cyan">│</span>{renderCell(2)}
        </div>
        <div className="tic-divider">
          <span className="cyan">───┼───┼───</span>
        </div>
        <div className="tic-row">
          {renderCell(3)}<span className="cyan">│</span>{renderCell(4)}<span className="cyan">│</span>{renderCell(5)}
        </div>
        <div className="tic-divider">
          <span className="cyan">───┼───┼───</span>
        </div>
        <div className="tic-row">
          {renderCell(6)}<span className="cyan">│</span>{renderCell(7)}<span className="cyan">│</span>{renderCell(8)}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit();
      } else if (e.key >= '1' && e.key <= '9') {
        const index = parseInt(e.key) - 1;
        handleCellClick(index);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [board, isPlayerTurn, gameState]);

  return (
    <div className="game-container">
      <div className="prompt-line">
        <span className="green">swapnil@portfolio</span>
        <span className="white">:</span>
        <span className="blue">~/games</span>
        <span className="white">$ </span>
        <span className="yellow">g++ -o tic_tac_toe tic_tac_toe.cpp && ./tic_tac_toe</span>
      </div>
      
      <div className="game-content">
        <div className="game-ascii">
          <pre className="ascii-art-game">{`
    ████████╗██╗ ██████╗    ████████╗ █████╗  ██████╗    ████████╗ ██████╗ ███████╗
    ╚══██╔══╝██║██╔════╝    ╚══██╔══╝██╔══██╗██╔════╝    ╚══██╔══╝██╔═══██╗██╔════╝
       ██║   ██║██║            ██║   ███████║██║            ██║   ██║   ██║█████╗  
       ██║   ██║██║            ██║   ██╔══██║██║            ██║   ██║   ██║██╔══╝  
       ██║   ██║╚██████╗       ██║   ██║  ██║╚██████╗       ██║   ╚██████╔╝███████╗
       ╚═╝   ╚═╝ ╚═════╝       ╚═╝   ╚═╝  ╚═╝ ╚═════╝       ╚═╝    ╚═════╝ ╚══════╝
          `}</pre>
        </div>
        
        <div className="game-stats">
          <div className="stat-line">
            <span className="cyan">[WINS]</span> <span className="green">{wins}</span>
            <span className="white"> | </span>
            <span className="cyan">[LOSSES]</span> <span className="red">{losses}</span>
            <span className="white"> | </span>
            <span className="cyan">[DRAWS]</span> <span className="yellow">{draws}</span>
          </div>
          <div className="turn-indicator">
            {gameState === 'playing' && (
              isPlayerTurn ? 
                <span className="bright-green">[YOUR TURN - You are X]</span> :
                <span className="cyan">[AI THINKING - AI is O]</span>
            )}
          </div>
        </div>
        
        <div className="tic-game-area">
          <div className="board-info">
            <span className="gray"># Click a cell or press 1-9 keys</span>
          </div>
          {renderBoard()}
          <div className="position-guide">
            <span className="gray"># Position guide:</span><br />
            <span className="gray"># 1 │ 2 │ 3</span><br />
            <span className="gray"># ──┼───┼──</span><br />
            <span className="gray"># 4 │ 5 │ 6</span><br />
            <span className="gray"># ──┼───┼──</span><br />
            <span className="gray"># 7 │ 8 │ 9</span>
          </div>
        </div>
        
        {gameState === 'won' && (
          <div className="game-result">
            <div className="victory-ascii">
              <pre className="bright-green">{`
    🎉 IMPOSSIBLE! YOU WON! 🎉
    ┌─────────────────────────┐
    │  You beat the minimax!  │
    │  Algorithm efficiency:  │
    │  Human intuition > AI   │
    │  Score: +100 points     │
    └─────────────────────────┘
              `}</pre>
            </div>
            <div className="game-actions">
              <button onClick={resetGame} className="game-button">
                <span className="green">[CHALLENGE AGAIN]</span>
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
    🤖 AI WINS! 🤖
    ┌─────────────────────────┐
    │  Minimax algorithm      │
    │  never loses... almost  │
    │  Better luck next time! │
    │  Score: 0 points        │
    └─────────────────────────┘
              `}</pre>
            </div>
            <div className="game-actions">
              <button onClick={resetGame} className="game-button">
                <span className="green">[TRY AGAIN]</span>
              </button>
              <button onClick={onExit} className="game-button">
                <span className="red">[EXIT]</span>
              </button>
            </div>
          </div>
        )}

        {gameState === 'draw' && (
          <div className="game-result">
            <div className="draw-ascii">
              <pre className="yellow">{`
    🤝 IT'S A DRAW! 🤝
    ┌─────────────────────────┐
    │  Perfectly balanced,    │
    │  as all things should   │
    │  be... -Thanos (maybe)  │
    │  Score: +50 points      │
    └─────────────────────────┘
              `}</pre>
            </div>
            <div className="game-actions">
              <button onClick={resetGame} className="game-button">
                <span className="green">[REMATCH]</span>
              </button>
              <button onClick={onExit} className="game-button">
                <span className="red">[EXIT]</span>
              </button>
            </div>
          </div>
        )}
        
        <div className="game-controls">
          <div className="control-hint">
            <span className="gray"># Algorithm: Minimax with Alpha-Beta pruning</span><br />
            <span className="gray"># Difficulty: The AI plays perfectly!</span><br />
            <span className="gray"># Tip: Best you can do is a draw... or can you? 🤔</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
