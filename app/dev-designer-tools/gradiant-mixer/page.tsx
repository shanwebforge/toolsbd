'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, MousePointer2, Settings2, Sparkles, RefreshCcw } from 'lucide-react';

export default function GradientGeneratorPage() {
    const [color1, setColor1] = useState('#8B5CF6'); // Purple
    const [color2, setColor2] = useState('#4F46E5'); // Indigo
    const [direction, setDirection] = useState('to right');
    const [copied, setCopied] = useState(false);

    const directions = [
        { label: '↖', value: 'to top left' },
        { label: '↑', value: 'to top' },
        { label: '↗', value: 'to top right' },
        { label: '←', value: 'to left' },
        { label: '→', value: 'to right' },
        { label: '↙', value: 'to bottom left' },
        { label: '↓', value: 'to bottom' },
        { label: '↘', value: 'to bottom right' },
    ];

    const cssCode = `background: linear-gradient(${direction}, ${color1}, ${color2});`;

    const copyCode = () => {
        navigator.clipboard.writeText(cssCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 flex items-center justify-center">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-purple-100 dark:border-zinc-800 overflow-hidden">
                
                {/* Visual Header */}
                <div 
                    className="h-32 w-full transition-all duration-700 relative flex items-center justify-center"
                    style={{ background: `linear-gradient(${direction}, ${color1}, ${color2})` }}
                >
                    <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white drop-shadow-sm">Live Preview</span>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex items-center gap-2 mb-6">
                        <Settings2 className="w-4 h-4 text-indigo-500" />
                        <h2 className="text-sm font-black uppercase tracking-widest text-gray-800 dark:text-zinc-200">Gradient Studio</h2>
                    </div>

                    {/* Color Pickers */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-2xl border border-gray-100 dark:border-zinc-800">
                            <label className="text-[9px] font-black uppercase tracking-tighter text-gray-400 block mb-2">Start Color</label>
                            <div className="flex items-center gap-3">
                                <input 
                                    type="color" 
                                    value={color1} 
                                    onChange={(e) => setColor1(e.target.value)} 
                                    className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent" 
                                />
                                <span className="text-xs font-mono font-bold text-gray-600 dark:text-zinc-400 uppercase">{color1}</span>
                            </div>
                        </div>
                        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-2xl border border-gray-100 dark:border-zinc-800">
                            <label className="text-[9px] font-black uppercase tracking-tighter text-gray-400 block mb-2">End Color</label>
                            <div className="flex items-center gap-3">
                                <input 
                                    type="color" 
                                    value={color2} 
                                    onChange={(e) => setColor2(e.target.value)} 
                                    className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent" 
                                />
                                <span className="text-xs font-mono font-bold text-gray-600 dark:text-zinc-400 uppercase">{color2}</span>
                            </div>
                        </div>
                    </div>

                    {/* Directions Grid */}
                    <div className="mb-8">
                        <label className="text-[9px] font-black uppercase tracking-tighter text-gray-400 block mb-3 text-center">Set Flow Direction</label>
                        <div className="grid grid-cols-4 gap-2">
                            {directions.map(d => (
                                <button 
                                    key={d.value}
                                    onClick={() => setDirection(d.value)}
                                    className={`h-10 flex items-center justify-center rounded-xl transition-all border ${
                                        direction === d.value 
                                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                                        : 'bg-white dark:bg-zinc-800 border-gray-100 dark:border-zinc-700 text-gray-400 hover:border-purple-300'
                                    }`}
                                >
                                    <span className="text-lg">{d.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Code Section */}
                    <div className="relative group mb-6">
                        <div className="bg-zinc-900 dark:bg-black p-4 rounded-2xl font-mono text-[10px] text-indigo-300 break-all leading-relaxed border border-zinc-800 group-hover:border-indigo-500/50 transition-colors">
                            {cssCode}
                        </div>
                        <button 
                            onClick={copyCode}
                            className="absolute right-2 top-2 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 transition-colors"
                        >
                            {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                    </div>

                    <button 
                        onClick={copyCode}
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                        {copied ? 'Copied Successfully' : 'Generate CSS Code'}
                    </button>
                </div>

                {/* Footer Micro-tip */}
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border-t border-gray-100 dark:border-zinc-800 text-center">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-1">
                        <MousePointer2 className="w-3 h-3" /> Tip: Use high contrast for vibrant UI
                    </p>
                </div>
            </div>
        </div>
    );
}