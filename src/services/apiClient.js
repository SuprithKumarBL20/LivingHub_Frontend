import axios from 'axios';
import { appConfig } from '../config/appConfig';
import { useAuthStore } from '../store/authStore';
import { logger } from '../shared/utils/logger';

export const apiClient = axios.create({
  baseURL: appConfig.apiGateway,
  timeout: appConfig.defaultRequestTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Auth Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('livinghub-token') || sessionStorage.getItem('livinghub-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    logger.info(`API Request: ${config.method.toUpperCase()} ${config.url}`, config.data);
    return config;
  },
  (error) => {
    logger.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Expiry & Token Refresh
apiClient.interceptors.response.use(
  (response) => {
    logger.info(`API Response: ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Check if unauthorized and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      logger.warn('Token expired. Attempting token refresh...');
      
      try {
        const refreshToken = localStorage.getItem('livinghub-refresh') || sessionStorage.getItem('livinghub-refresh');
        if (!refreshToken) throw new Error('No refresh token available');
        
        // Mock a refresh request
        const res = await axios.post(`${appConfig.apiGateway}/api/v1/auth/refresh`, { refreshToken });
        const newToken = res.data.token;
        
        const remember = localStorage.getItem('livinghub-remember') === 'true';
        if (remember) {
          localStorage.setItem('livinghub-token', newToken);
        } else {
          sessionStorage.setItem('livinghub-token', newToken);
        }
        
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        logger.info('Token refresh succeeded. Retrying request...');
        return apiClient(originalRequest);
      } catch (refreshError) {
        logger.error('Token refresh failed. Logging out user:', refreshError);
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    // Map common error status codes to custom objects
    const mappedError = {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'A network error occurred. Please try again.',
      errors: error.response?.data?.errors || [],
    };
    
    logger.error(`API Error Response: ${mappedError.status}`, mappedError);
    return Promise.reject(mappedError);
  }
);
