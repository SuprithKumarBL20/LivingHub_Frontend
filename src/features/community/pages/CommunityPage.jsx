import React, { useState, useEffect } from 'react';
import { Users, Megaphone, ShoppingBag, Plus, Tag } from 'lucide-react';
import { Card } from '../../../shared/components/Card';
import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import { communityService } from '../../../services/community';
import toast from 'react-hot-toast';

export const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('notices');
  const [notices, setNotices] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    communityService.getNotices().then(res => setNotices(res.data));
    communityService.getMarketplaceItems().then(res => setItems(res.data));
  }, []);

  return (
    <div className="space-y-8 text-left max-w-5xl mx-auto">
      
      {/* Title Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/80">
        <div>
          <h2 className="text-xl font-bold font-poppins text-text-primary flex items-center gap-2">
            <Users className="w-5 h-5 text-accent animate-pulse" /> Community Board & Feed
          </h2>
          <p className="text-xs text-muted mt-1">Check announcements or view community buy/sell marketplace items</p>
        </div>
      </div>

      {/* Tabs Switcher Navigation */}
      <div className="flex gap-2 border-b border-border pb-px">
        <button
          onClick={() => setActiveTab('notices')}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold font-poppins border-b-2 transition select-none cursor-pointer ${activeTab === 'notices' ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-text-primary'}`}
        >
          <Megaphone className="w-4 h-4" /> Notice Board
        </button>
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold font-poppins border-b-2 transition select-none cursor-pointer ${activeTab === 'marketplace' ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-text-primary'}`}
        >
          <ShoppingBag className="w-4 h-4" /> Resident Marketplace
        </button>
      </div>

      {/* Notices Tab View */}
      {activeTab === 'notices' && (
        <div className="space-y-6">
          {notices.map((n) => (
            <Card key={n.id} className="relative overflow-hidden hover:border-border transition">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-muted font-mono">{n.date}</span>
                  <span className="text-[10px] text-muted font-bold font-poppins">By: {n.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge type={n.importance === 'HIGH' ? 'danger' : 'info'}>{n.importance} Priority</Badge>
                  <Badge type="info">{n.category}</Badge>
                </div>
              </div>
              <h3 className="text-sm font-bold font-poppins text-text-primary mb-2">{n.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{n.content}</p>
            </Card>
          ))}
        </div>
      )}

      {/* Marketplace Tab View */}
      {activeTab === 'marketplace' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="flex flex-col h-full hover:border-border transition overflow-hidden">
              <div className="h-44 w-full rounded-xl overflow-hidden border border-border/80 mb-4 bg-primary/40 relative">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-3 py-1 bg-accent text-primary text-xs font-bold rounded-lg shadow-lg font-mono">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <div className="flex-grow space-y-2">
                <h3 className="text-sm font-bold font-poppins text-text-primary">{item.title}</h3>
                <p className="text-[10px] text-muted">Location: {item.location}</p>
              </div>
              <div className="border-t border-border/40 pt-3 mt-4 flex items-center justify-between text-xs">
                <span className="text-[10px] text-muted font-mono">{item.contact}</span>
                <Button onClick={() => toast.success(`Simulating contacting seller at ${item.contact}`)} size="sm">
                  Contact Seller
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
};

export default CommunityPage;
