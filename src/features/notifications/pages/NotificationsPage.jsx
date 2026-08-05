import React, { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { Badge } from '../../../shared/components/Badge';
import { useNotificationStore } from '../../../store/notificationStore';
import { Bell, CheckSquare, Trash2, ShieldAlert, Wrench, DollarSign, Calendar, MessageSquare, QrCode, Terminal } from 'lucide-react';
import toast from 'react-hot-toast';

export const NotificationsPage = () => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, clearAll } = useNotificationStore();

  const [activeCategory, setActiveCategory] = useState('');
  const [search, setSearch] = useState('');

  // Icon mapping per category
  const categoryIcons = {
    SECURITY: QrCode,
    MAINTENANCE: Wrench,
    FINANCE: DollarSign,
    COMMUNITY: Calendar,
    VISITOR: QrCode,
    EMERGENCY: ShieldAlert,
    SYSTEM: Terminal,
    INFO: Bell,
  };

  const getCategoryIcon = (type = 'INFO') => {
    const Icon = categoryIcons[type] || Bell;
    const colors = {
      EMERGENCY: 'text-danger bg-danger/10 border border-danger/20',
      SECURITY: 'text-accent bg-accent/10 border border-accent/20',
      MAINTENANCE: 'text-warning bg-warning/10 border border-warning/20',
      FINANCE: 'text-success bg-success/10 border border-success/20',
      INFO: 'text-info bg-info/10 border border-info/20',
    };
    const cls = colors[type] || 'text-info bg-info/10';
    return (
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${cls}`}>
        <Icon className="w-4 h-4" />
      </div>
    );
  };

  const filtered = notifications.filter(n => {
    if (activeCategory && n.type !== activeCategory) return false;
    if (search && !n.title.toLowerCase().includes(search.toLowerCase()) && !n.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold font-poppins text-text-primary flex items-center gap-2">
            <Bell className="w-5 h-5 text-accent" /> Alert Notification Center
          </h1>
          <p className="text-xs text-muted mt-1">Read notice bulletins, visitors entry alerts, and maintenance progress</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="glass" 
            size="sm" 
            onClick={() => {
              markAllAsRead();
              toast.success('All notifications marked as read');
            }}
            className="flex items-center gap-1.5 text-xs active:scale-95"
          >
            <CheckSquare className="w-3.5 h-3.5" /> Mark All Read
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            onClick={() => {
              clearAll();
              toast.success('Notifications inbox cleared');
            }}
            className="flex items-center gap-1.5 text-xs active:scale-95"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Inbox
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <Input 
          label="Search notifications" 
          id="search-notif" 
          placeholder="Search by keywords..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Select 
          label="Filter by Category" 
          id="filter-ncat" 
          value={activeCategory}
          onChange={e => setActiveCategory(e.target.value)}
          options={[
            { value: '', label: 'All Notifications' },
            { value: 'EMERGENCY', label: 'Emergency Alerts' },
            { value: 'SECURITY', label: 'Security' },
            { value: 'MAINTENANCE', label: 'Maintenance' },
            { value: 'FINANCE', label: 'Finance' },
            { value: 'COMMUNITY', label: 'Community Feed' },
            { value: 'SYSTEM', label: 'System notices' }
          ]}
        />
      </Card>

      {/* List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <Card className="text-center py-16 text-muted text-xs">
            No notification feeds found matching current search filters.
          </Card>
        ) : (
          filtered.map(n => (
            <div 
              key={n.id} 
              className={`p-4 rounded-2xl border transition duration-150 flex items-start justify-between gap-4 ${
                n.read 
                  ? 'bg-primary/20 border-border/40 hover:bg-primary/30' 
                  : 'bg-accent/5 border-accent/25 hover:bg-accent/10 shadow-lg shadow-accent/5'
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                {getCategoryIcon(n.type)}
                <div className="space-y-1 text-xs text-left min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className={`font-bold ${n.read ? 'text-text-primary' : 'text-accent'}`}>{n.title}</span>
                    {!n.read && <Badge type="accent">NEW</Badge>}
                    <span className="text-[10px] text-muted font-mono">{new Date(n.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-text-secondary leading-relaxed">{n.description}</p>
                </div>
              </div>

              <div className="flex gap-1 shrink-0">
                {!n.read && (
                  <Button 
                    variant="glass" 
                    size="sm" 
                    onClick={() => markAsRead(n.id)}
                    className="p-2 cursor-pointer"
                    title="Mark as read"
                  >
                    <CheckSquare className="w-3.5 h-3.5" />
                  </Button>
                )}
                <Button 
                  variant="glass" 
                  size="sm" 
                  onClick={() => deleteNotification(n.id)}
                  className="p-2 cursor-pointer text-danger hover:bg-danger/10"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default NotificationsPage;
