"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Settings, Moon, Sun, X, Bookmark, ArrowRight, Home, BookOpen, UserPlus, Info, MessageSquare } from "lucide-react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mount logic to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-[100] w-full bg-white dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-900 transition-all duration-300">
      <div className="container mx-auto px-4 h-14 flex justify-between items-center group">
        
        {/* লোগো - এটি গায়েব হবে না */}
        <Link href="/" className="shrink-0">
          <Image 
            src="/logo.webp" 
            alt="ToolsBD" 
            width={85} 
            height={32} 
            className="h-5 w-auto md:h-6 dark:brightness-125 transition-all" 
            priority // Logo fast load korar jonno priority add kora holo
          />
        </Link>

        {/* ডানদিকের সেকশন */}
        <div className="flex items-center gap-3">
          
          <Link href="/join" className="hidden lg:flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-xs font-bold transition-all shadow-md shadow-purple-500/10">
            Join Now <ArrowRight size={14} />
          </Link>

          <div className="flex lg:hidden items-center gap-3">
            <div className="flex items-center border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden h-9">
              <button className="px-2.5 h-full text-gray-500 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors border-r border-gray-200 dark:border-zinc-800">
                <Bookmark size={16} />
              </button>
              
              {/* Theme Toggle: Hydration safe rendering */}
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="px-2.5 h-full text-gray-500 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors focus:outline-none"
              >
                {mounted ? (
                  theme === "dark" ? <Sun size={16} className="text-yellow-500" /> : <Moon size={16} />
                ) : (
                  <div className="w-4 h-4" /> 
                )}
              </button>
            </div>

            <button 
              onClick={() => setIsOpen(true)} 
              className="p-2 text-purple-600 bg-purple-50 dark:bg-purple-900/20 rounded-lg transition-transform active:scale-95"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* মোবাইল ক্যানভাস (Conditional Rendering Logic) */}
      {isOpen && (
        <div className="fixed inset-0 z-[110] lg:hidden animate-in fade-in duration-300">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setIsOpen(false)} />
          
          {/* Content */}
          <div className="absolute right-0 top-0 h-full w-[260px] bg-white dark:bg-zinc-950 p-5 shadow-2xl border-l border-gray-100 dark:border-zinc-900 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-8">
                <Image src="/logo.webp" alt="Logo" width={75} height={28} />
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-1.5 bg-gray-50 dark:bg-zinc-900 text-gray-500 rounded-full border border-gray-100 dark:border-zinc-800"
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
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-zinc-900/50 border border-transparent hover:border-purple-500/20 transition-all active:scale-95"
                >
                  {item.icon}
                  <span className="text-[11px] font-bold dark:text-zinc-300">{item.name}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-6">
              <Link href="/join" onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full p-3 bg-purple-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-500/20">
                <UserPlus size={16} /> Join Community
              </Link>
            </div>
            
            <div className="absolute bottom-6 left-0 w-full text-center px-6">
               <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">ToolsBD • 2026</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;