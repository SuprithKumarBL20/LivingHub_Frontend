export const authMapper = {
  toUser: (data) => {
    if (!data) return null;
    return {
      id: data.id || data.userId || '',
      name: data.name || data.fullName || 'User',
      email: data.email || '',
      role: data.role || 'RESIDENT',
      permissions: data.permissions || [],
      avatarUrl: data.avatarUrl || '',
      communityId: data.communityId || '',
      apartmentNumber: data.apartmentNumber || '',
      phoneNumber: data.phoneNumber || '',
    };
  },
  toLoginResponse: (data) => {
    if (!data) return null;
    return {
      success: true,
      message: 'Login successful',
      data: {
        user: authMapper.toUser(data.user),
        token: data.token || '',
      },
      errors: [],
      meta: null
    };
  }
};
