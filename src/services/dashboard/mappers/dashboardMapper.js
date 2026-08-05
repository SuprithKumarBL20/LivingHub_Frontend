export const dashboardMapper = {
  /**
   * Normalizes the aggregated dashboard response payload.
   * @param {Object} data 
   * @returns {Object}
   */
  toSummary: (data) => {
    if (!data) return { role: 'RESIDENT', widgets: {} };
    return {
      role: data.role || 'RESIDENT',
      widgets: data.widgets || {}
    };
  }
};

export default dashboardMapper;
