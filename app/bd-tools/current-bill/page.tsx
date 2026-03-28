'use client';

import { useState } from 'react';

export default function CurrentBillPage() {
    const [units, setUnits] = useState('');
    const [result, setResult] = useState('');
    const [resultColor, setResultColor] = useState('text-gray-800 dark:text-white');

    const calculateBill = () => {
        const unitValue = Number(units);

        if (isNaN(unitValue) || unitValue < 0) {
            setResult('সঠিক ইউনিট সংখ্যা লিখুন।');
            setResultColor('text-red-500');
            return;
        }

        let bill = 0;
        let remainingUnits = unitValue;

        const slabs = [
            { limit: 50, rate: 5.45 },
            { limit: 50, rate: 7.35 },    // 51-100
            { limit: 100, rate: 8.50 },   // 101-200
            { limit: 100, rate: 9.45 },   // 201-300
            { limit: 100, rate: 11.20 },  // 301-400
            { limit: Infinity, rate: 12.00 } // 401+
        ];

        let totalBill = 0;
        let unitsLeft = unitValue;

        for (const slab of slabs) {
            if (unitsLeft <= 0) break;
            const unitsInSlab = Math.min(unitsLeft, slab.limit);
            totalBill += unitsInSlab * slab.rate;
            unitsLeft -= unitsInSlab;
        }
        
        setResult(`আপনার বিদ্যুৎ বিল হবে: ${totalBill.toFixed(2)} টাকা`);
        setResultColor('text-gray-800 dark:text-white');
    };

    return (
        <main className="p-4 sm:p-6 md:p-8">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">⚡ বিদ্যুৎ বিল ক্যালকুলেটর</h2>
                    <div className="w-24 h-1 bg-blue-500 mt-2"></div>
                </div>

                <div className="text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                    <p>DPDC, DESCO, WZPDCL সহ বিভিন্ন বিভাগের বিল গণনা করুন</p>
                    <p>ইউনিট খরচ, সার্ভিস চার্জ, ভ্যাট সব মিলিয়ে মোট বিল</p>
                    <p>বিদ্যুৎ বিভাগের স্ল্যাব রেট অনুযায়ী সঠিক গণনা</p>
                    <p>মাসিক বিদ্যুৎ ব্যবহার থেকে আনুমানিক বিল দেখুন</p>
                    <p>লোডশেডিং ও অতিরিক্ত ব্যবহারের প্রভাব বিশ্লেষণ</p>
                    <p>পূর্ববর্তী মাসের সাথে বর্তমান বিলের তুলনা</p>
                </div>

                <div className="max-w-md mx-auto">
                    <label htmlFor="units" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">ব্যবহৃত ইউনিট (kWh) লিখুন:</label>
                    <input
                        type="number"
                        id="units"
                        value={units}
                        onChange={(e) => setUnits(e.target.value)}
                        placeholder="উদাহরণ: 150"
                        min="0"
                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    />

                    <button
                        onClick={calculateBill}
                        className="w-full mt-6 py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        হিসাব করুন
                    </button>

                    {result && (
                        <div className={`mt-6 text-center text-xl font-bold ${resultColor}`}>
                            {result}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
