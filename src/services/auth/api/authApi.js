import { apiClient } from '../../apiClient';
import { AUTH_ENDPOINTS } from '../constants/authConstants';

export const authApi = {
  login: (email, password) => apiClient.post(AUTH_ENDPOINTS.LOGIN, { email, password }),
  register: (data) => apiClient.post(AUTH_ENDPOINTS.REGISTER, data),
  sendOtp: (email) => apiClient.post(AUTH_ENDPOINTS.OTP, { email }),
  verifyOtp: (email, code) => apiClient.post(AUTH_ENDPOINTS.OTP + '/verify', { email, code }),
  forgotPassword: (email) => apiClient.post(AUTH_ENDPOINTS.FORGOT, { email }),
  resetPassword: (token, password) => apiClient.post(AUTH_ENDPOINTS.RESET, { token, password }),
  refreshToken: (token) => apiClient.post(AUTH_ENDPOINTS.REFRESH, { refreshToken: token }),
  getBranding: () => apiClient.get(AUTH_ENDPOINTS.BRANDING),
  getMe: () => apiClient.get(AUTH_ENDPOINTS.ME),
};
