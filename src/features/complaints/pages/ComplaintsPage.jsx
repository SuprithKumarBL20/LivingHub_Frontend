import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { Badge } from '../../../shared/components/Badge';
import { Table } from '../../../shared/components/Table';
import { Wrench, Plus, Search, Eye } from 'lucide-react';

export const ComplaintsPage = () => {
  const navigate = useNavigate();

  // Seed state variables
  const [complaints] = useState([
    { id: 'comp-101', title: 'Water leakage in bathroom ceiling', category: 'Plumbing', priority: 'HIGH', status: 'IN_PROGRESS', date: '2026-08-02', unit: 'A-402' },
    { id: 'comp-102', title: 'Main door lock jammed', category: 'Carpentry', priority: 'MEDIUM', status: 'ASSIGNED', date: '2026-08-03', unit: 'A-402' },
    { id: 'comp-103', title: 'Air conditioner compressor sound', category: 'Electrical', priority: 'CRITICAL', status: 'RESOLVED', date: '2026-07-29', unit: 'A-402' },
    { id: 'comp-104', title: 'Broken corridor lights', category: 'Electrical', priority: 'LOW', status: 'CLOSED', date: '2026-07-25', unit: 'B-102' }
  ]);

  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: '',
    search: '',
  });

  const getPriorityBadge = (prio) => {
    const maps = {
      LOW: 'info',
      MEDIUM: 'warning',
      HIGH: 'danger',
      CRITICAL: 'danger'
    };
    return <Badge type={maps[prio] || 'info'}>{prio}</Badge>;
  };

  const getStatusBadge = (status) => {
    const maps = {
      OPEN: 'info',
      ASSIGNED: 'info',
      ACCEPTED: 'warning',
      IN_PROGRESS: 'warning',
      RESOLVED: 'success',
      CLOSED: 'success',
      RATED: 'success'
    };
    return <Badge type={maps[status] || 'info'}>{status.replace('_', ' ')}</Badge>;
  };

  const filtered = complaints.filter(c => {
    if (filters.status && c.status !== filters.status) return false;
    if (filters.priority && c.priority !== filters.priority) return false;
    if (filters.category && c.category !== filters.category) return false;
    if (filters.search && !c.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const headers = ['ID', 'Title', 'Category', 'Priority', 'Status', 'Date filed', 'Actions'];
  const rows = filtered.map(c => [
    <span className="font-mono text-xs">{c.id}</span>,
    <span className="font-bold text-text-primary">{c.title}</span>,
    c.category,
    getPriorityBadge(c.priority),
    getStatusBadge(c.status),
    c.date,
    <Button 
      variant="glass" 
      size="sm" 
      onClick={() => navigate(`/complaints/${c.id}`)}
      className="flex items-center gap-1.5 text-xs cursor-pointer active:scale-95"
    >
      <Eye className="w-3.5 h-3.5" /> Open
    </Button>
  ]);

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold font-poppins text-text-primary flex items-center gap-2">
            <Wrench className="w-5 h-5 text-accent" /> Maintenance Complaints logs
          </h1>
          <p className="text-xs text-muted mt-1">Audit status, file attachments, and submit rating reports</p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => navigate('/complaints/new')} 
          className="flex items-center gap-1.5 text-xs active:scale-95"
        >
          <Plus className="w-4 h-4" /> File New Ticket
        </Button>
      </div>

      {/* Filters Row */}
      <Card className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
        <div>
          <Input 
            label="Search keyword" 
            id="search-kw" 
            placeholder="e.g. Water..."
            value={filters.search}
            onChange={e => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <div>
          <Select 
            label="Filter Category" 
            id="filter-cat" 
            value={filters.category}
            onChange={e => setFilters({ ...filters, category: e.target.value })}
            options={[
              { value: '', label: 'All Categories' },
              { value: 'Plumbing', label: 'Plumbing' },
              { value: 'Electrical', label: 'Electrical' },
              { value: 'Carpentry', label: 'Carpentry' },
              { value: 'Appliances', label: 'Appliances' }
            ]}
          />
        </div>
        <div>
          <Select 
            label="Filter Priority" 
            id="filter-prio" 
            value={filters.priority}
            onChange={e => setFilters({ ...filters, priority: e.target.value })}
            options={[
              { value: '', label: 'All Priorities' },
              { value: 'LOW', label: 'Low' },
              { value: 'MEDIUM', label: 'Medium' },
              { value: 'HIGH', label: 'High' },
              { value: 'CRITICAL', label: 'Critical' }
            ]}
          />
        </div>
        <div>
          <Select 
            label="Filter Status" 
            id="filter-stat" 
            value={filters.status}
            onChange={e => setFilters({ ...filters, status: e.target.value })}
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'OPEN', label: 'Open' },
              { value: 'ASSIGNED', label: 'Assigned' },
              { value: 'ACCEPTED', label: 'Accepted' },
              { value: 'IN_PROGRESS', label: 'In Progress' },
              { value: 'RESOLVED', label: 'Resolved' },
              { value: 'CLOSED', label: 'Closed' }
            ]}
          />
        </div>
      </Card>

      {/* Results grid */}
      <Card className="p-0 overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-xs text-muted text-center py-12">No complaints matching the filter criteria found.</p>
        ) : (
          <Table headers={headers} rows={rows} />
        )}
      </Card>

    </div>
  );
};

export default ComplaintsPage;
