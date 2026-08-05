import React from 'react';
import { Card } from '../shared/components/Card';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { Badge } from '../shared/components/Badge';

export const EmergencyAlerts = ({
  active = false,
  latestMessage = 'None',
  title = 'Gate Security Alerts',
  className = '',
}) => {
  return (
    <Card className={`flex flex-col h-[340px] ${className}`}>
      <h3 className="text-sm font-bold font-poppins text-text-primary mb-6 shrink-0">{title}</h3>
      
      <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
        {active ? (
          <div className="space-y-4 animate-pulse">
            <div className="w-14 h-14 bg-danger/10 border border-danger/30 rounded-2xl flex items-center justify-center text-danger mx-auto">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <Badge type="danger">Emergency active</Badge>
              <p className="text-xs text-text-primary font-bold mt-2">{latestMessage}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-14 h-14 bg-success/10 border border-success/30 rounded-2xl flex items-center justify-center text-success mx-auto">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <Badge type="success">No active alerts</Badge>
              <p className="text-[10px] text-muted mt-2">All security zones operating normally.</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default EmergencyAlerts;
