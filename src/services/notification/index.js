import { notificationApi } from './api/notificationApi';
import { notificationMapper } from './mappers/notificationMapper';
import { notificationQueries } from './queries/notificationQueries';

export const notificationService = {
  getPreferences: async () => {
    return Promise.resolve({
      success: true,
      message: 'Preferences loaded',
      data: {
        pushEnabled: true,
        emailEnabled: true,
        smsEmergencyEnabled: true,
        billingAlerts: true,
        visitorCheckInAlerts: true
      },
      errors: [],
      meta: null
    });
  },

  updatePreferences: async (preferences) => {
    return Promise.resolve({
      success: true,
      message: 'Preferences updated successfully',
      data: preferences,
      errors: [],
      meta: null
    });
  }
};

export { notificationQueries, notificationApi, notificationMapper };
