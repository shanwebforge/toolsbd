'use client';

import React, { useState } from 'react';
import { Palette, Copy, Check, Zap, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// All essential colors for designers/developers
const allColors = [
  { name: 'Slate', hex: '#64748b', class: 'bg-slate-500' },
  { name: 'Gray', hex: '#6b7280', class: 'bg-gray-500' },
  { name: 'Zinc', hex: '#71717a', class: 'bg-zinc-500' },
  { name: 'Neutral', hex: '#737373', class: 'bg-neutral-500' },
  { name: 'Stone', hex: '#78716c', class: 'bg-stone-500' },
  { name: 'Red', hex: '#ef4444', class: 'bg-red-500' },
  { name: 'Orange', hex: '#f97316', class: 'bg-orange-500' },
  { name: 'Amber', hex: '#f59e0b', class: 'bg-amber-500' },
  { name: 'Yellow', hex: '#eab308', class: 'bg-yellow-500' },
  { name: 'Lime', hex: '#84cc16', class: 'bg-lime-500' },
  { name: 'Green', hex: '#22c55e', class: 'bg-green-500' },
  { name: 'Emerald', hex: '#10b981', class: 'bg-emerald-500' },
  { name: 'Teal', hex: '#14b8a6', class: 'bg-teal-500' },
  { name: 'Cyan', hex: '#06b6d4', class: 'bg-cyan-500' },
  { name: 'Sky', hex: '#0ea5e9', class: 'bg-sky-500' },
  { name: 'Blue', hex: '#3b82f6', class: 'bg-blue-500' },
  { name: 'Indigo', hex: '#6366f1', class: 'bg-indigo-500' },
  { name: 'Violet', hex: '#8b5cf6', class: 'bg-violet-500' },
  { name: 'Purple', hex: '#a855f7', class: 'bg-purple-500' },
  { name: 'Fuchsia', hex: '#d946ef', class: 'bg-fuchsia-500' },
  { name: 'Pink', hex: '#ec4899', class: 'bg-pink-500' },
  { name: 'Rose', hex: '#f43f5e', class: 'bg-rose-500' },
  { name: 'Black', hex: '#000000', class: 'bg-black' },
];

export default function ColorPalettePage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 md:p-20">
        
        {/* Header Section */}
        <div className="mb-12 space-y-4">
          <Link 
            href="/design-tools" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-purple-600 transition-colors uppercase tracking-widest mb-4"
          >
            <ArrowLeft size={14} /> Back to Design Tools
          </Link>
          
          <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400">
            <Palette size={24} strokeWidth={2.5} />
            <span className="text-xs font-black uppercase tracking-[0.4em]">Color Studio</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
            Premium <span className="text-purple-600">Color Palette</span>
          </h1>
          
          <p className="max-w-2xl text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">
            A curated collection of professional HEX colors. Click on any color card 
            to copy the hex code instantly to your clipboard.
          </p>
        </div>

        {/* Colors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {allColors.map((color) => (
            <button
              key={color.hex}
              onClick={() => copyToClipboard(color.hex)}
              className="group relative flex flex-col items-start bg-slate-50 dark:bg-zinc-900/50 p-3 rounded-[2rem] border border-slate-100 dark:border-zinc-800 hover:border-purple-500/50 transition-all active:scale-95 overflow-hidden"
            >
              {/* Color Box */}
              <div
                style={{ backgroundColor: color.hex }}
                className="w-full aspect-square rounded-2xl shadow-inner mb-3 relative overflow-hidden"
              >
                {/* Copy Overlay */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 ${
                  copiedColor === color.hex ? 'bg-black/40 backdrop-blur-sm opacity-100' : 'opacity-0 group-hover:opacity-100 bg-black/10'
                }`}>
                  {copiedColor === color.hex ? (
                    <>
                      <Check className="w-8 h-8 text-white animate-bounce" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Copied!</span>
                    </>
                  ) : (
                    <Copy className="w-6 h-6 text-white opacity-60" />
                  )}
                </div>
              </div>

              {/* Label Info */}
              <div className="px-1 flex flex-col items-start text-left w-full">
                <span className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest leading-none mb-1">
                  {color.name}
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
                  {color.hex.toUpperCase()}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Integration Footer */}
        <div className="mt-20 py-8 border-t border-slate-50 dark:border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                <Zap size={18} className="text-purple-600" />
             </div>
             <p className="text-xs font-bold text-slate-500 dark:text-zinc-400">
               Click any color to copy the HEX code for your project.
             </p>
          </div>
          <div className="text-[10px] font-black text-slate-300 dark:text-zinc-700 uppercase tracking-[0.4em]">
            Optimized for Tailwind CSS
          </div>
        </div>
      </div>
    </div>
  );
}