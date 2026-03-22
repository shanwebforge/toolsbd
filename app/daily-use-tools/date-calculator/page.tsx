'use client';

import { useState } from 'react';

export default function DateCalculatorPage() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const calculateDuration = () => {
        if (!startDate || !endDate) {
            setError('অনুগ্রহ করে দুটি তারিখ নির্বাচন করুন।');
            setResult('');
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (end < start) {
            setError('শেষ তারিখ শুরুর তারিখের আগে হতে পারে না।');
            setResult('');
            return;
        }

        // Difference in days
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Difference in years, months, days
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
        setResult(`মোট পার হয়েছে <strong>${diffDays}</strong> দিন<br /> অথবা <strong>${years} বছর, ${months} মাস, ${days} দিন</strong>`);
    };

    return (
        <main className="p-4 sm:p-6 md:p-8">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📅 তারিখ ক্যালকুলেটর</h2>
                    <div className="w-24 h-1 bg-blue-500 mt-2"></div>
                </div>

                <div className="text-gray-700 dark:text-gray-300 space-y-2 mb-8">
                    <p>দুটি তারিখের মধ্যে দিন, সপ্তাহ বা মাসের পার্থক্য গণনা করুন।</p>
                    <p>যে কোনো তারিখ থেকে দিন যোগ বা বিয়োগ করে ভবিষ্যৎ বা অতীত তারিখ খুঁজুন।</p>
                    <p>জন্ম তারিখ থেকে বর্তমান পর্যন্ত আপনার সঠিক বয়স গণনা করুন।</p>
                    <p>একটি নির্দিষ্ট তারিখ কোন বার পড়ে তা খুঁজে বের করুন।</p>
                    <p>সপ্তাহান্ত বাদ দিয়ে দুটি তারিখের মধ্যে কর্মদিবস গণনা করুন।</p>
                </div>

                <div className="max-w-lg mx-auto text-center">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Calculate Duration Between Dates</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="startDate" className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date:</label>
                            <input 
                                type="date" 
                                id="startDate" 
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="endDate" className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date:</label>
                            <input 
                                type="date" 
                                id="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <button 
                        onClick={calculateDuration}
                        className="w-full max-w-sm py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Calculate Duration
                    </button>

                    {error && (
                        <div className="mt-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg font-semibold">
                            {error}
                        </div>
                    )}

                    {result && (
                        <div 
                            className="mt-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg font-semibold text-lg"
                            dangerouslySetInnerHTML={{ __html: result }}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}
