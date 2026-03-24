'use client';

import { useState } from 'react';
import { Type, Sliders, Sparkles, Download, ChevronUp, ChevronDown, RefreshCw, Hash } from 'lucide-react';

export default function FontPreviewPage() {
    const fonts = [
        'Adorsho Lipi', 'Anek Bangla', 'Atma', 'Baloo Da 2', 'BenSen Handwriting',
        'Galada', 'Hind Siliguri', 'Kalpurush', 'Mina', 'Mukti', 'Noto Sans Bengali',
        'Noto Serif Bengali', 'Siyam Rupali', 'Tiro Bangla', 'Solaiman Lipi',
        'Charukola', 'Rajon Shoily', 'Sutonny MJ', 'Vrinda', 'Li Aditi'
    ];

    const [selectedFont, setSelectedFont] = useState(fonts[0]);
    const [text, setText] = useState('আমার সোনার বাংলা, আমি তোমায় ভালোবাসি');
    const [fontSize, setFontSize] = useState(48);

    const resetControls = () => {
        setFontSize(48);
        setSelectedFont(fonts[0]);
        setText('আমার সোনার বাংলা, আমি তোমায় ভালোবাসি');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans transition-colors duration-300">
            
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row p-4 lg:p-10 gap-6">
                
                {/* PREVIEW CANVAS - Compact & Non-Sticky for Mobile */}
                <div className="w-full lg:w-3/5">
                    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col min-h-[160px] md:min-h-[250px] lg:min-h-[500px]">
                        
                        {/* Rendering Info Bar */}
                        <div className="px-4 py-2 border-b dark:border-zinc-800 flex justify-between items-center bg-slate-50/50 dark:bg-zinc-900/50">
                             <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            </div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Preview Canvas</span>
                        </div>

                        {/* Main Text Display - Reduced Padding for Mobile */}
                        <div className="flex-grow flex items-center justify-center p-6 md:p-12 text-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px]">
                            <div 
                                className="transition-all duration-300 ease-in-out text-slate-800 dark:text-zinc-100 break-words max-w-full"
                                style={{ 
                                    fontFamily: `'${selectedFont}', sans-serif`,
                                    fontSize: `${fontSize}px`,
                                    lineHeight: '1.4'
                                }}
                            >
                                {text || 'লেখাটি এখানে দেখা যাবে...'}
                            </div>
                        </div>

                        {/* Canvas Footer */}
                        <div className="px-4 py-2 border-t dark:border-zinc-800 flex justify-between items-center bg-slate-50/50 dark:bg-zinc-900/50">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{selectedFont}</span>
                            <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition-colors">
                                <Download size={12} /> Export
                            </button>
                        </div>
                    </div>
                </div>

                {/* CONTROLS SIDEBAR */}
                <div className="w-full lg:w-2/5 space-y-6">
                    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 md:p-8 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-8">
                        
                        <div className="flex justify-between items-center border-b dark:border-zinc-800 pb-4">
                            <div className="flex items-center gap-2">
                                <Sliders className="w-4 h-4 text-indigo-500" />
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-800 dark:text-zinc-200">Settings</h3>
                            </div>
                            <button onClick={resetControls} className="text-slate-400 hover:text-indigo-600 transition-colors">
                                <RefreshCw size={14} />
                            </button>
                        </div>

                        <div className="space-y-8">
                            {/* Font Family Selection */}
                            <div className="space-y-3">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Font Family</label>
                                <div className="relative">
                                    <select 
                                        value={selectedFont} 
                                        onChange={(e) => setSelectedFont(e.target.value)}
                                        className="w-full p-3 bg-slate-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg text-xs font-bold text-slate-700 dark:text-zinc-200 outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                                    >
                                        {fonts.map(font => <option key={font} value={font}>{font}</option>)}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <ChevronDown size={14} />
                                    </div>
                                </div>
                            </div>

                            {/* Precision Font Size Slider */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Font Size</label>
                                    <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-zinc-950 p-1 rounded-md border dark:border-zinc-800">
                                        <button 
                                            onClick={() => setFontSize(Math.max(16, fontSize - 1))}
                                            className="p-1 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded transition-colors text-slate-400 hover:text-indigo-600"
                                        >
                                            <ChevronDown size={14} />
                                        </button>
                                        <span className="w-9 text-center text-indigo-600 dark:text-indigo-400 text-[11px] font-black">{fontSize}</span>
                                        <button 
                                            onClick={() => setFontSize(Math.min(120, fontSize + 1))}
                                            className="p-1 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded transition-colors text-slate-400 hover:text-indigo-600"
                                        >
                                            <ChevronUp size={14} />
                                        </button>
                                    </div>
                                </div>
                                <input 
                                    type="range" min="16" max="120" value={fontSize} 
                                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-slate-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                            </div>

                            {/* Text Input Area */}
                            <div className="space-y-3">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Preview Text</label>
                                <textarea 
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="এখানে টাইপ করুন..."
                                    className="w-full p-4 bg-slate-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg text-sm font-medium text-slate-700 dark:text-zinc-200 outline-none focus:border-indigo-500 transition-all h-28 resize-none shadow-inner"
                                />
                            </div>
                        </div>

                        {/* Save Action */}
                        <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group shadow-lg shadow-indigo-500/20">
                            <Sparkles size={14} /> Save Typography
                        </button>
                    </div>

                    <div className="text-center pb-6">
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] opacity-40">
                            Precision Typography Tool
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}