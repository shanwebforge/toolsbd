"use client";

import React, { useState, useRef } from 'react';
import { 
  Download, Star, Heart, Cloud, Zap, Shield, Moon, Type, 
  LucideIcon, Settings, Palette, Layout, Bell, Check, 
  Search, User, Mail, Camera, Ghost, Flame, Rocket, 
  Target, Globe, Music, Coffee, Sparkles
} from 'lucide-react';
import { toPng, toSvg } from 'html-to-image';

type IconMap = { [key: string]: LucideIcon };

const IconGenerator: React.FC = () => {
  const iconRef = useRef<HTMLDivElement>(null);
  
  // --- Background States ---
  const [bgType, setBgType] = useState<'solid' | 'gradient'>('gradient');
  const [bgPrimary, setBgPrimary] = useState('#6366f1');
  const [bgSecondary, setBgSecondary] = useState('#a855f7');

  // --- Icon States ---
  const [iconType, setIconType] = useState<'solid' | 'gradient'>('solid');
  const [iconPrimary, setIconPrimary] = useState('#ffffff');
  const [iconSecondary, setIconSecondary] = useState('#fde047');

  // --- General States ---
  const [selectedIconName, setSelectedIconName] = useState<string>('Zap');
  const [rounded, setRounded] = useState<string>('24px');
  const [iconSize, setIconSize] = useState<number>(80);

  const icons: IconMap = { 
    Zap, Star, Heart, Cloud, Shield, Moon, Type, Bell, 
    Check, Search, User, Mail, Camera, Ghost, Flame, 
    Rocket, Target, Globe, Music, Coffee 
  };

  const palettes = [
    { p: '#6366f1', s: '#a855f7' },
    { p: '#f43f5e', s: '#fb923c' },
    { p: '#06b6d4', s: '#3b82f6' },
    { p: '#10b981', s: '#3b82f6' },
    { p: '#000000', s: '#475569' },
  ];

  const SelectedIcon = icons[selectedIconName];

  const exportIcon = async (format: 'png' | 'svg') => {
    if (!iconRef.current) return;
    const options = { cacheBust: true, pixelRatio: 3 };
    const dataUrl = format === 'png' ? await toPng(iconRef.current, options) : await toSvg(iconRef.current, options);
    const link = document.createElement('a');
    link.download = `icon-${Date.now()}.${format}`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f1a] text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 md:p-10 font-sans transition-colors duration-300">
      
      <div className="max-w-6xl w-full bg-white dark:bg-[#161b2c] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-200 dark:border-slate-800">
        
        {/* PREVIEW AREA */}
        <div className="flex-[1.1] bg-slate-100 dark:bg-[#0f1425] p-10 flex flex-col items-center justify-center relative border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
          <div 
            ref={iconRef}
            style={{ 
              background: bgType === 'gradient' ? `linear-gradient(135deg, ${bgPrimary}, ${bgSecondary})` : bgPrimary,
              borderRadius: rounded,
              width: '240px',
              height: '240px'
            }} 
            className="flex items-center justify-center shadow-2xl relative overflow-hidden"
          >
            {/* SVG Filter for Icon Gradient */}
            <svg width="0" height="0" className="absolute">
              <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={iconPrimary} />
                <stop offset="100%" stopColor={iconSecondary} />
              </linearGradient>
            </svg>

            <SelectedIcon 
              size={iconSize} 
              style={{ stroke: iconType === 'gradient' ? 'url(#icon-gradient)' : iconPrimary }} 
              className="drop-shadow-lg transition-all duration-300" 
            />
          </div>

          <div className="mt-10 flex gap-4 w-full max-w-xs">
            <button onClick={() => exportIcon('png')} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-indigo-500/20 text-sm">PNG</button>
            <button onClick={() => exportIcon('svg')} className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-3 rounded-xl font-bold transition-all active:scale-95 text-sm">SVG</button>
          </div>
        </div>

        {/* CONTROLS AREA */}
        <div className="flex-1 p-6 lg:p-10 space-y-8 h-[85vh] overflow-y-auto custom-scrollbar">
          
          {/* 1. SYMBOLS */}
          <section>
            <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
              <Settings size={14} /> 1. Select Symbol
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {Object.keys(icons).map((name) => (
                <button key={name} onClick={() => setSelectedIconName(name)}
                  className={`p-3 rounded-xl border-2 transition-all flex items-center justify-center ${selectedIconName === name ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600' : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-400'}`}>
                  {React.createElement(icons[name], { size: 18 })}
                </button>
              ))}
            </div>
          </section>

          {/* 2. BACKGROUND CONFIG */}
          <section className="space-y-4 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-indigo-500 flex items-center gap-2"><Palette size={14} /> Background Color</h3>
              <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 border dark:border-slate-700">
                <button onClick={() => setBgType('solid')} className={`px-3 py-1 text-[10px] font-bold rounded-md ${bgType === 'solid' ? 'bg-indigo-500 text-white' : 'text-slate-400'}`}>Solid</button>
                <button onClick={() => setBgType('gradient')} className={`px-3 py-1 text-[10px] font-bold rounded-md ${bgType === 'gradient' ? 'bg-indigo-500 text-white' : 'text-slate-400'}`}>Gradient</button>
              </div>
            </div>

            <div className="flex gap-2 mb-2">
              {palettes.map((p, i) => (
                <button key={i} onClick={() => { setBgPrimary(p.p); setBgSecondary(p.s); }} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-700" style={{ background: `linear-gradient(135deg, ${p.p}, ${p.s})` }} />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-xl border dark:border-slate-700">
                <input type="color" value={bgPrimary} onChange={(e) => setBgPrimary(e.target.value)} className="w-6 h-6 rounded cursor-pointer bg-transparent border-none" />
                <input type="text" value={bgPrimary} onChange={(e) => setBgPrimary(e.target.value)} className="bg-transparent text-[10px] font-mono w-full outline-none uppercase" />
              </div>
              {bgType === 'gradient' && (
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-xl border dark:border-slate-700 animate-in fade-in zoom-in-95">
                  <input type="color" value={bgSecondary} onChange={(e) => setBgSecondary(e.target.value)} className="w-6 h-6 rounded cursor-pointer bg-transparent border-none" />
                  <input type="text" value={bgSecondary} onChange={(e) => setBgSecondary(e.target.value)} className="bg-transparent text-[10px] font-mono w-full outline-none uppercase" />
                </div>
              )}
            </div>
          </section>

          {/* 3. ICON COLOR CONFIG */}
          <section className="space-y-4 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-pink-500 flex items-center gap-2"><Sparkles size={14} /> Icon Color</h3>
              <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 border dark:border-slate-700">
                <button onClick={() => setIconType('solid')} className={`px-3 py-1 text-[10px] font-bold rounded-md ${iconType === 'solid' ? 'bg-pink-500 text-white' : 'text-slate-400'}`}>Solid</button>
                <button onClick={() => setIconType('gradient')} className={`px-3 py-1 text-[10px] font-bold rounded-md ${iconType === 'gradient' ? 'bg-pink-500 text-white' : 'text-slate-400'}`}>Gradient</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-xl border dark:border-slate-700">
                <input type="color" value={iconPrimary} onChange={(e) => setIconPrimary(e.target.value)} className="w-6 h-6 rounded cursor-pointer bg-transparent border-none" />
                <input type="text" value={iconPrimary} onChange={(e) => setIconPrimary(e.target.value)} className="bg-transparent text-[10px] font-mono w-full outline-none uppercase" />
              </div>
              {iconType === 'gradient' && (
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-xl border dark:border-slate-700 animate-in fade-in zoom-in-95">
                  <input type="color" value={iconSecondary} onChange={(e) => setIconSecondary(e.target.value)} className="w-6 h-6 rounded cursor-pointer bg-transparent border-none" />
                  <input type="text" value={iconSecondary} onChange={(e) => setIconSecondary(e.target.value)} className="bg-transparent text-[10px] font-mono w-full outline-none uppercase" />
                </div>
              )}
            </div>
          </section>

          {/* 4. SHAPES */}
          <section>
            <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><Layout size={14} /> 4. Shape Type</h3>
            <div className="grid grid-cols-4 gap-2">
              {[{ n: 'Square', v: '0px' }, { n: 'Rounded', v: '24px' }, { n: 'Squircle', v: '60px' }, { n: 'Circle', v: '9999px' }].map((s) => (
                <button key={s.n} onClick={() => setRounded(s.v)} className={`py-2 text-[10px] font-bold rounded-lg border-2 transition-all ${rounded === s.v ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-100 dark:border-slate-800 text-slate-400'}`}>{s.n}</button>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default IconGenerator;