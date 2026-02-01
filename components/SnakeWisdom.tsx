
import React, { useState, useRef, useEffect } from 'react';
import { getSnakeWisdom } from '../services/geminiService';
import { Language, translations } from '../translations';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const SnakeWisdom: React.FC<{ language: Language }> = ({ language }) => {
  const t = translations[language];
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: t.mentorGreeting }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const history: Message[] = [...messages, { role: 'user', text: userMessage }];
      const response = await getSnakeWisdom(history, language);
      setMessages(prev => [...prev, { role: 'bot', text: response || "..." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "..." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col h-[calc(100vh-140px)] md:h-[650px]">
      <div className="bg-white rounded-t-[32px] shadow-lg border-x border-t border-gray-100 p-6 flex items-center space-x-4">
        <div className="w-14 h-14 bg-green-700 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl shadow-green-900/20">
          <i className="fa-solid fa-graduation-cap"></i>
        </div>
        <div>
          <h2 className="text-xl font-serif font-bold text-gray-900 leading-tight">Freedomland Snake Mentor</h2>
          <p className="text-green-600 text-[10px] uppercase font-black tracking-[0.2em] mt-0.5">Expert Herpetologist</p>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-grow bg-white border-x border-gray-50 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-green-700 text-white rounded-tr-none shadow-md' 
                : 'bg-gray-50 text-gray-800 border border-gray-100 rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-50 p-4 rounded-3xl rounded-tl-none border border-gray-100">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-b-[32px] border-x border-b border-gray-100 p-5 pt-2">
        <form onSubmit={handleSend} className="flex items-center space-x-3">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.askMentor}
            className="flex-grow bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all shadow-inner"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 bg-green-900 text-white rounded-2xl flex items-center justify-center hover:bg-black transition active:scale-90 disabled:opacity-30 shadow-lg"
          >
            <i className="fa-solid fa-paper-plane text-sm"></i>
          </button>
        </form>
        <p className="text-[10px] text-gray-400 mt-4 text-center italic font-medium px-4">
          {t.emergencyNote}
        </p>
      </div>
    </div>
  );
};

export default SnakeWisdom;
