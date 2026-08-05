import React from 'react';

export const Switch = ({
  checked = false,
  onChange,
  label,
  id,
  disabled = false,
  className = '',
}) => {
  return (
    <label htmlFor={id} className={`flex items-center gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange && onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div className={`w-10 h-6 rounded-full transition duration-200 ${checked ? 'bg-accent' : 'bg-border'}`} />
        <div className={`absolute top-1 left-1 bg-primary w-4 h-4 rounded-full transition-transform duration-200 ${checked ? 'transform translate-x-4' : ''}`} />
      </div>
      {label && <span className="text-xs text-text-secondary font-medium font-poppins">{label}</span>}
    </label>
  );
};

export default Switch;
