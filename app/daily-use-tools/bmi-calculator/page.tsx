'use client';

import { useState } from 'react';

export default function BMICalculatorPage() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [result, setResult] = useState<{ bmi: string; status: string; color: string } | null>(null);
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
        const bmi = w / (heightInMeters * heightInMeters);
        const bmiString = bmi.toFixed(1);
        
        let status = '';
        let color = '';

        if (bmi < 18.5) {
            status = 'Underweight 😟';
            color = 'text-yellow-500';
        } else if (bmi < 25) {
            status = 'Normal ✅';
            color = 'text-green-500';
        } else if (bmi < 30) {
            status = 'Overweight ⚠️';
            color = 'text-orange-500';
        } else {
            status = 'Obese ❌';
            color = 'text-red-500';
        }

        setResult({ bmi: bmiString, status, color });
        setError('');
    };

    return (
        <main className="p-4 sm:p-6 md:p-8">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🧮 BMI ক্যালকুলেটর</h2>
                    <div className="w-24 h-1 bg-blue-500 mt-2"></div>
                </div>

                <div className="text-gray-700 dark:text-gray-300 space-y-2 mb-8">
                    <p>BMI (Body Mass Index) বা দেহ ভর সূচক শরীরের ওজন ও উচ্চতার অনুপাত পরিমাপ করে।</p>
                    <p>BMI = ওজন (কেজি) / [উচ্চতা (মিটার)]²</p>
                    <p>স্বাস্থ্যকর BMI রেঞ্জ: ১৮.৫ - ২৪.৯ kg/m²</p>
                    <p>কম ওজন: ১৮.৫ এর নিচে, স্বাভাবিক: ১৮.৫-২৪.৯, অতিরিক্ত ওজন: ২৫-২৯.৯, স্থূলতা: ৩০+</p>
                    <p>BMI শুধুমাত্র একটি নির্দেশক, প্রকৃত স্বাস্থ্য অবস্থার সম্পূর্ণ চিত্র দেয় না।</p>
                </div>

                <div className="max-w-md mx-auto text-center">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Calculate Your BMI</h3>
                    <div className="space-y-4">
                        <input 
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="Height (cm)"
                            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                        <input 
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Weight (kg)"
                            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button 
                        onClick={calculateBMI}
                        className="w-full mt-6 py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Calculate BMI
                    </button>

                    {error && (
                        <div className="mt-6 text-red-500 font-semibold">
                            {error}
                        </div>
                    )}

                    {result && (
                        <div className={`mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg`}>
                            <p className="text-xl font-bold text-gray-800 dark:text-gray-200">Your BMI is: <span className={result.color}>{result.bmi}</span></p>
                            <p className={`text-lg font-semibold ${result.color}`}>{result.status}</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
