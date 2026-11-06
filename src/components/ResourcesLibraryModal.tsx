import React, { useState } from 'react';
import { BookOpen, Heart, Users, Shield, Sparkles, X, ChevronRight } from 'lucide-react';

interface ResourcesLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ResourceArticle {
  id: string;
  category: 'Familia' | 'Ansiedad' | 'Duelo' | 'Relaciones' | 'Liderazgo';
  title: string;
  biblicalFoundation: string;
  summary: string;
  keyPoints: string[];
}

const ARTICLES: ResourceArticle[] = [
  {
    id: 'art-1',
    category: 'Ansiedad',
    title: 'Comprendiendo la Ansiedad: Entre la Fisiología y la Fe',
    biblicalFoundation: 'Filipenses 4:6-7 | Mateo 6:25-34',
    summary: 'La ansiedad no es un pecado ni una falta de fe; es una respuesta psicofisiológica ante una sobrecarga percibida. Aprender a regularla combina el cuidado del cuerpo con el descanso en Dios.',
    keyPoints: [
      'Normalizar la emoción: El cuerpo activa la alarma cuando siente peligro o agotamiento crónico.',
      'Diferenciar afán improductivo de ocupación responsable.',
      'Práctica de respiración diafragmática y entrega activa en oración (1 Pedro 5:7).',
    ],
  },
  {
    id: 'art-2',
    category: 'Duelo',
    title: 'El Duelo y la Esperanza: El Camino de la Reconstrucción',
    biblicalFoundation: 'Salmo 34:18 | 1 Tesalonicenses 4:13',
    summary: 'El dolor por una pérdida significativa requiere tiempo, aceptación y validación. La esperanza bíblica no niega las lágrimas, las sostiene en la gracia de Dios.',
    keyPoints: [
      'Las etapas del duelo no son lineales; tienen fluctuaciones naturales.',
      'Evitar frases hechas o espiritualizaciones que invaliden el dolor ajeno.',
      'Acompañar desde la presencia silenciosa y la compasión activa.',
    ],
  },
  {
    id: 'art-3',
    category: 'Relaciones',
    title: 'Comunicación Asertiva y Resolución de Conflictos en la Pareja',
    biblicalFoundation: 'Efesios 4:26-32 | 1 Corintios 13:4-7',
    summary: 'Las relaciones saludables no son aquellas que no tienen desacuerdos, sino las que saben reparar vínculos y comunicarse con verdad y ternura.',
    keyPoints: [
      'Expresar necesidades usando "Yo siento..." en vez de ataques con "Tú siempre...".',
      'Desescalar el tono antes de llegar a la hostilidad (Proverbios 15:1).',
      'El perdón como compromiso diario de restauración relacional.',
    ],
  },
  {
    id: 'art-4',
    category: 'Liderazgo',
    title: 'Prevención del Burnout Pastoral y Cuidado del Servidor',
    biblicalFoundation: 'Éxodo 18:17-23 | 1 Reyes 19:4-8',
    summary: 'Servir a Dios no debe costar la salud mental o familiar. El descanso sagrado (Sabbath) es un mandato para renovar fuerzas y depender de la soberanía divina.',
    keyPoints: [
      'Aprender a delegar y establecer límites claros entre ministerio y familia.',
      'El ejemplo del profeta Elías: descanso físico, alimentación y renovación espiritual.',
      'La vulnerabilidad saludable y la necesidad de mentores y supervisión mutua.',
    ],
  },
];

export const ResourcesLibraryModal: React.FC<ResourcesLibraryModalProps> = ({ isOpen, onClose }) => {
  const [selectedArticle, setSelectedArticle] = useState<ResourceArticle | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full border border-sky-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-emerald-600 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Biblioteca de Recursos &amp; Guías Psicoespirituales</h2>
              <p className="text-xs text-sky-100">Lecturas prácticas, familia, emociones y salud mental en la fe</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {selectedArticle ? (
            <div className="space-y-4 animate-in fade-in duration-150">
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1"
              >
                ← Volver al catálogo de artículos
              </button>

              <div>
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                  {selectedArticle.category}
                </span>
                <h3 className="text-lg font-extrabold text-slate-800 mt-2">{selectedArticle.title}</h3>
                <span className="text-xs font-semibold text-emerald-700 block mt-1">
                  Base Bíblica: {selectedArticle.biblicalFoundation}
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm leading-relaxed text-slate-700">
                <p className="font-medium">{selectedArticle.summary}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Principios Clave para tu Bienestar:</h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  {selectedArticle.keyPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ARTICLES.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className="p-5 rounded-2xl border border-slate-200/90 hover:border-sky-300 hover:shadow-md transition-all cursor-pointer bg-white flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 group-hover:bg-sky-50 group-hover:text-sky-700 transition-colors">
                      {art.category}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-sky-700 transition-colors">
                      {art.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-sky-600 pt-2 border-t border-slate-100">
                    <span>Leer guía completa</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Recursos psicoeducativos de acceso gratuito
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-900 transition-all"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
