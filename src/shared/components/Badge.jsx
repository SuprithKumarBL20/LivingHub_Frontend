import React from 'react';

export const Badge = ({
  children,
  type = 'info', // success, warning, danger, info
  className = '',
}) => {
  const types = {
    success: 'bg-success/15 text-success border border-success/30',
    warning: 'bg-warning/15 text-warning border border-warning/30',
    danger: 'bg-danger/15 text-danger border border-danger/30',
    info: 'bg-info/15 text-info border border-info/30',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold font-mono uppercase rounded-md tracking-wider ${types[type]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
