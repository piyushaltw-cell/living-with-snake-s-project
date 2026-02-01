
import React from 'react';
import { Language, LANGUAGES, translations } from '../translations';

interface LanguageSelectorProps {
  onSelect: (lang: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-green-950/20 backdrop-blur-xl animate-in fade-in duration-700">
      <div className="bg-white/90 rounded-[40px] shadow-2xl max-w-lg w-full p-8 md:p-12 text-center border border-white/50 animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-green-700 rounded-3xl flex items-center justify-center text-white text-4xl mx-auto mb-8 shadow-xl shadow-green-900/20">
          <i className="fa-solid fa-earth-asia"></i>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-green-900 mb-4">Welcome to Freedomland</h1>
        <p className="text-gray-500 text-sm md:text-base mb-10 leading-relaxed">
          Choose your preferred language to begin our journey of harmonious coexistence.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelect(lang.code)}
              className="group flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-green-500 hover:shadow-md hover:bg-green-50 transition-all active:scale-95"
            >
              <div className="text-left">
                <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-green-600 transition-colors">
                  {lang.label}
                </span>
                <span className="block text-base font-bold text-gray-900">
                  {lang.native}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-green-600 group-hover:text-white flex items-center justify-center text-gray-300 transition-all">
                <i className="fa-solid fa-chevron-right text-xs"></i>
              </div>
            </button>
          ))}
        </div>
        
        <p className="mt-8 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
          Empowering Coexistence through Knowledge
        </p>
      </div>
    </div>
  );
};

export default LanguageSelector;
