import React from 'react';
import { Card } from '../shared/components/Card';

export const KpiCard = ({
  title,
  value,
  icon: Icon,
  trendText,
  trendType = 'success', // success (green), warning (yellow), danger (red)
  className = '',
}) => {
  const trendColors = {
    success: 'text-success font-semibold',
    warning: 'text-warning font-semibold',
    danger: 'text-danger font-semibold',
  };

  return (
    <Card className={`hover:border-border transition-colors ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-muted uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold font-mono text-text-primary mt-1">{value}</h3>
        </div>
        {Icon && (
          <div className="w-10 h-10 bg-accent/15 border border-accent/30 rounded-xl flex items-center justify-center text-accent">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      {trendText && (
        <div className="flex items-center gap-1.5 mt-4 text-[10px] text-muted">
          <span className={trendColors[trendType]}>{trendText}</span>
        </div>
      )}
    </Card>
  );
};

export default KpiCard;
