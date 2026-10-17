import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '2mb' }));

// Initialize GoogleGenAI server-side with telemetry User-Agent header
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

const SYSTEM_THERAPIST_PROMPT = `
Eres el Asistente Terapéutico y Orientador Espiritual de "PastoralMente Integral".
Tu misión es acompañar procesos de crecimiento espiritual, salud mental y restauración emocional, integrando con sabiduría y empatía:
1. Principios bíblicos cristianos fundamentados en la gracia, esperanza, perdón, identidad en Cristo, amor y renovación de la mente (Romanos 12:2, Filipenses 4:6-8, Salmo 147:3, Colosenses 3:12-14).
2. Modelos psicológicos validados basados en evidencia:
   - Terapia Cognitivo Conductual (TCC / reestructuración cognitiva)
   - Terapia de Aceptación y Compromiso (ACT / valores, defusión cognitiva)
   - Terapia Dialéctica Conductual (DBT / regulación emocional, tolerancia al malestar)
   - Psicología Positiva (fortalezas, gratitud, esperanza)
   - Terapia Centrada en Soluciones (excepciones, recursos previos)
   - Entrevista Motivacional (acompañar el cambio sin juzgar)
   - Terapia Sistémica Familiar y Narrativa

DIRECTRICES ÉTICAS CRÍTICAS:
- NUNCA diagnosticar trastornos mentales ni recetar medicamentos.
- NUNCA prometer curaciones mágicas instantáneas ni sustituir a profesionales de la salud mental o médicos.
- Si detectas ideación suicida, autolesiones o violencia, responde con calma, contención afectiva inmediata y recomiéndale comunicarse urgentemente con las líneas de ayuda y profesionales de salud de su comunidad.
- Tu tono debe ser cálido, compasivo, respetuoso, reflexivo, haciendo preguntas abiertas que inviten a la introspección y sugiriendo herramientas prácticas (respiración diafragmática, registro de pensamientos, oración honesta, pasos pequeños).
`;

// API Routes
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { messages, userContext } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    if (!ai) {
      // Intelligent fallback when API key is not yet set
      const lastUserMsg = messages[messages.length - 1]?.content || '';
      return res.json({
        reply: `Te escucho de corazón y valoro mucho tu valentía al compartir esto. 
En "PastoralMente Integral", creemos que Dios se preocupa por tu bienestar mental y espiritual integral (Salmo 34:18). 

Ante lo que mencionas ("${lastUserMsg.slice(0, 80)}..."), recordemos que la mente a menudo magnifica las tormentas. Desde la Terapia Cognitivo Conductual y Filipenses 4:6-7, te invito a hacer una pausa:
1. Respira hondo en 4 tiempos reteniendo la paz.
2. Identifica: ¿Qué pensamiento específico te está robando la paz en este momento?
3. ¿Qué promesa de Dios o evidencia real contradice ese temor?

Cuéntame un poco más: ¿cuándo comenzó esta sensación y qué te ha servido de refugio en momentos similares?`,
      });
    }

    const contents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents as any,
      config: {
        systemInstruction: `${SYSTEM_THERAPIST_PROMPT}\nContexto del usuario si existe: ${JSON.stringify(
          userContext || {}
        )}`,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Estoy aquí para escucharte y acompañarte.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Error in /api/ai/chat:', error);
    res.status(500).json({
      error: 'Error generating response',
      details: error.message,
      reply:
        'Estoy aquí contigo. En este momento hubo un breve retraso en la conexión, pero respira profundo: "El Señor es mi pastor, nada me faltará" (Salmo 23:1). ¿Deseas intentar formular de nuevo tu reflexión?',
    });
  }
});

app.post('/api/ai/generate-plan', async (req: Request, res: Response) => {
  try {
    const { assessmentProfile, primaryGoal } = req.body;

    if (!ai) {
      return res.json({
        plan: {
          title: 'Plan Integral de Restauración y Fortaleza',
          summary:
            'Un camino balanceado entre principios bíblicos de renovación y herramientas cognitivas para cultivar paz y constancia.',
          smartObjectives: [
            {
              id: 'obj-1',
              title: 'Disminuir la sobrecarga cognitiva y estrés diario',
              target: 'Dedicar 15 minutos diarios a respiración diafragmática y oración contemplativa',
              timeframe: '4 semanas',
              category: 'Emocional & Espiritual',
            },
            {
              id: 'obj-2',
              title: 'Reestructuración de pensamientos ansiosos',
              target: 'Registrar y refutar 3 pensamientos catastróficos por semana con verdades bíblicas (Fil. 4:8)',
              timeframe: '6 semanas',
              category: 'TCC & Renovación Mental',
            },
            {
              id: 'obj-3',
              title: 'Reconexión relacional y límites sanos',
              target: 'Tener una conversación vulnerable y asertiva semanal con un familiar o mentor',
              timeframe: '3 semanas',
              category: 'Relacional',
            },
          ],
          weeklyMilestones: [
            {
              week: 1,
              focus: 'Autoconocimiento y entrega: reconocer el agotamiento y descansar en la gracia.',
            },
            {
              week: 2,
              focus: 'Identificación de distorsiones cognitivas y filtros mentales negativos.',
            },
            {
              week: 3,
              focus: 'Tolerancia al malestar con DBT y anclaje en el Salmo 46.',
            },
            {
              week: 4,
              focus: 'Acción comprometida (ACT) alineada con tus valores espirituales.',
            },
          ],
          dailyActivities: [
            {
              id: 'act-1',
              title: 'Momento de Silencio & Anclaje (5 min)',
              type: 'mindfulness_biblico',
              description: 'Inhala diciendo "Mi paz os dejo", exhala diciendo "Suelta la ansiedad" (Juan 14:27).',
            },
            {
              id: 'act-2',
              title: 'Registro de Gratitud & Pensamiento Alternativo',
              type: 'tcc_gratitud',
              description: 'Escribe 3 cosas específicas por las que das gracias y un pensamiento que Dios renovó hoy.',
            },
            {
              id: 'act-3',
              title: 'Paseo de Activación Conductual (20 min)',
              type: 'salud_fisica',
              description: 'Caminata contemplando la creación sin pantallas.',
            },
          ],
          psychologicalExercises: [
            {
              name: 'Técnica STOP de DBT para momentos de tensión',
              steps: [
                'S (Stop): Detén lo que estás haciendo.',
                'T (Take a step back): Da un paso atrás física y mentalmente.',
                'O (Observe): Observa tus emociones y cuerpo sin juzgar.',
                'P (Proceed with grace): Procede con sabiduría bíblica y compasión.',
              ],
            },
            {
              name: 'Reencuadre Cognitivo en 3 Columnas',
              steps: [
                'Columna 1: El pensamiento automático negativo ("Todo va a salir mal").',
                'Columna 2: Distorsión detectada (Catastrofismo).',
                'Columna 3: Verdad equilibrada y bíblica (Rom. 8:28 - "Dios puede obrar aun en medio de la dificultad").',
              ],
            },
          ],
          biblicalReflections: [
            {
              verse: 'Filipenses 4:6-7',
              text: 'Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios...',
              reflection: 'La paz de Dios no es ausencia de problemas, sino la presencia protectora de Dios en tu corazón.',
            },
            {
              verse: 'Romanos 12:2',
              text: 'No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento...',
              reflection: 'Tu neuroplasticidad es un regalo de Dios: tu mente puede aprender nuevos surcos de verdad y esperanza.',
            },
          ],
          habits: [
            { name: 'Oración / Meditación matutina', frequency: 'Diario (10 min)' },
            { name: 'Hidratación consciente (2L agua)', frequency: 'Diario' },
            { name: 'Diario terapéutico nocturno', frequency: '3 veces por semana' },
            { name: 'Contacto significativo con comunidad o iglesia', frequency: 'Semanal' },
          ],
        },
      });
    }

    const prompt = `
Genera un Plan de Crecimiento Personalizado para un usuario de "PastoralMente Integral".
Perfil de Evaluación del usuario: ${JSON.stringify(assessmentProfile || {})}
Objetivo principal expresado: "${primaryGoal || 'Crecer en paz interior y superar la ansiedad'}"

Estructura el resultado estrictamente en formato JSON válido con los siguientes campos:
{
  "title": string,
  "summary": string,
  "smartObjectives": [
    { "id": string, "title": string, "target": string, "timeframe": string, "category": string }
  ],
  "weeklyMilestones": [
    { "week": number, "focus": string }
  ],
  "dailyActivities": [
    { "id": string, "title": string, "type": string, "description": string }
  ],
  "psychologicalExercises": [
    { "name": string, "steps": string[] }
  ],
  "biblicalReflections": [
    { "verse": string, "text": string, "reflection": string }
  ],
  "habits": [
    { "name": string, "frequency": string }
  ]
}
Asegúrate de combinar con rigor científico (TCC, ACT, DBT, Psicología Positiva) y fundamento bíblico edificante y libre de culpabilidad.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const jsonText = response.text?.trim() || '{}';
    const plan = JSON.parse(jsonText);
    res.json({ plan });
  } catch (error: any) {
    console.error('Error in /api/ai/generate-plan:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/ai/analyze-journal', async (req: Request, res: Response) => {
  try {
    const { content, mood, category } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Journal content is required' });
    }

    if (!ai) {
      // Heuristic fallback
      return res.json({
        analysis: {
          cognitiveDistortions: [
            {
              name: 'Generalización apresurada o Catastrofismo leve',
              explanation:
                'Tiendes a anticipar que la dificultad actual definirá todo el panorama venidero.',
              evidenceSnippet: content.slice(0, 70),
            },
          ],
          automaticNegativeThoughts: [
            'Sensación de incapacidad o autoexigencia elevada frente a las circunstancias.',
          ],
          repetitivePatterns:
            'Búsqueda de control frente a la incertidumbre; necesidad de mayor autocompasión.',
          emotionalProgress:
            'Expresar estas emociones por escrito ya es un acto de valentía y autoconciencia reflexiva.',
          biblicalAnchor: {
            verse: 'Lamentaciones 3:22-23',
            text: 'Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.',
            pastoralReframe:
              'No tienes que resolver todo hoy. La gracia de Dios viene en porciones diarias.',
          },
          cbtExercise:
            'Escribe qué le dirías a un hermano en la fe muy querido si estuviera en tu lugar exacto.',
        },
      });
    }

    const prompt = `
Analiza la siguiente entrada de diario terapéutico y espiritual de un usuario:
Categoría: ${category || 'Reflexión general'}
Estado de ánimo reportado: ${mood || 'Neutro'}
Contenido escrito por el usuario:
"${content}"

Instrucciones clínicas y bíblicas:
1. Detecta si hay Distorsiones Cognitivas (p. ej., Catastrofismo, Pensamiento Todo o Nada, Filtro Negativo, Lectura de Pensamiento, Deberías absolutistas, Descalificación de lo positivo).
2. Identifica Pensamientos Automáticos Negativos (PANs).
3. Identifica Patrones Repetitivos.
4. Evalúa el Progreso Emocional o fortaleza mostrada.
5. Provee un Ancla Bíblica relevante con un Reencuadre Pastoral empático.
6. Recomienda un breve ejercicio cognitivo o de aceptación (TCC / ACT / DBT).

Responde exclusivamente con un JSON válido con la siguiente estructura:
{
  "cognitiveDistortions": [
    { "name": string, "explanation": string, "evidenceSnippet": string }
  ],
  "automaticNegativeThoughts": string[],
  "repetitivePatterns": string,
  "emotionalProgress": string,
  "biblicalAnchor": {
    "verse": string,
    "text": string,
    "pastoralReframe": string
  },
  "cbtExercise": string
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const analysis = JSON.parse(response.text?.trim() || '{}');
    res.json({ analysis });
  } catch (error: any) {
    console.error('Error in /api/ai/analyze-journal:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/ai/predictive-trends', async (req: Request, res: Response) => {
  try {
    const { checkInsHistory, adherenceRate, riskSignals } = req.body;

    if (!ai) {
      return res.json({
        predictiveSummary: {
          overallTrajectory: 'Estable con tendencia a fortalecimiento gradual',
          riskLevel: 'Bajo',
          riskFactors: [
            'Fluctuaciones en el nivel de energía hacia mitad de semana',
            'Tendencia a postergar los momentos de pausa y descanso activo',
          ],
          protectiveFactors: [
            'Frecuencia constante de oración y conexión comunitaria',
            'Buena disposición para reestructurar pensamientos ansiosos',
            'Práctica regular del diario de gratitud',
          ],
          earlyAlerts: [
            {
              level: 'info',
              message:
                'Mantener el hábito de hidratación y desconexión de pantallas antes de dormir para mejorar el descanso.',
            },
          ],
          dynamicRecommendations: [
            'Intensificar el módulo de "Tolerancia al Malestar" si notas picos de prisa laboral.',
            'Celebrar las pequeñas victorias semanales como testimonio de gracia (1 Tes. 5:18).',
          ],
        },
      });
    }

    const prompt = `
Actúa como el motor de IA Predictiva de "PastoralMente Integral".
Analiza el historial de seguimiento del usuario:
Historial de Check-ins (últimos 14 días): ${JSON.stringify(checkInsHistory || [])}
Tasa de adherencia al plan: ${adherenceRate || 80}%
Señales observadas: ${JSON.stringify(riskSignals || [])}

Genera un análisis predictivo preventivo que ayude a anticipar desánimo, estrés acumulado o estancamiento espiritual.
Devuelve únicamente JSON con:
{
  "overallTrajectory": string,
  "riskLevel": "Bajo" | "Moderado" | "Atención Requerida",
  "riskFactors": string[],
  "protectiveFactors": string[],
  "earlyAlerts": [
    { "level": "info" | "warning" | "alert", "message": string }
  ],
  "dynamicRecommendations": string[]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const predictiveSummary = JSON.parse(response.text?.trim() || '{}');
    res.json({ predictiveSummary });
  } catch (error: any) {
    console.error('Error in /api/ai/predictive-trends:', error);
    res.status(500).json({ error: error.message });
  }
});

// Mount Vite or serve static in dev/prod
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PastoralMente Integral server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
