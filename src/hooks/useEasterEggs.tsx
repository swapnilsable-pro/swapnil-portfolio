import { useEffect, useState, useMemo } from 'react';

const useEasterEggs = () => {
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);
  
  // Konami Code: ↑↑↓↓←→←→BA
  const konamiCode = useMemo(() => [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ], []);
  
  const messages = useMemo(() => [
    "console.log('You found the Konami code! 🎮')",
    "alert('Matrix mode activated! 👾')",
    "console.warn('Warning: Hacker mode enabled! ⚡')",
    "console.info('Easter egg collector detected! 🥚')",
    "alert('Achievement unlocked: Code Ninja! 🥷')"
  ], []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const newSequence = [...sequence, event.code].slice(-konamiCode.length);
      setSequence(newSequence);
      
      // Check if Konami code is entered
      if (newSequence.length === konamiCode.length && 
          newSequence.every((key, index) => key === konamiCode[index])) {
        setKonamiActivated(true);
        
        // Show random message
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        console.log(randomMessage);
        
        // Add visual effect
        document.body.classList.add('konami-activated');
        
        // Reset after animation
        setTimeout(() => {
          setKonamiActivated(false);
          document.body.classList.remove('konami-activated');
          setSequence([]);
        }, 5000);
      }
    };

    // Secret console commands - using a flag to prevent infinite loops
    let isProcessingCommand = false;
    const originalConsoleLog = console.log;
    
    console.log = (...args: any[]) => {
      originalConsoleLog.apply(console, args);
      
      // Prevent infinite loops
      if (isProcessingCommand) return;
      
      // Check for secret commands
      const message = args.join(' ').toLowerCase();
      
      if (message.includes('swapnil')) {
        isProcessingCommand = true;
        originalConsoleLog('%c🚀 Developer Mode Activated!', 'color: #00ff00; font-size: 16px; font-weight: bold;');
        originalConsoleLog('%cHi there! Thanks for checking out my portfolio code! 👨‍💻', 'color: #00ffff;');
        originalConsoleLog('%cFeel free to reach out: swapnil.sable@outlook.com', 'color: #ffff00;');
        setTimeout(() => { isProcessingCommand = false; }, 100);
      }
      
      if (message.includes('hack') || message.includes('matrix')) {
        isProcessingCommand = true;
        originalConsoleLog('%c┌─ SYSTEM ACCESS GRANTED ─┐', 'color: #00ff00; font-family: monospace;');
        originalConsoleLog('%c│  Welcome, fellow hacker!  │', 'color: #00ff00; font-family: monospace;');
        originalConsoleLog('%c│  Enjoy exploring! 🕵️‍♂️      │', 'color: #00ff00; font-family: monospace;');
        originalConsoleLog('%c└─────────────────────────┘', 'color: #00ff00; font-family: monospace;');
        setTimeout(() => { isProcessingCommand = false; }, 100);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    // Add helpful console messages using original console.log to prevent infinite loops
    originalConsoleLog('%c👋 Welcome to Swapnil\'s Portfolio!', 'color: #00ff00; font-size: 18px; font-weight: bold;');
    originalConsoleLog('%c🎮 Try entering the Konami code: ↑↑↓↓←→←→BA', 'color: #00ffff; font-size: 14px;');
    originalConsoleLog('%c💡 Type "swapnil" in console for a surprise!', 'color: #ffff00; font-size: 14px;');
    originalConsoleLog('%c🔍 Or try typing "hack" or "matrix"!', 'color: #ff8000; font-size: 14px;');
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      console.log = originalConsoleLog;
    };
  }, [sequence, konamiCode, messages]);

  // Additional dev tricks
  useEffect(() => {
    const originalConsoleLog = console.log;
    
    // Matrix effect on specific key combination (Ctrl + Shift + M)
    const handleMatrix = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.code === 'KeyM') {
        event.preventDefault();
        
        // Create falling matrix characters
        const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const container = document.createElement('div');
        container.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999;
          overflow: hidden;
        `;
        
        for (let i = 0; i < 20; i++) {
          const column = document.createElement('div');
          column.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}vw;
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            color: #00ff00;
            animation: matrix-fall ${3 + Math.random() * 3}s linear infinite;
            opacity: 0.8;
          `;
          
          let text = '';
          for (let j = 0; j < 30; j++) {
            text += matrixChars[Math.floor(Math.random() * matrixChars.length)] + '\\n';
          }
          column.textContent = text;
          container.appendChild(column);
        }
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
          @keyframes matrix-fall {
            0% { transform: translateY(-100vh); }
            100% { transform: translateY(100vh); }
          }
        `;
        document.head.appendChild(style);
        document.body.appendChild(container);
        
        // Remove after animation
        setTimeout(() => {
          document.body.removeChild(container);
          document.head.removeChild(style);
        }, 8000);
        
        originalConsoleLog('%c🟢 Matrix Effect Activated! (Ctrl+Shift+M)', 'color: #00ff00; font-size: 16px; font-weight: bold;');
      }
    };

    window.addEventListener('keydown', handleMatrix);
    
    return () => {
      window.removeEventListener('keydown', handleMatrix);
    };
  }, []);

  return {
    konamiActivated
  };
};

export default useEasterEggs;