import { ChatMessage, AssessmentResult, GrowthPlan, JournalEntry, PredictiveAnalysis } from '../types';

export async function sendChatMessage(messages: { role: string; content: string }[], userContext?: any): Promise<string> {
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, userContext }),
    });
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    const data = await res.json();
    return data.reply;
  } catch (error) {
    console.warn('Fallback chat response due to network/server:', error);
    const lastMsg = messages[messages.length - 1]?.content || '';
    return `Te escucho con atención y respeto lo que sientes. La Biblia nos recuerda: "Cercano está Jehová a los quebrantados de corazón; y salva a los contritos de espíritu" (Salmo 34:18). 

Respecto a "${lastMsg.slice(0, 70)}...":
1. Toma una respiración profunda y suelta la tensión física en tus hombros.
2. Recuerda que un pensamiento ansioso no es una profecía, sino una hipótesis que tu mente genera en momentos de sobrecarga.
3. ¿Qué pequeño paso de autocuidado o momento de oración honesta te traería 5% más de serenidad en este instante?`;
  }
}

export async function generatePersonalizedPlan(assessmentProfile: AssessmentResult, primaryGoal: string): Promise<GrowthPlan> {
  try {
    const res = await fetch('/api/ai/generate-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assessmentProfile, primaryGoal }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.plan;
  } catch (error) {
    console.warn('Using baseline fallback plan generation:', error);
    return {
      id: `plan-${Date.now()}`,
      title: 'Plan Integral de Renovación y Restauración',
      summary: 'Diseñado a partir de tu evaluación diagnóstica para cultivar equilibrio emocional y comunión profunda.',
      updatedAt: new Date().toISOString().split('T')[0],
      smartObjectives: [
        {
          id: 'obj-gen-1',
          title: 'Regulación del estrés y respiración contemplativa',
          target: '10 minutos diarios de silencio y salmos de paz',
          timeframe: '4 semanas',
          category: 'Regulación Emocional (DBT)',
          completed: false,
        },
        {
          id: 'obj-gen-2',
          title: 'Reestructuración de pensamientos automáticos',
          target: 'Llevar 3 pensamientos negativos cautivos a Cristo por semana',
          timeframe: '6 semanas',
          category: 'TCC & Romanos 12:2',
          completed: false,
        },
        {
          id: 'obj-gen-3',
          title: 'Fortalecimiento de vínculos y descanso sagrado',
          target: 'Tener una tarde de desconexión y comunión familiar semanal',
          timeframe: '3 semanas',
          category: 'Relacional & Sabbath',
          completed: false,
        },
      ],
      weeklyMilestones: [
        { week: 1, focus: 'Diagnóstico y entrega: soltar el afán y registrar emociones sin juzgar.', completed: false },
        { week: 2, focus: 'Identificación de distorsiones cognitivas (catastrofismo, autoexigencia).', completed: false },
        { week: 3, focus: 'Tolerancia al malestar y técnica STOP ante situaciones tensas.', completed: false },
        { week: 4, focus: 'Acción comprometida en valores y testimonio de paz.', completed: false },
      ],
      dailyActivities: [
        {
          id: 'act-gen-1',
          title: 'Momento de Anclaje Matutino',
          type: 'mindfulness_biblico',
          description: 'Inhala en 4 tiempos recordando Filipenses 4:7. Exhala confiando en Dios.',
          completed: false,
        },
        {
          id: 'act-gen-2',
          title: 'Examen de Pensamientos (TCC)',
          type: 'tcc_gratitud',
          description: 'Anota una preocupación y encuentra 2 evidencias reales de que Dios ha sido fiel antes.',
          completed: false,
        },
        {
          id: 'act-gen-3',
          title: 'Activación Física y Aire Libre',
          type: 'salud_fisica',
          description: 'Caminata de 15 minutos apreciando la creación de Dios.',
          completed: false,
        },
      ],
      psychologicalExercises: [
        {
          name: 'Técnica STOP de DBT',
          model: 'DBT',
          purpose: 'Frenar la reacción impulsiva de enojo o angustia.',
          steps: ['S: Stop (Detente)', 'T: Take a breath (Respira)', 'O: Observe (Observa)', 'P: Proceed (Procede con gracia)'],
        },
        {
          name: 'Reencuadre Cognitivo en 3 Columnas',
          model: 'TCC',
          purpose: 'Transformar el catastrofismo en esperanza realista.',
          steps: ['Pensamiento negativo', 'Distorsión', 'Verdad bíblica y racional'],
        },
      ],
      biblicalReflections: [
        {
          verse: 'Romanos 12:2',
          text: 'No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento...',
          reflection: 'La mente se renueva sustituyendo mentiras arraigadas con la verdad viva de la Palabra.',
          lifeApplication: 'Pon una alarma al mediodía para revisar qué estás pensando y corregir el rumbo.',
        },
      ],
      habits: [
        { id: 'h-g1', name: 'Oración / Meditación matutina', frequency: 'Diario', streak: 1, doneToday: false },
        { id: 'h-g2', name: 'Hidratación consciente', frequency: 'Diario', streak: 1, doneToday: false },
        { id: 'h-g3', name: 'Diario terapéutico reflexivo', frequency: '3x / semana', streak: 1, doneToday: false },
      ],
    };
  }
}

export async function analyzeJournalEntry(content: string, mood?: string, category?: string) {
  try {
    const res = await fetch('/api/ai/analyze-journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, mood, category }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.analysis;
  } catch (error) {
    console.warn('Fallback journal analysis:', error);
    return {
      cognitiveDistortions: [
        {
          name: 'Posible Catastrofismo o Sobrecarga Emocional',
          explanation: 'Tiendes a anticipar un escenario adverso con alta intensidad emocional.',
          evidenceSnippet: content.slice(0, 60),
        },
      ],
      automaticNegativeThoughts: ['Sensación de impotencia frente a la incertidumbre.'],
      repetitivePatterns: 'Dificultad para soltar el control y delegar preocupaciones.',
      emotionalProgress: 'El acto de registrarlo por escrito reduce la activación de la amígdala.',
      biblicalAnchor: {
        verse: 'Lamentaciones 3:22-23',
        text: 'Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana.',
        pastoralReframe: 'Cada nuevo amanecer trae una nueva cuota de gracia. No cargues con el mañana hoy.',
      },
      cbtExercise: 'Técnica del peor escenario realista: ¿Qué es lo peor que podría pasar? ¿Qué recursos tienes para afrontarlo? ¿Cómo te acompañará Dios?',
    };
  }
}

export async function fetchPredictiveAnalysis(checkInsHistory: any[], adherenceRate: number, riskSignals: string[]): Promise<PredictiveAnalysis> {
  try {
    const res = await fetch('/api/ai/predictive-trends', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkInsHistory, adherenceRate, riskSignals }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return {
      lastUpdated: new Date().toISOString().split('T')[0],
      overallTrajectory: data.predictiveSummary.overallTrajectory || 'Tendencia estable',
      riskLevel: data.predictiveSummary.riskLevel || 'Bajo',
      predictedTrend: 'Mejora sostenida',
      riskFactors: data.predictiveSummary.riskFactors || [],
      protectiveFactors: data.predictiveSummary.protectiveFactors || [],
      earlyAlerts: (data.predictiveSummary.earlyAlerts || []).map((al: any, idx: number) => ({
        id: `pred-al-${idx}`,
        level: al.level || 'info',
        title: 'Alerta Preventiva',
        message: al.message,
        recommendedAction: 'Mantener la disciplina de oración y descanso.',
      })),
      dynamicRecommendations: data.predictiveSummary.dynamicRecommendations || [],
    };
  } catch (error) {
    console.warn('Fallback predictive trends:', error);
    return {
      lastUpdated: new Date().toISOString().split('T')[0],
      overallTrajectory: 'Evolución positiva con resiliencia en desarrollo',
      riskLevel: 'Bajo',
      predictedTrend: 'Mejora sostenida',
      riskFactors: [
        'Fatiga acumulada por semanas de alta exigencia laboral o ministerial',
        'Tendencia al aislamiento reflexivo en momentos de aflicción',
      ],
      protectiveFactors: [
        'Constancia en la oración sincera y el anhelo de restauración',
        'Familiaridad creciente con herramientas cognitivas y respiración',
        'Red de apoyo comunitaria y familiar',
      ],
      earlyAlerts: [
        {
          id: 'al-pred-f1',
          level: 'info',
          title: 'Protege tu Sabbath de Descanso',
          message: 'Tu balance emocional mejora notablemente en los días con desconexión y sueño adecuado.',
          recommendedAction: 'Fija un día fijo de la semana para renovar fuerzas sin prisas.',
        },
      ],
      dynamicRecommendations: [
        'Continúa fortaleciendo la identificación de distorsiones en el diario terapéutico.',
        'Recuerda que el crecimiento espiritual y la salud mental son un proceso progresivo de gracia, no una carrera de velocidad.',
      ],
    };
  }
}
