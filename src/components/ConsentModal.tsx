import React from 'react';
import { ShieldCheck, AlertCircle, BookCheck, Lock, HeartHandshake, X } from 'lucide-react';

interface ConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onClose: () => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ isOpen, onAccept, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-sky-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-emerald-600 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Marco Ético y Consentimiento Informado</h2>
              <p className="text-xs text-sky-100">PastoralMente Integral • Cuidado de tu corazón y mente</p>
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
        <div className="p-6 overflow-y-auto space-y-4 text-slate-700 text-sm leading-relaxed">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900">
              <span className="font-bold">Aviso Clínico Esencial:</span> Esta aplicación{' '}
              <strong>NO emite diagnósticos médicos ni psiquiátricos</strong> y no sustituye la
              atención directa de un profesional médico, psiquiatra o psicólogo clínico licenciado.
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <BookCheck className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">1. Propósito y Alcance</h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  PastoralMente Integral es una herramienta interactiva de psicoeducación, autoconocimiento,
                  seguimiento de hábitos y orientación espiritual que armoniza principios bíblicos cristianos con
                  modelos psicológicos validados empíricamente (TCC, ACT, DBT, Psicología Positiva).
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">2. Detección Preventiva y Derivación</h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  La plataforma cuenta con alertas tempranas y un protocolo de intervención en crisis. Si el sistema o
                  tú perciben señales de riesgo severo (ideación suicida, autolesiones o violencia), se te orientará
                  de inmediato a contactar a las líneas de emergencia oficiales y a tu red de apoyo presencial.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Lock className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">3. Confidencialidad y Privacidad</h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Tus registros en el diario, respuestas en evaluaciones y oraciones son privados. Si decides compartir
                  acceso con tu pastor o psicólogo tratante a través del panel, ellos estarán sujetos al deber ético y
                  pastoral de reserva y sigilo.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <HeartHandshake className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">4. Participación Voluntaria y Gracia</h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Tu avance se basa en la gracia, no en la condenación. Puedes avanzar a tu propio ritmo, modificar tus
                  metas o pausar en cualquier momento.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 text-center sm:text-left">
            Al presionar "Aceptar y Continuar", declaras conocer el alcance de este acompañamiento.
          </span>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-semibold text-xs hover:bg-slate-100 transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={onAccept}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all hover:scale-[1.02]"
            >
              Aceptar y Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
