/**
 * @typedef {('PAID'|'PENDING'|'OVERDUE')} BillStatus
 */

/**
 * @typedef {('maintenance'|'electricity'|'water'|'amenity'|'other')} BillCategory
 */

/**
 * @typedef {Object} Bill
 * @property {string} id - Invoice identifier
 * @property {string} title - Label (e.g. July Maintenance Fee)
 * @property {number} amount - Cost in USD
 * @property {string} dueDate - Due date ISO format
 * @property {BillStatus} status - Payment state
 * @property {BillCategory} category - Charge code
 * @property {string} billingPeriod - Range description
 * @property {string} invoiceNumber - Accounting invoice code
 */

export {};
