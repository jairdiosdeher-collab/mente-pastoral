import React, { useState, useEffect } from 'react';
import { Activity, Play, Pause, RotateCcw, CheckCircle2, X, Sparkles, Brain, Shield } from 'lucide-react';

interface WellnessExercisesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WellnessExercisesModal: React.FC<WellnessExercisesModalProps> = ({ isOpen, onClose }) => {
  const [selectedExercise, setSelectedExercise] = useState<'breathing' | 'stop' | 'defusion' | 'reframe'>('breathing');

  // Breathing state (4-4-4)
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhala' | 'Retén' | 'Exhala'>('Inhala');
  const [breathCount, setBreathCount] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  useEffect(() => {
    let timer: any = null;
    if (isBreathingActive) {
      timer = setInterval(() => {
        setBreathCount((prev) => {
          if (prev > 1) return prev - 1;

          // Transition to next phase
          if (breathPhase === 'Inhala') {
            setBreathPhase('Retén');
            return 4;
          } else if (breathPhase === 'Retén') {
            setBreathPhase('Exhala');
            return 4;
          } else {
            setBreathPhase('Inhala');
            setCyclesCompleted((c) => c + 1);
            return 4;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBreathingActive, breathPhase]);

  const resetBreathing = () => {
    setIsBreathingActive(false);
    setBreathPhase('Inhala');
    setBreathCount(4);
    setCyclesCompleted(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-sky-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-emerald-600 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Ejercicios de Bienestar &amp; Psicoeducación</h2>
              <p className="text-xs text-sky-100">Herramientas validadas (TCC, ACT, DBT) adaptadas al cuidado pastoral</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center space-x-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setSelectedExercise('breathing')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              selectedExercise === 'breathing'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            1. Respiración 4-4-4
          </button>
          <button
            onClick={() => setSelectedExercise('stop')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              selectedExercise === 'stop'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            2. Técnica STOP (DBT)
          </button>
          <button
            onClick={() => setSelectedExercise('defusion')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              selectedExercise === 'defusion'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            3. Defusión (ACT)
          </button>
          <button
            onClick={() => setSelectedExercise('reframe')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              selectedExercise === 'reframe'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            4. Reencuadre (TCC)
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700 text-xs sm:text-sm">
          
          {/* EXERCISE 1: BREATHING */}
          {selectedExercise === 'breathing' && (
            <div className="space-y-4 text-center">
              <div>
                <h3 className="font-extrabold text-base text-slate-800">
                  Respiración Diafragmática 4-4-4 con Anclaje Bíblico
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Regula el sistema nervioso parasimpático y aquieta el ritmo cardíaco (Salmo 46:10: "Estad quietos, y conoced que yo soy Dios").
                </p>
              </div>

              {/* Visual Breathing Circle */}
              <div className="flex flex-col items-center justify-center py-6">
                <div
                  className={`relative flex items-center justify-center w-44 h-44 rounded-full border-4 transition-all duration-1000 ${
                    breathPhase === 'Inhala'
                      ? 'scale-110 border-sky-400 bg-sky-50 shadow-xl'
                      : breathPhase === 'Retén'
                      ? 'scale-105 border-emerald-400 bg-emerald-50'
                      : 'scale-90 border-slate-300 bg-slate-50'
                  }`}
                >
                  <div className="text-center">
                    <span className="block text-lg font-black text-slate-800 tracking-wider uppercase">
                      {breathPhase}
                    </span>
                    <span className="text-3xl font-extrabold text-sky-600">{breathCount}</span>
                    <span className="block text-[10px] text-slate-400 mt-1">
                      {breathPhase === 'Inhala' && 'Recibe la paz de Dios'}
                      {breathPhase === 'Retén' && 'Descansa en su gracia'}
                      {breathPhase === 'Exhala' && 'Suelta la ansiedad'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mt-4 font-semibold">
                  Ciclos completados: <span className="font-bold text-sky-700">{cyclesCompleted}</span>
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsBreathingActive(!isBreathingActive)}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-bold text-white shadow-md flex items-center gap-2 transition-all ${
                    isBreathingActive
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  {isBreathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isBreathingActive ? 'Pausar' : 'Comenzar Ejercicio'}</span>
                </button>

                <button
                  onClick={resetBreathing}
                  className="px-4 py-2.5 rounded-2xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar</span>
                </button>
              </div>
            </div>
          )}

          {/* EXERCISE 2: STOP DBT */}
          {selectedExercise === 'stop' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-800">
                  Técnica STOP de DBT (Para Momentos de Alta Tensión)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Evita reacciones impulsivas de enojo, pánico o desánimo frente a una dificultad.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-100 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-xs">S</span>
                    <strong className="text-sky-950 font-bold">Stop (Detente)</strong>
                  </div>
                  <p className="text-slate-600 pl-8">No reacciones inmediatamente. No hables ni tomes decisiones en el pico de la emoción.</p>
                </div>

                <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">T</span>
                    <strong className="text-emerald-950 font-bold">Take a step back (Da un paso atrás)</strong>
                  </div>
                  <p className="text-slate-600 pl-8">Toma una respiración profunda. Suelta tus hombros y aléjate física o mentalmente del foco de estrés.</p>
                </div>

                <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-100 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center text-xs">O</span>
                    <strong className="text-purple-950 font-bold">Observe (Observa)</strong>
                  </div>
                  <p className="text-slate-600 pl-8">Observa qué sientes en tu cuerpo y qué pensamientos cruzan tu mente sin juzgarte.</p>
                </div>

                <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-100 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center text-xs">P</span>
                    <strong className="text-amber-950 font-bold">Proceed with grace (Procede con gracia)</strong>
                  </div>
                  <p className="text-slate-600 pl-8">Pregúntate: "¿Qué respuesta traerá paz y honrará a Dios en esta situación?" (Santiago 1:19).</p>
                </div>
              </div>
            </div>
          )}

          {/* EXERCISE 3: DEFUSION ACT */}
          {selectedExercise === 'defusion' && (
            <div className="space-y-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-800">
                  Defusión Cognitiva (ACT): Tú no eres tus pensamientos
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Aprende a desengancharte de las narrativas mentales catastróficas.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <p className="font-semibold text-slate-800">Pasos prácticos de defusión:</p>
                <ol className="list-decimal pl-5 space-y-2 text-slate-600 leading-relaxed">
                  <li>
                    <strong>Identifica el pensamiento ansioso:</strong> Por ejemplo, <em>"Todo va a salir mal y voy a fracasar"</em>.
                  </li>
                  <li>
                    <strong>Añade la frase de observación:</strong> En lugar de creértelo como un hecho, di en silencio: <em>"Estoy teniendo el pensamiento de que todo va a salir mal"</em>.
                  </li>
                  <li>
                    <strong>Reconócelo como una hipótesis:</strong> Un pensamiento no es una profecía ni un mandato divino. Es solo una propuesta que tu mente produce en fatiga.
                  </li>
                  <li>
                    <strong>Anclaje en 2 Corintios 10:5:</strong> Llevamos cautivo todo pensamiento a la obediencia a Cristo.
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* EXERCISE 4: REFRAME TCC */}
          {selectedExercise === 'reframe' && (
            <div className="space-y-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-800">
                  Reencuadre Cognitivo en 3 Columnas (TCC + Romanos 12:2)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Renovación del entendimiento sustituyendo distorsiones por verdades objetivas y bíblicas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200">
                  <span className="font-bold text-rose-800 block mb-1">1. Pensamiento Negativo</span>
                  <p className="text-slate-600 italic">"No puedo con esta carga, nadie se preocupa por mí."</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                  <span className="font-bold text-amber-800 block mb-1">2. Distorsión Detectada</span>
                  <p className="text-slate-600">Generalización y filtro negativo (descalificar las evidencias de afecto).</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <span className="font-bold text-emerald-800 block mb-1">3. Verdad Renovada</span>
                  <p className="text-slate-600">"El momento es difícil, pero Dios ha sido fiel antes y hay personas que me aman (1 Pedro 5:7)."</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Práctica gratuita de regulación emocional • Sin registro
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-900 transition-all"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
