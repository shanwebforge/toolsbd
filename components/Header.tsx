"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Settings, Moon, Sun, X, Bookmark, ArrowRight, Home, Heart, BookOpen, UserPlus, Info, MessageSquare } from "lucide-react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    const updateCount = () => {
      const saved = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      setBookmarkCount(saved.length);
    };
    updateCount();
    window.addEventListener('storage', updateCount);
    return () => window.removeEventListener('storage', updateCount);
  }, []);

  return (
    <header 
      className="sticky top-0 z-[100] bg-white dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-900 transition-all duration-300
      w-full lg:left-64 lg:w-[calc(100%-256px)]"
    >
      <div className="container mx-auto px-4 h-14 flex justify-between items-center">
        
        {/* লোগো সেকশন */}
        <Link href="/" className="shrink-0">
          <Image 
            src="/logo.webp" 
            alt="ToolsBD" 
            width={85} 
            height={32} 
            className="h-5 w-auto md:h-6 dark:brightness-125 transition-all" 
            priority 
          />
        </Link>

        {/* পিসি মেনু - শুধু টেক্সট লিংক */}
        <nav className="hidden lg:flex items-center gap-2">
          {[
            { name: "Home", href: "/" },
            { name: "Service", href: "/services" },
            { name: "Blog", href: "/blog" },
            { name: "About", href: "/about" },
            { name: "Contact", href: "/contact" },
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-zinc-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* ডানদিকের সেকশন (PC & Mobile) */}
        <div className="flex items-center gap-3">
          
          {/* পিসি ভার্সন জয়েন বাটন */}
          <Link href="/join" className="hidden lg:flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-xs font-bold transition-all shadow-md shadow-purple-500/10 active:scale-95">
            Join Now <ArrowRight size={14} />
          </Link>

          {/* মোবাইল ভার্সন UI (বুকমার্ক + থিম টগল) */}
          <div className="flex lg:hidden items-center gap-3">
            <div className="flex items-center border border-gray-200 dark:border-zinc-800 rounded-lg h-9 bg-gray-50/50 dark:bg-zinc-900/30">
              <Link href="/pages/bookmarks" className="relative px-2.5 h-full flex items-center justify-center text-gray-500 dark:text-zinc-400 border-r border-gray-200 dark:border-zinc-800">
                <Heart size={16} />
                {mounted && bookmarkCount > 0 && (
                  <span className="absolute -top-1 -right-0.5 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-purple-600 px-1 text-[8px] font-black text-white ring-2 ring-white dark:ring-zinc-950">
                    {bookmarkCount}
                  </span>
                )}
              </Link>
              
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="px-2.5 h-full flex items-center justify-center text-gray-500 dark:text-zinc-400 focus:outline-none"
              >
                {mounted ? (
                  theme === "dark" ? <Sun size={16} className="text-yellow-500" /> : <Moon size={16} />
                ) : (
                  <div className="w-4 h-4" /> 
                )}
              </button>
            </div>

            {/* মোবাইল সেটিংস/মেনু বাটন */}
            <button 
              onClick={() => setIsOpen(true)} 
              className="p-2 text-purple-600 bg-purple-50 dark:bg-purple-900/20 rounded-lg active:scale-95"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* মোবাইল ড্রয়ার (Mobile Drawer) */}
      {isOpen && (
        <div className="fixed inset-0 z-[110] lg:hidden animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[260px] bg-white dark:bg-zinc-950 p-5 shadow-2xl border-l border-gray-100 dark:border-zinc-900 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-8">
                <Image src="/logo.webp" alt="Logo" width={75} height={28} />
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-1.5 bg-gray-50 dark:bg-zinc-900 text-gray-500 rounded-full border border-gray-100 dark:border-zinc-800 hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
            </div>

            <nav className="grid grid-cols-2 gap-3">
              {[
                { name: "Home", icon: <Home size={18} className="text-purple-600" />, href: "/" },
                { name: "Blog", icon: <BookOpen size={18} className="text-blue-600" />, href: "/blog" },
                { name: "About", icon: <Info size={18} className="text-emerald-600" />, href: "/about" },
                { name: "Contact", icon: <MessageSquare size={18} className="text-orange-600" />, href: "/contact" }
              ].map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setIsOpen(false)} 
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-zinc-900/50 border border-transparent hover:border-purple-500/20 active:scale-95"
                >
                  {item.icon}
                  <span className="text-[11px] font-bold dark:text-zinc-300">{item.name}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-6">
              <Link 
                href="/join" 
                onClick={() => setIsOpen(false)} 
                className="flex items-center justify-center gap-2 w-full p-3 bg-purple-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-500/20 active:scale-95"
              >
                <UserPlus size={16} /> Join Community
              </Link>
            </div>
            
            <div className="absolute bottom-6 left-0 w-full text-center px-6">
                <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">ToolxBD • 2026</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;