import React, { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Badge } from '../../../shared/components/Badge';
import { Send, User } from 'lucide-react';
import toast from 'react-hot-toast';

export const CommentSection = ({ comments = [], onAddComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddComment(text);
    setText('');
    toast.success('Comment posted successfully');
  };

  return (
    <Card className="space-y-4">
      <h3 className="text-xs font-bold font-poppins text-text-primary border-b border-border/40 pb-2">
        Conversation Log
      </h3>
      
      {/* Comments List */}
      <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1 text-xs">
        {comments.length === 0 ? (
          <p className="text-center text-muted py-6">No comments posted yet.</p>
        ) : (
          comments.map(c => (
            <div key={c.id} className="p-3 bg-primary/45 border border-border/50 rounded-xl space-y-1 text-left">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 font-bold text-text-primary">
                  <User className="w-3 h-3 text-accent" /> {c.author}
                  <span className="text-[9px] text-muted">({c.role})</span>
                </div>
                <span className="text-[9px] text-muted font-mono">{c.timestamp}</span>
              </div>
              <p className="text-text-secondary leading-relaxed mt-1">{c.content}</p>
            </div>
          ))
        )}
      </div>

      {/* Entry Field */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-grow">
          <Input 
            id="new-comment" 
            placeholder="Type your message here..." 
            value={text} 
            onChange={e => setText(e.target.value)} 
            required 
          />
        </div>
        <div className="self-end pb-[2px]">
          <Button type="submit" variant="primary" className="p-3 cursor-pointer active:scale-95">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CommentSection;
