"use client";

import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Move } from 'lucide-react';

const ShadowGenerator: React.FC = () => {
  const [hOffset, setHOffset] = useState<number>(10);
  const [vOffset, setVOffset] = useState<number>(10);
  const [blur, setBlur] = useState<number>(20);
  const [spread, setSpread] = useState<number>(0);
  const [opacity, setOpacity] = useState<number>(0.2);
  const [shadowColor, setShadowColor] = useState<string>('#6366f1');
  const [inset, setInset] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const shadowValue = `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${shadowColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(`box-shadow: ${shadowValue};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f1a] p-3 md:p-10 transition-all font-sans">
      
      {/* Header - Scaled for Mobile */}
      <div className="max-w-5xl mx-auto text-center mb-6 md:mb-10">
        <h1 className="text-2xl md:text-4xl font-black dark:text-white tracking-tight">
          Shadow <span className="text-indigo-600">Architect</span>
        </h1>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-4 md:gap-8">
        
        {/* PREVIEW BOX - Responsive Height */}
        <div className="w-full lg:flex-[0.8] bg-white dark:bg-[#161b2c] rounded-3xl p-8 md:p-20 flex items-center justify-center border border-slate-200 dark:border-slate-800 min-h-[250px] md:min-h-[400px] sticky top-4 lg:top-10 z-10 shadow-sm">
          <div 
            style={{ boxShadow: shadowValue }}
            className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-xs md:text-sm font-bold italic transition-all"
          >
            Preview
          </div>
        </div>

        {/* CONTROLS - Tight Layout */}
        <div className="w-full lg:flex-1 bg-white dark:bg-[#161b2c] rounded-3xl p-5 md:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
          
          <div className="flex justify-between items-center border-b dark:border-slate-800 pb-3">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Parameters</h3>
            <button onClick={() => {setHOffset(10); setVOffset(10); setBlur(20);}} className="text-slate-400 hover:text-indigo-600"><RefreshCw size={14} /></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <ResponsiveSlider label="X Offset" value={hOffset} min={-50} max={50} onChange={setHOffset} />
            <ResponsiveSlider label="Y Offset" value={vOffset} min={-50} max={50} onChange={setVOffset} />
            <ResponsiveSlider label="Blur" value={blur} min={0} max={100} onChange={setBlur} />
            <ResponsiveSlider label="Spread" value={spread} min={-20} max={50} onChange={setSpread} />
            <ResponsiveSlider label="Opacity" value={opacity} min={0} max={1} step={0.01} onChange={setOpacity} />
            
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase">Shadow Color</label>
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-[#0b0f1a] p-2 rounded-xl border dark:border-slate-800">
                <input type="color" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} className="w-6 h-6 rounded cursor-pointer bg-transparent border-none" />
                <span className="text-[10px] font-mono dark:text-slate-300 uppercase">{shadowColor}</span>
              </div>
            </div>
          </div>

          {/* Inset Toggle - Compact */}
          <button 
            onClick={() => setInset(!inset)}
            className={`w-full py-3 rounded-xl border-2 font-bold text-xs transition-all ${inset ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-100 dark:border-slate-800 text-slate-500'}`}
          >
            {inset ? 'Inset Mode: ON' : 'Switch to Inset Shadow'}
          </button>

          {/* CODE OUTPUT - Mobile Friendly */}
          <div className="pt-4 border-t dark:border-slate-800">
            <div className="flex justify-between mb-2 text-[9px] font-black text-slate-400 uppercase px-1">
              <span>CSS CODE</span>
              <button onClick={handleCopy} className={`flex items-center gap-1 ${copied ? 'text-green-500' : 'text-indigo-500'}`}>
                {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'COPIED' : 'COPY'}
              </button>
            </div>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-[10px] md:text-xs text-indigo-300 break-all border border-slate-800 shadow-inner leading-relaxed">
               box-shadow: {shadowValue};
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Reusable Responsive Slider
const ResponsiveSlider = ({ label, value, min, max, step = 1, onChange }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="text-[9px] font-black text-slate-400 uppercase">{label}</label>
      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">{value}</span>
    </div>
    <input 
      type="range" min={min} max={max} step={step} value={value} 
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
    />
  </div>
);

export default ShadowGenerator;