import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Overview from './components/Pages/Overview';
import Sessions from './components/Pages/Sessions';
import Meetings from './components/Pages/Meetings';
import Connections from './components/Pages/Connections';
import Surge from './components/Pages/Surge';
import Reports from './components/Pages/Reports';
import Favorites from './components/Pages/Favorites';
import Admin from './components/Pages/Admin';

function App() {
  const [currentPage, setCurrentPage] = useState('overview');

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <Overview />;
      case 'sessions':
        return <Sessions />;
      case 'meetings':
        return <Meetings />;
      case 'connections':
        return <Connections />;
      case 'surge':
        return <Surge />;
      case 'reports':
        return <Reports />;
      case 'favorites':
        return <Favorites />;
      case 'admin':
        return <Admin />;
      default:
        return <Overview />;
    }
  };

  const handleNewClick = () => {
    console.log('New button clicked');
    alert(`Creating new item for ${currentPage} page`);
  };

  const handleExportClick = () => {
    console.log('Export button clicked');
    alert('Exporting data...');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col">
        <Header onNewClick={handleNewClick} onExportClick={handleExportClick} />
        <main className="flex-1">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;