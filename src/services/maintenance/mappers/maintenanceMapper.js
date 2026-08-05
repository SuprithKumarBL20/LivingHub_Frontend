export const maintenanceMapper = {
  toComplaint: (data) => ({
    id: data.id || '',
    title: data.title || '',
    description: data.description || '',
    category: data.category || '',
    priority: data.priority || 'LOW',
    status: data.status || 'PENDING',
    createdAt: data.createdAt || '',
    updatedAt: data.updatedAt || '',
    images: data.images || [],
    comments: data.comments || [],
    timeline: data.timeline || [],
  })
};
