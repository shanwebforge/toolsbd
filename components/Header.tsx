"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, Bookmark, ArrowRight } from "lucide-react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-[60] w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 h-20 flex justify-between items-center">
        
        {/* লোগো */}
        <Link href="/" className="shrink-0">
          <Image src="/logo.webp" alt="ToolsBD" width={110} height={40} className="dark:brightness-125" />
        </Link>

        {/* ডানদিকের সেকশন */}
        <div className="flex items-center gap-2">
          
          {/* PC তে শুধু এই বাটনটি দেখাবে */}
          <Link href="/join" className="hidden lg:flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-500/20">
            Join Now <ArrowRight size={16} />
          </Link>

          {/* মোবাইল আইকনগুলো (পিসিতে hidden) */}
          <div className="flex lg:hidden items-center gap-2">
             <button className="p-2.5 rounded-full text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900">
                <Bookmark size={20} />
             </button>

             {/* ডার্ক মোড টগল (শুধু মোবাইল) */}
             <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2.5 rounded-full text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900"
              >
                {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
             </button>

             {/* হামবার্গার মেনু */}
             <button onClick={() => setIsOpen(true)} className="p-2.5 text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <Menu size={24} />
             </button>
          </div>
        </div>
      </div>

      {/* মোবাইল ক্যানভাস (Background কালারসহ) */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          {/* Content - এখানে bg-white/bg-gray-950 দেওয়া হয়েছে */}
          <div className="absolute right-0 top-0 h-full w-[280px] bg-white dark:bg-gray-950 p-6 shadow-2xl transition-all">
            <div className="flex justify-between items-center mb-10">
                <Image src="/logo.webp" alt="Logo" width={90} height={30} />
                <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-100 dark:bg-gray-900 rounded-full">
                  <X size={20} />
                </button>
            </div>
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-lg font-bold">Home</Link>
              <Link href="/blog" className="text-lg font-bold">Blog</Link>
              <Link href="/join" className="text-blue-600 font-bold">Get Started</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;