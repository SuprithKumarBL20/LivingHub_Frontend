import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { ArrowLeft, Calendar, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const FacilityBookPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialFacility = searchParams.get('facility') || 'pool';

  const [booking, setBooking] = useState({
    facilityId: initialFacility,
    date: new Date().toISOString().split('T')[0],
    slot: '09:00 AM - 11:00 AM',
    guestsCount: '2'
  });

  const [submitting, setSubmitting] = useState(false);

  const getEstimatedFee = () => {
    if (booking.facilityId === 'clubhouse') return '$100.00 (2 Hours)';
    if (booking.facilityId === 'tennis') return '$20.00 (2 Hours)';
    return 'Free / Complementary';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API request to POST /api/v1/facilities/book
    await new Promise(resolve => setTimeout(resolve, 800));
    setSubmitting(false);
    toast.success('Facility reservation requested! Awaiting admin approval.');
    navigate('/facilities/history');
  };

  return (
    <div className="space-y-8 text-left max-w-xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4 flex items-center gap-3">
        <Button 
          variant="glass" 
          size="sm" 
          onClick={() => navigate('/facilities')}
          className="p-2 cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold font-poppins text-text-primary">Reserve Facility Slot</h1>
          <p className="text-xs text-muted mt-0.5">Configure schedule dates, slots, and guests numbers</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="space-y-6">
          <Select 
            label="Selected Facility" 
            id="book-fac" 
            value={booking.facilityId}
            onChange={e => setBooking({ ...booking, facilityId: e.target.value })}
            options={[
              { value: 'pool', label: 'Swimming Pool & Sun Deck' },
              { value: 'clubhouse', label: 'Main Events Clubhouse' },
              { value: 'tennis', label: 'Tennis & Sports Court' }
            ]}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input 
              label="Selected Date" 
              id="book-date" 
              type="date"
              value={booking.date} 
              onChange={e => setBooking({ ...booking, date: e.target.value })} 
              required 
            />
            <Select 
              label="Available Time Slot" 
              id="book-slot" 
              value={booking.slot}
              onChange={e => setBooking({ ...booking, slot: e.target.value })}
              options={[
                { value: '06:00 AM - 08:00 AM', label: '06:00 AM - 08:00 AM' },
                { value: '09:00 AM - 11:00 AM', label: '09:00 AM - 11:00 AM' },
                { value: '12:00 PM - 02:00 PM', label: '12:00 PM - 02:00 PM' },
                { value: '03:00 PM - 05:00 PM', label: '03:00 PM - 05:00 PM' },
                { value: '06:00 PM - 08:00 PM', label: '06:00 PM - 08:00 PM' }
              ]}
            />
          </div>

          <Input 
            label="Estimated Number of Guests" 
            id="book-guests" 
            type="number"
            value={booking.guestsCount} 
            onChange={e => setBooking({ ...booking, guestsCount: e.target.value })} 
            required 
          />

          {/* Pricing estimation box */}
          <div className="p-4 bg-primary/45 border border-border/55 rounded-xl space-y-1 text-xs">
            <p className="text-muted font-poppins">Total Reservation Fee:</p>
            <p className="font-bold text-accent font-mono">{getEstimatedFee()}</p>
          </div>

          <div className="flex gap-4 text-xs">
            <Button type="button" variant="glass" className="w-1/2" onClick={() => navigate('/facilities')}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="w-1/2 flex items-center justify-center gap-1.5" isLoading={submitting}>
              <Calendar className="w-4 h-4" /> Confirm Reservation
            </Button>
          </div>
        </Card>
      </form>

    </div>
  );
};

export default FacilityBookPage;
