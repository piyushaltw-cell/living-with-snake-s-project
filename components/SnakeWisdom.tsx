
import React, { useState, useRef, useEffect } from 'react';
import { getSnakeWisdom } from '../services/geminiService';

const SnakeWisdom: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    {role: 'bot', text: "Hello! I'm the Freedomland Snake Mentor. I'm here to answer any questions you have about our slithery friends. Ask me anything!"}
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    const newMessages = [...messages, { role: 'user' as const, text: userMsg }];
    
    setInput('');
    setMessages(newMessages);
    setLoading(true);

    try {
      // Pass the entire history for context-aware responses
      const response = await getSnakeWisdom(newMessages);
      setMessages(prev => [...prev, { role: 'bot', text: response || "I'm having trouble thinking of an answer right now." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I lost my train of thought. Could you ask that again?" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 py-8 h-[calc(100vh-160px)] flex flex-col">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col flex-grow overflow-hidden border border-green-100">
        <div className="p-4 bg-green-700 text-white flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-2 border-green-400">
             <i className="fa-solid fa-graduation-cap"></i>
          </div>
          <div>
            <h2 className="font-bold">Snake Mentor</h2>
            <p className="text-xs text-green-200">Promoting Harmony in Freedomland</p>
          </div>
        </div>

        <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                m.role === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-400 p-4 rounded-2xl rounded-bl-none border border-gray-100 italic animate-pulse">
                Mentor is typing...
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100 flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="E.g. How do I attract more garter snakes to my garden?"
            className="flex-grow px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition text-sm"
          />
          <button 
            type="submit"
            disabled={loading}
            className="bg-green-700 text-white p-3 rounded-xl hover:bg-green-800 transition disabled:opacity-50"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SnakeWisdom;
