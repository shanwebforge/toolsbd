"use client";

import Link from "next/link";
import { Sparkles, Rocket, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
      {/* Performance Badge */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2.5 bg-badge-bg border border-badge-border text-badge-text px-6 py-3 rounded-full font-semibold text-sm shadow-md">
          <Zap className="w-[18px] h-[18px]" />
          <span>Fast & Reliable Tools</span>
          <Sparkles className="w-[18px] h-[18px]" />
        </div>
      </div>

      {/* Hero Text */}
      <h1 className="hero-gradient text-3xl md:text-4xl lg:text-[2.8rem] font-black text-center mb-5 leading-tight pb-4 text-balance">
        Free Online Tools for Everyone
      </h1>

      {/* Description */}
      <p className="text-base md:text-lg text-muted-foreground text-center max-w-[800px] mx-auto mb-8 leading-relaxed font-normal">
        বাংলায় সহজ কিছু প্রয়োজনীয় অনলাইন টুলস। টেক্সট, কনভার্টার, ক্যালকুলেটর, টাইমার এবং আরও অনেক কিছু।
        Explore our collection of useful tools and utilities for your daily tasks.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/tools"
          className="btn-gradient-1 inline-flex items-center gap-3 px-8 py-4 text-white font-semibold rounded-xl shadow-lg hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl transition-all duration-300 min-w-[180px] justify-center"
        >
          <Rocket className="w-5 h-5" />
          <span>Explore Tools</span>
        </Link>
        <Link
          href="/blog"
          className="btn-gradient-2 inline-flex items-center gap-3 px-8 py-4 text-white font-semibold rounded-xl shadow-lg hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl transition-all duration-300 min-w-[180px] justify-center"
        >
          <Sparkles className="w-5 h-5" />
          <span>Read Blog</span>
        </Link>
      </div>

      {/* Quick Categories Bar */}
      <div className="grid grid-cols-4 gap-4 md:gap-5 mt-8 pt-6 border-t border-border">
        {[
          { icon: "wrench", label: "Tools" },
          { icon: "code", label: "Dev" },
          { icon: "book", label: "Education" },
          { icon: "wallet", label: "Finance" },
        ].map((item) => (
          <Link
            key={item.label}
            href={`/tools/${item.label.toLowerCase()}`}
            className="flex flex-col items-center gap-2 p-4 bg-card border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-[5deg] transition-transform duration-300">
              <CategoryIcon name={item.icon} />
            </div>
            <span className="text-xs md:text-sm font-semibold text-foreground">{item.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CategoryIcon({ name }: { name: string }) {
  const iconClass = "w-6 h-6 text-primary";
  
  switch (name) {
    case "wrench":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case "code":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case "book":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case "wallet":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    default:
      return null;
  }
}
