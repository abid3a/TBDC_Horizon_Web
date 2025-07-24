import React, { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import SessionCard from '../Common/SessionCard';
import FilterBar from '../Common/FilterBar';
import SidePeekPanel from '../Common/SidePeekPanel';
import mockData from '../../data/mockData.json';
import ConnectionCard from '../Common/ConnectionCard';

function getSessionCategory(session: any): 'Past' | 'Today' | 'Upcoming' {
  const today = new Date();
  const sessionDate = new Date(session.date);
  const isToday = sessionDate.toDateString() === today.toDateString();
  if (sessionDate < today && !isToday) return 'Past';
  if (isToday) return 'Today';
  return 'Upcoming';
}

const Sessions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [selectedConnection, setSelectedConnection] = useState<any>(null); // NEW: Track selected connection
  const [openSections, setOpenSections] = useState<Record<'Past' | 'Today' | 'Upcoming', boolean>>({ Past: false, Today: true, Upcoming: true });

  const { sessions, connections } = mockData;
  const filters = ['Strategy', 'Product', 'Finance', 'Marketing'];

  const filteredSessions = sessions.filter((session: any) => {
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilters.length === 0 || selectedFilters.includes(session.type);
    return matchesSearch && matchesFilter;
  });

  const categorized: Record<'Past' | 'Today' | 'Upcoming', any[]> = { Past: [], Today: [], Upcoming: [] };
  filteredSessions.forEach((session: any) => {
    categorized[getSessionCategory(session)].push(session);
  });

  const handleSessionClick = (session: any) => {
    setSelectedSession(session);
  };

  const toggleSection = (section: 'Past' | 'Today' | 'Upcoming') => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Find the associated connection for a session
  const getConnectionForSession = (sessionId: string) => {
    return connections.find((conn: any) => conn.linkedSessions.includes(sessionId));
  };

  return (
    <div className="h-full flex flex-col">
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        selectedFilters={selectedFilters}
        onFilterChange={setSelectedFilters}
      />

      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sessions</h1>
            <p className="text-gray-600 mt-1">Manage your learning sessions and workshops</p>
          </div>
        </div>

        {(['Today', 'Upcoming', 'Past'] as const).map(section => (
          <div key={section} className="mb-6">
            <button
              className="flex items-center text-lg font-semibold text-gray-800 py-2 px-3 bg-transparent focus:outline-none"
              onClick={() => toggleSection(section)}
            >
              <span className="flex flex-row items-center">
                <svg
                  className={`w-5 h-5 mr-2 transform transition-transform duration-200 ${openSections[section] ? 'rotate-0' : '-rotate-90'}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                {section} ({categorized[section].length})
              </span>
            </button>
            {openSections[section] && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
                {categorized[section].length === 0 ? (
                  <div className="col-span-full text-gray-400 text-center py-8">No {section.toLowerCase()} sessions</div>
                ) : (
                  categorized[section].map((session: any) => (
                    <SessionCard key={session.id} session={session} onClick={handleSessionClick} />
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Side Peek Panel for Session Details */}
      <SidePeekPanel
        isOpen={!!selectedSession && !selectedConnection}
        onClose={() => setSelectedSession(null)}
        title="Session Details"
      >
        {selectedSession && !selectedConnection && (
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

            {/* Associated Connection */}
            {(() => {
              const connection = getConnectionForSession(selectedSession.id);
              if (!connection) return null;
              return (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Connection</h3>
                  <button
                    className="flex items-center space-x-4 w-full text-left hover:bg-amber-50 transition p-2 rounded-lg"
                    onClick={() => setSelectedConnection(connection)}
                  >
                    <img
                      src={connection.avatar}
                      alt={connection.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{connection.name}</p>
                      <p className="text-sm text-gray-600">{connection.title}</p>
                      <p className="text-sm text-gray-500">{connection.company}</p>
                    </div>
                  </button>
                </div>
              );
            })()}

            {/* Mentor (card style if also a connection) */}
            {(() => {
              // Try to find a connection with the same name as the mentor
              const mentor = selectedSession.mentor;
              const connection = connections.find((conn: any) => conn.name === mentor.name);
              if (connection) {
                return (
                  <div className="mb-6">
                    <ConnectionCard
                      connection={connection}
                      isFavorite={false}
                      onToggleFavorite={() => {}}
                      onClick={() => setSelectedConnection(connection)}
                    />
                  </div>
                );
              } else {
                return (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Mentor</h3>
                    <div className="flex items-center space-x-4">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{mentor.name}</p>
                        <p className="text-sm text-gray-600">{mentor.title}</p>
                        <p className="text-sm text-gray-500">{mentor.company}</p>
                      </div>
                    </div>
                  </div>
                );
              }
            })()}

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
                Back to Sessions
              </button>
            </div>
          </div>
        )}
      </SidePeekPanel>

      {/* Side Peek Panel for Connection Details */}
      <SidePeekPanel
        isOpen={!!selectedConnection}
        onClose={() => setSelectedConnection(null)}
        title="Connection Details"
      >
        {selectedConnection && (
          <div className="p-6">
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
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Bio</h3>
              <p className="text-gray-600 leading-relaxed">{selectedConnection.bio}</p>
            </div>
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
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Notes</h3>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-800">{selectedConnection.notes}</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                onClick={() => {
                  setSelectedConnection(null);
                }}
              >
                Back to Session
              </button>
            </div>
          </div>
        )}
      </SidePeekPanel>
    </div>
  );
};

export default Sessions;