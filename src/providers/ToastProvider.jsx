import React from 'react';
import { Toaster } from 'react-hot-toast';

export const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: '',
          style: {
            background: '#183446',
            color: '#FFFFFF',
            border: '1px solid #29465C',
            borderRadius: '12px',
            fontSize: '14px',
            padding: '12px 16px',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#22C55E',
              secondary: '#183446',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#183446',
            },
          },
        }}
      />
    </>
  );
};
