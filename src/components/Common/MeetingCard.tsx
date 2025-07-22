import React from 'react';
import { Calendar, Clock, MapPin, Users as UsersIcon } from 'lucide-react';

interface MeetingCardProps {
  meeting: any;
  onClick: (meeting: any) => void;
}

const MeetingCard: React.FC<MeetingCardProps> = ({ meeting, onClick }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(meeting)}
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
  );
};

export default MeetingCard; 