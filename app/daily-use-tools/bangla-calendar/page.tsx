'use client';

import { useState } from 'react';

const banglaMonths = [
    "বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন",
    "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"
];

function isLeapYear(year: number) {
    return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}

function convertToBanglaDate(gregorianDate: string) {
    const date = new Date(gregorianDate);
    if (isNaN(date.getTime())) return null;

    const gy = date.getFullYear();
    const gm = date.getMonth() + 1; // 1-based
    const gd = date.getDate();

    let banglaYear;
    if (gm > 4 || (gm === 4 && gd >= 14)) {
        banglaYear = gy - 593;
    } else {
        banglaYear = gy - 594;
    }

    const banglaMonthStartDates = [
        { month: 4, day: 14 },  // বৈশাখ
        { month: 5, day: 15 },  // জ্যৈষ্ঠ
        { month: 6, day: 15 },  // আষাঢ়
        { month: 7, day: 16 },  // শ্রাবণ
        { month: 8, day: 16 },  // ভাদ্র
        { month: 9, day: 16 },  // আশ্বিন
        { month: 10, day: 16 }, // কার্তিক
        { month: 11, day: 15 }, // অগ্রহায়ণ
        { month: 12, day: 15 }, // পৌষ
        { month: 1, day: 14 },  // মাঘ
        { month: 2, day: 13 },  // ফাল্গুন
        { month: 3, day: 15 },  // চৈত্র
    ];

    const falgunLength = isLeapYear(gy) ? 30 : 29;

    const monthLengths = [
        31, 31, 31, 31, 31, 30, 30, 30, 30, 30, falgunLength, 30
    ];

    function daysDiff(year: number, month: number, day: number, baseMonth: number, baseDay: number) {
        let d1 = new Date(year, month - 1, day);
        let d2;
        if (baseMonth < month || (baseMonth === month && baseDay <= day)) {
            d2 = new Date(year, baseMonth - 1, baseDay);
        } else {
            d2 = new Date(year - 1, baseMonth - 1, baseDay);
        }
        let diffTime = d1.getTime() - d2.getTime();
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }

    let banglaMonthIndex = 0;
    let banglaDay = 0;

    for (let i = 0; i < banglaMonthStartDates.length; i++) {
        const { month: bm, day: bd } = banglaMonthStartDates[i];
        const diff = daysDiff(gy, gm, gd, bm, bd);

        if (diff >= 0) {
            let currentMonthLength = monthLengths[i];
            if (i === 10) { // Falgun
                currentMonthLength = isLeapYear(gy) ? 31 : 30;
            } 

            if (diff < currentMonthLength) {
                 banglaMonthIndex = i;
                 banglaDay = diff + 1;
            }
        }
    }

    return {
        year: banglaYear,
        month: banglaMonths[banglaMonthIndex],
        day: banglaDay
    };
}

export default function BanglaCalendarPage() {
    const [gregorianDate, setGregorianDate] = useState('');
    const [result, setResult] = useState('');

    const handleConvert = () => {
        if (!gregorianDate) {
            alert('অনুগ্রহ করে ইংরেজি তারিখ নির্বাচন করুন।');
            return;
        }

        const banglaDate = convertToBanglaDate(gregorianDate);
        if (!banglaDate) {
            setResult('অবৈধ তারিখ');
            return;
        }

        setResult(`${banglaDate.year} সন, ${banglaDate.month} ${banglaDate.day} তারিখ`);
    };

    return (
        <main className="p-4 sm:p-6 md:p-8">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">বাংলা ক্যালেন্ডার</h2>
                    <div className="w-24 h-1 bg-blue-500 mt-2"></div>
                </div>

                <div className="text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                    <p>বাংলা ক্যালেন্ডার বা বঙ্গাব্দ বাংলা ভাষাভাষী অঞ্চলে ব্যবহৃত একটি সৌর ক্যালেন্ডার</p>
                    <p>বাংলা সন চালু করেন মুঘল সম্রাট আকবর, যা শুরু হয় ১৫৮৪ খ্রিস্টাব্দ থেকে</p>
                    <p>বাংলা বছরের প্রথম মাস বৈশাখ এবং শেষ মাস চৈত্র</p>
                    <p>পহেলা বৈশাখ বাংলা নববর্ষ হিসেবে বাংলাদেশ ও পশ্চিমবঙ্গে পালিত হয়</p>
                    <p>বাংলা ক্যালেন্ডারে ১২ মাস, প্রতিটি মাস ২৯-৩২ দিনের হয়ে থাকে</p>
                    <p>বাংলা তারিখ অনুযায়ী বিভিন্ন ফসলি উৎসব ও ধর্মীয় অনুষ্ঠান পালিত হয়</p>
                </div>

                <div className="max-w-md mx-auto text-center">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">ইংরেজি থেকে বাংলা তারিখ রূপান্তর</h3>
                    <input 
                        type="date" 
                        value={gregorianDate}
                        onChange={(e) => setGregorianDate(e.target.value)}
                        className="w-full max-w-xs p-3 mb-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button 
                        onClick={handleConvert}
                        className="w-full max-w-xs py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        রূপান্তর করো
                    </button>

                    {result && (
                        <div className="mt-6 text-xl font-bold text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-700 rounded-lg p-4 max-w-xs mx-auto">
                            {result}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
