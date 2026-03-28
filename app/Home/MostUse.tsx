'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { ALL_TOOLS } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import { Flame, TrendingUp } from 'lucide-react';

export default function MostUsedTools() {
  const [topTools, setTopTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'tools_clicks'),
      orderBy('click_count', 'desc'),
      limit(9)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const clickData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const mergedTools = clickData
        .map(data => {
          const toolInfo = ALL_TOOLS.find(t => t.id === data.id);
          return toolInfo ? { ...toolInfo } : null;
        })
        .filter(Boolean);

      setTopTools(mergedTools);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return <div className="py-20 text-center font-black uppercase text-[10px] tracking-widest opacity-50">Loading Popular Tools...</div>;

  return (
    // min-h-screen bad diye h-auto kora hoyeche jate content onujayi height ney
    <div className="h-auto p-6 md:p-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
            <Flame size={16} className="fill-current" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Trending Now</span>
          </div>
          

          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              Most <span className="text-purple-600 italic">Used</span> Tools
            </h2>
          <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-[0.4em]">
            The most popular utilities based on real-time community usage.
          </p>
        </div>

        {/* Grid Section - Responsive Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8">
          {topTools.map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>

        {topTools.length === 0 && !loading && (
          <div className="py-20 text-center border-2 border-dashed border-indigo-50/50 dark:border-zinc-900 rounded-3xl mt-10">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">No usage data found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}