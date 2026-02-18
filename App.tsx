import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import SnakeIDTool from './components/SnakeIDTool';
import SnakeLibrary from './components/SnakeLibrary';
import SafetyResources from './components/SafetyResources';
import LanguageSelector from './components/LanguageSelector';
import { Language } from './translations';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [language, setLanguage] = useState<Language | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('freedomland_lang') as Language;
    if (saved) setLanguage(saved);
  }, []);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('freedomland_lang', lang);
  };

  const handleLanguageReset = () => {
    setLanguage(null);
  };

  if (!language) {
    return <LanguageSelector onSelect={handleLanguageSelect} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onNavigate={setActiveTab} language={language} />;
      case 'identify':
        return <SnakeIDTool language={language} />;
      case 'library':
        return <SnakeLibrary language={language} />;
      case 'safety':
        return <SafetyResources language={language} />;
      default:
        return <Home onNavigate={setActiveTab} language={language} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      language={language}
      onSwitchLanguage={handleLanguageReset}
    >
      <div className="animate-in fade-in duration-500">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;