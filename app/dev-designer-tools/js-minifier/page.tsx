"use client";

import React, { useState } from 'react';
import { 
  Copy, Trash2, Zap, Check, Code2, 
  Settings2, Info, Scissors, Sparkles 
} from 'lucide-react';

const JSMinifier: React.FC = () => {
  const [inputJS, setInputJS] = useState<string>('');
  const [minifiedJS, setMinifiedJS] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [removeLogs, setRemoveLogs] = useState<boolean>(true);

  const handleMinify = () => {
    if (!inputJS) return;
    let result = inputJS;
    
    result = result.replace(/\/\/.*/g, ''); // Remove single line comments
    result = result.replace(/\/\*[\s\S]*?\*\//g, ''); // Remove multi-line comments
    
    if (removeLogs) {
      result = result.replace(/console\.log\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\);?/g, '');
    }

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f1a] p-4 md:p-12 transition-colors duration-300 font-sans">
      
      {/* Header Section */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <div className="w-16 h-16 bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20">
          <Code2 size={32} strokeWidth={2.5} />
        </div>
        <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">
          JS <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Minifier</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-lg mx-auto text-sm font-medium">
          Premium JavaScript compression with Indigo & Purple aesthetics. 
        </p>
      </div>

      <div className="max-w-6xl mx-auto bg-white dark:bg-[#161b2c] rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Toolbar */}
        <div className="bg-indigo-50/30 dark:bg-[#0f1425] p-5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={removeLogs} 
                onChange={() => setRemoveLogs(!removeLogs)}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:bg-slate-800 dark:border-slate-700" 
              />
              <span className="text-[10px] font-black text-slate-500 group-hover:text-indigo-600 transition-colors uppercase tracking-widest">Strip Console Logs</span>
            </label>
            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700 hidden md:block" />
            <div className="flex items-center gap-1 text-[10px] font-black text-purple-500 uppercase tracking-widest">
              <Sparkles size={12} /> Turbo Mode On
            </div>
          </div>
          <button 
            onClick={() => { setInputJS(''); setMinifiedJS(''); }}
            className="text-[10px] font-black text-slate-400 hover:text-red-500 flex items-center gap-1 transition-all uppercase tracking-widest"
          >
            <Trash2 size={14} /> Reset Editor
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Input Area */}
          <div className="p-6 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
            <div className="flex justify-between mb-3 px-1 font-bold text-[10px] text-slate-400 uppercase tracking-widest">
              <span>Raw Code</span>
              <span className="text-indigo-500">{inputJS.length} chars</span>
            </div>
            <textarea
              value={inputJS}
              onChange={(e) => setInputJS(e.target.value)}
              placeholder="// Paste your JavaScript here..."
              className="w-full h-96 p-6 bg-slate-50 dark:bg-[#0b0f1a] rounded-2xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500/30 outline-none font-mono text-sm dark:text-slate-300 resize-none transition-all scrollbar-hide shadow-inner"
            />
          </div>

          {/* Output Area */}
          <div className="p-6 bg-indigo-50/10 dark:bg-[#0f1425]/50">
            <div className="flex justify-between mb-3 px-1 font-bold text-[10px] text-slate-400 uppercase tracking-widest">
              <span className="text-purple-500">Minified Code</span>
              <button 
                onClick={handleCopy}
                disabled={!minifiedJS}
                className={`flex items-center gap-1 transition-colors ${copied ? 'text-green-500' : 'text-slate-400 hover:text-indigo-500'}`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'COPIED' : 'COPY'}
              </button>
            </div>
            <textarea
              readOnly
              value={minifiedJS}
              placeholder="Compressing..."
              className="w-full h-96 p-6 bg-white dark:bg-[#161b2c] rounded-2xl border border-slate-200 dark:border-slate-800 font-mono text-sm text-indigo-700 dark:text-indigo-400 outline-none resize-none shadow-sm"
            />
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="p-8 bg-white dark:bg-[#161b2c] flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex gap-4">
            {minifiedJS && (
              <div className="flex items-center gap-3 bg-indigo-50 dark:bg-indigo-500/10 px-5 py-3 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 animate-in fade-in slide-in-from-left-4">
                <div className="text-indigo-600 dark:text-indigo-400 text-xl font-black italic">
                  -{Math.round(((inputJS.length - minifiedJS.length) / inputJS.length) * 100)}%
                </div>
                <div className="text-[9px] leading-tight text-indigo-700/60 dark:text-indigo-400/60 font-black uppercase tracking-widest">Efficiency<br/>Saved</div>
              </div>
            )}
          </div>

          <button 
            onClick={handleMinify}
            disabled={!inputJS}
            className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-14 py-4 rounded-2xl font-black shadow-xl shadow-indigo-500/30 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-3 tracking-tight"
          >
            <Zap size={20} fill="currentColor" /> MINIFY SCRIPT
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-4xl mx-auto mt-10 flex items-center justify-center gap-2 opacity-40 grayscale hover:grayscale-0 transition-all cursor-default">
         <Scissors size={14} />
         <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Built for Modern Developers</span>
      </div>
    </div>
  );
};

export default JSMinifier;