'use client';

import { getToolsByCat } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import { ImageIcon, Scissor, Maximize, Sparkles } from 'lucide-react';

export default function ImageToolsPage() {
  const tools = getToolsByCat('image-tools'); // 'image-tools' category theke data asbe

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:p-10">
      {/* Header Section */}
      <div className="mb-10 space-y-3">
        {/* Secondary Indigo Label */}
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
          <Sparkles size={18} />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Graphics & Editing</span>
        </div>

        {/* Primary Purple Title */}
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
          Powerful <span className="text-purple-600">Image Tools</span>
        </h1>

        {/* Description */}
        <p className="text-gray-500 dark:text-zinc-400 max-w-2xl text-sm md:text-base leading-relaxed">
          Optimize and transform your visuals with our professional image utilities. 
          From high-quality compression to instant format conversion, we provide 
          the precision tools you need for perfect graphics every time.
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.length > 0 ? (
          tools.map(tool => (
            <ToolCard key={tool.id} {...tool} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-indigo-100 dark:border-indigo-900/30 rounded-3xl">
            <ImageIcon size={40} className="mx-auto text-purple-300 mb-4" />
            <p className="text-gray-400 italic font-medium">No image tools found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}