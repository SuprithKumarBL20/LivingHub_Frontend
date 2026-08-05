export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  
  NOTIFICATION_CREATED: 'notification.created',
  NOTIFICATION_UPDATED: 'notification.updated',
  
  COMPLAINT_CREATED: 'complaint.created',
  COMPLAINT_UPDATED: 'complaint.updated',
  
  VISITOR_ARRIVED: 'visitor.arrived',
  VISITOR_APPROVED: 'visitor.approved',
  VISITOR_REJECTED: 'visitor.rejected',
  
  MAINTENANCE_ASSIGNED: 'maintenance.assigned',
  MAINTENANCE_COMPLETED: 'maintenance.completed',
  
  EMERGENCY_CREATED: 'emergency.created',
};

export default SOCKET_EVENTS;
