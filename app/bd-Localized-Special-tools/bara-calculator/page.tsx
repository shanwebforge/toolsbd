'use client';

import { useState, useEffect } from 'react';

const divisions: { [key: string]: string[] } = {
    "ঢাকা": ["ঢাকা", "গাজীপুর", "মানিকগঞ্জ", "মুন্সিগঞ্জ", "নারায়ণগঞ্জ", "নরসিংদী", "কিশোরগঞ্জ"],
    "চট্টগ্রাম": ["চট্টগ্রাম", "কক্সবাজার", "ফেনী", "ব্রাহ্মণবাড়িয়া", "লক্ষ্মীপুর", "বান্দরবান", "রাঙ্গামাটি", "খাগড়াছড়ি"],
    "রাজশাহী": ["রাজশাহী", "নাটোর", "বগুড়া", "চাঁপাইনবাবগঞ্জ", "জয়পুরহাট", "পাবনা", "নওগাঁ", "সিরাজগঞ্জ"],
    "খুলনা": ["খুলনা", "যশোর", "বাগেরহাট", "মাগুরা", "মেহেরপুর", "চুয়াডাঙ্গা", "সাতক্ষীরা", "কুষ্টিয়া"],
    "বরিশাল": ["বরিশাল", "ঝালকাঠি", "পটুয়াখালী", "পিরোজপুর", "ভোলা"],
    "সিলেট": ["সিলেট", "মৌলভীবাজার", "হবিগঞ্জ", "সুনামগঞ্জ"],
    "রংপুর": ["রংপুর", "দিনাজপুর", "পঞ্চগড়", "ঠাকুরগাঁও", "গাইবান্ধা", "কুড়িগ্রাম", "লালমনিরহাট", "নীলফামারী"],
    "ময়মনসিংহ": ["ময়মনসিংহ", "জামালপুর", "নেত্রকোনা", "শেরপুর"]
};

function getRatePerKm(distance: number): number {
    if (distance <= 10) return 10;
    if (distance <= 20) return 8;
    if (distance <= 50) return 6;
    if (distance <= 100) return 5;
    return 4;
}

export default function BaraCalculator() {
    const [fromDivision, setFromDivision] = useState('');
    const [fromDistrict, setFromDistrict] = useState('');
    const [toDivision, setToDivision] = useState('');
    const [toDistrict, setToDistrict] = useState('');
    const [distance, setDistance] = useState('');
    const [result, setResult] = useState('');
    const [fromDistricts, setFromDistricts] = useState<string[]>([]);
    const [toDistricts, setToDistricts] = useState<string[]>([]);

    useEffect(() => {
        if (fromDivision) {
            setFromDistricts(divisions[fromDivision]);
        } else {
            setFromDistricts([]);
        }
        setFromDistrict('');
    }, [fromDivision]);

    useEffect(() => {
        if (toDivision) {
            setToDistricts(divisions[toDivision]);
        } else {
            setToDistricts([]);
        }
        setToDistrict('');
    }, [toDivision]);

    const calculateFare = () => {
        if (!fromDivision) {
            setResult('From বিভাগ নির্বাচন করুন।');
            return;
        }
        if (!fromDistrict) {
            setResult('From জেলা নির্বাচন করুন।');
            return;
        }
        if (!toDivision) {
            setResult('To বিভাগ নির্বাচন করুন।');
            return;
        }
        if (!toDistrict) {
            setResult('To জেলা নির্বাচন করুন।');
            return;
        }
        const distNum = parseFloat(distance);
        if (isNaN(distNum) || distNum <= 0) {
            setResult('সঠিক দূরত্ব লিখুন।');
            return;
        }

        const rate = getRatePerKm(distNum);
        const fare = distNum * rate;

        setResult(`আপনার ভাড়া হবে: ${fare.toFixed(2)} টাকা\n\nFrom: ${fromDivision} - ${fromDistrict}\nTo: ${toDivision} - ${toDistrict}\nদূরত্ব: ${distNum} কিমি\nরেট: ${rate} টাকা প্রতি কিমি`);
    };

    return (
        <main className="p-4 sm:p-6 md:p-8">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🚌 বাস ভাড়া ক্যালকুলেটর</h2>
                    <div className="w-24 h-1 bg-blue-500 mt-2"></div>
                </div>
                <div className="text-gray-700 dark:text-gray-300 mb-6">
                    <p>বাংলাদেশের বিভিন্ন রুটে বাস ভাড়া গণনা করুন</p>
                    <p>BRTC, লোকাল, AC, নন-AC বাসের ভাড়ার পার্থক্য</p>
                    <p>দূরত্ব ভিত্তিক এবং রুট নির্দিষ্ট ভাড়া গণনা</p>
                    <p>ছাত্র, বৃদ্ধ, এবং বিশেষ শ্রেণীর জন্য ছাড়ের হার</p>
                    <p>একাধিক যাত্রীর জন্য মোট ভাড়া গণনা করুন</p>
                    <p>যাত্রাপথের দূরত্ব এবং আনুমানিক সময় দেখুন</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="fromDivision" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">From বিভাগ নির্বাচন করুন:</label>
                        <select
                            id="fromDivision"
                            value={fromDivision}
                            onChange={(e) => setFromDivision(e.target.value)}
                            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">-- নির্বাচন করুন --</option>
                            {Object.keys(divisions).map(div => <option key={div} value={div}>{div}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="fromDistrict" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">From জেলা নির্বাচন করুন:</label>
                        <select
                            id="fromDistrict"
                            value={fromDistrict}
                            onChange={(e) => setFromDistrict(e.target.value)}
                            disabled={!fromDivision}
                            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                        >
                            <option value="">-- নির্বাচন করুন --</option>
                            {fromDistricts.map(dist => <option key={dist} value={dist}>{dist}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="toDivision" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">To বিভাগ নির্বাচন করুন:</label>
                        <select
                            id="toDivision"
                            value={toDivision}
                            onChange={(e) => setToDivision(e.target.value)}
                            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">-- নির্বাচন করুন --</option>
                            {Object.keys(divisions).map(div => <option key={div} value={div}>{div}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="toDistrict" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">To জেলা নির্বাচন করুন:</label>
                        <select
                            id="toDistrict"
                            value={toDistrict}
                            onChange={(e) => setToDistrict(e.target.value)}
                            disabled={!toDivision}
                            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                        >
                            <option value="">-- নির্বাচন করুন --</option>
                            {toDistricts.map(dist => <option key={dist} value={dist}>{dist}</option>)}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="distance" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">দূরত্ব লিখুন (কিলোমিটার):</label>
                        <input
                            type="number"
                            id="distance"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            placeholder="যেমন: ১০"
                            min="0"
                            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        onClick={calculateFare}
                        className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        ভাড়া হিসাব করুন
                    </button>
                </div>
                {result && (
                    <div className={`mt-6 p-4 rounded-lg whitespace-pre-line ${result.includes('টাকা') ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}`}>
                        {result}
                    </div>
                )}
            </div>
        </main>
    );
}
