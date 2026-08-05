import React from 'react';
import { Card } from '../shared/components/Card';
import { Badge } from '../shared/components/Badge';
import { QrCode } from 'lucide-react';

export const RecentVisitors = ({
  visitors = [],
  title = 'Gate Log Entry Queue',
  className = '',
}) => {
  return (
    <Card className={`flex flex-col h-[340px] ${className}`}>
      <h3 className="text-sm font-bold font-poppins text-text-primary mb-6 shrink-0">{title}</h3>
      
      <div className="flex-grow overflow-y-auto space-y-3.5 pr-1 text-xs">
        {visitors.length === 0 ? (
          <div className="text-center text-muted py-12">No visitor checks.</div>
        ) : (
          visitors.map((v, i) => (
            <div key={v.id || i} className="flex items-center justify-between p-3.5 bg-primary/45 border border-border/55 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/15 border border-accent/30 rounded-lg flex items-center justify-center text-accent">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-text-primary font-bold">{v.name}</p>
                  <p className="text-[10px] text-muted">{v.purpose}</p>
                </div>
              </div>
              <Badge type={v.status === 'CHECKED_IN' ? 'success' : 'warning'}>{v.status}</Badge>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default RecentVisitors;
