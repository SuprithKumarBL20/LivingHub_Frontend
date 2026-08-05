export const maintenanceQueries = {
  keys: {
    list: () => ['maintenance', 'complaints'],
    detail: (id) => ['maintenance', 'complaint', id],
  }
};
