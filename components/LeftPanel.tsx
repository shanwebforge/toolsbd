"use client";
import { Home, LayoutGrid, Info, ShieldCheck, Moon, Sun, Heart } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const LeftPanel = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    
    // বুকমার্ক কাউন্ট আপডেট করার লজিক
    const updateCount = () => {
      const saved = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      setBookmarkCount(saved.length);
    };

    updateCount();
    window.addEventListener('storage', updateCount);
    return () => window.removeEventListener('storage', updateCount);
  }, []);

  const isDark = resolvedTheme === "dark";

  if (!mounted) return null;

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-6 py-10 transition-all">
      
      {/* Main Menu Section */}
      <div className="space-y-6 mt-10">
        <p className="text-[10px] font-black text-gray-400 dark:text-zinc-600 uppercase tracking-[0.2em] px-4">Main Menu</p>
        
        <nav className="space-y-1.5">
          {/* Home Button */}
          <Link href="/" className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${pathname === "/" ? "text-purple-600 bg-purple-50 dark:bg-purple-900/20" : "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-900"}`}>
            <Home size={18} /> Home
          </Link>

          {/* Saved Tools (Bookmarks) Button with Badge */}
          <Link href="/pages/bookmarks" className={`flex items-center justify-between px-4 py-3 text-sm font-bold rounded-xl transition-all ${pathname === "/bookmarks" ? "text-rose-500 bg-rose-50 dark:bg-rose-500/10" : "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-900"}`}>
            <div className="flex items-center gap-3">
              <Heart size={18} className={pathname === "/pages/bookmarks" ? "fill-current" : ""} /> 
              Saved Tools
            </div>
            {bookmarkCount > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-lg bg-rose-500 px-1.5 text-[10px] font-black text-white animate-in zoom-in">
                {bookmarkCount}
              </span>
            )}
          </Link>

          {/* All Tools Button */}
          <Link href="/tools" className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${pathname === "/tools" ? "text-purple-600 bg-purple-50 dark:bg-purple-900/20" : "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-900"}`}>
            <LayoutGrid size={18} /> All Tools
          </Link>

          {/* About Us Button */}
          <Link href="/about" className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${pathname === "/about" ? "text-purple-600 bg-purple-50 dark:bg-purple-900/20" : "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-900"}`}>
            <Info size={18} /> About Us
          </Link>
        </nav>
      </div>
      
      {/* Bottom Section (Appearance & Privacy) */}
      <div className="mt-auto space-y-4 pb-4">
        <div className="p-4 bg-gray-50 dark:bg-zinc-900/50 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black text-gray-500 dark:text-zinc-500 uppercase tracking-wider">Appearance</span>
            {isDark ? <Moon size={14} className="text-purple-400" /> : <Sun size={14} className="text-yellow-500" />}
          </div>
          
          <div className="relative flex items-center w-full p-1 bg-gray-200 dark:bg-zinc-800 rounded-xl transition-all h-9">
            <div 
              className={`absolute h-7 w-[calc(50%-4px)] bg-white dark:bg-zinc-700 rounded-lg shadow-sm transition-all duration-300 ease-in-out ${isDark ? "translate-x-full" : "translate-x-0"}`} 
            />
            
            <button 
              onClick={() => setTheme("light")}
              className={`relative z-10 flex-1 text-[10px] font-black uppercase transition-colors ${!isDark ? "text-purple-600" : "text-gray-500"}`}
            >
              Light
            </button>
            <button 
              onClick={() => setTheme("dark")}
              className={`relative z-10 flex-1 text-[10px] font-black uppercase transition-colors ${isDark ? "text-purple-400" : "text-gray-500"}`}
            >
              Dark
            </button>
          </div>
        </div>

        <Link href="/privacy" className="flex items-center gap-3 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-purple-600 transition-colors">
          <ShieldCheck size={16} /> Privacy Policy
        </Link>
      </div>
    </aside>
  );
};

export default LeftPanel;