import React, { useEffect, useState } from 'react';
import './App.css';
import TerminalHeader from './components/TerminalHeader';
import WhoAmI from './components/WhoAmI';
import WorkHistory from './components/WorkHistory';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Games from './components/Games';
import Contact from './components/Contact';
import useEasterEggs from './hooks/useEasterEggs';

function App() {
  const [currentCommand, setCurrentCommand] = useState('');
  const [showContent, setShowContent] = useState(false);
  const { konamiActivated } = useEasterEggs();

  useEffect(() => {
    // Initial boot sequence
    const bootSequence = [
      'Initializing portfolio.exe...',
      'Loading personal data...',
      'Mounting file systems...',
      'Starting services...',
      'Ready!'
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < bootSequence.length) {
        setCurrentCommand(bootSequence[index]);
        index++;
      } else {
        setShowContent(true);
        setCurrentCommand('swapnil@portfolio:~$ ');
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <TerminalHeader />
      <div className="terminal-body">
        {!showContent ? (
          <div className="boot-sequence">
            <div className="ascii-art">
              <pre>{`
   ███████╗██╗    ██╗ █████╗ ██████╗ ███╗   ██╗██╗██╗     
   ██╔════╝██║    ██║██╔══██╗██╔══██╗████╗  ██║██║██║     
   ███████╗██║ █╗ ██║███████║██████╔╝██╔██╗ ██║██║██║     
   ╚════██║██║███╗██║██╔══██║██╔═══╝ ██║╚██╗██║██║██║     
   ███████║╚███╔███╔╝██║  ██║██║     ██║ ╚████║██║███████╗
   ╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝     ╚═╝  ╚═══╝╚═╝╚══════╝
              `}</pre>
            </div>
            <div className="boot-text">
              <span className="green">{currentCommand}</span>
              <span className="cursor">█</span>
            </div>
          </div>
        ) : (
          <>
            <div className="prompt-line">
              <span className="green">swapnil@portfolio</span>
              <span className="white">:</span>
              <span className="blue">~</span>
              <span className="white">$ </span>
              <span className="yellow">./run_portfolio.sh</span>
            </div>
            
            <WhoAmI />
            <WorkHistory />
            <Skills />
            <Achievements />
            <Education />
            <Games />
            <Contact />
            
            <div className="prompt-line final-prompt">
              <span className="green">swapnil@portfolio</span>
              <span className="white">:</span>
              <span className="blue">~</span>
              <span className="white">$ </span>
              <span className="cursor">█</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
