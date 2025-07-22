import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface SessionCardProps {
  session: any;
  onClick: (session: any) => void;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, onClick }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(session)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg mb-2">{session.title}</h3>
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full">
            {session.type}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          {session.date} at {session.time}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          {session.duration}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          {session.location}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-3">
          <img
            src={session.mentor.avatar}
            alt={session.mentor.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{session.mentor.name}</p>
            <p className="text-xs text-gray-500">{session.mentor.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard; 