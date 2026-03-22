'use client';

import Link from 'next/link';

const FreelancingToolsPage = () => {
  const tools = [
    {
      title: 'Employee Evaluation',
      description: 'Evaluate employee performance with a simple form.',
      link: '/freelanching-tools/employee-evaluation',
    },
    {
      title: 'Daily Task Logger',
      description: 'Log and track your daily tasks.',
      link: '/freelanching-tools/daily-log',
    },
    {
      title: 'Contract Template Generator',
      description: 'Generate contract templates for your clients.',
      link: '/freelanching-tools/contract-template-generator',
    },
    {
      title: 'Fiverr Gig Keyword Tool',
      description: 'Find the best keywords for your Fiverr gigs.',
      link: '/freelanching-tools/fiverr-gig-keyword-tool',
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg shadow-xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Freelancing Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool, index) => (
          <Link
            href={tool.link}
            key={index}
            className="block p-6 bg-slate-100 dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold mb-2">{tool.title}</h2>
            <p className="text-slate-600 dark:text-slate-400">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FreelancingToolsPage;
