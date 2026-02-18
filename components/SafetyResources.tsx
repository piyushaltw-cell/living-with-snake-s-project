import React, { useState } from 'react';
import { Language, translations } from '../translations';

interface SafetyTip {
  id: string;
  icon: string;
  title: string;
  desc: string;
  image: string;
}

const SafetyResources: React.FC<{ language: Language }> = ({ language }) => {
  const t = translations[language];
  const [selectedTip, setSelectedTip] = useState<SafetyTip | null>(null);

  const safetyTips: SafetyTip[] = [
    {
      id: "gear",
      icon: "fa-solid fa-boot",
      title: "Wear Protective Gear",
      desc: "Always wear boots and long trousers when walking in long grass or forested areas.",
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "light",
      icon: "fa-solid fa-flashlight",
      title: "Use a Light at Night",
      desc: "Many snakes are active at night. Always carry a torch to avoid stepping on one.",
      image: "https://images.unsplash.com/photo-1516550130563-ef9369992f96?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "clear",
      icon: "fa-solid fa-broom",
      title: "Clear Surroundings",
      desc: "Keep your garden free of rubble, scrap, and thick piles of leaves which serve as hiding spots.",
      image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "freeze",
      icon: "fa-solid fa-circle-stop",
      title: "Freeze and Retreat",
      desc: "If you see a snake, stop moving. Let it pass or move away slowly. Do not attempt to touch it.",
      image: "https://images.unsplash.com/photo-1629813143301-4439c063165b?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  const helplines = [
    {
      title: "Wildlife Emergency SOS",
      number: "1800-SNAKE-SOS",
      sub: "24/7 Rescue & Mitigation",
      color: "bg-red-600"
    },
    {
      title: "Forest Department",
      number: "1010-GREEN",
      sub: "Wildlife Reporting Line",
      color: "bg-green-700"
    },
    {
      title: "Community Rescue Network",
      number: "+91 98765 43210",
      sub: "Freedomland Volunteer Network",
      color: "bg-blue-600"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-12 pb-20">
      {/* Avoid Bites Section */}
      <section className="animate-in slide-in-from-bottom-4 duration-500">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-100 text-yellow-700 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm border border-yellow-200">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-900">{t.avoidBitesTitle}</h2>
          <p className="text-gray-500 mt-2">Prevention is the best form of coexistence. Tap a tip to see an example.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {safetyTips.map((tip) => (
            <button 
              key={tip.id} 
              onClick={() => setSelectedTip(tip)}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-green-200 transition-all flex items-start space-x-4 text-left group active:scale-95"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-green-700 flex-shrink-0 text-xl group-hover:bg-green-700 group-hover:text-white transition-colors">
                <i className={tip.icon}></i>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-gray-900">{tip.title}</h3>
                  <span className="text-[8px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">View</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{tip.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Emergency Contacts Section */}
      <section className="animate-in slide-in-from-bottom-4 duration-700 [animation-delay:200ms]">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-100 text-red-700 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm border border-red-200">
            <i className="fa-solid fa-phone-volume"></i>
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-900">{t.emergencyTitle}</h2>
          <p className="text-red-600 text-xs font-bold uppercase tracking-widest mt-2 px-4">
            {t.emergencyDisclaimer}
          </p>
        </div>

        <div className="space-y-4">
          {helplines.map((help, idx) => (
            <div key={idx} className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-red-100 transition-colors">
              <div className="flex items-center space-x-6 text-center md:text-left">
                <div className={`w-14 h-14 rounded-2xl ${help.color} text-white flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                  <i className="fa-solid fa-headset"></i>
                </div>
                <div>
                  <h3 className="font-black text-[10px] uppercase tracking-widest text-gray-400 mb-1">{help.sub}</h3>
                  <h4 className="text-xl font-bold text-gray-900">{help.title}</h4>
                </div>
              </div>
              <a 
                href={`tel:${help.number.replace(/[^0-9]/g, '')}`} 
                className="w-full md:w-auto px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition-all active:scale-95 text-center shadow-xl shadow-gray-900/10"
              >
                {help.number}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Post-Bite Advice */}
      <section className="bg-green-900 text-white rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden animate-in fade-in duration-1000">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <i className="fa-solid fa-hospital text-[200px]"></i>
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">Standard First Aid (Do's & Don'ts)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-green-300 text-sm uppercase tracking-widest">DO:</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li className="flex items-start"><i className="fa-solid fa-check-circle mt-1 mr-3 text-green-400"></i> Keep the patient calm and still.</li>
                <li className="flex items-start"><i className="fa-solid fa-check-circle mt-1 mr-3 text-green-400"></i> Remove jewelry or tight clothing.</li>
                <li className="flex items-start"><i className="fa-solid fa-check-circle mt-1 mr-3 text-green-400"></i> Immobilize the limb with a splint.</li>
                <li className="flex items-start"><i className="fa-solid fa-check-circle mt-1 mr-3 text-green-400"></i> Reach a hospital with ASV quickly.</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-red-300 text-sm uppercase tracking-widest">DON'T:</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li className="flex items-start"><i className="fa-solid fa-xmark-circle mt-1 mr-3 text-red-400"></i> Do NOT use tourniquets.</li>
                <li className="flex items-start"><i className="fa-solid fa-xmark-circle mt-1 mr-3 text-red-400"></i> Do NOT cut or suck the wound.</li>
                <li className="flex items-start"><i className="fa-solid fa-xmark-circle mt-1 mr-3 text-red-400"></i> Do NOT apply ice or chemicals.</li>
                <li className="flex items-start"><i className="fa-solid fa-xmark-circle mt-1 mr-3 text-red-400"></i> Do NOT waste time with healers.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tip Modal */}
      {selectedTip && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedTip(null)}
        >
          <div 
            className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img src={selectedTip.image} alt={selectedTip.title} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedTip(null)}
                className="absolute top-4 right-4 bg-black/40 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/60 transition"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-50 text-green-700 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                <i className={selectedTip.icon}></i>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">{selectedTip.title}</h3>
              <p className="text-gray-600 leading-relaxed">{selectedTip.desc}</p>
              <button 
                onClick={() => setSelectedTip(null)}
                className="mt-8 w-full py-4 bg-green-900 text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-black transition-colors active:scale-95"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafetyResources;