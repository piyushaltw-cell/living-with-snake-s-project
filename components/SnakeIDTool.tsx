
import React, { useState, useRef } from 'react';
import { identifySnakeFromImage } from '../services/geminiService';

const SnakeIDTool: React.FC = () => {
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
      const data = await identifySnakeFromImage(base64);
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100">
        <div className="p-4 text-center bg-green-50 border-b border-green-100">
          <h2 className="text-xl font-serif font-bold text-green-900">Instant Identification</h2>
          <p className="text-green-700 text-[11px] mt-1">Safe distance is key! Use your zoom.</p>
        </div>

        <div className="p-6">
          {!image ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-green-200 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-green-400 transition group"
            >
              <i className="fa-solid fa-camera text-4xl text-green-200 group-hover:text-green-500 mb-3"></i>
              <p className="text-md font-semibold text-gray-700">Identify Photo</p>
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
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden h-48 bg-gray-50 flex items-center justify-center">
                <img src={image} alt="Uploaded" className="max-h-full max-w-full object-contain" />
                <button 
                  onClick={() => { setImage(null); setResult(null); setError(null); }}
                  className="absolute top-2 right-2 bg-black/40 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/70 transition"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              {loading && (
                <div className="flex flex-col items-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-2"></div>
                  <p className="text-green-800 text-xs font-medium">Consulting our experts...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded text-xs">
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              )}

              {result && (
                <div className="space-y-3 animate-in fade-in duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">{result.species}</h3>
                      <p className="text-[11px] italic text-gray-400">{result.scientificName}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      result.dangerLevel === 'Harmless' ? 'bg-green-100 text-green-700' : 
                      result.dangerLevel === 'Caution Required' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {result.dangerLevel}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-[12px] leading-relaxed text-gray-600">
                    <h4 className="font-bold text-gray-700 mb-0.5 text-[10px] uppercase">Analysis</h4>
                    {result.description}
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-[12px] leading-relaxed text-blue-700">
                    <h4 className="font-bold text-blue-800 mb-0.5 text-[10px] uppercase flex items-center">
                      <i className="fa-solid fa-handshake-angle mr-1.5"></i>
                      Coexistence Advice
                    </h4>
                    {result.advice}
                  </div>
                  
                  <button 
                    onClick={() => { setImage(null); setResult(null); setError(null); }}
                    className="w-full py-2.5 bg-green-700 text-white rounded-lg text-sm font-bold hover:bg-green-800 transition"
                  >
                    Identify New
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
