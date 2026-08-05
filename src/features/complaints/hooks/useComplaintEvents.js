import { useEffect } from 'react';
import { useSocket } from '../../../hooks/useSocket';
import { SOCKET_EVENTS } from '../../../constants/socketEvents';
import toast from 'react-hot-toast';

export const useComplaintEvents = (callback) => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleUpdate = (data) => {
      toast.success(`Complaint status updated: ${data.status}`);
      if (callback) callback(data);
    };

    socket.on(SOCKET_EVENTS.COMPLAINT_UPDATED, handleUpdate);
    return () => {
      socket.off(SOCKET_EVENTS.COMPLAINT_UPDATED, handleUpdate);
    };
  }, [socket, callback]);
};
