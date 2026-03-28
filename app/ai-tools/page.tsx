'use client';

import { getToolsByCat } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import { Sparkles } from 'lucide-react';

export default function DevToolsPage() {
  const tools = getToolsByCat('ai-tools');

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:p-10">
      {/* Header Section */}
      <div className="mb-10 space-y-3">
        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-2">
          <Sparkles size={20} />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Artificial Intelligence</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
          AI Powered <span className="text-purple-600">Smart Tools</span>
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 max-w-2xl text-sm md:text-base leading-relaxed">
          Enhance your productivity with our collection of AI-driven tools. From smart content generation 
          to automated data analysis, find everything you need to work smarter.
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.length > 0 ? (
          tools.map(tool => (
            <ToolCard key={tool.id} {...tool} />
          ))
        ) : (
          <p className="text-gray-400 italic">No tools found in this category.</p>
        )}
      </div>
    </div>
  );
}