import React, { forwardRef } from 'react';

export const Input = forwardRef(({
  label,
  type = 'text',
  error,
  helperText,
  className = '',
  id,
  ...props
}, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-text-secondary select-none font-poppins">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={id}
        className={`w-full px-4 py-2.5 bg-primary/60 border ${error ? 'border-danger focus:border-danger' : 'border-border/60 focus:border-accent'} rounded-xl text-text-primary placeholder:text-muted/70 text-sm outline-none transition duration-200 focus:ring-1 focus:ring-accent/15 ${className}`}
        {...props}
      />
      {error && (
        <p className="text-[10px] text-danger font-medium font-poppins mt-0.5">
          {error.message || error}
        </p>
      )}
      {!error && helperText && (
        <p className="text-[10px] text-muted font-medium mt-0.5">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
