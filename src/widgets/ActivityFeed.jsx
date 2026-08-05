import React from 'react';
import { Card } from '../shared/components/Card';
import { Badge } from '../shared/components/Badge';

export const ActivityFeed = ({
  activities = [],
  title = 'System Logs Audit',
  className = '',
}) => {
  return (
    <Card className={`flex flex-col h-[340px] ${className}`}>
      <h3 className="text-sm font-bold font-poppins text-text-primary mb-6 shrink-0">{title}</h3>
      
      <div className="flex-grow overflow-y-auto space-y-4 pr-1 text-xs">
        {activities.length === 0 ? (
          <div className="text-center text-muted py-12">No activity records logged.</div>
        ) : (
          activities.map((a, i) => (
            <div key={a.id || i} className="flex justify-between items-start gap-4 p-3 bg-primary/45 border border-border/50 rounded-xl">
              <div>
                <p className="text-text-primary font-semibold">{a.action}</p>
                <p className="text-[10px] text-muted mt-0.5">Actor: {a.actor}</p>
              </div>
              <span className="text-[9px] text-muted font-mono">{a.time}</span>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default ActivityFeed;
