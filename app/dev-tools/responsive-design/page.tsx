'use client';

import { useState, useEffect } from 'react';
import { Monitor, Tablet, Smartphone, Maximize, Globe, Layout, Laptop, Info, AlertCircle } from 'lucide-react';

const ResponsiveDesignCheckerPage = () => {
  const [url, setUrl] = useState('https://example.com');
  const [device, setDevice] = useState('100%');
  const [iframeSrc, setIframeSrc] = useState('https://example.com');
  const [isLoading, setIsLoading] = useState(false);

  const loadSite = () => {
    if (!url) return;
    setIsLoading(true);
    const validUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
    setIframeSrc(validUrl);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const devices = [
    { name: 'Mobile', width: '375px', icon: <Smartphone className="w-4 h-4" /> },
    { name: 'Tablet', width: '768px', icon: <Tablet className="w-4 h-4" /> },
    { name: 'Laptop', width: '1024px', icon: <Laptop className="w-4 h-4" /> },
    { name: 'Desktop', width: '100%', icon: <Monitor className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] py-12 px-4 selection:bg-indigo-500/30 font-sans">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 rounded-full text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4">
            <Layout className="w-3.5 h-3.5" /> UI/UX Studio
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
            Responsive <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-serif italic font-medium">Viewport</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium max-w-lg mx-auto">
            Experience how your web applications perform across different virtual hardware environments.
          </p>
        </div>

        {/* Top Control Bar */}
        <div className="bg-white dark:bg-zinc-900/80 backdrop-blur-xl p-4 rounded-[2rem] shadow-xl border border-white dark:border-zinc-800 mb-8 sticky top-4 z-50">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            
            {/* URL Input Group */}
            <div className="flex-1 flex items-center w-full bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-2xl group focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
              <div className="pl-4 text-zinc-400">
                <Globe className="w-4 h-4" />
              </div>
              <input 
                type="text" 
                value={url} 
                onChange={(e) => setUrl(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && loadSite()}
                placeholder="Enter domain (e.g. vercel.com)"
                className="flex-grow bg-transparent border-none p-2.5 text-sm font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none"
              />
              <button 
                onClick={loadSite}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
              >
                Go
              </button>
            </div>

            {/* Device Switcher */}
            <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-x-auto no-scrollbar max-w-full">
              {devices.map((d) => (
                <button 
                  key={d.name}
                  onClick={() => setDevice(d.width)}
                  className={`flex items-center gap-2 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 whitespace-nowrap ${
                    device === d.width 
                    ? 'bg-white dark:bg-zinc-700 text-indigo-600 dark:text-white shadow-md' 
                    : 'text-zinc-500 hover:text-zinc-700'
                  }`}
                >
                  {d.icon} {d.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Browser Simulator Area */}
        <div className="relative flex justify-center pb-20 overflow-hidden">
          <div 
            style={{ width: device }} 
            className={`transition-all duration-500 ease-in-out relative ${
              device !== '100%' 
                ? 'border-[12px] border-zinc-900 dark:border-zinc-800 rounded-[3rem] shadow-2xl' 
                : 'w-full rounded-2xl overflow-hidden'
            }`}
          >
            {/* Device Camera/Speaker Notch Overlay (only for Mobile) */}
            {device === '375px' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-b-2xl z-20 flex justify-center items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                 <div className="w-8 h-1 rounded-full bg-zinc-800"></div>
              </div>
            )}

            {/* Browser Header (Optional for full view) */}
            <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-700">
               <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
               </div>
               <div className="flex-1 text-center">
                  <span className="text-[10px] font-bold text-zinc-400 truncate max-w-[200px] inline-block">
                    {iframeSrc}
                  </span>
               </div>
            </div>

            {/* Iframe Viewport */}
            <div className="bg-white relative min-h-[700px]">
              {isLoading && (
                <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-40 flex flex-col items-center justify-center">
                  <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest animate-pulse">Establishing Connection...</p>
                </div>
              )}
              <iframe 
                src={iframeSrc} 
                className="w-full h-[750px] border-none bg-white transition-opacity duration-700"
                onLoad={() => setIsLoading(false)}
              ></iframe>
            </div>
          </div>
        </div>

        {/* Description & Usage Guide */}
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6 mt-12">
            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/10 rounded-[2rem] border border-indigo-100 dark:border-indigo-900/30">
                <div className="flex items-center gap-3 mb-3 text-indigo-600 dark:text-indigo-400">
                    <Info className="w-5 h-5" />
                    <h3 className="text-xs font-black uppercase tracking-widest">How to test</h3>
                </div>
                <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-2 font-medium leading-relaxed">
                    <li>• Enter a secure URL (HTTPS) for best results.</li>
                    <li>• Switch between hardware frames to check breakpoints.</li>
                    <li>• Use Chrome/Edge DevTools for deep debugging.</li>
                </ul>
            </div>
            
            <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-[2rem] border border-amber-100 dark:border-amber-900/30">
                <div className="flex items-center gap-3 mb-3 text-amber-600 dark:text-amber-400">
                    <AlertCircle className="w-5 h-5" />
                    <h3 className="text-xs font-black uppercase tracking-widest">Security Note</h3>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                   Some enterprise sites (like Google/Amazon) prevent being loaded inside iframes for security. This tool works best for your own development projects.
                </p>
            </div>
        </div>

        {/* Footer Link */}
        <div className="mt-20 text-center">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.4em] flex items-center justify-center gap-2">
              Hardware-Accelerated Rendering • 2026 Edition
            </p>
        </div>
      </div>
    </div>
  );
}

export default ResponsiveDesignCheckerPage;