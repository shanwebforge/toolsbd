'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, MousePointer2, Settings2, Sparkles, Hash, ArrowRight, Pipette } from 'lucide-react';

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
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 flex items-center justify-center font-sans transition-colors duration-300">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-lg shadow-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
                
                {/* Visual Header - Preview */}
                <div 
                    className="h-40 w-full transition-all duration-700 relative flex items-center justify-center"
                    style={{ background: `linear-gradient(${direction}, ${color1}, ${color2})` }}
                >
                    <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white drop-shadow-sm">Live Preview</span>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex items-center gap-2 mb-6">
                        <Settings2 className="w-4 h-4 text-indigo-500" />
                        <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-zinc-200">Gradient Studio</h2>
                    </div>

                    {/* Hybrid Color Pickers (Manual + Picker) */}
                    <div className="space-y-4 mb-8">
                        <ColorInput label="Start Color" color={color1} setColor={setColor1} />
                        <ColorInput label="End Color" color={color2} setColor={setColor2} />
                    </div>

                    {/* Directions Grid - LG Radius */}
                    <div className="mb-8">
                        <label className="text-[9px] font-black uppercase tracking-tighter text-slate-400 block mb-3 text-center italic">Flow Direction</label>
                        <div className="grid grid-cols-4 gap-2">
                            {directions.map(d => (
                                <button 
                                    key={d.value}
                                    onClick={() => setDirection(d.value)}
                                    className={`h-10 flex items-center justify-center rounded-lg transition-all border ${
                                        direction === d.value 
                                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                                        : 'bg-white dark:bg-zinc-800 border-slate-100 dark:border-zinc-700 text-slate-400 hover:border-purple-300'
                                    }`}
                                >
                                    <span className="text-lg">{d.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Code Section - LG Radius */}
                    <div className="relative group mb-6">
                        <div className="bg-zinc-900 dark:bg-black p-4 rounded-lg font-mono text-[10px] text-indigo-300 break-all leading-relaxed border border-zinc-800 group-hover:border-indigo-500/50 transition-colors">
                            {cssCode}
                        </div>
                        <button 
                            onClick={copyCode}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 transition-colors"
                        >
                            {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                    </div>

                    <button 
                        onClick={copyCode}
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black uppercase tracking-widest text-[11px] rounded-lg shadow-xl shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                        {copied ? 'Copied Successfully' : 'Generate CSS Code'}
                    </button>
                </div>

                {/* Footer Micro-tip */}
                <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 border-t border-slate-100 dark:border-zinc-800 text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1">
                        <MousePointer2 className="w-3 h-3" /> Professional Tip: Mix analogous colors
                    </p>
                </div>
            </div>
        </div>
    );
}

// Reusable Component for Manual + Visual Color Input
function ColorInput({ label, color, setColor }: { label: string, color: string, setColor: (val: string) => void }) {
    const [localValue, setLocalValue] = useState(color);

    const handleManualSubmit = () => {
        let val = localValue;
        if (!val.startsWith('#')) val = '#' + val;
        const validHex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
        if (validHex.test(val)) {
            setColor(val.toUpperCase());
        }
    };

    return (
        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-slate-100 dark:border-zinc-800">
            <label className="text-[9px] font-black uppercase tracking-tighter text-slate-400 block mb-2">{label}</label>
            <div className="flex items-center gap-2">
                {/* Manual Text Input */}
                <div className="relative flex-grow">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                    <input 
                        type="text" 
                        value={localValue.replace('#', '')}
                        onChange={(e) => setLocalValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleManualSubmit()}
                        className="w-full py-2 pl-8 pr-8 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-md text-xs font-mono font-bold text-slate-700 dark:text-zinc-300 outline-none focus:border-indigo-500"
                        placeholder="HEX Code"
                    />
                    <button 
                        onClick={handleManualSubmit}
                        className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-md text-slate-400 hover:text-indigo-500"
                    >
                        <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
                {/* Visual Picker */}
                <div className="w-9 h-9 rounded-md border border-slate-200 dark:border-zinc-700 overflow-hidden relative shrink-0">
                    <input 
                        type="color" 
                        value={color}
                        onChange={(e) => {
                            const val = e.target.value.toUpperCase();
                            setColor(val);
                            setLocalValue(val);
                        }}
                        className="absolute inset-0 scale-150 cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
}