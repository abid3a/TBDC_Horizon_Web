import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../Common/ConfirmModal';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Zap, 
  FileText, 
  Heart, 
  Settings,
  VideoIcon,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  LogOut,
  MessageCircle,
  User as UserIcon,
  MoreVertical,
  ChevronDown
} from 'lucide-react';
import mockData from '../../data/mockData.json';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  setIsAuthenticated?: (auth: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') !== 'light';
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Use the first user from mockData
  const user = mockData.users[0];

  // Navigation sections
  const overviewItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sessions', label: 'Sessions', icon: Calendar },
    { id: 'meetings', label: 'Meetings', icon: VideoIcon },
    { id: 'connections', label: 'Connections', icon: Users },
    { id: 'surge', label: 'Surge', icon: Zap },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'admin', label: 'Admin', icon: Settings },
  ];
  const accountItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'logout', label: 'Log out', icon: LogOut },
  ];

  // Dark mode toggle
  const handleToggleDark = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
      return next;
    });
  };

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`h-screen flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 min-h-0`}>
      {/* Logo and collapse button */}
      <div className={`flex items-center ${collapsed ? 'flex-col space-y-2 justify-center py-4' : 'justify-between p-4'} transition-all`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-xl text-gray-900 dark:text-white">TBDC</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Horizon</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-all ${collapsed ? 'mt-2' : ''}`}
          style={collapsed ? { alignSelf: 'center' } : {}}
        >
          {collapsed
            ? <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            : <ChevronLeft className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />}
        </button>
      </div>

      {/* Navigation (scrollable) */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <nav className="px-2 pb-2">
          {/* Overview section */}
          {!collapsed && <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 px-2 pt-2 pb-1">OVERVIEW</div>}
          <div className="space-y-1">
            {overviewItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={e => { onNavigate(item.id); }}
                  className={`w-full flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-50 dark:bg-amber-900 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  } focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-amber-600 dark:text-amber-300' : 'text-gray-400 dark:text-gray-500'}`} />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </button>
              );
            })}
          </div>
          {/* Account section */}
          <div className="mt-6">
            {!collapsed && <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 px-2 pt-2 pb-1">ACCOUNT</div>}
            <div className="space-y-1">
              {accountItems.map((item) => {
                const Icon = item.icon;
                if (item.id === 'logout') {
                  return (
                    <>
                      <button
                        key={item.id}
                        className={`w-full flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-3 py-2 rounded-lg text-left transition-all duration-200 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300`}
                        title={collapsed ? item.label : undefined}
                        onClick={() => {
                          setShowLogoutModal(true);
                        }}
                      >
                        <Icon className="w-5 h-5" />
                        {!collapsed && <span className="font-medium">{item.label}</span>}
                      </button>
                      <ConfirmModal
                        isOpen={showLogoutModal}
                        title="Confirm Logout"
                        message="Are you sure you want to log out?"
                        onCancel={() => setShowLogoutModal(false)}
                        onConfirm={() => {
                          setShowLogoutModal(false);
                          localStorage.setItem('isAuthenticated', 'false');
                          if (typeof setIsAuthenticated === 'function') setIsAuthenticated(false);
                          navigate('/login');
                        }}
                      />
                    </>
                  );
                }
                return (
                  <button
                    key={item.id}
                    className={`w-full flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-3 py-2 rounded-lg text-left transition-all duration-200 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300`}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5" />
                    {!collapsed && <span className="font-medium">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      </div>

      {/* Bottom: dark mode toggle and profile */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-800 flex flex-col space-y-2 bg-white dark:bg-gray-900 sticky bottom-0 z-10">
        {/* Dark mode toggle */}
        <button
          onClick={handleToggleDark}
          className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-2'} w-full px-2 py-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition`}
          title={collapsed ? (darkMode ? 'Dark mode' : 'Light mode') : undefined}
        >
          {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          {!collapsed && <span>{darkMode ? 'Dark mode' : 'Light mode'}</span>}
        </button>
        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen((o) => !o)}
            className={`w-full flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-2 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition`}
            title={collapsed ? user.name : undefined}
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
            </div>
            {!collapsed && (
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">{user.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
              </div>
            )}
            {!collapsed && <ChevronDown className="w-4 h-4 ml-2 text-gray-400 dark:text-gray-500" />}
          </button>
          {/* Dropdown */}
          {profileOpen && !collapsed && (
            <div className="absolute left-0 bottom-12 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg p-4 z-50">
              <div className="mb-3">
                <div className="font-semibold text-gray-900 dark:text-white">{user.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
              </div>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button className="w-full flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200">
                  <FileText className="w-4 h-4" />
                  <span>History</span>
                </button>
                <button className="w-full flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200">
                  <Zap className="w-4 h-4" />
                  <span>Update to Pro</span>
                </button>
              </div>
              <div className="mt-4 text-xs text-gray-400 dark:text-gray-500">v2.0 Terms & Conditions</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;