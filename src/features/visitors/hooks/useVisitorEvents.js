import { useEffect } from 'react';
import { useSocket } from '../../../hooks/useSocket';
import { SOCKET_EVENTS } from '../../../constants/socketEvents';
import toast from 'react-hot-toast';

export const useVisitorEvents = (callback) => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleScan = (data) => {
      toast.success(`Visitor checked in: ${data.name}`);
      if (callback) callback(data);
    };

    socket.on(SOCKET_EVENTS.VISITOR_ARRIVED, handleScan);
    return () => {
      socket.off(SOCKET_EVENTS.VISITOR_ARRIVED, handleScan);
    };
  }, [socket, callback]);
};
