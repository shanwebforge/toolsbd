'use client';

import { useState } from 'react';
import { Code2, CheckCircle2, AlertCircle, Copy, Trash2, FileJson, Sparkles, LayoutPanelLeft, Database, Zap } from 'lucide-react';

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
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 font-sans">
            <div className="max-w-5xl mx-auto">
                
                {/* Header Section - Purple Primary */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-lg shadow-lg shadow-purple-500/20 mb-4">
                        <FileJson className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight uppercase">JSON Data Architect</h1>
                    <p className="text-slate-400 text-xs font-medium mt-1">Validate and beautify your raw JSON data with professional-grade formatting.</p>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-slate-200 dark:border-zinc-800 overflow-hidden mb-6">
                    
                    {/* Toolbar - Indigo Secondary */}
                    <div className="p-4 bg-slate-50/50 dark:bg-zinc-800/50 border-b border-slate-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={formatJSON}
                                className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all active:scale-95 shadow-md shadow-purple-500/10"
                            >
                                <Zap className="w-3.5 h-3.5" /> Format & Validate
                            </button>
                            <button 
                                onClick={clearInput}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-red-50 hover:text-red-500 transition-all"
                            >
                                <Trash2 className="w-3.5 h-3.5" /> Clear
                            </button>
                        </div>

                        {error ? (
                            <div className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-900/30 text-[10px] font-bold">
                                <AlertCircle className="w-3.5 h-3.5" /> Syntax Error
                            </div>
                        ) : formattedJSON && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg border border-emerald-100 dark:border-emerald-900/30 text-[10px] font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5" /> JSON Validated
                            </div>
                        )}
                    </div>

                    {/* Editor Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Input Pane */}
                        <div className="p-5 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-zinc-800">
                            <div className="flex items-center gap-2 mb-3 text-slate-400">
                                <LayoutPanelLeft className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Raw Input</span>
                            </div>
                            <textarea 
                                value={jsonInput} 
                                onChange={(e) => setJsonInput(e.target.value)} 
                                placeholder="Paste your messy JSON here..."
                                className="w-full h-[380px] p-4 font-mono text-sm bg-slate-50 dark:bg-zinc-950/50 border border-slate-200 dark:border-zinc-800 rounded-lg resize-none outline-none focus:border-purple-500 text-slate-700 dark:text-zinc-300 transition-colors"
                            />
                        </div>

                        {/* Output Pane */}
                        <div className="p-5 bg-slate-50/20 dark:bg-black/10 relative">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Code2 className="w-3.5 h-3.5" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Formatted Output</span>
                                </div>
                                {formattedJSON && (
                                    <button 
                                        onClick={copyOutput}
                                        className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${isCopied ? 'text-emerald-500' : 'text-indigo-600 hover:text-indigo-700'}`}
                                    >
                                        {isCopied ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                        {isCopied ? 'Copied' : 'Copy JSON'}
                                    </button>
                                )}
                            </div>
                            
                            <div className="w-full h-[380px] bg-white dark:bg-zinc-950 rounded-lg border border-slate-200 dark:border-zinc-800 overflow-hidden relative shadow-inner">
                                {error ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-red-50/30 dark:bg-red-900/5 backdrop-blur-sm">
                                        <AlertCircle className="w-10 h-10 text-red-200 dark:text-red-900/30 mb-3" />
                                        <h3 className="text-xs font-bold text-red-600 dark:text-red-400 mb-1">Check Syntax</h3>
                                        <p className="text-[10px] font-mono text-red-400 leading-relaxed italic truncate max-w-full px-4">{error}</p>
                                    </div>
                                ) : formattedJSON ? (
                                    <pre className="w-full h-full p-5 font-mono text-xs text-indigo-600 dark:text-indigo-400 overflow-auto whitespace-pre">
                                        {formattedJSON}
                                    </pre>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 dark:text-zinc-700">
                                        <Database className="w-10 h-10 mb-2 opacity-20" />
                                        <span className="text-[9px] font-bold uppercase tracking-widest">Awaiting JSON Input</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-slate-200 dark:border-zinc-800">
                        <div className="flex items-center gap-2 mb-3 text-purple-600">
                            <Sparkles className="w-4 h-4" />
                            <h3 className="font-bold text-sm uppercase tracking-tight">Beautify & Minify</h3>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                            Turn hard-to-read, one-line JSON strings into perfectly indented structures. Our architect engine uses a standard 2-space indentation for maximum readability.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-slate-200 dark:border-zinc-800">
                        <div className="flex items-center gap-2 mb-3 text-indigo-600">
                            <CheckCircle2 className="w-4 h-4" />
                            <h3 className="font-bold text-sm uppercase tracking-tight">Real-time Validation</h3>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                            Instantly catch missing commas, unclosed brackets, or incorrect quotes. The built-in validator provides descriptive error messages to help you debug data fast.
                        </p>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">JSON Structural Engine &copy; 2026</p>
                </div>

            </div>
        </div>
    );
}