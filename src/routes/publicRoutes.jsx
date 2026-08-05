import React from 'react';
import LandingPage from '../pages/LandingPage';
import AboutPage from '../pages/AboutPage';
import PricingPage from '../pages/PricingPage';
import ContactPage from '../pages/ContactPage';

export const publicRoutes = [
  { path: '/', element: <LandingPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/pricing', element: <PricingPage /> },
  { path: '/contact', element: <ContactPage /> },
];

export default publicRoutes;
