import React, { useState } from 'react';
import FilterBar from '../Common/FilterBar';
import SidePeekPanel from '../Common/SidePeekPanel';
import MentorCard from '../Common/MentorCard';
import mockData from '../../data/mockData.json';

const Mentors: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { mentors } = mockData;
  // Get unique categories from mentors
  const categories = Array.from(new Set(mentors.map((m: any) => m.category)));

  // Filter mentors by search and category
  let filteredMentors = mentors.filter((mentor: any) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some((exp: string) => exp.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(mentor.category);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex flex-col">
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={categories}
        selectedFilters={selectedCategories}
        onFilterChange={setSelectedCategories}
      />
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Mentors</h1>
            <p className="text-gray-600 mt-1">Browse and search for mentors by industry or expertise</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor: any) => (
            <MentorCard key={mentor.id} mentor={mentor} onClick={setSelectedMentor} />
          ))}
        </div>
      </div>
      <SidePeekPanel
        isOpen={!!selectedMentor}
        onClose={() => setSelectedMentor(null)}
        title="Mentor Details"
      >
        {selectedMentor && (
          <div className="p-8 flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex flex-col items-center md:items-start">
              <div className="w-full max-w-xs flex flex-col items-center mx-auto md:mx-0">
                <div className="w-full aspect-[3/4] rounded-2xl shadow-lg overflow-hidden bg-gray-100 mb-4">
                  <img
                    src={selectedMentor.avatar}
                    alt={selectedMentor.name}
                    className="object-cover w-full h-full bg-gray-200"
                  />
                </div>
                <div className="w-full flex flex-col items-start">
                  <span className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-lg mb-2">Top Expert</span>
                  <div className="flex items-center space-x-2 mb-1">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedMentor.name}</h2>
                  </div>
                  <div className="text-gray-600 text-sm mb-1">{selectedMentor.title}</div>
                  <div className="text-gray-500 text-sm mb-2">{selectedMentor.company}</div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="flex items-center text-sm text-gray-700 font-medium">
                      {/* Star icon can be added here */}
                      {selectedMentor.rating}
                    </span>
                    <span className="text-xs text-gray-400">({selectedMentor.sessions} sessions)</span>
                  </div>
                  <div className="mb-4 w-full">
                    <h3 className="font-semibold text-gray-900 mb-1">About me</h3>
                    <div className="text-gray-700 text-sm leading-snug transition-all duration-200">
                      {selectedMentor.bio}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedMentor.expertise.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </SidePeekPanel>
    </div>
  );
};

export default Mentors; 