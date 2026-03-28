'use client';

import { getToolsByCat } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import { Briefcase, Rocket, Search, Globe, Laptop } from 'lucide-react';

export default function FreelancingToolsPage() {
  // 'freelanching-tools' category theke data asbe
  const tools = getToolsByCat('freelanching-tools'); 

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:p-10 transition-colors">
      {/* Header Section */}
      <div className="mb-10 space-y-4">
        {/* Secondary Indigo Label */}
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
          <Rocket size={18} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Marketplace & Career Kits</span>
        </div>

        {/* Primary Purple Title */}
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Professional <span className="text-purple-600">Freelancing Tools</span>
        </h1>

        {/* Description - Freelancing focused */}
        <p className="text-gray-500 dark:text-zinc-400 max-w-2xl text-sm md:text-base leading-relaxed font-medium">
          Accelerate your freelancing career with our curated suite of professional tools. 
          From marketplace optimization to portfolio management and payment calculation, 
          we provide the resources you need to succeed globally.
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.length > 0 ? (
          tools.map(tool => (
            <ToolCard key={tool.id} {...tool} />
          ))
        ) : (
          /* Empty State - Freelancing Design */
          <div className="col-span-full py-24 text-center border-2 border-dashed border-indigo-100 dark:border-zinc-800 rounded-[2.5rem] bg-white/50 dark:bg-zinc-900/30">
            <div className="relative inline-block mb-6">
               <Briefcase size={54} className="mx-auto text-indigo-200 dark:text-zinc-700" />
               <Laptop size={20} className="absolute -bottom-1 -right-1 text-purple-500 animate-bounce" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-200 mb-2 uppercase tracking-wide">Work In Progress</h3>
            <p className="text-gray-400 italic text-sm font-medium max-w-xs mx-auto">
              We are currently curating the best freelancing resources for you. Check back soon!
            </p>
          </div>
        )}
      </div>

      {/* Footer Support Tag */}
      <div className="mt-16 flex flex-col items-center justify-center space-y-2 py-8 border-t border-slate-100 dark:border-zinc-800">
         <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[10px] font-bold text-purple-600">UP</div>
            <div className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[10px] font-bold text-indigo-600">FI</div>
            <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[10px] font-bold text-emerald-600">LI</div>
         </div>
         <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Optimized for Global Marketplaces</p>
      </div>
    </div>
  );
}