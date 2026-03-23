"use client";

import React, { useState } from 'react';
import { Copy, Trash2, Zap, Check, Scissors } from 'lucide-react';

const CSSMinifier: React.FC = () => {
  const [inputCSS, setInputCSS] = useState<string>('');
  const [minifiedCSS, setMinifiedCSS] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Logic to Minify CSS
  const handleMinify = () => {
    if (!inputCSS) return;
    
    const minified = inputCSS
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ')             // Replace multiple spaces with single space
      .replace(/\s*([{};:>+])\s*/g, '$1') // Remove spaces around symbols
      .replace(/;}/g, '}')              // Remove last semicolon before closing brace
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f1a] p-6 md:p-12 flex flex-col items-center font-sans transition-colors duration-300">
      
      {/* Header Area */}
      <div className="max-w-4xl w-full text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-500/10 rounded-2xl text-indigo-600 dark:text-indigo-400 mb-4">
          <Scissors size={32} />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight">
          CSS <span className="text-indigo-600">Minifier</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">
          Compress your CSS code by removing unnecessary whitespace and comments.
        </p>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Section */}
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between items-center px-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Raw CSS</label>
            <button onClick={handleClear} className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 text-xs font-bold">
              <Trash2 size={14} /> CLEAR
            </button>
          </div>
          <textarea
            value={inputCSS}
            onChange={(e) => setInputCSS(e.target.value)}
            placeholder="Paste your CSS here..."
            className="w-full h-80 p-5 rounded-2xl bg-white dark:bg-[#161b2c] border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm shadow-sm dark:text-slate-200"
          />
        </div>

        {/* Output Section */}
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between items-center px-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Minified Result</label>
            <button 
              onClick={handleCopy} 
              disabled={!minifiedCSS}
              className={`flex items-center gap-1 text-xs font-bold transition-colors ${copied ? 'text-green-500' : 'text-indigo-500 hover:text-indigo-600 disabled:opacity-50'}`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'COPIED' : 'COPY'}
            </button>
          </div>
          <textarea
            readOnly
            value={minifiedCSS}
            placeholder="Minified output will appear here..."
            className="w-full h-80 p-5 rounded-2xl bg-slate-100 dark:bg-[#0f1425] border border-slate-200 dark:border-slate-800 font-mono text-sm outline-none cursor-default dark:text-indigo-300"
          />
        </div>

      </div>

      {/* Action Button */}
      <div className="mt-8">
        <button 
          onClick={handleMinify}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-500/20 active:scale-95 transition-all flex items-center gap-3"
        >
          <Zap size={20} fill="currentColor" /> MINIFY CSS
        </button>
      </div>

      {/* Stats Area (Optional) */}
      {minifiedCSS && (
        <div className="mt-8 bg-white dark:bg-[#161b2c] border border-slate-200 dark:border-slate-800 px-6 py-3 rounded-full flex gap-6 text-xs font-bold animate-in fade-in slide-in-from-bottom-2">
          <div className="text-slate-500">Original: <span className="text-slate-800 dark:text-white">{inputCSS.length} bytes</span></div>
          <div className="text-slate-500">Minified: <span className="text-indigo-600">{minifiedCSS.length} bytes</span></div>
          <div className="text-green-500">Saved: {Math.round(((inputCSS.length - minifiedCSS.length) / inputCSS.length) * 100)}%</div>
        </div>
      )}

    </div>
  );
};

export default CSSMinifier;