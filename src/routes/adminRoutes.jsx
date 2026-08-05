import React, { lazy } from 'react';

const SuperAdminDashboard = lazy(() => import('../features/super-admin/pages/SuperAdminDashboard'));

export const adminRoutes = [
  { path: '/admin', element: <SuperAdminDashboard /> },
  { path: '/admin/communities', element: <SuperAdminDashboard /> },
  { path: '/admin/system-health', element: <SuperAdminDashboard /> },
  { path: '/admin/subscriptions', element: <SuperAdminDashboard /> },
];

export default adminRoutes;
