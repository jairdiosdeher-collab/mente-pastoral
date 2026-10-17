import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  PhoneCall, 
  Wind, 
  Eye, 
  Users, 
  Heart, 
  X, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { CRISIS_RESOURCES, INITIAL_SUPPORT_CONTACTS } from '../data/mockData';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose }) => {
  const [activeCrisisTab, setActiveCrisisTab] = useState<'breathing' | 'grounding' | 'hotlines' | 'support'>('breathing');
  const [selectedCountry, setSelectedCountry] = useState<string>('Colombia');

  // Breathing Box Timer
  const [breathingPhase, setBreathingPhase] = useState<'Inhala' | 'Sostén' | 'Exhala' | 'Pausa'>('Inhala');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [isBreathingActive, setIsBreathingActive] = useState(true);

  useEffect(() => {
    if (!isOpen || !isBreathingActive || activeCrisisTab !== 'breathing') return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;

        setBreathingPhase((currPhase) => {
          switch (currPhase) {
            case 'Inhala': return 'Sostén';
            case 'Sostén': return 'Exhala';
            case 'Exhala': return 'Pausa';
            case 'Pausa': return 'Inhala';
          }
        });
        return 4;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isBreathingActive, activeCrisisTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-rose-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Banner Alert Header */}
        <div className="bg-gradient-to-r from-rose-600 via-rose-700 to-amber-700 px-5 sm:px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center animate-pulse">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-extrabold tracking-tight">Centro de Intervención en Crisis</h2>
                <span className="bg-rose-900/60 text-rose-100 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                  24/7 Disponible
                </span>
              </div>
              <p className="text-xs text-rose-100 font-medium">Tu vida es valiosa y sagrada para Dios. No estás solo.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-rose-100 hover:text-white hover:bg-white/10 transition-colors"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-4 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveCrisisTab('breathing')}
            className={`py-3 px-2 flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-1.5 transition-all ${
              activeCrisisTab === 'breathing'
                ? 'bg-white text-rose-700 border-b-2 border-rose-600 shadow-xs'
                : 'hover:bg-slate-200/60'
            }`}
          >
            <Wind className="w-4 h-4 text-rose-600" />
            <span className="text-[11px] sm:text-xs">Respiración</span>
          </button>

          <button
            onClick={() => setActiveCrisisTab('grounding')}
            className={`py-3 px-2 flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-1.5 transition-all ${
              activeCrisisTab === 'grounding'
                ? 'bg-white text-rose-700 border-b-2 border-rose-600 shadow-xs'
                : 'hover:bg-slate-200/60'
            }`}
          >
            <Eye className="w-4 h-4 text-rose-600" />
            <span className="text-[11px] sm:text-xs">Anclaje 5-4-3-2-1</span>
          </button>

          <button
            onClick={() => setActiveCrisisTab('hotlines')}
            className={`py-3 px-2 flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-1.5 transition-all ${
              activeCrisisTab === 'hotlines'
                ? 'bg-white text-rose-700 border-b-2 border-rose-600 shadow-xs'
                : 'hover:bg-slate-200/60'
            }`}
          >
            <PhoneCall className="w-4 h-4 text-rose-600" />
            <span className="text-[11px] sm:text-xs">Líneas de Ayuda</span>
          </button>

          <button
            onClick={() => setActiveCrisisTab('support')}
            className={`py-3 px-2 flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-1.5 transition-all ${
              activeCrisisTab === 'support'
                ? 'bg-white text-rose-700 border-b-2 border-rose-600 shadow-xs'
                : 'hover:bg-slate-200/60'
            }`}
          >
            <Users className="w-4 h-4 text-rose-600" />
            <span className="text-[11px] sm:text-xs">Red de Apoyo</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-700 flex-1">
          
          {/* TAB 1: BREATHING */}
          {activeCrisisTab === 'breathing' && (
            <div className="flex flex-col items-center text-center space-y-5 py-2">
              <div className="max-w-md">
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  Respiración Cuadrada 4x4 &amp; Salmo 46:10
                </span>
                <p className="text-xs text-slate-500 mt-2">
                  Esta técnica biológica desacelera el ritmo cardíaco y envía señales directas de calma a tu sistema nervioso.
                </p>
              </div>

              {/* Animated Circle */}
              <div className="relative flex items-center justify-center my-4">
                <div 
                  className={`w-48 h-48 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-1000 ${
                    breathingPhase === 'Inhala' 
                      ? 'scale-115 border-sky-400 bg-sky-50 shadow-xl shadow-sky-200' 
                      : breathingPhase === 'Sostén'
                      ? 'scale-115 border-emerald-400 bg-emerald-50 shadow-xl shadow-emerald-200'
                      : breathingPhase === 'Exhala'
                      ? 'scale-90 border-amber-400 bg-amber-50 shadow-md shadow-amber-200'
                      : 'scale-90 border-slate-300 bg-slate-50'
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {breathingPhase}
                  </span>
                  <span className="text-4xl font-extrabold text-slate-800 my-1">
                    {secondsLeft}s
                  </span>
                  <span className="text-[11px] text-slate-500 px-4">
                    {breathingPhase === 'Inhala' && 'Llena tus pulmones de paz'}
                    {breathingPhase === 'Sostén' && 'Descansa en Su cuidado'}
                    {breathingPhase === 'Exhala' && 'Suelta el temor y la tensión'}
                    {breathingPhase === 'Pausa' && 'Paz... Todo estará bien'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200/80 max-w-lg w-full text-left flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div className="text-xs text-sky-900">
                  <span className="font-bold">Ancla Bíblica:</span> "Estad quietos, y conoced que yo soy Dios; seré exaltado entre las naciones; enaltecido seré en la tierra." (Salmo 46:10)
                </div>
              </div>

              <button
                onClick={() => setIsBreathingActive(!isBreathingActive)}
                className="text-xs font-semibold px-4 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-600 transition-colors"
              >
                {isBreathingActive ? 'Pausar Guía' : 'Reanudar Guía'}
              </button>
            </div>
          )}

          {/* TAB 2: GROUNDING 5-4-3-2-1 */}
          {activeCrisisTab === 'grounding' && (
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <strong>Técnica Sensorial de Desescalada:</strong> Cuando sientas un ataque de pánico o pensamientos desbordantes, regresa tu mente al presente a través de tus 5 sentidos:
              </div>

              <div className="grid gap-2.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
                  <span className="w-7 h-7 rounded-lg bg-sky-600 text-white font-extrabold flex items-center justify-center shrink-0 text-sm">5</span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Mira a tu alrededor</h4>
                    <p className="text-xs text-slate-600">Nombra 5 cosas que puedes ver en este momento (un cuadro, tus manos, la luz, un mueble, un reloj).</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
                  <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-extrabold flex items-center justify-center shrink-0 text-sm">4</span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Siente físicamente</h4>
                    <p className="text-xs text-slate-600">Toca 4 cosas a tu alcance (la textura de tu ropa, la firmeza del suelo bajo tus pies, la temperatura de tus manos).</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
                  <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-extrabold flex items-center justify-center shrink-0 text-sm">3</span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Escucha con atención</h4>
                    <p className="text-xs text-slate-600">Identifica 3 sonidos presentes (el viento, el zumbido de un aparato, el sonido de tu respiración).</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
                  <span className="w-7 h-7 rounded-lg bg-amber-600 text-white font-extrabold flex items-center justify-center shrink-0 text-sm">2</span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Percibe olores</h4>
                    <p className="text-xs text-slate-600">Inhala e identifica 2 aromas en el aire (un café, perfume o el aire fresco de la ventana).</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
                  <span className="w-7 h-7 rounded-lg bg-rose-600 text-white font-extrabold flex items-center justify-center shrink-0 text-sm">1</span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Saborea o di una verdad</h4>
                    <p className="text-xs text-slate-600">Toma un sorbo de agua fría o di en voz alta: "Estoy a salvo aquí y ahora, Dios está conmigo".</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HOTLINES */}
          {activeCrisisTab === 'hotlines' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-xs text-rose-900">
                  <span className="font-bold">Líneas Oficiales Gratuitas y Confidenciales:</span> Si sientes deseos de hacerte daño o estás en medio de una crisis severa, llama inmediatamente. Hay profesionales listos para escucharte con amor y sin juzgarte.
                </div>
              </div>

              <div className="grid gap-2.5">
                {CRISIS_RESOURCES.map((res, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-rose-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-slate-900">{res.country}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                          {res.available}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{res.label}</p>
                    </div>

                    <a
                      href={`tel:${res.phone.replace(/[^0-9+*]/g, '')}`}
                      className="inline-flex items-center justify-center space-x-2 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-all"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Llamar: {res.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PERSONAL SUPPORT NETWORK */}
          {activeCrisisTab === 'support' && (
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                <strong>Tu Red de Cuidado Personal:</strong> Personas de confianza designadas previamente para acompañarte pastoral o emocionalmente en momentos difíciles.
              </div>

              <div className="grid gap-3">
                {INITIAL_SUPPORT_CONTACTS.map((c) => (
                  <div key={c.id} className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-sm">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">{c.name}</h4>
                        <p className="text-[11px] text-slate-500">{c.relationship}</p>
                      </div>
                    </div>

                    <a
                      href={`tel:${c.phone}`}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 font-bold text-xs"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{c.phone}</span>
                    </a>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <h4 className="font-bold text-slate-800">Frase para pedir ayuda si te cuesta hablar:</h4>
                <p className="italic text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                  "Hola, estoy pasando por un momento muy difícil y necesito que me escuches o me acompañes un rato. ¿Podemos hablar?"
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[11px] text-slate-500">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Dios no te ha desamparado. Hay esperanza para ti.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs transition-colors"
          >
            Cerrar Protocolo
          </button>
        </div>
      </div>
    </div>
  );
};
