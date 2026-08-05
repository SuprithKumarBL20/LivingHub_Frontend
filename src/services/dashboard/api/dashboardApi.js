import { apiClient } from '../../apiClient';
import { DASHBOARD_ENDPOINTS } from '../constants/dashboardConstants';

export const dashboardApi = {
  getSummary: () => apiClient.get(DASHBOARD_ENDPOINTS.SUMMARY),
};
