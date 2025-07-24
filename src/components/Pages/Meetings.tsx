import React, { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import MeetingCard from '../Common/MeetingCard';
import FilterBar from '../Common/FilterBar';
import SidePeekPanel from '../Common/SidePeekPanel';
import mockData from '../../data/mockData.json';
import ConnectionCard from '../Common/ConnectionCard';

function getMeetingCategory(meeting: any): 'Past' | 'Today' | 'Upcoming' {
  const today = new Date();
  const meetingDate = new Date(meeting.date);
  const isToday = meetingDate.toDateString() === today.toDateString();
  if (meetingDate < today && !isToday) return 'Past';
  if (isToday) return 'Today';
  return 'Upcoming';
}

const Meetings: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  const [selectedConnection, setSelectedConnection] = useState<any>(null); // NEW: Track selected connection
  const [openSections, setOpenSections] = useState<Record<'Past' | 'Today' | 'Upcoming', boolean>>({ Past: false, Today: true, Upcoming: true });

  const { meetings, connections } = mockData;
  const filters = ['Review', 'Workshop', 'Strategy', 'Planning'];

  const filteredMeetings = meetings.filter((meeting: any) => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meeting.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilters.length === 0 || selectedFilters.includes(meeting.type);
    return matchesSearch && matchesFilter;
  });

  const categorized: Record<'Past' | 'Today' | 'Upcoming', any[]> = { Past: [], Today: [], Upcoming: [] };
  filteredMeetings.forEach((meeting: any) => {
    categorized[getMeetingCategory(meeting)].push(meeting);
  });

  const handleMeetingClick = (meeting: any) => {
    setSelectedMeeting(meeting);
  };

  const toggleSection = (section: 'Past' | 'Today' | 'Upcoming') => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
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
            <h1 className="text-2xl font-bold text-gray-900">Meetings</h1>
            <p className="text-gray-600 mt-1">Manage your meetings and collaborative sessions</p>
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
                  <div className="col-span-full text-gray-400 text-center py-8">No {section.toLowerCase()} meetings</div>
                ) : (
                  categorized[section].map((meeting: any) => (
                    <MeetingCard key={meeting.id} meeting={meeting} onClick={handleMeetingClick} />
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Side Peek Panel for Meeting Details */}
      <SidePeekPanel
        isOpen={!!selectedMeeting && !selectedConnection}
        onClose={() => setSelectedMeeting(null)}
        title="Meeting Details"
      >
        {selectedMeeting && !selectedConnection && (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {selectedMeeting.title}
              </h2>
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
                {selectedMeeting.type}
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-3" />
                <span>{selectedMeeting.date} at {selectedMeeting.time}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-3" />
                <span>{selectedMeeting.duration}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3" />
                <span>{selectedMeeting.location}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{selectedMeeting.description}</p>
            </div>

            {/* Attendees (card style if also a connection) */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Attendees ({Array.isArray(selectedMeeting.attendees) ? selectedMeeting.attendees.length : 0})
              </h3>
              <div className="space-y-3">
                {Array.isArray(selectedMeeting.attendees) && selectedMeeting.attendees.map((attendee: any, index: number) => {
                  if (!attendee) return null;
                  const connection = connections.find((conn: any) => conn.name === attendee.name);
                  if (connection) {
                    return (
                      <ConnectionCard
                        key={index}
                        connection={connection}
                        isFavorite={false}
                        onToggleFavorite={() => {}}
                        onClick={() => setSelectedConnection(connection)}
                      />
                    );
                  } else {
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        {attendee.avatar && (
                          <img
                            src={attendee.avatar}
                            alt={attendee.name || 'Attendee'}
                            className="w-10 h-10 rounded-full"
                          />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{attendee.name || 'Unknown'}</p>
                          <p className="text-sm text-gray-600">{attendee.title || ''}</p>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                Join Meeting
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Add to Calendar
              </button>
              <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                onClick={() => {
                  setSelectedMeeting(null);
                }}
              >
                Back to Meetings
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
                Back to Meeting
              </button>
            </div>
          </div>
        )}
      </SidePeekPanel>
    </div>
  );
};

export default Meetings;