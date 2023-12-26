import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Portfolio Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="App">
          <div className="terminal-header">
            <div className="window-controls">
              <button className="control-btn close"></button>
              <button className="control-btn minimize"></button>
              <button className="control-btn maximize"></button>
            </div>
            <div className="window-title">swapnil@portfolio: ~ [ERROR]</div>
            <div style={{ width: '60px' }}></div>
          </div>
          
          <div className="terminal-body">
            <div className="section">
              <div className="section-title">&gt;_ error_handler.sh</div>
              <div className="content">
                <pre className="error-display">
                  <span className="red">╔════════════════════════════════════════╗</span><br />
                  <span className="red">║              🚨 SYSTEM ERROR           ║</span><br />
                  <span className="red">╚════════════════════════════════════════╝</span><br />
                  <br />
                  <span className="yellow">$ ./diagnose_error.sh --verbose</span><br />
                  <br />
                  <span className="red">[ERROR]</span> <span className="white">Something went wrong in the portfolio!</span><br />
                  <span className="red">[ERROR]</span> <span className="gray">{this.state.error?.message}</span><br />
                  <br />
                  <span className="cyan">[INFO]</span> <span className="white">Don't worry, I'm a backend engineer - I debug for a living! 🐛</span><br />
                  <span className="cyan">[INFO]</span> <span className="white">Try refreshing the page or contact me directly:</span><br />
                  <br />
                  <span className="green">$ echo</span> <span className="yellow">"swapnil.sable@outlook.com"</span><br />
                  <span className="white">swapnil.sable@outlook.com</span><br />
                  <br />
                  <span className="bright-green">$ curl -X POST "https://linkedin.com/in/swapnil-sable"</span><br />
                  <span className="gray"># Professional contact available</span><br />
                  <br />
                  <div className="error-actions">
                    <button 
                      className="badge" 
                      onClick={() => window.location.reload()}
                      style={{ cursor: 'pointer', marginRight: '10px' }}
                    >
                      🔄 Reload Page
                    </button>
                    <button 
                      className="badge" 
                      onClick={() => window.location.href = 'mailto:swapnil.sable@outlook.com'}
                      style={{ cursor: 'pointer' }}
                    >
                      📧 Report Bug
                    </button>
                  </div>
                  <br />
                  <span className="gray">──────────────────────────────────────</span><br />
                  <span className="gray">Stack trace logged to console for debugging</span><br />
                  <span className="cursor">█</span>
                </pre>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;