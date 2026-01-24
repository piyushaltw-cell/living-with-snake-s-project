
import React, { useState } from 'react';
import { FREEDOMLAND_SNAKES } from '../constants';
import { SnakeDanger, SnakeSpecies } from '../types';

const SnakeLibrary: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedSnake, setSelectedSnake] = useState<SnakeSpecies | null>(null);
  const [showImageLink, setShowImageLink] = useState(false);

  const filteredSnakes = filter === 'All' 
    ? FREEDOMLAND_SNAKES 
    : FREEDOMLAND_SNAKES.filter(s => s.dangerLevel === filter);

  const filterOptions = ['All', ...Object.values(SnakeDanger)];

  const closeModal = () => {
    setSelectedSnake(null);
    setShowImageLink(false);
  };

  // Helper to handle image error by showing a nice placeholder
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    const parent = target.parentElement;
    if (parent) {
      parent.classList.add('flex', 'items-center', 'justify-center', 'bg-green-50');
      const icon = document.createElement('i');
      icon.className = 'fa-solid fa-image text-green-200 text-3xl';
      parent.appendChild(icon);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-3 py-4 relative">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-green-900 leading-tight">Species Library</h2>
        <p className="text-gray-500 text-sm mt-1">Tap a card to see diet and habitat</p>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-6 justify-center">
        {filterOptions.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold transition uppercase tracking-wider ${
              filter === f ? 'bg-green-700 text-white shadow-sm' : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50 shadow-sm'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {filteredSnakes.length > 0 ? (
          filteredSnakes.map(snake => (
            <div 
              key={snake.id} 
              onClick={() => setSelectedSnake(snake)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all cursor-pointer group active:scale-95 flex flex-col"
            >
              <div className="h-28 md:h-36 overflow-hidden relative bg-gray-50 flex-shrink-0">
                <img 
                  src={snake.imageUrl} 
                  alt={snake.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  onError={handleImageError}
                />
                <div className="absolute top-1.5 right-1.5">
                   <span className={`px-1.5 py-0.5 rounded text-[7px] md:text-[8px] font-black uppercase tracking-tighter shadow-sm border ${
                      snake.dangerLevel === SnakeDanger.HARMLESS ? 'bg-green-50 text-green-700 border-green-200' : 
                      snake.dangerLevel === SnakeDanger.CAUTION ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {snake.dangerLevel.split(' ')[0]}
                    </span>
                </div>
              </div>
              <div className="p-2.5 flex flex-col flex-grow">
                <h3 className="text-[13px] md:text-sm font-bold text-gray-900 leading-tight truncate group-hover:text-green-700">{snake.name}</h3>
                <p className="text-[9px] md:text-[10px] italic text-gray-400 truncate mb-2">{snake.scientificName}</p>
                <div className="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[9px] text-green-600 font-bold uppercase tracking-widest">Details</span>
                  <i className="fa-solid fa-arrow-right-long text-green-600 text-[9px]"></i>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-gray-100">
            <p className="text-gray-400 text-sm italic">No species found in this category.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedSnake && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-sm md:max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header/Image */}
            <div className="relative h-48 md:h-60 flex-shrink-0 bg-gray-50 group/modalimg">
              <img 
                src={selectedSnake.imageUrl} 
                alt={selectedSnake.name} 
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setShowImageLink(!showImageLink)}
                onError={handleImageError}
              />
              
              {/* Image Source Overlay */}
              {showImageLink && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 text-center animate-in fade-in zoom-in-90 duration-200 z-20">
                  <div className="bg-white p-3 rounded-lg shadow-xl max-w-full">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Direct Image Link</p>
                    <a 
                      href={selectedSnake.imageUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 text-[11px] break-all underline block mb-3 hover:text-blue-800"
                    >
                      {selectedSnake.imageUrl}
                    </a>
                    <button 
                      onClick={() => setShowImageLink(false)}
                      className="px-3 py-1 bg-gray-900 text-white text-[10px] rounded-md font-bold uppercase tracking-widest"
                    >
                      Close Link
                    </button>
                  </div>
                </div>
              )}

              <div className="absolute top-3 left-3 bg-black/30 text-white px-2 py-1 rounded text-[9px] uppercase font-bold tracking-widest backdrop-blur-sm pointer-events-none opacity-0 group-hover/modalimg:opacity-100 transition-opacity">
                Click image for link
              </div>

              <button 
                onClick={closeModal}
                className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all z-30"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
                <h2 className="text-xl md:text-2xl font-serif font-bold leading-tight">{selectedSnake.name}</h2>
                <p className="text-green-400 italic text-[11px] md:text-xs font-medium">{selectedSnake.scientificName}</p>
              </div>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-5 md:p-6 overflow-y-auto space-y-5">
              <div className="flex">
                <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest shadow-sm border ${
                  selectedSnake.dangerLevel === SnakeDanger.HARMLESS ? 'bg-green-50 text-green-700 border-green-200' : 
                  selectedSnake.dangerLevel === SnakeDanger.CAUTION ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                  'bg-red-50 text-red-700 border-red-200'
                }`}>
                  {selectedSnake.dangerLevel}
                </span>
              </div>

              <div className="space-y-4">
                <section>
                  <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 flex items-center">
                    <i className="fa-solid fa-dna mr-2 text-green-600"></i>
                    Profile
                  </h4>
                  <p className="text-gray-700 text-xs md:text-sm leading-relaxed font-medium">
                    {selectedSnake.description}
                  </p>
                </section>

                <div className="grid grid-cols-2 gap-4">
                  <section className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center">
                      <i className="fa-solid fa-utensils mr-2 text-green-600"></i>
                      Diet
                    </h4>
                    <p className="text-gray-900 text-[11px] md:text-xs font-bold leading-tight">{selectedSnake.diet}</p>
                  </section>
                  <section className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center">
                      <i className="fa-solid fa-tree mr-2 text-green-600"></i>
                      Habitat
                    </h4>
                    <p className="text-gray-900 text-[11px] md:text-xs font-bold leading-tight">{selectedSnake.habitat}</p>
                  </section>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="bg-green-50/50 p-3 rounded-xl border border-green-100 flex items-start space-x-3">
                  <i className="fa-solid fa-handshake-angle text-green-600 mt-1"></i>
                  <p className="text-green-800 text-[11px] leading-snug font-medium italic">
                    Vital to Freedomland's ecological health. Respect their space and they will respect yours.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer (Fixed) */}
            <div className="p-4 border-t border-gray-50 bg-white flex-shrink-0">
              <button 
                onClick={closeModal}
                className="w-full py-2.5 bg-gray-900 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition active:scale-95 shadow-md"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnakeLibrary;
