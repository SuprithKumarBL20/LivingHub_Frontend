import { aiApi } from './api/aiApi';
import { aiMapper } from './mappers/aiMapper';
import { aiQueries } from './queries/aiQueries';

export const aiService = {
  sendMessage: async (messageText, conversationHistory = []) => {
    // Artificial delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    // Simulate AI smart responses
    let responseText = `I am your LivingHub AI Assistant. I can help you with amenity bookings, check bill ledgers, or log maintenance tickets. I received your message: "${messageText}".`;
    
    const normalizedText = messageText.toLowerCase();
    if (normalizedText.includes('water') || normalizedText.includes('plumb') || normalizedText.includes('leak')) {
      responseText = "I detected you might be having a plumbing issue. Would you like me to draft a high-priority maintenance ticket for 'Kitchen/Bathroom Plumbing Service'? I can submit it immediately for you.";
    } else if (normalizedText.includes('bill') || normalizedText.includes('pay') || normalizedText.includes('due')) {
      responseText = "Checking your ledger... You have 1 pending invoice for the 'July Community Maintenance Fee' ($150.00) due on August 5th, and 1 overdue utility bill ($45.50). You can clear them directly in the Bills page.";
    } else if (normalizedText.includes('pool') || normalizedText.includes('clubhouse') || normalizedText.includes('amenit')) {
      responseText = "Our swimming pool is open until 10:00 PM today. Clubhouse reservations require booking at least 24 hours in advance. I can open the Amenities page for you.";
    } else if (normalizedText.includes('visitor') || normalizedText.includes('guest') || normalizedText.includes('pass')) {
      responseText = "You can pre-approve guests by generating a temporary QR passcode. This lets them bypass security queues at the gate. I can assist you in generating a pass.";
    }

    return Promise.resolve({
      success: true,
      message: 'AI reply generated',
      data: {
        text: responseText,
        timestamp: new Date().toISOString()
      },
      errors: [],
      meta: null
    });
  },

  scanLeaseAgreement: async (fileObject) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return Promise.resolve({
      success: true,
      message: 'Document parsed successfully via OCR',
      data: {
        tenantName: 'David Miller',
        landlordName: 'Alexander Sterling',
        leaseStart: '2026-08-01',
        leaseEnd: '2027-08-01',
        monthlyRent: 1200.00,
        securityDeposit: 1200.00,
        detectedIssues: ['No notary stamp verified']
      },
      errors: [],
      meta: null
    });
  }
};

export { aiQueries, aiApi, aiMapper };
