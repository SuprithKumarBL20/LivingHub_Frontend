import React, { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { useAuthStore } from '../../../store/authStore';
import { Sparkles, Send, Bot, User, CornerDownRight, History, Settings2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const AIAssistantPage = () => {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hello ${user?.name || 'Resident'}! I am your LivingHub AI Assistant. How can I assist you with your smart community operations today?` }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Role specific suggestions
  const getSuggestions = () => {
    if (user?.role === 'ACCOUNTANT') {
      return [
        'Summarize revenue collected this month',
        'Show outstanding penalty accounts',
        'Analyze collection goal trends'
      ];
    }
    if (user?.role === 'SECURITY') {
      return [
        'Lookup gate pass validation stats',
        'Review guest check-in protocol'
      ];
    }
    if (user?.role === 'MAINTENANCE_STAFF') {
      return [
        'Audit pending work orders',
        'SLA resolution recommendations'
      ];
    }
    return [
      'Explain my current water invoice bill',
      'Check elevator maintenance status',
      'Recommend tennis court booking slots'
    ];
  };

  const handleSend = async (text) => {
    const query = text || input;
    if (!query.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setInput('');
    setLoading(true);

    // Simulate API query to POST /api/v1/ai/chat
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let botReply = `Based on our system records: your request regarding "${query}" has been analyzed. The operations system verifies all safety constraints are satisfied. Let me know if you want me to perform any actions.`;
    
    // Add specific simulated intelligent answers
    if (query.includes('bill') || query.includes('invoice')) {
      botReply = "Your current outstanding bill is $195.50 (consisting of $85.00 maintenance fee and $110.50 water utility fee), due on August 15, 2026. You can clear this via the Finance invoice clearance ledger page.";
    } else if (query.includes('elevator') || query.includes('maintenance')) {
      botReply = "Tower B Elevator maintenance is scheduled for Tuesday, August 4, from 10:00 AM to 02:00 PM. Notice announcements have been dispatched to all affected Tower B residents.";
    }

    setMessages(prev => [...prev, { role: 'assistant', content: botReply }]);
    setLoading(false);
    toast.success('AI Response compiled!');
  };

  return (
    <div className="space-y-8 text-left max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-xl font-bold font-poppins text-text-primary flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" /> AI Assist Central Workspace
        </h1>
        <p className="text-xs text-muted mt-1">Context-aware conversational assistant, FAQ lookups, and navigation automation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Chat History Sidebar */}
        <div className="space-y-4">
          <Card className="p-4 space-y-4">
            <h3 className="text-xs font-bold font-poppins text-text-primary flex items-center gap-1.5 border-b border-border/40 pb-2">
              <History className="w-4 h-4 text-muted" /> Conversation History
            </h3>
            
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-accent/5 rounded-xl border border-accent/20 text-accent font-bold cursor-pointer">
                Current Workspace session
              </div>
              <div className="p-2.5 hover:bg-primary/20 rounded-xl cursor-not-allowed text-muted">
                Billing inquiry (08/02)
              </div>
              <div className="p-2.5 hover:bg-primary/20 rounded-xl cursor-not-allowed text-muted">
                Visitor approval query (07/29)
              </div>
            </div>
          </Card>
        </div>

        {/* Central Chat window */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="flex flex-col justify-between h-[450px] p-6">
            
            {/* Messages Display */}
            <div className="overflow-y-auto space-y-4 pr-2 max-h-[320px]">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex gap-3 text-xs leading-relaxed max-w-[85%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    m.role === 'assistant' ? 'bg-accent/15 text-accent border border-accent/30' : 'bg-primary/30 text-text-secondary border border-border/60'
                  }`}>
                    {m.role === 'assistant' ? <Bot className="w-4.5 h-4.5" /> : <User className="w-4.5 h-4.5" />}
                  </div>
                  
                  <div className={`p-3 rounded-2xl border ${
                    m.role === 'assistant' 
                      ? 'bg-accent/5 border-accent/15 text-text-primary' 
                      : 'bg-primary/20 border-border/45 text-text-secondary'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3 text-xs items-center text-muted animate-pulse">
                  <Bot className="w-5 h-5 animate-spin" /> compiling response...
                </div>
              )}
            </div>

            {/* Input & Suggestions */}
            <div className="space-y-3 border-t border-border/40 pt-4">
              
              {/* Chips suggestions */}
              <div className="flex flex-wrap gap-2">
                {getSuggestions().map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(s)}
                    className="px-3 py-1.5 bg-primary/25 border border-border/50 rounded-full text-[10px] text-text-secondary hover:border-accent hover:text-accent font-semibold transition active:scale-95 cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Text Input Form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input 
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask any community management questions..."
                  className="w-full px-4 py-3 bg-primary/40 border border-border/60 rounded-xl text-xs focus:outline-none focus:border-accent text-text-primary"
                  required
                />
                <Button type="submit" variant="primary" className="p-3 active:scale-95 cursor-pointer">
                  <Send className="w-4.5 h-4.5" />
                </Button>
              </form>
            </div>

          </Card>
        </div>

      </div>

    </div>
  );
};

export default AIAssistantPage;
