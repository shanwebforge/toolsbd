'use client';

import { useState } from 'react';
import { Calendar, Clock, ArrowRight, AlertCircle, CalendarDays, History, Info } from 'lucide-react';

export default function DateCalculatorPage() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [result, setResult] = useState<{ totalDays: number; years: number; months: number; days: number } | null>(null);
    const [error, setError] = useState('');

    const calculateDuration = () => {
        if (!startDate || !endDate) {
            setError('Please select both start and end dates.');
            setResult(null);
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (end < start) {
            setError('End date cannot be earlier than start date.');
            setResult(null);
            return;
        }

        const diffTime = Math.abs(end.getTime() - start.getTime());
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }
        
        setError('');
        setResult({ totalDays, years, months, days });
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-8 px-4">
            <div className="max-w-4xl mx-auto mt-4">
                
                {/* Main Compact Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm overflow-hidden border border-slate-200 dark:border-zinc-800 mb-6">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 text-white">
                        <div className="flex items-center gap-3 mb-1">
                            <CalendarDays className="w-6 h-6" />
                            <h1 className="text-xl font-bold tracking-tight">Date Calculator</h1>
                        </div>
                        <p className="text-purple-100 text-xs opacity-90 font-medium">Calculate the exact duration between two dates easily.</p>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                            <div className="relative">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Start Date</label>
                                <input 
                                    type="date" 
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full p-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all outline-none"
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">End Date</label>
                                <input 
                                    type="date" 
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full p-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <button 
                            onClick={calculateDuration}
                            className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md shadow-purple-500/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mb-6 text-sm"
                        >
                            Calculate Duration <ArrowRight className="w-4 h-4" />
                        </button>

                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-rose-50 dark:bg-rose-900/10 text-rose-600 dark:text-rose-400 rounded-xl border border-rose-100 dark:border-rose-900/20 text-xs font-bold">
                                <AlertCircle className="w-4 h-4" /> {error}
                            </div>
                        )}

                        {result && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-purple-50 dark:bg-purple-900/10 p-5 rounded-2xl border border-purple-100 dark:border-purple-900/20">
                                        <p className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1">Total Time</p>
                                        <h2 className="text-2xl font-black text-slate-800 dark:text-white">{result.totalDays} Days</h2>
                                    </div>
                                    <div className="bg-indigo-50 dark:bg-indigo-900/10 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-900/20">
                                        <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">Detailed Breakdown</p>
                                        <h2 className="text-xl font-black text-slate-800 dark:text-white">
                                            {result.years > 0 && `${result.years}Y `}
                                            {result.months > 0 && `${result.months}M `}
                                            {result.days} Days
                                        </h2>
                                    </div>
                                </div>
                                
                                <div className="text-center p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-dashed border-slate-200 dark:border-zinc-700 text-slate-500 dark:text-zinc-400 text-[11px] font-medium italic">
                                    Roughly {Math.floor(result.totalDays / 7)} weeks and {result.totalDays % 7} days.
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Original Info Section - All content preserved */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                        <div className="flex items-center gap-2 mb-3 text-purple-600">
                            <Clock className="w-4 h-4" />
                            <h3 className="font-bold text-sm tracking-tight uppercase">Use Cases</h3>
                        </div>
                        <ul className="space-y-1.5 text-[11px] text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">
                            <li className="flex gap-2">• Calculate project deadlines & milestones.</li>
                            <li className="flex gap-2">• Track how many days since a specific event.</li>
                            <li className="flex gap-2">• Find the exact age or tenure duration.</li>
                            <li className="flex gap-2">• Count remaining days until a vacation.</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                        <div className="flex items-center gap-2 mb-3 text-indigo-600">
                            <History className="w-4 h-4" />
                            <h3 className="font-bold text-sm tracking-tight uppercase">Features</h3>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
                            This tool provides a detailed breakdown of years, months, and days. It accounts for leap years and varying month lengths automatically, giving you the most accurate interval possible.
                        </p>
                    </div>
                </div>

                {/* Accuracy Disclaimer */}
                <div className="mt-8 text-center text-[10px] text-slate-400 dark:text-zinc-600 font-bold uppercase tracking-widest">
                    <p>Verified Accuracy &bull; Standard Calendar Logic</p>
                </div>

            </div>
        </div>
    );
}