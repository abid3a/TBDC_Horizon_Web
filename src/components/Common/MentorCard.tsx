import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

interface MentorCardProps {
  mentor: any;
  onClick: (mentor: any) => void;
}

const CARD_WIDTH = 287;
const CARD_HEIGHT = 373;

const MentorCard: React.FC<MentorCardProps> = ({ mentor, onClick }) => {
  return (
    <div
      className="flex flex-col items-center cursor-pointer group transition-transform duration-200 will-change-transform"
      style={{ width: CARD_WIDTH }}
      onClick={() => onClick(mentor)}
    >
      {/* Mentor Image Card (pop-out on hover) */}
      <div
        className="rounded-2xl shadow-lg overflow-hidden bg-gray-100 transition-all duration-200 group-hover:shadow-2xl group-hover:scale-102 group-hover:z-20 group-hover:relative"
        style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
      >
        <img
          src={mentor.avatar}
          alt={mentor.name}
          className="object-cover w-full h-full bg-gray-200"
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>
      {/* Mentor Details Below Image */}
      <div className="w-full px-2 pt-3 pb-2" style={{ maxWidth: CARD_WIDTH }}>
        <div className="flex items-center justify-between mb-0.5">
          <span className="font-semibold text-base text-gray-900 flex items-center">
            {mentor.name}
            {/* Remove any yellow circle or emoji here */}
          </span>
          <span className="flex items-center text-xs text-gray-700 font-medium">
            <Star className="w-4 h-4 text-amber-400 mr-0.5" fill="#fbbf24" />
            {mentor.rating}
          </span>
        </div>
        <div className="text-xs text-gray-500 mb-1">{mentor.price} · Session</div>
        <div className="text-sm text-gray-700 leading-snug line-clamp-3">
          {mentor.bio}
        </div>
      </div>
    </div>
  );
};

export default MentorCard; 