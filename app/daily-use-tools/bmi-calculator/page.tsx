'use client';

import { useState } from 'react';
import { Activity, Scale, Ruler, Info, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

export default function BMICalculatorPage() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [result, setResult] = useState(null);
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
            color = 'text-yellow-500';
            percentage = (bmi / 40) * 100;
        } else if (bmi < 25) {
            status = 'Normal Weight';
            color = 'text-green-500';
            percentage = (bmi / 40) * 100;
        } else if (bmi < 30) {
            status = 'Overweight';
            color = 'text-orange-500';
            percentage = (bmi / 40) * 100;
        } else {
            status = 'Obese';
            color = 'text-red-500';
            percentage = Math.min((bmi / 40) * 100, 100);
        }

        setResult({ bmi, status, color, percentage });
        setError('');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-10 px-4">
            <div className="max-w-4xl mx-auto">
                
                {/* Header Section */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-zinc-800 mb-8">
                    <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-8 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            <Activity className="w-8 h-8" />
                            <h1 className="text-2xl sm:text-3xl font-bold">BMI Calculator</h1>
                        </div>
                        <p className="text-rose-100 text-sm">Check your Body Mass Index and health status instantly.</p>
                    </div>

                    <div className="p-6 sm:p-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            
                            {/* Input Form */}
                            <div className="space-y-6">
                                <div>
                                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
                                        <Ruler className="w-4 h-4" /> Height (cm)
                                    </label>
                                    <input 
                                        type="number"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                        placeholder="e.g. 170"
                                        className="w-full p-4 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 transition-all outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
                                        <Scale className="w-4 h-4" /> Weight (kg)
                                    </label>
                                    <input 
                                        type="number"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        placeholder="e.g. 65"
                                        className="w-full p-4 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 transition-all outline-none"
                                    />
                                </div>
                                <button 
                                    onClick={calculateBMI}
                                    className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    Calculate BMI <ChevronRight className="w-5 h-5" />
                                </button>
                                {error && (
                                    <p className="flex items-center gap-2 text-red-500 text-sm font-medium mt-2">
                                        <AlertCircle className="w-4 h-4" /> {error}
                                    </p>
                                )}
                            </div>

                            {/* Result Display */}
                            <div className="flex flex-col justify-center h-full min-h-[250px] bg-gray-50 dark:bg-zinc-800/50 rounded-3xl p-8 border border-dashed border-gray-200 dark:border-zinc-700">
                                {result ? (
                                    <div className="text-center space-y-4">
                                        <p className="text-gray-500 dark:text-zinc-400 font-medium">Your Result</p>
                                        <h2 className={`text-6xl font-black ${result.color}`}>{result.bmi}</h2>
                                        <div className="flex items-center justify-center gap-2">
                                            <CheckCircle2 className={`w-5 h-5 ${result.color}`} />
                                            <span className={`text-xl font-bold ${result.color}`}>{result.status}</span>
                                        </div>
                                        
                                        {/* BMI Gauge Bar */}
                                        <div className="mt-8 pt-4">
                                            <div className="h-3 w-full bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden flex">
                                                <div className="h-full bg-yellow-400" style={{width: '25%'}}></div>
                                                <div className="h-full bg-green-500" style={{width: '25%'}}></div>
                                                <div className="h-full bg-orange-400" style={{width: '25%'}}></div>
                                                <div className="h-full bg-red-500" style={{width: '25%'}}></div>
                                            </div>
                                            <div className="relative w-full h-4">
                                                <div 
                                                    className="absolute top-[-12px] transition-all duration-1000"
                                                    style={{ left: `${result.percentage}%` }}
                                                >
                                                    <div className="w-3 h-3 bg-zinc-800 dark:bg-white rounded-full border-2 border-white dark:border-zinc-800 shadow-md -ml-1.5"></div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-bold px-1">
                                                <span>UNDER</span>
                                                <span>NORMAL</span>
                                                <span>OVER</span>
                                                <span>OBESE</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-400 dark:text-zinc-500">
                                        <Activity className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                        <p>Enter your details to see <br /> your BMI results</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* English Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
                        <h3 className="font-bold text-gray-800 dark:text-zinc-200 mb-2 flex items-center gap-2">
                            <Info className="w-4 h-4 text-blue-500" /> What is BMI?
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-zinc-400">
                            Body Mass Index (BMI) is a measurement of a person's leanness or corpulence based on their height and weight.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 md:col-span-2">
                        <h3 className="font-bold text-gray-800 dark:text-zinc-200 mb-4 flex items-center gap-2">
                            📊 BMI Categories (World Health Organization)
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl">
                                <p className="text-[10px] font-bold text-yellow-600 tracking-tighter uppercase">Underweight</p>
                                <p className="text-sm font-bold text-gray-700 dark:text-zinc-300">&lt; 18.5</p>
                            </div>
                            <div className="text-center p-3 bg-green-50 dark:bg-green-900/10 rounded-xl">
                                <p className="text-[10px] font-bold text-green-600 tracking-tighter uppercase">Normal</p>
                                <p className="text-sm font-bold text-gray-700 dark:text-zinc-300">18.5 - 24.9</p>
                            </div>
                            <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/10 rounded-xl">
                                <p className="text-[10px] font-bold text-orange-600 tracking-tighter uppercase">Overweight</p>
                                <p className="text-sm font-bold text-gray-700 dark:text-zinc-300">25 - 29.9</p>
                            </div>
                            <div className="text-center p-3 bg-red-50 dark:bg-red-900/10 rounded-xl">
                                <p className="text-[10px] font-bold text-red-600 tracking-tighter uppercase">Obese</p>
                                <p className="text-sm font-bold text-gray-700 dark:text-zinc-300">30+</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center text-[11px] text-gray-400 dark:text-zinc-600">
                    <p>* BMI is a general indicator only and does not account for muscle mass, bone density, or overall body composition.</p>
                </div>

            </div>
        </div>
    );
}