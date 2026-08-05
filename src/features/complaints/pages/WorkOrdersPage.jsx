import React, { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Badge } from '../../../shared/components/Badge';
import { Table } from '../../../shared/components/Table';
import { KpiCard } from '../../../widgets/KpiCard';
import { Wrench, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export const WorkOrdersPage = () => {
  const [orders, setOrders] = useState([
    { id: 'comp-101', title: 'Water leakage in bathroom ceiling', unit: 'Unit A-402', priority: 'HIGH', status: 'IN_PROGRESS', due: 'Today' },
    { id: 'comp-102', title: 'Main door lock jammed', unit: 'Unit A-402', priority: 'MEDIUM', status: 'ASSIGNED', due: 'Tomorrow' },
    { id: 'comp-105', title: 'Kitchen sink pipe blockage', unit: 'Unit C-108', priority: 'CRITICAL', status: 'ACCEPTED', due: 'Overdue' }
  ]);

  const [activeFilter, setActiveFilter] = useState('ALL');

  const getPriorityBadge = (prio) => {
    const maps = { LOW: 'info', MEDIUM: 'warning', HIGH: 'danger', CRITICAL: 'danger' };
    return <Badge type={maps[prio] || 'info'}>{prio}</Badge>;
  };

  const getStatusBadge = (status) => {
    const maps = {
      ASSIGNED: 'info',
      ACCEPTED: 'warning',
      IN_PROGRESS: 'warning',
      RESOLVED: 'success'
    };
    return <Badge type={maps[status] || 'info'}>{status}</Badge>;
  };

  const handleUpdateStatus = (id, nextStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: nextStatus } : o));
    toast.success(`Ticket ${id} status updated to ${nextStatus}`);
  };

  // Filter conditions
  const filtered = orders.filter(o => {
    if (activeFilter === 'HIGH') return o.priority === 'HIGH' || o.priority === 'CRITICAL';
    if (activeFilter === 'DUE_TODAY') return o.due === 'Today';
    if (activeFilter === 'OVERDUE') return o.due === 'Overdue';
    return true;
  });

  const headers = ['Order ID', 'Unit', 'Subject', 'Priority', 'Status', 'Timeline Target', 'Actions'];
  const rows = filtered.map(o => [
    <span className="font-mono text-xs">{o.id}</span>,
    <span className="font-bold text-text-primary">{o.unit}</span>,
    o.title,
    getPriorityBadge(o.priority),
    getStatusBadge(o.status),
    <span className={`font-mono text-xs font-semibold ${o.due === 'Overdue' ? 'text-danger' : 'text-text-secondary'}`}>{o.due}</span>,
    <div className="flex gap-2">
      {o.status === 'ASSIGNED' && (
        <Button size="sm" variant="glass" onClick={() => handleUpdateStatus(o.id, 'ACCEPTED')}>
          Accept
        </Button>
      )}
      {o.status === 'ACCEPTED' && (
        <Button size="sm" variant="glass" onClick={() => handleUpdateStatus(o.id, 'IN_PROGRESS')}>
          Start
        </Button>
      )}
      {o.status === 'IN_PROGRESS' && (
        <Button size="sm" variant="primary" onClick={() => handleUpdateStatus(o.id, 'RESOLVED')}>
          Resolve
        </Button>
      )}
      {o.status === 'RESOLVED' && (
        <Badge type="success">Awaiting Rating</Badge>
      )}
    </div>
  ]);

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-xl font-bold font-poppins text-text-primary flex items-center gap-2">
          <Wrench className="w-5 h-5 text-accent" /> Staff Work Orders Console
        </h1>
        <p className="text-xs text-muted mt-1">Manage assigned maintenance tasks, check repair priority levels, and post updates</p>
      </div>

      {/* Maintenance KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <KpiCard title="Assigned Today" value={orders.filter(o => o.status === 'ASSIGNED').length} icon={Calendar} />
        <KpiCard title="Pending Review" value={orders.filter(o => o.status === 'ACCEPTED').length} icon={Clock} />
        <KpiCard title="Overdue Work" value={orders.filter(o => o.due === 'Overdue').length} icon={AlertTriangle} trendType="danger" />
        <KpiCard title="Jobs Completed" value={14} icon={CheckCircle} trendType="success" />
        <KpiCard title="Avg SLA Fix Time" value="1.8 hrs" icon={Clock} />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        {['ALL', 'HIGH', 'DUE_TODAY', 'OVERDUE'].map(filter => (
          <Button
            key={filter}
            size="sm"
            variant={activeFilter === filter ? 'primary' : 'glass'}
            onClick={() => setActiveFilter(filter)}
            className="text-xs active:scale-95 px-4"
          >
            {filter === 'ALL' ? 'My Work Orders' : filter.replace('_', ' ')}
          </Button>
        ))}
      </div>

      {/* Table grid */}
      <Card className="p-0 overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-xs text-muted text-center py-12">No work orders match the filter selected.</p>
        ) : (
          <Table headers={headers} rows={rows} />
        )}
      </Card>

    </div>
  );
};

export default WorkOrdersPage;
