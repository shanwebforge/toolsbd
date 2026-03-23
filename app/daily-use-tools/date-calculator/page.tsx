'use client';

import { useState } from 'react';
import { Calendar, Clock, ArrowRight, Info, AlertCircle, CalendarDays, History } from 'lucide-react';

export default function DateCalculatorPage() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [result, setResult] = useState<any>(null);
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

        // Total Days
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Year, Month, Day breakdown
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
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-10 px-4">
            <div className="max-w-4xl mx-auto">
                
                {/* Main Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-zinc-800">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            <CalendarDays className="w-8 h-8" />
                            <h1 className="text-2xl sm:text-3xl font-bold">Date Calculator</h1>
                        </div>
                        <p className="text-amber-100 text-sm">Calculate the exact duration between two dates easily.</p>
                    </div>

                    <div className="p-6 sm:p-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="relative">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Start Date</label>
                                <input 
                                    type="date" 
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full p-4 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 transition-all outline-none"
                                />
                            </div>
                            <div className="relative">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">End Date</label>
                                <input 
                                    type="date" 
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full p-4 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <button 
                            onClick={calculateDuration}
                            className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow-lg shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 mb-8"
                        >
                            Calculate Duration <ArrowRight className="w-5 h-5" />
                        </button>

                        {error && (
                            <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-900/30 font-medium">
                                <AlertCircle className="w-5 h-5" /> {error}
                            </div>
                        )}

                        {result && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/20">
                                        <p className="text-sm font-bold text-amber-600 dark:text-amber-400 uppercase">Total Time</p>
                                        <h2 className="text-3xl font-black text-gray-800 dark:text-white">{result.totalDays} Days</h2>
                                    </div>
                                    <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-2xl border border-green-100 dark:border-green-900/20">
                                        <p className="text-sm font-bold text-green-600 dark:text-green-400 uppercase">Breakdown</p>
                                        <h2 className="text-xl sm:text-2xl font-black text-gray-800 dark:text-white">
                                            {result.years > 0 && `${result.years}Y `}
                                            {result.months > 0 && `${result.months}M `}
                                            {result.days} Days
                                        </h2>
                                    </div>
                                </div>
                                
                                <div className="text-center p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-zinc-400 text-sm italic">
                                    Roughly {Math.floor(result.totalDays / 7)} weeks and {result.totalDays % 7} days.
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* English Info Section */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
                        <div className="flex items-center gap-3 mb-4 text-amber-600">
                            <Clock className="w-6 h-6" />
                            <h3 className="font-bold text-lg">Use Cases</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-zinc-400">
                            <li className="flex gap-2">• Calculate project deadlines & milestones.</li>
                            <li className="flex gap-2">• Track how many days since a specific event.</li>
                            <li className="flex gap-2">• Find the exact age or tenure duration.</li>
                            <li className="flex gap-2">• Count remaining days until a vacation.</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
                        <div className="flex items-center gap-3 mb-4 text-orange-600">
                            <History className="w-6 h-6" />
                            <h3 className="font-bold text-lg">Features</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                            This tool provides a detailed breakdown of years, months, and days. It accounts for leap years and varying month lengths automatically, giving you the most accurate interval possible.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}