import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../shared/components/Card';

export const QuickActions = ({
  shortcuts = [],
  title = 'Quick Actions Shortcuts',
  className = '',
}) => {
  const navigate = useNavigate();

  return (
    <Card className={`flex flex-col h-[340px] ${className}`}>
      <h3 className="text-sm font-bold font-poppins text-text-primary mb-6 shrink-0">{title}</h3>
      
      <div className="flex-grow grid grid-cols-2 gap-4">
        {shortcuts.map((s, i) => {
          const Icon = s.icon;
          return (
            <button
              key={i}
              onClick={() => navigate(s.path)}
              className="flex flex-col items-center justify-center p-4 bg-primary/45 border border-border/55 rounded-2xl hover:border-accent hover:text-text-primary transition duration-200 cursor-pointer group text-center gap-2 select-none active:scale-95"
            >
              <div className="w-10 h-10 bg-accent/10 border border-accent/20 text-accent group-hover:bg-accent group-hover:text-primary rounded-xl flex items-center justify-center transition">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-poppins font-bold text-text-secondary group-hover:text-text-primary uppercase tracking-wider mt-1">{s.label}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default QuickActions;
