'use client';

import { useState } from 'react';
import { ShieldCheck, ShieldAlert, Copy, RefreshCw, Lock, Unlock, Sparkles, Binary } from 'lucide-react';

export default function Base64ConverterPage() {
    const [mode, setMode] = useState('encode');
    const [inputText, setInputText] = useState('');
    const [result, setResult] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    const handleProcess = () => {
        if (!inputText.trim()) return;
        try {
            if (mode === 'encode') {
                setResult(btoa(unescape(encodeURIComponent(inputText))));
            } else {
                setResult(decodeURIComponent(escape(atob(inputText))));
            }
        } catch (e) {
            setResult("❌ Error: Invalid sequence. Check your Base64 string.");
        }
    };

    const handleCopy = () => {
        if (!result || result.startsWith('❌')) return;
        navigator.clipboard.writeText(result).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl border border-indigo-100 dark:border-zinc-800 overflow-hidden transition-all duration-500">
                
                {/* Visual Identity */}
                <div className="p-8 pb-0 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-purple-200 dark:border-purple-800">
                        <Binary className="w-3.5 h-3.5" /> Security Vault
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">Base64 Processor</h1>
                    <p className="text-xs text-gray-500 dark:text-zinc-500 font-bold uppercase tracking-widest">Secure Data Encoding & Decoding</p>
                </div>

                <div className="p-8 pt-6">
                    {/* Mode Selector - Premium Switch */}
                    <div className="flex p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-2xl mb-8 relative">
                        <div 
                            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white dark:bg-zinc-700 rounded-xl shadow-md transition-all duration-300 ease-out ${mode === 'decode' ? 'translate-x-full' : 'translate-x-0'}`}
                        />
                        <button 
                            onClick={() => setMode('encode')}
                            className={`relative flex-1 py-3 text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${mode === 'encode' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`}
                        >
                            <Lock className="w-3.5 h-3.5" /> Encode
                        </button>
                        <button 
                            onClick={() => setMode('decode')}
                            className={`relative flex-1 py-3 text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${mode === 'decode' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`}
                        >
                            <Unlock className="w-3.5 h-3.5" /> Decode
                        </button>
                    </div>

                    {/* Input Area */}
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between px-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Source Input</span>
                            <button 
                                onClick={() => setInputText('')}
                                className="text-[9px] font-black uppercase text-red-400 hover:text-red-500 transition-colors"
                            >
                                Clear Input
                            </button>
                        </div>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder={mode === 'encode' ? 'Enter plain text...' : 'Enter Base64 string...'}
                            className="w-full h-32 p-5 bg-zinc-50 dark:bg-zinc-950/50 border border-gray-100 dark:border-zinc-800 rounded-[2rem] text-sm font-mono text-gray-700 dark:text-zinc-300 outline-none focus:border-indigo-500/50 transition-all resize-none shadow-inner"
                        />
                    </div>

                    {/* Action Button */}
                    <button 
                        onClick={handleProcess}
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black uppercase tracking-widest text-xs rounded-[1.5rem] shadow-xl shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-3 group"
                    >
                        <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                        Execute Transformation
                    </button>

                    {/* Result Panel */}
                    <div className="mt-8 space-y-3">
                        <div className="flex items-center justify-between px-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Processed Output</span>
                            {result && (
                                <button 
                                    onClick={handleCopy}
                                    className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors ${isCopied ? 'text-green-500' : 'text-indigo-500 hover:text-indigo-600'}`}
                                >
                                    {isCopied ? <ShieldCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                    {isCopied ? 'Copied to Clipboard' : 'Secure Copy'}
                                </button>
                            )}
                        </div>
                        <div className={`w-full min-h-[100px] p-6 rounded-[2rem] font-mono text-xs break-all leading-relaxed border transition-all ${result.startsWith('❌') ? 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30 text-red-500' : 'bg-zinc-900 dark:bg-black border-zinc-800 text-indigo-400 shadow-2xl'}`}>
                            {result || <span className="text-zinc-600 opacity-50 italic">Generated hash will appear here...</span>}
                        </div>
                    </div>
                </div>

                {/* Micro Footer */}
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/30 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest">UTF-8 Ready</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                        <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Base64 Standard</span>
                    </div>
                </div>
            </div>
        </div>
    );
}