export type ActiveTab = 
  | 'home'
  | 'assessment'
  | 'plan'
  | 'therapist'
  | 'tracking'
  | 'journal'
  | 'school'
  | 'predictive'
  | 'professional_panel';

export type UserRole = 'member' | 'professional'; // 'member' (usuario) or 'professional' (pastor / psicólogo)

// ================= MODULE 1: EVALUACIÓN INICIAL =================
export interface AssessmentQuestion {
  id: string;
  category: 
    | 'estres' 
    | 'ansiedad' 
    | 'animo' 
    | 'autoestima' 
    | 'satisfaccion' 
    | 'espiritualidad' 
    | 'familia' 
    | 'pareja' 
    | 'habitos';
  categoryLabel: string;
  prompt: string;
  minLabel: string;
  maxLabel: string;
  value: number; // 1 to 5
}

export interface AssessmentResult {
  completedAt: string;
  scores: {
    estres: number;
    ansiedad: number;
    animo: number;
    autoestima: number;
    satisfaccion: number;
    espiritualidad: number;
    familia: number;
    pareja: number;
    habitos: number;
  };
  emotionalProfile: {
    dominantState: string;
    description: string;
    resilienceScore: number;
  };
  spiritualProfile: {
    connectionWithGod: string;
    prayerLife: string;
    faithInAdversity: string;
  };
  strengths: string[];
  growthAreas: string[];
}

// ================= MODULE 2: PLAN DE CRECIMIENTO =================
export interface SmartObjective {
  id: string;
  title: string;
  target: string;
  timeframe: string;
  category: string;
  completed?: boolean;
}

export interface WeeklyMilestone {
  week: number;
  focus: string;
  completed?: boolean;
}

export interface DailyActivity {
  id: string;
  title: string;
  type: 'mindfulness_biblico' | 'tcc_gratitud' | 'salud_fisica' | 'lectura_sanidad' | 'oracion';
  description: string;
  completed?: boolean;
}

export interface PsychologicalExercise {
  name: string;
  model: 'TCC' | 'ACT' | 'DBT' | 'Psicología Positiva' | 'Soluciones' | 'Sistémica';
  purpose: string;
  steps: string[];
}

export interface BiblicalReflection {
  verse: string;
  text: string;
  reflection: string;
  lifeApplication: string;
}

export interface HabitItem {
  id: string;
  name: string;
  frequency: string;
  streak: number;
  doneToday: boolean;
}

export interface GrowthPlan {
  id: string;
  title: string;
  summary: string;
  updatedAt: string;
  smartObjectives: SmartObjective[];
  weeklyMilestones: WeeklyMilestone[];
  dailyActivities: DailyActivity[];
  psychologicalExercises: PsychologicalExercise[];
  biblicalReflections: BiblicalReflection[];
  habits: HabitItem[];
}

// ================= MODULE 3: ASISTENTE TERAPÉUTICO IA =================
export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedAction?: {
    type: 'exercise' | 'scripture' | 'crisis' | 'journal';
    label: string;
  };
}

// ================= MODULE 4: SEGUIMIENTO INTELIGENTE =================
export interface DailyCheckIn {
  id: string;
  date: string; // YYYY-MM-DD
  moodScore: number; // 1 to 10
  moodLabel: string;
  emotions: string[];
  spiritualScore: number; // 1 to 10
  spiritualState: string; // e.g. "En paz con Dios", "Buscando dirección", "En sequía"
  goalsCompleted: number; // percentage or count
  motivationScore: number; // 1 to 10
  sleepHours: number;
  energyScore: number; // 1 to 10
  notes?: string;
}

// ================= MODULE 5: DIARIO TERAPÉUTICO =================
export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  category: 'pensamiento' | 'emocion' | 'oracion' | 'reflexion' | 'gratitud';
  moodTag: string;
  analysis?: {
    cognitiveDistortions: {
      name: string;
      explanation: string;
      evidenceSnippet?: string;
    }[];
    automaticNegativeThoughts: string[];
    repetitivePatterns: string;
    emotionalProgress: string;
    biblicalAnchor: {
      verse: string;
      text: string;
      pastoralReframe: string;
    };
    cbtExercise: string;
  };
  analyzing?: boolean;
}

// ================= MODULE 6: INTERVENCIÓN EN CRISIS =================
export interface CrisisResource {
  country: string;
  phone: string;
  label: string;
  available: string;
}

export interface SupportContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isTrustedAdvocate: boolean;
}

export interface SafetyPlan {
  warningSigns: string[];
  copingStrategies: string[];
  safePlaces: string[];
  pastoralSupportContact: string;
}

// ================= MODULE 7: ESCUELA DE CRECIMIENTO =================
export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  audioDuration?: string;
  psychologicalModel: string;
  scriptureReference: string;
  content: string[];
  practicalTool: {
    name: string;
    howToApply: string[];
  };
  reflectionPrompt: string;
  biblicalPromise: string;
  completed?: boolean;
}

export interface Course {
  id: string;
  title: string;
  category: 
    | 'Ansiedad' 
    | 'Depresión' 
    | 'Autoestima' 
    | 'Duelo' 
    | 'Perdón' 
    | 'Pareja' 
    | 'Familia' 
    | 'Liderazgo' 
    | 'Discipulado' 
    | 'Inteligencia Emocional';
  description: string;
  badge: string;
  iconName: string;
  lessons: CourseLesson[];
  progressPercent: number;
}

// ================= MODULE 8: PANEL DEL PASTOR O PSICÓLOGO =================
export interface PatientUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  age: number;
  assignedRole: 'Consejería Pastoral' | 'Atención Psicológica' | 'Mixta Integral';
  status: 'Activo' | 'En seguimiento prioritario' | 'En pausa' | 'Restaurado / Alta';
  riskLevel: 'Verde (Bajo)' | 'Amarillo (Moderado)' | 'Rojo (Alerta)';
  lastSessionDate: string;
  currentPlanTitle: string;
  emotionalScoreAvg: number;
  spiritualScoreAvg: number;
  adherenceRate: number;
}

export interface ProfessionalSession {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  sessionType: 'Consejería Pastoral' | 'Terapia Psicológica' | 'Sesión Conjunta';
  subjective: string; // S: Lo que el acompañado expresa
  objective: string;  // O: Observaciones clínicas y espirituales
  assessment: string; // A: Evaluación de progreso y necesidades
  plan: string;       // P: Tareas asignadas, pasajes bíblicos y acuerdos
  riskObserved: boolean;
  confidentialNotes: string;
}

// ================= MODULE 9: IA PREDICTIVA =================
export interface PredictiveAnalysis {
  lastUpdated: string;
  overallTrajectory: string;
  riskLevel: 'Bajo' | 'Moderado' | 'Atención Requerida';
  predictedTrend: 'Mejora sostenida' | 'Meseta' | 'Vulnerabilidad a recaída';
  riskFactors: string[];
  protectiveFactors: string[];
  earlyAlerts: {
    id: string;
    level: 'info' | 'warning' | 'alert';
    title: string;
    message: string;
    recommendedAction: string;
  }[];
  dynamicRecommendations: string[];
}
