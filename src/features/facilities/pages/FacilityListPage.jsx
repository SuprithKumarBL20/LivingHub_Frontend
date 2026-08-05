import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Badge } from '../../../shared/components/Badge';
import { Calendar, Users, DollarSign, Clock, HelpCircle, History } from 'lucide-react';

export const FacilityListPage = () => {
  const navigate = useNavigate();

  const [facilities] = useState([
    { id: 'pool', name: 'Swimming Pool & Sun Deck', capacity: 30, fee: 'Free for residents', window: '06:00 AM - 10:00 PM', policy: 'No guests without pre-registry', desc: 'Outdoor heated pool with loungers and locker rooms.' },
    { id: 'clubhouse', name: 'Main Events Clubhouse', capacity: 150, fee: '$50.00 / hour', window: '09:00 AM - 11:00 PM', policy: 'Refundable cleaning deposit required', desc: 'Banquet hall with speakers, pantry, and projector setup.' },
    { id: 'tennis', name: 'Tennis & Sports Court', capacity: 4, fee: '$10.00 / hour', window: '07:00 AM - 09:00 PM', policy: 'Non-marking sports shoes only', desc: 'Synthetic turf tennis court with floodlights.' }
  ]);

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold font-poppins text-text-primary flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" /> Amenity Facility Booking
          </h1>
          <p className="text-xs text-muted mt-1">Book slots, inspect reservation policies, and track approvals status</p>
        </div>
        <Button 
          variant="glass" 
          onClick={() => navigate('/facilities/history')}
          className="flex items-center gap-1.5 text-xs active:scale-95"
        >
          <History className="w-4 h-4" /> Booking History
        </Button>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {facilities.map(fac => (
          <Card key={fac.id} className="flex flex-col justify-between h-[360px]">
            <div className="space-y-4">
              <h3 className="text-sm font-bold font-poppins text-text-primary border-b border-border/40 pb-2">{fac.name}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{fac.desc}</p>
              
              {/* Rules Specifications */}
              <div className="space-y-2 text-[10px] text-muted font-mono leading-relaxed pt-2">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-accent" /> Max Capacity: {fac.capacity} people
                </div>
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-success" /> Booking Fee: {fac.fee}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-info" /> Hours: {fac.window}
                </div>
                <div className="flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-warning" /> Policy: {fac.policy}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/40 mt-4 flex justify-between items-center text-xs">
              <span className="text-[10px] text-muted">Auto-approved if free</span>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => navigate(`/facilities/book?facility=${fac.id}`)}
                className="text-xs active:scale-95 px-5"
              >
                Reserve Slot
              </Button>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default FacilityListPage;
