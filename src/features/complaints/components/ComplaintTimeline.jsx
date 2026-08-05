import React from 'react';
import { Check, Clock, ShieldAlert } from 'lucide-react';

export const ComplaintTimeline = ({ currentStatus = 'OPEN' }) => {
  const steps = [
    { label: 'Open', status: 'OPEN' },
    { label: 'Assigned', status: 'ASSIGNED' },
    { label: 'Accepted', status: 'ACCEPTED' },
    { label: 'In Progress', status: 'IN_PROGRESS' },
    { label: 'Resolved', status: 'RESOLVED' },
    { label: 'Closed', status: 'CLOSED' },
    { label: 'Rated', status: 'RATED' },
  ];

  const getStatusIndex = (status) => steps.findIndex(s => s.status === status);
  const currentIndex = getStatusIndex(currentStatus);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 sm:gap-0 p-4 bg-primary/40 border border-border/50 rounded-2xl">
      {steps.map((step, idx) => {
        const isCompleted = idx < currentIndex;
        const isActive = idx === currentIndex;
        const isPending = idx > currentIndex;

        return (
          <div key={idx} className="flex flex-row sm:flex-col items-center flex-1 w-full relative sm:text-center gap-3 sm:gap-2">
            {/* Connector Line (except last item) */}
            {idx < steps.length - 1 && (
              <div 
                className={`hidden sm:block absolute left-[50%] top-4 w-full h-[2px] z-0 ${
                  idx < currentIndex ? 'bg-success' : 'bg-border/60'
                }`}
              />
            )}
            
            {/* Dot Node */}
            <div 
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold font-mono z-10 shrink-0 ${
                isCompleted 
                  ? 'bg-success/15 border-success text-success' 
                  : isActive
                  ? 'bg-accent/15 border-accent text-accent animate-pulse'
                  : 'bg-primary border-border text-muted'
              }`}
            >
              {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
            </div>

            {/* Label */}
            <div className="flex flex-col sm:items-center">
              <span className={`text-[10px] font-bold font-poppins tracking-wider uppercase ${
                isActive ? 'text-accent' : isCompleted ? 'text-text-primary' : 'text-muted'
              }`}>
                {step.label}
              </span>
              {isActive && (
                <span className="text-[8px] text-accent/70 font-mono mt-0.5 animate-pulse">
                  Current Status
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ComplaintTimeline;
