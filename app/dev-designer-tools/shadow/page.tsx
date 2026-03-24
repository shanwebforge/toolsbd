"use client";

import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Settings2, Hash, ChevronUp, ChevronDown } from 'lucide-react';

const ShadowGenerator: React.FC = () => {
  const [hOffset, setHOffset] = useState<number>(10);
  const [vOffset, setVOffset] = useState<number>(10);
  const [blur, setBlur] = useState<number>(20);
  const [spread, setSpread] = useState<number>(0);
  const [opacity, setOpacity] = useState<number>(0.2);
  const [shadowColor, setShadowColor] = useState<string>('#6366F1');
  const [inset, setInset] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const hexToRGBA = (hex: string, op: number) => {
    let r = 0, g = 0, b = 0;
    const cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      r = parseInt(cleanHex[0] + cleanHex[0], 16);
      g = parseInt(cleanHex[1] + cleanHex[1], 16);
      b = parseInt(cleanHex[2] + cleanHex[2], 16);
    } else {
      r = parseInt(cleanHex.substring(0, 2), 16);
      g = parseInt(cleanHex.substring(2, 4), 16);
      b = parseInt(cleanHex.substring(4, 6), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${op})`;
  };

  const shadowValue = `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${hexToRGBA(shadowColor, opacity)}`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(`box-shadow: ${shadowValue};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans transition-colors duration-300">
      
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row">
        
        {/* PREVIEW AREA - Sticky on Mobile & Desktop */}
        <div className="w-full lg:w-1/2 sticky top-0 z-40 p-4 lg:p-10 bg-slate-50/80 dark:bg-zinc-950/80 backdrop-blur-md lg:backdrop-blur-none">
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 lg:p-20 flex items-center justify-center border border-slate-200 dark:border-zinc-800 min-h-[180px] md:min-h-[250px] lg:min-h-[450px] shadow-sm relative overflow-hidden transition-all">
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div 
              style={{ boxShadow: shadowValue }}
              className="w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-[8px] lg:text-[10px] font-black uppercase tracking-widest transition-all z-10"
            >
              Preview
            </div>
          </div>
        </div>

        {/* CONTROLS AREA */}
        <div className="w-full lg:w-1/2 p-4 lg:p-10 space-y-6">
          
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 md:p-8 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-8">
            <div className="flex justify-between items-center border-b dark:border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-indigo-500" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-800 dark:text-zinc-200">Parameters</h3>
              </div>
              <button onClick={() => {setHOffset(10); setVOffset(10); setBlur(20); setSpread(0); setOpacity(0.2);}} className="text-slate-400 hover:text-indigo-600 transition-colors p-1">
                  <RefreshCw size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-y-8">
              <ResponsiveSlider label="Horizontal Offset" value={hOffset} min={-100} max={100} onChange={setHOffset} />
              <ResponsiveSlider label="Vertical Offset" value={vOffset} min={-100} max={100} onChange={setVOffset} />
              <ResponsiveSlider label="Blur Radius" value={blur} min={0} max={150} onChange={setBlur} />
              <ResponsiveSlider label="Spread Radius" value={spread} min={-50} max={100} onChange={setSpread} />
              <ResponsiveSlider label="Shadow Opacity" value={opacity} min={0} max={1} step={0.01} onChange={setOpacity} />
              
              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Shadow Color</label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-grow">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                    <input 
                      type="text" 
                      value={shadowColor.replace('#', '')} 
                      onChange={(e) => setShadowColor('#' + e.target.value)}
                      className="w-full py-2 pl-8 pr-3 bg-slate-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-md text-xs font-mono font-bold uppercase outline-none focus:border-indigo-500 text-slate-700 dark:text-zinc-300"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-lg border dark:border-zinc-800 overflow-hidden relative shrink-0">
                    <input 
                      type="color" 
                      value={shadowColor} 
                      onChange={(e) => setShadowColor(e.target.value.toUpperCase())} 
                      className="absolute inset-0 scale-150 cursor-pointer" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <button 
                onClick={() => setInset(!inset)}
                className={`w-full py-4 rounded-lg border-2 font-black text-[10px] uppercase tracking-[0.2em] transition-all ${
                    inset 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                    : 'bg-transparent border-slate-100 dark:border-zinc-800 text-slate-400 hover:border-indigo-500/50'
                }`}
            >
                {inset ? 'Inset Mode Active' : 'Switch to Inset Shadow'}
            </button>
          </div>

          {/* CODE OUTPUT */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-slate-200 dark:border-zinc-800 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
              <span>CSS Output</span>
              <button 
                onClick={handleCopy} 
                className={`flex items-center gap-2 px-6 py-2 rounded-lg text-[10px] transition-all ${copied ? 'bg-green-500 text-white' : 'bg-zinc-800 dark:bg-zinc-700 text-white hover:bg-indigo-600'}`}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'COPIED' : 'COPY CODE'}
              </button>
            </div>
            <div className="bg-slate-900 rounded-lg p-5 font-mono text-[10px] md:text-xs text-indigo-300 break-all border border-slate-800 shadow-inner">
               box-shadow: {shadowValue};
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const ResponsiveSlider = ({ label, value, min, max, step = 1, onChange }: any) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
      
      {/* Precision Arrows Control */}
      <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-zinc-950 p-1 rounded-md border dark:border-zinc-800">
          <button 
            onClick={() => onChange(Number((value - step).toFixed(2)) >= min ? Number((value - step).toFixed(2)) : value)}
            className="p-1 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded transition-colors text-slate-400 hover:text-indigo-600"
          >
            <ChevronDown size={14} />
          </button>
          <span className="w-9 text-center text-indigo-600 dark:text-indigo-400 text-[11px] font-black tracking-tighter">{value}</span>
          <button 
            onClick={() => onChange(Number((value + step).toFixed(2)) <= max ? Number((value + step).toFixed(2)) : value)}
            className="p-1 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded transition-colors text-slate-400 hover:text-indigo-600"
          >
            <ChevronUp size={14} />
          </button>
      </div>
    </div>
    <input 
      type="range" min={min} max={max} step={step} value={value} 
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1.5 bg-slate-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
    />
  </div>
);

export default ShadowGenerator;