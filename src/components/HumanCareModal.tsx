import React, { useState } from 'react';
import { HeartHandshake, PhoneCall, Mail, MessageSquare, Send, CheckCircle2, X, ShieldCheck } from 'lucide-react';

interface HumanCareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCrisis: () => void;
}

export const HumanCareModal: React.FC<HumanCareModalProps> = ({ isOpen, onClose, onOpenCrisis }) => {
  const [name, setName] = useState('');
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email'>('whatsapp');
  const [contactValue, setContactValue] = useState('');
  const [prayerReason, setPrayerReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerReason.trim()) return;

    // Save prayer request locally
    const existing = JSON.parse(localStorage.getItem('pastoralmente_human_requests') || '[]');
    existing.push({
      id: `req-${Date.now()}`,
      name: name.trim() || 'Consultante anónimo',
      contactMethod,
      contactValue: contactValue.trim(),
      prayerReason: prayerReason.trim(),
      date: new Date().toISOString(),
    });
    localStorage.setItem('pastoralmente_human_requests', JSON.stringify(existing));

    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setContactValue('');
    setPrayerReason('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-sky-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-emerald-600 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <HeartHandshake className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Acompañamiento Humano</h2>
              <p className="text-xs text-sky-100">Orientación pastoral personal • Confidencial y gratuita</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-extrabold text-base text-slate-800">
                Tu solicitud ha sido recibida con amor
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Un pastor o consejero de nuestro equipo orará por tu motivo. Si dejaste un dato de contacto, te responderemos con respeto y confidencialidad.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs"
              >
                Volver al Inicio
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-slate-600 text-xs leading-relaxed">
                No estás solo/a. Si deseas que un pastor u orientador humano ore por ti o te brinde una palabra de aliento, déjanos tu motivo de forma totalmente voluntaria y sin registro.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tu nombre o cómo prefieres que te llamemos (Opcional):
                </label>
                <input
                  type="text"
                  placeholder="Ej. María o Hermano David"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ¿Cómo te gustaría ser contactado/a? (Opcional)
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <button
                    type="button"
                    onClick={() => setContactMethod('whatsapp')}
                    className={`py-2 px-3 rounded-xl border font-semibold flex items-center justify-center gap-1.5 ${
                      contactMethod === 'whatsapp'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactMethod('email')}
                    className={`py-2 px-3 rounded-xl border font-semibold flex items-center justify-center gap-1.5 ${
                      contactMethod === 'email'
                        ? 'bg-sky-50 text-sky-800 border-sky-300'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Correo</span>
                  </button>
                </div>

                <input
                  type="text"
                  placeholder={contactMethod === 'whatsapp' ? 'Número WhatsApp (ej. +57 300 123 4567)' : 'Tu correo electrónico'}
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tu motivo de oración o situación que deseas compartir: *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Cuéntanos con libertad en qué podemos acompañarte o por qué deseas que oremos..."
                  value={prayerReason}
                  onChange={(e) => setPrayerReason(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/30 resize-none"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Tus datos son tratados bajo estricta confidencialidad pastoral. Nunca se comparten con terceros ni se usan con fines comerciales.
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={onOpenCrisis}
                  className="text-xs text-rose-600 font-bold hover:underline"
                >
                  ¿Situación de emergencia? Ver líneas 24/7
                </button>

                <button
                  type="submit"
                  disabled={!prayerReason.trim()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white font-extrabold text-xs shadow-md transition-all disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Solicitud</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
