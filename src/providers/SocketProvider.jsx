import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';
import { logger } from '../shared/utils/logger';
import { appConfig } from '../config/appConfig';
import toast from 'react-hot-toast';

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuthStore();
  const [socket, setSocket] = useState(null);
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    logger.info('Initializing WebSocket connection to Gateway...');
    
    // In Phase 1 placeholder, we connect but handle errors gracefully if port 8080 isn't listening yet
    const s = io(appConfig.apiGateway, {
      auth: { token },
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 5000,
    });

    s.on('connect', () => {
      logger.info('WebSocket Connected to API Gateway');
    });

    s.on('connect_error', (err) => {
      logger.warn('WebSocket Connection Error (this is expected in Phase 1 if Gateway is offline):', err.message);
    });

    // Listeners mapping
    s.on('notif:push', (data) => {
      logger.info('WebSocket push notification received:', data);
      addNotification(data);
      toast(data.title || 'New notification', { icon: '🔔' });
    });

    s.on('visitor:scan', (data) => {
      logger.info('WebSocket visitor scan event received:', data);
      toast.success(`Visitor ${data.name || 'guest'} checked in!`);
    });

    s.on('security:alert', (data) => {
      logger.error('WebSocket EMERGENCY alert received:', data);
      toast.error(`SOS ALERT: ${data.message || 'Intruder alarm active'}`, { duration: 6000 });
    });

    setSocket(s);

    return () => {
      logger.info('Disconnecting WebSocket connection...');
      s.disconnect();
    };
  }, [token, isAuthenticated]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
