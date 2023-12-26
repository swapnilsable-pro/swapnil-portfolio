import React from 'react';

const WorkHistory: React.FC = () => {
  const workExperience = [
    {
      company: "Jiva",
      role: "Software Engineer",
      period: "05/2022 - Present",
      location: "Remote",
      commits: [
        "feat: engineered robust, multi-step migration system to transition at-risk user personas in compliance with new laws",
        "feat: developed comprehensive loyalty program to drive positive user behavior across the platform",
        "feat: designed end-to-end field operations platform backend to streamline visit management",
        "integration: engineered integration of WhatsApp Cloud API into multi-provider communication service",
        "feat: delivered strategic pilot project to curb cash outflows from gamification program by building e-commerce redemption store",
        "feat: helped developing candidate recruitment processes, providing real-time tracking of candidate statuses",
        "perf: utilized Kafka Streams to enable efficient message and real-time communication between microservices",
        "arch: leveraged GraphQL federation to compose unified API from multiple microservices",
        "refactor: refactored code iteratively based on test feedback, adhering to red-green-refactor cycle of TDD",
        "test: contributed to setting up integration tests while actively enhancing automation test suite"
      ],
      techStack: ["Ruby on Rails", "Kafka", "GraphQL", "TDD", "Microservices"]
    },
    {
      company: "BTS",
      role: "Software Engineer", 
      period: "02/2021 - 05/2022",
      location: "Remote",
      commits: [
        "feat: developed bulk upload for bidirectional HTML and Markdown parsing",
        "test: authored detailed RSpec and Capybara test cases with Cucumber integration",
        "feat: implemented scheduling functionality with MS Teams and Zoom integration",
        "fix: identified and resolved software bugs reported through Freshdesk",
        "sync: established seamless data synchronization between Rails and Node applications"
      ],
      techStack: ["Ruby on Rails", "Node.js", "RSpec", "Capybara", "Cucumber"]
    },
    {
      company: "Gammastack",
      role: "Solution Engineer",
      period: "06/2019 - 01/2021", 
      location: "Indore",
      commits: [
        "perf: developed low-latency caching layer using Redis for real-time sports odds",
        "feat: engineered core wallet management system ensuring high transactional integrity",
        "feat: built comprehensive backoffice portal for user management and CRM",
        "integration: integrated multiple third-party online casino and game providers"
      ],
      techStack: ["Redis", "PostgreSQL", "Ruby on Rails", "Third-party APIs"]
    }
  ];

  return (
    <div className="section">
      <div className="section-title">&gt;_ work_history.log</div>
      <div className="content">
        <div className="prompt-line">
          <span className="green">swapnil@portfolio</span>
          <span className="white">:</span>
          <span className="blue">~</span>
          <span className="white">$ </span>
          <span className="yellow">git log --oneline --graph --all</span>
        </div>
        
        <div className="timeline">
          {workExperience.map((job, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-date">
                <span className="cyan">📅 {job.period}</span>
                <span className="gray"> | </span>
                <span className="orange">📍 {job.location}</span>
              </div>
              
              <div className="timeline-title">
                <span className="yellow">{job.role}</span>
                <span className="white"> @ </span>
                <span className="bright-green">{job.company}</span>
              </div>
              
              <div className="commits-section">
                <div className="commit-header">
                  <span className="cyan">┌─ Commits:</span>
                </div>
                {job.commits.map((commit, commitIndex) => (
                  <div key={commitIndex} className="commit-line">
                    <span className="cyan">│ </span>
                    <span className="yellow">*</span>
                    <span className="white"> </span>
                    <span className="commit-hash green">
                      {Math.random().toString(36).substr(2, 7)}
                    </span>
                    <span className="white"> - </span>
                    <span className="white">{commit}</span>
                  </div>
                ))}
                <div className="commit-footer">
                  <span className="cyan">└─ Tech Stack:</span>
                </div>
                <div className="timeline-tech">
                  {job.techStack.map((tech, techIndex) => (
                    <span key={techIndex} className="badge">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px' }}>
          <div className="prompt-line">
            <span className="green">swapnil@portfolio</span>
            <span className="white">:</span>
            <span className="blue">~</span>
            <span className="white">$ </span>
            <span className="gray"># 6+ years of scalable backend development experience</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkHistory;