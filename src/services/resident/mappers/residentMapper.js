export const residentMapper = {
  toProfile: (data) => ({
    id: data.id || '',
    name: data.name || '',
    email: data.email || '',
    phoneNumber: data.phoneNumber || '',
    apartmentNumber: data.apartmentNumber || '',
  }),
  toFamily: (data) => ({
    id: data.id || '',
    name: data.name || '',
    relation: data.relation || '',
    phoneNumber: data.phoneNumber || '',
  }),
  toVehicle: (data) => ({
    id: data.id || '',
    type: data.type || 'Car',
    model: data.model || '',
    plateNumber: data.plateNumber || '',
    parkingSlot: data.parkingSlot || '',
  })
};
