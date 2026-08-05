import { apiClient } from '../../apiClient';
import { MAINTENANCE_ENDPOINTS } from '../constants/maintenanceConstants';

export const maintenanceApi = {
  getComplaints: () => apiClient.get(MAINTENANCE_ENDPOINTS.COMPLAINTS),
  createComplaint: (data) => apiClient.post(MAINTENANCE_ENDPOINTS.COMPLAINTS, data),
  addComment: (id, data) => apiClient.post(`${MAINTENANCE_ENDPOINTS.COMPLAINTS}/${id}/comments`, data),
  updateStatus: (id, status) => apiClient.patch(`${MAINTENANCE_ENDPOINTS.COMPLAINTS}/${id}/status`, { status }),
};
