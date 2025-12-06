import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';

export const Layout = ({ children }: { children: ReactNode }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-dark-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-brand-500/10 border border-brand-500/20">
                <img src="/logo.svg" alt="TaskForge" className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-white/80">
                TaskForge
              </h1>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 border-r border-white/10 pr-4 sm:pr-6">
                <button 
                  onClick={() => changeLanguage('en')} 
                  className={`text-xs font-medium transition-colors cursor-pointer ${i18n.language === 'en' ? 'text-brand-400' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => changeLanguage('es')} 
                  className={`text-xs font-medium transition-colors cursor-pointer ${i18n.language === 'es' ? 'text-brand-400' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  ES
                </button>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-xs text-slate-400 font-medium">{t('layout.welcome_back')}</span>
                  <span className="text-sm text-slate-200 font-semibold capitalize">{user?.name}</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-500/20 border border-white/10">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
              <Button 
                variant="ghost" 
                onClick={handleSignOut} 
                className="text-sm text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
              >
                {t('layout.sign_out')}
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};
