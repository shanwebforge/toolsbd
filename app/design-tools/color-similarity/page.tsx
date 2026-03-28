'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Copy, Check, Hash, Info, ChevronUp, ChevronDown, Pipette, Zap, ArrowRight } from 'lucide-react';

export default function ColorSimilarityPage() {
    const [colorInput, setColorInput] = useState('#7C3AED');
    const [suggestedColors, setSuggestedColors] = useState<{tints: any[], main: any, shades: any[]}>({tints: [], main: null, shades: []});
    const [copiedColor, setCopiedColor] = useState<string | null>(null);

    // Initial load er jonno
    useEffect(() => {
        suggestColors();
    }, []);

    const hexToRgb = (hex: string) => {
        let cleanHex = hex.replace(/^#/, '');
        if (cleanHex.length === 3) {
            cleanHex = cleanHex.split('').map(x => x + x).join('');
        }
        const bigint = parseInt(cleanHex, 16);
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
        const validHex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
        if (!validHex.test(colorInput)) return;

        const rgb = hexToRgb(colorInput);
        setSuggestedColors({
            tints: Array.from({ length: 4 }, (_, i) => ({ 
                label: `Tint ${4-i}`, 
                rgb: lightenColor(rgb, (i + 1) / 5), 
                type: 'light' 
            })).reverse(),
            main: { label: 'Original', rgb, type: 'main' },
            shades: Array.from({ length: 4 }, (_, i) => ({ 
                label: `Shade ${i + 1}`, 
                rgb: darkenColor(rgb, (i + 1) / 5), 
                type: 'dark' 
            }))
        });
    };

    const handleCopy = (hex: string) => {
        navigator.clipboard.writeText(hex);
        setCopiedColor(hex);
        setTimeout(() => setCopiedColor(null), 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 font-sans">
            <div className="max-w-2xl mx-auto">
                
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-lg shadow-lg shadow-purple-500/20 mb-3">
                        <Pipette className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Color Orbs</h1>
                    <p className="text-slate-400 text-[9px] font-bold tracking-[0.2em] uppercase mt-1">Similarity Engine</p>
                </div>

                {/* Input Section - LG Radius */}
                <div className="bg-white dark:bg-zinc-900 p-2 rounded-lg shadow-sm border border-slate-200 dark:border-zinc-800 flex items-center mb-6 gap-2">
                    
                    {/* Manual HEX Input */}
                    <div className="relative flex-grow group">
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                        <input 
                            type="text" 
                            value={colorInput}
                            onChange={(e) => setColorInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && suggestColors()}
                            placeholder="7C3AED"
                            className="w-full py-3 pl-10 pr-12 bg-transparent text-slate-800 dark:text-white font-mono font-bold outline-none text-sm"
                        />
                        {/* Manual Trigger Button */}
                        <button 
                            onClick={suggestColors}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-md hover:bg-purple-600 hover:text-white transition-all"
                            title="Generate Palette"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Visual Color Picker */}
                    <div className="w-10 h-10 rounded-md border border-slate-100 dark:border-zinc-800 overflow-hidden relative group shrink-0">
                        <input 
                            type="color" 
                            value={colorInput.startsWith('#') && colorInput.length === 7 ? colorInput : '#7C3AED'}
                            onChange={(e) => {
                                const newColor = e.target.value.toUpperCase();
                                setColorInput(newColor);
                                // Picker change e sate sate trigger hobe
                                const rgb = hexToRgb(newColor);
                                setSuggestedColors({
                                    tints: Array.from({ length: 4 }, (_, i) => ({ label: `Tint ${4-i}`, rgb: lightenColor(rgb, (i + 1) / 5), type: 'light' })).reverse(),
                                    main: { label: 'Original', rgb, type: 'main' },
                                    shades: Array.from({ length: 4 }, (_, i) => ({ label: `Shade ${i + 1}`, rgb: darkenColor(rgb, (i + 1) / 5), type: 'dark' }))
                                });
                            }}
                            className="absolute inset-0 scale-150 cursor-pointer"
                        />
                    </div>
                </div>

                {/* Main Palette Card - LG Radius */}
                <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-slate-200 dark:border-zinc-800 p-8 mb-6 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10 flex items-center justify-center gap-2">
                        <ChevronUp className="w-3 h-3 text-purple-500" /> Tints Scale <ChevronUp className="w-3 h-3 text-purple-500" />
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <div className="flex flex-row gap-3">
                            {suggestedColors.tints.map((c, i) => (
                                <Orb key={i} color={c} rgbToHex={rgbToHex} handleCopy={handleCopy} copiedColor={copiedColor} />
                            ))}
                        </div>

                        <div className="py-4 sm:py-0 scale-125 z-10">
                            {suggestedColors.main && (
                                <Orb color={suggestedColors.main} rgbToHex={rgbToHex} handleCopy={handleCopy} copiedColor={copiedColor} isMain />
                            )}
                        </div>

                        <div className="flex flex-row gap-3">
                            {suggestedColors.shades.map((c, i) => (
                                <Orb key={i} color={c} rgbToHex={rgbToHex} handleCopy={handleCopy} copiedColor={copiedColor} />
                            ))}
                        </div>
                    </div>

                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-10 flex items-center justify-center gap-2">
                        <ChevronDown className="w-3 h-3 text-indigo-500" /> Shades Scale <ChevronDown className="w-3 h-3 text-indigo-500" />
                    </p>
                </div>

                {/* Details Section - LG Radius */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-slate-200 dark:border-zinc-800">
                        <h3 className="flex items-center gap-2 font-bold text-xs text-slate-800 dark:text-zinc-200 uppercase mb-3">
                            <Sparkles className="w-4 h-4 text-purple-500" /> Dual Control
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-zinc-500 leading-relaxed font-medium">
                            Manual input box-e HEX code likhe Enter chapun ba <b>Arrow icon</b>-e click korun. Athoba picker diye visual color select korun.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-slate-200 dark:border-zinc-800">
                        <h3 className="flex items-center gap-2 font-bold text-xs text-slate-800 dark:text-zinc-200 uppercase mb-3">
                            <Zap className="w-4 h-4 text-indigo-500" /> Similarity Engine
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-zinc-500 leading-relaxed font-medium">
                            Accurate tints ebong shades generate hobe designs-er hierarchy maintenance-er jonno. Click any orb to copy.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

function Orb({ color, rgbToHex, handleCopy, copiedColor, isMain = false }: any) {
    const hex = rgbToHex(color.rgb.r, color.rgb.g, color.rgb.b);
    return (
        <div className="flex flex-col items-center">
            <div 
                onClick={() => handleCopy(hex)}
                className={`relative cursor-pointer transition-all duration-300 hover:scale-110 rounded-full border-2 border-white dark:border-zinc-800 ${
                    isMain ? 'w-14 h-14 ring-4 ring-purple-500/20' : 'w-10 h-10'
                }`}
                style={{ backgroundColor: hex }}
            >
                {copiedColor === hex && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-full animate-in zoom-in fade-in">
                        <Check className="w-4 h-4 text-white" />
                    </div>
                )}
            </div>
            <span className={`mt-2 text-[7px] font-black uppercase tracking-tighter ${isMain ? 'text-purple-600' : 'text-slate-400'}`}>
                {color.label}
            </span>
        </div>
    );
}