import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Table } from '../../../shared/components/Table';
import { Select } from '../../../shared/components/Select';
import { Badge } from '../../../shared/components/Badge';
import { ArrowLeft, Search, Eye, Filter } from 'lucide-react';

export const VisitorHistoryPage = () => {
  const navigate = useNavigate();

  const [history] = useState([
    { id: '1091', name: 'Sophia Sterling', category: 'Guest', phone: '+1 (555) 019-3388', host: 'David Miller', unit: 'A-402', entryTime: '2026-08-02 14:22', exitTime: '2026-08-02 21:05', status: 'ARRIVED' },
    { id: '1092', name: 'UPS Parcel Driver', category: 'Delivery', phone: 'None', host: 'David Miller', unit: 'A-402', entryTime: '2026-08-03 10:15', exitTime: '2026-08-03 10:22', status: 'ARRIVED' },
    { id: '1093', name: 'Marcus Brody', category: 'Maintenance Vendor', phone: '+1 (555) 012-7711', host: 'Evelyn Carter', unit: 'B-108', entryTime: '2026-08-01 09:00', exitTime: '2026-08-01 11:30', status: 'ARRIVED' },
    { id: '1094', name: 'Emily Davis', category: 'Guest', phone: '+1 (555) 012-9922', host: 'David Miller', unit: 'A-402', entryTime: 'None', exitTime: 'None', status: 'REJECTED' }
  ]);

  const [filters, setFilters] = useState({
    category: '',
    status: '',
  });

  const getStatusBadge = (stat) => {
    const maps = {
      APPROVED: 'info',
      ARRIVED: 'success',
      REJECTED: 'danger'
    };
    return <Badge type={maps[stat] || 'info'}>{stat}</Badge>;
  };

  const filtered = history.filter(v => {
    if (filters.category && v.category !== filters.category) return false;
    if (filters.status && v.status !== filters.status) return false;
    return true;
  });

  const headers = ['Pass ID', 'Visitor Name', 'Category', 'Host Unit', 'Entry Checked', 'Exit Checked', 'Gate Status'];
  const rows = filtered.map(v => [
    <span className="font-mono text-xs font-bold">{v.id}</span>,
    <span className="font-bold text-text-primary">{v.name}</span>,
    v.category,
    <span className="font-mono text-xs">{v.unit}</span>,
    v.entryTime,
    v.exitTime,
    getStatusBadge(v.status)
  ]);

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4 flex items-center gap-3">
        <Button 
          variant="glass" 
          size="sm" 
          onClick={() => navigate('/visitors')}
          className="p-2 cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold font-poppins text-text-primary">Historical Guest Logs</h1>
          <p className="text-xs text-muted mt-0.5">Audit log records of all security check-ins and passes exclusions</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <Select 
          label="Visitor Category" 
          id="filter-vcat" 
          value={filters.category}
          onChange={e => setFilters({ ...filters, category: e.target.value })}
          options={[
            { value: '', label: 'All Categories' },
            { value: 'Guest', label: 'Guest' },
            { value: 'Delivery', label: 'Delivery' },
            { value: 'Maintenance Vendor', label: 'Maintenance Vendor' },
            { value: 'Taxi / Ride Share', label: 'Taxi / Ride Share' }
          ]}
        />
        <Select 
          label="Pass Status" 
          id="filter-vstat" 
          value={filters.status}
          onChange={e => setFilters({ ...filters, status: e.target.value })}
          options={[
            { value: '', label: 'All Statuses' },
            { value: 'APPROVED', label: 'Approved' },
            { value: 'ARRIVED', label: 'Checked In (Arrived)' },
            { value: 'REJECTED', label: 'Rejected' }
          ]}
        />
      </Card>

      {/* Table log */}
      <Card className="p-0 overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-xs text-muted text-center py-12">No records found matching filters.</p>
        ) : (
          <Table headers={headers} rows={rows} />
        )}
      </Card>

    </div>
  );
};

export default VisitorHistoryPage;
