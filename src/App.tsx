import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Overview from './components/Pages/Overview';
import Sessions from './components/Pages/Sessions';
import Meetings from './components/Pages/Meetings';
import Connections from './components/Pages/Connections';
import Surge from './components/Pages/Surge';
import Reports from './components/Pages/Reports';
import Admin from './components/Pages/Admin';
import Login from './components/Pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true');
  const location = useLocation();
  const navigate = useNavigate();

  // Listen for login/logout events
  useEffect(() => {
    const onStorage = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // If on /login and already authenticated, redirect to /
  useEffect(() => {
    if (isAuthenticated && location.pathname === '/login') {
      navigate('/');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  // Map path to page id for Sidebar highlighting
  const pathToPage: Record<string, string> = {
    '/': 'overview',
    '/sessions': 'sessions',
    '/meetings': 'meetings',
    '/connections': 'connections',
    '/surge': 'surge',
    '/reports': 'reports',
    '/admin': 'admin',
  };
  const currentPage = pathToPage[location.pathname] || 'overview';

  const handleNavigate = (page: string) => {
    const pageToPath: Record<string, string> = {
      overview: '/',
      sessions: '/sessions',
      meetings: '/meetings',
      connections: '/connections',
      surge: '/surge',
      reports: '/reports',
      admin: '/admin',
    };
    navigate(pageToPath[page] || '/');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Fixed Sidebar (only if authenticated) */}
      {isAuthenticated && (
        <div className="fixed top-0 left-0 h-screen z-30">
          <Sidebar currentPage={currentPage} onNavigate={handleNavigate} setIsAuthenticated={setIsAuthenticated} />
        </div>
      )}
      {/* Main content with left margin if authenticated */}
      <div className="flex-1 flex flex-col min-h-screen" style={isAuthenticated ? { marginLeft: '16rem' } : {}}>
        <main className="flex-1">
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            {isAuthenticated && <Route path="/" element={<Overview />} />}
            {isAuthenticated && <Route path="/sessions" element={<Sessions />} />}
            {isAuthenticated && <Route path="/meetings" element={<Meetings />} />}
            {isAuthenticated && <Route path="/connections" element={<Connections />} />}
            {isAuthenticated && <Route path="/surge" element={<Surge />} />}
            {isAuthenticated && <Route path="/reports" element={<Reports />} />}
            {isAuthenticated && <Route path="/admin" element={<Admin />} />}
            {/* Redirect all other routes to login if not authenticated */}
            {!isAuthenticated && <Route path="*" element={<Login setIsAuthenticated={setIsAuthenticated} />} />}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;