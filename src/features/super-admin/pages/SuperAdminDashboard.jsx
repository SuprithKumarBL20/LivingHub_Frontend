import React, { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Badge } from '../../../shared/components/Badge';
import { Table } from '../../../shared/components/Table';
import { Switch } from '../../../shared/components/Switch';
import { Settings, ShieldCheck, Activity, KeyRound, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const SuperAdminDashboard = () => {
  // 1. Feature Flags Toggles State
  const [flags, setFlags] = useState({
    aiChatbot: true,
    realtimeAlerts: true,
    marketplaceModule: true,
    smsNotifyChannel: false
  });

  // 2. Communities List State
  const [communities, setCommunities] = useState([
    { id: 'c-1', name: 'LivingHub Elite Heights', units: 480, status: 'Active', plan: 'Enterprise Enterprise' },
    { id: 'c-2', name: 'LivingHub Sun Meadows', units: 120, status: 'Active', plan: 'Pro SaaS Monthly' },
    { id: 'c-3', name: 'LivingHub Royal Manor', units: 250, status: 'Suspended', plan: 'Basic Trial' }
  ]);

  // 3. Microservices Health State
  const [services] = useState([
    { name: 'API Gateway Proxy', status: 'Healthy', latency: '4ms', load: '12%' },
    { name: 'Auth Registry Service', status: 'Healthy', latency: '8ms', load: '18%' },
    { name: 'Finance Invoice Service', status: 'Healthy', latency: '22ms', load: '32%' },
    { name: 'AI OpenAI Dispatcher', status: 'Healthy', latency: '120ms', load: '45%' },
    { name: 'Socket IO Event Server', status: 'Healthy', latency: '1ms', load: '5%' }
  ]);

  const handleToggleCommunity = (id) => {
    setCommunities(communities.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === 'Active' ? 'Suspended' : 'Active';
        toast.success(`Community ${c.name} ${nextStatus.toLowerCase()}`);
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  const handleAddCommunity = () => {
    const created = {
      id: `c-${Date.now()}`,
      name: `LivingHub New Horizon Block ${Math.floor(Math.random() * 9 + 1)}`,
      units: 180,
      status: 'Active',
      plan: 'Basic Trial'
    };
    setCommunities([...communities, created]);
    toast.success('Successfully provisioned new SaaS community instance!');
  };

  const getStatusBadge = (stat) => {
    return <Badge type={stat === 'Active' || stat === 'Healthy' ? 'success' : 'danger'}>{stat}</Badge>;
  };

  const headers = ['Microservice Name', 'Health Status', 'HTTP Latency', 'CPU Load'];
  const rows = services.map(s => [
    <span className="font-bold text-text-primary">{s.name}</span>,
    getStatusBadge(s.status),
    <span className="font-mono text-xs font-bold text-accent">{s.latency}</span>,
    <span className="font-mono text-xs text-muted">{s.load}</span>
  ]);

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold font-poppins text-text-primary flex items-center gap-2">
            <Settings className="w-5 h-5 text-accent" /> Platform Super Administration
          </h1>
          <p className="text-xs text-muted mt-1">Configure feature flags, monitor microservices health, and manage tenant communities</p>
        </div>
        <Button 
          variant="primary" 
          onClick={handleAddCommunity}
          className="flex items-center gap-1.5 text-xs active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Provision Community
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Health check table & Communities list */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Microservices Health Table */}
          <Card className="p-0 overflow-hidden">
            <h3 className="text-xs font-bold font-poppins text-text-primary p-4 border-b border-border/40 flex items-center gap-2">
              <Activity className="w-4 h-4 text-accent animate-pulse" /> Microservices Health Telemetry
            </h3>
            <Table headers={headers} rows={rows} />
          </Card>

          {/* Communities List Grid */}
          <Card className="space-y-4">
            <h3 className="text-xs font-bold font-poppins text-text-primary border-b border-border/40 pb-2">
              Tenant Communities Instances ({communities.length})
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {communities.map(c => (
                <div key={c.id} className="p-4 border border-border/40 rounded-xl bg-primary/20 flex flex-col justify-between h-[150px]">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-text-primary truncate max-w-[150px]">{c.name}</span>
                      {getStatusBadge(c.status)}
                    </div>
                    <p className="text-[10px] text-muted font-mono">{c.plan} &bull; {c.units} Units</p>
                  </div>
                  
                  <div className="flex gap-2 justify-end pt-4 mt-auto">
                    <Button 
                      size="sm" 
                      variant="glass" 
                      onClick={() => handleToggleCommunity(c.id)}
                      className="text-xs px-4 active:scale-95 cursor-pointer"
                    >
                      {c.status === 'Active' ? 'Suspend' : 'Activate'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* Right Side: Feature flags toggles */}
        <div className="space-y-6">
          
          {/* Feature Flags Card */}
          <Card className="space-y-6">
            <h3 className="text-xs font-bold font-poppins text-text-primary border-b border-border/40 pb-2 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-accent" /> Platform Feature Flags
            </h3>
            
            <div className="space-y-4">
              <Switch
                label="AI Chatbot Assistant"
                description="Toggles contextual assistant access on the frontend workspace"
                id="flag-ai"
                checked={flags.aiChatbot}
                onChange={(val) => setFlags({ ...flags, aiChatbot: val })}
              />
              <Switch
                label="Real-time Sockets notifications"
                description="Enables live Toast feeds pushes across client connections"
                id="flag-rt"
                checked={flags.realtimeAlerts}
                onChange={(val) => setFlags({ ...flags, realtimeAlerts: val })}
              />
              <Switch
                label="Marketplace classifieds"
                description="Exposes categorized classifieds listing page tabs"
                id="flag-mkt"
                checked={flags.marketplaceModule}
                onChange={(val) => setFlags({ ...flags, marketplaceModule: val })}
              />
              <Switch
                label="SMS gateway notifications (Disabled)"
                description="Requires active Twilio platform subscription clear"
                id="flag-sms"
                disabled
                checked={flags.smsNotifyChannel}
                onChange={(val) => setFlags({ ...flags, smsNotifyChannel: val })}
              />
            </div>
          </Card>

        </div>

      </div>

    </div>
  );
};

export default SuperAdminDashboard;
