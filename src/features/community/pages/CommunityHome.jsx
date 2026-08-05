import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { Badge } from '../../../shared/components/Badge';
import { Table } from '../../../shared/components/Table';
import { Megaphone, Calendar, BarChart2, SearchCode, Plus, CheckCircle, Vote, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export const CommunityHome = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('NOTICES');

  // 1. Notices Seed State
  const [notices] = useState([
    { id: '1', title: 'Tower Elevator Maintenance', content: 'Elevator B will be out of service on Wednesday from 10:00 AM to 02:00 PM for standard safety certification checkouts.', date: '2026-08-02', importance: 'HIGH', category: 'Maintenance' },
    { id: '2', title: 'Community Pool Chemistry Check', content: 'The pool will undergo annual water chemistry balancing. Please avoid entry during the balancing hours.', date: '2026-08-01', importance: 'MEDIUM', category: 'Operations' }
  ]);

  // 2. Events Seed State
  const [events, setEvents] = useState([
    { id: 'ev-1', title: 'Community Pool Party', desc: 'Summer pool party with snacks and music.', date: '2026-08-05', limit: 50, registered: 42, registeredList: [], waitlist: 0, deadline: '2026-08-04' },
    { id: 'ev-2', title: 'Roof Gardening Session', desc: 'Sow new seeds in Block C roof container gardens.', date: '2026-08-08', limit: 15, registered: 15, registeredList: [], waitlist: 2, deadline: '2026-08-07' }
  ]);

  // 3. Polls Seed State
  const [polls, setPolls] = useState([
    { id: 'p-1', question: 'Should we replace tennis court turf with synthetic grass?', options: [
      { label: 'Yes, replacement turf is overdue', votes: 14 },
      { label: 'No, clay court style is preferred', votes: 9 }
    ], voted: false, totalVotes: 23, anonymous: true, expiration: '2026-08-10' }
  ]);

  // 4. Lost & Found Seed State
  const [lostFound, setLostFound] = useState([
    { id: 'lf-1', name: 'Car keys (Toyota logo)', type: 'FOUND', description: 'Found in Lobby C table. Keys are on a leather keychain.', location: 'Block C Lobby', date: '2026-08-02', status: 'REPORTED', contact: 'Guard Desk' }
  ]);

  const [showLfForm, setShowLfForm] = useState(false);
  const [newLf, setNewLf] = useState({ name: '', type: 'LOST', description: '', location: '' });

  // Event handlers
  const handleRegisterEvent = (id) => {
    setEvents(events.map(ev => {
      if (ev.id === id) {
        if (ev.registered >= ev.limit) {
          toast.success('Event limit reached! Added to waitlist.');
          return { ...ev, waitlist: ev.waitlist + 1 };
        }
        toast.success(`Registered for ${ev.title}!`);
        return { ...ev, registered: ev.registered + 1 };
      }
      return ev;
    }));
  };

  const handleVote = (pollId, optionIndex) => {
    setPolls(polls.map(p => {
      if (p.id === pollId) {
        if (p.voted) {
          toast.error('You already voted in this poll!');
          return p;
        }
        const updatedOptions = p.options.map((opt, idx) => 
          idx === optionIndex ? { ...opt, votes: opt.votes + 1 } : opt
        );
        toast.success('Vote submitted anonymously!');
        return {
          ...p,
          options: updatedOptions,
          voted: true,
          totalVotes: p.totalVotes + 1
        };
      }
      return p;
    }));
  };

  const handleCreateLf = (e) => {
    e.preventDefault();
    if (!newLf.name || !newLf.location) return;
    const created = {
      id: Date.now().toString(),
      name: newLf.name,
      type: newLf.type,
      description: newLf.description,
      location: newLf.location,
      date: new Date().toISOString().split('T')[0],
      status: 'REPORTED',
      contact: 'David Miller (A-402)'
    };
    setLostFound([created, ...lostFound]);
    setNewLf({ name: '', type: 'LOST', description: '', location: '' });
    setShowLfForm(false);
    toast.success('Lost & Found item filed!');
  };

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-xl font-bold font-poppins text-text-primary flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-accent" /> Community Engagement Hub
        </h1>
        <p className="text-xs text-muted mt-1">Participate in community forums, events registers, anonymous polls, and classified listings</p>
      </div>

      {/* Tabs Row */}
      <div className="flex gap-2 border-b border-border/40 pb-2">
        {[
          { id: 'NOTICES', label: 'Bulletins Board', icon: Megaphone },
          { id: 'EVENTS', label: 'Upcoming Events', icon: Calendar },
          { id: 'POLLS', label: 'Anonymous Polls', icon: BarChart2 },
          { id: 'LOST_FOUND', label: 'Lost & Found logs', icon: SearchCode }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 font-poppins text-xs font-bold transition cursor-pointer ${
                activeTab === tab.id 
                  ? 'border-accent text-text-primary' 
                  : 'border-transparent text-muted hover:text-text-secondary'
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="space-y-6 animate-fade-in">
        
        {/* 1. Notices Board Tab */}
        {activeTab === 'NOTICES' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {notices.map(n => (
              <Card key={n.id} className="space-y-4">
                <div className="flex justify-between items-center">
                  <Badge type={n.importance === 'HIGH' ? 'danger' : 'info'}>{n.importance}</Badge>
                  <span className="text-[10px] text-muted font-mono">{n.category} &bull; {n.date}</span>
                </div>
                <h3 className="text-sm font-bold font-poppins text-text-primary">{n.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{n.content}</p>
              </Card>
            ))}
          </div>
        )}

        {/* 2. Events Tab */}
        {activeTab === 'EVENTS' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {events.map(ev => (
              <Card key={ev.id} className="flex flex-col justify-between h-[260px]">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Badge type={ev.registered >= ev.limit ? 'warning' : 'success'}>
                      {ev.registered >= ev.limit ? 'WAITLISTED' : 'REGISTRATION ACTIVE'}
                    </Badge>
                    <span className="text-[10px] text-muted font-mono">Date: {ev.date}</span>
                  </div>
                  <h3 className="text-sm font-bold font-poppins text-text-primary">{ev.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 mt-2">{ev.desc}</p>
                  
                  {/* Registry Capacity Bar */}
                  <div className="pt-2 text-[10px] text-muted space-y-1">
                    <div className="flex justify-between font-mono font-bold">
                      <span>Registered Attendees: {ev.registered}/{ev.limit}</span>
                      {ev.waitlist > 0 && <span className="text-warning">Waitlist: {ev.waitlist}</span>}
                    </div>
                    <div className="w-full h-1.5 bg-primary/60 rounded-full overflow-hidden">
                      <div 
                        className="bg-accent h-full transition-all" 
                        style={{ width: `${Math.min(100, (ev.registered / ev.limit) * 100)}%` }} 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-border/40 pt-4 mt-4 text-xs">
                  <span className="text-[10px] text-muted">Deadline: {ev.deadline}</span>
                  <Button 
                    variant="glass" 
                    size="sm" 
                    onClick={() => handleRegisterEvent(ev.id)}
                    className="text-xs active:scale-95 px-4"
                  >
                    Register Pass
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* 3. Polls Tab */}
        {activeTab === 'POLLS' && (
          <div className="max-w-xl mx-auto space-y-6">
            {polls.map(p => (
              <Card key={p.id} className="space-y-6">
                <div className="flex justify-between items-center">
                  <Badge type="info">{p.anonymous ? 'Anonymous Poll' : 'General Vote'}</Badge>
                  <span className="text-[10px] text-muted font-mono">Closing Date: {p.expiration}</span>
                </div>
                
                <h3 className="text-sm font-bold font-poppins text-text-primary leading-relaxed">{p.question}</h3>
                
                <div className="space-y-4">
                  {p.options.map((opt, idx) => {
                    const percent = p.totalVotes > 0 ? Math.round((opt.votes / p.totalVotes) * 100) : 0;
                    return (
                      <div key={idx} className="space-y-1 text-xs">
                        <div className="flex justify-between items-center font-poppins">
                          <button
                            type="button"
                            onClick={() => handleVote(p.id, idx)}
                            disabled={p.voted}
                            className={`text-left font-bold hover:text-accent transition flex items-center gap-2 ${
                              p.voted ? 'cursor-default text-text-secondary' : 'cursor-pointer text-text-primary'
                            }`}
                          >
                            {!p.voted && <Vote className="w-4 h-4 text-muted shrink-0" />} {opt.label}
                          </button>
                          <span className="font-mono text-muted">{opt.votes} votes ({percent}%)</span>
                        </div>
                        <div className="w-full h-2.5 bg-primary/60 rounded-full overflow-hidden relative">
                          <div 
                            className="bg-accent h-full transition-all" 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                {p.voted && (
                  <p className="text-[10px] text-accent font-mono text-center animate-pulse">
                    Thank you, your vote has been compiled.
                  </p>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* 4. Lost & Found Tab */}
        {activeTab === 'LOST_FOUND' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button 
                variant="glass" 
                size="sm" 
                onClick={() => setShowLfForm(!showLfForm)} 
                className="flex items-center gap-1 text-xs"
              >
                <Plus className="w-3.5 h-3.5" /> File Incident Report
              </Button>
            </div>

            {showLfForm && (
              <form onSubmit={handleCreateLf}>
                <Card className="space-y-4 p-6 border border-accent/20 bg-accent/5 max-w-2xl mx-auto">
                  <h3 className="text-xs font-bold font-poppins text-text-primary">File Lost & Found Report</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input 
                      label="Item Name" 
                      id="lf-iname" 
                      value={newLf.name} 
                      onChange={e => setNewLf({ ...newLf, name: e.target.value })} 
                      required 
                    />
                    <Select 
                      label="Report Type" 
                      id="lf-itype" 
                      value={newLf.type}
                      onChange={e => setNewLf({ ...newLf, type: e.target.value })}
                      options={[
                        { value: 'LOST', label: 'Lost Item' },
                        { value: 'FOUND', label: 'Found Item' }
                      ]}
                    />
                    <Input 
                      label="Incident Location" 
                      id="lf-iloc" 
                      placeholder="e.g. Elevators Tower B"
                      value={newLf.location} 
                      onChange={e => setNewLf({ ...newLf, location: e.target.value })} 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Description</label>
                    <textarea 
                      rows={2}
                      value={newLf.description}
                      onChange={e => setNewLf({ ...newLf, description: e.target.value })}
                      className="w-full p-2.5 bg-primary/40 border border-border/60 rounded-xl text-xs text-text-primary focus:outline-none focus:border-accent"
                      placeholder="Add details such as colors, marks, key chains..."
                    />
                  </div>
                  <div className="flex justify-end gap-2 text-xs">
                    <Button variant="glass" size="sm" onClick={() => setShowLfForm(false)}>Cancel</Button>
                    <Button type="submit" variant="primary" size="sm">File Incident</Button>
                  </div>
                </Card>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {lostFound.map(lf => (
                <Card key={lf.id} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Badge type={lf.type === 'LOST' ? 'danger' : 'success'}>{lf.type}</Badge>
                    <Badge type="info">{lf.status}</Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold font-poppins text-text-primary">{lf.name}</h3>
                    <p className="text-[10px] text-muted">Incident Location: {lf.location} &bull; Filed {lf.date}</p>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed bg-primary/20 border border-border/40 p-3 rounded-xl">
                    {lf.description}
                  </p>

                  <div className="border-t border-border/40 pt-4 flex justify-between items-center text-xs">
                    <span className="text-[10px] text-muted">Claim Contact: {lf.contact}</span>
                    {lf.status === 'REPORTED' && (
                      <Button 
                        size="sm" 
                        variant="glass" 
                        onClick={() => {
                          setLostFound(lostFound.map(item => item.id === lf.id ? { ...item, status: 'CLAIMED' } : item));
                          toast.success('Simulation: Status updated to CLAIMED');
                        }}
                        className="text-xs active:scale-95"
                      >
                        Claim Item
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default CommunityHome;
