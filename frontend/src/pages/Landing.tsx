import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

export const Landing = () => {
  const { isAuthenticated } = useAuth();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="w-full border-b border-white/10 bg-dark-900/80 backdrop-blur-xl sticky top-0 z-50">
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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 mr-2 border-r border-white/10 pr-4">
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
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button className="text-sm font-medium">
                    {t('landing.navbar.dashboard')}
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/sign-in">
                    <Button variant="ghost" className="text-sm font-medium">
                      {t('landing.navbar.sign_in')}
                    </Button>
                  </Link>
                  <Link to="/sign-up">
                    <Button className="text-sm font-medium">
                      {t('landing.navbar.get_started')}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="grow">
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              v1.0 is now live
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8">
              {t('landing.hero.title_part1')} <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-brand-400 to-purple-400">
                {t('landing.hero.title_part2')}
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              {t('landing.hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={isAuthenticated ? "/dashboard" : "/sign-up"}>
                <Button className="h-12 px-8 text-lg shadow-brand-500/25 shadow-xl">
                  {isAuthenticated ? t('landing.hero.cta_dashboard') : t('landing.hero.cta_primary')}
                </Button>
              </Link>
              {!isAuthenticated && (
                <Link to="/sign-in">
                  <Button variant="secondary" className="h-12 px-8 text-lg bg-dark-800/50 backdrop-blur-sm">
                    {t('landing.hero.cta_secondary')}
                  </Button>
                </Link>
              )}
            </div>

            {/* Hero Image / Preview */}
            <div className="mt-20 relative mx-auto max-w-5xl">
              <div className="absolute -inset-1 bg-linear-to-r from-brand-500 to-purple-600 rounded-2xl blur opacity-20"></div>
              <div className="relative rounded-2xl border border-white/10 bg-dark-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                  </div>
                </div>
                <div className="p-8 grid gap-6 md:grid-cols-3">
                  {/* Mock Task Cards */}
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="glass-panel p-4 rounded-xl border border-white/5 bg-white/5">
                      <div className="h-2 w-1/3 bg-white/10 rounded mb-3"></div>
                      <div className="h-2 w-2/3 bg-white/5 rounded mb-2"></div>
                      <div className="h-2 w-1/2 bg-white/5 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-dark-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">{t('landing.features.title')}</h2>
              <p className="text-slate-400">{t('landing.features.subtitle')}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: t('landing.features.glassmorphism_title'),
                  desc: t('landing.features.glassmorphism_desc'),
                  icon: (
                    <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  )
                },
                {
                  title: t('landing.features.auth_title'),
                  desc: t('landing.features.auth_desc'),
                  icon: (
                    <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )
                },
                {
                  title: t('landing.features.realtime_title'),
                  desc: t('landing.features.realtime_desc'),
                  icon: (
                    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )
                }
              ].map((feature, idx) => (
                <div key={idx} className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-8">{t('landing.tech_stack.title')}</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-70">
              {[
                {
                  name: 'React',
                  icon: (
                    <svg className="w-8 h-8 text-[#61DAFB]" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
                      <g stroke="currentColor" strokeWidth="1" fill="none">
                        <ellipse rx="10" ry="4.5"></ellipse>
                        <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
                        <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
                      </g>
                    </svg>
                  )
                },
                {
                  name: 'TypeScript',
                  icon: (
                    <svg className="w-8 h-8 text-[#3178C6]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M2 2h20a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm4 5h8v2h-3v8h-2V9H6V7zm10 0h6v2h-4v2h4v6h-6v-2h4v-2h-4V7z" />
                    </svg>
                  )
                },
                {
                  name: 'Tailwind',
                  icon: (
                    <svg className="w-8 h-8 text-[#38B2AC]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.001 4.8C8.801 4.8 6.801 6.4 6.001 9.6C7.201 8 8.601 7.4 10.201 7.8C11.114 8.028 11.766 8.69 12.489 9.424C13.666 10.618 15.027 12 18.001 12C21.201 12 23.201 10.4 24.001 7.2C22.801 8.8 21.401 9.4 19.801 9C18.888 8.772 18.236 8.11 17.513 7.376C16.337 6.182 14.976 4.8 12.001 4.8ZM6.001 12C2.801 12 0.801 13.6 0.001 16.8C1.201 15.2 2.601 14.6 4.201 15C5.114 15.228 5.766 15.89 6.489 16.624C7.666 17.818 9.027 19.2 12.001 19.2C15.201 19.2 17.201 17.6 18.001 14.4C16.801 16 15.401 15.4 13.801 15C12.888 14.772 12.236 14.11 11.513 13.376C10.337 12.182 8.976 12 6.001 12Z" />
                    </svg>
                  )
                },
                {
                  name: 'Node.js',
                  icon: (
                    <svg className="w-8 h-8 text-[#339933]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" />
                    </svg>
                  )
                },
                {
                  name: 'MongoDB',
                  icon: (
                    <svg className="w-8 h-8 text-[#47A248]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C12 22 4 16 4 10C4 5 8 2 12 2C16 2 20 5 20 10C20 16 12 22 12 22Z" />
                    </svg>
                  )
                },
                {
                  name: 'Vite',
                  icon: (
                    <svg className="w-8 h-8 text-[#646CFF]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 2L12 22L22 2" />
                    </svg>
                  )
                }
              ].map((tech) => (
                <div key={tech.name} className="flex flex-col items-center gap-3 group cursor-default">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    {tech.icon}
                  </div>
                  <span className="text-sm font-semibold text-slate-400 group-hover:text-white transition-colors">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-dark-900/50 backdrop-blur-xl py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="TaskForge" className="w-5 h-5 opacity-50" />
            <span className="text-slate-500 text-sm">{t('landing.footer.rights')}</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">{t('landing.footer.privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('landing.footer.terms')}</a>
            <a href="https://twitter.com/davidl_on" target='_blank' rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
            <a href="https://github.com/davidldv/taskforge" target='_blank' rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
