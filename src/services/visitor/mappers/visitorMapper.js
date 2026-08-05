export const visitorMapper = {
  toRecord: (data) => ({
    id: data.id || '',
    name: data.name || '',
    purpose: data.purpose || '',
    apartment: data.apartment || '',
    checkIn: data.checkIn || '',
    checkOut: data.checkOut || '',
    status: data.status || 'EXPECTED',
    qrCode: data.qrCode || '',
    passCode: data.passCode || '',
  })
};
