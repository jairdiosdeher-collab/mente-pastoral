import React, { useState } from 'react';
import { 
  BarChart3, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  RefreshCw, 
  CheckCircle2, 
  Flame, 
  Heart, 
  ArrowRight,
  Shield
} from 'lucide-react';
import { PredictiveAnalysis, DailyCheckIn } from '../types';
import { fetchPredictiveAnalysis } from '../services/api';

interface PredictiveModuleProps {
  predictiveData: PredictiveAnalysis;
  checkIns: DailyCheckIn[];
  onUpdatePredictive: (data: PredictiveAnalysis) => void;
}

export const PredictiveModule: React.FC<PredictiveModuleProps> = ({
  predictiveData,
  checkIns,
  onUpdatePredictive,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const updated = await fetchPredictiveAnalysis(checkIns, 84, [
        'Variabilidad en horas de sueño los fines de semana',
        'Buena respuesta a ejercicios de respiración',
      ]);
      onUpdatePredictive(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-700 via-indigo-700 to-emerald-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-sky-200 text-xs font-bold uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4 text-emerald-300" />
            <span>Módulo 9 • Inteligencia Artificial Predictiva &amp; Preventiva</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Motor de IA Predictiva
          </h1>
          <p className="text-sky-100 text-xs sm:text-sm max-w-xl mt-1">
            Anticipa fluctuaciones emocionales, detecta patrones de agotamiento o estancamiento espiritual y fortalece tus factores protectores antes de que surja una crisis.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="px-5 py-3 rounded-2xl bg-white text-indigo-900 hover:bg-sky-50 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 flex items-center space-x-2 shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 text-indigo-600 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Analizando...' : 'Recalcular Predicción'}</span>
        </button>
      </div>

      {/* Trajectory & Risk Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Trayectoria General</span>
          <h3 className="text-lg font-extrabold text-slate-900">{predictiveData.overallTrajectory}</h3>
          <p className="text-xs text-slate-500">Última evaluación: {predictiveData.lastUpdated}</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nivel de Riesgo Predictivo</span>
          <div className="flex items-center space-x-2">
            <span className={`text-xl font-extrabold px-3 py-1 rounded-xl ${
              predictiveData.riskLevel === 'Bajo'
                ? 'bg-emerald-100 text-emerald-800'
                : predictiveData.riskLevel === 'Moderado'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-rose-100 text-rose-800'
            }`}>
              {predictiveData.riskLevel}
            </span>
            <span className="text-xs text-emerald-600 font-bold">Resguardado</span>
          </div>
          <p className="text-xs text-slate-500">Factores protectores activos</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tendencia Proyectada</span>
          <h3 className="text-lg font-extrabold text-indigo-700">{predictiveData.predictedTrend}</h3>
          <p className="text-xs text-slate-500">Sostenibilidad a 30 días</p>
        </div>

      </div>

      {/* Risk Factors vs Protective Factors Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Protective Factors */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200/80 shadow-xs space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Factores Protectores Identificados</h3>
              <p className="text-xs text-emerald-700 font-semibold">Fortalezas que blindan tu salud mental y espiritual</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {predictiveData.protectiveFactors.map((fact, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start space-x-3 text-xs text-emerald-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{fact}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Factors */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Vulnerabilidades &amp; Factores de Riesgo</h3>
              <p className="text-xs text-amber-700 font-semibold">Puntos de atención para prevenir recaídas o agotamiento</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {predictiveData.riskFactors.map((risk, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-amber-50/60 border border-amber-100 flex items-start space-x-3 text-xs text-amber-950">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{risk}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Early Alerts with Actionable Mitigations */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <span>Alertas Preventivas Anticipadas</span>
        </h3>

        <div className="grid gap-3.5">
          {predictiveData.earlyAlerts.map((al) => (
            <div
              key={al.id}
              className={`p-4 rounded-2xl border text-xs space-y-2 ${
                al.level === 'alert'
                  ? 'bg-rose-50 border-rose-200 text-rose-950'
                  : al.level === 'warning'
                  ? 'bg-amber-50 border-amber-200 text-amber-950'
                  : 'bg-sky-50 border-sky-200 text-sky-950'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm">{al.title}</h4>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md bg-white/80">
                  {al.level}
                </span>
              </div>
              <p className="leading-relaxed">{al.message}</p>
              <div className="p-2.5 rounded-xl bg-white/70 border border-black/5 text-[11px] font-semibold">
                <strong>Acción sugerida:</strong> {al.recommendedAction}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Recommendations Engine */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Recomendaciones Dinámicas de Cuidado</h3>
        
        <div className="grid gap-2.5">
          {predictiveData.dynamicRecommendations.map((rec, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3 text-xs text-slate-700">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                {i + 1}
              </span>
              <span className="leading-relaxed">{rec}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
