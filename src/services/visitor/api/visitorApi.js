import { apiClient } from '../../apiClient';
import { VISITOR_ENDPOINTS } from '../constants/visitorConstants';

export const visitorApi = {
  getVisitors: () => apiClient.get(VISITOR_ENDPOINTS.QUEUE),
  generatePass: (data) => apiClient.post(VISITOR_ENDPOINTS.PASS, data),
  checkIn: (id) => apiClient.post(`${VISITOR_ENDPOINTS.QUEUE}/${id}/checkin`),
  checkOut: (id) => apiClient.post(`${VISITOR_ENDPOINTS.QUEUE}/${id}/checkout`),
};
