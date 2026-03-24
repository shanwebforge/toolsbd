"use client";

import React, { useState } from 'react';
import { Copy, Trash2, Zap, Check, Scissors, FileCode, Info, Sparkles } from 'lucide-react';

const CSSMinifier: React.FC = () => {
  const [inputCSS, setInputCSS] = useState<string>('');
  const [minifiedCSS, setMinifiedCSS] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleMinify = () => {
    if (!inputCSS) return;
    
    const minified = inputCSS
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ')             // Replace multiple spaces with single space
      .replace(/\s*([{};:>+])\s*/g, '$1') // Remove spaces around symbols
      .replace(/;}/g, '}')               // Remove last semicolon before closing brace
      .trim();
    
    setMinifiedCSS(minified);
  };

  const handleCopy = () => {
    if (!minifiedCSS) return;
    navigator.clipboard.writeText(minifiedCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputCSS('');
    setMinifiedCSS('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section - Purple Primary */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-lg shadow-lg shadow-purple-500/20 mb-4">
            <Scissors className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight uppercase">CSS Architect Minifier</h1>
          <p className="text-slate-400 text-xs font-medium mt-1">Compress your styles by removing unnecessary whitespace and comments.</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-slate-200 dark:border-zinc-800 overflow-hidden mb-6">
          
          {/* Toolbar */}
          <div className="p-4 bg-slate-50/50 dark:bg-zinc-800/50 border-b border-slate-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={handleMinify}
                className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all active:scale-95 shadow-md shadow-purple-500/10"
              >
                <Zap className="w-3.5 h-3.5 fill-current" /> Minify CSS
              </button>
              <button 
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-red-50 hover:text-red-500 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </div>

            {minifiedCSS && (
               <div className="flex items-center gap-4 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 rounded-lg">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">
                    Saved: {Math.round(((inputCSS.length - minifiedCSS.length) / inputCSS.length) * 100)}% Space
                  </span>
               </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Input Pane */}
            <div className="p-5 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-2 mb-3 text-slate-400">
                <FileCode className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Raw Stylesheet</span>
              </div>
              <textarea 
                value={inputCSS} 
                onChange={(e) => setInputCSS(e.target.value)} 
                placeholder="/* Paste your CSS here */
.header {
  display: flex;
  color: white;
}"
                className="w-full h-[350px] p-4 font-mono text-sm bg-slate-50 dark:bg-zinc-950/50 border border-slate-200 dark:border-zinc-800 rounded-lg resize-none outline-none focus:border-purple-500 text-slate-700 dark:text-zinc-300 transition-colors"
              />
            </div>

            {/* Output Pane */}
            <div className="p-5 bg-slate-50/20 dark:bg-black/10 relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-slate-400">
                  <Zap className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Minified Result</span>
                </div>
                {minifiedCSS && (
                  <button 
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${copied ? 'text-emerald-500' : 'text-indigo-600 hover:text-indigo-700'}`}
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied' : 'Copy CSS'}
                  </button>
                )}
              </div>
              
              <div className="w-full h-[350px] bg-white dark:bg-zinc-950 rounded-lg border border-slate-200 dark:border-zinc-800 overflow-hidden relative shadow-inner">
                {minifiedCSS ? (
                  <pre className="w-full h-full p-5 font-mono text-xs text-indigo-600 dark:text-indigo-400 overflow-auto whitespace-pre-wrap break-all">
                    {minifiedCSS}
                  </pre>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 dark:text-zinc-700">
                    <FileCode className="w-10 h-10 mb-2 opacity-20" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Waiting for Input</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Info Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-slate-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 mb-3 text-purple-600">
              <Sparkles className="w-4 h-4" />
              <h3 className="font-bold text-sm uppercase tracking-tight">Compression Logic</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              Our minifier removes comments, line breaks, and redundant spaces while preserving the structural integrity of your selectors. This reduces file size and speeds up browser rendering.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-slate-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 mb-3 text-indigo-600">
              <Info className="w-4 h-4" />
              <h3 className="font-bold text-sm uppercase tracking-tight">Performance Tip</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              Minifying CSS is a crucial step for production builds. It helps decrease the Critical Rendering Path time, leading to a better Google Lighthouse score and user experience.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CSS Optimization Engine &copy; 2026</p>
        </div>

      </div>
    </div>
  );
};

export default CSSMinifier;