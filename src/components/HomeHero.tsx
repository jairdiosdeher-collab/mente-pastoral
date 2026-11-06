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
  Flame,
  Users,
  MessageSquare,
  Wind,
  Library,
  HandHeart,
  CalendarCheck,
  ShieldCheck,
  BookMarked
} from 'lucide-react';
import { ActiveTab, AssessmentResult, GrowthPlan } from '../types';

interface HomeHeroProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCrisis: () => void;
  onOpenConsent: () => void;
  onOpenBiblical: () => void;
  onOpenWellness: () => void;
  onOpenResources: () => void;
  onOpenHumanCare: () => void;
  assessmentResult: AssessmentResult;
  plan: GrowthPlan;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  setActiveTab,
  onOpenCrisis,
  onOpenConsent,
  onOpenBiblical,
  onOpenWellness,
  onOpenResources,
  onOpenHumanCare,
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
      
      {/* Hero Welcome Banner - Core Headline (Section 9) */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-800 via-sky-700 to-emerald-700 rounded-3xl p-6 sm:p-10 text-white shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          
          <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20 text-xs font-bold text-sky-100">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>PastoralMente Integral • Plataforma Libre y Gratuita</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            BIENVENIDO A PASTORALMENTE
          </h1>

          <p className="text-sky-100 text-base sm:text-lg font-medium leading-relaxed">
            Un espacio gratuito de orientación emocional, crecimiento personal y acompañamiento espiritual.
          </p>

          <div className="inline-block px-4 py-2 rounded-2xl bg-emerald-500/30 border border-emerald-300/40 backdrop-blur-sm">
            <span className="text-sm font-bold text-emerald-200">
              ✨ Puedes comenzar ahora. No necesitas registrarte.
            </span>
          </div>

          <p className="text-sky-200/90 text-xs sm:text-sm leading-relaxed pt-1">
            Unimos los principios eternos de la Biblia Reina Valera 1960 y la psicología basada en evidencia (TCC, ACT, DBT, Psicología Positiva) con total respeto a tu privacidad y dignidad.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('therapist')}
              className="px-6 py-3.5 rounded-2xl bg-white text-sky-900 hover:bg-sky-50 font-bold text-xs sm:text-sm shadow-lg shadow-sky-950/20 transition-all hover:scale-105 flex items-center space-x-2"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Hablar con el Asistente Pastoral</span>
              <ArrowRight className="w-4 h-4 text-sky-600" />
            </button>

            <button
              onClick={onOpenBiblical}
              className="px-5 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/20 transition-all hover:scale-105 flex items-center space-x-2"
            >
              <BookMarked className="w-4 h-4" />
              <span>Reflexión Bíblica</span>
            </button>

            <button
              onClick={onOpenWellness}
              className="px-5 py-3.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm backdrop-blur-md transition-all flex items-center space-x-2"
            >
              <Wind className="w-4 h-4 text-sky-200" />
              <span>Ejercicios de Bienestar</span>
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

      {/* 10 Direct Consultant Accesses Section */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-sky-700 block">
              Accesos Directos para el Consultante
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              ¿En qué podemos acompañarte hoy?
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            10 áreas de apoyo inmediato, privado y sin registros
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
          
          {/* 1. Hablar con el asistente pastoral */}
          <div
            onClick={() => setActiveTab('therapist')}
            className="p-4 rounded-3xl bg-white border border-slate-200 hover:border-rose-400 hover:shadow-lg cursor-pointer transition-all duration-200 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-rose-600">Acceso 1</span>
                <h3 className="font-bold text-sm text-slate-900">Hablar con el Asistente Pastoral</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Orientación compasiva con escucha empática e IA explicativa (Gemini 3.8 Flash o recursos preparados).
                </p>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center text-xs font-bold text-rose-600 group-hover:translate-x-1 transition-transform">
              <span>Conversar ahora</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* 2. Recibir orientación emocional */}
          <div
            onClick={() => setActiveTab('assessment')}
            className="p-4 rounded-3xl bg-white border border-slate-200 hover:border-sky-400 hover:shadow-lg cursor-pointer transition-all duration-200 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-sky-600">Acceso 2</span>
                <h3 className="font-bold text-sm text-slate-900">Recibir Orientación Emocional</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Evaluación inicial con 9 escalas de ansiedad, estrés, ánimo y bienestar espiritual.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center text-xs font-bold text-sky-600 group-hover:translate-x-1 transition-transform">
              <span>Iniciar test</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* 3. Encontrar una reflexión bíblica */}
          <div
            onClick={onOpenBiblical}
            className="p-4 rounded-3xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-lg cursor-pointer transition-all duration-200 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookMarked className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-emerald-600">Acceso 3</span>
                <h3 className="font-bold text-sm text-slate-900">Encontrar Reflexión Bíblica</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Versículos Reina Valera 1960 por temática con reencuadre pastoral y aplicación práctica.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
              <span>Ver reflexiones</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* 4. Realizar ejercicios de bienestar */}
          <div
            onClick={onOpenWellness}
            className="p-4 rounded-3xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-lg cursor-pointer transition-all duration-200 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-teal-600">Acceso 4</span>
                <h3 className="font-bold text-sm text-slate-900">Ejercicios de Bienestar</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Respiración 4-4-4 con cronómetro, técnica STOP de DBT, defusión ACT y reencuadre TCC.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center text-xs font-bold text-teal-600 group-hover:translate-x-1 transition-transform">
              <span>Practicar ahora</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* 5. Escribir en mi diario personal */}
          <div
            onClick={() => setActiveTab('journal')}
            className="p-4 rounded-3xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-lg cursor-pointer transition-all duration-200 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookHeart className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-indigo-600">Acceso 5</span>
                <h3 className="font-bold text-sm text-slate-900">Diario Personal TCC</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Registro de pensamientos y emociones guardado 100% en tu dispositivo con reencuadre bíblico.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
              <span>Abrir diario</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* 6. Crear mi plan de crecimiento */}
          <div
            onClick={() => setActiveTab('plan')}
            className="p-4 rounded-3xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-lg cursor-pointer transition-all duration-200 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-emerald-600">Acceso 6</span>
                <h3 className="font-bold text-sm text-slate-900">Plan de Crecimiento</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Metas SMART personalizadas, hábitos diarios espirituales y psicológicos para tu progreso.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
              <span>Mi plan de vida</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* 7. Consultar la biblioteca de recursos */}
          <div
            onClick={onOpenResources}
            className="p-4 rounded-3xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg cursor-pointer transition-all duration-200 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Library className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-blue-600">Acceso 7</span>
                <h3 className="font-bold text-sm text-slate-900">Biblioteca de Recursos</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Guías psicoespirituales en formato claro sobre ansiedad, duelo, matrimonio y burnout.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
              <span>Explorar guías</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* 8. Acceder a la Escuela de Crecimiento */}
          <div
            onClick={() => setActiveTab('school')}
            className="p-4 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-lg cursor-pointer transition-all duration-200 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-amber-600">Acceso 8</span>
                <h3 className="font-bold text-sm text-slate-900">Escuela de Crecimiento</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  10 cursos formativos con módulos interactivos y aplicación pastoral-psicológica.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
              <span>Ir a los cursos</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* 9. Solicitar acompañamiento humano */}
          <div
            onClick={onOpenHumanCare}
            className="p-4 rounded-3xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-lg cursor-pointer transition-all duration-200 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <HandHeart className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-emerald-600">Acceso 9</span>
                <h3 className="font-bold text-sm text-slate-900">Acompañamiento Humano</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Solicitud voluntaria de consejería pastoral personal y petición de oración con un consejero.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
              <span>Solicitar apoyo</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* 10. Consultar recursos de ayuda urgente */}
          <div
            onClick={onOpenCrisis}
            className="p-4 rounded-3xl bg-white border border-slate-200 hover:border-rose-400 hover:shadow-lg cursor-pointer transition-all duration-200 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-rose-600">Acceso 10</span>
                <h3 className="font-bold text-sm text-slate-900">Ayuda Urgente (SOS Crisis)</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Líneas telefónicas de auxilio 24/7 y protocolo sensorial 5-4-3-2-1 para momentos de angustia extrema.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center text-xs font-bold text-rose-600 group-hover:translate-x-1 transition-transform">
              <span>Ver ayuda urgente</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

        </div>
      </div>

      {/* Snapshot Status Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div 
          onClick={() => setActiveTab('whatsapp')}
          className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-emerald-400 shadow-xs cursor-pointer transition-all hover:shadow-md flex items-center space-x-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">WhatsApp Pastoral</span>
            <h4 className="text-sm font-bold text-slate-900">WasapFlow Bridge</h4>
            <span className="text-xs text-slate-500">Canal ministerial oficial</span>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('plan')}
          className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-emerald-300 shadow-xs cursor-pointer transition-all hover:shadow-md flex items-center space-x-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">Mi Plan Diario</span>
            <h4 className="text-sm font-bold text-slate-900">{completedActivitiesToday} de {plan.dailyActivities.length} actividades</h4>
            <span className="text-xs text-slate-500">Toca para marcar ejercicios</span>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('tracking')}
          className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-sky-300 shadow-xs cursor-pointer transition-all hover:shadow-md flex items-center space-x-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider block">Psicoespiritual</span>
            <h4 className="text-sm font-bold text-slate-900">Resiliencia: {assessmentResult.emotionalProfile.resilienceScore}%</h4>
            <span className="text-xs text-slate-500">Monitoreo y tendencias</span>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('journal')}
          className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-indigo-300 shadow-xs cursor-pointer transition-all hover:shadow-md flex items-center space-x-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
            <BookHeart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">Diario TCC &amp; Oración</span>
            <h4 className="text-sm font-bold text-slate-900">Reencuadre Racional</h4>
            <span className="text-xs text-slate-500">Detecta distorsiones</span>
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
            PastoralMente Integral es una plataforma libre y gratuita de apoyo. No sustituye la atención médica especializada ni emite recetas o diagnósticos psiquiátricos.
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
