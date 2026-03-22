import React from 'react';

const Hero = () => {
  return (
    <section className="relative bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Title */}
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">A free online tools site</span>
            <span className="block text-blue-600">for everyone</span>
          </h1>
          
          {/* Subtitle */}
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            A collection of free online tools for developers, designers, and everyone. 
            Speed up your workflow with our simple and powerful utilities.
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-10 flex justify-center gap-4">
            <div className="rounded-md shadow">
              <a
                href="#tools"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Explore Tools
              </a>
            </div>
            <div className="rounded-md">
              <a
                href="/about"
                className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;