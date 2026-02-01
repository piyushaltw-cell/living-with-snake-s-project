
import React, { useState, useRef } from 'react';
import { identifySnakeFromImage } from '../services/geminiService';
import { Language, translations } from '../translations';

const SnakeIDTool: React.FC<{ language: Language }> = ({ language }) => {
  const t = translations[language];
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImage(base64);
        identify(base64.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const identify = async (base64: string) => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const data = await identifySnakeFromImage(base64, language);
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError(t.errorIdentify);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-green-50">
        <div className="p-6 text-center bg-green-50/50 border-b border-green-100">
          <h2 className="text-2xl font-serif font-bold text-green-900">{t.instantID}</h2>
          <p className="text-green-700 text-xs mt-1">{t.zoomAdvice}</p>
        </div>

        <div className="p-6">
          {!image ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-green-200 rounded-3xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all group"
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-camera"></i>
              </div>
              <p className="text-lg font-bold text-gray-700">{t.identifyPhoto}</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
                capture="environment"
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative rounded-3xl overflow-hidden aspect-square bg-gray-50 border border-gray-100 shadow-inner">
                <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
                <button 
                  onClick={() => { setImage(null); setResult(null); setError(null); }}
                  className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/60 transition"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              {loading && (
                <div className="flex flex-col items-center py-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-600 border-t-transparent mb-4"></div>
                  <p className="text-green-800 text-sm font-bold animate-pulse">{t.consulting}</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl text-sm flex items-start space-x-3">
                  <i className="fa-solid fa-circle-exclamation text-red-500 mt-0.5"></i>
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              )}

              {result && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 leading-tight">{result.species}</h3>
                      <p className="text-sm italic text-gray-400">{result.scientificName}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                      {result.dangerLevel}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                      <h4 className="font-black text-gray-400 mb-2 text-[10px] uppercase tracking-[0.2em]">{t.analysis}</h4>
                      <p className="text-sm leading-relaxed text-gray-700">{result.description}</p>
                    </div>

                    <div className="bg-green-50 p-5 rounded-2xl border border-green-100">
                      <h4 className="font-black text-green-700 mb-2 text-[10px] uppercase tracking-[0.2em] flex items-center">
                        <i className="fa-solid fa-leaf mr-2"></i>
                        {t.advice}
                      </h4>
                      <p className="text-sm leading-relaxed text-green-800 italic">{result.advice}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => { setImage(null); setResult(null); setError(null); }}
                    className="w-full py-4 bg-green-900 text-white rounded-2xl font-bold text-sm uppercase shadow-lg shadow-green-900/20 active:scale-95 transition-transform"
                  >
                    {t.identifyNew}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnakeIDTool;
