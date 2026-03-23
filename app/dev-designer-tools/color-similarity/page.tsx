'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Copy, Check, Hash, Info, ChevronRight, ChevronLeft, Pipette } from 'lucide-react';

export default function ColorSimilarityPage() {
    const [colorInput, setColorInput] = useState('#6366F1');
    const [suggestedColors, setSuggestedColors] = useState<any[]>([]);
    const [copiedColor, setCopiedColor] = useState<string | null>(null);

    useEffect(() => {
        suggestColors();
    }, []);

    const hexToRgb = (hex: string) => {
        hex = hex.replace(/^#/, '');
        if (hex.length === 3) {
            hex = hex.split('').map(x => x + x).join('');
        }
        const bigint = parseInt(hex, 16);
        return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
    };

    const rgbToHex = (r: number, g: number, b: number) => {
        return "#" + [r, g, b].map(x => {
            const hex = Math.round(x).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('').toUpperCase();
    };

    const lightenColor = (rgb: any, amt: number) => ({
        r: Math.min(255, rgb.r + (255 - rgb.r) * amt),
        g: Math.min(255, rgb.g + (255 - rgb.g) * amt),
        b: Math.min(255, rgb.b + (255 - rgb.b) * amt),
    });

    const darkenColor = (rgb: any, amt: number) => ({
        r: Math.max(0, rgb.r * (1 - amt)),
        g: Math.max(0, rgb.g * (1 - amt)),
        b: Math.max(0, rgb.b * (1 - amt)),
    });

    const suggestColors = () => {
        const validHex = /^#?([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;
        if (!validHex.test(colorInput)) return;

        const rgb = hexToRgb(colorInput);
        const lightShades = Array.from({ length: 4 }, (_, i) => lightenColor(rgb, (i + 1) / 5)).reverse();
        const darkShades = Array.from({ length: 4 }, (_, i) => darkenColor(rgb, (i + 1) / 5));

        const colors = [
            ...lightShades.map((c, i) => ({ label: `Tint ${4 - i}`, rgb: c, type: 'light' })),
            { label: 'Original', rgb, type: 'main' },
            ...darkShades.map((c, i) => ({ label: `Shade ${i + 1}`, rgb: c, type: 'dark' }))
        ];
        setSuggestedColors(colors);
    };

    const handleCopy = (hex: string) => {
        navigator.clipboard.writeText(hex);
        setCopiedColor(hex);
        setTimeout(() => setCopiedColor(null), 1500);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-indigo-200 dark:border-indigo-800">
                        <Pipette className="w-3 h-3" /> Digital Colorist
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">Color Similarity Orbs</h1>
                    <p className="text-sm text-gray-500 dark:text-zinc-500 max-w-sm mx-auto leading-relaxed">
                        Enter a HEX code to generate a minimalist, balanced scale of tints and shades. Click any orb to copy.
                    </p>
                </div>

                {/* Input Control */}
                <div className="max-w-md mx-auto mb-20 p-2 bg-white dark:bg-zinc-900 rounded-full shadow-2xl border border-gray-100 dark:border-zinc-800 flex items-center">
                    <div className="relative flex-grow">
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            value={colorInput}
                            onChange={(e) => setColorInput(e.target.value)}
                            onKeyUp={(e) => e.key === 'Enter' && suggestColors()}
                            placeholder="6366F1"
                            maxLength={7}
                            className="w-full py-4 pl-10 pr-4 bg-transparent text-gray-800 dark:text-white font-mono font-bold outline-none text-sm"
                        />
                    </div>
                    <button 
                        onClick={suggestColors}
                        className="px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black rounded-full hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 transition-all uppercase text-[10px] tracking-widest"
                    >
                        Generate
                    </button>
                </div>

                {/* Results Section - Compact Orbs */}
                <div className="max-w-4xl mx-auto p-10 bg-white dark:bg-zinc-900 rounded-[3rem] shadow-xl border border-gray-100 dark:border-zinc-800">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-gray-100 dark:border-zinc-800">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                                <ChevronLeft className="w-4 h-4 text-indigo-600" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Tints</span>
                        </div>
                        <div className="text-center">
                            <h3 className="text-sm font-black text-gray-800 dark:text-zinc-100 uppercase tracking-widest mb-1">Color Palette Scale</h3>
                            <p className="text-xs font-bold text-gray-500 dark:text-zinc-500">{colorInput}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Shades</span>
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                                <ChevronRight className="w-4 h-4 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-4 md:gap-6 lg:gap-8">
                        {suggestedColors.map(({ label, rgb, type }, index) => {
                            const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
                            const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
                            const isDark = brightness < 150;
                            
                            return (
                                <div key={index} className="relative group flex flex-col items-center">
                                    <div 
                                        onClick={() => handleCopy(hex)}
                                        className={`cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-xl shadow-indigo-500/10 rounded-full border-4 ${
                                            type === 'main' 
                                            ? 'w-16 h-16 sm:w-20 sm:h-20 border-indigo-500 ring-4 ring-indigo-500/10' 
                                            : 'w-12 h-12 sm:w-14 sm:h-14 border-gray-100 dark:border-zinc-700 opacity-90 group-hover:opacity-100'
                                        } overflow-hidden`}
                                        style={{ backgroundColor: hex }}
                                    >
                                        {/* Copy Success Indicator */}
                                        {copiedColor === hex && (
                                            <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center animate-in fade-in zoom-in duration-200 rounded-full">
                                                <Check className={`w-6 h-6 ${isDark ? 'text-green-300' : 'text-green-600'}`} />
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Hover HEX Card */}
                                    <div className="absolute top-[-45px] opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none">
                                        <div className="bg-zinc-800 dark:bg-white text-white dark:text-zinc-900 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                                            <Copy className="w-3 h-3 opacity-60" /> {hex}
                                        </div>
                                        <div className="w-2 h-2 bg-zinc-800 dark:bg-white rotate-45 mx-auto mt-[-4px]"></div>
                                    </div>

                                    {/* Label */}
                                    <span className={`mt-3 text-[9px] font-black uppercase tracking-widest ${type === 'main' ? 'text-indigo-600' : 'text-gray-400'}`}>
                                        {label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Developer Integration */}
                <div className="mt-16 max-w-lg mx-auto bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-gray-100 dark:border-zinc-800 flex items-center gap-4 shadow-inner">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl">
                        <Sparkles className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-gray-800 dark:text-zinc-200">Pro Tip for Designers</h4>
                        <p className="text-xs text-gray-500 dark:text-zinc-500 leading-relaxed mt-1">
                            Click any orb to copy the exact HEX code. This minimalist scale is designed for seamless design-to-code integration.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}