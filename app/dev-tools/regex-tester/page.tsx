'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Code2, AlertCircle, Terminal, Sparkles, Wand2, Info } from 'lucide-react';

const RegexTesterPage = () => {
  const [pattern, setPattern] = useState('\\d+');
  const [text, setText] = useState('My phone number is 01712345678 and email is test@example.com');
  const [error, setError] = useState('');
  const [highlightedText, setHighlightedText] = useState('');

  const runRegex = useCallback(() => {
    setError('');
    if (!pattern) {
      setHighlightedText(text);
      return;
    }

    try {
      const regex = new RegExp(pattern, 'g');
      // Escape HTML to prevent XSS before highlighting
      const safeText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      
      const result = safeText.replace(regex, (match) => 
        `<span class="bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500 font-bold px-0.5 rounded-sm">${match}</span>`
      );
      
      setHighlightedText(result || '<span class="text-zinc-400 italic">No matches found...</span>');
    } catch (e) {
      setError('Invalid Regular Expression syntax');
      setHighlightedText(text);
    }
  }, [pattern, text]);

  useEffect(() => {
    const timer = setTimeout(() => {
      runRegex();
    }, 200); // Debounce to improve performance
    return () => clearTimeout(timer);
  }, [pattern, text, runRegex]);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] py-16 px-4 selection:bg-indigo-500/30 font-sans">
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 rounded-full text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-6">
            <Terminal className="w-3.5 h-3.5" /> Dev Tools Pro
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
            Regex <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Lab</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
            Test and debug your regular expressions with real-time visual feedback.
          </p>
        </div>

        {/* Main Interface */}
        <div className="grid gap-6">
          <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white dark:border-zinc-800 overflow-hidden">
            
            {/* Input Controls */}
            <div className="p-8 space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-[0.2em] ml-1 flex items-center gap-2">
                  <Code2 className="w-3 h-3" /> Expression Pattern
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-indigo-500 transition-colors">
                    <span className="font-mono text-lg">/</span>
                  </div>
                  <input 
                    type="text" 
                    value={pattern} 
                    onChange={(e) => setPattern(e.target.value)} 
                    placeholder="Enter pattern (e.g. [a-z0-9]+)"
                    className="w-full pl-8 pr-12 py-4 bg-zinc-100 dark:bg-zinc-800 border-none rounded-2xl font-mono text-indigo-600 dark:text-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-indigo-500 transition-colors">
                    <span className="font-mono text-lg">/g</span>
                  </div>
                </div>
                {error && (
                  <div className="flex items-center gap-2 text-rose-500 text-xs font-bold mt-2 ml-1 animate-pulse">
                    <AlertCircle className="w-3.5 h-3.5" /> {error}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-[0.2em] ml-1 flex items-center gap-2">
                  <Search className="w-3 h-3" /> Test String
                </label>
                <textarea 
                  value={text} 
                  onChange={(e) => setText(e.target.value)} 
                  rows={5}
                  placeholder="Paste your content here to test against the regex..."
                  className="w-full p-5 bg-zinc-100 dark:bg-zinc-800 border-none rounded-[1.5rem] font-mono text-sm text-zinc-700 dark:text-zinc-300 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none resize-none"
                ></textarea>
              </div>
            </div>

            {/* Results Preview */}
            <div className="p-8 md:p-10 bg-zinc-50/50 dark:bg-zinc-800/20 border-t border-zinc-100 dark:border-zinc-800">
               <div className="flex items-center gap-3 mb-6">
                  <Wand2 className="w-4 h-4 text-indigo-500" />
                  <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.3em]">Live Match Preview</span>
               </div>
               <div className="relative min-h-[120px] p-6 bg-white dark:bg-zinc-950 rounded-[1.5rem] border border-zinc-100 dark:border-zinc-800 shadow-inner">
                  <p 
                    className="text-zinc-800 dark:text-zinc-200 font-mono text-sm leading-relaxed whitespace-pre-wrap break-all" 
                    dangerouslySetInnerHTML={{ __html: highlightedText }}
                  ></p>
               </div>
            </div>
          </div>

          {/* Short Description Section (Sorted/Clean) */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "Real-time", desc: "Instantly see matches as you type your pattern.", icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
              { title: "Global Flags", desc: "By default, searching is global across the entire text.", icon: <Info className="w-4 h-4 text-indigo-400" /> },
              { title: "Safe Testing", desc: "Pattern errors are caught and reported gracefully.", icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> }
            ].map((item, idx) => (
              <div key={idx} className="p-5 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  {item.icon}
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-zinc-800 dark:text-zinc-200">{item.title}</h4>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
              <Code2 className="w-3 h-3" /> ECMAScript Standard Regex Engine
            </p>
        </div>
      </div>
    </div>
  );
}

// Simple internal icon for ShieldCheck
const ShieldCheck = ({className}) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
);

export default RegexTesterPage;