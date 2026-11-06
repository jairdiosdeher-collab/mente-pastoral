import {
  WABAConnection,
  WhatsAppConversation,
  WhatsAppMessage,
  WhatsAppTemplate,
  PastoralAISuggestion,
  WhatsAppAnalytics,
  WhatsAppContact,
} from '../types';

export async function fetchWabaStatus(): Promise<{ connection: WABAConnection; meta: any }> {
  const res = await fetch('/api/whatsapp/status');
  if (!res.ok) throw new Error('Error al consultar estado de WasapFlow');
  return res.json();
}

export async function initWabaSession(): Promise<any> {
  const res = await fetch('/api/whatsapp/session/init', { method: 'POST' });
  if (!res.ok) throw new Error('Error al inicializar sesión WABA');
  return res.json();
}

export async function fetchConversations(): Promise<WhatsAppConversation[]> {
  const res = await fetch('/api/whatsapp/conversations');
  if (!res.ok) throw new Error('Error al cargar conversaciones');
  const data = await res.json();
  return data.conversations;
}

export async function fetchMessages(conversationId: string): Promise<WhatsAppMessage[]> {
  const res = await fetch(`/api/whatsapp/messages/${conversationId}`);
  if (!res.ok) throw new Error('Error al cargar mensajes');
  const data = await res.json();
  return data.messages;
}

export async function sendWhatsAppMessage(params: {
  conversationId: string;
  text: string;
  type?: 'text' | 'template';
  templateName?: string;
  isAiGenerated?: boolean;
  approvedByHuman?: boolean;
}): Promise<WhatsAppMessage> {
  const res = await fetch('/api/whatsapp/messages/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...params,
      approvedByHuman: params.approvedByHuman ?? true,
    }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Error HTTP ${res.status}`);
  }
  const data = await res.json();
  return data.message;
}

export async function requestPastoralAiSuggestion(conversationId: string): Promise<PastoralAISuggestion> {
  const res = await fetch('/api/whatsapp/ai/suggest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ conversationId }),
  });
  if (!res.ok) throw new Error('Error al solicitar sugerencia pastoral IA');
  const data = await res.json();
  return data.suggestion;
}

export async function fetchTemplates(): Promise<WhatsAppTemplate[]> {
  const res = await fetch('/api/whatsapp/templates');
  if (!res.ok) throw new Error('Error al cargar plantillas');
  const data = await res.json();
  return data.templates;
}

export async function updateContactProfile(contactId: string, updates: Partial<WhatsAppContact>): Promise<WhatsAppContact> {
  const res = await fetch('/api/whatsapp/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contactId, ...updates }),
  });
  if (!res.ok) throw new Error('Error al actualizar contacto');
  const data = await res.json();
  return data.contact;
}

export async function fetchWhatsAppAnalytics(): Promise<WhatsAppAnalytics> {
  const res = await fetch('/api/whatsapp/analytics');
  if (!res.ok) throw new Error('Error al cargar analítica');
  const data = await res.json();
  return data.analytics;
}

export async function triggerWebhookTest(payload: {
  contactName: string;
  phoneNumber: string;
  text: string;
}): Promise<any> {
  const res = await fetch('/api/whatsapp/webhook-test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Error en prueba de webhook');
  return res.json();
}
