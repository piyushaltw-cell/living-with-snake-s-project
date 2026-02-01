
import React from 'react';
import { FREEDOMLAND_SNAKES } from '../constants';
import { SnakeDanger } from '../types';
import { Language, translations } from '../translations';

const Home: React.FC<{ onNavigate: (tab: string) => void; language: Language }> = ({ onNavigate, language }) => {
  const t = translations[language];
  const bigFourIds = ['spectacled-cobra', 'russells-viper', 'common-krait', 'saw-scaled-viper'];
  const bigFour = FREEDOMLAND_SNAKES.filter(s => bigFourIds.includes(s.id));
  const python = FREEDOMLAND_SNAKES.find(s => s.id === 'indian-rock-python');

  return (
    <div className="space-y-12 pb-12">
      <section className="relative h-[550px] flex items-center justify-center text-white overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=1600&q=80" 
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          alt="Nature"
        />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">{t.heroTitle}</h1>
          <p className="text-xl md:text-2xl mb-8 font-light text-green-50 max-w-3xl mx-auto">
            {t.heroSub}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('identify')}
              className="px-8 py-4 bg-white text-green-900 rounded-full font-bold text-lg hover:bg-green-100 transition shadow-xl"
            >
              {t.identifyBtn}
            </button>
            <button 
              onClick={() => onNavigate('library')}
              className="px-8 py-4 bg-green-600 text-white rounded-full font-bold text-lg hover:bg-green-700 transition shadow-xl"
            >
              {t.exploreBtn}
            </button>
          </div>
        </div>
      </section>

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
                <img src={snake.imageUrl} alt={snake.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute top-2 left-2">
                   <span className="bg-red-600 text-white text-[9px] font-black uppercase px-2 py-1 rounded shadow-lg">Venomous</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-0.5">{snake.name}</h3>
                <p className="text-gray-400 text-[10px] italic mb-2">{snake.scientificName}</p>
                <div className="flex items-center text-red-600 font-bold text-xs uppercase tracking-widest">
                  {t.viewProfile} <i className="fa-solid fa-chevron-right ml-2 text-[10px]"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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
