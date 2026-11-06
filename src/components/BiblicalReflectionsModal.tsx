import React, { useState } from 'react';
import { BookOpen, Heart, Sparkles, Copy, Check, X, Bookmark, Share2 } from 'lucide-react';

interface BiblicalReflectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToChat?: () => void;
}

interface ReflectionItem {
  id: string;
  category: 'Paz' | 'Ansiedad' | 'Consuelo' | 'Esperanza' | 'Perdon' | 'Identidad';
  categoryLabel: string;
  verse: string;
  text: string;
  pastoralReflection: string;
  dailyApplication: string;
}

const REFLECTIONS: ReflectionItem[] = [
  {
    id: 'ref-1',
    category: 'Ansiedad',
    categoryLabel: 'Ansiedad y Afán',
    verse: 'Filipenses 4:6-7 (RVR1960)',
    text: 'Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias. Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.',
    pastoralReflection: 'La paz que Dios promete no depende de que desaparezcan todas las dificultades, sino de la presencia protectora de Dios como un centinela alrededor de tu mente. No tienes que resolver todo hoy; entrega tu carga en oración sincera.',
    dailyApplication: 'Haz una pausa de 2 minutos. Escribe tu mayor preocupación en un papel, ora entregándosela al Señor y respira profundo recordando que Él cuida de ti.',
  },
  {
    id: 'ref-2',
    category: 'Paz',
    categoryLabel: 'Paz y Serenidad',
    verse: 'Juan 14:27 (RVR1960)',
    text: 'La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón, ni tenga miedo.',
    pastoralReflection: 'La paz del mundo es frágil y depende de circunstancias externas favorables. La paz de Cristo es un ancla interna que permanece firme aun en medio de la tormenta más recia.',
    dailyApplication: 'Cada vez que sientas que la prisa o el miedo tocan a tu puerta hoy, repite en silencio: "Cristo me ha dado su paz, no temeré".',
  },
  {
    id: 'ref-3',
    category: 'Consuelo',
    categoryLabel: 'Consuelo en el Quebranto',
    verse: 'Salmos 34:18 (RVR1960)',
    text: 'Cercano está Jehová a los quebrantados de corazón; y salva a los contritos de espíritu.',
    pastoralReflection: 'Dios nunca está más cerca de ti que cuando sientes que tu corazón se ha roto. No tienes que fingir fortaleza espiritual cuando hay dolor; el Señor acoge tus lágrimas con infinita ternura.',
    dailyApplication: 'Permítete sentir tu emoción sin juzgarte con culpa. Dios no te rechaza por estar triste; su gracia te sostiene en el proceso de sanidad.',
  },
  {
    id: 'ref-4',
    category: 'Esperanza',
    categoryLabel: 'Esperanza y Nuevas Fuerzas',
    verse: 'Lamentaciones 3:22-23 (RVR1960)',
    text: 'Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.',
    pastoralReflection: 'Cada nuevo amanecer es una página en blanco que Dios te entrega. Los errores o el agotamiento de ayer no definen el propósito que Dios tiene reservado para ti hoy.',
    dailyApplication: 'Agradece tres misericordias sencillas de hoy: el aire que respiras, un nuevo día y la certeza de que Dios camina contigo.',
  },
  {
    id: 'ref-5',
    category: 'Perdon',
    categoryLabel: 'Perdón y Sanidad del Corazón',
    verse: 'Colosenses 3:13 (RVR1960)',
    text: 'Soportándoos con paciencia unos a otros y perdonándoos mutuamente, si alguno tiene queja contra otro; como Cristo os perdonó, así también hacedlo vosotros.',
    pastoralReflection: 'Perdonar no es minimizar el daño ni justificar lo que estuvo mal; perdonar es desarmar el resentimiento para que la herida ajena no siga envenenando tu futuro.',
    dailyApplication: 'Pídele a Dios la gracia de soltar el deseo de revancha hacia quien te ofendió. El perdón es un proceso de libertad para tu propia alma.',
  },
  {
    id: 'ref-6',
    category: 'Identidad',
    categoryLabel: 'Identidad y Propósito',
    verse: 'Jeremías 29:11 (RVR1960)',
    text: 'Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.',
    pastoralReflection: 'Tu valor no lo determinan tus fracasos pasados, tus logros materiales ni la opinión de los demás. Eres profundamente amado por un Dios que diseñó tu vida con un propósito eterno.',
    dailyApplication: 'Afirma tu identidad en Cristo: no eres un accidente, tu vida tiene significado y Dios no ha terminado su buena obra en ti.',
  },
];

export const BiblicalReflectionsModal: React.FC<BiblicalReflectionsModalProps> = ({
  isOpen,
  onClose,
  onNavigateToChat,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredReflections =
    activeCategory === 'all'
      ? REFLECTIONS
      : REFLECTIONS.filter((r) => r.category === activeCategory);

  const handleCopy = (verse: string, text: string, id: string) => {
    navigator.clipboard.writeText(`"${text}" — ${verse}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

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
              <h2 className="text-lg font-bold">Reflexiones y Anclas Bíblicas</h2>
              <p className="text-xs text-sky-100">Biblia Reina Valera 1960 • Aliento para tu corazón</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center space-x-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeCategory === 'all'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Todas ({REFLECTIONS.length})
          </button>
          <button
            onClick={() => setActiveCategory('Paz')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeCategory === 'Paz'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Paz
          </button>
          <button
            onClick={() => setActiveCategory('Ansiedad')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeCategory === 'Ansiedad'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Ansiedad
          </button>
          <button
            onClick={() => setActiveCategory('Consuelo')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeCategory === 'Consuelo'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Consuelo
          </button>
          <button
            onClick={() => setActiveCategory('Esperanza')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeCategory === 'Esperanza'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Esperanza
          </button>
          <button
            onClick={() => setActiveCategory('Perdon')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeCategory === 'Perdon'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Perdón
          </button>
        </div>

        {/* Reflections List */}
        <div className="p-6 overflow-y-auto space-y-5">
          {filteredReflections.map((ref) => (
            <div
              key={ref.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-sky-300 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                  {ref.categoryLabel}
                </span>
                <button
                  onClick={() => handleCopy(ref.verse, ref.text, ref.id)}
                  className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 font-semibold"
                >
                  {copiedId === ref.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Verse Text */}
              <blockquote className="text-sm font-serif italic text-slate-900 border-l-4 border-emerald-500 pl-4 py-1 leading-relaxed bg-emerald-50/30 rounded-r-xl">
                "{ref.text}"
                <footer className="text-xs font-sans font-bold text-emerald-800 not-italic mt-1.5">
                  — {ref.verse}
                </footer>
              </blockquote>

              {/* Pastoral Reframe */}
              <div className="bg-slate-50 p-3.5 rounded-xl text-xs space-y-1 border border-slate-100">
                <span className="font-bold text-sky-900 block">Orientación Pastoral:</span>
                <p className="text-slate-700 leading-relaxed">{ref.pastoralReflection}</p>
              </div>

              {/* Daily Application */}
              <div className="text-xs text-emerald-900 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/60 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Aplicación práctica para hoy: </span>
                  <span>{ref.dailyApplication}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Recursos abiertos para fortalecer tu fe y serenidad.
          </p>
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
