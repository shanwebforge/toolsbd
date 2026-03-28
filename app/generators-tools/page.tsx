'use client';

import { getToolsByCat } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import { 
  Wand2, 
  Sparkles, 
  Layers, 
  Package, 
  Search 
} from 'lucide-react';

export default function GeneratorToolsPage() {
  // 'gen-tools' category থেকে ডাটা আসবে
  const tools = getToolsByCat('gen-tools'); 

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:p-10 transition-colors">
      {/* Header Section */}
      <div className="mb-10 space-y-4">
        {/* Secondary Indigo Label */}
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
          <Sparkles size={18} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Smart Content Creation</span>
        </div>

        {/* Primary Purple Title */}
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Instant <span className="text-purple-600">Generator Tools</span>
        </h1>

        {/* Description - Generator focused */}
        <p className="text-gray-500 dark:text-zinc-400 max-w-2xl text-sm md:text-base leading-relaxed font-medium">
          Automate your workflow with our powerful generation tools. From professional 
          invoices and creative flyers to secure passwords, create high-quality 
          assets instantly with just a few clicks.
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.length > 0 ? (
          tools.map(tool => (
            <ToolCard key={tool.id} {...tool} />
          ))
        ) : (
          /* Empty State - Generator Design */
          <div className="col-span-full py-24 text-center border-2 border-dashed border-purple-100 dark:border-zinc-800 rounded-[2.5rem] bg-white/50 dark:bg-zinc-900/30">
            <div className="relative inline-block mb-6">
               <Wand2 size={54} className="mx-auto text-purple-200 dark:text-zinc-700" />
               <Layers size={20} className="absolute -bottom-1 -right-1 text-indigo-500 animate-bounce" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-200 mb-2 uppercase tracking-wide">No Generators Found</h3>
            <p className="text-gray-400 italic text-sm font-medium max-w-xs mx-auto">
              We are working on new smart generators. Please stay tuned for future updates!
            </p>
          </div>
        )}
      </div>

      {/* Bottom Visual Note */}
      <div className="mt-16 flex items-center justify-center gap-3 py-6 border-t border-slate-100 dark:border-zinc-800">
         <div className="p-2 bg-slate-100 dark:bg-zinc-800 rounded-lg">
            <Package size={16} className="text-slate-400" />
         </div>
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Built for Speed & Efficiency</p>
      </div>
    </div>
  );
}