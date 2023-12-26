import React, { useEffect, useState, useMemo } from 'react';

const Skills: React.FC = () => {
  const [loadingProgress, setLoadingProgress] = useState<{[key: string]: number}>({});
  const [showSkills, setShowSkills] = useState(false);

  const skillCategories = useMemo(() => [
    {
      category: "Languages & Frameworks",
      skills: [
        { name: "Ruby on Rails", level: 95, years: 6 },
        { name: "Javascript", level: 90, years: 5 },
        { name: "Node.js", level: 85, years: 4 },
        { name: "React", level: 80, years: 3 }
      ]
    },
    {
      category: "Databases & Messaging", 
      skills: [
        { name: "PostgreSQL", level: 90, years: 5 },
        { name: "Redis", level: 85, years: 4 },
        { name: "Kafka", level: 80, years: 3 },
        { name: "RabbitMQ", level: 75, years: 2 },
        { name: "Airtable", level: 70, years: 2 }
      ]
    },
    {
      category: "Cloud & DevOps",
      skills: [
        { name: "GCP", level: 80, years: 3 },
        { name: "Docker", level: 85, years: 4 },
        { name: "Kubernetes", level: 75, years: 2 },
        { name: "CircleCI", level: 80, years: 3 },
        { name: "Git", level: 95, years: 6 },
        { name: "Confluent Cloud", level: 75, years: 3 }
      ]
    },
    {
      category: "Architecture",
      skills: [
        { name: "Microservices", level: 90, years: 4 },
        { name: "GraphQL (Apollo Federation)", level: 85, years: 3 },
        { name: "REST", level: 95, years: 6 }
      ]
    },
    {
      category: "Tools & Monitoring",
      skills: [
        { name: "Datadog", level: 80, years: 3 },
        { name: "Sentry", level: 75, years: 2 },
        { name: "Retool", level: 70, years: 2 },
        { name: "Metabase", level: 75, years: 3 },
        { name: "Mixpanel", level: 70, years: 2 }
      ]
    },
    {
      category: "Testing & Practices",
      skills: [
        { name: "RSpec", level: 90, years: 5 },
        { name: "Capybara", level: 85, years: 4 },
        { name: "Cucumber", level: 80, years: 3 },
        { name: "TDD", level: 90, years: 5 },
        { name: "CI/CD", level: 85, years: 4 },
        { name: "Agile", level: 95, years: 6 },
        { name: "Pair Programming", level: 85, years: 4 },
        { name: "Mocha", level: 75, years: 2 },
        { name: "Jest", level: 75, years: 2 }
      ]
    }
  ], []);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkills(true), 1000);
    
    if (showSkills) {
      skillCategories.forEach((category) => {
        category.skills.forEach((skill, index) => {
          setTimeout(() => {
            setLoadingProgress(prev => ({
              ...prev,
              [`${category.category}-${skill.name}`]: skill.level
            }));
          }, index * 200);
        });
      });
    }
    
    return () => clearTimeout(timer);
  }, [showSkills, skillCategories]);

  const getSkillColor = (level: number) => {
    if (level >= 90) return '#00ff00';
    if (level >= 80) return '#ffff00'; 
    if (level >= 70) return '#ff8000';
    return '#ff0000';
  };

  return (
    <div className="section">
      <div className="section-title">&gt;_ skills.sh</div>
      <div className="content">
        <div className="prompt-line">
          <span className="green">swapnil@portfolio</span>
          <span className="white">:</span>
          <span className="blue">~</span>
          <span className="white">$ </span>
          <span className="yellow">./skills.sh --verbose --show-proficiency</span>
        </div>

        {!showSkills ? (
          <div className="loading-skills">
            <span className="green">Loading skill profiles...</span>
            <span className="cursor">█</span>
          </div>
        ) : (
          <div className="skills-container">
            <div className="console-header">
              <span className="cyan">┌─ SKILL PROFICIENCY REPORT ─┐</span>
            </div>
            
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="skill-category">
                <div className="category-header">
                  <span className="bright-green">console.log('</span>
                  <span className="yellow">{category.category}</span>
                  <span className="bright-green">');</span>
                </div>
                
                <div className="skills-grid">
                  {category.skills.map((skill, skillIndex) => {
                    const progressKey = `${category.category}-${skill.name}`;
                    const currentProgress = loadingProgress[progressKey] || 0;
                    
                    return (
                      <div key={skillIndex} className="skill-item">
                        <div className="skill-header">
                          <span className="skill-name">
                            <span className="cyan">• </span>
                            <span className="white">{skill.name}</span>
                          </span>
                          <span className="skill-years">
                            <span className="gray">({skill.years}y)</span>
                          </span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ 
                              width: `${currentProgress}%`,
                              background: `linear-gradient(90deg, ${getSkillColor(skill.level)}, ${getSkillColor(skill.level)}80)`
                            }}
                          ></div>
                        </div>
                        <div className="skill-status">
                          <span 
                            className="status-indicator"
                            style={{ color: getSkillColor(skill.level) }}
                          >
                            {skill.level >= 90 ? 'EXPERT' : 
                             skill.level >= 80 ? 'ADVANCED' : 
                             skill.level >= 70 ? 'INTERMEDIATE' : 'LEARNING'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            
            <div className="console-footer">
              <span className="cyan">└─ END REPORT ─────────────┘</span>
            </div>
            
            <div className="terminal-output" style={{ marginTop: '20px' }}>
              <div className="output-line">
                <span className="green">[INFO]</span>
                <span className="white"> Total technologies mastered: </span>
                <span className="yellow">{skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0)}</span>
              </div>
              <div className="output-line">
                <span className="green">[INFO]</span>
                <span className="white"> Years of experience: </span>
                <span className="yellow">6+</span>
              </div>
              <div className="output-line">
                <span className="green">[INFO]</span>
                <span className="white"> Specialization: </span>
                <span className="bright-green">Backend Engineering & Distributed Systems</span>
              </div>
              <div className="output-line">
                <span className="blue">[DEBUG]</span>
                <span className="gray"> Still learning and growing... 🚀</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;