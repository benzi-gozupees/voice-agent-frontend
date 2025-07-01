// src/types/index.ts

export type AssistantItem = {
  id: number;
  name: string;
  vapiAssistantId: string;
  voice: string;
  businessName: string;
  industry: string;
  location: string;
  isActive: boolean;
  kbConfigured: boolean;
  promptUpdated: boolean;
  systemPrompt: string;
  firstMessage: string;
  instructions: string;
  appointmentBookingEnabled: boolean;
  totalMinutesUsed: number;
  createdAt: string;
  tenant_id: number;
};

// ✅ NEW TYPE — use this in your hook
export type AssistantResponse = AssistantItem[];
