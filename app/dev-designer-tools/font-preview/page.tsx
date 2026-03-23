'use client';

import { useState } from 'react';
import { Type, Sliders, Layout, Sparkles, Download, MousePointer2 } from 'lucide-react';

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

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-purple-200 dark:border-purple-800">
                        <Type className="w-3 h-3" /> Typography Lab
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">Bangla Font Preview</h1>
                    <p className="text-sm text-gray-500 dark:text-zinc-500 font-medium">Test and visualize premium Bengali typefaces instantly.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    {/* Controls Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-xl shadow-indigo-500/5">
                            <div className="flex items-center gap-2 mb-6 text-indigo-600">
                                <Sliders className="w-4 h-4" />
                                <span className="text-xs font-black uppercase tracking-widest">Controls</span>
                            </div>

                            {/* Font Select */}
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-tighter block mb-2">Select Family</label>
                                    <select 
                                        value={selectedFont} 
                                        onChange={(e) => setSelectedFont(e.target.value)}
                                        className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 rounded-xl text-xs font-bold text-gray-700 dark:text-zinc-200 outline-none focus:border-purple-500 transition-all appearance-none cursor-pointer"
                                    >
                                        {fonts.map(font => <option key={font} value={font}>{font}</option>)}
                                    </select>
                                </div>

                                {/* Font Size Slider */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Size: {fontSize}px</label>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="16" 
                                        max="120" 
                                        value={fontSize} 
                                        onChange={(e) => setFontSize(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                    />
                                </div>

                                {/* Text Input */}
                                <div>
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-tighter block mb-2">Custom Text</label>
                                    <textarea 
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Type here..."
                                        className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 rounded-xl text-xs font-medium text-gray-700 dark:text-zinc-200 outline-none focus:border-purple-500 transition-all h-24 resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats Card */}
                        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-[2rem] text-white shadow-lg shadow-indigo-500/20">
                            <Sparkles className="w-6 h-6 mb-3 opacity-50" />
                            <h4 className="text-xs font-black uppercase tracking-widest mb-1">Current Font</h4>
                            <p className="text-xl font-bold tracking-tight leading-tight">{selectedFont}</p>
                        </div>
                    </div>

                    {/* Preview Canvas */}
                    <div className="lg:col-span-3">
                        <div className="bg-white dark:bg-zinc-900 rounded-[3rem] border border-gray-100 dark:border-zinc-800 shadow-2xl h-full min-h-[500px] flex flex-col overflow-hidden">
                            
                            {/* Canvas Toolbar */}
                            <div className="p-6 border-b border-gray-50 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-md">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-indigo-500 transition-colors">
                                        <Download className="w-3 h-3" /> Export Image
                                    </button>
                                </div>
                            </div>

                            {/* Main Preview Area */}
                            <div className="flex-grow relative overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px] flex items-center justify-center p-12 text-center">
                                <div 
                                    className="transition-all duration-500 ease-in-out text-gray-800 dark:text-zinc-100 break-words max-w-full"
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
                            <div className="p-6 bg-zinc-50 dark:bg-zinc-900/80 border-t border-gray-50 dark:border-zinc-800 flex flex-wrap gap-4 items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rendering: Unicode</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mode: Design Preview</span>
                                    </div>
                                </div>
                                <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] flex items-center gap-1">
                                    <MousePointer2 className="w-3 h-3" /> Precision Typography Tool
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}