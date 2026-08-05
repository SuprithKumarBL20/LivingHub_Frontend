import React from 'react';

export const Avatar = ({
  src,
  name = '',
  size = 'md', // sm, md, lg
  className = '',
  status = null, // online, offline
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
  };

  const getInitials = (fullName) => {
    if (!fullName) return '';
    return fullName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  const statusColors = {
    online: 'bg-success ring-2 ring-primary',
    offline: 'bg-muted ring-2 ring-primary',
  };

  return (
    <div className={`relative shrink-0 select-none ${className}`}>
      {src ? (
        <div className={`${sizes[size]} rounded-xl overflow-hidden border border-border/80`}>
          <img src={src} alt={name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className={`${sizes[size]} rounded-xl bg-card border border-border flex items-center justify-center font-bold text-text-primary font-poppins`}>
          {getInitials(name)}
        </div>
      )}
      {status && (
        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${statusColors[status]}`} />
      )}
    </div>
  );
};

export default Avatar;
