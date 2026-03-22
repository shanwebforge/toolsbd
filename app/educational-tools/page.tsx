
import Link from 'next/link';

const educationalTools = [
  { name: 'GPA/CGPA ক্যালকুলেটর', icon: 'fas fa-graduation-cap', href: '/educational-tools/gpa-cgpa-calculator' },
  { name: 'MCQ Practice', icon: 'fas fa-list-check', href: '/educational-tools/mcq-prectice' },
  { name: 'টাইম টেবিল জেনারেটর', icon: 'fas fa-calendar-alt', href: '/educational-tools/time-table' },
  { name: 'গণিত সমস্যা সমাধান', icon: 'fas fa-square-root-alt', href: '/educational-tools/math-solver' },
  { name: 'ফ্ল্যাশকার্ড তৈরি', icon: 'fas fa-clone', href: '/educational-tools/flash-card' },
  { name: 'স্পেল চেকার', icon: 'fas fa-spell-check', href: '/educational-tools/spell-chacker' },
  { name: 'PDF থেকে Text', icon: 'fas fa-file-pdf', href: '/educational-tools/pdf-to-text' },
  { name: 'Study Timer', icon: 'fas fa-clock', href: '/educational-tools/study-timer' },
  { name: 'Text to Handwriting', icon: 'fas fa-file-pen', href: '/educational-tools/text-to-handwriting' },
  { name: 'Voice Pronunciation', icon: 'fas fa-volume-up', href: '/educational-tools/voice-pronunciation-generator' },
  { name: 'Syllabus Breakdown', icon: 'fas fa-stream', href: '/educational-tools/syllabus-breakdown' },
  { name: 'Viva Question Storage', icon: 'fas fa-comments', href: '/educational-tools/viva-question' },
  { name: 'কাজ চলতেছে...', icon: 'fas fa-spinner fa-spin', href: '#' },
];

const EducationalToolsPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Education Tools</h2>
          <Link href="/educational-tools" className="text-indigo-500 hover:text-indigo-600">
              <i className="fa-solid fa-chevron-right"></i>
          </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {educationalTools.map((tool, index) => (
          <Link key={index} href={tool.href} className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="text-4xl text-indigo-500 mb-3">
                  <i className={tool.icon}></i>
              </div>
              <span className="text-md font-semibold text-gray-800 dark:text-gray-200">{tool.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EducationalToolsPage;
