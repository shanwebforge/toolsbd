"use client";
import { Home, LayoutGrid, Info, ShieldCheck, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const LeftPanel = () => {
  // resolvedTheme ব্যবহার করা হয়েছে যাতে system theme-কেও সে ধরতে পারে
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);


  // বর্তমান একটিভ থিম ডার্ক কি না তা নিশ্চিত হওয়া
  const isDark = resolvedTheme === "dark";

  return (
    <aside className="hidden lg:flex fixed left-0 top-20 h-[calc(100vh-80px)] w-64 flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 transition-all">
      <div className="space-y-6">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Main Menu</p>
        <nav className="space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <Home size={20} /> Home
          </Link>
          <Link href="/tools" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl">
            <LayoutGrid size={20} /> All Tools
          </Link>
          <Link href="/about" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl">
            <Info size={20} /> About Us
          </Link>
        </nav>
      </div>
      
      <div className="mt-auto space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Appearance</span>
            {isDark ? <Moon size={14} className="text-blue-400" /> : <Sun size={14} className="text-yellow-500" />}
          </div>
          
          <div className="relative flex items-center w-full p-1 bg-gray-200 dark:bg-gray-800 rounded-xl transition-all h-10">
            {/* স্লাইডিং ব্যাকগ্রাউন্ড */}
            <div 
              className={`absolute h-8 w-[calc(50%-4px)] bg-white dark:bg-gray-700 rounded-lg shadow-sm transition-all duration-300 ease-in-out ${isDark ? "translate-x-full" : "translate-x-0"}`} 
            />
            
            <button 
              onClick={() => setTheme("light")}
              className={`relative z-10 flex-1 text-xs font-bold py-2 text-center transition-colors ${!isDark ? "text-blue-600" : "text-gray-500"}`}
            >
              Light
            </button>
            <button 
              onClick={() => setTheme("dark")}
              className={`relative z-10 flex-1 text-xs font-bold py-2 text-center transition-colors ${isDark ? "text-blue-400" : "text-gray-500"}`}
            >
              Dark
            </button>
          </div>
        </div>

        <Link href="/privacy" className="flex items-center gap-3 px-4 py-2 text-xs font-medium text-gray-500 hover:text-blue-600 transition-colors">
          <ShieldCheck size={16} /> Privacy Policy
        </Link>
      </div>
    </aside>
  );
};

export default LeftPanel;