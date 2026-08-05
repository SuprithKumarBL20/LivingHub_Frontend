import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../shared/components/Card';
import { Badge } from '../shared/components/Badge';

export const RevenueChart = ({
  title = 'Collections History',
  subtitle = 'Revenue collection metrics',
  data = [],
  className = '',
}) => {
  return (
    <Card className={`flex flex-col h-[340px] ${className}`}>
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h3 className="text-sm font-bold font-poppins text-text-primary">{title}</h3>
          <p className="text-[10px] text-muted">{subtitle}</p>
        </div>
        <Badge type="success">Financials</Badge>
      </div>
      
      <div className="flex-grow w-full h-[240px] text-[10px]">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted">No charting data resolved.</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#29465C" vertical={false} opacity={0.3} />
              <XAxis dataKey="name" stroke="#8EA5B5" opacity={0.6} tickLine={false} />
              <YAxis stroke="#8EA5B5" opacity={0.6} tickLine={false} />
              <Tooltip 
                contentStyle={{ background: '#112533', border: '1px solid #29465C', borderRadius: '12px', color: '#FFFFFF' }}
                labelClassName="text-success font-bold"
              />
              <Area type="monotone" dataKey="collected" stroke="#22C55E" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};

export default RevenueChart;
