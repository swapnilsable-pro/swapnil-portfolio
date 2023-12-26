import React, { useEffect, useState } from 'react';

const WhoAmI: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  
  const fullText = `Hi, I'm Swapnil — a backend engineer who treats distributed systems like LEGO sets. With 6+ years of experience, I've built everything from real-time sports odds engines to e-commerce redemption stores. My weapon of choice? Ruby on Rails (but I duel in Node.js, React, and Kafka when needed).

When I'm not busy orchestrating microservices like a mad scientist, you'll find me breaking production (only to fix it better), winning hackathons, or tinkering with ideas that make apps just a bit nerdier. TL;DR: I ship scalable code, sprinkle in some chaos, and keep it all running like clockwork.`;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setShowCursor(false);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <div className="section">
      <div className="section-title">&gt;_ whoami</div>
      <div className="content">
        <div className="prompt-line">
          <span className="green">swapnil@portfolio</span>
          <span className="white">:</span>
          <span className="blue">~</span>
          <span className="white">$ </span>
          <span className="yellow">cat about_me.txt</span>
        </div>
        <div className="about-output">
          <div className="ascii-divider">
            <span className="cyan">{'='.repeat(5)}</span> <span className="yellow">ABOUT_ME.TXT</span> <span className="cyan">{'='.repeat(5)}</span>
          </div>
          <br />
          <div className="about-content">
            <span className="white">
              {displayedText}
              {showCursor && <span className="cursor">█</span>}
            </span>
          </div>
          <br />
          <div className="ascii-divider">
            <span className="cyan">{'='.repeat(25)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoAmI;