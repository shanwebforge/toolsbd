'use client';

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, History, Info, Languages, Sparkles, RefreshCcw } from 'lucide-react';

const banglaMonths = [
    "বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন",
    "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"
];

const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

function toBanglaNumber(n) {
    return n.toString().split('').map(num => banglaNumbers[parseInt(num)] || num).join('');
}

function isLeapYear(year) {
    return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}

function convertToBanglaDate(gregorianDate) {
    const date = new Date(gregorianDate);
    if (isNaN(date.getTime())) return null;

    const gy = date.getFullYear();
    const gm = date.getMonth() + 1;
    const gd = date.getDate();

    let banglaYear = (gm > 4 || (gm === 4 && gd >= 14)) ? gy - 593 : gy - 594;

    const banglaMonthStartDates = [
        { m: 4, d: 14 }, { m: 5, d: 15 }, { m: 6, d: 15 }, { m: 7, d: 16 },
        { m: 8, d: 16 }, { m: 9, d: 16 }, { m: 10, d: 16 }, { m: 11, d: 15 },
        { m: 12, d: 15 }, { m: 1, d: 14 }, { m: 2, d: 13 }, { m: 3, d: 15 }
    ];

    const falgunLength = isLeapYear(gy) ? 31 : 30; // Revised standard
    const monthLengths = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, falgunLength, 30];

    // Simple diff logic
    let currentDate = new Date(gy, gm - 1, gd);
    let banglaMonthIndex = 0;
    let banglaDay = 1;

    for (let i = 0; i < banglaMonthStartDates.length; i++) {
        let start = new Date(gy, banglaMonthStartDates[i].m - 1, banglaMonthStartDates[i].d);
        if (currentDate < start && i === 0) start = new Date(gy - 1, banglaMonthStartDates[i].m - 1, banglaMonthStartDates[i].d);
        
        let diff = Math.floor((currentDate - start) / (1000 * 60 * 60 * 24));
        
        if (diff >= 0 && diff < monthLengths[i]) {
            banglaMonthIndex = i;
            banglaDay = diff + 1;
            break;
        }
    }

    return {
        year: toBanglaNumber(banglaYear),
        month: banglaMonths[banglaMonthIndex],
        day: toBanglaNumber(banglaDay)
    };
}

export default function BanglaCalendarPage() {
    const [gregorianDate, setGregorianDate] = useState('');
    const [result, setResult] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const today = new Date().toISOString().split('T')[0];
        setGregorianDate(today);
    }, []);

    const handleConvert = () => {
        if (!gregorianDate) return;
        const converted = convertToBanglaDate(gregorianDate);
        setResult(converted);
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-10 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                
                {/* Main Converter Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-zinc-800">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            <CalendarIcon className="w-8 h-8" />
                            <h1 className="text-2xl sm:text-3xl font-bold">Bangla Calendar</h1>
                        </div>
                        <p className="text-purple-100 text-sm sm:text-base">Convert English (Gregorian) date to Bangla date instantly.</p>
                    </div>

                    <div className="p-6 sm:p-10">
                        <div className="flex flex-col md:flex-row items-center gap-6 justify-center mb-10">
                            <div className="w-full md:w-auto">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Select Date</label>
                                <input 
                                    type="date" 
                                    value={gregorianDate}
                                    onChange={(e) => setGregorianDate(e.target.value)}
                                    className="w-full md:w-64 p-4 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all outline-none"
                                />
                            </div>
                            <button 
                                onClick={handleConvert}
                                className="w-full md:w-auto mt-6 md:mt-0 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <RefreshCcw className="w-5 h-5" /> Convert Now
                            </button>
                        </div>

                        {result && (
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative bg-white dark:bg-zinc-900 border border-purple-100 dark:border-purple-900/30 rounded-2xl p-8 text-center">
                                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2 block">Bangla Date</span>
                                    <h2 className="text-3xl sm:text-4xl font-black text-gray-800 dark:text-zinc-100">
                                        {result.day} {result.month}, {result.year} বঙ্গাব্দ
                                    </h2>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* English Description Section */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
                        <div className="flex items-center gap-3 mb-4 text-purple-600">
                            <History className="w-6 h-6" />
                            <h3 className="font-bold text-lg">Historical Origin</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                            The Bangla Calendar (Bongabdo) was introduced by Mughal Emperor Akbar in 1584 AD to streamline tax collection during the harvest season. It uniquely blends the Islamic lunar calendar with the Hindu solar calendar.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
                        <div className="flex items-center gap-3 mb-4 text-blue-600">
                            <Sparkles className="w-6 h-6" />
                            <h3 className="font-bold text-lg">Structure & Seasons</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                            A year consists of 12 months, starting with Boishakh. While the first five months have 31 days, the remaining seven have 30 days (with Falgun adjusted during leap years in the revised version).
                        </p>
                    </div>
                </div>

                <div className="mt-8 bg-zinc-100 dark:bg-zinc-900/50 p-6 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800">
                    <div className="flex items-center gap-2 mb-3">
                        <Info className="w-5 h-5 text-gray-400" />
                        <h4 className="font-bold text-sm uppercase text-gray-500 tracking-wider">Quick Facts</h4>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-zinc-400">
                        <li className="flex items-center gap-2">🟢 Pohela Boishakh is the New Year.</li>
                        <li className="flex items-center gap-2">🟢 Used for festivals & agriculture.</li>
                        <li className="flex items-center gap-2">🟢 Followed in BD & West Bengal.</li>
                        <li className="flex items-center gap-2">🟢 Calculated based on Solar system.</li>
                    </ul>
                </div>

            </div>
        </div>
    );
}