"use client";

import React, { useState } from 'react';
import { 
  Copy, Trash2, Zap, Check, Code2, 
  Settings2, Info, Scissors, Sparkles, FileCode, ShieldCheck 
} from 'lucide-react';

const JSMinifier: React.FC = () => {
  const [inputJS, setInputJS] = useState<string>('');
  const [minifiedJS, setMinifiedJS] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [removeLogs, setRemoveLogs] = useState<boolean>(true);

  const handleMinify = () => {
    if (!inputJS) return;
    let result = inputJS;
    
    // Remove comments
    result = result.replace(/\/\/.*/g, ''); 
    result = result.replace(/\/\*[\s\S]*?\*\//g, ''); 
    
    // Optional: Strip console logs
    if (removeLogs) {
      result = result.replace(/console\.log\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\);?/g, '');
    }

    // Minification logic
    result = result
      .replace(/\s+/g, ' ')
      .replace(/\s*([=+\-*/%&|^!<>?:;,.{}()\[\]])\s*/g, '$1')
      .trim();
    
    setMinifiedJS(result);
  };

  const handleCopy = () => {
    if (!minifiedJS) return;
    navigator.clipboard.writeText(minifiedJS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputJS('');
    setMinifiedJS('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section - Purple Primary */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-lg shadow-lg shadow-purple-500/20 mb-4">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight uppercase">JS Architect Minifier</h1>
          <p className="text-slate-400 text-xs font-medium mt-1">Optimize your JavaScript by stripping comments, logs, and unnecessary whitespace.</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-slate-200 dark:border-zinc-800 overflow-hidden mb-6">
          
          {/* Toolbar */}
          <div className="p-4 bg-slate-50/50 dark:bg-zinc-800/50 border-b border-slate-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={handleMinify}
                className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all active:scale-95 shadow-md shadow-purple-500/10"
              >
                <Zap className="w-3.5 h-3.5 fill-current" /> Minify JS
              </button>
              
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={removeLogs} 
                  onChange={() => setRemoveLogs(!removeLogs)}
                  className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500 dark:bg-zinc-800 dark:border-zinc-700" 
                />
                <span className="text-[10px] font-bold text-slate-500 group-hover:text-purple-600 transition-colors uppercase tracking-widest">Strip Logs</span>
              </label>

              <button 
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-red-50 hover:text-red-500 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </div>

            {minifiedJS && (
               <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/20 rounded-lg">
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  <span className="text-[10px] font-bold text-purple-600 uppercase">
                    -{Math.round(((inputJS.length - minifiedJS.length) / inputJS.length) * 100)}% Optimized
                  </span>
               </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Input Pane */}
            <div className="p-5 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-2 mb-3 text-slate-400">
                <FileCode className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">Source Script</span>
              </div>
              <textarea 
                value={inputJS} 
                onChange={(e) => setInputJS(e.target.value)} 
                placeholder="// Paste JS here...
function hello() {
  console.log('Hello World');
}"
                className="w-full h-[380px] p-4 font-mono text-sm bg-slate-50 dark:bg-zinc-950/50 border border-slate-200 dark:border-zinc-800 rounded-lg resize-none outline-none focus:border-purple-500 text-slate-700 dark:text-zinc-300 transition-colors"
              />
            </div>

            {/* Output Pane */}
            <div className="p-5 bg-slate-50/20 dark:bg-black/10 relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-purple-500">Minified Output</span>
                </div>
                {minifiedJS && (
                  <button 
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${copied ? 'text-emerald-500' : 'text-indigo-600 hover:text-indigo-700'}`}
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied' : 'Copy JS'}
                  </button>
                )}
              </div>
              
              <div className="w-full h-[380px] bg-white dark:bg-zinc-950 rounded-lg border border-slate-200 dark:border-zinc-800 overflow-hidden relative shadow-inner">
                {minifiedJS ? (
                  <pre className="w-full h-full p-5 font-mono text-xs text-indigo-600 dark:text-indigo-400 overflow-auto whitespace-pre-wrap break-all leading-relaxed">
                    {minifiedJS}
                  </pre>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 dark:text-zinc-700">
                    <Code2 className="w-10 h-10 mb-2 opacity-20" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Awaiting JS Data</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-slate-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 mb-3 text-purple-600">
              <Settings2 className="w-4 h-4" />
              <h3 className="font-bold text-sm uppercase tracking-tight">Advanced Stripping</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              Enable "Strip Logs" to automatically remove console.log statements from your production code. This improves both security and performance by reducing console overhead.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-slate-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 mb-3 text-indigo-600">
              <Sparkles className="w-4 h-4" />
              <h3 className="font-bold text-sm uppercase tracking-tight">Turbo Compression</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              Uses high-efficiency regex patterns to eliminate dead weight while ensuring your logic stays intact. Ideal for fast-loading client-side scripts.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">JS Structural Engine &copy; 2026 • Optimized for Frontend</p>
        </div>

      </div>
    </div>
  );
};

export default JSMinifier;