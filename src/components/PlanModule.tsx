import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Target, 
  Calendar, 
  BookOpen, 
  Brain, 
  Flame, 
  RefreshCw,
  Plus,
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { GrowthPlan, SmartObjective, DailyActivity, HabitItem } from '../types';

interface PlanModuleProps {
  plan: GrowthPlan;
  onUpdatePlan: (updatedPlan: GrowthPlan) => void;
  onRegenerateRequest: () => void;
}

export const PlanModule: React.FC<PlanModuleProps> = ({
  plan,
  onUpdatePlan,
  onRegenerateRequest,
}) => {
  const [activePlanTab, setActivePlanTab] = useState<'objectives' | 'daily' | 'exercises' | 'biblical' | 'habits'>('daily');

  const toggleObjective = (id: string) => {
    const updatedObjectives = plan.smartObjectives.map((obj) =>
      obj.id === id ? { ...obj, completed: !obj.completed } : obj
    );
    onUpdatePlan({ ...plan, smartObjectives: updatedObjectives });
  };

  const toggleMilestone = (week: number) => {
    const updatedMilestones = plan.weeklyMilestones.map((m) =>
      m.week === week ? { ...m, completed: !m.completed } : m
    );
    onUpdatePlan({ ...plan, weeklyMilestones: updatedMilestones });
  };

  const toggleDailyActivity = (id: string) => {
    const updatedActivities = plan.dailyActivities.map((act) =>
      act.id === id ? { ...act, completed: !act.completed } : act
    );
    onUpdatePlan({ ...plan, dailyActivities: updatedActivities });
  };

  const toggleHabit = (id: string) => {
    const updatedHabits = plan.habits.map((h) => {
      if (h.id === id) {
        const newDone = !h.doneToday;
        return {
          ...h,
          doneToday: newDone,
          streak: newDone ? h.streak + 1 : Math.max(0, h.streak - 1),
        };
      }
      return h;
    });
    onUpdatePlan({ ...plan, habits: updatedHabits });
  };

  const completedActivitiesCount = plan.dailyActivities.filter((a) => a.completed).length;
  const progressDaily = Math.round((completedActivitiesCount / Math.max(1, plan.dailyActivities.length)) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Plan Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-sky-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Módulo 2 • Plan de Crecimiento Personalizado IA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {plan.title}
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-2xl mt-1.5 leading-relaxed">
            {plan.summary}
          </p>
          <div className="flex items-center space-x-4 mt-3 text-xs text-emerald-200">
            <span>Actualizado: {plan.updatedAt}</span>
            <span>•</span>
            <span className="font-bold">Progreso Diario: {progressDaily}%</span>
          </div>
        </div>

        <button
          onClick={onRegenerateRequest}
          className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs flex items-center space-x-2 transition-all shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Regenerar con IA</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-1 text-xs font-bold scrollbar-none">
        <button
          onClick={() => setActivePlanTab('daily')}
          className={`px-4 py-2.5 rounded-2xl transition-all whitespace-nowrap flex items-center space-x-2 ${
            activePlanTab === 'daily'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Actividades Diarias ({completedActivitiesCount}/{plan.dailyActivities.length})</span>
        </button>

        <button
          onClick={() => setActivePlanTab('objectives')}
          className={`px-4 py-2.5 rounded-2xl transition-all whitespace-nowrap flex items-center space-x-2 ${
            activePlanTab === 'objectives'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Objetivos SMART &amp; Metas</span>
        </button>

        <button
          onClick={() => setActivePlanTab('exercises')}
          className={`px-4 py-2.5 rounded-2xl transition-all whitespace-nowrap flex items-center space-x-2 ${
            activePlanTab === 'exercises'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>Ejercicios Psicológicos</span>
        </button>

        <button
          onClick={() => setActivePlanTab('biblical')}
          className={`px-4 py-2.5 rounded-2xl transition-all whitespace-nowrap flex items-center space-x-2 ${
            activePlanTab === 'biblical'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Reflexiones Bíblicas</span>
        </button>

        <button
          onClick={() => setActivePlanTab('habits')}
          className={`px-4 py-2.5 rounded-2xl transition-all whitespace-nowrap flex items-center space-x-2 ${
            activePlanTab === 'habits'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Plan de Hábitos</span>
        </button>
      </div>

      {/* TAB CONTENT */}

      {/* 1. ACTIVIDADES DIARIAS */}
      {activePlanTab === 'daily' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Ruta Diaria de Acompañamiento</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Micro-acciones diseñadas para cultivar paz mental y cercanía con Dios sin sobrecargarte.
                </p>
              </div>
              <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                {progressDaily}% completado hoy
              </span>
            </div>

            <div className="space-y-3">
              {plan.dailyActivities.map((act) => (
                <div
                  key={act.id}
                  onClick={() => toggleDailyActivity(act.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3.5 ${
                    act.completed
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                      : 'bg-slate-50/80 border-slate-200 hover:border-sky-300 hover:bg-sky-50/30'
                  }`}
                >
                  <button className="mt-0.5 text-slate-400 hover:text-emerald-600">
                    {act.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className={`text-sm font-bold ${act.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                        {act.title}
                      </h4>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-600">
                        {act.type.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. OBJETIVOS SMART & METAS SEMANALES */}
      {activePlanTab === 'objectives' && (
        <div className="space-y-6">
          {/* SMART Objectives */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-9 h-9 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Objetivos SMART (Específicos, Medibles, Alcanzables, Relevantes y Temporales)</h3>
                <p className="text-xs text-slate-500">Diseñados por la IA según tu evaluación de entrada</p>
              </div>
            </div>

            <div className="grid gap-3.5">
              {plan.smartObjectives.map((obj) => (
                <div
                  key={obj.id}
                  onClick={() => toggleObjective(obj.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3 ${
                    obj.completed
                      ? 'bg-emerald-50/50 border-emerald-200 text-slate-500'
                      : 'bg-slate-50 border-slate-200 hover:border-sky-300'
                  }`}
                >
                  <div className="mt-0.5">
                    {obj.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-sm font-bold ${obj.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                        {obj.title}
                      </span>
                      <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md">
                        {obj.category}
                      </span>
                      <span className="text-[10px] text-slate-500 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{obj.timeframe}</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      <strong>Meta concreta:</strong> {obj.target}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Milestones */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <span>Metas Semanales de Restauración</span>
            </h3>

            <div className="grid gap-3">
              {plan.weeklyMilestones.map((m) => (
                <div
                  key={m.week}
                  onClick={() => toggleMilestone(m.week)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3.5 ${
                    m.completed
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-slate-50 border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 font-extrabold flex items-center justify-center shrink-0 text-xs">
                    S{m.week}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-slate-800">Semana {m.week}</span>
                    <p className={`text-xs mt-0.5 ${m.completed ? 'line-through text-slate-500' : 'text-slate-700'}`}>
                      {m.focus}
                    </p>
                  </div>
                  <div>
                    {m.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. EJERCICIOS PSICOLÓGICOS */}
      {activePlanTab === 'exercises' && (
        <div className="grid gap-5">
          {plan.psychologicalExercises.map((ex, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{ex.name}</h3>
                    <span className="text-xs text-sky-700 font-semibold">Modelo: {ex.model}</span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  Práctica Terapéutica Guiada
                </span>
              </div>

              <p className="text-xs text-slate-600 bg-sky-50/60 p-3 rounded-2xl border border-sky-100">
                <strong>Propósito:</strong> {ex.purpose}
              </p>

              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Pasos de Aplicación:</h4>
                {ex.steps.map((st, stepIdx) => (
                  <div key={stepIdx} className="flex items-start space-x-3 text-xs text-slate-700 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {stepIdx + 1}
                    </span>
                    <span className="leading-relaxed">{st}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. REFLEXIONES BÍBLICAS */}
      {activePlanTab === 'biblical' && (
        <div className="grid gap-5">
          {plan.biblicalReflections.map((ref, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">{ref.verse}</h3>
                  <span className="text-xs text-emerald-700 font-semibold">Palabra Viva &amp; Renovación Mental</span>
                </div>
              </div>

              <blockquote className="p-4 rounded-2xl bg-emerald-50/60 border-l-4 border-emerald-500 italic text-xs text-emerald-950 leading-relaxed">
                "{ref.text}"
              </blockquote>

              <div className="space-y-2 text-xs text-slate-700">
                <div>
                  <h4 className="font-bold text-slate-900 mb-0.5">Reflexión Pastoral:</h4>
                  <p className="leading-relaxed text-slate-600">{ref.reflection}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h4 className="font-bold text-slate-900 mb-0.5">Aplicación para hoy:</h4>
                  <p className="text-slate-600">{ref.lifeApplication}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. PLAN DE HÁBITOS */}
      {activePlanTab === 'habits' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Mayordomía de Hábitos y Racha</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Pequeñas victorias diarias construyen la fortaleza interior de tu templo.
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            {plan.habits.map((h) => (
              <div
                key={h.id}
                onClick={() => toggleHabit(h.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  h.doneToday
                    ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div className="mt-0.5">
                    {h.doneToday ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${h.doneToday ? 'text-emerald-900 font-extrabold' : 'text-slate-800'}`}>
                      {h.name}
                    </h4>
                    <span className="text-[11px] text-slate-500">{h.frequency}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{h.streak} días racha</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
