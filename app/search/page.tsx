
"use client";
import { useState, useEffect, useRef } from 'react';

const SearchPage = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-end space-x-4 mb-4">
        <button onClick={toggleSearch} className="focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        {/* Add other icons here */}
      </div>
      {isSearchVisible && (
        <div ref={searchContainerRef} className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <input type="text" placeholder="Search..." className="w-full px-4 py-2 focus:outline-none" />
          <button className="bg-blue-500 text-white px-4 py-2">Search</button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
