'use client';

import { 
  Heart, 
  ArrowUpRight, 
  TrendingUp,
  type LucideIcon 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp, onSnapshot } from 'firebase/firestore';

interface ToolProps {
  id: string;
  name: string;
  desc: string;
  tag: string;
  path: string;
  icon: LucideIcon;
}

export default function ToolCard({ id, name, desc, tag, path, icon: Icon }: ToolProps) {
  const router = useRouter();
  const [clicks, setClicks] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!id || !mounted) return;
    const unsub = onSnapshot(doc(db, 'tools_clicks', id), (doc) => {
      if (doc.exists()) {
        setClicks(doc.data().click_count || 0);
      }
    });
    return () => unsub();
  }, [id, mounted]);

  useEffect(() => {
    if (mounted) {
      const saved = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      setIsBookmarked(saved.includes(id));
    }
  }, [id, mounted]);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    let saved = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (saved.includes(id)) {
      saved = saved.filter((item: string) => item !== id);
      setIsBookmarked(false);
    } else {
      saved.push(id);
      setIsBookmarked(true);
    }
    localStorage.setItem('bookmarks', JSON.stringify(saved));
  };

  const handleToolClick = async () => {
    router.push(path);
    const toolRef = doc(db, 'tools_clicks', id);
    try {
      const docSnap = await getDoc(toolRef);
      if (docSnap.exists()) {
        await updateDoc(toolRef, { click_count: increment(1), last_used: serverTimestamp() });
      } else {
        await setDoc(toolRef, { name, click_count: 1, last_used: serverTimestamp() });
      }
    } catch (err) {
      console.error("Tracking Error:", err);
    }
  };

  if (!mounted) return null;

  return (
    <div 
      onClick={handleToolClick}
      className="group relative w-full bg-white dark:bg-[#121214] border border-slate-200 dark:border-zinc-800/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all cursor-pointer shadow-sm hover:shadow-xl active:scale-[0.98] overflow-hidden"
    >
      {/* Top Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-xl group-hover:scale-110 group-hover:bg-purple-600 transition-all duration-300">
          <Icon className="w-5 h-5 text-slate-600 dark:text-zinc-400 group-hover:text-white" />
        </div>
        <button 
          onClick={toggleBookmark}
          className={`p-2 rounded-lg transition-all ${isBookmarked ? 'text-rose-500 bg-rose-50 dark:bg-rose-500/10' : 'text-slate-300 dark:text-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800'}`}
        >
          <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-[13px] font-black text-slate-800 dark:text-zinc-100 uppercase tracking-tight truncate">
            {name}
          </h3>
          <span className="text-[8px] font-black bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded uppercase tracking-tighter">
            {tag}
          </span>
        </div>
        <p className="text-[11px] font-medium text-slate-500 dark:text-zinc-500 leading-relaxed line-clamp-2">
          {desc}
        </p>
      </div>

      {/* Bottom Action Area */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-zinc-800/50">
        <div className="flex flex-col gap-0.5">
          <span className="text-[8px] font-black text-slate-400 dark:text-zinc-600 uppercase tracking-widest">Analytics</span>
          <div className="flex items-center gap-1.5 text-emerald-500">
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs font-black italic">{clicks}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-purple-600 rounded-xl text-white group-hover:bg-purple-600 dark:group-hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/10 active:scale-95">
          <span className="text-[10px] font-black uppercase tracking-tight">Open Tool</span>
          <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  );
}