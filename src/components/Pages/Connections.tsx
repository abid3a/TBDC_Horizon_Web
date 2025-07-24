import React, { useState } from 'react';
import { BookOpen, MessageSquare, Heart, Calendar, Clock, MapPin } from 'lucide-react';
import FilterBar from '../Common/FilterBar';
import SidePeekPanel from '../Common/SidePeekPanel';
import mockData from '../../data/mockData.json';
import ConnectionCard from '../Common/ConnectionCard';

const Connections: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConnection, setSelectedConnection] = useState<any>(null);
  const [selectedSession, setSelectedSession] = useState<any>(null); // NEW: Track selected session
  const [favorites, setFavorites] = useState<string[]>(mockData.favorites || []);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const { connections, sessions } = mockData;

  let filteredConnections = connections.filter(connection =>
    connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  if (showOnlyFavorites) {
    filteredConnections = filteredConnections.filter(conn => favorites.includes(conn.id));
  }

  const handleConnectionClick = (connection: any) => {
    setSelectedConnection(connection);
  };

  const handleSessionClick = (session: any) => {
    setSelectedSession(session);
  };

  const getLinkedSessionsForConnection = (sessionIds: string[]) => {
    return sessions.filter(session => sessionIds.includes(session.id));
  };

  const toggleFavorite = (connectionId: string) => {
    setFavorites((prev) =>
      prev.includes(connectionId)
        ? prev.filter((id) => id !== connectionId)
        : [...prev, connectionId]
    );
  };

  return (
    <div className="h-full flex flex-col">
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Connections</h1>
            <p className="text-gray-600 mt-1">Manage your professional network and relationships</p>
          </div>
          <button
            className={`ml-4 flex items-center justify-center rounded-full p-2 border ${showOnlyFavorites ? 'bg-amber-100 border-amber-300' : 'bg-white border-gray-200'} shadow-sm hover:bg-amber-50 transition`}
            onClick={() => setShowOnlyFavorites((v) => !v)}
            title="Show favorites only"
          >
            <Heart className={`w-6 h-6 ${showOnlyFavorites ? 'text-amber-500 fill-amber-400' : 'text-gray-400'}`} fill={showOnlyFavorites ? '#fbbf24' : 'none'} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConnections.map((connection) => (
            <ConnectionCard
              key={connection.id}
              connection={connection}
              isFavorite={favorites.includes(connection.id)}
              onToggleFavorite={toggleFavorite}
              onClick={handleConnectionClick}
            />
          ))}
        </div>
      </div>

      {/* Side Peek Panel for Connection Details */}
      <SidePeekPanel
        isOpen={!!selectedConnection && !selectedSession}
        onClose={() => setSelectedConnection(null)}
        title="Connection Details"
      >
        {selectedConnection && !selectedSession && (
          <div className="p-6">
            {/* Profile Header */}
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={selectedConnection.avatar}
                alt={selectedConnection.name}
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedConnection.name}</h2>
                <p className="text-gray-600">{selectedConnection.title}</p>
                <p className="text-gray-500">{selectedConnection.company}</p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  {selectedConnection.location}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{selectedConnection.connections}</div>
                <div className="text-sm text-gray-600">Connections</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{selectedConnection.linkedSessions.length}</div>
                <div className="text-sm text-gray-600">Sessions</div>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Bio</h3>
              <p className="text-gray-600 leading-relaxed">{selectedConnection.bio}</p>
            </div>

            {/* Expertise */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {selectedConnection.expertise.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Linked Sessions */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Linked Sessions ({selectedConnection.linkedSessions.length})
              </h3>
              <div className="space-y-2">
                {getLinkedSessionsForConnection(selectedConnection.linkedSessions).map((session: any) => (
                  <button
                    key={session.id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg w-full text-left hover:bg-amber-50 transition cursor-pointer"
                    onClick={() => handleSessionClick(session)}
                  >
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{session.title}</p>
                      <p className="text-sm text-gray-500">{session.date}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Notes</h3>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-800">{selectedConnection.notes}</p>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Send Message</span>
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Schedule Meeting
              </button>
            </div>
          </div>
        )}
      </SidePeekPanel>

      {/* Side Peek Panel for Session Details */}
      <SidePeekPanel
        isOpen={!!selectedSession}
        onClose={() => setSelectedSession(null)}
        title="Session Details"
      >
        {selectedSession && (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {selectedSession.title}
              </h2>
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full">
                {selectedSession.type}
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-3" />
                <span>{selectedSession.date} at {selectedSession.time}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-3" />
                <span>{selectedSession.duration}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3" />
                <span>{selectedSession.location}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{selectedSession.description}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Mentor</h3>
              <div className="flex items-center space-x-4">
                <img
                  src={selectedSession.mentor.avatar}
                  alt={selectedSession.mentor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">{selectedSession.mentor.name}</p>
                  <p className="text-sm text-gray-600">{selectedSession.mentor.title}</p>
                  <p className="text-sm text-gray-500">{selectedSession.mentor.company}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-full bg-amber-500 text-black py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors">
                Join Session
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Reschedule
              </button>
              <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                onClick={() => {
                  setSelectedSession(null);
                }}
              >
                Back to Connection
              </button>
            </div>
          </div>
        )}
      </SidePeekPanel>
    </div>
  );
};

export default Connections;