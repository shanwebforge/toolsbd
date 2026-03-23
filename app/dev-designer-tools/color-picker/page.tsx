'use client';

import { useState, useEffect } from 'react';
import { Palette, Copy, Check, Pipette, RefreshCw, Layers } from 'lucide-react';

export default function ColorPickerPage() {
    const [color, setColor] = useState('#6366f1');
    const [palette, setPalette] = useState<string[]>([]);
    const [copiedColor, setCopiedColor] = useState<string | null>(null);

    useEffect(() => {
        generatePalette(color);
    }, [color]);

    const generatePalette = (baseColor: string) => {
        const baseRGB = hexToRgb(baseColor);
        if (!baseRGB) return;

        const newPalette: string[] = [];
        // Generating a mix of tints and shades
        for (let i = 1; i <= 5; i++) {
            const factor = i * 0.15;
            newPalette.push(rgbToHex(adjustBrightness(baseRGB, factor))); // Tint
            newPalette.push(rgbToHex(adjustBrightness(baseRGB, -factor))); // Shade
        }
        // Unique and sorted palette
        setPalette(Array.from(new Set(newPalette)));
    };

    const handleCopy = (hex: string) => {
        navigator.clipboard.writeText(hex);
        setCopiedColor(hex);
        setTimeout(() => setCopiedColor(null), 1500);
    };

    // Helpers
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
        <div className="min-h-screen bg-indigo-50 dark:bg-zinc-950 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                
                {/* Header Section */}
                <div className="bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl shadow-indigo-500/5 overflow-hidden border border-purple-100 dark:border-zinc-800 mb-8">
                    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-10 text-white relative">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                    <Palette className="w-8 h-8" />
                                </div>
                                <h1 className="text-3xl font-black tracking-tighter uppercase">Color Studio</h1>
                            </div>
                            <p className="text-purple-100 text-sm max-w-md font-medium">
                                Create stunning color schemes for your frontend projects instantly. Pick a base and we'll handle the rest.
                            </p>
                        </div>
                        <Pipette className="absolute top-6 right-8 w-32 h-32 text-white/10 rotate-12" />
                    </div>

                    <div className="p-8 sm:p-12">
                        <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
                            {/* Main Picker */}
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative flex flex-col items-center">
                                    <input 
                                        type="color" 
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)} 
                                        className="w-48 h-48 border-8 border-white dark:border-zinc-800 cursor-pointer rounded-full shadow-2xl transition-transform hover:scale-105 appearance-none bg-transparent"
                                        style={{ accentColor: color }}
                                    />
                                    <div className="mt-6 px-6 py-2 bg-gray-100 dark:bg-zinc-800 rounded-full font-mono font-bold text-gray-600 dark:text-zinc-300 border border-gray-200 dark:border-zinc-700">
                                        {color.toUpperCase()}
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-grow space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-black text-gray-800 dark:text-zinc-100 flex items-center gap-2">
                                        <RefreshCw className="w-5 h-5 text-indigo-500" /> Dynamic Palette
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-zinc-500 leading-relaxed">
                                        We automatically generate 10 unique variations based on your selection, ranging from deep shades to bright tints. Click any tile to copy the Hex code.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <span className="px-4 py-2 bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 text-xs font-bold rounded-xl border border-purple-100 dark:border-purple-900/20">Frontend Ready</span>
                                    <span className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-xl border border-indigo-100 dark:border-indigo-900/20">Hex Support</span>
                                </div>
                            </div>
                        </div>

                        {/* Palette Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                            {palette.map((hex, index) => (
                                <div 
                                    key={index}
                                    className="group relative h-32 rounded-[2rem] cursor-pointer flex items-end justify-center p-4 transition-all hover:-translate-y-2 shadow-lg overflow-hidden"
                                    style={{ backgroundColor: hex }}
                                    onClick={() => handleCopy(hex)}
                                >
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                                    <span className="relative z-10 text-[10px] font-black tracking-widest text-white drop-shadow-md uppercase bg-black/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                                        {hex}
                                    </span>
                                    
                                    {copiedColor === hex ? (
                                        <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-zinc-900/90 animate-in fade-in duration-200">
                                            <div className="flex flex-col items-center gap-1">
                                                <Check className="w-6 h-6 text-green-500" />
                                                <span className="text-[10px] font-black text-gray-800 dark:text-white uppercase">Copied</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Copy className="w-4 h-4 text-white drop-shadow-md" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Integration Card */}
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-purple-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-600 rounded-2xl">
                            <Layers className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 dark:text-zinc-200">Developer Tip</h4>
                            <p className="text-xs text-gray-500 dark:text-zinc-500">Copy these codes directly into your Tailwind `tailwind.config.js` file.</p>
                        </div>
                    </div>
                    <button className="px-6 py-3 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 rounded-2xl font-bold text-sm hover:bg-indigo-600 hover:text-white transition-all">
                        Export as JSON
                    </button>
                </div>

            </div>
        </div>
    );
}