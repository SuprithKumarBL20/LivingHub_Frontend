/**
 * @template T
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Flag indicating operation outcome
 * @property {string} message - Descriptive feedback notice
 * @property {T} data - Main payload contents
 * @property {string[]} errors - List of error details if success is false
 * @property {Object} [meta] - Pagination or tracking metadata
 * @property {number} meta.page - Current page index
 * @property {number} meta.limit - Items limit size per page
 * @property {number} meta.total - Total records matching query
 */

export {};
