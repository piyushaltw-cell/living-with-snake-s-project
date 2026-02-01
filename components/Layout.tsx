
import React from 'react';
import { Language, translations, LANGUAGES } from '../translations';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  onSwitchLanguage: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, language, onSwitchLanguage }) => {
  const t = translations[language];
  const currentLangLabel = LANGUAGES.find(l => l.code === language)?.native || language.toUpperCase();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="snake-gradient text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onSwitchLanguage}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-all border border-white/20 group shadow-sm active:scale-95"
              aria-label="Switch Language"
            >
              <i className="fa-solid fa-globe text-xs group-hover:rotate-12 transition-transform"></i>
              <span className="text-[10px] font-bold uppercase tracking-widest">{currentLangLabel}</span>
            </button>
            
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('home')}>
              <i className="fa-solid fa-snake text-xl hidden sm:block"></i>
              <h1 className="text-lg sm:text-xl font-serif font-bold tracking-tight">Living with Snakes</h1>
            </div>
          </div>

          <nav className="hidden md:flex space-x-6">
            <button onClick={() => setActiveTab('home')} className={`hover:text-green-200 transition text-sm ${activeTab === 'home' ? 'font-bold border-b-2 border-white' : ''}`}>{t.home}</button>
            <button onClick={() => setActiveTab('identify')} className={`hover:text-green-200 transition text-sm ${activeTab === 'identify' ? 'font-bold border-b-2 border-white' : ''}`}>{t.identify}</button>
            <button onClick={() => setActiveTab('library')} className={`hover:text-green-200 transition text-sm ${activeTab === 'library' ? 'font-bold border-b-2 border-white' : ''}`}>{t.library}</button>
            <button onClick={() => setActiveTab('mentor')} className={`hover:text-green-200 transition text-sm ${activeTab === 'mentor' ? 'font-bold border-b-2 border-white' : ''}`}>{t.mentor}</button>
          </nav>
          
          <button className="md:hidden text-xl" onClick={() => setActiveTab('home')}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </header>

      <main className="flex-grow pb-24 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 flex justify-around py-3 px-2 z-50">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-green-700' : 'text-gray-400'}`}>
          <i className="fa-solid fa-house text-sm"></i>
          <span className="text-[10px] mt-1 font-bold uppercase tracking-widest">{t.home}</span>
        </button>
        <button onClick={() => setActiveTab('identify')} className={`flex flex-col items-center ${activeTab === 'identify' ? 'text-green-700' : 'text-gray-400'}`}>
          <i className="fa-solid fa-camera text-sm"></i>
          <span className="text-[10px] mt-1 font-bold uppercase tracking-widest">{t.identify}</span>
        </button>
        <button onClick={() => setActiveTab('library')} className={`flex flex-col items-center ${activeTab === 'library' ? 'text-green-700' : 'text-gray-400'}`}>
          <i className="fa-solid fa-book-open text-sm"></i>
          <span className="text-[10px] mt-1 font-bold uppercase tracking-widest">{t.library}</span>
        </button>
        <button onClick={() => setActiveTab('mentor')} className={`flex flex-col items-center ${activeTab === 'mentor' ? 'text-green-700' : 'text-gray-400'}`}>
          <i className="fa-solid fa-graduation-cap text-sm"></i>
          <span className="text-[10px] mt-1 font-bold uppercase tracking-widest">{t.mentor}</span>
        </button>
      </footer>
    </div>
  );
};

export default Layout;
