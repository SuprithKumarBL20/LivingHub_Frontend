import React from 'react';
import { Card } from '../shared/components/Card';
import { Calendar } from 'lucide-react';
import { Badge } from '../shared/components/Badge';

export const FacilityBookings = ({
  bookings = [],
  title = 'Facility Schedulers',
  className = '',
}) => {
  return (
    <Card className={`flex flex-col h-[340px] ${className}`}>
      <h3 className="text-sm font-bold font-poppins text-text-primary mb-6 shrink-0">{title}</h3>
      
      <div className="flex-grow overflow-y-auto space-y-3 pr-1 text-xs">
        {bookings.length === 0 ? (
          <div className="text-center text-muted py-12">No active bookings recorded today.</div>
        ) : (
          bookings.map((b, i) => (
            <div key={b.id || i} className="flex justify-between items-center p-3.5 bg-primary/45 border border-border/55 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/15 border border-accent/30 rounded-lg flex items-center justify-center text-accent">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-text-primary font-bold">{b.name || 'Clubhouse'}</p>
                  <p className="text-[10px] text-muted">{b.timeSlot || '08:00 AM - 10:00 AM'}</p>
                </div>
              </div>
              <Badge type={b.status === 'CONFIRMED' ? 'success' : 'warning'}>{b.status || 'CONFIRMED'}</Badge>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default FacilityBookings;
