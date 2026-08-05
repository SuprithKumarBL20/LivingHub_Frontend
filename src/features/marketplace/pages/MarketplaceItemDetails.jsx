import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Badge } from '../../../shared/components/Badge';
import { ArrowLeft, Send, Tag, PhoneCall } from 'lucide-react';
import toast from 'react-hot-toast';

export const MarketplaceItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    id: id || '1',
    title: 'Ergonomic Office Chair',
    price: 85,
    category: 'Furniture',
    status: 'Available',
    date: '2026-08-01',
    description: 'Gently used home office mesh chair. Fully adjustable armrests, pneumatic cylinder heights controls, and tilt locks. In excellent condition, no tears or blemishes on the mesh.',
    owner: 'Sophia Miller',
    phone: '+1 (555) 019-8812'
  });

  const [revealContact, setRevealContact] = useState(false);
  const [interestSent, setInterestSent] = useState(false);

  const handleInterest = () => {
    setInterestSent(true);
    toast.success('Interest notification sent to seller Sophia Miller!');
  };

  return (
    <div className="space-y-8 text-left max-w-xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4 flex items-center gap-3">
        <Button 
          variant="glass" 
          size="sm" 
          onClick={() => navigate('/marketplace')}
          className="p-2 cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold font-poppins text-text-primary">Inspect Marketplace Item</h1>
          <p className="text-xs text-muted mt-0.5">Details and seller communications</p>
        </div>
      </div>

      <Card className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Badge type={item.status === 'Available' ? 'success' : 'warning'}>{item.status}</Badge>
            <span className="font-mono text-xl font-bold text-accent">${item.price}</span>
          </div>
          <h2 className="text-lg font-bold font-poppins text-text-primary mt-2">{item.title}</h2>
          <p className="text-[10px] text-muted">{item.category} &bull; Posted {item.date}</p>
        </div>

        <div className="space-y-4 border-t border-b border-border/40 py-4 text-xs leading-relaxed text-text-secondary">
          <div>
            <p className="font-bold text-muted uppercase text-[9px] tracking-wider mb-1">Owner Description</p>
            <p className="bg-primary/25 border border-border/40 rounded-xl p-3.5 leading-relaxed text-text-secondary">
              {item.description}
            </p>
          </div>
          
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted">Seller Profile</span>
            <span className="font-bold text-text-primary">{item.owner}</span>
          </div>
        </div>

        {/* Contact panel */}
        {revealContact ? (
          <div className="p-4 bg-accent/5 border border-accent/25 rounded-2xl flex flex-col items-center gap-3 text-xs text-center">
            <PhoneCall className="w-5 h-5 text-accent animate-pulse" />
            <div>
              <p className="font-bold text-text-primary">Direct Contact Number</p>
              <p className="font-mono text-sm font-bold text-accent mt-0.5 select-all">{item.phone}</p>
            </div>
            <p className="text-[9px] text-muted">Mention you saw their listing on LivingHub Marketplace.</p>
          </div>
        ) : (
          <div className="flex gap-4">
            <Button 
              variant="glass" 
              className="w-1/2 flex items-center justify-center gap-1 text-xs" 
              onClick={() => setRevealContact(true)}
            >
              <PhoneCall className="w-4 h-4" /> Reveal Phone Number
            </Button>
            <Button 
              variant="primary" 
              className="w-1/2 flex items-center justify-center gap-1 text-xs" 
              disabled={interestSent}
              onClick={handleInterest}
            >
              <Send className="w-4 h-4" /> {interestSent ? 'Interest Sent' : 'Message Seller'}
            </Button>
          </div>
        )}

        {/* Developer simulation controls */}
        <div className="border-t border-border/40 pt-4 mt-2 flex gap-2">
          {item.status === 'Available' && (
            <Button 
              size="sm" 
              variant="glass" 
              onClick={() => {
                setItem({ ...item, status: 'Sold' });
                toast.success('Simulation: Listing marked as SOLD');
              }}
              className="text-xs w-full text-muted hover:text-text-primary"
            >
              Simulate: Mark as Sold
            </Button>
          )}
        </div>
      </Card>

    </div>
  );
};

export default MarketplaceItemDetails;
