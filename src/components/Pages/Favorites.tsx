import React from 'react';
import { Heart, MapPin, Users, MessageSquare } from 'lucide-react';
import mockData from '../../data/mockData.json';

const Favorites: React.FC = () => {
  const { connections, favorites } = mockData;

  const favoriteConnections = connections.filter(connection => 
    favorites.includes(connection.id)
  );

  const removeFavorite = (connectionId: string) => {
    console.log(`Removing ${connectionId} from favorites`);
    alert('This would remove the connection from favorites in a real application');
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Favorites</h1>
        <p className="text-gray-600 mt-1">Your favorite connections and mentors</p>
      </div>

      {favoriteConnections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteConnections.map((connection) => (
            <div
              key={connection.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={connection.avatar}
                    alt={connection.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{connection.name}</h3>
                    <p className="text-gray-600 text-sm">{connection.title}</p>
                    <p className="text-gray-500 text-sm">{connection.company}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFavorite(connection.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Heart className="w-5 h-5 text-red-500 fill-current" />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {connection.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  {connection.connections.toLocaleString()} connections
                </div>
              </div>

              <div className="mb-4">
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

              <button className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Message</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
          <p className="text-gray-500">Start adding connections to your favorites to see them here.</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;