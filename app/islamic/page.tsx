'use client';

import Link from 'next/link';

const tools = [
  { name: 'Digital Tasbih', href: '/islamic/digital-tasbih', description: 'Count your dhikr and prayers with a digital counter.' },
  { name: 'Islamic Name Finder', href: '/islamic/islamic-name', description: 'Find the perfect Islamic name for your child.' },
  { name: 'Islamic Quiz', href: '/islamic/islamic-quiz', description: 'Test your knowledge of Islam with this interactive quiz.' },
  { name: 'Zakat Calculator', href: '/islamic/jakat-calculator', description: 'Calculate your Zakat with ease and accuracy.' },
  { name: 'Quran Audio', href: '/islamic/quran-audio', description: 'Listen to the full Quran with translations.' },
];

const IslamicToolsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
          Islamic Tools
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Link href={tool.href} key={tool.name}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out h-full flex flex-col p-6 transform hover:-translate-y-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {tool.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 flex-grow">
                  {tool.description}
                </p>
                <div className="mt-6">
                  <span className="text-teal-500 dark:text-teal-400 font-semibold hover:underline">
                    Open Tool &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IslamicToolsPage;
