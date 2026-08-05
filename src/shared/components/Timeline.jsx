import React from 'react';

export const Timeline = ({ events = [] }) => {
  if (events.length === 0) {
    return <div className="text-center text-xs text-muted py-4">No timeline progress logged.</div>;
  }

  return (
    <div className="relative border-l border-border/80 pl-6 ml-3 space-y-6 text-left">
      {events.map((e, index) => (
        <div key={e.id || index} className="relative">
          <span className="absolute -left-[31px] top-1 bg-card border-2 border-accent w-4 h-4 rounded-full" />
          <div className="text-xs">
            <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
              <span className="font-bold text-text-primary uppercase tracking-wide">{e.status}</span>
              <span className="text-[10px] text-muted font-mono">{new Date(e.timestamp).toLocaleString()}</span>
            </div>
            <p className="text-text-secondary leading-relaxed mb-1">{e.description}</p>
            <span className="text-[9px] text-muted">By: <span className="font-bold text-text-secondary">{e.actor}</span></span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
