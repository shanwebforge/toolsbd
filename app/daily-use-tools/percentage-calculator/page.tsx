'use client';

import { useState } from 'react';
import { Percent, calculator as CalcIcon, RefreshCcw, TrendingUp, ShoppingBag, Info, AlertCircle } from 'lucide-react';

export default function PercentageCalculatorPage() {
    const [originalValue, setOriginalValue] = useState('');
    const [percentage, setPercentage] = useState('');
    const [result, setResult] = useState<any>(null);
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
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-10 px-4">
            <div className="max-w-4xl mx-auto">
                
                {/* Header Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 dark:border-zinc-800 mb-8">
                    <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-8 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            <Percent className="w-8 h-8" />
                            <h1 className="text-2xl sm:text-3xl font-bold">Percentage Calculator</h1>
                        </div>
                        <p className="text-rose-100 text-sm">Easily calculate discounts, tax, and percentage differences.</p>
                    </div>

                    <div className="p-6 sm:p-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Original Amount</label>
                                <input 
                                    type="number" 
                                    value={originalValue}
                                    onChange={(e) => setOriginalValue(e.target.value)}
                                    placeholder="e.g. 1000"
                                    className="w-full p-4 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 transition-all outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Percentage (%)</label>
                                <input 
                                    type="number" 
                                    value={percentage}
                                    onChange={(e) => setPercentage(e.target.value)}
                                    placeholder="e.g. 15"
                                    className="w-full p-4 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <button 
                            onClick={calculatePercentage}
                            className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 mb-8"
                        >
                            <RefreshCcw className="w-5 h-5" /> Calculate Results
                        </button>

                        {error && (
                            <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-900/30">
                                <AlertCircle className="w-5 h-5" /> {error}
                            </div>
                        )}

                        {result && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in zoom-in duration-300">
                                <div className="p-6 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20 rounded-3xl text-center">
                                    <p className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase mb-1">{result.percent}% Value</p>
                                    <h2 className="text-3xl font-black text-gray-800 dark:text-white">{result.value}</h2>
                                </div>
                                <div className="p-6 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-3xl text-center">
                                    <p className="text-[10px] font-black text-green-600 dark:text-green-400 uppercase mb-1">With Increase</p>
                                    <h2 className="text-2xl font-black text-gray-800 dark:text-white">{result.increase}</h2>
                                </div>
                                <div className="p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-3xl text-center">
                                    <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase mb-1">With Discount</p>
                                    <h2 className="text-2xl font-black text-gray-800 dark:text-white">{result.decrease}</h2>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Helper Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-gray-100 dark:border-zinc-800">
                        <div className="flex items-center gap-3 mb-4 text-rose-500">
                            <ShoppingBag className="w-6 h-6" />
                            <h3 className="font-bold text-lg">Shopping Tip</h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-zinc-500 leading-relaxed">
                            Use the **"With Discount"** result to quickly find the final price of an item during a sale. (Original Price - Discounted Amount).
                        </p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-gray-100 dark:border-zinc-800">
                        <div className="flex items-center gap-3 mb-4 text-emerald-500">
                            <TrendingUp className="w-6 h-6" />
                            <h3 className="font-bold text-lg">Business Growth</h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-zinc-500 leading-relaxed">
                            Use the **"With Increase"** result to calculate markups, VAT/Tax, or profit margins on your services or products.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}