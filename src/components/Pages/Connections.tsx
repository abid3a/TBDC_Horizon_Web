import React, { useState } from 'react';
import { MapPin, Users, BookOpen, MessageSquare } from 'lucide-react';
import FilterBar from '../Common/FilterBar';
import SidePeekPanel from '../Common/SidePeekPanel';
import mockData from '../../data/mockData.json';

const Connections: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConnection, setSelectedConnection] = useState<any>(null);

  const { connections, sessions } = mockData;

  const filteredConnections = connections.filter(connection =>
    connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleConnectionClick = (connection: any) => {
    setSelectedConnection(connection);
  };

  const getLinkedSessionsForConnection = (sessionIds: string[]) => {
    return sessions.filter(session => sessionIds.includes(session.id));
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConnections.map((connection) => (
            <div
              key={connection.id}
              onClick={() => handleConnectionClick(connection)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={connection.avatar}
                  alt={connection.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">{connection.name}</h3>
                  <p className="text-gray-600 text-sm">{connection.title}</p>
                  <p className="text-gray-500 text-sm">{connection.company}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {connection.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  {connection.connections.toLocaleString()} connections
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {connection.expertise.slice(0, 2).map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {connection.expertise.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      +{connection.expertise.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side Peek Panel */}
      <SidePeekPanel
        isOpen={!!selectedConnection}
        onClose={() => setSelectedConnection(null)}
        title="Connection Details"
      >
        {selectedConnection && (
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
                  <MapPin className="w-4 h-4 mr-1" />
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
                  <div key={session.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{session.title}</p>
                      <p className="text-sm text-gray-500">{session.date}</p>
                    </div>
                  </div>
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
    </div>
  );
};

export default Connections;