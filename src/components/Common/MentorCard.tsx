import React from 'react';
import { Star } from 'lucide-react';

interface MentorCardProps {
  mentor: any;
  onClick: (mentor: any) => void;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor, onClick }) => {
  return (
    <div
      className="flex-shrink-0 w-48 bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(mentor)}
    >
      <div className="text-center">
        <img
          src={mentor.avatar}
          alt={mentor.name}
          className="w-16 h-16 rounded-full mx-auto mb-3"
        />
        <h3 className="font-semibold text-gray-900 mb-1">{mentor.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{mentor.title}</p>
        <p className="text-xs text-gray-500 mb-3">{mentor.company}</p>
        <div className="flex items-center justify-center space-x-1 mb-2">
          <Star className="w-4 h-4 text-amber-400 fill-current" />
          <span className="text-sm font-medium">{mentor.rating}</span>
          <span className="text-xs text-gray-500">({mentor.sessions})</span>
        </div>
        <div className="text-sm font-medium text-gray-900">{mentor.price}</div>
      </div>
    </div>
  );
};

export default MentorCard; 