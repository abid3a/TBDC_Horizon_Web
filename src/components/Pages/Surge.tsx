import React, { useState } from 'react';
import { Star, Calendar, ChevronRight, X } from 'lucide-react';
import MentorCard from '../Common/MentorCard';
import mockData from '../../data/mockData.json';

const Surge: React.FC = () => {
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(true);

  const { mentors } = mockData;

  const mentorsByCategory = mentors.reduce((acc: any, mentor) => {
    if (!acc[mentor.category]) {
      acc[mentor.category] = [];
    }
    acc[mentor.category].push(mentor);
    return acc;
  }, {});

  const handleMentorClick = (mentor: any) => {
    setSelectedMentor(mentor);
  };

  const handleBookSession = () => {
    alert(`Booking session with ${selectedMentor.name}. This would open a booking form in a real application.`);
  };

  return (
    <div className="min-h-full">
      {/* Announcement Banner */}
      {showBanner && (
        <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-black p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Star className="w-5 h-5" />
              <div>
                <p className="font-semibold">New Mentors Available!</p>
                <p className="text-sm">Discover expert mentors in Strategy, Sales, and Finance</p>
              </div>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="p-1 hover:bg-amber-600 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Surge</h1>
          <p className="text-gray-600 mt-1">Discover and connect with expert mentors</p>
        </div>

        {Object.entries(mentorsByCategory).map(([category, categoryMentors]: [string, any]) => (
          <div key={category} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{category}</h2>
              <button className="flex items-center space-x-1 text-amber-600 hover:text-amber-700 font-medium">
                <span>View all</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex space-x-6 overflow-x-auto pb-4">
              {categoryMentors.map((mentor: any) => (
                <MentorCard key={mentor.id} mentor={mentor} onClick={handleMentorClick} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mentor Detail Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setSelectedMentor(null)}
          />
          <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full m-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="text-center mb-6">
                <img
                  src={selectedMentor.avatar}
                  alt={selectedMentor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-900">{selectedMentor.name}</h2>
                <p className="text-gray-600">{selectedMentor.title}</p>
                <p className="text-gray-500">{selectedMentor.company}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{selectedMentor.rating}</div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{selectedMentor.sessions}</div>
                  <div className="text-xs text-gray-600">Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{selectedMentor.price}</div>
                  <div className="text-xs text-gray-600">Per Hour</div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{selectedMentor.bio}</p>
              </div>

              {/* Expertise */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMentor.expertise.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleBookSession}
                  className="w-full bg-amber-500 text-black py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Session</span>
                </button>
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Surge;