import React, { useState } from 'react';
import { 
  Stethoscope, 
  Users, 
  FileText, 
  BarChart3, 
  ShieldAlert, 
  Plus, 
  Search, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Heart, 
  Sparkles, 
  Download, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { PatientUser, ProfessionalSession } from '../types';

interface ProfessionalPanelModuleProps {
  patients: PatientUser[];
  sessions: ProfessionalSession[];
  onAddSession: (session: ProfessionalSession) => void;
  onUpdatePatient: (patient: PatientUser) => void;
}

export const ProfessionalPanelModule: React.FC<ProfessionalPanelModuleProps> = ({
  patients,
  sessions,
  onAddSession,
  onUpdatePatient,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'patients' | 'sessions' | 'reports'>('patients');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<PatientUser>(patients[0]);
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);

  // New Session Form State (SOAP format)
  const [sessionType, setSessionType] = useState<'Consejería Pastoral' | 'Terapia Psicológica' | 'Sesión Conjunta'>('Consejería Pastoral');
  const [subjective, setSubjective] = useState('');
  const [objective, setObjective] = useState('');
  const [assessment, setAssessment] = useState('');
  const [planText, setPlanText] = useState('');
  const [riskObserved, setRiskObserved] = useState(false);
  const [confidentialNotes, setConfidentialNotes] = useState('');

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjective.trim() || !selectedPatient) return;

    const newSession: ProfessionalSession = {
      id: `sess-${Date.now()}`,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      date: new Date().toISOString().split('T')[0],
      sessionType,
      subjective,
      objective,
      assessment,
      plan: planText,
      riskObserved,
      confidentialNotes,
    };

    onAddSession(newSession);

    // Update patient's last session date
    onUpdatePatient({
      ...selectedPatient,
      lastSessionDate: newSession.date,
      riskLevel: riskObserved ? 'Rojo (Alerta)' : selectedPatient.riskLevel,
    });

    setShowNewSessionModal(false);
    setSubjective('');
    setObjective('');
    setAssessment('');
    setPlanText('');
    setConfidentialNotes('');
    setRiskObserved(false);
  };

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.assignedRole.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const patientSessions = sessions.filter((s) => s.patientId === selectedPatient?.id);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-sky-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-1">
            <Stethoscope className="w-4 h-4 text-emerald-300" />
            <span>Módulo 8 • Portal Pastoral &amp; Psicológico Clínico</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Panel de Consejería y Acompañamiento
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-xl mt-1">
            Gestión confidencial de personas acompañadas, registro de sesiones clínicas y pastorales en formato SOAP, evolución y reportes éticos.
          </p>
        </div>

        <button
          onClick={() => setShowNewSessionModal(true)}
          className="px-5 py-3 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4 text-emerald-700" />
          <span>Registrar Sesión SOAP</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('patients')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-2 ${
            activeSubTab === 'patients'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Acompañados ({patients.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('sessions')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-2 ${
            activeSubTab === 'sessions'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Historial de Sesiones ({sessions.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('reports')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-2 ${
            activeSubTab === 'reports'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Reportes &amp; Estadísticas</span>
        </button>
      </div>

      {/* SUBTAB 1: PATIENTS MANAGEMENT */}
      {activeSubTab === 'patients' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Patient list (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-3.5 border border-slate-200 shadow-xs flex items-center space-x-2">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre o rol..."
                className="w-full text-xs bg-transparent focus:outline-none"
              />
            </div>

            <div className="space-y-3">
              {filteredPatients.map((patient) => {
                const isSelected = selectedPatient.id === patient.id;
                return (
                  <div
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`p-4 rounded-3xl border transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-300 shadow-xs ring-1 ring-emerald-200'
                        : 'bg-white border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={patient.avatar}
                        alt={patient.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-900">{patient.name}</h4>
                        <div className="flex items-center space-x-2 text-[10px] text-slate-500">
                          <span>{patient.assignedRole}</span>
                          <span>•</span>
                          <span>{patient.age} años</span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        patient.riskLevel.includes('Verde')
                          ? 'bg-emerald-100 text-emerald-800'
                          : patient.riskLevel.includes('Amarillo')
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {patient.riskLevel.split(' ')[0]}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>Última sesión: {patient.lastSessionDate}</span>
                      <span className="font-bold text-emerald-700">{patient.adherenceRate}% adherencia</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Patient Profile & Sessions (7 cols) */}
          <div className="lg:col-span-7">
            {selectedPatient && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                
                {/* Header Profile */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedPatient.avatar}
                      alt={selectedPatient.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shadow-xs"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h2 className="text-xl font-bold text-slate-900">{selectedPatient.name}</h2>
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                          {selectedPatient.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{selectedPatient.email} • {selectedPatient.phone}</p>
                      <span className="text-xs font-semibold text-emerald-700 mt-1 block">
                        Modalidad: {selectedPatient.assignedRole}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowNewSessionModal(true)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors flex items-center space-x-1.5 self-start sm:self-auto"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir Sesión</span>
                  </button>
                </div>

                {/* Patient Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-400 block font-semibold">Promedio Ánimo</span>
                    <span className="text-lg font-extrabold text-sky-700">{selectedPatient.emotionalScoreAvg} / 10</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-400 block font-semibold">Promedio Espiritual</span>
                    <span className="text-lg font-extrabold text-emerald-700">{selectedPatient.spiritualScoreAvg} / 10</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-400 block font-semibold">Adherencia Plan</span>
                    <span className="text-lg font-extrabold text-indigo-700">{selectedPatient.adherenceRate}%</span>
                  </div>
                </div>

                {/* Assigned Plan */}
                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 text-xs text-sky-900 space-y-1">
                  <span className="font-bold uppercase tracking-wider text-[10px] block">Plan Asignado Actual:</span>
                  <p className="font-semibold">{selectedPatient.currentPlanTitle}</p>
                </div>

                {/* Patient Session Records */}
                <div className="space-y-3">
                  <h3 className="font-bold text-sm text-slate-900">Historial de Sesiones Registradas</h3>
                  {patientSessions.length > 0 ? (
                    patientSessions.map((sess) => (
                      <div key={sess.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-slate-900">{sess.date} — {sess.sessionType}</span>
                          {sess.riskObserved && (
                            <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-md">
                              Riesgo Notado
                            </span>
                          )}
                        </div>

                        <div className="space-y-1.5 text-slate-700">
                          <p><strong>S (Subjetivo):</strong> {sess.subjective}</p>
                          <p><strong>O (Objetivo):</strong> {sess.objective}</p>
                          <p><strong>A (Análisis):</strong> {sess.assessment}</p>
                          <p><strong>P (Plan/Acuerdos):</strong> {sess.plan}</p>
                          {sess.confidentialNotes && (
                            <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-start space-x-2 text-[11px] text-amber-900 mt-2">
                              <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                              <span><strong>Nota Confidencial:</strong> {sess.confidentialNotes}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">No hay sesiones previas registradas para este acompañado.</p>
                  )}
                </div>

              </div>
            )}
          </div>

        </div>
      )}

      {/* SUBTAB 2: ALL SESSIONS */}
      {activeSubTab === 'sessions' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Todas las Sesiones SOAP Registradas</h3>
            
            <div className="grid gap-4">
              {sessions.map((sess) => (
                <div key={sess.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                    <div>
                      <span className="font-extrabold text-sm text-slate-900">{sess.patientName}</span>
                      <span className="text-slate-400 text-xs ml-2">({sess.sessionType})</span>
                    </div>
                    <span className="text-xs text-slate-500">{sess.date}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700">
                    <div>
                      <span className="font-bold block text-slate-900">S (Lo expresado):</span>
                      <p className="text-slate-600">{sess.subjective}</p>
                    </div>
                    <div>
                      <span className="font-bold block text-slate-900">O (Observación clínica/espiritual):</span>
                      <p className="text-slate-600">{sess.objective}</p>
                    </div>
                    <div>
                      <span className="font-bold block text-slate-900">A (Diagnóstico/Progreso):</span>
                      <p className="text-slate-600">{sess.assessment}</p>
                    </div>
                    <div>
                      <span className="font-bold block text-slate-900">P (Plan y Pasajes):</span>
                      <p className="text-slate-600">{sess.plan}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: REPORTS & STATS */}
      {activeSubTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Reporte Ejecutivo de Salud Psicoespiritual</h3>
                <p className="text-xs text-slate-500">Métricas agregadas del grupo acompañado</p>
              </div>
              <button 
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center space-x-2 transition-colors self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Imprimir / Descargar Reporte</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
                <span className="text-emerald-800 font-bold block">Tasa de Restauración Positiva</span>
                <span className="text-2xl font-extrabold text-emerald-950">78%</span>
                <p className="text-slate-600 text-[11px]">Usuarios con reducción en escalas de ansiedad y aumento en paz espiritual tras 4 semanas.</p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 space-y-1">
                <span className="text-sky-800 font-bold block">Adherencia Media al Plan</span>
                <span className="text-2xl font-extrabold text-sky-950">82%</span>
                <p className="text-slate-600 text-[11px]">Cumplimiento constante de ejercicios TCC diarios y oración contemplativa.</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 space-y-1">
                <span className="text-purple-800 font-bold block">Intervenciones Preventivas</span>
                <span className="text-2xl font-extrabold text-purple-950">14</span>
                <p className="text-slate-600 text-[11px]">Alertas tempranas atendidas oportunamente antes de derivar en crisis emocional.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEW SESSION MODAL (SOAP) */}
      {showNewSessionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-emerald-100 overflow-hidden flex flex-col max-h-[92vh]">
            
            <div className="bg-gradient-to-r from-emerald-800 to-teal-700 px-6 py-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base">Registrar Sesión Clínica / Pastoral (SOAP)</h3>
                <p className="text-xs text-emerald-100">Acompañado: {selectedPatient?.name}</p>
              </div>
              <button onClick={() => setShowNewSessionModal(false)} className="text-white/80 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateSession} className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
              
              <div>
                <label className="font-bold block mb-1">Modalidad de la Sesión:</label>
                <select
                  value={sessionType}
                  onChange={(e: any) => setSessionType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Consejería Pastoral">Consejería Pastoral</option>
                  <option value="Terapia Psicológica">Terapia Psicológica Basada en Evidencia</option>
                  <option value="Sesión Conjunta">Sesión Conjunta (Pastor &amp; Psicólogo)</option>
                </select>
              </div>

              {/* S: Subjetivo */}
              <div>
                <label className="font-bold block mb-1">S - Subjetivo (Lo que el acompañado refiere verbalmente):</label>
                <textarea
                  value={subjective}
                  onChange={(e) => setSubjective(e.target.value)}
                  rows={2}
                  required
                  placeholder="Motivo de consulta, estado anímico expresado, angustias, oraciones..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* O: Objetivo */}
              <div>
                <label className="font-bold block mb-1">O - Objetivo (Observaciones de conducta, tono, lenguaje no verbal):</label>
                <textarea
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  rows={2}
                  placeholder="Contacto visual, afecto (eutímico, plano, ansioso), receptividad bíblica..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* A: Análisis */}
              <div>
                <label className="font-bold block mb-1">A - Análisis / Evaluación (Progreso terapéutico y necesidades):</label>
                <textarea
                  value={assessment}
                  onChange={(e) => setAssessment(e.target.value)}
                  rows={2}
                  placeholder="Distorsiones cognitivas observadas, madurez espiritual, barreras para perdonar..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* P: Plan */}
              <div>
                <label className="font-bold block mb-1">P - Plan de Acción (Tareas, pasajes asignados y acuerdos):</label>
                <textarea
                  value={planText}
                  onChange={(e) => setPlanText(e.target.value)}
                  rows={2}
                  placeholder="Ejercicio STOP de DBT, diario de gratitud, lectura de Filipenses 4, próxima fecha..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Risk check */}
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="riskObs"
                  checked={riskObserved}
                  onChange={(e) => setRiskObserved(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <label htmlFor="riskObs" className="font-bold text-rose-700">
                  ¿Se detectó señal de riesgo prioritario (angustia extrema, descompensación o ideación)?
                </label>
              </div>

              {/* Confidential notes */}
              <div>
                <label className="font-bold block mb-1 flex items-center space-x-1.5 text-amber-900">
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Notas Confidenciales Reservadas:</span>
                </label>
                <textarea
                  value={confidentialNotes}
                  onChange={(e) => setConfidentialNotes(e.target.value)}
                  rows={2}
                  placeholder="Comentarios exclusivos para el equipo pastoral o clínico bajo sigilo profesional..."
                  className="w-full p-2.5 rounded-xl border border-amber-200 bg-amber-50/40 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowNewSessionModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 text-white font-bold shadow-md shadow-emerald-700/20"
                >
                  Guardar Sesión SOAP
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
