import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Award, 
  Clock, 
  Brain, 
  Shield, 
  Flame, 
  Heart, 
  Smile, 
  Users, 
  Compass, 
  ArrowLeft,
  ChevronRight,
  PlayCircle
} from 'lucide-react';
import { Course, CourseLesson } from '../types';

interface SchoolModuleProps {
  courses: Course[];
  onUpdateCourses: (courses: Course[]) => void;
}

export const SchoolModule: React.FC<SchoolModuleProps> = ({ courses, onUpdateCourses }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<CourseLesson | null>(null);

  const handleSelectCourse = (c: Course) => {
    setSelectedCourse(c);
    setSelectedLesson(c.lessons[0] || null);
  };

  const toggleLessonCompleted = (courseId: string, lessonId: string) => {
    const updatedCourses = courses.map((c) => {
      if (c.id === courseId) {
        const updatedLessons = c.lessons.map((l) =>
          l.id === lessonId ? { ...l, completed: !l.completed } : l
        );
        const completedCount = updatedLessons.filter((l) => l.completed).length;
        const progress = Math.round((completedCount / Math.max(1, updatedLessons.length)) * 100);
        return {
          ...c,
          lessons: updatedLessons,
          progressPercent: progress,
        };
      }
      return c;
    });

    onUpdateCourses(updatedCourses);

    // Update local selected course & lesson
    const updatedSelectedCourse = updatedCourses.find((c) => c.id === courseId);
    if (updatedSelectedCourse) {
      setSelectedCourse(updatedSelectedCourse);
      const updatedSelectedLesson = updatedSelectedCourse.lessons.find((l) => l.id === lessonId);
      if (updatedSelectedLesson) setSelectedLesson(updatedSelectedLesson);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-sky-100 text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4 text-emerald-300" />
            <span>Módulo 7 • Psicoeducación &amp; Discipulado</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Escuela de Crecimiento Integral
          </h1>
          <p className="text-sky-100 text-xs sm:text-sm max-w-xl mt-1">
            Cursos interactivos sobre los 10 temas vitales de la salud mental y espiritual. Aprende herramientas clínicas y promesas bíblicas para transformar tu vida.
          </p>
        </div>

        {selectedCourse && (
          <button
            onClick={() => {
              setSelectedCourse(null);
              setSelectedLesson(null);
            }}
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs flex items-center space-x-2 transition-all shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Catálogo</span>
          </button>
        )}
      </div>

      {/* CATALOG VIEW */}
      {!selectedCourse ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleSelectCourse(course)}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-sky-300 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-100 px-2.5 py-1 rounded-md">
                    {course.category}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    {course.progressPercent}% completado
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 group-hover:text-sky-600 transition-colors">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                <div className="text-[11px] font-semibold text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {course.badge}
                </div>
              </div>

              {/* Progress Bar & Footer */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-300"
                    style={{ width: `${course.progressPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{course.lessons.length} lecciones prácticas</span>
                  <span className="font-bold text-sky-600 group-hover:translate-x-0.5 transition-transform flex items-center">
                    Entrar <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* COURSE DETAIL & LESSON VIEWER */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Lessons Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900">Lecciones del Curso</h3>
                <span className="text-xs font-extrabold text-emerald-600">{selectedCourse.progressPercent}%</span>
              </div>

              <div className="space-y-2">
                {selectedCourse.lessons.map((lesson, idx) => {
                  const isCurrent = selectedLesson?.id === lesson.id;
                  return (
                    <div
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lesson)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3 ${
                        isCurrent
                          ? 'bg-sky-50 border-sky-300 shadow-2xs'
                          : 'bg-slate-50 border-slate-200/80 hover:bg-white'
                      }`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLessonCompleted(selectedCourse.id, lesson.id);
                        }}
                        className="mt-0.5"
                      >
                        {lesson.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-300" />
                        )}
                      </button>

                      <div className="flex-1">
                        <span className="text-[10px] text-slate-400 font-bold">Lección {idx + 1}</span>
                        <h4 className={`text-xs font-bold ${lesson.completed ? 'text-slate-500' : 'text-slate-800'}`}>
                          {lesson.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1" /> {lesson.duration}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedCourse.progressPercent === 100 && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center space-x-2.5">
                  <Award className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="font-bold">¡Felicidades! Has completado este curso y asimilado las herramientas.</span>
                </div>
              )}
            </div>
          </div>

          {/* Lesson Content Area (8 cols) */}
          <div className="lg:col-span-8">
            {selectedLesson ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                
                {/* Lesson Header */}
                <div className="border-b border-slate-100 pb-4 space-y-2">
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="font-bold text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-md text-[10px] uppercase">
                      {selectedLesson.psychologicalModel}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md text-[10px]">
                      {selectedLesson.scriptureReference}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900">{selectedLesson.title}</h2>
                </div>

                {/* Content Paragraphs */}
                <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedLesson.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Practical Tool Box */}
                <div className="bg-gradient-to-br from-sky-50 to-emerald-50 p-5 rounded-3xl border border-sky-100 space-y-3">
                  <div className="flex items-center space-x-2 text-sky-900 font-bold text-xs uppercase tracking-wider">
                    <Brain className="w-4 h-4 text-sky-600" />
                    <span>Herramienta Psicológica Práctica: {selectedLesson.practicalTool.name}</span>
                  </div>

                  <div className="space-y-2">
                    {selectedLesson.practicalTool.howToApply.map((step, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700 bg-white/80 p-2.5 rounded-xl border border-sky-100/60">
                        <span className="w-4 h-4 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Biblical Promise */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                  <span className="font-bold text-emerald-800 uppercase tracking-wider text-[10px] block">
                    Promesa Bíblica:
                  </span>
                  <blockquote className="italic font-medium">"{selectedLesson.biblicalPromise}"</blockquote>
                </div>

                {/* Reflection Prompt */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
                  <span className="font-bold text-amber-800 uppercase tracking-wider text-[10px] block">
                    Pregunta para tu Diario / Oración:
                  </span>
                  <p className="font-medium">{selectedLesson.reflectionPrompt}</p>
                </div>

                {/* Toggle Lesson Completion Action */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => toggleLessonCompleted(selectedCourse.id, selectedLesson.id)}
                    className={`px-5 py-2.5 rounded-2xl font-bold text-xs flex items-center space-x-2 transition-all ${
                      selectedLesson.completed
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/20'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{selectedLesson.completed ? 'Lección Completada' : 'Marcar como Completada'}</span>
                  </button>
                </div>

              </div>
            ) : null}
          </div>

        </div>
      )}

    </div>
  );
};
