import React from 'react';
import { MapPin, Users, Heart } from 'lucide-react';

interface ConnectionCardProps {
  connection: any;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: (connection: any) => void;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({ connection, isFavorite, onToggleFavorite, onClick }) => {
  return (
    <div
      className="w-full max-w-md bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden flex flex-col"
      onClick={() => onClick(connection)}
    >
      {/* Connection Image with Favorite Button */}
      <div className="relative w-full h-56 bg-gray-100">
        <img
          src={connection.avatar}
          alt={connection.name}
          className="object-cover w-full h-full"
        />
        <button
          className={`absolute bottom-3 left-3 p-2 rounded-full border-2 shadow bg-white hover:bg-amber-50 transition z-10 ${isFavorite ? 'border-amber-300' : 'border-gray-200'}`}
          onClick={e => { e.stopPropagation(); onToggleFavorite(connection.id); }}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'text-amber-500 fill-amber-400' : 'text-gray-400'}`} fill={isFavorite ? '#fbbf24' : 'none'} />
        </button>
      </div>
      {/* Connection Info */}
      <div className="flex-1 flex flex-col px-5 py-4">
        <div className="font-semibold text-lg text-gray-900 mb-0.5">{connection.name}</div>
        <div className="text-sm text-gray-600 mb-1">{connection.title}</div>
        <div className="text-xs text-gray-500 mb-2">{connection.company}</div>
        <div className="flex items-center text-xs text-gray-500 mb-2 space-x-3">
          <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{connection.location}</span>
          <span className="flex items-center"><Users className="w-4 h-4 mr-1" />{connection.connections.toLocaleString()} connections</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {connection.expertise.slice(0, 3).map((skill: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
            >
              {skill}
            </span>
          ))}
          {connection.expertise.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
              +{connection.expertise.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard; 