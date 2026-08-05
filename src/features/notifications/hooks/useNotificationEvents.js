import { useEffect } from 'react';
import { useSocket } from '../../../hooks/useSocket';
import { useNotificationStore } from '../../../store/notificationStore';
import { SOCKET_EVENTS } from '../../../constants/socketEvents';
import toast from 'react-hot-toast';

export const useNotificationEvents = () => {
  const socket = useSocket();
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    if (!socket) return;

    const handlePush = (data) => {
      addNotification(data);
      toast(data.title || 'New Announcement Alert!', { icon: '🔔' });
    };

    const handleEmergency = (data) => {
      addNotification({
        id: `emerg-${Date.now()}`,
        title: 'EMERGENCY ALERT',
        description: data.message || 'Safety incident logged in community!',
        type: 'EMERGENCY',
        timestamp: new Date().toISOString()
      });
      toast.error(data.message || 'EMERGENCY DISPATCH INITIATED', { icon: '🚨', duration: 6000 });
    };

    socket.on(SOCKET_EVENTS.NOTIFICATION_CREATED, handlePush);
    socket.on(SOCKET_EVENTS.EMERGENCY_CREATED, handleEmergency);
    return () => {
      socket.off(SOCKET_EVENTS.NOTIFICATION_CREATED, handlePush);
      socket.off(SOCKET_EVENTS.EMERGENCY_CREATED, handleEmergency);
    };
  }, [socket, addNotification]);
};
