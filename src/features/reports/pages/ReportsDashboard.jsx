import React, { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Badge } from '../../../shared/components/Badge';
import { Select } from '../../../shared/components/Select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, Download, TrendingUp, Users, Wrench, ShieldCheck, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export const ReportsDashboard = () => {
  const [reportType, setReportType] = useState('FINANCE');

  // Chart seed states
  const financeData = [
    { month: 'May', collections: 11200, outstanding: 2500 },
    { month: 'Jun', collections: 13500, outstanding: 1800 },
    { month: 'Jul', collections: 12400, outstanding: 3100 },
    { month: 'Aug', collections: 14200, outstanding: 1200 }
  ];

  const complaintsSlaData = [
    { priority: 'Critical', avgHours: 3.5, limit: 4.0 },
    { priority: 'High', avgHours: 18.2, limit: 24.0 },
    { priority: 'Medium', avgHours: 36.0, limit: 48.0 },
    { priority: 'Low', avgHours: 52.0, limit: 72.0 }
  ];

  const handleExport = (format) => {
    toast.success(`Exporting ${reportType} report as ${format.toUpperCase()}...`);
    // Simulate generation delay
    setTimeout(() => {
      toast.success('Download ready!');
    }, 800);
  };

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold font-poppins text-text-primary flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" /> Management Telemetry Reports
          </h1>
          <p className="text-xs text-muted mt-1">Audit SLA compliance ratings, visitor counts, and financial revenue</p>
        </div>
        <div className="flex gap-2 text-xs">
          <Button variant="glass" onClick={() => handleExport('pdf')} className="flex items-center gap-1">
            <Download className="w-3.5 h-3.5" /> PDF
          </Button>
          <Button variant="glass" onClick={() => handleExport('excel')} className="flex items-center gap-1">
            <Download className="w-3.5 h-3.5" /> Excel
          </Button>
          <Button variant="glass" onClick={() => handleExport('csv')} className="flex items-center gap-1">
            <Download className="w-3.5 h-3.5" /> CSV
          </Button>
        </div>
      </div>

      {/* Selector Toggles */}
      <Card className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <Select 
          label="Select Telemetry Category" 
          id="report-cat" 
          value={reportType}
          onChange={e => setReportType(e.target.value)}
          options={[
            { value: 'FINANCE', label: 'Financial Revenue Ledger' },
            { value: 'MAINTENANCE', label: 'Maintenance SLA Compliance' },
            { value: 'SECURITY', label: 'Security & Visitor Traffic' }
          ]}
        />
        <div className="text-[10px] text-muted font-mono leading-relaxed pb-1.5">
          Data compiled: Today {new Date().toLocaleDateString()}
        </div>
      </Card>

      {/* Render selected telemetry graphics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Telemetry Chart Grid */}
        <div className="lg:col-span-2">
          <Card className="p-6 space-y-4">
            <h3 className="text-xs font-bold font-poppins text-text-primary border-b border-border/40 pb-2 flex items-center gap-2">
              {reportType === 'FINANCE' && <TrendingUp className="w-4 h-4 text-success" />}
              {reportType === 'MAINTENANCE' && <Wrench className="w-4 h-4 text-warning" />}
              {reportType === 'SECURITY' && <ShieldCheck className="w-4 h-4 text-accent" />}
              {reportType.replace('_', ' ')} TELEMETRY OVERVIEW
            </h3>

            <div className="h-[280px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reportType === 'FINANCE' ? financeData : complaintsSlaData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2f35" />
                  <XAxis dataKey={reportType === 'FINANCE' ? 'month' : 'priority'} stroke="#8a95a5" fontSize={10} />
                  <YAxis stroke="#8a95a5" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#13181e', border: '1px solid #2a2f35', borderRadius: '12px' }} />
                  {reportType === 'FINANCE' ? (
                    <>
                      <Bar dataKey="collections" fill="#10b981" name="Collections ($)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="outstanding" fill="#ef4444" name="Outstanding ($)" radius={[4, 4, 0, 0]} />
                    </>
                  ) : (
                    <>
                      <Bar dataKey="avgHours" fill="#f59e0b" name="Avg Resolution Time (hrs)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="limit" fill="#3b82f6" name="SLA Limit (hrs)" radius={[4, 4, 0, 0]} />
                    </>
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Insight Card Column */}
        <div>
          <Card className="space-y-4 h-full">
            <h3 className="text-xs font-bold font-poppins text-text-primary border-b border-border/40 pb-2">
              Management Summary insights
            </h3>

            {reportType === 'FINANCE' && (
              <div className="space-y-4 text-xs leading-relaxed text-text-secondary">
                <div className="p-3.5 bg-success/5 border border-success/20 rounded-xl">
                  <p className="font-bold text-success">Revenue collections are healthy</p>
                  <p className="text-[10px] text-muted mt-1">Outstanding bills decreased by 35% following automated payment reminders in August.</p>
                </div>
                <div className="flex justify-between">
                  <span>Total Collected</span>
                  <span className="font-mono font-bold">$14,200</span>
                </div>
                <div className="flex justify-between">
                  <span>Outstanding Penalties</span>
                  <span className="font-mono font-bold text-danger">$1,200</span>
                </div>
              </div>
            )}

            {reportType === 'MAINTENANCE' && (
              <div className="space-y-4 text-xs leading-relaxed text-text-secondary">
                <div className="p-3.5 bg-warning/5 border border-warning/20 rounded-xl">
                  <p className="font-bold text-warning">SLA Compliance is 92%</p>
                  <p className="text-[10px] text-muted mt-1">Critical plumbing issues are resolved in 3.5 hours on average, beating the 4-hour threshold limit.</p>
                </div>
                <div className="flex justify-between">
                  <span>Average Fix Time</span>
                  <span className="font-mono font-bold">18.2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Target SLA Rate</span>
                  <span className="font-mono font-bold text-success">95%</span>
                </div>
              </div>
            )}

            {reportType === 'SECURITY' && (
              <div className="space-y-4 text-xs leading-relaxed text-text-secondary">
                <div className="p-3.5 bg-accent/5 border border-accent/20 rounded-xl">
                  <p className="font-bold text-accent">Visitor counts spiked on weekends</p>
                  <p className="text-[10px] text-muted mt-1">Deliveries represents 68% of total traffic, followed by guest pre-registrations.</p>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Entries</span>
                  <span className="font-mono font-bold">482 visits</span>
                </div>
                <div className="flex justify-between">
                  <span>Unique Couriers</span>
                  <span className="font-mono font-bold text-success">112 entries</span>
                </div>
              </div>
            )}
          </Card>
        </div>

      </div>

    </div>
  );
};

export default ReportsDashboard;
