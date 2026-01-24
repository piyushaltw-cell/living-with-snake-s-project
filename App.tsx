
import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import SnakeIDTool from './components/SnakeIDTool';
import SnakeLibrary from './components/SnakeLibrary';
import SnakeWisdom from './components/SnakeWisdom';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onNavigate={setActiveTab} />;
      case 'identify':
        return <SnakeIDTool />;
      case 'library':
        return <SnakeLibrary />;
      case 'mentor':
        return <SnakeWisdom />;
      default:
        return <Home onNavigate={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="animate-in fade-in duration-500">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
