
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="snake-gradient text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <i className="fa-solid fa-snake text-2xl"></i>
            <h1 className="text-xl font-serif font-bold tracking-tight">Living with Snakes</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <button onClick={() => setActiveTab('home')} className={`hover:text-green-200 transition ${activeTab === 'home' ? 'font-bold border-b-2 border-white' : ''}`}>Home</button>
            <button onClick={() => setActiveTab('identify')} className={`hover:text-green-200 transition ${activeTab === 'identify' ? 'font-bold border-b-2 border-white' : ''}`}>Identify</button>
            <button onClick={() => setActiveTab('library')} className={`hover:text-green-200 transition ${activeTab === 'library' ? 'font-bold border-b-2 border-white' : ''}`}>Library</button>
            <button onClick={() => setActiveTab('mentor')} className={`hover:text-green-200 transition ${activeTab === 'mentor' ? 'font-bold border-b-2 border-white' : ''}`}>Mentor</button>
          </nav>
          <button className="md:hidden text-2xl"><i className="fa-solid fa-bars"></i></button>
        </div>
      </header>

      <main className="flex-grow pb-24 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 px-2 z-50">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-green-700' : 'text-gray-500'}`}>
          <i className="fa-solid fa-house"></i>
          <span className="text-xs mt-1">Home</span>
        </button>
        <button onClick={() => setActiveTab('identify')} className={`flex flex-col items-center ${activeTab === 'identify' ? 'text-green-700' : 'text-gray-500'}`}>
          <i className="fa-solid fa-camera"></i>
          <span className="text-xs mt-1">Identify</span>
        </button>
        <button onClick={() => setActiveTab('library')} className={`flex flex-col items-center ${activeTab === 'library' ? 'text-green-700' : 'text-gray-500'}`}>
          <i className="fa-solid fa-book-open"></i>
          <span className="text-xs mt-1">Library</span>
        </button>
        <button onClick={() => setActiveTab('mentor')} className={`flex flex-col items-center ${activeTab === 'mentor' ? 'text-green-700' : 'text-gray-500'}`}>
          <i className="fa-solid fa-graduation-cap"></i>
          <span className="text-xs mt-1">Mentor</span>
        </button>
      </footer>
    </div>
  );
};

export default Layout;
