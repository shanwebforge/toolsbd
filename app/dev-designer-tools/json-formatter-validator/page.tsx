'use client';

import { useState } from 'react';
import { Code2, CheckCircle2, AlertCircle, Copy, Trash2, FileJson, Sparkles, LayoutPanelLeft } from 'lucide-react';

export default function JSONFormatterValidatorPage() {
    const [jsonInput, setJsonInput] = useState('{\n  "project": "ShanFolio",\n  "type": "Frontend",\n  "status": "active",\n  "tech": ["React", "Next.js", "Tailwind"]\n}');
    const [formattedJSON, setFormattedJSON] = useState('');
    const [error, setError] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    const formatJSON = () => {
        setError('');
        setFormattedJSON('');
        if (!jsonInput.trim()) return;
        
        try {
            const obj = JSON.parse(jsonInput);
            const pretty = JSON.stringify(obj, null, 2);
            setFormattedJSON(pretty);
        } catch (e: any) {
            setError(e.message || 'Invalid JSON format. Please check your syntax.');
        }
    };

    const copyOutput = () => {
        const textToCopy = formattedJSON || jsonInput;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    const clearInput = () => {
        setJsonInput('');
        setFormattedJSON('');
        setError('');
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-indigo-200 dark:border-indigo-800">
                        <FileJson className="w-3 h-3" /> Data Architect
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">JSON Formatter</h1>
                    <p className="text-sm text-gray-500 dark:text-zinc-500 font-medium max-w-sm mx-auto">
                        Validate and beautify your raw JSON data with professional-grade formatting.
                    </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden">
                    
                    {/* Toolbar */}
                    <div className="p-6 bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-gray-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={formatJSON}
                                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                            >
                                <Sparkles className="w-3.5 h-3.5" /> Format & Validate
                            </button>
                            <button 
                                onClick={clearInput}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 text-xs font-black uppercase tracking-widest rounded-xl border border-gray-200 dark:border-zinc-700 hover:bg-red-50 hover:text-red-500 transition-all"
                            >
                                <Trash2 className="w-3.5 h-3.5" /> Clear
                            </button>
                        </div>

                        {error ? (
                            <div className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/30 text-[10px] font-bold animate-pulse">
                                <AlertCircle className="w-3.5 h-3.5" /> Invalid JSON
                            </div>
                        ) : formattedJSON && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl border border-green-100 dark:border-green-900/30 text-[10px] font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Validated Successfully
                            </div>
                        )}
                    </div>

                    {/* Main Content Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        
                        {/* Input Pane */}
                        <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-zinc-800">
                            <div className="flex items-center justify-between mb-3 px-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                                    <LayoutPanelLeft className="w-3 h-3" /> Raw Input
                                </span>
                            </div>
                            <textarea 
                                value={jsonInput} 
                                onChange={(e) => setJsonInput(e.target.value)} 
                                placeholder="Paste your messy JSON here..."
                                className="w-full h-[400px] p-5 font-mono text-sm bg-zinc-50 dark:bg-zinc-950/50 border border-gray-100 dark:border-zinc-800 rounded-2xl resize-none outline-none focus:border-indigo-500 text-gray-700 dark:text-zinc-300 transition-colors"
                            />
                        </div>

                        {/* Output Pane */}
                        <div className="p-6 bg-zinc-50/30 dark:bg-black/20 relative">
                            <div className="flex items-center justify-between mb-3 px-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                                    <Code2 className="w-3 h-3" /> Formatted Output
                                </span>
                                {formattedJSON && (
                                    <button 
                                        onClick={copyOutput}
                                        className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors ${isCopied ? 'text-green-500' : 'text-indigo-500 hover:text-indigo-600'}`}
                                    >
                                        {isCopied ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                        {isCopied ? 'Copied' : 'Copy JSON'}
                                    </button>
                                )}
                            </div>
                            
                            <div className="w-full h-[400px] bg-white dark:bg-zinc-950 rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden relative">
                                {error ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-red-50/50 dark:bg-red-900/5 backdrop-blur-sm">
                                        <AlertCircle className="w-12 h-12 text-red-200 dark:text-red-900/40 mb-4" />
                                        <h3 className="text-sm font-bold text-red-600 dark:text-red-400 mb-2 tracking-tight">Syntax Error Detected</h3>
                                        <p className="text-[10px] font-mono text-red-400 dark:text-red-500 max-w-[250px] leading-relaxed italic">{error}</p>
                                    </div>
                                ) : formattedJSON ? (
                                    <pre className="w-full h-full p-6 font-mono text-xs text-indigo-600 dark:text-indigo-400 overflow-auto whitespace-pre">
                                        {formattedJSON}
                                    </pre>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 dark:text-zinc-700">
                                        <FileJson className="w-12 h-12 mb-3 opacity-20" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Awaiting Data</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer / Quick Info */}
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/30 border-t border-gray-100 dark:border-zinc-800 flex justify-center">
                        <p className="text-[9px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-[0.3em]">
                            Built for Frontend Engineers • UTF-8 Compatible
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}