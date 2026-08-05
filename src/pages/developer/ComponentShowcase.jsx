import React, { useState } from 'react';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Select } from '../../shared/components/Select';
import { Switch } from '../../shared/components/Switch';
import { Badge } from '../../shared/components/Badge';
import { Avatar } from '../../shared/components/Avatar';
import { Card } from '../../shared/components/Card';
import { Table } from '../../shared/components/Table';
import { Timeline } from '../../shared/components/Timeline';

export const ComponentShowcase = () => {
  const [switchVal, setSwitchVal] = useState(true);
  const [inputVal, setInputVal] = useState('');

  // Sample timeline events
  const timelineEvents = [
    { id: '1', status: 'PENDING', description: 'Complaint filed by resident.', timestamp: new Date(Date.now() - 3600000).toISOString(), actor: 'David Miller' },
    { id: '2', status: 'ASSIGNED', description: 'Assigned to plumber Gary Vance.', timestamp: new Date().toISOString(), actor: 'Evelyn Carter (Admin)' }
  ];

  // Sample Table parameters
  const headers = ['Component Name', 'Variant Description', 'Status badge'];
  const rows = [
    ['Button', 'Primary brand color accent', <Badge type="success">Active</Badge>],
    ['Input', 'Text entry with Zod error support', <Badge type="success">Active</Badge>],
    ['Timeline', 'Vertical auditing connectors log', <Badge type="info">Review</Badge>],
    ['Avatar', 'Initials character mappings fallback', <Badge type="success">Active</Badge>]
  ];

  return (
    <div className="space-y-10 text-left max-w-5xl mx-auto pb-20">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold font-poppins text-text-primary">Shared UI Component Showcase</h1>
        <p className="text-xs text-muted mt-1">Onboarding guide and preview dashboard of all atomic styling primitives</p>
      </div>

      {/* 1. Buttons */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold font-poppins text-text-primary uppercase tracking-wide">Buttons</h2>
        <Card className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Primary Accent</Button>
          <Button variant="secondary">Secondary Card</Button>
          <Button variant="glass">Glass Surface</Button>
          <Button variant="danger">Danger Red</Button>
          <Button variant="primary" isLoading={true}>Processing</Button>
          <Button variant="primary" disabled={true}>Disabled</Button>
        </Card>
      </section>

      {/* 2. Inputs & Selects */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold font-poppins text-text-primary uppercase tracking-wide">Form Elements</h2>
        <Card className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input 
              label="Standard Text Input" 
              id="standard-in" 
              placeholder="Enter name..." 
              value={inputVal} 
              onChange={(e) => setInputVal(e.target.value)} 
            />
            <Input 
              label="Text Input with Error State" 
              id="error-in" 
              placeholder="Invalid entry..." 
              error="This field is required by validation schema rules" 
            />
          </div>
          
          <div className="space-y-4">
            <Select 
              label="Dropdown Selector" 
              id="select-in" 
              options={[
                { value: '1', label: 'Option A' },
                { value: '2', label: 'Option B' }
              ]} 
            />
            <div className="pt-2">
              <Switch 
                label="Toggle Switch Slider" 
                id="switch-in" 
                checked={switchVal} 
                onChange={setSwitchVal} 
              />
            </div>
          </div>
        </Card>
      </section>

      {/* 3. Badges & Avatars */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold font-poppins text-text-primary uppercase tracking-wide">Badges & Profiles</h2>
        <Card className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-wrap gap-3 items-center">
            <Badge type="success">Success / Paid</Badge>
            <Badge type="warning">Warning / Expected</Badge>
            <Badge type="danger">Danger / Overdue</Badge>
            <Badge type="info">Info / General</Badge>
          </div>
          
          <div className="flex gap-4 items-center">
            <Avatar name="David Miller" size="sm" status="online" />
            <Avatar name="Evelyn Carter" size="md" status="offline" />
            <Avatar name="Alex Sterling" size="lg" status="online" />
            <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" name="Alexander" size="md" />
          </div>
        </Card>
      </section>

      {/* 4. Tables & Timelines */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-sm font-bold font-poppins text-text-primary uppercase tracking-wide">Data Grids Table</h2>
          <Card className="p-0 overflow-hidden">
            <Table headers={headers} rows={rows} />
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-bold font-poppins text-text-primary uppercase tracking-wide">Audits Timeline</h2>
          <Card>
            <Timeline events={timelineEvents} />
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ComponentShowcase;
