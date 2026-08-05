import React, { Component } from 'react';
import { AlertOctagon, Terminal, RefreshCw, Landmark } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, showDetails: false };
    this.incidentId = `LH-ERR-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, showDetails: false });
    this.incidentId = `LH-ERR-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0d1117] text-text-primary flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="w-16 h-16 bg-danger/10 border border-danger/30 rounded-2xl flex items-center justify-center text-danger mb-6">
            <AlertOctagon className="w-8 h-8" />
          </div>
          
          <h1 className="text-xl font-bold font-poppins text-white mb-2">Unexpected Application Crash</h1>
          
          <div className="space-y-1 mb-6 text-xs text-muted max-w-sm">
            <p>A rendering error occurred in this workspace.</p>
            <p className="font-mono text-[10px] text-accent">Incident ID: {this.incidentId}</p>
          </div>

          <div className="flex gap-2 mb-6">
            <button 
              onClick={this.handleReset}
              className="px-4 py-2.5 bg-accent hover:bg-accent/80 text-primary font-bold text-xs rounded-xl transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry Mounting
            </button>
            <button 
              onClick={() => {
                this.handleReset();
                window.location.href = '/dashboard';
              }}
              className="px-4 py-2.5 bg-primary/30 hover:bg-primary/50 text-text-secondary border border-border/60 font-bold text-xs rounded-xl transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <Landmark className="w-3.5 h-3.5" /> Go to Dashboard
            </button>
          </div>

          {/* Technical Details panel */}
          <div className="max-w-md w-full">
            <button
              onClick={() => this.setState({ showDetails: !this.state.showDetails })}
              className="text-[10px] text-muted hover:text-text-primary underline flex items-center gap-1 mx-auto cursor-pointer font-mono"
            >
              <Terminal className="w-3.5 h-3.5" /> {this.state.showDetails ? 'Hide technical logs' : 'Show technical logs'}
            </button>
            {this.state.showDetails && (
              <pre className="mt-4 p-4 bg-[#161b22] border border-border/50 rounded-2xl text-[10px] font-mono text-left text-danger overflow-x-auto max-h-[160px] leading-relaxed select-text">
                {this.state.error ? this.state.error.toString() : 'Unknown Error Details'}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
