export const permissionUtils = {
  /**
   * Evaluates if a user has a specific role.
   * @param {Object} user 
   * @param {string} role 
   * @returns {boolean}
   */
  hasRole: (user, role) => {
    if (!user) return false;
    return user.role === role;
  },

  /**
   * Evaluates if a user has a specific permission.
   * @param {Object} user 
   * @param {string} permission 
   * @returns {boolean}
   */
  hasPermission: (user, permission) => {
    if (!user) return false;
    if (user.permissions.includes('*') || user.permissions.includes('manage:all')) return true;
    return user.permissions.includes(permission);
  },

  /**
   * Main authorization evaluator.
   * @param {Object} user 
   * @param {string[]} [allowedRoles=[]] 
   * @param {string} [requiredPermission=null] 
   * @returns {boolean}
   */
  canAccess: (user, allowedRoles = [], requiredPermission = null) => {
    if (!user) return false;
    if (user.role === 'SUPER_ADMIN') return true; // Super Admin wildcard
    
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return false;
    }
    if (requiredPermission && !permissionUtils.hasPermission(user, requiredPermission)) {
      return false;
    }
    return true;
  }
};

export default permissionUtils;
