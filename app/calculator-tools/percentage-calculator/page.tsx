'use client';

import { useState } from 'react';
import { Percent, RefreshCcw, TrendingUp, ShoppingBag, AlertCircle, ChevronRight } from 'lucide-react';

export default function PercentageCalculatorPage() {
    const [originalValue, setOriginalValue] = useState('');
    const [percentage, setPercentage] = useState('');
    const [result, setResult] = useState<{ value: string; increase: string; decrease: string; percent: number } | null>(null);
    const [error, setError] = useState('');

    const calculatePercentage = () => {
        const original = parseFloat(originalValue);
        const percent = parseFloat(percentage);

        if (isNaN(original) || isNaN(percent)) {
            setError('Please enter valid numeric values.');
            setResult(null);
            return;
        }
        if (original < 0 || percent < 0) {
            setError('Values must be zero or positive.');
            setResult(null);
            return;
        }
        
        const calculatedValue = (original * percent) / 100;
        const totalWithIncrease = original + calculatedValue;
        const totalWithDecrease = original - calculatedValue;

        setError('');
        setResult({
            value: calculatedValue.toFixed(2),
            increase: totalWithIncrease.toFixed(2),
            decrease: totalWithDecrease.toFixed(2),
            percent: percent
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-8 px-4">
            <div className="max-w-4xl mx-auto mt-4">
                
                {/* Main Compact Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm overflow-hidden border border-slate-200 dark:border-zinc-800 mb-6">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 text-white">
                        <div className="flex items-center gap-3 mb-1">
                            <Percent className="w-6 h-6" />
                            <h1 className="text-xl font-bold tracking-tight">Percentage Calculator</h1>
                        </div>
                        <p className="text-purple-100 text-xs opacity-90 font-medium">Calculate discounts, tax, and percentage differences instantly.</p>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Original Amount</label>
                                <input 
                                    type="number" 
                                    value={originalValue}
                                    onChange={(e) => setOriginalValue(e.target.value)}
                                    placeholder="e.g. 1000"
                                    className="w-full p-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Percentage (%)</label>
                                <input 
                                    type="number" 
                                    value={percentage}
                                    onChange={(e) => setPercentage(e.target.value)}
                                    placeholder="e.g. 15"
                                    className="w-full p-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <button 
                            onClick={calculatePercentage}
                            className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md shadow-purple-500/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mb-6 text-sm"
                        >
                            <RefreshCcw className="w-4 h-4" /> Calculate Results
                        </button>

                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-rose-50 dark:bg-rose-900/10 text-rose-600 dark:text-rose-400 rounded-xl border border-rose-100 dark:border-rose-900/20 text-xs font-bold justify-center">
                                <AlertCircle className="w-4 h-4" /> {error}
                            </div>
                        )}

                        {result && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in zoom-in duration-300">
                                <div className="p-5 bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/20 rounded-2xl text-center">
                                    <p className="text-[9px] font-bold text-purple-600 dark:text-purple-400 uppercase mb-1">{result.percent}% Value</p>
                                    <h2 className="text-2xl font-black text-slate-800 dark:text-white">{result.value}</h2>
                                </div>
                                <div className="p-5 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 rounded-2xl text-center">
                                    <p className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase mb-1">With Increase</p>
                                    <h2 className="text-2xl font-black text-slate-800 dark:text-white">{result.increase}</h2>
                                </div>
                                <div className="p-5 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/20 rounded-2xl text-center">
                                    <p className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-1">With Discount</p>
                                    <h2 className="text-2xl font-black text-slate-800 dark:text-white">{result.decrease}</h2>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Info Cards - Exact content from your code */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                        <div className="flex items-center gap-2 mb-3 text-purple-600">
                            <ShoppingBag className="w-4 h-4" />
                            <h3 className="font-bold text-sm tracking-tight uppercase">Shopping Tip</h3>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
                            Use the <strong className="text-slate-700 dark:text-zinc-300">"With Discount"</strong> result to quickly find the final price of an item during a sale. (Original Price - Discounted Amount).
                        </p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                        <div className="flex items-center gap-2 mb-3 text-indigo-600">
                            <TrendingUp className="w-4 h-4" />
                            <h3 className="font-bold text-sm tracking-tight uppercase">Business Growth</h3>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
                            Use the <strong className="text-slate-700 dark:text-zinc-300">"With Increase"</strong> result to calculate markups, VAT/Tax, or profit margins on your services or products.
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center text-[10px] text-slate-400 dark:text-zinc-600 font-bold uppercase tracking-widest">
                    <p>Financial Precision Tools &copy; 2026</p>
                </div>

            </div>
        </div>
    );
}