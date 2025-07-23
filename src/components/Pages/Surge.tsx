import React, { useState, useRef, useEffect } from 'react';
import { Star, Calendar, ChevronRight, X } from 'lucide-react';
import MentorCard from '../Common/MentorCard';
import mockData from '../../data/mockData.json';
import CreditWidget from '../Common/CreditWidget';
import SidePeekPanel from '../Common/SidePeekPanel';

const Surge: React.FC = () => {
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(true);
  const [showCreditModal, setShowCreditModal] = useState(false);

  const { mentors, users } = mockData;
  const currentUser = users[0];

  // About section expand/collapse state
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [showExpand, setShowExpand] = useState(false);
  useEffect(() => {
    setAboutExpanded(false); // Reset when mentor changes
  }, [selectedMentor]);
  useEffect(() => {
    if (aboutRef.current) {
      setShowExpand(aboutRef.current.scrollHeight > aboutRef.current.clientHeight + 2);
    }
  }, [selectedMentor, aboutExpanded]);

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

  const iconRef = useRef<HTMLButtonElement>(null);

  // Close popover on outside click or Escape
  useEffect(() => {
    if (!showCreditModal) return;
    function handleClick(e: MouseEvent) {
      if (iconRef.current && !iconRef.current.contains(e.target as Node)) {
        setShowCreditModal(false);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowCreditModal(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [showCreditModal]);

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

      {/* Sticky Header with CreditWidget Icon */}
      <div className="sticky top-0 z-40 bg-white shadow-md px-6 py-3 flex items-center justify-between" style={{ minHeight: '80px', position: 'relative' }}>
        {/* Left: Title and Subtitle */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">Surge</h1>
          <p className="text-gray-600 mt-0.5 text-sm">Discover and connect with expert mentors</p>
        </div>
        {/* Right: Credit Icon and Popover */}
        <div className="relative">
          <CreditWidget
            credits={currentUser.credits}
            mode="icon"
            onClick={() => setShowCreditModal((v) => !v)}
            iconButtonRef={iconRef}
          />
          {showCreditModal && (
            <div className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 animate-fade-in" style={{ minWidth: 320 }}>
              <CreditWidget
                credits={currentUser.credits}
                onRefill={() => alert('Refill credits coming soon!')}
                description="Used to book mentor sessions. 1 credit = 1 hour."
                mode="full"
              />
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Remove the old title/subtitle here */}

        {Object.entries(mentorsByCategory).map(([category, categoryMentors]: [string, any]) => (
          <div key={category} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{category}</h2>
              <button className="flex items-center space-x-1 text-amber-600 hover:text-amber-700 font-medium">
                <span>View all</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mentor Cards Horizontal Scroll */}
            <div className="flex gap-6 overflow-x-auto scrollbar-hide w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
              {categoryMentors.map((mentor: any) => (
                <MentorCard key={mentor.id} mentor={mentor} onClick={handleMentorClick} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mentor Detail SidePeekPanel - Redesigned */}
      <SidePeekPanel isOpen={!!selectedMentor} onClose={() => setSelectedMentor(null)} title="Mentor Details">
        {selectedMentor && (
          <div className="flex flex-col md:flex-row gap-8 p-8">
            {/* Left: Profile Info */}
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
                      <Star className="w-4 h-4 text-amber-400 mr-1" fill="#fbbf24" />
                      {selectedMentor.rating}
                    </span>
                    <span className="text-xs text-gray-400">({selectedMentor.sessions} sessions)</span>
                  </div>
                  <div className="mb-4 w-full">
                    <h3 className="font-semibold text-gray-900 mb-1">About me</h3>
                    <div
                      ref={aboutRef}
                      className={`text-gray-700 text-sm leading-snug transition-all duration-200 ${aboutExpanded ? '' : 'line-clamp-2'}`}
                      style={{ maxWidth: '100%' }}
                    >
                      {selectedMentor.bio}
                    </div>
                    {showExpand && (
                      <button
                        className="flex items-center mt-1 text-amber-600 hover:text-amber-800 text-xs font-semibold focus:outline-none"
                        onClick={() => setAboutExpanded((v) => !v)}
                      >
                        <span>{aboutExpanded ? 'View less' : 'View more'}</span>
                        <svg
                          className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${aboutExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
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
            {/* Vertical Divider */}
            <div className="hidden md:block w-px bg-gray-200 mx-8" />
            {/* Right: Booking Actions */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl shadow p-6 flex flex-col gap-3">
                <span className="bg-black text-white text-xs font-semibold px-3 py-1 rounded mb-2 w-max">Book a video call</span>
                <h3 className="text-lg font-bold text-gray-900 mb-1">1:1 Video Consultation</h3>
                <p className="text-gray-700 text-sm mb-2">Book a 1:1 live video consultation & get personalized advice</p>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-semibold text-gray-900">Starting at {selectedMentor.price}</span>
                  <span className="flex items-center text-xs text-gray-700 font-medium">
                    <Star className="w-4 h-4 text-amber-400 mr-1" fill="#fbbf24" />
                    {selectedMentor.rating}
                  </span>
                </div>
                <button
                  onClick={handleBookSession}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-base"
                >
                  <span>Select times</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </SidePeekPanel>
    </div>
  );
};

export default Surge;