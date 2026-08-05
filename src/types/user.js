/**
 * @typedef {('SUPER_ADMIN'|'COMMUNITY_ADMIN'|'RESIDENT'|'OWNER'|'TENANT'|'SECURITY'|'MAINTENANCE'|'ACCOUNTANT'|'VISITOR')} UserRole
 */

/**
 * @typedef {Object} User
 * @property {string} id - Unique identifier
 * @property {string} name - Full display name
 * @property {string} email - Email address
 * @property {UserRole} role - Security role mapping
 * @property {string[]} permissions - List of permission strings
 * @property {string} [avatarUrl] - CDN URL to avatar photo
 * @property {string} [phoneNumber] - Contact number
 * @property {string} [apartmentNumber] - Apartment code (e.g. Apt 12B)
 * @property {string} [communityId] - Associated community identifier
 */

export {};
