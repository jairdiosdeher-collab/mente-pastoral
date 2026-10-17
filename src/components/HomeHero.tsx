import React from 'react';
import { 
  Heart, 
  Sparkles, 
  Brain, 
  Compass, 
  BookOpen, 
  Activity, 
  ShieldAlert, 
  BookHeart, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Flame,
  Users
} from 'lucide-react';
import { ActiveTab, AssessmentResult, GrowthPlan } from '../types';

interface HomeHeroProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCrisis: () => void;
  onOpenConsent: () => void;
  assessmentResult: AssessmentResult;
  plan: GrowthPlan;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  setActiveTab,
  onOpenCrisis,
  onOpenConsent,
  assessmentResult,
  plan,
}) => {
  const psychologicalModels = [
    { title: 'TCC (Cognitivo Conductual)', desc: 'Identifica y reestructura pensamientos automáticos distorsionados.' },
    { title: 'ACT (Aceptación y Compromiso)', desc: 'Defusión cognitiva y acciones alineadas a tus valores bíblicos.' },
    { title: 'DBT (Dialéctica Conductual)', desc: 'Tolerancia al malestar, técnica STOP y mente sabia con el Espíritu.' },
    { title: 'Psicología Positiva', desc: 'Cultivo de fortalezas, gratitud intencional y resiliencia en la aflicción.' },
    { title: 'Terapia Centrada en Soluciones', desc: 'Foco en recursos previos y en la fidelidad demostrada de Dios.' },
    { title: 'Entrevista Motivacional', desc: 'Acompañamiento sin juzgar para vencer la ambivalencia al cambio.' },
    { title: 'Terapia Sistémica Familiar', desc: 'Sanidad de vínculos, límites de amor y ruptura de ciclos tóxicos.' },
    { title: 'Terapia Narrativa', desc: 'Reescribe tu historia: el dolor no define tu destino en Cristo.' },
    { title: 'Manejo de Crisis', desc: 'Protocolos de desescalada, anclaje sensorial 5-4-3-2-1 y líneas de auxilio.' },
    { title: 'Psicoeducación', desc: 'Conocimiento biológico y emocional que derriba estigmas y culpas.' },
  ];

  const biblicalFoundations = [
    'Esperanza (Rom. 15:13)',
    'Perdón (Col. 3:13)',
    'Restauración (1 Pe. 5:10)',
    'Renovación mental (Rom. 12:2)',
    'Identidad y propósito (Ef. 2:10)',
    'Fe y resiliencia (Stg. 1:2-4)',
    'Relaciones saludables (1 Cor. 13)',
    'Manejo de emociones (Salmos)',
    'Sanidad interior (Sal. 147:3)',
    'Crecimiento espiritual (2 Pe. 1:5)',
  ];

  const completedActivitiesToday = plan.dailyActivities.filter((a) => a.completed).length;

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-800 via-sky-700 to-emerald-700 rounded-3xl p-6 sm:p-10 text-white shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20 text-xs font-bold text-sky-100">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>PastoralMente Integral • Salud Mental &amp; Fe Cristiana</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Crecimiento Espiritual, Salud Mental y Restauración Emocional
          </h1>

          <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
            Un puente compasivo entre los principios eternos de la Palabra de Dios y los modelos psicológicos basados en evidencia científica. Restauramos mente, corazón y relaciones.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('assessment')}
              className="px-6 py-3.5 rounded-2xl bg-white text-sky-900 hover:bg-sky-50 font-bold text-xs sm:text-sm shadow-lg shadow-sky-950/20 transition-all hover:scale-105 flex items-center space-x-2"
            >
              <Brain className="w-4 h-4 text-sky-600" />
              <span>Realizar Evaluación Inicial</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('therapist')}
              className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/20 transition-all hover:scale-105 flex items-center space-x-2"
            >
              <Heart className="w-4 h-4" />
              <span>Hablar con Asistente IA</span>
            </button>

            <button
              onClick={onOpenCrisis}
              className="px-5 py-3.5 rounded-2xl bg-rose-600/90 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center space-x-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>SOS Crisis 24/7</span>
            </button>
          </div>
        </div>

        {/* Decorative backdrop blobs */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-32 -top-16 w-64 h-64 bg-sky-400/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Daily Snapshot Status Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div 
          onClick={() => setActiveTab('plan')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 hover:border-emerald-300 shadow-xs cursor-pointer transition-all hover:shadow-md flex items-center space-x-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">Mi Plan Diario</span>
            <h4 className="text-sm font-bold text-slate-900">{completedActivitiesToday} de {plan.dailyActivities.length} actividades hoy</h4>
            <span className="text-xs text-slate-500">Toca para marcar tus ejercicios</span>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('tracking')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 hover:border-sky-300 shadow-xs cursor-pointer transition-all hover:shadow-md flex items-center space-x-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider block">Estado Psicoespiritual</span>
            <h4 className="text-sm font-bold text-slate-900">Resiliencia: {assessmentResult.emotionalProfile.resilienceScore}%</h4>
            <span className="text-xs text-slate-500">Monitoreo y tendencias</span>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('journal')}
          className="bg-white rounded-3xl p-5 border border-slate-200/80 hover:border-indigo-300 shadow-xs cursor-pointer transition-all hover:shadow-md flex items-center space-x-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
            <BookHeart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">Diario TCC &amp; Oración</span>
            <h4 className="text-sm font-bold text-slate-900">Reencuadre de Pensamientos</h4>
            <span className="text-xs text-slate-500">Detecta distorsiones con IA</span>
          </div>
        </div>

      </div>

      {/* Daily Scripture of Hope */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 rounded-3xl p-6 sm:p-8 border border-emerald-200/70 shadow-xs space-y-2">
        <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>Palabra de Esperanza y Renovación para Hoy</span>
        </div>
        <blockquote className="text-sm sm:text-base font-semibold text-slate-800 italic leading-relaxed">
          "No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento, para que comprobéis cuál sea la buena voluntad de Dios, agradable y perfecta." — Romanos 12:2
        </blockquote>
        <p className="text-xs text-slate-600 leading-relaxed pt-1">
          La neuroplasticidad confirma lo que las Escrituras enseñaron hace dos milenios: tu cerebro y tu corazón pueden renovarse a diario cuando reemplazas mentiras de angustia con la verdad sanadora del amor de Dios.
        </p>
      </div>

      {/* 9 Modules Grid Navigation */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Los 9 Módulos de PastoralMente Integral
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Una plataforma completa al servicio de tu bienestar mental, emocional, familiar y espiritual.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <div
            onClick={() => setActiveTab('assessment')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-sky-300 hover:shadow-md cursor-pointer transition-all space-y-2 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Brain className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold uppercase text-sky-700">Módulo 1</span>
            <h3 className="font-bold text-sm text-slate-900">Evaluación Inicial</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              9 escalas psicológicas y espirituales para generar tu perfil emocional, fortalezas y áreas de mejora.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('plan')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md cursor-pointer transition-all space-y-2 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold uppercase text-emerald-700">Módulo 2</span>
            <h3 className="font-bold text-sm text-slate-900">Plan de Crecimiento IA</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Objetivos SMART, metas semanales, ejercicios psicológicos (TCC/DBT) y reflexiones bíblicas automáticas.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('therapist')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-rose-300 hover:shadow-md cursor-pointer transition-all space-y-2 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold uppercase text-rose-700">Módulo 3</span>
            <h3 className="font-bold text-sm text-slate-900">Asistente Terapéutico IA</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Coach emocional, orientador espiritual y educador psicológico con escucha empática y sin juicios.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('tracking')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-md cursor-pointer transition-all space-y-2 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold uppercase text-indigo-700">Módulo 4</span>
            <h3 className="font-bold text-sm text-slate-900">Seguimiento Inteligente</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Check-in diario de emociones, estado espiritual, gráficas de tendencias y alertas tempranas de fatiga.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('journal')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-teal-300 hover:shadow-md cursor-pointer transition-all space-y-2 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <BookHeart className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold uppercase text-teal-700">Módulo 5</span>
            <h3 className="font-bold text-sm text-slate-900">Diario Terapéutico TCC</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Detección de distorsiones cognitivas, pensamientos automáticos negativos y reencuadre pastoral bíblico.
            </p>
          </div>

          <div
            onClick={onOpenCrisis}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-md cursor-pointer transition-all space-y-2 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold uppercase text-amber-700">Módulo 6</span>
            <h3 className="font-bold text-sm text-slate-900">Intervención en Crisis</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Respiración cuadrada guiada 4x4, anclaje sensorial 5-4-3-2-1 y líneas de auxilio psicológico 24/7.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('school')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-sky-300 hover:shadow-md cursor-pointer transition-all space-y-2 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold uppercase text-sky-700">Módulo 7</span>
            <h3 className="font-bold text-sm text-slate-900">Escuela de Crecimiento</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              10 cursos interactivos sobre ansiedad, depresión, duelo, perdón, pareja, liderazgo y discipulado.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('professional_panel')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md cursor-pointer transition-all space-y-2 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold uppercase text-emerald-700">Módulo 8</span>
            <h3 className="font-bold text-sm text-slate-900">Panel Pastor / Psicólogo</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Gestión de acompañados, notas SOAP de consejería, reportes clínicos e informes de evolución.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('predictive')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-md cursor-pointer transition-all space-y-2 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold uppercase text-indigo-700">Módulo 9</span>
            <h3 className="font-bold text-sm text-slate-900">IA Predictiva</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Proyección de tendencias, matriz de factores de riesgo vs protectores y alertas preventivas.
            </p>
          </div>

        </div>
      </div>

      {/* The 10 Psychological Foundations & 10 Biblical Foundations Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Psychological Models */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Base Teórica Psicológica</h3>
              <p className="text-xs text-slate-500">10 modelos científicos validados e integrados</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {psychologicalModels.map((m, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <span className="font-bold text-slate-900">{i + 1}. {m.title}:</span>
                <span className="text-slate-600 ml-1">{m.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Biblical Foundations */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Base Bíblica de Esperanza</h3>
              <p className="text-xs text-slate-500">10 columnas de gracia y sanidad interior</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {biblicalFoundations.map((bf, i) => (
              <div key={i} className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center space-x-2 text-emerald-950 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{bf}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-900 block mb-0.5">Integración Respetuosa:</span>
            No espiritualizamos problemas médicos ni psicologizamos la soberanía divina. Reconocemos que Dios sana a través de Su Palabra, de la comunidad de fe y también a través de la ciencia médica y la psicología.
          </div>
        </div>

      </div>

      {/* Footer Ethics & Disclaimers */}
      <div className="p-6 rounded-3xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <span className="font-bold text-slate-800">Marco de Confidencialidad y Ética Pastoral-Clínica:</span>
          <p className="text-[11px] text-slate-500 mt-0.5">
            PastoralMente Integral es una herramienta de apoyo y acompañamiento. No emite diagnósticos médicos ni psiquiátricos.
          </p>
        </div>
        <button
          onClick={onOpenConsent}
          className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs shrink-0"
        >
          Ver Términos y Consentimiento
        </button>
      </div>

    </div>
  );
};
