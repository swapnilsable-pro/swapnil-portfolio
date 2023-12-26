import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const contactInfo = [
    {
      label: "EMAIL",
      value: "swapnil.sable@outlook.com",
      icon: "📧",
      command: "mailto:",
      copyable: true
    },
    {
      label: "PHONE",
      value: "+91 7089994737",
      icon: "📱",
      command: "tel:",
      copyable: true
    },
    {
      label: "LINKEDIN",
      value: "linkedin.com/in/7wapnil",
      icon: "💼",
      command: "https://",
      copyable: false
    },
    {
      label: "GITHUB",
      value: "github.com/7wapnil",
      icon: "🐙",
      command: "https://",
      copyable: false
    },
    {
      label: "LOCATION",
      value: "Indore, MP, India",
      icon: "📍",
      command: "https://maps.google.com/maps?q=Indore,+MP,+India",
      copyable: false
    }
  ];

  const handleCopy = async (text: string, label: string) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const handleClick = (contact: typeof contactInfo[0]) => {
    if (contact.copyable) {
      handleCopy(contact.value, contact.label);
    } else if (contact.command) {
      window.open(`${contact.command}${contact.value}`, '_blank');
    }
  };

  return (
    <div className="section">
      <div className="section-title">&gt;_ contact.me</div>
      <div className="content">
        <div className="prompt-line">
          <span className="green">swapnil@portfolio</span>
          <span className="white">:</span>
          <span className="blue">~</span>
          <span className="white">$ </span>
          <span className="yellow">./contact.me --interactive</span>
        </div>
        
        <div className="contact-container">
          <div className="contact-header">
            <pre className="contact-ascii">
{`   ╔══════════════════════════════════════╗
   ║            📬 GET IN TOUCH           ║
   ╚══════════════════════════════════════╝`}
            </pre>
          </div>
          
          <div className="contact-info">
            <div className="contact-prompt">
              <span className="cyan"># Let's connect! Click to copy or visit</span>
            </div>
            
            {contactInfo.map((contact, index) => (
              <div 
                key={index}
                className={`contact-item ${contact.copyable ? 'copyable' : 'clickable'}`}
                onClick={() => handleClick(contact)}
                title={contact.copyable ? 'Click to copy' : 'Click to visit'}
              >
                <div className="contact-icon">
                  <span>{contact.icon}</span>
                </div>
                
                <div className="contact-text">
                  <span className="contact-label">
                    <span className="yellow">{contact.label}:</span>
                  </span>
                  <span className="contact-value">
                    {contact.command && !contact.copyable && (
                      <span className="gray">{contact.command}</span>
                    )}
                    <span className="white">{contact.value}</span>
                  </span>
                </div>
                
                <div className="contact-action-container">
                  <div className="contact-action">
                    {contact.copyable ? (
                      <span className="green">[COPY]</span>
                    ) : (
                      <span className="cyan">[VISIT]</span>
                    )}
                  </div>
                  
                  <div className={`copy-feedback ${copied === contact.label ? 'show' : ''}`}>
                    <span className="bright-green">✓ Copied!</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="contact-commands">
            <div className="command-section">
              <span className="gray"># Quick commands:</span>
            </div>
            <div className="command-line">
              <span className="green">$</span> 
              <span className="white"> echo </span>
              <span className="cyan">"Feel free to reach out for collaborations, opportunities, or just to say hi!"</span>
            </div>
            <div className="command-line">
              <span className="green">$</span> 
              <span className="white"> ping </span>
              <span className="yellow">swapnil.sable@outlook.com</span>
            </div>
            <div className="command-line">
              <span className="green">$</span> 
              <span className="white"> status</span>
              <span className="bright-green"> → Currently open to new opportunities</span>
            </div>
          </div>
          
          <div className="contact-footer">
            <div className="response-time">
              <span className="cyan">┌─ Response Time Stats ─┐</span><br />
              <span className="cyan">│</span> <span className="white">Email:</span> <span className="green">&lt; 24 hours</span>     <span className="cyan">│</span><br />
              <span className="cyan">│</span> <span className="white">LinkedIn:</span> <span className="green">&lt; 12 hours</span>  <span className="cyan">│</span><br />
              <span className="cyan">│</span> <span className="white">Timezone:</span> <span className="yellow">IST (GMT+5:30)</span> <span className="cyan">│</span><br />
              <span className="cyan">└───────────────────────┘</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;