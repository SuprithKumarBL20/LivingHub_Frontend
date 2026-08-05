import React from 'react';

export const SuspenseLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <div className="space-y-1 font-mono text-xs">
        <h2 className="font-bold text-accent tracking-widest uppercase">LivingHub</h2>
        <p className="text-muted">Loading Workspace...</p>
      </div>
      
      {/* Progress simulation bar */}
      <div className="font-mono text-xs text-accent tracking-wider animate-pulse">
        ████████░░░░
      </div>
      
      <p className="text-[10px] text-muted uppercase tracking-widest font-mono">Please wait...</p>
    </div>
  );
};

export default SuspenseLoader;
