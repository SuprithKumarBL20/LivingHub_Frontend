/**
 * @typedef {('LOW'|'MEDIUM'|'HIGH'|'CRITICAL')} ComplaintPriority
 */

/**
 * @typedef {('PENDING'|'ASSIGNED'|'RESOLVED'|'CLOSED')} ComplaintStatus
 */

/**
 * @typedef {Object} ComplaintComment
 * @property {string} id - Comment ID
 * @property {string} author - Author name
 * @property {string} authorRole - Author role
 * @property {string} content - Text comment content
 * @property {string} timestamp - ISO Date string
 * @property {string} [avatar] - Author profile avatar URL
 */

/**
 * @typedef {Object} ComplaintTimelineEvent
 * @property {string} id - Event ID
 * @property {string} status - New ticket status
 * @property {string} description - Step description text
 * @property {string} timestamp - ISO Date string
 * @property {string} actor - Name of user who updated status
 */

/**
 * @typedef {Object} Complaint
 * @property {string} id - Ticket identifier
 * @property {string} title - Heading
 * @property {string} description - Ticket explanation
 * @property {string} category - Work category (e.g. Plumbing, Electrical)
 * @property {ComplaintPriority} priority - Urgency
 * @property {ComplaintStatus} status - Lifecycle state
 * @property {string} createdAt - ISO Date string
 * @property {string} updatedAt - ISO Date string
 * @property {string[]} images - URLs to photo evidence
 * @property {ComplaintComment[]} comments - Discussion thread
 * @property {ComplaintTimelineEvent[]} timeline - Tracking audit steps
 */

export {};
