import React, { useState } from 'react';
import { 
  Brain, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Heart, 
  Cross, 
  Activity, 
  Flame, 
  ChevronRight, 
  RotateCcw,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { AssessmentQuestion, AssessmentResult, GrowthPlan } from '../types';
import { INITIAL_ASSESSMENT_QUESTIONS, INITIAL_ASSESSMENT_RESULT } from '../data/mockData';
import { generatePersonalizedPlan } from '../services/api';

interface EvaluationModuleProps {
  currentResult: AssessmentResult;
  onSaveResult: (result: AssessmentResult) => void;
  onPlanGenerated: (plan: GrowthPlan) => void;
  onNavigateToPlan: () => void;
}

export const EvaluationModule: React.FC<EvaluationModuleProps> = ({
  currentResult,
  onSaveResult,
  onPlanGenerated,
  onNavigateToPlan,
}) => {
  const [questions, setQuestions] = useState<AssessmentQuestion[]>(INITIAL_ASSESSMENT_QUESTIONS);
  const [activeStep, setActiveStep] = useState<'form' | 'results'>('results');
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [primaryGoalInput, setPrimaryGoalInput] = useState('Superar la ansiedad y consolidar mi tiempo devocional');

  const handleScoreChange = (id: string, val: number) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, value: val } : q))
    );
  };

  const calculateResults = () => {
    // Group answers by category and normalize to 0-100 scale
    const categoryTotals: Record<string, { sum: number; count: number }> = {};

    questions.forEach((q) => {
      if (!categoryTotals[q.category]) {
        categoryTotals[q.category] = { sum: 0, count: 0 };
      }
      categoryTotals[q.category].sum += q.value;
      categoryTotals[q.category].count += 1;
    });

    const getScore = (cat: string) => {
      const item = categoryTotals[cat];
      if (!item || item.count === 0) return 50;
      // 1 to 5 mapped to 20 to 100
      return Math.round((item.sum / (item.count * 5)) * 100);
    };

    const estresScore = getScore('estres');
    const ansiedadScore = getScore('ansiedad');
    const animoScore = getScore('animo');
    const autoestimaScore = getScore('autoestima');
    const satisfaccionScore = getScore('satisfaccion');
    const espiritualidadScore = getScore('espiritualidad');
    const familiaScore = getScore('familia');
    const parejaScore = getScore('pareja');
    const habitosScore = getScore('habitos');

    // Generate dynamic profiles
    const resilience = Math.round((espiritualidadScore * 0.4 + autoestimaScore * 0.3 + satisfaccionScore * 0.3));

    const newResult: AssessmentResult = {
      completedAt: new Date().toISOString().split('T')[0],
      scores: {
        estres: estresScore,
        ansiedad: ansiedadScore,
        animo: animoScore,
        autoestima: autoestimaScore,
        satisfaccion: satisfaccionScore,
        espiritualidad: espiritualidadScore,
        familia: familiaScore,
        pareja: parejaScore,
        habitos: habitosScore,
      },
      emotionalProfile: {
        dominantState: ansiedadScore > 65 
          ? 'Alerta ansiosa elevada con necesidad de anclaje somático y descanso'
          : estresScore > 65
          ? 'Sobrecarga y fatiga ejecutiva acumulada'
          : animoScore < 50
          ? 'Desánimo y fatiga espiritual con necesidad de activación conductual'
          : 'Equilibrio emocional estable con resiliencia activa',
        description: `Tu perfil indica una resiliencia global de ${resilience}%. Cuentas con un anclaje espiritual significativo (${espiritualidadScore}/100) que actúa como factor protector fundamental frente a los estresores cotidianos.`,
        resilienceScore: resilience,
      },
      spiritualProfile: {
        connectionWithGod: espiritualidadScore > 75 
          ? 'Comunión constante y búsqueda activa de dirección en la Palabra' 
          : 'Deseo sincero de reconexión pero con sensación de sequía o prisa',
        prayerLife: 'Oración sincera, con oportunidad de profundizar en la quietud contemplativa',
        faithInAdversity: 'Confianza en que Dios tiene el control aun cuando las circunstancias sean inciertas',
      },
      strengths: [
        'Sensibilidad espiritual e interés genuino en la verdad bíblica',
        'Disposición hacia la autorreflexión y el crecimiento personal',
        'Reconocimiento de la necesidad de gracia y perdón en las relaciones',
        'Compromiso con hábitos constructivos de autocuidado',
      ],
      growthAreas: [
        ...(ansiedadScore > 50 ? ['Aprender técnicas de reencuadre cognitivo ante pensamientos catastróficos'] : []),
        ...(estresScore > 50 ? ['Establecer límites sanos al exceso de trabajo y exigencias ajenas'] : []),
        ...(habitosScore < 70 ? ['Priorizar el descanso biológico y la higiene de sueño como templo de Dios'] : []),
        'Integrar momentos diarios de respiración diafragmática y silencio contemplativo',
      ],
    };

    onSaveResult(newResult);
    setActiveStep('results');
  };

  const handleGeneratePlan = async () => {
    setIsGeneratingPlan(true);
    try {
      const plan = await generatePersonalizedPlan(currentResult, primaryGoalInput);
      onPlanGenerated(plan);
      onNavigateToPlan();
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const dimensionList = [
    { key: 'espiritualidad', label: 'Vida Espiritual', score: currentResult.scores.espiritualidad, color: 'bg-sky-500' },
    { key: 'autoestima', label: 'Autoestima & Identidad', score: currentResult.scores.autoestima, color: 'bg-emerald-500' },
    { key: 'satisfaccion', label: 'Satisfacción Vital', score: currentResult.scores.satisfaccion, color: 'bg-indigo-500' },
    { key: 'animo', label: 'Estado de Ánimo', score: currentResult.scores.animo, color: 'bg-teal-500' },
    { key: 'pareja', label: 'Relación de Pareja', score: currentResult.scores.pareja, color: 'bg-rose-500' },
    { key: 'familia', label: 'Vínculos Familiares', score: currentResult.scores.familia, color: 'bg-amber-500' },
    { key: 'habitos', label: 'Hábitos Saludables', score: currentResult.scores.habitos, color: 'bg-emerald-600' },
    { key: 'estres', label: 'Nivel de Estrés (Sobrecarga)', score: currentResult.scores.estres, color: currentResult.scores.estres > 60 ? 'bg-amber-500' : 'bg-slate-400' },
    { key: 'ansiedad', label: 'Nivel de Ansiedad', score: currentResult.scores.ansiedad, color: currentResult.scores.ansiedad > 60 ? 'bg-rose-500' : 'bg-slate-400' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-sky-100 text-xs font-bold uppercase tracking-wider mb-1">
              <Brain className="w-4 h-4 text-emerald-300" />
              <span>Módulo 1 • Diagnóstico Psicoespiritual</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Evaluación Inicial Integral
            </h1>
            <p className="text-sky-100 text-sm max-w-2xl mt-1">
              Explora 9 dimensiones esenciales de tu bienestar. Combinamos escalas psicológicas validadas con discernimiento bíblico para trazar tu mapa de restauración.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
            <button
              onClick={() => setActiveStep('results')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeStep === 'results' ? 'bg-white text-sky-800 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              Ver Perfil Actual
            </button>
            <button
              onClick={() => setActiveStep('form')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeStep === 'form' ? 'bg-white text-sky-800 shadow-sm' : 'text-white/80 hover:text-white'
              }`}
            >
              Responder Cuestionario
            </button>
          </div>
        </div>
      </div>

      {/* FORM VIEW */}
      {activeStep === 'form' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Cuestionario Diagnóstico (Escala de 1 a 5)</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Sé honesto/a contigo mismo/a. Esta herramienta no es para juzgarte, sino para bendecirte y encontrar claridad.
            </p>
          </div>

          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-2.5 py-0.5 rounded-md">
                    {q.categoryLabel}
                  </span>
                  <span className="text-xs font-extrabold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                    Puntuación: {q.value} / 5
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-800">
                  {idx + 1}. {q.prompt}
                </p>

                {/* Score Selector (1 to 5 buttons) */}
                <div className="pt-2">
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleScoreChange(q.id, val)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                          q.value === val
                            ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30 scale-102 ring-2 ring-sky-300'
                            : 'bg-white text-slate-600 border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 mt-2 px-1">
                    <span>1: {q.minLabel}</span>
                    <span>5: {q.maxLabel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <span className="text-xs text-slate-500">
              Todas las preguntas completadas ({questions.length}/{questions.length}).
            </span>
            <button
              onClick={calculateResults}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              <span>Generar Resultados del Perfil</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* RESULTS VIEW */}
      {activeStep === 'results' && (
        <div className="space-y-6">
          
          {/* 4 Cards: Emocional, Espiritual, Fortalezas, Áreas de Mejora */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Perfil Emocional */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Perfil Emocional</h3>
                  <span className="text-xs text-sky-600 font-semibold">Resiliencia: {currentResult.emotionalProfile.resilienceScore}%</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-100">
                <span className="text-xs font-bold text-sky-900 block mb-0.5">Estado Dominante:</span>
                <p className="text-xs text-sky-800 font-medium">{currentResult.emotionalProfile.dominantState}</p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {currentResult.emotionalProfile.description}
              </p>
            </div>

            {/* Perfil Espiritual */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Perfil Espiritual</h3>
                  <span className="text-xs text-emerald-600 font-semibold">Anclaje en la Fe &amp; Comunión</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-800 block">Comunión con Dios:</span>
                  <span className="text-slate-600">{currentResult.spiritualProfile.connectionWithGod}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-800 block">Vida de Oración:</span>
                  <span className="text-slate-600">{currentResult.spiritualProfile.prayerLife}</span>
                </div>
              </div>
            </div>

            {/* Fortalezas Detectadas */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Perfil de Fortalezas</h3>
                  <span className="text-xs text-teal-600 font-semibold">Recursos que Dios ha puesto en ti</span>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                {currentResult.strengths.map((str, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Áreas de Mejora */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Áreas de Mejora Prioritarias</h3>
                  <span className="text-xs text-amber-600 font-semibold">Camino de transformación</span>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                {currentResult.growthAreas.map((area, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Dimension Progress Bars */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-slate-900">Desglose por Dimensiones Psicoespirituales (0 - 100)</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dimensionList.map((dim) => (
                <div key={dim.key} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-800">
                    <span>{dim.label}</span>
                    <span className="font-bold">{dim.score}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${dim.color} transition-all duration-500`}
                      style={{ width: `${Math.min(100, Math.max(10, dim.score))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Plan Generation Callout */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="bg-white/20 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                Módulo 2 • IA Generativa
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Generar Plan de Crecimiento Personalizado
              </h3>
              <p className="text-emerald-100 text-xs sm:text-sm">
                La Inteligencia Artificial creará automáticamente tus Objetivos SMART, metas semanales, ejercicios psicológicos (TCC, ACT, DBT) y reflexiones bíblicas basadas en este perfil.
              </p>
              
              <div className="pt-2">
                <label className="text-[11px] font-semibold text-emerald-100 block mb-1">
                  Tu meta u oración principal en este tiempo:
                </label>
                <input
                  type="text"
                  value={primaryGoalInput}
                  onChange={(e) => setPrimaryGoalInput(e.target.value)}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-3 py-2 text-xs text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Ej: Calmar la ansiedad laboral y aprender a perdonar a mi familia"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={() => setActiveStep('form')}
                className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/30 font-semibold text-xs text-white transition-all text-center"
              >
                Volver a Evaluar
              </button>

              <button
                onClick={handleGeneratePlan}
                disabled={isGeneratingPlan}
                className="px-6 py-3.5 rounded-2xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/20 transition-all hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>{isGeneratingPlan ? 'Generando Plan con IA...' : 'Crear Plan con IA Ahora'}</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
