'use client';

import { useState } from 'react';
import { Activity, Scale, Ruler, Info, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

export default function BMICalculatorPage() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [result, setResult] = useState<{ bmi: number; status: string; color: string; percentage: number } | null>(null);
    const [error, setError] = useState('');

    const calculateBMI = () => {
        const h = parseFloat(height);
        const w = parseFloat(weight);

        if (!h || !w || h <= 0 || w <= 0) {
            setError('Please enter valid height and weight.');
            setResult(null);
            return;
        }

        const heightInMeters = h / 100;
        const bmi = parseFloat((w / (heightInMeters * heightInMeters)).toFixed(1));
        
        let status = '';
        let color = '';
        let percentage = 0;

        if (bmi < 18.5) {
            status = 'Underweight';
            color = 'text-amber-500';
            percentage = (bmi / 40) * 100;
        } else if (bmi < 25) {
            status = 'Normal Weight';
            color = 'text-emerald-500';
            percentage = (bmi / 40) * 100;
        } else if (bmi < 30) {
            status = 'Overweight';
            color = 'text-indigo-600';
            percentage = (bmi / 40) * 100;
        } else {
            status = 'Obese';
            color = 'text-rose-600';
            percentage = Math.min((bmi / 40) * 100, 100);
        }

        setResult({ bmi, status, color, percentage });
        setError('');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-8 px-4">
            <div className="max-w-4xl mx-auto mt-4">
                
                {/* Header Section - Kept your original structure but changed colors */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm overflow-hidden border border-slate-200 dark:border-zinc-800 mb-6">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 text-white">
                        <div className="flex items-center gap-3 mb-1">
                            <Activity className="w-6 h-6" />
                            <h1 className="text-xl font-bold">BMI Calculator</h1>
                        </div>
                        <p className="text-purple-100 text-xs opacity-90">Check your Body Mass Index and health status instantly.</p>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            
                            {/* Input Form - Compacted */}
                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                                        <Ruler className="w-3.5 h-3.5 text-purple-500" /> Height (cm)
                                    </label>
                                    <input 
                                        type="number"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                        placeholder="e.g. 170"
                                        className="w-full p-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                                        <Scale className="w-3.5 h-3.5 text-purple-500" /> Weight (kg)
                                    </label>
                                    <input 
                                        type="number"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        placeholder="e.g. 65"
                                        className="w-full p-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                    />
                                </div>
                                <button 
                                    onClick={calculateBMI}
                                    className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
                                >
                                    Calculate BMI <ChevronRight className="w-4 h-4" />
                                </button>
                                {error && (
                                    <p className="flex items-center gap-2 text-rose-500 text-xs font-medium justify-center">
                                        <AlertCircle className="w-3.5 h-3.5" /> {error}
                                    </p>
                                )}
                            </div>

                            {/* Result Display - Kept your specific logic and layout */}
                            <div className="flex flex-col justify-center min-h-[220px] bg-slate-50/50 dark:bg-zinc-800/40 rounded-2xl p-6 border border-dashed border-slate-200 dark:border-zinc-700">
                                {result ? (
                                    <div className="text-center space-y-3">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Your Result</p>
                                        <h2 className={`text-5xl font-black ${result.color}`}>{result.bmi}</h2>
                                        <div className="flex items-center justify-center gap-2">
                                            <CheckCircle2 className={`w-4 h-4 ${result.color}`} />
                                            <span className={`text-lg font-bold ${result.color}`}>{result.status}</span>
                                        </div>
                                        
                                        <div className="mt-4 pt-2">
                                            <div className="h-2 w-full bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden flex">
                                                <div className="h-full bg-amber-400" style={{width: '25%'}}></div>
                                                <div className="h-full bg-emerald-500" style={{width: '25%'}}></div>
                                                <div className="h-full bg-indigo-500" style={{width: '25%'}}></div>
                                                <div className="h-full bg-rose-500" style={{width: '25%'}}></div>
                                            </div>
                                            <div className="relative w-full h-2">
                                                <div 
                                                    className="absolute top-[-10px] transition-all duration-1000"
                                                    style={{ left: `${result.percentage}%` }}
                                                >
                                                    <div className="w-2.5 h-2.5 bg-zinc-800 dark:bg-white rounded-full border-2 border-white dark:border-zinc-800 shadow-sm -ml-1.25"></div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between text-[8px] text-slate-400 mt-3 font-bold px-1 uppercase tracking-tighter">
                                                <span>Under</span>
                                                <span>Normal</span>
                                                <span>Over</span>
                                                <span>Obese</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center text-slate-400">
                                        <Activity className="w-10 h-10 mx-auto mb-3 opacity-20" />
                                        <p className="text-xs font-medium">Enter your details to see <br /> your BMI results</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Original Info Sections - Kept all details and structure */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                        <h3 className="font-bold text-xs text-slate-800 dark:text-zinc-200 mb-2 flex items-center gap-2 uppercase tracking-wide">
                            <Info className="w-3.5 h-3.5 text-purple-500" /> What is BMI?
                        </h3>
                        <p className="text-[11px] leading-relaxed text-slate-500 dark:text-zinc-400">
                            Body Mass Index (BMI) is a measurement of a person's leanness or corpulence based on their height and weight.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm md:col-span-2">
                        <h3 className="font-bold text-xs text-slate-800 dark:text-zinc-200 mb-4 flex items-center gap-2 uppercase tracking-wide">
                            📊 BMI Categories (WHO)
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="text-center p-2.5 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/20">
                                <p className="text-[8px] font-bold text-amber-600 uppercase">Underweight</p>
                                <p className="text-xs font-bold text-slate-700 dark:text-zinc-300">&lt; 18.5</p>
                            </div>
                            <div className="text-center p-2.5 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-900/20">
                                <p className="text-[8px] font-bold text-emerald-600 uppercase">Normal</p>
                                <p className="text-xs font-bold text-slate-700 dark:text-zinc-300">18.5 - 24.9</p>
                            </div>
                            <div className="text-center p-2.5 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-900/20">
                                <p className="text-[8px] font-bold text-indigo-600 uppercase">Overweight</p>
                                <p className="text-xs font-bold text-slate-700 dark:text-zinc-300">25 - 29.9</p>
                            </div>
                            <div className="text-center p-2.5 bg-rose-50 dark:bg-rose-900/10 rounded-xl border border-rose-100 dark:border-rose-900/20">
                                <p className="text-[8px] font-bold text-rose-600 uppercase">Obese</p>
                                <p className="text-xs font-bold text-slate-700 dark:text-zinc-300">30+</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center text-[10px] text-slate-400 dark:text-zinc-600 font-medium">
                    <p>* BMI is a general indicator only and does not account for muscle mass or overall body composition.</p>
                </div>

            </div>
        </div>
    );
}