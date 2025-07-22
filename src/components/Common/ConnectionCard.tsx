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
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow relative"
    >
      <div onClick={() => onClick(connection)} className="cursor-pointer">
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative w-16 h-16">
            <img
              src={connection.avatar}
              alt={connection.name}
              className="w-16 h-16 rounded-full"
            />
            {/* Heart toggle button inside avatar, top right */}
            <button
              className={`absolute top-0 right-0 p-1 rounded-full border ${isFavorite ? 'bg-amber-100 border-amber-300' : 'bg-white border-gray-200'} shadow-sm hover:bg-amber-50 transition z-10`}
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(connection.id); }}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'text-amber-500 fill-amber-400' : 'text-gray-400'}`} fill={isFavorite ? '#fbbf24' : 'none'} />
            </button>
          </div>
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
    </div>
  );
};

export default ConnectionCard; 