'use client';

import { getToolsByCat } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import { Code2, Terminal } from 'lucide-react';

export default function DevToolsPage() {
  const tools = getToolsByCat('dev-tools'); // 'dev-tools' category theke data asbe

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:p-10">
      {/* Header Section */}
      <div className="mb-10 space-y-3">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
          <Terminal size={20} />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Developer Resources</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
          Powerful <span className="text-indigo-600">Developer Tools</span>
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 max-w-2xl text-sm md:text-base leading-relaxed">
          Simplify your workflow with our essential development utilities. From code formatting 
          to debugging helpers, we provide the tools you need to build faster and better.
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.length > 0 ? (
          tools.map(tool => (
            <ToolCard key={tool.id} {...tool} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <Code2 size={40} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-400 italic font-medium">No developer tools found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}