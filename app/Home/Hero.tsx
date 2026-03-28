'use client';

import React from 'react';
import { Sparkles, ArrowRight, Smartphone, LayoutGrid } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-white dark:bg-[#09090b] overflow-hidden">
      {/* Precision Grid Background - Professional Touch */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none [background-image:linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Subtle Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-purple-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28">
        <div className="flex flex-col items-center text-center">
          
          {/* Minimal Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/50 mb-6 group cursor-default transition-all hover:border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className="text-[11px] md:text-xs font-bold text-slate-600 dark:text-zinc-400 uppercase tracking-widest">
              v2.0 • 100% Open Source
            </span>
          </div>
          
          {/* Main Title - Tightened tracking and line height */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.04em] leading-[0.95] text-slate-900 dark:text-white">
            Fast. Simple. <br />
            <span className="text-purple-600 dark:bg-gradient-to-r dark:from-purple-400 dark:to-indigo-500 dark:bg-clip-text dark:text-transparent">
              Online Tools.
            </span>
          </h1>
          
          {/* Subtitle - Compact max-width */}
          <p className="mt-6 max-w-xl text-sm md:text-lg text-slate-500 dark:text-zinc-400 font-medium leading-relaxed px-4">
            Powerful utilities for developers and creators. No registration, 
            no ads—just pure productivity in your browser.
          </p>

          {/* Stats Bar - Compact & Bordered */}
          <div className="mt-8 flex items-center justify-center gap-4 py-2 px-4 rounded-xl border border-slate-100 dark:border-zinc-800/50 bg-slate-50/50 dark:bg-zinc-900/20">
            <div className="flex items-center gap-1.5 border-r border-slate-200 dark:border-zinc-800 pr-4">
              <LayoutGrid className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-[11px] font-bold text-slate-600 dark:text-zinc-300">50+ Tools</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-[11px] font-bold text-slate-600 dark:text-zinc-300">Mobile Ready</span>
            </div>
          </div>

          {/* CTA Group - Optimized for Mobile One-Line */}
          <div className="mt-10 flex items-center justify-center gap-3 w-full max-w-[400px]">
            <a
              href="#tools"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-black uppercase tracking-tighter rounded-xl text-white bg-purple-600 hover:bg-purple-700 dark:bg-white dark:text-black dark:hover:bg-slate-200 transition-all duration-300 shadow-xl shadow-purple-500/20 active:scale-[0.98]"
            >
              Explore Tools
              <ArrowRight className="w-4 h-4" />
            </a>
            
            <a
              href="/download"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-black uppercase tracking-tighter rounded-xl text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 dark:text-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 transition-all duration-300 active:scale-[0.98]"
            >
              Download App
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;