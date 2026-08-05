import React from 'react';
import ComponentShowcase from '../pages/developer/ComponentShowcase';
import SystemStatus from '../pages/developer/SystemStatus';

export const developerRoutes = [
  { path: '/developer/ui', element: <ComponentShowcase /> },
  { path: '/developer/system', element: <SystemStatus /> },
];

export default developerRoutes;
