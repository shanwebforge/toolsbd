'use client';

import { useState, useEffect } from 'react';
import { Palette, Copy, Check, Pipette, RefreshCw, Layers, Sparkles, Code } from 'lucide-react';

export default function ColorPickerPage() {
    const [color, setColor] = useState('#7c3aed');
    const [palette, setPalette] = useState<string[]>([]);
    const [copiedColor, setCopiedColor] = useState<string | null>(null);

    useEffect(() => {
        generatePalette(color);
    }, [color]);

    const generatePalette = (baseColor: string) => {
        const baseRGB = hexToRgb(baseColor);
        if (!baseRGB) return;

        const newPalette: string[] = [];
        for (let i = 1; i <= 5; i++) {
            const factor = i * 0.15;
            newPalette.push(rgbToHex(adjustBrightness(baseRGB, factor))); 
            newPalette.push(rgbToHex(adjustBrightness(baseRGB, -factor))); 
        }
        setPalette(Array.from(new Set(newPalette)).sort());
    };

    const handleCopy = (hex: string) => {
        navigator.clipboard.writeText(hex);
        setCopiedColor(hex);
        setTimeout(() => setCopiedColor(null), 1500);
    };

    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const rgbToHex = ({ r, g, b }: { r: number, g: number, b: number }) => {
        const toHex = (c: number) => `0${Math.round(c).toString(16)}`.slice(-2);
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    const adjustBrightness = ({ r, g, b }: { r: number, g: number, b: number }, factor: number) => {
        const adjust = (c: number) => Math.max(0, Math.min(255, c + (factor > 0 ? (255 - c) : c) * factor));
        return { r: adjust(r), g: adjust(g), b: adjust(b) };
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 font-sans">
            <div className="max-w-4xl mx-auto">
                
                {/* Header Section - Primary Purple */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-lg shadow-lg shadow-purple-500/20 mb-4">
                        <Palette className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight uppercase">Color Studio</h1>
                    <p className="text-slate-400 text-xs font-medium mt-1">Generate professional UI color palettes instantly.</p>
                </div>

                {/* Main Picker Card - Border Radius LG */}
                <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-slate-200 dark:border-zinc-800 overflow-hidden mb-6">
                    <div className="p-6 sm:p-10">
                        <div className="flex flex-col md:flex-row items-center gap-10">
                            
                            {/* Visual Picker */}
                            <div className="relative group">
                                <input 
                                    type="color" 
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)} 
                                    className="w-40 h-40 cursor-pointer rounded-lg border-4 border-slate-100 dark:border-zinc-800 shadow-xl appearance-none bg-transparent"
                                />
                                <div className="mt-4 text-center">
                                    <span className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 rounded-lg font-mono font-bold text-sm text-slate-600 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
                                        {color.toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            {/* Controls - Secondary Indigo */}
                            <div className="flex-grow space-y-4">
                                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                                    <RefreshCw className="w-5 h-5" />
                                    <h3 className="font-bold text-lg">Auto-Generation</h3>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                                    Pick a base color and we'll calculate 10 different shades and tints optimized for modern web interfaces and components.
                                </p>
                                <button 
                                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all active:scale-95 text-xs uppercase tracking-widest flex items-center gap-2"
                                    onClick={() => generatePalette(color)}
                                >
                                    <Pipette className="w-4 h-4" /> Refresh Palette
                                </button>
                            </div>
                        </div>

                        {/* Palette Grid - Border Radius LG */}
                        <div className="mt-12 grid grid-cols-2 sm:grid-cols-5 gap-4">
                            {palette.map((hex, index) => (
                                <div 
                                    key={index}
                                    onClick={() => handleCopy(hex)}
                                    className="group relative h-24 rounded-lg cursor-pointer transition-transform hover:-translate-y-1 shadow-sm flex items-end justify-center p-2 overflow-hidden border border-black/5"
                                    style={{ backgroundColor: hex }}
                                >
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                                    <span className="relative z-10 text-[9px] font-black text-white bg-black/20 px-2 py-1 rounded backdrop-blur-sm uppercase">
                                        {hex}
                                    </span>
                                    {copiedColor === hex && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-zinc-900/90 animate-in fade-in duration-200">
                                            <Check className="w-5 h-5 text-emerald-500" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Details Section - Same Style as NumToWord */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-slate-200 dark:border-zinc-800">
                        <div className="flex items-center gap-2 mb-3 text-purple-600">
                            <Sparkles className="w-4 h-4" />
                            <h3 className="font-bold text-sm uppercase tracking-tight">UI Optimization</h3>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                            These variations are generated using brightness adjustment algorithms, ensuring you have the perfect contrast for borders, backgrounds, and hover states.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-slate-200 dark:border-zinc-800">
                        <div className="flex items-center gap-2 mb-3 text-indigo-600">
                            <Code className="w-4 h-4" />
                            <h3 className="font-bold text-sm uppercase tracking-tight">Developer Ready</h3>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                            Instantly copy any Hex code for your CSS or Tailwind config. Use lighter tints for cards and deeper shades for text or prominent buttons.
                        </p>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Design System Engine &copy; 2026</p>
                </div>

            </div>
        </div>
    );
}