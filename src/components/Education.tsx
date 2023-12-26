import React from 'react';

const Education: React.FC = () => {
  return (
    <div className="section">
      <div className="section-title">&gt;_ education.txt</div>
      <div className="content">
        <div className="prompt-line">
          <span className="green">swapnil@portfolio</span>
          <span className="white">:</span>
          <span className="blue">~</span>
          <span className="white">$ </span>
          <span className="yellow">head -n 20 education.txt</span>
        </div>
        
        <div className="education-file">
          <div className="file-header">
            <span className="gray">{'═'.repeat(40)}</span><br />
            <span className="cyan">            📚 EDUCATION.TXT            </span><br />
            <span className="gray">{'═'.repeat(40)}</span>
          </div>
          <br />
          <div className="education-entry">
            <span className="yellow">DEGREE:</span> <span className="white">Bachelor of Engineering</span><br />
            <span className="yellow">INSTITUTION:</span> <span className="bright-green">Indore Institute of Science<br />{''.padStart(13)}and Technology</span><br />
            <span className="yellow">LOCATION:</span> <span className="cyan">Indore, MP, India</span><br />
            <span className="yellow">DURATION:</span> <span className="orange">August 2015 - May 2019</span><br />
            <span className="yellow">STATUS:</span> <span className="green">✓ COMPLETED</span>
          </div>
          <br />
          <div className="education-notes">
            <span className="gray"># Additional Notes:</span><br />
            <span className="white">- Foundation in Computer Science<br />  and Engineering</span><br />
            <span className="white">- Solid understanding of algorithms<br />  and data structures</span><br />
            <span className="white">- Exposure to various programming<br />  languages and technologies</span><br />
            <span className="white">- Participated in technical projects<br />  and coding competitions</span>
          </div>
          <br />
          <div className="education-stats">
            <span className="cyan">╭─ Academic Journey Stats ─╮</span><br />
            <span className="cyan">│</span> <span className="white">Duration:</span> <span className="yellow">4 years</span>          <span className="cyan">│</span><br />
            <span className="cyan">│</span> <span className="white">Focus:</span> <span className="bright-green">Software Eng.</span>     <span className="cyan">│</span><br />
            <span className="cyan">│</span> <span className="white">Outcome:</span> <span className="green">Industry-ready</span>   <span className="cyan">│</span><br />
            <span className="cyan">╰───────────────────────────╯</span>
          </div>
          <br />
          <div className="learning-philosophy">
            <span className="magenta">&gt;&gt;&gt;</span> <span className="white">LEARNING_PHILOSOPHY = {'{'}</span><br />
            <span className="white">  </span><span className="cyan">"formal_education":</span><br />
            <span className="white">    </span><span className="green">"strong foundation"</span>,<br />
            <span className="white">  </span><span className="cyan">"continuous_learning":</span><br />
            <span className="white">    </span><span className="green">"never stops"</span>,<br />
            <span className="white">  </span><span className="cyan">"real_world_application":</span><br />
            <span className="white">    </span><span className="green">"where magic happens"</span><br />
            <span className="white">{'}'}</span>
          </div>
          <br />
          <div className="file-footer">
            <span className="gray">{'─'.repeat(40)}</span><br />
            <span className="gray">EOF - End of education.txt</span><br />
            <span className="gray">Last modified: 2019-05-15</span><br />
            <span className="gray">Size: 1.2KB</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;