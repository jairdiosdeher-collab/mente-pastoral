import React, { useState, useEffect } from 'react';
import { 
  ActiveTab, 
  UserRole, 
  AssessmentResult, 
  GrowthPlan, 
  DailyCheckIn, 
  JournalEntry, 
  Course, 
  PatientUser, 
  ProfessionalSession, 
  PredictiveAnalysis 
} from './types';
import { 
  INITIAL_ASSESSMENT_RESULT, 
  INITIAL_GROWTH_PLAN, 
  INITIAL_CHECKINS, 
  INITIAL_JOURNAL_ENTRIES, 
  INITIAL_COURSES, 
  INITIAL_PATIENTS, 
  INITIAL_SESSIONS, 
  INITIAL_PREDICTIVE_ANALYSIS 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { ConsentModal } from './components/ConsentModal';
import { CrisisModal } from './components/CrisisModal';
import { HomeHero } from './components/HomeHero';
import { EvaluationModule } from './components/EvaluationModule';
import { PlanModule } from './components/PlanModule';
import { TherapistChatModule } from './components/TherapistChatModule';
import { TrackingModule } from './components/TrackingModule';
import { JournalModule } from './components/JournalModule';
import { SchoolModule } from './components/SchoolModule';
import { ProfessionalPanelModule } from './components/ProfessionalPanelModule';
import { PredictiveModule } from './components/PredictiveModule';
import { WhatsAppCenterModule } from './components/WhatsAppCenterModule';
import { BiblicalReflectionsModal } from './components/BiblicalReflectionsModal';
import { WellnessExercisesModal } from './components/WellnessExercisesModal';
import { ResourcesLibraryModal } from './components/ResourcesLibraryModal';
import { HumanCareModal } from './components/HumanCareModal';
import { ProfessionalAccessModal } from './components/ProfessionalAccessModal';
import { Trash2, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [userRole, setUserRole] = useState<UserRole>('member');
  
  // Modals state (All non-blocking, direct access)
  const [isCrisisOpen, setIsCrisisOpen] = useState(false);
  const [isConsentOpen, setIsConsentOpen] = useState(false);
  const [isBiblicalOpen, setIsBiblicalOpen] = useState(false);
  const [isWellnessOpen, setIsWellnessOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isHumanCareOpen, setIsHumanCareOpen] = useState(false);
  const [isProfessionalAccessOpen, setIsProfessionalAccessOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persistent States with local device storage
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult>(() => {
    const saved = localStorage.getItem('pastoralmente_assessment');
    return saved ? JSON.parse(saved) : INITIAL_ASSESSMENT_RESULT;
  });

  const [growthPlan, setGrowthPlan] = useState<GrowthPlan>(() => {
    const saved = localStorage.getItem('pastoralmente_plan');
    return saved ? JSON.parse(saved) : INITIAL_GROWTH_PLAN;
  });

  const [checkIns, setCheckIns] = useState<DailyCheckIn[]>(() => {
    const saved = localStorage.getItem('pastoralmente_checkins');
    return saved ? JSON.parse(saved) : INITIAL_CHECKINS;
  });

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('pastoralmente_journal');
    return saved ? JSON.parse(saved) : INITIAL_JOURNAL_ENTRIES;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('pastoralmente_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [patients, setPatients] = useState<PatientUser[]>(() => {
    const saved = localStorage.getItem('pastoralmente_patients');
    return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
  });

  const [sessions, setSessions] = useState<ProfessionalSession[]>(() => {
    const saved = localStorage.getItem('pastoralmente_sessions');
    return saved ? JSON.parse(saved) : INITIAL_SESSIONS;
  });

  const [predictiveData, setPredictiveData] = useState<PredictiveAnalysis>(() => {
    const saved = localStorage.getItem('pastoralmente_predictive');
    return saved ? JSON.parse(saved) : INITIAL_PREDICTIVE_ANALYSIS;
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('pastoralmente_assessment', JSON.stringify(assessmentResult));
  }, [assessmentResult]);

  useEffect(() => {
    localStorage.setItem('pastoralmente_plan', JSON.stringify(growthPlan));
  }, [growthPlan]);

  useEffect(() => {
    localStorage.setItem('pastoralmente_checkins', JSON.stringify(checkIns));
  }, [checkIns]);

  useEffect(() => {
    localStorage.setItem('pastoralmente_journal', JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem('pastoralmente_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('pastoralmente_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('pastoralmente_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('pastoralmente_predictive', JSON.stringify(predictiveData));
  }, [predictiveData]);

  // Handle Clear Local Data (Privacy Right)
  const handleClearLocalData = () => {
    const confirmed = window.confirm(
      '¿Deseas borrar tus datos locales de este dispositivo? Se restablecerán tu diario, respuestas de evaluación y planes. Nadie más tiene copia de tus datos.'
    );
    if (!confirmed) return;

    localStorage.removeItem('pastoralmente_assessment');
    localStorage.removeItem('pastoralmente_plan');
    localStorage.removeItem('pastoralmente_checkins');
    localStorage.removeItem('pastoralmente_journal');
    localStorage.removeItem('pastoralmente_courses');
    localStorage.removeItem('pastoralmente_predictive');

    setAssessmentResult(INITIAL_ASSESSMENT_RESULT);
    setGrowthPlan(INITIAL_GROWTH_PLAN);
    setCheckIns(INITIAL_CHECKINS);
    setJournalEntries(INITIAL_JOURNAL_ENTRIES);
    setCourses(INITIAL_COURSES);
    setPredictiveData(INITIAL_PREDICTIVE_ANALYSIS);

    setToastMessage('Tus datos locales han sido borrados de este dispositivo.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-800 flex flex-col font-sans selection:bg-sky-200 selection:text-sky-900 pb-20 xl:pb-8">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenCrisis={() => setIsCrisisOpen(true)}
        onOpenProfessionalAccess={() => setIsProfessionalAccessOpen(true)}
      />

      {/* Temporary Toast */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
          <ShieldCheck className="w-4 h-4 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'home' && (
          <HomeHero
            setActiveTab={setActiveTab}
            onOpenCrisis={() => setIsCrisisOpen(true)}
            onOpenConsent={() => setIsConsentOpen(true)}
            onOpenBiblical={() => setIsBiblicalOpen(true)}
            onOpenWellness={() => setIsWellnessOpen(true)}
            onOpenResources={() => setIsResourcesOpen(true)}
            onOpenHumanCare={() => setIsHumanCareOpen(true)}
            assessmentResult={assessmentResult}
            plan={growthPlan}
          />
        )}

        {activeTab === 'assessment' && (
          <EvaluationModule
            currentResult={assessmentResult}
            onSaveResult={(res) => setAssessmentResult(res)}
            onPlanGenerated={(newPlan) => setGrowthPlan(newPlan)}
            onNavigateToPlan={() => setActiveTab('plan')}
          />
        )}

        {activeTab === 'plan' && (
          <PlanModule
            plan={growthPlan}
            onUpdatePlan={(updated) => setGrowthPlan(updated)}
            onRegenerateRequest={() => setActiveTab('assessment')}
          />
        )}

        {activeTab === 'therapist' && (
          <TherapistChatModule
            assessmentResult={assessmentResult}
            onOpenCrisis={() => setIsCrisisOpen(true)}
          />
        )}

        {activeTab === 'tracking' && (
          <TrackingModule
            checkIns={checkIns}
            onAddCheckIn={(entry) => setCheckIns((prev) => [...prev, entry])}
          />
        )}

        {activeTab === 'journal' && (
          <JournalModule
            entries={journalEntries}
            onAddEntry={(entry) => setJournalEntries((prev) => [entry, ...prev])}
            onUpdateEntry={(entry) =>
              setJournalEntries((prev) => prev.map((e) => (e.id === entry.id ? entry : e)))
            }
          />
        )}

        {activeTab === 'school' && (
          <SchoolModule
            courses={courses}
            onUpdateCourses={(updated) => setCourses(updated)}
          />
        )}

        {activeTab === 'predictive' && (
          <PredictiveModule
            predictiveData={predictiveData}
            checkIns={checkIns}
            onUpdatePredictive={(data) => setPredictiveData(data)}
          />
        )}

        {activeTab === 'whatsapp' && (
          <WhatsAppCenterModule onOpenCrisis={() => setIsCrisisOpen(true)} />
        )}

        {activeTab === 'professional_panel' && (
          <ProfessionalPanelModule
            patients={patients}
            sessions={sessions}
            onAddSession={(newSess) => setSessions((prev) => [newSess, ...prev])}
            onUpdatePatient={(upPatient) =>
              setPatients((prev) => prev.map((p) => (p.id === upPatient.id ? upPatient : p)))
            }
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Modals */}
      <ConsentModal
        isOpen={isConsentOpen}
        onAccept={() => setIsConsentOpen(false)}
        onClose={() => setIsConsentOpen(false)}
      />

      <CrisisModal
        isOpen={isCrisisOpen}
        onClose={() => setIsCrisisOpen(false)}
      />

      <BiblicalReflectionsModal
        isOpen={isBiblicalOpen}
        onClose={() => setIsBiblicalOpen(false)}
      />

      <WellnessExercisesModal
        isOpen={isWellnessOpen}
        onClose={() => setIsWellnessOpen(false)}
      />

      <ResourcesLibraryModal
        isOpen={isResourcesOpen}
        onClose={() => setIsResourcesOpen(false)}
      />

      <HumanCareModal
        isOpen={isHumanCareOpen}
        onClose={() => setIsHumanCareOpen(false)}
        onOpenCrisis={() => setIsCrisisOpen(true)}
      />

      <ProfessionalAccessModal
        isOpen={isProfessionalAccessOpen}
        onClose={() => setIsProfessionalAccessOpen(false)}
        onSuccess={() => {
          setUserRole('professional');
          setActiveTab('professional_panel');
        }}
      />

      {/* Footer with Data Privacy Actions */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-sky-800">PastoralMente Integral</span>
            <span>•</span>
            <span>Acceso Libre, Directo &amp; Confidencial</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
            <button 
              onClick={() => setIsConsentOpen(true)} 
              className="hover:text-sky-700 underline"
            >
              Marco Ético &amp; Consentimiento
            </button>
            <span>•</span>
            <button 
              onClick={() => setIsCrisisOpen(true)} 
              className="text-rose-600 font-bold hover:underline"
            >
              Líneas de Crisis 24/7
            </button>
            <span>•</span>
            <button
              onClick={handleClearLocalData}
              className="flex items-center space-x-1 text-slate-500 hover:text-rose-600 hover:underline"
              title="Borra las entradas de diario y evaluaciones guardadas en este navegador"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Borrar mis datos locales</span>
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
