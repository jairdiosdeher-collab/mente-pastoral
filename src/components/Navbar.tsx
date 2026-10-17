import React from 'react';
import { 
  Heart, 
  Brain, 
  ShieldAlert, 
  UserCheck, 
  User, 
  Sparkles, 
  Compass, 
  BookOpen, 
  Calendar, 
  BarChart3, 
  BookHeart, 
  Menu, 
  X,
  Stethoscope
} from 'lucide-react';
import { ActiveTab, UserRole } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onOpenCrisis: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  onOpenCrisis,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Compass },
    { id: 'assessment', label: 'Evaluación', icon: Brain },
    { id: 'plan', label: 'Plan de Crecimiento', icon: Sparkles },
    { id: 'therapist', label: 'Asistente IA', icon: Heart },
    { id: 'tracking', label: 'Seguimiento', icon: Calendar },
    { id: 'journal', label: 'Diario TCC', icon: BookHeart },
    { id: 'school', label: 'Escuela', icon: BookOpen },
    { id: 'predictive', label: 'IA Predictiva', icon: BarChart3 },
    ...(userRole === 'professional' 
      ? [{ id: 'professional_panel', label: 'Panel Pastor/Psicólogo', icon: Stethoscope }] 
      : []),
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-600 via-sky-500 to-emerald-500 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
              <Heart className="w-6 h-6 text-white absolute" />
              <div className="w-2.5 h-2.5 bg-emerald-300 rounded-full absolute -top-0.5 -right-0.5 border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-sky-800 to-emerald-700 bg-clip-text text-transparent">
                  PastoralMente
                </span>
                <span className="text-xs px-2 py-0.5 font-bold uppercase tracking-wider rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  Integral
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Fe Bíblica &amp; Psicología Basada en Evidencia
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as ActiveTab)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 border border-sky-200/80 shadow-xs'
                      : 'text-slate-600 hover:text-sky-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions: SOS Button & Role Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* SOS Crisis Button */}
            <button
              onClick={onOpenCrisis}
              className="flex items-center space-x-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/80 font-bold text-xs shadow-xs hover:shadow-md transition-all duration-150 animate-pulse hover:animate-none"
              title="Protocolo de intervención en crisis 24/7"
            >
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span className="hidden xs:inline">SOS Crisis</span>
            </button>

            {/* Role Switcher Pill */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
              <button
                onClick={() => setUserRole('member')}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  userRole === 'member'
                    ? 'bg-white text-sky-800 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Modo de usuario / persona en acompañamiento"
              >
                <User className="w-3.5 h-3.5 text-sky-600" />
                <span className="hidden sm:inline">Usuario</span>
              </button>

              <button
                onClick={() => {
                  setUserRole('professional');
                  setActiveTab('professional_panel');
                }}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  userRole === 'professional'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Modo de gestión para Pastores o Psicólogos clínicos"
              >
                <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Pastor/Psicólogo</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-1.5 pb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as ActiveTab);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 border border-sky-200'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
