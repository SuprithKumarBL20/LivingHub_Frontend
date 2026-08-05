import React, { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { Table } from '../../../shared/components/Table';
import { Select } from '../../../shared/components/Select';
import { Badge } from '../../../shared/components/Badge';
import { Shield, Eye } from 'lucide-react';

export const AuditLogsPage = () => {
  const [logs] = useState([
    { id: 'aud-1', actor: 'David Miller', role: 'Resident', module: 'Finance', action: 'Invoices check payment settled for INV-8813', status: 'SUCCESS', ip: '192.168.1.42', device: 'Chrome / Windows', time: '2026-08-03 16:10:22' },
    { id: 'aud-2', actor: 'Sophia Miller', role: 'Resident', module: 'Visitors', action: 'Pre-registered guest pass generated for John Doe', status: 'SUCCESS', ip: '192.168.1.45', device: 'Firefox / macOS', time: '2026-08-03 15:02:11' },
    { id: 'aud-3', actor: 'Gary Vance', role: 'Staff Accountant', module: 'Super Admin', action: 'Suspended resident account access validation failure', status: 'FAILURE', ip: '10.0.2.15', device: 'Safari / iOS', time: '2026-08-03 14:15:00' },
    { id: 'aud-4', actor: 'Admin Daemon', role: 'System Cron', module: 'System', action: 'Microservice database backup compile triggers', status: 'SUCCESS', ip: 'Localhost', device: 'Node Server', time: '2026-08-03 04:00:00' }
  ]);

  const [filters, setFilters] = useState({ category: '', status: '' });

  const getStatusBadge = (stat) => {
    return <Badge type={stat === 'SUCCESS' ? 'success' : 'danger'}>{stat}</Badge>;
  };

  const filtered = logs.filter(l => {
    if (filters.category && l.module !== filters.category) return false;
    if (filters.status && l.status !== filters.status) return false;
    return true;
  });

  const headers = ['Timestamp', 'Actor Profile', 'Module Category', 'Action Activity', 'IP / Client Device', 'Status'];
  const rows = filtered.map(l => [
    <span className="font-mono text-[10px] text-muted">{l.time}</span>,
    <div className="flex flex-col">
      <span className="font-bold text-text-primary">{l.actor}</span>
      <span className="text-[9px] text-muted">{l.role}</span>
    </div>,
    <span className="font-semibold text-text-secondary">{l.module}</span>,
    <span className="text-xs text-text-secondary leading-relaxed max-w-sm block">{l.action}</span>,
    <div className="flex flex-col text-[10px] font-mono text-muted">
      <span>{l.ip}</span>
      <span>{l.device}</span>
    </div>,
    getStatusBadge(l.status)
  ]);

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-xl font-bold font-poppins text-text-primary flex items-center gap-2">
          <Shield className="w-5 h-5 text-accent" /> Security Audit Log Ledger
        </h1>
        <p className="text-xs text-muted mt-1">Audit administrative operations, security clearance logs, and system failure exceptions</p>
      </div>

      {/* Filters */}
      <Card className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <Select 
          label="Filter by Category" 
          id="aud-cat" 
          value={filters.category}
          onChange={e => setFilters({ ...filters, category: e.target.value })}
          options={[
            { value: '', label: 'All Modules' },
            { value: 'Authentication', label: 'Authentication' },
            { value: 'Visitors', label: 'Visitor Clearances' },
            { value: 'Finance', label: 'Finance transactions' },
            { value: 'System', label: 'System events' },
            { value: 'Super Admin', label: 'Super Admin actions' }
          ]}
        />
        <Select 
          label="Audit Action Status" 
          id="aud-stat" 
          value={filters.status}
          onChange={e => setFilters({ ...filters, status: e.target.value })}
          options={[
            { value: '', label: 'All Statuses' },
            { value: 'SUCCESS', label: 'Success' },
            { value: 'FAILURE', label: 'Failed Attempts' }
          ]}
        />
      </Card>

      {/* Logs Table */}
      <Card className="p-0 overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-xs text-muted text-center py-12">No audit records found matching filters.</p>
        ) : (
          <Table headers={headers} rows={rows} />
        )}
      </Card>

    </div>
  );
};

export default AuditLogsPage;
