'use client';

import { 
  Cpu, Code2, Palette, Clock, Type, Calculator, 
  Coins, Zap, Share2, Image as ImageIcon, 
  FileText, RefreshCcw, ShieldCheck, ChevronRight, TrendingUp , Moon, BookOpen, Briefcase, MapPin
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase'; 
import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp, onSnapshot, collection } from 'firebase/firestore';

// তোর অরিজিনাল ক্যাটাগরি ডাটা (এখানে ID গুলো তোর ফোল্ডার নামের সাথে মিলিয়ে দিয়েছি)
const categories = [
  { id: 'ai-tools', name: 'AI Tools', desc: 'Smart AI assistants & generators.', icon: Cpu, count: 12, color: 'text-purple-500' },
  { id: 'dev-tools', name: 'Developer Tools', desc: 'Debug, format & optimize code.', icon: Code2, count: 25, color: 'text-blue-500' },
  { id: 'design-tools', name: 'Designer Tools', desc: 'Color palettes & UI assets.', icon: Palette, count: 18, color: 'text-pink-500' },
  { id: 'daily-tools', name: 'Daily Use Tools', desc: 'Essential everyday utilities.', icon: Clock, count: 15, color: 'text-amber-500' },
  { id: 'text-tools', name: 'Text Tools', desc: 'Convert, clean & analyze text.', icon: Type, count: 30, color: 'text-indigo-500' },
  { id: 'calculator-tools', name: 'Calculator Tools', desc: 'Math, GPA & Unit converters.', icon: Calculator, count: 10, color: 'text-emerald-500' },
  { id: 'finance-tools', name: 'Finance Tools', desc: 'Currency & loan calculators.', icon: Coins, count: 8, color: 'text-orange-500' },
  { id: 'generators-tools', name: 'Online Generators', desc: 'Pass, QR & Placeholder gen.', icon: Zap, count: 22, color: 'text-yellow-500' },
  { id: 'media-tools', name: 'Social Media', desc: 'Bio & caption optimization.', icon: Share2, count: 14, color: 'text-sky-500' },
  { id: 'image-tools', name: 'Image Tools', desc: 'Crop, resize & filter images.', icon: ImageIcon, count: 20, color: 'text-rose-500' },
  { id: 'pdf-tools', name: 'PDF Tools', desc: 'Merge, split & edit PDFs.', icon: FileText, count: 9, color: 'text-red-500' },
  { id: 'converter', name: 'File Converter', desc: 'Format swapping made easy.', icon: RefreshCcw, count: 35, color: 'text-cyan-500' },
  { id: 'security', name: 'Security & Privacy', desc: 'Encryption & safety tools.', icon: ShieldCheck, count: 6, color: 'text-green-600' },

  { id: 'islamic', name: 'Islamic Tools', desc: 'Prayer times & Quranic tools.', icon: Moon, count: 8, color: 'text-emerald-800' },
  { id: 'educational-tools', name: 'Education Tools', desc: 'Learning & academic resources.', icon: BookOpen, count: 12, color: 'text-blue-600' },
  { 
    id: 'freelanching-tools', 
    name: 'Freelancing Tools', 
    desc: 'Marketplace, portfolio & payment kits.', 
    icon: Briefcase, 
    count: 12, 
    color: 'text-indigo-600' 
  },
  { 
    id: 'bd-tools', 
    name: 'BD Base Tools', 
    desc: 'Local services, numbers & banking tools.', 
    icon: MapPin, 
    count: 8, 
    color: 'text-emerald-600' 
  },
];

export default function ToolCategories() {
  const router = useRouter();
  const [dbClicks, setDbClicks] = useState<Record<string, number>>({});

  // ফায়ারবেস থেকে রিয়েল-টাইম ক্লিক কাউন্ট রিড করা
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'categories_clicks'), (snapshot) => {
      const counts: Record<string, number> = {};
      snapshot.forEach((doc) => {
        counts[doc.id] = doc.data().click_count || 0;
      });
      setDbClicks(counts);
    });
    return () => unsub();
  }, []);

  // ক্লিক হ্যান্ডেলার
  const handleCategoryClick = async (catId: string, catName: string) => {
    // ১. সরাসরি তোর ফোল্ডারে পাঠিয়ে দাও (যেমন: /dev-tools)
    router.push(`/${catId}`);

    // ২. ব্যাকগ্রাউন্ডে ফায়ারবেস আপডেট করো
    const catRef = doc(db, 'categories_clicks', catId);
    try {
      const docSnap = await getDoc(catRef);
      if (docSnap.exists()) {
        await updateDoc(catRef, { 
          click_count: increment(1), 
          last_updated: serverTimestamp() 
        });
      } else {
        await setDoc(catRef, { 
          name: catName, 
          click_count: 1, 
          last_updated: serverTimestamp() 
        });
      }
    } catch (error) {
      console.error("Tracking Error:", error);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              Explore <span className="text-purple-600 italic">Categories</span>
            </h2>
            <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-[0.4em] mt-1">
              Premium Utility Ecosystem
            </p>
          </div>
          <div className="flex gap-3">
             <div className="px-4 py-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg shadow-sm">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Total Tools</span>
                <span className="text-lg font-black text-purple-600 italic">240+</span>
             </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {categories.map((cat, index) => (
            <div 
              key={index}
              onClick={() => handleCategoryClick(cat.id, cat.name)}
              className="group bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg p-5 hover:border-purple-500 dark:hover:border-purple-500 transition-all cursor-pointer shadow-sm hover:shadow-xl active:scale-[0.98]"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300`}>
                  <cat.icon className={`w-5 h-5 ${cat.color} group-hover:text-white`} />
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[8px] font-black text-slate-400 dark:text-zinc-600 uppercase  leading-none">Usage</span>
                   <div className="flex items-center gap-1 mt-1 text-emerald-500">
                      <TrendingUp className="w-2.5 h-2.5" />
                      <span className="text-[10px] font-bold">
                        {/* ফায়ারবেস থেকে রিয়েল কাউন্ট দেখাচ্ছে */}
                        {dbClicks[cat.id] || 0}
                      </span>
                   </div>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-black text-slate-800 dark:text-zinc-100 uppercase tracking-tight group-hover:text-purple-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[10px] font-medium text-slate-500 dark:text-zinc-400 leading-relaxed line-clamp-1">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-dashed border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-[9px] font-black bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded uppercase tracking-tighter">
                    {cat.count} Tools
                  </span>
                </div>
                <button className="p-1.5 bg-slate-50 dark:bg-zinc-800 rounded-md text-slate-400 group-hover:text-purple-600 group-hover:bg-purple-50 dark:group-hover:bg-purple-500/10 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
}