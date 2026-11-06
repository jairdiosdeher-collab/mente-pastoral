import React, { useState } from 'react';
import { ShieldCheck, Lock, Key, AlertCircle, X, Stethoscope, CheckCircle2 } from 'lucide-react';

interface ProfessionalAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ProfessionalAccessModal: React.FC<ProfessionalAccessModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode.trim()) {
      setError('Por favor ingrese el código de acceso ministerial.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/professional-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessCode: accessCode.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.authorized) {
        setIsSuccess(true);
        if (data.token) {
          sessionStorage.setItem('pastoralmente_prof_token', data.token);
        }
        setTimeout(() => {
          setIsSuccess(false);
          setAccessCode('');
          onSuccess();
          onClose();
        }, 600);
      } else {
        setError(data.error || 'Código ministerial incorrecto o no autorizado por el servidor.');
      }
    } catch (err: any) {
      setError('No se pudo conectar con el servidor de autenticación pastoral.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-md">
                <Stethoscope className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <h3 className="text-base font-bold">Acceso Ministerial &amp; Clínico</h3>
                <p className="text-xs text-emerald-100">Panel Pastor / Psicólogo Colegiado</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/20 text-white/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Protección de Confidencialidad:</strong> Este panel contiene expedientes, notas SOAP y seguimiento pastoral protegido por el secreto pastoral y el código deontológico psicológico.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Clave de Acceso Ministerial
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Ingrese el código de acceso"
                  className="w-full px-4 py-3 pl-11 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                  autoFocus
                />
                <Key className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                Clave asignada para liderazgo pastoral y equipo de salud mental autorizado.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {error}
              </div>
            )}

            {isSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Acceso autorizado. Cargando panel...</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isLoading ? 'Verificando...' : 'Ingresar al Panel'}</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
