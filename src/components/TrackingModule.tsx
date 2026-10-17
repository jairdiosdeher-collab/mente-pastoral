import React, { useState } from 'react';
import { 
  Calendar, 
  TrendingUp, 
  Smile, 
  Sparkles, 
  Activity, 
  Flame, 
  Moon, 
  Battery, 
  AlertTriangle, 
  Plus, 
  Check, 
  ArrowUpRight,
  Heart
} from 'lucide-react';
import { DailyCheckIn } from '../types';

interface TrackingModuleProps {
  checkIns: DailyCheckIn[];
  onAddCheckIn: (checkIn: DailyCheckIn) => void;
}

export const TrackingModule: React.FC<TrackingModuleProps> = ({ checkIns, onAddCheckIn }) => {
  const [showModal, setShowModal] = useState(false);

  // New Check-in Form State
  const [moodScore, setMoodScore] = useState(7);
  const [moodLabel, setMoodLabel] = useState('Tranquilo y esperanzado');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>(['Paz', 'Gratitud']);
  const [spiritualScore, setSpiritualScore] = useState(8);
  const [spiritualState, setSpiritualState] = useState('En paz con Dios');
  const [motivationScore, setMotivationScore] = useState(7);
  const [sleepHours, setSleepHours] = useState(7.5);
  const [energyScore, setEnergyScore] = useState(7);
  const [goalsCompleted, setGoalsCompleted] = useState(80);
  const [notes, setNotes] = useState('');

  const emotionOptions = [
    'Paz', 'Gratitud', 'Esperanza', 'Alegría', 'Serenidad',
    'Ansiedad', 'Cansancio', 'Sobrecarga', 'Tristeza', 'Duda', 'Culpa', 'Irritabilidad'
  ];

  const spiritualStatesList = [
    'En paz con Dios',
    'Comunión íntima y agradecida',
    'Buscando dirección y sabiduría',
    'Sensación de sequía o silencio',
    'Clamando en medio de aflicción',
    'Crecimiento y renovación',
  ];

  const toggleEmotion = (emo: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(emo) ? prev.filter((e) => e !== emo) : [...prev, emo]
    );
  };

  const handleSaveCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: DailyCheckIn = {
      id: `chk-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      moodScore,
      moodLabel,
      emotions: selectedEmotions,
      spiritualScore,
      spiritualState,
      goalsCompleted,
      motivationScore,
      sleepHours,
      energyScore,
      notes: notes.trim(),
    };

    onAddCheckIn(newEntry);
    setShowModal(false);
    setNotes('');
  };

  // Metrics calculations
  const avgMood = (checkIns.reduce((sum, c) => sum + c.moodScore, 0) / Math.max(1, checkIns.length)).toFixed(1);
  const avgSpiritual = (checkIns.reduce((sum, c) => sum + c.spiritualScore, 0) / Math.max(1, checkIns.length)).toFixed(1);
  const avgMotivation = (checkIns.reduce((sum, c) => sum + c.motivationScore, 0) / Math.max(1, checkIns.length)).toFixed(1);
  const avgSleep = (checkIns.reduce((sum, c) => sum + c.sleepHours, 0) / Math.max(1, checkIns.length)).toFixed(1);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-sky-100 text-xs font-bold uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4 text-emerald-300" />
            <span>Módulo 4 • Monitoreo Continuo &amp; Métricas</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Seguimiento Inteligente
          </h1>
          <p className="text-sky-100 text-xs sm:text-sm max-w-xl mt-1">
            Visualiza tu evolución emocional, conexión espiritual con Dios y adherencia diaria a tus hábitos de restauración.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-3 rounded-2xl bg-white text-sky-800 hover:bg-sky-50 font-bold text-xs sm:text-sm shadow-md shadow-sky-900/20 transition-all hover:scale-105 flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4 text-sky-600" />
          <span>Registrar Check-In de Hoy</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Ánimo Promedio</span>
            <Smile className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{avgMood} <span className="text-xs text-slate-400 font-normal">/ 10</span></div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +0.8 respecto a semana previa
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Paz Espiritual</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{avgSpiritual} <span className="text-xs text-slate-400 font-normal">/ 10</span></div>
          <span className="text-[11px] text-emerald-600 font-semibold">Comunión activa y constante</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Nivel Motivación</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{avgMotivation} <span className="text-xs text-slate-400 font-normal">/ 10</span></div>
          <span className="text-[11px] text-slate-500 font-medium">Metas SMART en avance</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Descanso &amp; Sueño</span>
            <Moon className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{avgSleep}h <span className="text-xs text-slate-400 font-normal">promedio</span></div>
          <span className="text-[11px] text-slate-500 font-medium">Mayordomía del cuerpo</span>
        </div>
      </div>

      {/* Interactive Bar Chart: Emotional Mood & Spiritual Score across check-ins */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">Tendencia Emocional &amp; Espiritual (Últimos Registros)</h3>
            <p className="text-xs text-slate-500">Comparativa de estado de ánimo (Azul) y conexión espiritual (Verde)</p>
          </div>
          <div className="flex items-center space-x-4 text-xs font-semibold">
            <span className="flex items-center space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-sky-500" />
              <span>Ánimo</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>Espíritu</span>
            </span>
          </div>
        </div>

        {/* Visual Bar Graph */}
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-52 border-b border-slate-200 pb-2">
            {checkIns.slice(-7).map((entry) => {
              const moodHeight = (entry.moodScore / 10) * 100;
              const spiritualHeight = (entry.spiritualScore / 10) * 100;
              const dateFormatted = entry.date.slice(5);

              return (
                <div key={entry.id} className="flex flex-col items-center h-full justify-end group">
                  <div className="flex items-end space-x-1 sm:space-x-1.5 w-full justify-center h-full">
                    
                    {/* Mood Bar */}
                    <div
                      style={{ height: `${moodHeight}%` }}
                      className="w-3 sm:w-5 bg-sky-500 rounded-t-md transition-all duration-300 group-hover:bg-sky-600 relative"
                      title={`Ánimo: ${entry.moodScore}/10 - ${entry.moodLabel}`}
                    >
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1 py-0.5 rounded-sm whitespace-nowrap z-10 transition-opacity">
                        {entry.moodScore}
                      </span>
                    </div>

                    {/* Spiritual Bar */}
                    <div
                      style={{ height: `${spiritualHeight}%` }}
                      className="w-3 sm:w-5 bg-emerald-500 rounded-t-md transition-all duration-300 group-hover:bg-emerald-600 relative"
                      title={`Espiritual: ${entry.spiritualScore}/10 - ${entry.spiritualState}`}
                    >
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1 py-0.5 rounded-sm whitespace-nowrap z-10 transition-opacity">
                        {entry.spiritualScore}
                      </span>
                    </div>

                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold mt-2">{dateFormatted}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Early Warning Badges */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Alertas Tempranas &amp; Señales Preventivas</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100 flex items-start space-x-3">
            <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-sky-900">Protector: Anclaje de Fe Sostenido</span>
              <p className="text-slate-600 mt-0.5">Tu conexión espiritual se ha mantenido por encima de 7/10 en el 85% de tus registros, lo que amortigua significativamente el estrés laboral.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-100 flex items-start space-x-3">
            <Moon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-900">Atención: Higiene de Sueño</span>
              <p className="text-slate-600 mt-0.5">En los días con menos de 6 horas de sueño se apreció una leve caída en la motivación. Protege tu hora de apagar pantallas.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Check-ins History List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Historial Reciente de Check-Ins</h3>
        
        <div className="space-y-3">
          {checkIns.slice().reverse().map((entry) => (
            <div key={entry.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-800">{entry.date}</span>
                  <span className="text-[10px] font-bold bg-sky-100 text-sky-700 px-2 py-0.5 rounded-md">
                    {entry.moodLabel}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 text-[11px] text-slate-500">
                  {entry.emotions.map((e, idx) => (
                    <span key={idx} className="bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      {e}
                    </span>
                  ))}
                </div>
                {entry.notes && (
                  <p className="italic text-slate-600 text-[11px] mt-1">"{entry.notes}"</p>
                )}
              </div>

              <div className="flex items-center space-x-3 text-right shrink-0">
                <div className="text-center px-2 py-1 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Ánimo</span>
                  <span className="font-extrabold text-sky-700 text-sm">{entry.moodScore}/10</span>
                </div>
                <div className="text-center px-2 py-1 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Espiritual</span>
                  <span className="font-extrabold text-emerald-700 text-sm">{entry.spiritualScore}/10</span>
                </div>
                <div className="text-center px-2 py-1 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Sueño</span>
                  <span className="font-extrabold text-slate-700 text-sm">{entry.sleepHours}h</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHECK-IN REGISTRATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-sky-100 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="bg-gradient-to-r from-sky-700 to-emerald-600 px-6 py-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base">Registrar Check-In Diario</h3>
                <p className="text-xs text-sky-100">Examen de conciencia y corazón con honestidad</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-white/80 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveCheckIn} className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
              
              {/* Mood Score */}
              <div>
                <div className="flex justify-between items-center font-bold mb-1">
                  <span>Estado de Ánimo Emocional:</span>
                  <span className="text-sky-600 text-sm">{moodScore} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={moodScore}
                  onChange={(e) => setMoodScore(parseInt(e.target.value, 10))}
                  className="w-full accent-sky-600"
                />
              </div>

              {/* Mood Label */}
              <div>
                <label className="font-bold block mb-1">Describe tu estado en una frase breve:</label>
                <input
                  type="text"
                  value={moodLabel}
                  onChange={(e) => setMoodLabel(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  placeholder="Ej: Tranquilo con leve cansancio"
                />
              </div>

              {/* Emotion tags */}
              <div>
                <label className="font-bold block mb-1.5">Emociones presentes hoy (selecciona las que apliquen):</label>
                <div className="flex flex-wrap gap-1.5">
                  {emotionOptions.map((emo) => {
                    const isSelected = selectedEmotions.includes(emo);
                    return (
                      <button
                        type="button"
                        key={emo}
                        onClick={() => toggleEmotion(emo)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                          isSelected
                            ? 'bg-sky-600 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {emo}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Spiritual Score & State */}
              <div>
                <div className="flex justify-between items-center font-bold mb-1">
                  <span>Conexión Espiritual / Paz con Dios:</span>
                  <span className="text-emerald-600 text-sm">{spiritualScore} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={spiritualScore}
                  onChange={(e) => setSpiritualScore(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Estado espiritual:</label>
                <select
                  value={spiritualState}
                  onChange={(e) => setSpiritualState(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                >
                  {spiritualStatesList.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* Sleep Hours & Motivation */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Horas de sueño:</label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="14"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Nivel motivación (1-10):</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={motivationScore}
                    onChange={(e) => setMotivationScore(parseInt(e.target.value, 10))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="font-bold block mb-1">Oración, reflexión o notas del día:</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-400 focus:outline-none text-xs"
                  placeholder="¿Por qué estás agradecido/a hoy? ¿Qué carga entregaste a Dios?"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-600 text-white font-bold shadow-md shadow-sky-600/20"
                >
                  Guardar Check-In
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
