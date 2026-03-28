'use client';

import { useState, useEffect } from 'react';
import { ALL_TOOLS } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import { Heart, Home, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function BookmarksPage() {
  const [bookmarkedTools, setBookmarkedTools] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateBookmarks = () => {
      const savedIds = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      const filtered = ALL_TOOLS.filter(tool => savedIds.includes(tool.id));
      setBookmarkedTools(filtered);
    };

    updateBookmarks();
    window.addEventListener('storage', updateBookmarks);
    return () => window.removeEventListener('storage', updateBookmarks);
  }, []);

  const clearAll = () => {
    if (confirm("Are you sure you want to clear all bookmarks?")) {
      localStorage.setItem('bookmarks', JSON.stringify([]));
      setBookmarkedTools([]);
      // Trigger a storage event for the Header count to update
      window.dispatchEvent(new Event('storage'));
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] px-4 py-8 sm:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section - Responsive Optimized */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 border-b border-slate-100 dark:border-zinc-800/50 pb-8">
          <div>
            <div className="flex items-center gap-2 text-rose-500 mb-2 justify-start">
              <Heart className="w-4 h-4 fill-current" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Your Collection</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              Saved <span className="text-purple-600">Tools</span>
            </h1>
            <p className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-zinc-500 mt-2">
              All your favorite tools are saved here for quick access.
            </p>
          </div>

          {bookmarkedTools.length > 0 && (
            <button 
              onClick={clearAll}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-all border border-rose-200/50 dark:border-rose-500/20 w-full sm:w-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All
            </button>
          )}
        </div>

        {/* Tools Grid - Mobile 1, PC 2 columns with better spacing */}
        {bookmarkedTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {bookmarkedTools.map((tool) => (
              <ToolCard key={tool.id} {...tool} />
            ))}
          </div>
        ) : (
          /* Empty State - English */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 dark:bg-zinc-900 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300 dark:text-zinc-700" />
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-800 dark:text-zinc-200 uppercase">No tools saved yet!</h2>
            <p className="text-[11px] sm:text-sm text-slate-500 dark:text-zinc-500 mt-2 mb-8 max-w-[250px] sm:max-w-none">
              Click the heart icon on any tool from the home page to save it here.
            </p>
            <Link 
              href="/" 
              className="flex items-center gap-2 px-6 py-3.5 bg-purple-600 text-white rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/20 active:scale-95"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}