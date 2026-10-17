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

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [userRole, setUserRole] = useState<UserRole>('member');
  const [isCrisisOpen, setIsCrisisOpen] = useState(false);
  const [isConsentOpen, setIsConsentOpen] = useState(false);

  // Persistent States with fallback
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

  // Check first time consent
  useEffect(() => {
    const consented = localStorage.getItem('pastoralmente_consent_accepted');
    if (!consented) {
      setIsConsentOpen(true);
    }
  }, []);

  const handleAcceptConsent = () => {
    localStorage.setItem('pastoralmente_consent_accepted', 'true');
    setIsConsentOpen(false);
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
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'home' && (
          <HomeHero
            setActiveTab={setActiveTab}
            onOpenCrisis={() => setIsCrisisOpen(true)}
            onOpenConsent={() => setIsConsentOpen(true)}
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

      {/* Informed Consent Modal */}
      <ConsentModal
        isOpen={isConsentOpen}
        onAccept={handleAcceptConsent}
        onClose={() => setIsConsentOpen(false)}
      />

      {/* Crisis Intervention Modal (Available from anywhere) */}
      <CrisisModal
        isOpen={isCrisisOpen}
        onClose={() => setIsCrisisOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-sky-800">PastoralMente Integral</span>
            <span>•</span>
            <span>Fe Cristiana &amp; Psicología Basada en Evidencia</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <button onClick={() => setIsConsentOpen(true)} className="hover:text-sky-700 underline">
              Marco Ético &amp; Consentimiento
            </button>
            <span>•</span>
            <button onClick={() => setIsCrisisOpen(true)} className="text-rose-600 font-bold hover:underline">
              Líneas de Crisis 24/7
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
