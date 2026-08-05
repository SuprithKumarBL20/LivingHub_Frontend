export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    REFRESH: '/api/v1/auth/refresh',
    FORGOT: '/api/v1/auth/forgot-password',
    RESET: '/api/v1/auth/reset-password',
    OTP: '/api/v1/auth/verify-otp',
    BRANDING: '/api/v1/auth/branding',
  },
  RESIDENT: {
    PROFILE: '/api/v1/residents/profile',
    FAMILY: '/api/v1/residents/family',
    VEHICLES: '/api/v1/residents/vehicles',
  },
  VISITOR: {
    PASS: '/api/v1/visitors/pass',
    QUEUE: '/api/v1/visitors/queue',
    CHECK_IN: '/api/v1/visitors/checkin',
    CHECK_OUT: '/api/v1/visitors/checkout',
  },
  MAINTENANCE: {
    COMPLAINTS: '/api/v1/maintenance/complaints',
    COMMENTS: '/api/v1/maintenance/comments',
    WORK_ORDERS: '/api/v1/maintenance/workorders',
  },
  FACILITY: {
    LIST: '/api/v1/facilities',
    BOOKING: '/api/v1/facilities/bookings',
  },
  FINANCE: {
    BILLS: '/api/v1/finance/bills',
    PAY: '/api/v1/finance/pay',
    INVOICES: '/api/v1/finance/invoices',
  },
  COMMUNITY: {
    NOTICES: '/api/v1/community/notices',
    FEED: '/api/v1/community/feed',
  },
  AI: {
    CHAT: '/api/v1/ai/chat',
    OCR: '/api/v1/ai/ocr',
  },
  AUDIT: {
    LOGS: '/api/v1/audit/logs',
  },
  FILE: {
    UPLOAD: '/api/v1/files/upload',
  }
};
