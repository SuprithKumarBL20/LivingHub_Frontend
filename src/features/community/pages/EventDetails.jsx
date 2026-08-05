import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Badge } from '../../../shared/components/Badge';
import { Table } from '../../../shared/components/Table';
import { ArrowLeft, Calendar, Users, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

export const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    id: id || 'ev-1',
    title: 'Community Pool Party',
    desc: 'Summer pool party with snacks and music. Residents can bring up to two guests. Please note registry limits and safety guidelines.',
    date: '2026-08-05',
    limit: 50,
    registered: 42,
    registeredList: [
      { id: '1', name: 'Sophia Miller', unit: 'A-402', timestamp: '2026-08-01 10:12' },
      { id: '2', name: 'Gary Vance', unit: 'B-108', timestamp: '2026-08-01 11:30' }
    ],
    waitlist: 0,
    deadline: '2026-08-04'
  });

  const [registered, setRegistered] = useState(false);

  const handleRegister = () => {
    if (registered) {
      setRegistered(false);
      setEvent({
        ...event,
        registered: event.registered - 1,
        registeredList: event.registeredList.filter(u => u.name !== 'David Miller')
      });
      toast.success('Registration cancelled');
    } else {
      setRegistered(true);
      setEvent({
        ...event,
        registered: event.registered + 1,
        registeredList: [
          ...event.registeredList,
          { id: 'usr-402', name: 'David Miller', unit: 'A-402', timestamp: new Date().toLocaleString() }
        ]
      });
      toast.success('You have registered for this event!');
    }
  };

  const headers = ['Attendee Name', 'Unit Allocation', 'Registration Time'];
  const rows = event.registeredList.map(a => [
    <span className="font-bold text-text-primary">{a.name}</span>,
    <span className="font-mono text-xs">{a.unit}</span>,
    a.timestamp
  ]);

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4 flex items-center gap-3">
        <Button 
          variant="glass" 
          size="sm" 
          onClick={() => navigate('/community')}
          className="p-2 cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold font-poppins text-text-primary">Event Registration</h1>
          <p className="text-xs text-muted mt-0.5">{event.title}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Side: Event info */}
        <div className="md:col-span-2 space-y-6">
          <Card className="space-y-4">
            <div className="flex justify-between items-center border-b border-border/40 pb-2">
              <h3 className="text-xs font-bold font-poppins text-text-primary">Event Specifications</h3>
              <Badge type={event.registered >= event.limit ? 'warning' : 'success'}>
                {event.registered >= event.limit ? 'Waitlist' : 'Open'}
              </Badge>
            </div>
            
            <p className="text-xs text-text-secondary leading-relaxed bg-primary/20 border border-border/40 p-4 rounded-xl">
              {event.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-primary/35 border border-border/55 rounded-xl space-y-1">
                <span className="text-[9px] text-muted font-bold uppercase tracking-wider">Scheduled Date</span>
                <p className="font-bold text-text-primary">{event.date}</p>
              </div>
              <div className="p-3 bg-primary/35 border border-border/55 rounded-xl space-y-1">
                <span className="text-[9px] text-muted font-bold uppercase tracking-wider">Registration Deadline</span>
                <p className="font-bold text-text-primary">{event.deadline}</p>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs pt-4 border-t border-border/40">
              <div className="space-y-0.5">
                <p className="font-bold text-text-primary">Attendee capacity: {event.registered}/{event.limit}</p>
                <p className="text-[10px] text-muted">Waitlist: {event.waitlist} residents</p>
              </div>
              <Button 
                variant={registered ? 'glass' : 'primary'} 
                onClick={handleRegister}
                className="text-xs active:scale-95 px-6"
              >
                {registered ? 'Cancel Registration' : 'Register Pass'}
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Side: Roster Table */}
        <div className="space-y-6">
          <Card className="p-0 overflow-hidden">
            <h3 className="text-xs font-bold font-poppins text-text-primary p-4 border-b border-border/40 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-accent" /> Registered Attendees Roster
            </h3>
            <Table headers={headers} rows={rows} />
          </Card>
        </div>

      </div>

    </div>
  );
};

export default EventDetails;
