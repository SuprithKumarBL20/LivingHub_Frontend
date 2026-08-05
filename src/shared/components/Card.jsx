import React from 'react';

export const Card = ({
  children,
  className = '',
  onClick,
}) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-card/75 backdrop-blur-md border border-border/80 p-6 rounded-2xl shadow-md ${onClick ? 'cursor-pointer hover:border-border transition duration-200 hover:scale-[1.005]' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
