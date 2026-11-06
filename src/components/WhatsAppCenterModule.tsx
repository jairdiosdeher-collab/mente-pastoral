import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  ShieldCheck,
  PhoneCall,
  User,
  Heart,
  AlertTriangle,
  CheckCheck,
  Check,
  Clock,
  Search,
  BookOpen,
  DollarSign,
  Activity,
  Plus,
  RefreshCw,
  FileText,
  Copy,
  Info,
  Sliders,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Hash,
  ExternalLink
} from 'lucide-react';
import {
  WABAConnection,
  WhatsAppConversation,
  WhatsAppMessage,
  WhatsAppTemplate,
  PastoralAISuggestion,
  WhatsAppAnalytics,
  WhatsAppContact,
} from '../types';
import {
  fetchWabaStatus,
  initWabaSession,
  fetchConversations,
  fetchMessages,
  sendWhatsAppMessage,
  requestPastoralAiSuggestion,
  fetchTemplates,
  updateContactProfile,
  fetchWhatsAppAnalytics,
  triggerWebhookTest,
} from '../services/whatsappService';

interface WhatsAppCenterModuleProps {
  onOpenCrisis: () => void;
}

export const WhatsAppCenterModule: React.FC<WhatsAppCenterModuleProps> = ({ onOpenCrisis }) => {
  // Connection state
  const [connection, setConnection] = useState<WABAConnection | null>(null);
  const [loadingConnection, setLoadingConnection] = useState(false);

  // Conversations & Messages
  const [conversations, setConversations] = useState<WhatsAppConversation[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<string>('');
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'prayer' | 'crisis'>('all');

  // Input & Drafting
  const [messageInput, setMessageInput] = useState('');
  const [sending, setSending] = useState(false);

  // Templates
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  // AI Pastoral Copilot
  const [aiSuggestion, setAiSuggestion] = useState<PastoralAISuggestion | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [showAiDrawer, setShowAiDrawer] = useState(true);

  // Contact Drawer & Edit
  const [contactNotes, setContactNotes] = useState('');
  const [newPrayerRequest, setNewPrayerRequest] = useState('');
  const [savingContact, setSavingContact] = useState(false);

  // Analytics & Cost Monitor
  const [analytics, setAnalytics] = useState<WhatsAppAnalytics | null>(null);
  const [showCostModal, setShowCostModal] = useState(false);

  // Webhook Simulator Modal
  const [showWebhookModal, setShowWebhookModal] = useState(false);
  const [simName, setSimName] = useState('Hermana Martha');
  const [simPhone, setSimPhone] = useState('+57 315 789 1234');
  const [simText, setSimText] = useState('Pastor, me siento muy angustiada por la salud de mi hijo, ¿pueden orar conmigo?');
  const [testingWebhook, setTestingWebhook] = useState(false);
  const [webhookLog, setWebhookLog] = useState<string | null>(null);

  // Notification Banner
  const [actionAlert, setActionAlert] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null);

  const showAlert = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setActionAlert({ type, message });
    setTimeout(() => setActionAlert(null), 4000);
  };

  // 1. Initial Load
  const loadData = async () => {
    try {
      const [statusRes, convs, tpls, stats] = await Promise.all([
        fetchWabaStatus(),
        fetchConversations(),
        fetchTemplates(),
        fetchWhatsAppAnalytics(),
      ]);

      setConnection(statusRes.connection);
      setConversations(convs);
      setTemplates(tpls);
      setAnalytics(stats);

      if (convs.length > 0 && !selectedConvId) {
        setSelectedConvId(convs[0].id);
      }
    } catch (err: any) {
      console.error('Error loading WhatsApp data:', err);
      showAlert('No se pudo conectar al servidor de WasapFlow. Operando en modo local.', 'error');
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      fetchConversations().then((data) => setConversations(data)).catch(() => {});
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // 2. Load Messages when Selected Conversation Changes
  useEffect(() => {
    if (!selectedConvId) return;
    const currentConv = conversations.find((c) => c.id === selectedConvId);
    if (currentConv) {
      setContactNotes(currentConv.contact.notes);
    }

    setLoadingMessages(true);
    fetchMessages(selectedConvId)
      .then((data) => {
        setMessages(data);
        setLoadingMessages(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingMessages(false);
      });

    // Reset AI suggestion for new thread
    setAiSuggestion(null);
  }, [selectedConvId]);

  // Selected conversation object
  const activeConv = conversations.find((c) => c.id === selectedConvId);

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contact.phoneNumber.includes(searchQuery) ||
      c.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'unread') return c.unreadCount > 0;
    if (activeFilter === 'prayer') return c.contact.tags.includes('En Oración');
    if (activeFilter === 'crisis') return c.contact.tags.includes('Crisis') || c.contact.riskAlert;
    return true;
  });

  // Re-connect WABA
  const handleReconnect = async () => {
    setLoadingConnection(true);
    try {
      const res = await initWabaSession();
      if (res.connection) setConnection(res.connection);
      if (res.success && res.mode === 'live') {
        showAlert('Sesión de WasapFlow Bridge sincronizada con Meta WABA', 'success');
      } else {
        showAlert(res.warning || res.message || 'WasapFlow pendiente de configuración: Ingrese claves en .env o Vercel', 'info');
      }
    } catch (err: any) {
      showAlert('WasapFlow pendiente de configuración: ' + err.message, 'error');
    } finally {
      setLoadingConnection(false);
    }
  };

  // Send message
  const handleSendMessage = async (textToSend?: string, isAi: boolean = false) => {
    const body = textToSend || messageInput;
    if (!body.trim() || !selectedConvId) return;

    setSending(true);
    try {
      const newMsg = await sendWhatsAppMessage({
        conversationId: selectedConvId,
        text: body,
        type: 'text',
        isAiGenerated: isAi,
        approvedByHuman: true,
      });

      setMessages((prev) => [...prev, newMsg]);
      setMessageInput('');
      setAiSuggestion(null);
      showAlert(isAi ? 'Respuesta aprobada y enviada a WhatsApp' : 'Mensaje procesado');

      // Refresh conversations list
      const updatedConvs = await fetchConversations();
      setConversations(updatedConvs);
    } catch (err: any) {
      showAlert('Error al enviar mensaje: ' + err.message, 'error');
    } finally {
      setSending(false);
    }
  };

  // Request AI Suggestion
  const handleGenerateAiSuggestion = async () => {
    if (!selectedConvId) return;
    setLoadingAi(true);
    try {
      const suggestion = await requestPastoralAiSuggestion(selectedConvId);
      setAiSuggestion(suggestion);
      setShowAiDrawer(true);
      showAlert('Borrador pastoral generado con Gemini 3.8 Flash (RV1960 + TCC)', 'info');
    } catch (err: any) {
      showAlert('No se pudo generar la sugerencia: ' + err.message, 'error');
    } finally {
      setLoadingAi(false);
    }
  };

  // Apply Template
  const handleSelectTemplate = (templateName: string) => {
    const tpl = templates.find((t) => t.name === templateName);
    if (!tpl || !activeConv) return;

    let body = tpl.body;
    body = body.replace('{{1}}', activeConv.contact.name.split(' ')[0]);
    body = body.replace('{{2}}', activeConv.contact.prayerRequests[0] || 'tu petición');
    body = body.replace('{{3}}', '10:00 AM');

    setMessageInput(body);
    setSelectedTemplate('');
  };

  // Save Contact Changes
  const handleSaveContact = async () => {
    if (!activeConv) return;
    setSavingContact(true);
    try {
      const updated = await updateContactProfile(activeConv.contact.id, {
        notes: contactNotes,
      });
      activeConv.contact = updated;
      showAlert('Ficha pastoral actualizada exitosamente');
    } catch (err: any) {
      showAlert('Error guardando contacto', 'error');
    } finally {
      setSavingContact(false);
    }
  };

  // Add Prayer Request
  const handleAddPrayer = async () => {
    if (!activeConv || !newPrayerRequest.trim()) return;
    const updatedPrayers = [...activeConv.contact.prayerRequests, newPrayerRequest.trim()];
    try {
      const updated = await updateContactProfile(activeConv.contact.id, {
        prayerRequests: updatedPrayers,
      });
      activeConv.contact = updated;
      setNewPrayerRequest('');
      showAlert('Motivo de oración registrado');
    } catch (err) {
      showAlert('Error agregando motivo de oración', 'error');
    }
  };

  // Simulate Webhook Call
  const handleRunWebhookTest = async () => {
    setTestingWebhook(true);
    try {
      const res = await triggerWebhookTest({
        contactName: simName,
        phoneNumber: simPhone,
        text: simText,
      });

      setWebhookLog(
        `✅ Webhook 200 OK | Firma HMAC: ${res.signatureHeader.slice(0, 24)}... | Mensaje recibido y clasificado.`
      );
      showAlert('Evento webhook recibido y verificado con HMAC SHA-256');

      // Refresh data
      const updatedConvs = await fetchConversations();
      setConversations(updatedConvs);
      if (res.conversation?.id) {
        setSelectedConvId(res.conversation.id);
      }
    } catch (err: any) {
      setWebhookLog('❌ Error en webhook: ' + err.message);
      showAlert('Falla al enviar prueba de webhook', 'error');
    } finally {
      setTestingWebhook(false);
    }
  };

  const isConnected = connection?.status === 'connected';

  return (
    <div className="space-y-6">
      
      {/* Action Alert Banner */}
      {actionAlert && (
        <div
          className={`px-4 py-3 rounded-2xl border text-sm flex items-center justify-between shadow-xs transition-all ${
            actionAlert.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : actionAlert.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-sky-50 border-sky-200 text-sky-800'
          }`}
        >
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="font-medium">{actionAlert.message}</span>
          </div>
          <button onClick={() => setActionAlert(null)} className="text-xs hover:opacity-75 font-semibold">
            Cerrar
          </button>
        </div>
      )}

      {/* TOP HEADER: WABA BRIDGE LIVE STATUS & CONTROLS */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Status Details */}
          <div className="flex items-start sm:items-center space-x-4">
            <div
              className={`relative flex items-center justify-center w-14 h-14 rounded-2xl border shrink-0 ${
                isConnected
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200/80'
                  : 'bg-amber-500/10 text-amber-600 border-amber-200/80'
              }`}
            >
              <MessageSquare className="w-7 h-7" />
              <div
                className={`w-3.5 h-3.5 rounded-full absolute -top-1 -right-1 border-2 border-white ${
                  isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'
                }`}
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                  Centro de Comunicaciones WhatsApp
                </h1>
                
                {isConnected ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    WasapFlow Bridge Conectado
                  </span>
                ) : connection?.mode === 'unconfigured' ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                    WasapFlow pendiente de configuración
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    Entorno de Desarrollo (Sin línea conectada)
                  </span>
                )}

                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800 border border-sky-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Webhook HMAC SHA-256
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-1.5 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <PhoneCall className={`w-3.5 h-3.5 ${isConnected ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <strong>Línea WABA:</strong>{' '}
                  <span className={isConnected ? 'font-bold text-slate-700' : 'italic text-slate-400'}>
                    {connection?.displayPhoneNumber || 'Ninguna línea conectada'}
                  </span>
                </span>
                <span>•</span>
                <span>
                  <strong>Nombre Verificado:</strong>{' '}
                  <span className={isConnected ? 'font-bold text-slate-700' : 'italic text-slate-400'}>
                    {connection?.verifiedName || 'No configurado'}
                  </span>
                </span>
                <span>•</span>
                <span>
                  <strong>Estado:</strong>{' '}
                  <span className={isConnected ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                    {isConnected ? 'EN LÍNEA' : 'Pendiente de Configuración'}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowWebhookModal(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1.5 transition-all"
            >
              <Activity className="w-3.5 h-3.5 text-sky-600" />
              <span>Simulador Webhook</span>
            </button>

            <button
              onClick={() => setShowCostModal(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1.5 transition-all"
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>Costos &amp; Métricas</span>
            </button>

            <button
              onClick={handleReconnect}
              disabled={loadingConnection}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingConnection ? 'animate-spin' : ''}`} />
              <span>Sincronizar WABA</span>
            </button>
          </div>

        </div>

        {/* Guidance notice if unconfigured */}
        {!isConnected && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/80">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-amber-950">
                <span className="font-bold">WasapFlow pendiente de configuración: </span>
                <span>
                  Para habilitar el envío y recepción con su número WABA real, declare <code className="bg-amber-200/70 px-1 py-0.5 rounded font-mono text-[11px]">WF_PARTNER_KEY</code> y <code className="bg-amber-200/70 px-1 py-0.5 rounded font-mono text-[11px]">WF_WEBHOOK_SECRET</code> en las variables de entorno de Vercel.
                </span>
              </div>
            </div>
            <span className="shrink-0 font-mono text-[11px] bg-white text-slate-600 px-2.5 py-1 rounded-lg border border-amber-200">
              Ruta Webhook: /api/webhook/wasapflow
            </span>
          </div>
        )}

      </div>

      {/* THREE-PANEL DESK: CONVERSATIONS | CHAT STREAM | PASTORAL COPILOT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* PANEL 1: CONVERSATION LIST (Col 4 on LG) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 shadow-xs flex flex-col h-[750px] overflow-hidden">
          
          {/* Search & Tabs */}
          <div className="p-4 border-b border-slate-100 space-y-3 bg-slate-50/50">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por nombre, número o texto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-[11px] font-semibold">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activeFilter === 'all'
                    ? 'bg-sky-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Todos ({conversations.length})
              </button>
              <button
                onClick={() => setActiveFilter('unread')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activeFilter === 'unread'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Sin responder
              </button>
              <button
                onClick={() => setActiveFilter('prayer')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activeFilter === 'prayer'
                    ? 'bg-sky-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                En Oración
              </button>
              <button
                onClick={() => setActiveFilter('crisis')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activeFilter === 'crisis'
                    ? 'bg-rose-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Crisis
              </button>
            </div>
          </div>

          {/* Conversation Cards List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2 space-y-1">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-12 px-4 text-xs text-slate-400">
                <MessageSquare className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p>No hay conversaciones en este filtro.</p>
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isSelected = conv.id === selectedConvId;
                return (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConvId(conv.id)}
                    className={`p-3 rounded-2xl cursor-pointer transition-all duration-150 flex items-start space-x-3 ${
                      isSelected
                        ? 'bg-sky-50 border border-sky-200/90 shadow-xs'
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={conv.contact.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'}
                        alt={conv.contact.name}
                        className="w-11 h-11 rounded-2xl object-cover border border-slate-200"
                      />
                      {conv.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="text-xs font-bold text-slate-800 truncate">{conv.contact.name}</h4>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">{conv.lastMessage.timestamp}</span>
                      </div>

                      <p className="text-[11px] text-slate-500 line-clamp-1 mb-1.5">
                        {conv.lastMessage.direction === 'outbound' && 'Tú: '}
                        {conv.lastMessage.text}
                      </p>

                      <div className="flex flex-wrap items-center gap-1">
                        {conv.contact.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                              tag === 'Crisis'
                                ? 'bg-rose-100 text-rose-700'
                                : tag === 'En Oración'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}

                        {conv.aiSuggestionPending && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-700 flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5" /> IA Pendiente
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* PANEL 2: ACTIVE CHAT STREAM (Col 5 on LG) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs flex flex-col h-[750px] overflow-hidden">
          
          {activeConv ? (
            <>
              {/* Chat Contact Header */}
              <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={activeConv.contact.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'}
                    alt={activeConv.contact.name}
                    className="w-10 h-10 rounded-2xl object-cover border border-slate-200"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <h3 className="text-sm font-bold text-slate-800 truncate">{activeConv.contact.name}</h3>
                      <span className="px-2 py-0.2 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {activeConv.contact.spiritualStatus}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">{activeConv.contact.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setShowAiDrawer(!showAiDrawer)}
                    className={`p-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                      showAiDrawer
                        ? 'bg-sky-50 text-sky-700 border-sky-200 shadow-xs'
                        : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
                    }`}
                    title="Alternar Copilot Pastoral"
                  >
                    <Sparkles className="w-4 h-4 text-sky-600" />
                    <span className="hidden sm:inline">Copilot IA</span>
                  </button>
                </div>
              </div>

              {/* Clinical / Pastoral Demarcation Notice */}
              <div className="px-4 py-2 bg-sky-50/70 border-b border-sky-100/80 flex items-center justify-between text-[11px] text-sky-800">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>
                    <strong>Canal Pastoral:</strong> Acompañamiento espiritual y psicoeducación basada en evidencia.
                  </span>
                </div>
                <button
                  onClick={onOpenCrisis}
                  className="text-rose-600 font-bold hover:underline shrink-0 text-[10px]"
                >
                  Riesgo / Protocolo Crisis
                </button>
              </div>

              {/* Messages Flow */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30">
                {loadingMessages ? (
                  <div className="flex items-center justify-center h-full text-xs text-slate-400">
                    <RefreshCw className="w-5 h-5 animate-spin mr-2 text-sky-600" />
                    Cargando historial de WhatsApp...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-16 text-xs text-slate-400">
                    Inicia la conversación pastoral por WhatsApp.
                  </div>
                ) : (
                  messages.map((m) => {
                    const isInbound = m.direction === 'inbound';
                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col ${isInbound ? 'items-start' : 'items-end'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs ${
                            isInbound
                              ? 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                              : 'bg-gradient-to-tr from-sky-700 to-sky-600 text-white rounded-tr-xs'
                          }`}
                        >
                          {/* Sender tag */}
                          <div className="flex items-center justify-between gap-3 mb-1 text-[10px] font-bold opacity-80">
                            <span>{isInbound ? activeConv.contact.name : 'Pastor / Equipo Pastoral'}</span>
                            {m.isAiGenerated && (
                              <span className="bg-sky-800/60 text-sky-200 px-1.5 py-0.2 rounded text-[9px] flex items-center gap-0.5">
                                <Sparkles className="w-2.5 h-2.5" /> Asistido por Gemini
                              </span>
                            )}
                          </div>

                          {/* Message Content */}
                          <div className="whitespace-pre-wrap">{m.text}</div>

                          {/* Timestamp & Delivery Ticks */}
                          <div
                            className={`flex items-center justify-end space-x-1 mt-1 text-[10px] ${
                              isInbound ? 'text-slate-400' : 'text-sky-200'
                            }`}
                          >
                            <span>{m.timestamp}</span>
                            {!isInbound && (
                              <span>
                                {m.status === 'read' ? (
                                  <CheckCheck className="w-3.5 h-3.5 text-emerald-300 inline" />
                                ) : m.status === 'delivered' ? (
                                  <CheckCheck className="w-3.5 h-3.5 text-sky-200 inline" />
                                ) : (
                                  <Check className="w-3.5 h-3.5 text-sky-200 inline" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Template & Quick Scripture Drawer */}
              <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/70 flex items-center space-x-2 text-xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
                  Plantillas WABA:
                </span>
                <select
                  value={selectedTemplate}
                  onChange={(e) => {
                    setSelectedTemplate(e.target.value);
                    handleSelectTemplate(e.target.value);
                  }}
                  className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500 max-w-[230px] truncate"
                >
                  <option value="">Seleccionar plantilla aprobada...</option>
                  {templates.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleGenerateAiSuggestion}
                  disabled={loadingAi}
                  className="ml-auto px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 flex items-center gap-1 transition-all disabled:opacity-50"
                  title="Sugerir respuesta con Gemini AI"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${loadingAi ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Generar Borrador IA</span>
                </button>
              </div>

              {/* Message Input Box */}
              <div className="p-3 border-t border-slate-200 bg-white">
                <div className="flex items-end space-x-2">
                  <textarea
                    rows={2}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Escribe un mensaje pastoral por WhatsApp (Enter para enviar)..."
                    className="flex-1 p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 resize-none"
                  />

                  <button
                    onClick={() => handleSendMessage()}
                    disabled={sending || !messageInput.trim()}
                    className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs transition-all disabled:opacity-40 disabled:hover:bg-emerald-600 flex items-center justify-center shrink-0"
                    title="Enviar por WhatsApp (WasapFlow Bridge)"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                  <span>Presiona Shift + Enter para salto de línea</span>
                  <span> WasapFlow Bridge v1 • Encriptación extremo a extremo</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 text-slate-400">
              <MessageSquare className="w-12 h-12 text-slate-300 mb-3" />
              <h3 className="text-sm font-bold text-slate-700 mb-1">Selecciona una conversación</h3>
              <p className="text-xs max-w-xs">Elige un contacto del panel izquierdo para comenzar el acompañamiento.</p>
            </div>
          )}

        </div>

        {/* PANEL 3: PASTORAL COPILOT & CONTACT DOSSIER (Col 3 on LG) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Section A: Asistente Pastoral IA (Aprobación Humana Obligatoria) */}
          <div className="bg-gradient-to-br from-white to-purple-50/40 rounded-3xl border border-purple-200/80 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-xl bg-purple-600 text-white shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    Copilot Pastoral IA
                  </h3>
                  <p className="text-[10px] text-slate-500 font-medium">Gemini 3.8 Flash • RV1960 • TCC</p>
                </div>
              </div>

              <button
                onClick={handleGenerateAiSuggestion}
                disabled={loadingAi || !activeConv}
                className="p-1.5 rounded-lg text-purple-700 hover:bg-purple-100 transition-all disabled:opacity-40"
                title="Generar nueva sugerencia"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingAi ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {loadingAi ? (
              <div className="py-8 text-center text-xs text-purple-700">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-purple-600" />
                <p className="font-semibold">Analizando conversación y tejiendo respuesta pastoral...</p>
                <p className="text-[10px] text-purple-500 mt-1">Revisando teología bíblica y herramientas TCC</p>
              </div>
            ) : aiSuggestion ? (
              <div className="space-y-3">
                {/* Need & Risk Badges */}
                <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span className="px-2 py-0.5 rounded-md font-bold bg-purple-100 text-purple-800 border border-purple-200">
                    {aiSuggestion.detectedNeed}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md font-bold border ${
                      aiSuggestion.riskLevel.includes('Alto')
                        ? 'bg-rose-100 text-rose-800 border-rose-300'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}
                  >
                    Riesgo: {aiSuggestion.riskLevel}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-600 italic bg-white/80 p-2.5 rounded-xl border border-purple-100">
                  "{aiSuggestion.summary}"
                </p>

                {/* Biblical Anchor */}
                <div className="bg-amber-50/80 border border-amber-200/80 p-2.5 rounded-xl text-xs space-y-1">
                  <div className="flex items-center space-x-1 text-amber-900 font-bold text-[11px]">
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                    <span>{aiSuggestion.biblicalAnchor.verse}</span>
                  </div>
                  <p className="text-[11px] text-amber-950 font-serif">"{aiSuggestion.biblicalAnchor.text}"</p>
                  <p className="text-[10px] text-amber-800 font-medium">{aiSuggestion.biblicalAnchor.pastoralReframe}</p>
                </div>

                {/* Draft Reply Area */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                    <span>Borrador Sugerido:</span>
                    <button
                      onClick={() => setMessageInput(aiSuggestion.draftReply)}
                      className="text-sky-600 hover:underline flex items-center gap-0.5 text-[10px]"
                    >
                      <Copy className="w-3 h-3" /> Editar en cuadro
                    </button>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-purple-200 text-xs text-slate-700 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap font-sans">
                    {aiSuggestion.draftReply}
                  </div>
                </div>

                {/* Mandatory Human Review Warning */}
                <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-[10px] text-amber-800 flex items-start gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Revisión obligatoria:</strong> Revisa el mensaje pastoral antes de despacharlo. Ningún mensaje de IA se envía sin confirmación del operador.
                  </span>
                </div>

                {/* Primary Button: Approve and Send via WasapFlow */}
                <button
                  onClick={() => handleSendMessage(aiSuggestion.draftReply, true)}
                  disabled={sending}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Aprobar y Enviar a WhatsApp</span>
                </button>
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-500 space-y-2">
                <p>Presiona el botón para que Gemini analice el diálogo y redacte una respuesta bíblica y empática.</p>
                <button
                  onClick={handleGenerateAiSuggestion}
                  disabled={!activeConv}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-xs inline-flex items-center gap-1.5 transition-all disabled:opacity-40"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generar Borrador</span>
                </button>
              </div>
            )}
          </div>

          {/* Section B: Ficha Pastoral del Contacto */}
          {activeConv && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                <User className="w-4 h-4 text-sky-600" />
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Ficha Pastoral
                </h3>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Notas Pastorales Confidenciales:
                </label>
                <textarea
                  rows={3}
                  value={contactNotes}
                  onChange={(e) => setContactNotes(e.target.value)}
                  placeholder="Añadir observaciones sobre el proceso..."
                  className="w-full p-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
                <button
                  onClick={handleSaveContact}
                  disabled={savingContact}
                  className="mt-1 px-3 py-1 rounded-lg text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
                >
                  {savingContact ? 'Guardando...' : 'Guardar Notas'}
                </button>
              </div>

              {/* Prayer Requests */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-600">
                  Motivos de Oración Activos:
                </label>
                <div className="space-y-1">
                  {activeConv.contact.prayerRequests.map((pr, idx) => (
                    <div
                      key={idx}
                      className="px-2.5 py-1.5 rounded-lg bg-sky-50 text-sky-800 text-[11px] flex items-center justify-between"
                    >
                      <span className="truncate">🙏 {pr}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-1 pt-1">
                  <input
                    type="text"
                    placeholder="Nuevo motivo..."
                    value={newPrayerRequest}
                    onChange={(e) => setNewPrayerRequest(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddPrayer()}
                    className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-slate-200 focus:outline-none"
                  />
                  <button
                    onClick={handleAddPrayer}
                    className="p-1 rounded-lg bg-sky-600 text-white hover:bg-sky-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* MODAL 1: COST MONITOR & TRANSPARENCY BREAKDOWN */}
      {showCostModal && analytics && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-slate-800 text-base">Costos Operativos &amp; Métricas</h3>
              </div>
              <button onClick={() => setShowCostModal(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Mensajes Enviados</span>
                <span className="text-lg font-black text-slate-800">{analytics.totalMessagesSent}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Mensajes Recibidos</span>
                <span className="text-lg font-black text-slate-800">{analytics.totalMessagesReceived}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Tasa de Entrega</span>
                <span className="text-lg font-black text-emerald-600">{analytics.deliveryRate}%</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Tasa de Lectura</span>
                <span className="text-lg font-black text-sky-600">{analytics.readRate}%</span>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2 border-t border-slate-100 pt-3">
              <h4 className="text-xs font-bold text-slate-700">Desglose de Costos Mensuales Estimados:</h4>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>WasapFlow Bridge API v1 (Suscripción WABA)</span>
                  <span className="font-bold">${analytics.estimatedCosts.wasapFlowMonthlyUsd.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Meta Cloud Conversations (Sesiones de servicio)</span>
                  <span className="font-bold">${analytics.estimatedCosts.metaConversationsUsd.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Google Gemini 3.8 Flash (Tokens de Asistente)</span>
                  <span className="font-bold">${analytics.estimatedCosts.geminiAiUsd.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Firebase Firestore &amp; Auth (Persistencia)</span>
                  <span className="font-bold text-emerald-600">$0.00 (Nivel Gratuito)</span>
                </div>
                <div className="flex justify-between py-2 text-sm font-black text-slate-800">
                  <span>Costo Total Estimado</span>
                  <span className="text-emerald-700">${analytics.estimatedCosts.totalUsd.toFixed(2)} USD / mes</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowCostModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs"
            >
              Cerrar Panel
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: WEBHOOK TEST SIMULATOR */}
      {showWebhookModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-sky-600" />
                <h3 className="font-extrabold text-slate-800 text-base">Simulador de Webhook WasapFlow</h3>
              </div>
              <button onClick={() => setShowWebhookModal(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Prueba la recepción del webhook oficial (POST /api/webhook/wasapflow), la validación de la firma criptográfica HMAC SHA-256 en el encabezado <code className="bg-slate-100 px-1 py-0.5 rounded text-sky-700">x-wasapflow-signature</code> y la deduplicación de eventos.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre del Remitente:</label>
                <input
                  type="text"
                  value={simName}
                  onChange={(e) => setSimName(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Número de Teléfono (E.164):</label>
                <input
                  type="text"
                  value={simPhone}
                  onChange={(e) => setSimPhone(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mensaje de WhatsApp Entrante:</label>
                <textarea
                  rows={3}
                  value={simText}
                  onChange={(e) => setSimText(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 focus:outline-none resize-none"
                />
              </div>
            </div>

            {webhookLog && (
              <div className="p-3 bg-slate-900 text-emerald-400 rounded-xl text-[11px] font-mono break-all">
                {webhookLog}
              </div>
            )}

            <div className="flex items-center space-x-2 pt-2">
              <button
                onClick={() => setShowWebhookModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
              >
                Cerrar
              </button>
              <button
                onClick={handleRunWebhookTest}
                disabled={testingWebhook}
                className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{testingWebhook ? 'Procesando...' : 'Disparar Webhook'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
