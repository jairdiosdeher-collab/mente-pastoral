import React, { useState } from 'react';
import { 
  BookHeart, 
  Sparkles, 
  Brain, 
  BookOpen, 
  Plus, 
  Search, 
  Tag, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Clock,
  Send
} from 'lucide-react';
import { JournalEntry } from '../types';
import { analyzeJournalEntry } from '../services/api';

interface JournalModuleProps {
  entries: JournalEntry[];
  onAddEntry: (entry: JournalEntry) => void;
  onUpdateEntry: (entry: JournalEntry) => void;
}

export const JournalModule: React.FC<JournalModuleProps> = ({
  entries,
  onAddEntry,
  onUpdateEntry,
}) => {
  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'pensamiento' | 'emocion' | 'oracion' | 'reflexion' | 'gratitud'>('pensamiento');
  const [moodTag, setMoodTag] = useState('Inquieto con deseo de paz');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(entries[0] || null);

  const handleSaveEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsAnalyzing(true);

    const tempId = `jrn-${Date.now()}`;
    const newEntry: JournalEntry = {
      id: tempId,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      title: title.trim() || 'Entrada sin título',
      content: content.trim(),
      category,
      moodTag,
      analyzing: true,
    };

    onAddEntry(newEntry);
    setIsWriting(false);
    setTitle('');
    setContent('');

    try {
      // Analyze with Gemini
      const analysis = await analyzeJournalEntry(newEntry.content, newEntry.moodTag, newEntry.category);
      const analyzedEntry: JournalEntry = {
        ...newEntry,
        analysis,
        analyzing: false,
      };
      onUpdateEntry(analyzedEntry);
      setSelectedEntry(analyzedEntry);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const filteredEntries = entries.filter((e) =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-sky-100 text-xs font-bold uppercase tracking-wider mb-1">
            <BookHeart className="w-4 h-4 text-emerald-300" />
            <span>Módulo 5 • Diario Terapéutico &amp; Reencuadre Cognitivo</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Diario Terapéutico Inteligente
          </h1>
          <p className="text-sky-100 text-xs sm:text-sm max-w-xl mt-1">
            Escribe tus pensamientos, oraciones y emociones. La IA detectará distorsiones cognitivas (TCC), patrones repetitivos y te ofrecerá anclas bíblicas de gracia.
          </p>
        </div>

        <button
          onClick={() => setIsWriting(true)}
          className="px-5 py-3 rounded-2xl bg-white text-sky-800 hover:bg-sky-50 font-bold text-xs sm:text-sm shadow-md shadow-sky-900/20 transition-all hover:scale-105 flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4 text-sky-600" />
          <span>Escribir Nueva Entrada</span>
        </button>
      </div>

      {/* WRITING MODAL / DRAWER */}
      {isWriting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-sky-100 overflow-hidden flex flex-col max-h-[92vh]">
            
            <div className="bg-gradient-to-r from-sky-700 to-emerald-600 px-6 py-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base">Escribir en el Diario Terapéutico</h3>
                <p className="text-xs text-sky-100">Expresa con libertad: Dios conoce lo que hay en tu corazón</p>
              </div>
              <button onClick={() => setIsWriting(false)} className="text-white/80 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveEntry} className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
              
              <div>
                <label className="font-bold block mb-1">Título de tu reflexión:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Lucha contra la autoexigencia o Gratitud matutina"
                  className="w-full p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Categoría:</label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  >
                    <option value="pensamiento">Pensamiento o Preocupación (TCC)</option>
                    <option value="emocion">Emoción Intensa (DBT)</option>
                    <option value="oracion">Oración o Clamor</option>
                    <option value="reflexion">Reflexión Bíblica</option>
                    <option value="gratitud">Gratitud y Esperanza</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1">¿Cómo te sientes al escribir?:</label>
                  <input
                    type="text"
                    value={moodTag}
                    onChange={(e) => setMoodTag(e.target.value)}
                    placeholder="Ej: Ansioso pero buscando paz"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Escribe lo que sientes, piensas o deseas orar:</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  required
                  placeholder="Describe la situación, lo que tu mente te está diciendo y lo que sientes en tu cuerpo. No te preocupes por la redacción perfecta..."
                  className="w-full p-3.5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none text-xs leading-relaxed"
                />
              </div>

              <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start space-x-2 text-[11px] text-sky-900">
                <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>
                  Al guardar, la IA analizará con empatía si hay pensamientos automáticos negativos (PANs) o distorsiones cognitivas, sugiriéndote un reencuadre bíblico y un ejercicio práctico de TCC.
                </span>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsWriting(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-600 text-white font-bold shadow-md shadow-sky-600/20 flex items-center space-x-2"
                >
                  <span>Guardar y Analizar con IA</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Main Journal Layout: Left list, Right Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Entries List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs flex items-center space-x-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar en mis reflexiones..."
              className="w-full text-xs bg-transparent focus:outline-none text-slate-800"
            />
          </div>

          <div className="space-y-3">
            {filteredEntries.map((entry) => {
              const isSelected = selectedEntry?.id === entry.id;
              return (
                <div
                  key={entry.id}
                  onClick={() => setSelectedEntry(entry)}
                  className={`p-4 rounded-3xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-sky-50/80 border-sky-300 shadow-xs ring-1 ring-sky-200'
                      : 'bg-white border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-sky-800 uppercase tracking-wider bg-sky-100/70 px-2 py-0.5 rounded-md">
                      {entry.category}
                    </span>
                    <span className="text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{entry.date}</span>
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {entry.title}
                  </h4>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {entry.content}
                  </p>

                  <div className="pt-1 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 italic">"{entry.moodTag}"</span>
                    {entry.analysis?.cognitiveDistortions && entry.analysis.cognitiveDistortions.length > 0 && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        Distorsión detectada
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Entry Detail & Cognitive Analysis (7 cols) */}
        <div className="lg:col-span-7">
          {selectedEntry ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              
              {/* Header */}
              <div className="border-b border-slate-100 pb-4 space-y-1">
                <div className="flex items-center space-x-2 text-xs">
                  <span className="font-bold text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider text-[10px]">
                    {selectedEntry.category}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{selectedEntry.date}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">{selectedEntry.title}</h2>
                <span className="text-xs text-slate-500 italic block">Estado: {selectedEntry.moodTag}</span>
              </div>

              {/* Raw User Text */}
              <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                {selectedEntry.content}
              </div>

              {/* AI Analysis Section */}
              {selectedEntry.analysis ? (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-sky-700">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Diagnóstico Cognitivo &amp; Ancla Bíblica</span>
                  </div>

                  {/* Cognitive Distortions */}
                  {selectedEntry.analysis.cognitiveDistortions.length > 0 ? (
                    <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-2">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <h4 className="text-xs font-bold text-amber-900">Distorsiones Cognitivas Identificadas:</h4>
                      </div>
                      {selectedEntry.analysis.cognitiveDistortions.map((d, i) => (
                        <div key={i} className="text-xs text-amber-950 space-y-1 pl-6">
                          <p className="font-bold">• {d.name}</p>
                          <p className="text-[11px] text-amber-900">{d.explanation}</p>
                          {d.evidenceSnippet && (
                            <p className="text-[10px] italic text-amber-800 bg-white/70 p-1.5 rounded-lg border border-amber-200">
                              Evidencia: "{d.evidenceSnippet}"
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>No se detectaron distorsiones graves; pensamiento equilibrado y en comunión.</span>
                    </div>
                  )}

                  {/* Biblical Anchor & Pastoral Reframe */}
                  {selectedEntry.analysis.biblicalAnchor && (
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-sky-50 border border-emerald-200/80 space-y-2.5">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-emerald-700" />
                        <h4 className="text-xs font-bold text-emerald-900">
                          Ancla Bíblica: {selectedEntry.analysis.biblicalAnchor.verse}
                        </h4>
                      </div>
                      <blockquote className="italic text-xs text-emerald-950 border-l-2 border-emerald-500 pl-3">
                        "{selectedEntry.analysis.biblicalAnchor.text}"
                      </blockquote>
                      <p className="text-xs text-slate-700 pt-1">
                        <strong>Reencuadre Pastoral:</strong> {selectedEntry.analysis.biblicalAnchor.pastoralReframe}
                      </p>
                    </div>
                  )}

                  {/* CBT Exercise */}
                  {selectedEntry.analysis.cbtExercise && (
                    <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200/80 space-y-1.5 text-xs">
                      <div className="flex items-center space-x-2 text-sky-900 font-bold">
                        <Brain className="w-4 h-4 text-sky-600" />
                        <span>Ejercicio Cognitivo Sugerido (TCC):</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">
                        {selectedEntry.analysis.cbtExercise}
                      </p>
                    </div>
                  )}

                </div>
              ) : selectedEntry.analyzing ? (
                <div className="p-6 text-center text-xs text-slate-500 space-y-2">
                  <div className="w-6 h-6 border-2 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p>La IA está analizando los patrones y distorsiones cognitivas de tu escrito...</p>
                </div>
              ) : null}

            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-slate-200/80 text-center text-slate-400 space-y-2">
              <BookHeart className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-sm">Selecciona una entrada para ver su análisis terapéutico y ancla bíblica.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
