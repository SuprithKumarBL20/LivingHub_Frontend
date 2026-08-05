import React from 'react';
import { DollarSign, Wrench, QrCode, Calendar } from 'lucide-react';
import { KpiCard } from '../../../widgets/KpiCard';
import { QuickActions } from '../../../widgets/QuickActions';
import { NoticeBoard } from '../../../widgets/NoticeBoard';
import { FacilityBookings } from '../../../widgets/FacilityBookings';

export const ResidentDashboardGrid = ({ widgets = {} }) => {
  const bills = widgets.bills || { pendingCount: 0, totalAmount: 0 };
  const complaints = widgets.complaints || { activeCount: 0 };
  const visitors = widgets.visitors || { expectedToday: 0 };
  const notices = widgets.notices || [];
  const events = widgets.events || [];

  const shortcuts = [
    { label: 'file ticket', path: '/complaints', icon: Wrench },
    { label: 'generate pass', path: '/visitors', icon: QrCode },
    { label: 'book slot', path: '/facilities', icon: Calendar },
    { label: 'clear bills', path: '/billing', icon: DollarSign },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* KPIs row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <KpiCard 
          title="Outstanding Bills" 
          value={`$${bills.totalAmount.toFixed(2)}`} 
          icon={DollarSign} 
          trendText={`${bills.pendingCount} unpaid invoices`}
          trendType={bills.pendingCount > 0 ? 'warning' : 'success'}
        />
        <KpiCard 
          title="Active Complaints" 
          value={complaints.activeCount} 
          icon={Wrench} 
          trendText="Awaiting technician review"
          trendType={complaints.activeCount > 0 ? 'warning' : 'success'}
        />
        <KpiCard 
          title="Expected Guests Today" 
          value={visitors.expectedToday} 
          icon={QrCode} 
          trendText="Pre-approved passes active"
        />
      </div>

      {/* Widgets row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <QuickActions shortcuts={shortcuts} title="Shortcut Panel" />
        <NoticeBoard notices={notices} title="Notice Board Announcements" />
        <FacilityBookings bookings={events} title="Upcoming Amenity Bookings" />
      </div>
    </div>
  );
};

export default ResidentDashboardGrid;
