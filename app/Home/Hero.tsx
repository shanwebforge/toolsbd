import React from 'react';

const Hero = () => {
  return (
    <section className="relative bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 overflow-hidden">
      {/* Background elements - Light mode */}
      <div className="absolute inset-0 bg-gray-50 dark:hidden" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 via-transparent to-indigo-100/50 dark:hidden" />
      
      {/* Background elements - Dark mode */}
      <div className="absolute inset-0 hidden dark:block">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-indigo-500/10" />
      </div>
      
      {/* Animated blur circles - Dark mode only */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse hidden dark:block" />
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000 hidden dark:block" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-sm text-purple-700 dark:text-purple-300 font-medium">Free & Open Source</span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-7xl">
            <span className="block text-gray-900 dark:text-white">A free online tools site</span>
            <span className="block text-purple-600 dark:bg-gradient-to-r dark:from-purple-400 dark:via-indigo-400 dark:to-purple-400 dark:bg-clip-text dark:text-transparent">
              for everyone
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="mt-6 max-w-2xl mx-auto text-base text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl">
            A collection of free online tools for developers, designers, and everyone. 
            Speed up your workflow with our simple and powerful utilities.
          </p>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-gray-600 dark:text-gray-300">50+ Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              <span className="text-gray-600 dark:text-gray-300">100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-gray-600 dark:text-gray-300">No Registration</span>
            </div>
          </div>

          {/* Call to Action Buttons - Always in one line */}
          <div className="mt-10 flex justify-center gap-3 sm:gap-4">
            <a
              href="#tools"
              className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 dark:bg-gradient-to-r dark:from-purple-600 dark:to-indigo-600 dark:hover:from-purple-700 dark:hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 whitespace-nowrap"
            >
              Explore Tools
            </a>
            <a
              href="/about"
              className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-medium rounded-md text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-800/50 dark:backdrop-blur-sm dark:border-gray-700 dark:hover:bg-gray-800 dark:hover:border-gray-600 transition-all duration-200 whitespace-nowrap"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;