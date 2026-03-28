'use client';

import { getToolsByCat } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import { MapPin, Globe, Search, Zap, Info } from 'lucide-react';

export default function BDBaseToolsPage() {
  // 'bd-tools' category theke data asbe
  const tools = getToolsByCat('bd-tools'); 

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:p-10 transition-colors">
      {/* Header Section */}
      <div className="mb-10 space-y-4">
        {/* Secondary Indigo Label */}
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
          <MapPin size={18} className="animate-bounce" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Local Utility & Services</span>
        </div>

        {/* Primary Purple Title */}
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Bangladesh <span className="text-purple-600">Base Tools</span>
        </h1>

        {/* Description - BD Base focused */}
        <p className="text-gray-500 dark:text-zinc-400 max-w-2xl text-sm md:text-base leading-relaxed font-medium">
          Access essential local services, government info trackers, and daily utility tools 
          specifically designed for users in Bangladesh. Everything you need, simplified for your local needs.
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.length > 0 ? (
          tools.map(tool => (
            <ToolCard key={tool.id} {...tool} />
          ))
        ) : (
          /* Empty State - BD Based Design */
          <div className="col-span-full py-24 text-center border-2 border-dashed border-purple-100 dark:border-zinc-800 rounded-[2.5rem] bg-white/50 dark:bg-zinc-900/30">
            <div className="relative inline-block mb-6">
               <Globe size={54} className="mx-auto text-purple-200 dark:text-zinc-700" />
               <Search size={20} className="absolute -bottom-1 -right-1 text-indigo-500 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-200 mb-2 uppercase tracking-wide">No Local Tools Found</h3>
            <p className="text-gray-400 italic text-sm font-medium max-w-xs mx-auto">
              We couldn't find any tools in the Bangladesh Base category right now.
            </p>
          </div>
        )}
      </div>

      {/* Optional Help Note */}
      <div className="mt-16 flex items-center justify-center gap-2 p-4 border border-slate-100 dark:border-zinc-800 rounded-2xl bg-slate-50/50 dark:bg-zinc-900/20">
         <Info size={14} className="text-indigo-500" />
         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
           New tools are added weekly. Stay tuned for more BD focused utilities.
         </p>
      </div>
    </div>
  );
}