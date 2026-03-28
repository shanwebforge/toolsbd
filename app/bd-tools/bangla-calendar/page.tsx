'use client';

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, History, Info, Sparkles, RefreshCcw, Landmark, Shovel } from 'lucide-react';

const banglaMonths = [
    "বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন",
    "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"
];

const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

function toBanglaNumber(n: number | string) {
    return n.toString().split('').map(num => banglaNumbers[parseInt(num)] || num).join('');
}

function isLeapYear(year: number) {
    return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}

function convertToBanglaDate(gregorianDate: string) {
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

    const falgunLength = isLeapYear(gy) ? 31 : 30;
    const monthLengths = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, falgunLength, 30];

    let currentDate = new Date(gy, gm - 1, gd);
    let banglaMonthIndex = 0;
    let banglaDay = 1;

    for (let i = 0; i < banglaMonthStartDates.length; i++) {
        let start = new Date(gy, banglaMonthStartDates[i].m - 1, banglaMonthStartDates[i].d);
        if (currentDate < start && i === 0) start = new Date(gy - 1, banglaMonthStartDates[i].m - 1, banglaMonthStartDates[i].d);
        
        let diff = Math.floor((currentDate.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        
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
    const [result, setResult] = useState<{ year: string; month: string; day: string } | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const today = new Date().toISOString().split('T')[0];
        setGregorianDate(today);
        // Initial conversion
        setResult(convertToBanglaDate(today));
    }, []);

    const handleConvert = () => {
        if (!gregorianDate) return;
        setResult(convertToBanglaDate(gregorianDate));
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0c12] text-slate-900 dark:text-slate-100 flex flex-col items-center">
            
            <div className="w-full max-w-4xl mt-8 mb-8 px-4 md:px-6">
                
                {/* Main Card */}
                <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        
                        {/* Left Side: Input */}
                        <div className="flex-1 p-6 md:p-10 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2.5 bg-purple-600 rounded-lg text-white shadow-lg shadow-purple-500/20">
                                    <CalendarIcon size={20} />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold tracking-tight leading-none">বঙ্গাব্দ ক্যালেন্ডার</h1>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Bangla Date Converter</p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
                                        ইংরেজি তারিখ সিলেক্ট করুন
                                    </label>
                                    <input 
                                        type="date" 
                                        value={gregorianDate}
                                        onChange={(e) => setGregorianDate(e.target.value)}
                                        className="w-full p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all font-semibold"
                                    />
                                </div>

                                <button 
                                    onClick={handleConvert}
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3.5 rounded-lg font-bold transition-all text-sm shadow-md shadow-purple-600/10 flex items-center justify-center gap-2 active:scale-[0.98]"
                                >
                                    <RefreshCcw size={18} /> কনভার্ট করুন
                                </button>
                            </div>

                            {/* Result Display */}
                            {result && (
                                <div className="mt-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <div className="bg-purple-50/50 dark:bg-purple-900/10 p-6 rounded-lg border border-purple-100 dark:border-purple-900/20 text-center relative overflow-hidden group">
                                        <Sparkles className="absolute top-2 right-2 text-purple-200 dark:text-purple-800" size={20} />
                                        <span className="block text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2">আজকের বাংলা তারিখ</span>
                                        <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100">
                                            {result.day} {result.month}, {result.year} বঙ্গাব্দ
                                        </h2>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Side: Quick Info */}
                        <div className="w-full md:w-80 bg-slate-50/50 dark:bg-slate-900/40 p-8 flex flex-col justify-center border-t md:border-t-0 border-slate-200 dark:border-slate-800">
                            <div className="space-y-6">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">
                                        <Landmark size={18} className="text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase">ঐতিহাসিক প্রেক্ষাপট</h3>
                                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">সম্রাট আকবর ১৫৮৪ খ্রিস্টাব্দে কর আদায়ের সুবিধার্থে বাংলা সনের প্রবর্তন করেন।</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">
                                        <Shovel size={18} className="text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase">কৃষি ও সংস্কৃতি</h3>
                                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">এটি একটি সৌর ভিত্তিক ক্যালেন্ডার যা মূলত কৃষি উৎসবের সাথে জড়িত।</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Details Section */}
                <div className="mt-12 grid md:grid-cols-2 gap-10">
                    <div className="flex gap-4">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                            <Info size={20} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">সংশোধিত গণনা পদ্ধতি</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                বর্তমানে বাংলাদেশে প্রচলিত সংশোধিত বাংলা বর্ষপঞ্জি অনুযায়ী প্রথম ৫ মাস ৩১ দিনে এবং বাকি ৭ মাস ৩০ দিনে গণনা করা হয়।
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
                            <Landmark size={20} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">সঠিক হিসাবের নিশ্চয়তা</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                লিপ-ইয়ার বা অধিবর্ষের ক্ষেত্রে ফাল্গুন মাসের সমন্বয় করে অত্যন্ত নির্ভুলভাবে এই ক্যালেন্ডার কনভার্টারটি তৈরি করা হয়েছে।
                            </p>
                        </div>
                    </div>
                </div>

                {/* Copyright Label */}
                <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
                        Precision Systems &copy; 2026
                    </p>
                </div>

            </div>
        </div>
    );
}