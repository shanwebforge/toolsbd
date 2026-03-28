'use client';

import { useState } from 'react';

export default function BdMobileValidator() {
    const [mobileNumber, setMobileNumber] = useState('');
    const [result, setResult] = useState('');
    const [resultColor, setResultColor] = useState('');

    const validateNumber = () => {
        const bdMobileRegex = /^(013|014|015|016|017|018|019)\d{8}$/;
        if (bdMobileRegex.test(mobileNumber)) {
            setResult('✅ Valid BD Mobile Number');
            setResultColor('text-green-500');
        } else {
            setResult('❌ Invalid Number');
            setResultColor('text-red-500');
        }
    };

    return (
        <main className="p-4 sm:p-6 md:p-8">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📱 BD Mobile Number Validator</h2>
                    <div className="w-24 h-1 bg-blue-500 mt-2"></div>
                </div>
                <div className="text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                    <p>Validate Bangladeshi mobile numbers for correct format</p>
                    <p>Identify mobile operators (GP, Robi, Banglalink, Airtel, Teletalk)</p>
                    <p>Check if number is prepaid, postpaid, or MFS account</p>
                    <p>Format numbers with country code (+880) automatically</p>
                    <p>Batch validate multiple numbers at once</p>
                    <p>Detect fake or invalid mobile numbers</p>
                </div>
                <div className="max-w-md mx-auto">
                    <input
                        type="text"
                        id="mobile-input"
                        placeholder="Enter Bangladeshi Number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="w-full p-3 text-center bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                        onClick={validateNumber}
                        className="w-full mt-4 py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Validate
                    </button>
                    {result && (
                        <div className={`mt-6 text-center text-lg font-bold ${resultColor}`}>
                            {result}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
