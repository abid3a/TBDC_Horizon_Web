import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users as UsersIcon } from 'lucide-react';
import FilterBar from '../Common/FilterBar';
import SidePeekPanel from '../Common/SidePeekPanel';
import mockData from '../../data/mockData.json';

const Meetings: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);

  const { meetings } = mockData;
  const filters = ['Review', 'Workshop', 'Strategy', 'Planning'];

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meeting.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilters.length === 0 || selectedFilters.includes(meeting.type);
    return matchesSearch && matchesFilter;
  });

  const handleMeetingClick = (meeting: any) => {
    setSelectedMeeting(meeting);
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeetings.map((meeting) => (
            <div
              key={meeting.id}
              onClick={() => handleMeetingClick(meeting)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">{meeting.title}</h3>
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
                    {meeting.type}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {meeting.date} at {meeting.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {meeting.duration}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {meeting.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <UsersIcon className="w-4 h-4 mr-2" />
                  {meeting.attendees.length} attendee{meeting.attendees.length !== 1 ? 's' : ''}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex -space-x-2">
                  {meeting.attendees.slice(0, 3).map((attendee: any, index: number) => (
                    <img
                      key={index}
                      src={attendee.avatar}
                      alt={attendee.name}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ))}
                  {meeting.attendees.length > 3 && (
                    <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                      +{meeting.attendees.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side Peek Panel */}
      <SidePeekPanel
        isOpen={!!selectedMeeting}
        onClose={() => setSelectedMeeting(null)}
        title="Meeting Details"
      >
        {selectedMeeting && (
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

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Attendees ({selectedMeeting.attendees.length})
              </h3>
              <div className="space-y-3">
                {selectedMeeting.attendees.map((attendee: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <img
                      src={attendee.avatar}
                      alt={attendee.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{attendee.name}</p>
                      <p className="text-sm text-gray-600">{attendee.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                Join Meeting
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Add to Calendar
              </button>
            </div>
          </div>
        )}
      </SidePeekPanel>
    </div>
  );
};

export default Meetings;