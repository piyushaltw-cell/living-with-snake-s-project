import React from 'react';
import { FREEDOMLAND_SNAKES } from '../constants';
import { SnakeDanger } from '../types';

const Home: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  // Filter for the Big Four (Specifically those marked as VENOMOUS)
  const venomousSnakes = FREEDOMLAND_SNAKES.filter(s => s.dangerLevel === SnakeDanger.VENOMOUS);
  // Specifically get the Python
  const python = FREEDOMLAND_SNAKES.find(s => s.id === 'indian-rock-python');

  return (
    <div className="space-y-12 pb-12">
      {/* Hero */}
      <section className="relative h-[500px] flex items-center justify-center text-white overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=1600&q=80" 
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          alt="Nature of Freedomland"
        />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Harmonious Slither</h1>
          <p className="text-xl md:text-2xl mb-8 font-light text-green-50">
            Fostering awareness and promoting a harmonious coexistence with Freedomland's native snakes.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('identify')}
              className="px-8 py-4 bg-white text-green-900 rounded-full font-bold text-lg hover:bg-green-100 transition shadow-xl"
            >
              Identify a Snake
            </button>
            <button 
              onClick={() => onNavigate('library')}
              className="px-8 py-4 bg-green-600 text-white rounded-full font-bold text-lg hover:bg-green-700 transition shadow-xl"
            >
              Explore the Library
            </button>
          </div>
        </div>
      </section>

      {/* Priority Species Spotlight: The Big Four */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Priority Recognition: The Big Four</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Knowing these four venomous species is essential for safety. Most snakes are shy and will move away if given space.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {venomousSnakes.map(snake => (
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
                <h3 className="text-lg font-bold text-gray-900 mb-1">{snake.name}</h3>
                <p className="text-gray-500 text-xs line-clamp-2 italic mb-3">{snake.description}</p>
                <div className="flex items-center text-red-600 font-bold text-xs uppercase tracking-widest">
                  View Profile <i className="fa-solid fa-chevron-right ml-2 text-[10px]"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Giant: Indian Rock Python */}
      {python && (
        <section className="max-w-6xl mx-auto px-4">
          <div className="bg-green-900 rounded-[32px] overflow-hidden flex flex-col md:flex-row items-center shadow-2xl">
            <div className="md:w-1/2 h-64 md:h-[400px] relative overflow-hidden">
              <img src={python.imageUrl} alt={python.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 text-white">
              <span className="inline-block bg-green-500 text-green-950 text-[10px] font-black uppercase px-3 py-1 rounded-full mb-4">Majestic Giant</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{python.name}</h2>
              <p className="text-green-100 text-sm md:text-base leading-relaxed mb-6 italic">
                "{python.description}"
              </p>
              <p className="text-green-200 text-xs md:text-sm mb-6">
                Pythons are essential for controlling large rodent and mammal populations. Despite their size, they are masters of stealth and generally prefer to avoid human contact.
              </p>
              <button 
                onClick={() => onNavigate('library')}
                className="px-6 py-3 bg-white text-green-900 rounded-xl font-bold text-sm hover:bg-green-50 transition"
              >
                Learn More About Pythons
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Mission Icons */}
      <section className="max-w-5xl mx-auto px-4 bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center mx-auto text-2xl">
              <i className="fa-solid fa-eye"></i>
            </div>
            <h3 className="text-xl font-bold">Awareness</h3>
            <p className="text-gray-500 text-sm italic">"Fear often stems from the unknown."</p>
            <p className="text-gray-500 text-sm">Recognizing our local neighbors replaces fear with respect, allowing us to share space safely.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto text-2xl">
              <i className="fa-solid fa-leaf"></i>
            </div>
            <h3 className="text-xl font-bold">Coexistence</h3>
            <p className="text-gray-500 text-sm italic">"Guardians of the ecosystem."</p>
            <p className="text-gray-500 text-sm">Snakes provide natural pest control. Learning to live side-by-side preserves the health of our environment.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-orange-100 text-orange-700 rounded-2xl flex items-center justify-center mx-auto text-2xl">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h3 className="text-xl font-bold">Safety Protocols</h3>
            <p className="text-gray-500 text-sm italic">"Know what to do."</p>
            <p className="text-gray-500 text-sm">We provide clear, science-backed protocols for safe encounters, protecting both citizens and snakes.</p>
          </div>
        </div>
      </section>

      {/* Safety Banner */}
      <section className="bg-yellow-50 border-y border-yellow-200 py-12">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-yellow-500 text-white rounded-full flex items-center justify-center text-3xl shadow-lg animate-pulse">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-yellow-900 mb-2">Spotted a snake?</h2>
            <p className="text-yellow-800 mb-4 font-medium italic">Never attempt to capture, harm, or provoke a snake. 90% of encounters end safely if you simply maintain a 6-foot distance and let the animal move along.</p>
            <button 
              onClick={() => onNavigate('library')}
              className="bg-yellow-900 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-yellow-800 transition"
            >
              Read Interaction Guide →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;