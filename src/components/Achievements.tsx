import React from 'react';

const Achievements: React.FC = () => {
  return (
    <div className="section">
      <div className="section-title">&gt;_ achievements.md</div>
      <div className="content">
        <div className="prompt-line">
          <span className="green">swapnil@portfolio</span>
          <span className="white">:</span>
          <span className="blue">~</span>
          <span className="white">$ </span>
          <span className="yellow">cat achievements.md | markdown-viewer</span>
        </div>
        
        <div className="markdown-container">
          <div className="markdown-header">
            <span className="gray"># </span>
            <span className="bright-green">KEY ACHIEVEMENTS</span>
          </div>
          
          <div className="markdown-section">
            <div className="markdown-subsection">
              <span className="yellow">## 🏆 Hackathon Success</span>
            </div>
            
            <div className="achievement-item">
              <div className="achievement-header">
                <span className="cyan">### </span>
                <span className="orange">Growtopia'24 Hackathon - Runner-up</span>
              </div>
              
              <div className="achievement-details">
                <div className="achievement-line">
                  <span className="gray">- </span>
                  <span className="white">**Challenge:** </span>
                  <span className="white">Devised a mechanism for blasting out categorized notifications to users based on key criterion</span>
                </div>
                
                <div className="achievement-line">
                  <span className="gray">- </span>
                  <span className="white">**Solution:** </span>
                  <span className="white">Built an intelligent notification system with advanced categorization and targeting</span>
                </div>
                
                <div className="achievement-line">
                  <span className="gray">- </span>
                  <span className="white">**Impact:** </span>
                  <span className="white">Secured Runner-up position among competitive teams</span>
                </div>
                
                <div className="achievement-line">
                  <span className="gray">- </span>
                  <span className="white">**Tech Stack:** </span>
                  <div className="tech-tags">
                    <span className="badge">Real-time Systems</span>
                    <span className="badge">Notification Engine</span>
                    <span className="badge">Algorithm Design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="markdown-section">
            <div className="markdown-subsection">
              <span className="yellow">## 🚀 Technical Contributions</span>
            </div>
            
            <div className="contribution-grid">
              <div className="contribution-item">
                <span className="cyan">### </span>
                <span className="bright-green">Scalable System Architecture</span>
                <div className="contribution-desc">
                  <span className="gray">- </span>
                  <span className="white">Designed and implemented microservice architectures serving millions of users</span>
                </div>
                <div className="contribution-desc">
                  <span className="gray">- </span>
                  <span className="white">Built low-latency caching layers for real-time applications</span>
                </div>
              </div>
              
              <div className="contribution-item">
                <span className="cyan">### </span>
                <span className="bright-green">Innovation & Problem Solving</span>
                <div className="contribution-desc">
                  <span className="gray">- </span>
                  <span className="white">Engineered migration systems for compliance with regulatory changes</span>
                </div>
                <div className="contribution-desc">
                  <span className="gray">- </span>
                  <span className="white">Created e-commerce redemption stores to optimize cash flows</span>
                </div>
              </div>
              
              <div className="contribution-item">
                <span className="cyan">### </span>
                <span className="bright-green">Team Leadership & Mentoring</span>
                <div className="contribution-desc">
                  <span className="gray">- </span>
                  <span className="white">Contributed to candidate recruitment processes and team building</span>
                </div>
                <div className="contribution-desc">
                  <span className="gray">- </span>
                  <span className="white">Enhanced automation test suites and development practices</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="markdown-section">
            <div className="markdown-subsection">
              <span className="yellow">## 📊 Professional Impact</span>
            </div>
            
            <div className="stats-container">
              <div className="stat-item">
                <span className="bright-green">```</span>
                <div className="stat-code">
                  <div className="stat-line">
                    <span className="cyan">Years of Experience:</span> <span className="yellow">6+</span>
                  </div>
                  <div className="stat-line">
                    <span className="cyan">Companies Worked:</span> <span className="yellow">3</span>
                  </div>
                  <div className="stat-line">
                    <span className="cyan">Technologies Mastered:</span> <span className="yellow">20+</span>
                  </div>
                  <div className="stat-line">
                    <span className="cyan">Architecture Style:</span> <span className="yellow">Microservices</span>
                  </div>
                  <div className="stat-line">
                    <span className="cyan">Favorite Stack:</span> <span className="yellow">Ruby on Rails + Kafka + Redis</span>
                  </div>
                </div>
                <span className="bright-green">```</span>
              </div>
            </div>
          </div>
          
          <div className="markdown-footer">
            <span className="gray">---</span>
          </div>
          
          <div className="markdown-quote">
            <span className="gray">&gt; </span>
            <span className="cyan">"I ship scalable code, sprinkle in some chaos, and keep it all running like clockwork."</span>
            <br />
            <span className="gray">&gt; </span>
            <span className="gray">- Swapnil Sable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;