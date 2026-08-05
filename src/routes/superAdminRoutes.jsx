import React, { lazy } from 'react';

const SuperAdminDashboard = lazy(() => import('../features/super-admin/pages/SuperAdminDashboard'));

export const superAdminRoutes = [
  { path: '/super-admin', element: <SuperAdminDashboard /> },
];

export default superAdminRoutes;
