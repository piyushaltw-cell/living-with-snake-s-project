import React, { useState } from 'react';
import { FREEDOMLAND_SNAKES } from '../constants';
import { SnakeDanger, SnakeSpecies } from '../types';
import { Language, translations } from '../translations';

const SnakeLibrary: React.FC<{ language: Language }> = ({ language }) => {
  const t = translations[language];
  const [filter, setFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSnake, setSelectedSnake] = useState<SnakeSpecies | null>(null);

  const filteredSnakes = FREEDOMLAND_SNAKES.filter(s => {
    const matchesFilter = filter === 'All' || s.dangerLevel === filter;
    
    // Search across current language name, scientific name, and vernacular names
    const searchLower = searchTerm.toLowerCase();
    const nameMatch = s.name[language]?.toLowerCase().includes(searchLower);
    const sciMatch = s.scientificName.toLowerCase().includes(searchLower);
    const vernacMatch = s.vernacularNames[language]?.toLowerCase().includes(searchLower);
    
    return matchesFilter && (nameMatch || sciMatch || vernacMatch);
  });

  const filterOptions = ['All', ...Object.values(SnakeDanger)];

  const closeModal = () => {
    setSelectedSnake(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 relative">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-green-900 leading-tight">{t.library}</h2>
        <p className="text-gray-500 text-sm md:text-base mt-2">
          Discover the native species of Freedomland. Promote awareness and coexistence.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <div className="flex flex-wrap gap-1.5 justify-center">
          {filterOptions.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold transition uppercase tracking-wider ${
                filter === f ? 'bg-green-700 text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200'
              }`}
            >
              {f === 'All' ? t.all : t.dangerLevels[f as keyof typeof t.dangerLevels]}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-64">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
          <input 
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-green-500 shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {filteredSnakes.map(snake => (
          <div 
            key={snake.id} 
            onClick={() => setSelectedSnake(snake)}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col h-full"
          >
            <div className="aspect-[4/3] overflow-hidden relative bg-gray-50">
              <img src={snake.imageUrl} alt={snake.name[language]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              <div className="absolute top-2 right-2">
                 <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded shadow-sm ${snake.dangerLevel === SnakeDanger.HARMLESS ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                   {t.dangerLevels[snake.dangerLevel]}
                 </span>
              </div>
            </div>
            <div className="p-3.5 flex flex-col flex-grow">
              <h3 className="text-sm font-bold text-gray-900 leading-tight truncate">{snake.name[language]}</h3>
              <p className="text-[10px] italic text-gray-400 truncate mb-3">{snake.scientificName}</p>
              <div className="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest">{t.fullProfile}</span>
                <i className="fa-solid fa-arrow-right-long text-green-600 text-xs"></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedSnake && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={closeModal}>
          <div className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl max-h-[95vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="relative h-64 md:h-80 flex-shrink-0">
              <img src={selectedSnake.imageUrl} alt={selectedSnake.name[language]} className="w-full h-full object-cover" />
              <button onClick={closeModal} className="absolute top-4 right-4 bg-black/40 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/60 transition"><i className="fa-solid fa-xmark"></i></button>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-transparent to-transparent text-white">
                <h2 className="text-2xl md:text-4xl font-serif font-bold">{selectedSnake.name[language]}</h2>
                <p className="text-sm opacity-80 italic">{selectedSnake.scientificName}</p>
              </div>
            </div>
            <div className="p-6 md:p-10 overflow-y-auto space-y-8 custom-scrollbar">
              <div className="flex flex-wrap gap-4 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                <span className="flex items-center"><i className="fa-solid fa-ruler-horizontal mr-2"></i>{t.avg}: {selectedSnake.averageLength}</span>
                <span className="flex items-center"><i className="fa-solid fa-maximize mr-2"></i>{t.max}: {selectedSnake.maxLength}</span>
                <span className={`flex items-center ${selectedSnake.dangerLevel === SnakeDanger.HARMLESS ? 'text-green-600' : 'text-red-600'}`}>
                  <i className="fa-solid fa-triangle-exclamation mr-2"></i>{t.dangerLevels[selectedSnake.dangerLevel]}
                </span>
                <span className="flex items-center"><i className="fa-solid fa-heart-pulse mr-2"></i>IUCN: {selectedSnake.iucnStatus}</span>
              </div>
              
              <div className="grid md:grid-cols-5 gap-8">
                <div className="md:col-span-3 space-y-8">
                  <section>
                    <h4 className="text-[10px] font-black text-green-800 uppercase tracking-[0.2em] mb-3">{t.overview}</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{selectedSnake.description[language]}</p>
                  </section>
                  <section>
                    <h4 className="text-[10px] font-black text-green-800 uppercase tracking-[0.2em] mb-3">{t.keyID}</h4>
                    <p className="text-gray-700 text-sm leading-relaxed italic border-l-2 border-green-100 pl-4 bg-green-50/30 py-2">
                      {selectedSnake.keyFeatures[language]}
                    </p>
                  </section>
                  <section>
                    <h4 className="text-[10px] font-black text-green-800 uppercase tracking-[0.2em] mb-3">{t.behavior}</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{selectedSnake.behaviour[language]}</p>
                  </section>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                    <h5 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">{t.habitat}</h5>
                    <p className="text-xs font-bold text-gray-900">{selectedSnake.habitat[language]}</p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                    <h5 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">{t.distribution}</h5>
                    <p className="text-xs font-bold text-gray-900">{selectedSnake.distribution[language]}</p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                    <h5 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">{t.diet}</h5>
                    <p className="text-xs font-bold text-gray-900">{selectedSnake.diet[language]}</p>
                  </div>
                  <div className="bg-green-900/5 p-5 rounded-2xl border border-green-900/10">
                    <h5 className="text-[9px] font-black text-green-800 uppercase tracking-widest mb-1.5">Local Names</h5>
                    <p className="text-xs font-bold text-green-900">{selectedSnake.vernacularNames[language]}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
              <button onClick={closeModal} className="w-full py-4 bg-green-900 text-white rounded-2xl font-bold text-sm uppercase shadow-xl shadow-green-950/20 active:scale-95 transition-transform">{t.close}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnakeLibrary;