import React from 'react';
import { Card } from '../shared/components/Card';
import { Badge } from '../shared/components/Badge';

export const NoticeBoard = ({
  notices = [],
  title = 'Important Notices',
  className = '',
}) => {
  return (
    <Card className={`flex flex-col h-[340px] ${className}`}>
      <h3 className="text-sm font-bold font-poppins text-text-primary mb-6 shrink-0">{title}</h3>
      
      <div className="flex-grow overflow-y-auto space-y-4 pr-1 text-xs">
        {notices.length === 0 ? (
          <div className="text-center text-muted py-12">No notices published.</div>
        ) : (
          notices.map((n, i) => (
            <div key={n.id || i} className="p-4 bg-primary/45 border border-border/55 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <Badge type={n.importance === 'HIGH' ? 'danger' : 'info'}>{n.importance}</Badge>
                <span className="text-[9px] text-muted font-mono">{n.category}</span>
              </div>
              <h4 className="text-xs font-bold text-text-primary">{n.title}</h4>
              <p className="text-[11px] text-text-secondary leading-relaxed line-clamp-2">{n.content}</p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default NoticeBoard;
