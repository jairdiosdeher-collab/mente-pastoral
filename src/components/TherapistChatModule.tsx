import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  Send, 
  Sparkles, 
  Brain, 
  BookOpen, 
  ShieldAlert, 
  RefreshCw, 
  User, 
  Bot,
  AlertCircle
} from 'lucide-react';
import { ChatMessage, AssessmentResult } from '../types';
import { sendChatMessage } from '../services/api';

interface TherapistChatModuleProps {
  assessmentResult: AssessmentResult;
  onOpenCrisis: () => void;
}

export const TherapistChatModule: React.FC<TherapistChatModuleProps> = ({
  assessmentResult,
  onOpenCrisis,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-init',
      sender: 'assistant',
      content: `¡Paz y gracia para ti! Soy tu Asistente Terapéutico y Orientador Espiritual en PastoralMente Integral.

Estoy aquí para escucharte sin juzgarte, ayudarte a ordenar tus pensamientos a la luz de la psicología basada en evidencia (TCC, ACT, DBT) y recordarte las promesas inmutables de Dios para tu restauración.

¿Qué estás experimentando en tu mente o en tu corazón el día de hoy?`,
      timestamp: 'Ahora',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Siento mucha ansiedad e incertidumbre hoy',
    '¿Cómo puedo perdonar a alguien que me hirió profundamente?',
    'Siento que Dios está distante de mi situación',
    'Me exijo demasiado y me castigo con culpa',
    'Técnica rápida para frenar un ataque de angustia',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    // Immediate Crisis trigger detection
    const lower = text.toLowerCase();
    const crisisKeywords = ['suicid', 'matarme', 'acabar con mi vida', 'quitarme la vida', 'hacerme daño', 'cortarme', 'no quiero vivir'];
    const isCrisisDetected = crisisKeywords.some((kw) => lower.includes(kw));

    if (isCrisisDetected) {
      onOpenCrisis();
    }

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const historyPayload = messages
        .filter((m) => m.id !== 'm-init')
        .concat(userMsg)
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          content: m.content,
        }));

      const reply = await sendChatMessage(historyPayload, {
        resilienceScore: assessmentResult.emotionalProfile.resilienceScore,
        dominantState: assessmentResult.emotionalProfile.dominantState,
      });

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-emerald-600 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold">Asistente Terapéutico y Pastoral IA</h1>
              <span className="text-[10px] bg-emerald-400 text-emerald-950 font-extrabold uppercase px-2 py-0.5 rounded-full">
                En Línea
              </span>
            </div>
            <p className="text-xs text-sky-100 mt-0.5">
              Coach emocional • Orientador espiritual • Educador psicológico
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: `m-init-${Date.now()}`,
                sender: 'assistant',
                content: 'He reiniciado nuestra conversación. Respira profundo. ¿En qué podemos reflexionar juntos hoy?',
                timestamp: 'Ahora',
              },
            ]);
          }}
          className="p-2 rounded-xl text-sky-100 hover:text-white hover:bg-white/10 transition-colors"
          title="Reiniciar diálogo"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Clinical Boundary Reminder */}
      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center space-x-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            Espacio de escucha y psicoeducación. No sustituye terapia presencial ni emite diagnósticos médicos.
          </span>
        </div>
        <button
          onClick={onOpenCrisis}
          className="font-bold text-rose-600 hover:underline shrink-0"
        >
          ¿En crisis? Pulsa aquí
        </button>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[560px] overflow-hidden">
        
        {/* Messages List */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                    isUser
                      ? 'bg-sky-600 text-white'
                      : 'bg-gradient-to-tr from-sky-500 to-emerald-500 text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[82%] sm:max-w-[75%] p-4 rounded-3xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-sky-600 text-white rounded-tr-xs'
                      : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-xs shadow-2xs whitespace-pre-wrap'
                  }`}
                >
                  <p>{m.content}</p>
                  <div
                    className={`text-[10px] mt-2 font-medium ${
                      isUser ? 'text-sky-200 text-right' : 'text-slate-400'
                    }`}
                  >
                    {m.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-sky-500 to-emerald-500 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-3xl rounded-tl-xs flex items-center space-x-2 text-xs text-slate-500">
                <div className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-100" />
                <div className="w-2 h-2 rounded-full bg-sky-600 animate-bounce delay-200" />
                <span className="ml-1 font-medium">Discerniendo con empatía y base bíblica...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Chips */}
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/70 overflow-x-auto flex gap-2 scrollbar-none">
          {suggestedPrompts.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              disabled={isLoading}
              className="text-[11px] font-semibold bg-white border border-slate-200 hover:border-sky-300 text-slate-700 px-3 py-1.5 rounded-full whitespace-nowrap hover:bg-sky-50 transition-all shrink-0"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe lo que sientes en tu mente o corazón..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white rounded-2xl shadow-md shadow-sky-600/20 disabled:opacity-40 transition-all hover:scale-105"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
