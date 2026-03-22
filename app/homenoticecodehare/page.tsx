
"use client";
import { useEffect, useState } from 'react';

const updates = [
  {
    title: "New Feature: Dark Mode",
    description: "You can now enable dark mode for a better viewing experience at night.",
    link: "/features/dark-mode"
  },
  {
    title: "Upcoming Maintenance",
    description: "We will be undergoing scheduled maintenance on Sunday at 10:00 PM.",
    link: "/maintenance"
  },
  {
    title: "New Tool Added: Lorem Ipsum Generator",
    description: "A new Lorem Ipsum generator has been added to our collection of tools.",
    link: "/tools/lorem-ipsum"
  }
];

const HomeNoticeCodeShare = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % updates.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-4">Latest Updates</h1>
        <div className="relative h-32 overflow-hidden">
          {updates.map((update, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-transform duration-500 ${index === currentSlide ? 'transform-none' : 'translate-x-full'}`}
              style={{ left: `${(index - currentSlide) * 100}%` }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <h2 className="text-xl font-bold mb-2">{update.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">{update.description}</p>
                <a href={update.link} className="text-blue-500 hover:underline mt-2 inline-block">Learn more</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeNoticeCodeShare;
