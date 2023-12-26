import React from 'react';

const TerminalHeader: React.FC = () => {
  return (
    <div className="terminal-header">
      <div className="window-controls">
        <button className="control-btn close"></button>
        <button className="control-btn minimize"></button>
        <button className="control-btn maximize"></button>
      </div>
      <div className="window-title">
        swapnil@portfolio: ~
      </div>
      <div style={{ width: '60px' }}></div> {/* Spacer for alignment */}
    </div>
  );
};

export default TerminalHeader;