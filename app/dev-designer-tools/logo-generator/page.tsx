'use client';

import { useState, useRef, useEffect } from 'react';
import { Palette, Type, Download, Move, Maximize, Settings2, Sparkles, Layout } from 'lucide-react';

export default function LogoGeneratorPage() {
    const [text, setText] = useState('SHAN');
    const [font, setFont] = useState('Poppins');
    const [textColor, setTextColor] = useState('#6366f1'); // Indigo-500
    const [bgColor, setBgColor] = useState('#ffffff');
    const [fontSize, setFontSize] = useState(80);
    const [canvasWidth, setCanvasWidth] = useState(600);
    const [canvasHeight, setCanvasHeight] = useState(300);
    
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const fonts = [
        'Segoe UI', 'Roboto', 'Poppins', 'Lobster', 'Oswald', 
        'Great Vibes', 'Anton', 'Inconsolata', 'Noto Sans Bengali', 'Li Aditi'
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Text Styling
        ctx.font = `black ${fontSize}px "${font}"`;
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Render Text
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    }, [text, font, textColor, bgColor, fontSize, canvasWidth, canvasHeight]);

    const downloadLogo = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = `logo_${text.toLowerCase()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-purple-200 dark:border-purple-800">
                        <Sparkles className="w-3.5 h-3.5" /> Branding Lab
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">Text Logo Studio</h1>
                    <p className="text-sm text-gray-500 dark:text-zinc-500 font-medium">Create high-quality typography logos for your projects.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Control Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-xl shadow-indigo-500/5">
                            <div className="flex items-center gap-2 mb-8">
                                <Settings2 className="w-4 h-4 text-indigo-500" />
                                <span className="text-xs font-black uppercase tracking-widest text-gray-800 dark:text-zinc-200">Logo Parameters</span>
                            </div>

                            <div className="space-y-6">
                                {/* Text Input */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                        <Type className="w-3 h-3" /> Content
                                    </label>
                                    <input 
                                        type="text" 
                                        value={text} 
                                        onChange={e => setText(e.target.value)} 
                                        className="w-full p-3.5 bg-zinc-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 rounded-2xl text-sm font-bold text-gray-700 dark:text-zinc-200 outline-none focus:border-indigo-500 transition-all"
                                    />
                                </div>

                                {/* Font Select */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                        <Layout className="w-3 h-3" /> Typography
                                    </label>
                                    <select 
                                        value={font} 
                                        onChange={e => setFont(e.target.value)} 
                                        className="w-full p-3.5 bg-zinc-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 rounded-2xl text-xs font-bold text-gray-700 dark:text-zinc-200 outline-none cursor-pointer"
                                    >
                                        {fonts.map(f => <option key={f} value={f}>{f}</option>)}
                                    </select>
                                </div>

                                {/* Color Pickers */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-2xl border border-gray-100 dark:border-zinc-700">
                                        <label className="text-[9px] font-black uppercase text-gray-400 block mb-2">Text Color</label>
                                        <div className="flex items-center gap-2">
                                            <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none" />
                                            <span className="text-[10px] font-mono font-bold text-gray-500">{textColor}</span>
                                        </div>
                                    </div>
                                    <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-2xl border border-gray-100 dark:border-zinc-700">
                                        <label className="text-[9px] font-black uppercase text-gray-400 block mb-2">Background</label>
                                        <div className="flex items-center gap-2">
                                            <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none" />
                                            <span className="text-[10px] font-mono font-bold text-gray-500">{bgColor}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Range Controls */}
                                <div className="space-y-4 pt-4 border-t border-gray-50 dark:border-zinc-800">
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <label className="text-[10px] font-black uppercase text-gray-400">Font Size</label>
                                            <span className="text-[10px] font-bold text-indigo-500">{fontSize}px</span>
                                        </div>
                                        <input type="range" min="10" max="200" value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))} className="w-full accent-indigo-600" />
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <label className="text-[10px] font-black uppercase text-gray-400">Dimensions</label>
                                            <span className="text-[10px] font-bold text-indigo-500">{canvasWidth}x{canvasHeight}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1">
                                                <input type="range" min="100" max="1000" value={canvasWidth} onChange={e => setCanvasWidth(parseInt(e.target.value))} className="w-full accent-purple-600" />
                                            </div>
                                            <div className="flex-1">
                                                <input type="range" min="50" max="600" value={canvasHeight} onChange={e => setCanvasHeight(parseInt(e.target.value))} className="w-full accent-purple-600" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={downloadLogo} 
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            <Download className="w-4 h-4" /> Export Asset
                        </button>
                    </div>

                    {/* Preview Area */}
                    <div className="lg:col-span-8">
                        <div className="bg-white dark:bg-zinc-900 rounded-[3rem] border border-gray-100 dark:border-zinc-800 shadow-2xl p-4 sm:p-12 flex flex-col items-center justify-center relative overflow-hidden min-h-[500px]">
                            
                            {/* Editor Grid Background */}
                            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none" 
                                style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                            ></div>

                            <div className="relative z-10 w-full flex flex-col items-center">
                                <div className="mb-6 flex items-center gap-4 text-gray-400">
                                    <Move className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Logo Viewport</span>
                                    <Maximize className="w-4 h-4" />
                                </div>

                                <div className="bg-white dark:bg-zinc-950 rounded-2xl shadow-inner border-2 border-dashed border-indigo-100 dark:border-zinc-800 p-2 overflow-hidden max-w-full">
                                    <canvas 
                                        ref={canvasRef} 
                                        className="max-w-full h-auto transition-all duration-300"
                                    />
                                </div>

                                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                                    <div className="flex items-center gap-2">
                                        <Palette className="w-3.5 h-3.5 text-indigo-400" />
                                        <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Vector Style</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Maximize className="w-3.5 h-3.5 text-purple-400" />
                                        <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">High Res</span>
                                    </div>
                                    <div className="hidden sm:flex items-center gap-2">
                                        <Type className="w-3.5 h-3.5 text-pink-400" />
                                        <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Web Ready</span>
                                    </div>
                                    <div className="hidden sm:flex items-center gap-2">
                                        <Download className="w-3.5 h-3.5 text-green-400" />
                                        <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">PNG Export</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}