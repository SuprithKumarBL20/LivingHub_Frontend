export const appConfig = {
  apiGateway: import.meta.env.VITE_API_GATEWAY || 'http://localhost:8080',
  defaultRequestTimeout: 15000,
  appName: 'LivingHub',
  version: '1.0.0',
};
