'use client';

import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Eye, 
  Trash2, 
  Copy, 
  Monitor, 
  Smartphone,
  CheckCircle2,
  Layers,
  Zap,
  MousePointer2,
  LayoutTemplate,
  Globe
} from 'lucide-react';

export default function HTMLLivePreviewer() {
  const [htmlCode, setHtmlCode] = useState<string>('<div style="padding: 40px; text-align: center; background: linear-gradient(135deg, #7c3aed, #4f46e5); color: white; border-radius: 24px; font-family: sans-serif; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);">\n  <h1 style="margin: 0; font-size: 2.5rem;">Hello ToolxBD!</h1>\n  <p style="opacity: 0.9; margin-top: 10px;">Paste your HTML/CSS and see the magic.</p>\n</div>');
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setHtmlCode('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-4 md:p-8 font-sans transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-600 rounded-xl text-white shadow-lg shadow-purple-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-800 dark:text-white leading-none uppercase tracking-tight">HTML Previewer</h1>
              <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">Live Code Editor by ToolxBD</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'desktop' ? 'bg-purple-100 text-purple-600 dark:bg-purple-500/10' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800'}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'mobile' ? 'bg-purple-100 text-purple-600 dark:bg-purple-500/10' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800'}`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-slate-200 dark:bg-zinc-800 mx-2" />
            <button onClick={handleCopy} title="Copy Code" className="p-2 text-slate-500 hover:text-purple-600 transition-colors">
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
            <button onClick={handleReset} title="Clear All" className="p-2 text-slate-500 hover:text-red-500 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Editor & Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-250px)] min-h-[500px]">
          
          {/* Editor Side */}
          <div className="flex flex-col bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-sm">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-zinc-800/50 border-b border-slate-200 dark:border-zinc-800 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <Code2 className="w-3.5 h-3.5" /> Source Code
            </div>
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              placeholder="Paste your HTML code here..."
              className="flex-1 w-full p-5 font-mono text-sm bg-transparent outline-none resize-none text-slate-700 dark:text-zinc-300 placeholder:text-slate-300 dark:placeholder:text-zinc-700"
              spellCheck="false"
            />
          </div>

          {/* Preview Side */}
          <div className="flex flex-col bg-slate-100 dark:bg-zinc-900/50 rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-inner relative">
            <div className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 text-[10px] font-black text-slate-400 uppercase tracking-widest relative z-20">
              <Eye className="w-3.5 h-3.5" /> Visual Preview
            </div>
            <div className="flex-1 overflow-auto p-4 flex justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px]">
              <div 
                className={`bg-white shadow-2xl transition-all duration-500 overflow-hidden ${
                  viewMode === 'mobile' ? 'w-[360px] h-[640px] rounded-[40px] border-[12px] border-slate-900 dark:border-zinc-800' : 'w-full h-full rounded-xl'
                }`}
              >
                <iframe
                  title="Live Preview"
                  srcDoc={htmlCode}
                  className="w-full h-full border-none"
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- COMPACT GUIDELINE FOOTER --- */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 shadow-sm overflow-hidden relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            
            <div className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors group">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-blue-100 dark:bg-blue-500/10 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-wider">Fast Edit</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Bame code likhun, dane auto output dekhun.</p>
              </div>
            </div>

            <div className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors group">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-purple-100 dark:bg-purple-500/10 text-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                <LayoutTemplate className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-wider">Responsive</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Desktop o Mobile mode toggle kore check korun.</p>
              </div>
            </div>

            <div className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors group">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 rounded-lg group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-wider">Assets</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">CDN link (Tailwind/Fonts) head section-e add korun.</p>
              </div>
            </div>

            <div className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors group">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-amber-100 dark:bg-amber-500/10 text-amber-600 rounded-lg group-hover:scale-110 transition-transform">
                <MousePointer2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-wider">Safe Sandbox</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Iframe sandbox use kora tai code ekdom secure thakbe.</p>
              </div>
            </div>

          </div>
          
          
        </div>

      </div>
    </div>
  );
}