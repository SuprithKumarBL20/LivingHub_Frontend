import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Table } from '../../../shared/components/Table';
import { Badge } from '../../../shared/components/Badge';
import { ArrowLeft, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const BookingHistoryPage = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([
    { id: 'B-9021', name: 'Swimming Pool & Sun Deck', date: '2026-08-04', slot: '09:00 AM - 11:00 AM', status: 'APPROVED', fee: 'Free' },
    { id: 'B-9022', name: 'Main Events Clubhouse', date: '2026-08-15', slot: '06:00 PM - 09:00 PM', status: 'PENDING_APPROVAL', fee: '$150.00' },
    { id: 'B-9023', name: 'Tennis Court', date: '2026-07-28', slot: '07:00 PM - 09:00 PM', status: 'COMPLETED', fee: '$20.00' }
  ]);

  const handleCancel = (id) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'CANCELLED' } : b));
    toast.success(`Booking ${id} cancelled successfully`);
  };

  const getStatusBadge = (stat) => {
    const maps = {
      REQUESTED: 'info',
      PENDING_APPROVAL: 'warning',
      APPROVED: 'success',
      REJECTED: 'danger',
      CANCELLED: 'danger',
      COMPLETED: 'success'
    };
    return <Badge type={maps[stat] || 'info'}>{stat.replace('_', ' ')}</Badge>;
  };

  const headers = ['Booking ID', 'Facility Name', 'Selected Date', 'Time Slot', 'Fee Charges', 'Status', 'Actions'];
  const rows = bookings.map(b => [
    <span className="font-mono text-xs font-bold">{b.id}</span>,
    <span className="font-bold text-text-primary">{b.name}</span>,
    b.date,
    b.slot,
    <span className="font-mono text-xs">{b.fee}</span>,
    getStatusBadge(b.status),
    (b.status === 'APPROVED' || b.status === 'PENDING_APPROVAL') ? (
      <Button 
        variant="danger" 
        size="sm" 
        onClick={() => handleCancel(b.id)}
        className="flex items-center gap-1 text-xs cursor-pointer active:scale-95"
      >
        <Trash2 className="w-3.5 h-3.5" /> Cancel
      </Button>
    ) : (
      <span className="text-[10px] text-muted font-bold uppercase">Locked</span>
    )
  ]);

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto pb-16">
      
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
          <h1 className="text-xl font-bold font-poppins text-text-primary">Facilities Reservations Logs</h1>
          <p className="text-xs text-muted mt-0.5">Audit amenity bookings and check approval updates</p>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        {bookings.length === 0 ? (
          <p className="text-xs text-muted text-center py-12">No facility bookings filed.</p>
        ) : (
          <Table headers={headers} rows={rows} />
        )}
      </Card>

    </div>
  );
};

export default BookingHistoryPage;
