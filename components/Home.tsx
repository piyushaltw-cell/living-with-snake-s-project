import React from 'react';
import { FREEDOMLAND_SNAKES } from '../constants';
import { Language, translations } from '../translations';
import { SnakeDanger } from '../types';

const Home: React.FC<{ onNavigate: (tab: string) => void; language: Language }> = ({ onNavigate, language }) => {
  const t = translations[language];
  const bigFourIds = ['spectacled-cobra', 'russells-viper', 'common-krait', 'saw-scaled-viper'];
  const bigFour = FREEDOMLAND_SNAKES.filter(s => bigFourIds.includes(s.id));
  const python = FREEDOMLAND_SNAKES.find(s => s.id === 'indian-rock-python');

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative h-[550px] flex items-center justify-center text-white overflow-hidden">
        <img 
          src="https://wallpapercave.com/wp/wp4078630.jpg" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4] scale-105"
          alt="Snake Habitat"
        />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-in slide-in-from-bottom-10 duration-700">{t.heroTitle}</h1>
          <p className="text-xl md:text-2xl mb-8 font-light text-green-50 max-w-3xl mx-auto opacity-90">
            {t.heroSub}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('identify')}
              className="px-8 py-4 bg-white text-green-900 rounded-full font-bold text-lg hover:bg-green-100 transition shadow-xl active:scale-95"
            >
              {t.identifyBtn}
            </button>
            <button 
              onClick={() => onNavigate('library')}
              className="px-8 py-4 bg-green-600 text-white rounded-full font-bold text-lg hover:bg-green-700 transition shadow-xl active:scale-95"
            >
              {t.exploreBtn}
            </button>
          </div>
        </div>
      </section>

      {/* Priority Recognition - The Big Four */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">{t.bigFour}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto italic">{t.bigFourSub}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bigFour.map(snake => (
            <div 
              key={snake.id} 
              onClick={() => onNavigate('library')}
              className="bg-white rounded-2xl shadow-sm border border-red-50 overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="h-44 relative">
                <img src={snake.imageUrl} alt={snake.name[language]} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute top-2 left-2">
                   <span className="bg-red-600 text-white text-[9px] font-black uppercase px-2 py-1 rounded shadow-lg">
                     {t.dangerLevels[snake.dangerLevel]}
                   </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-0.5">{snake.name[language]}</h3>
                <p className="text-gray-400 text-[10px] italic mb-2">{snake.scientificName}</p>
                <div className="flex items-center text-red-600 font-bold text-xs uppercase tracking-widest">
                  {t.viewProfile} <i className="fa-solid fa-chevron-right ml-2 text-[10px]"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Giant Section (Rock Python) */}
      {python && (
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-green-50 flex flex-col lg:flex-row">
            <div className="lg:w-1/2 h-80 lg:h-auto relative">
              <img src={python.imageUrl} alt={python.name[language]} className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6">
                <span className="bg-green-700 text-white text-[10px] font-black uppercase px-4 py-2 rounded-full shadow-lg">
                  {t.dangerLevels.HARMLESS}
                </span>
              </div>
            </div>
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
              <h4 className="text-green-700 font-black text-[10px] uppercase tracking-[0.3em] mb-4">Wild Magnificence</h4>
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">{t.featuredGiant}</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {python.description[language]}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                    <i className="fa-solid fa-water text-sm"></i>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-xs">Adept Swimmer</h5>
                    <p className="text-[10px] text-gray-500 leading-tight">Often found near water sources; excellent at swimming and climbing.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                    <i className="fa-solid fa-ghost text-sm"></i>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-xs">Ambush Hunter</h5>
                    <p className="text-[10px] text-gray-500 leading-tight">Patiently waits for prey to pass before using its powerful coils.</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('library')}
                className="w-fit px-10 py-4 bg-green-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-green-950/20 active:scale-95"
              >
                {t.exploreBtn}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Safety Section */}
      <section className="bg-yellow-50 border-y border-yellow-100 py-12">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-yellow-500 text-white rounded-full flex items-center justify-center text-3xl shadow-lg">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-yellow-900 mb-2">{t.safetyFirst}</h2>
            <p className="text-yellow-800 mb-4 font-medium italic">{t.safetySub}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;