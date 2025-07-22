import React, { useState } from 'react';
import { Search, Plus, Bell, Download } from 'lucide-react';

interface HeaderProps {
  onNewClick?: () => void;
  onExportClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewClick, onExportClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* New Button */}
          <button
            onClick={onNewClick}
            className="flex items-center space-x-2 bg-amber-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New</span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Avatars */}
          <div className="flex -space-x-2">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
              alt="User 1"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <img
              src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
              alt="User 2"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <img
              src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
              alt="User 3"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
              +3
            </div>
          </div>

          {/* Export Button */}
          <button
            onClick={onExportClick}
            className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;