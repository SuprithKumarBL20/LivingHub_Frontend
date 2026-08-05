import { apiClient } from '../../apiClient';
import { RESIDENT_ENDPOINTS } from '../constants/residentConstants';

export const residentApi = {
  getProfile: () => apiClient.get(RESIDENT_ENDPOINTS.PROFILE),
  addFamilyMember: (data) => apiClient.post(RESIDENT_ENDPOINTS.FAMILY, data),
  deleteFamilyMember: (id) => apiClient.delete(`${RESIDENT_ENDPOINTS.FAMILY}/${id}`),
  addVehicle: (data) => apiClient.post(RESIDENT_ENDPOINTS.VEHICLES, data),
  deleteVehicle: (id) => apiClient.delete(`${RESIDENT_ENDPOINTS.VEHICLES}/${id}`),
};
