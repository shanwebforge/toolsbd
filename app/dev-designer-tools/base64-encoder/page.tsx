'use client';

import { useState } from 'react';
import { ShieldCheck, ShieldAlert, Copy, RefreshCw, Lock, Unlock, Sparkles, Binary, Hash, ArrowLeftRight } from 'lucide-react';

export default function Base64ConverterPage() {
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
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
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 font-sans flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-slate-200 dark:border-zinc-800 overflow-hidden">
                
                {/* Header Section - Purple Primary */}
                <div className="p-8 pb-0 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-lg shadow-lg shadow-purple-500/20 mb-4">
                        <Binary className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight uppercase">Base64 Architect</h1>
                    <p className="text-slate-400 text-xs font-medium mt-1">Secure and reliable data encoding & decoding engine.</p>
                </div>

                <div className="p-8 pt-6">
                    {/* Mode Selector - Indigo Secondary Switch */}
                    <div className="flex p-1 bg-slate-100 dark:bg-zinc-800 rounded-lg mb-6 relative">
                        <div 
                            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-zinc-700 rounded-md shadow-sm transition-all duration-300 ease-out ${mode === 'decode' ? 'translate-x-full' : 'translate-x-0'}`}
                        />
                        <button 
                            onClick={() => { setMode('encode'); setResult(''); }}
                            className={`relative flex-1 py-2.5 text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${mode === 'encode' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}
                        >
                            <Lock className="w-3.5 h-3.5" /> Encode
                        </button>
                        <button 
                            onClick={() => { setMode('decode'); setResult(''); }}
                            className={`relative flex-1 py-2.5 text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${mode === 'decode' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}
                        >
                            <Unlock className="w-3.5 h-3.5" /> Decode
                        </button>
                    </div>

                    {/* Input Area */}
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between px-1 text-slate-400">
                            <div className="flex items-center gap-2">
                                <ArrowLeftRight className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Source Input</span>
                            </div>
                            <button 
                                onClick={() => { setInputText(''); setResult(''); }}
                                className="text-[9px] font-bold uppercase text-slate-400 hover:text-red-500 transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder={mode === 'encode' ? 'Enter plain text to encode...' : 'Enter Base64 string to decode...'}
                            className="w-full h-32 p-4 bg-slate-50 dark:bg-zinc-950/50 border border-slate-200 dark:border-zinc-800 rounded-lg text-sm font-mono text-slate-700 dark:text-zinc-300 outline-none focus:border-purple-500 transition-all resize-none shadow-inner"
                        />
                    </div>

                    {/* Action Button - Purple Primary */}
                    <button 
                        onClick={handleProcess}
                        className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold uppercase tracking-widest text-xs rounded-lg shadow-md shadow-purple-500/10 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                    >
                        <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                        Execute Transformation
                    </button>

                    {/* Result Panel */}
                    <div className="mt-8 space-y-3">
                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Hash className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Processed Result</span>
                            </div>
                            {result && !result.startsWith('❌') && (
                                <button 
                                    onClick={handleCopy}
                                    className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${isCopied ? 'text-emerald-500' : 'text-indigo-600 hover:text-indigo-700'}`}
                                >
                                    {isCopied ? <ShieldCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                    {isCopied ? 'Copied' : 'Copy Hash'}
                                </button>
                            )}
                        </div>
                        <div className={`w-full min-h-[100px] p-5 rounded-lg font-mono text-xs break-all leading-relaxed border transition-all ${result.startsWith('❌') ? 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/20 text-red-500' : 'bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-zinc-800 text-indigo-600 dark:text-indigo-400'}`}>
                            {result || <span className="text-slate-300 dark:text-zinc-700 italic">Output will be generated here...</span>}
                        </div>
                    </div>
                </div>

                {/* Footer Badges */}
                <div className="p-4 bg-slate-50/50 dark:bg-zinc-800/30 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span className="text-[8px] font-bold uppercase text-slate-400 tracking-widest">UTF-8 Ready</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                        <span className="text-[8px] font-bold uppercase text-slate-400 tracking-widest">Standard Base64</span>
                    </div>
                </div>
            </div>
        </div>
    );
}