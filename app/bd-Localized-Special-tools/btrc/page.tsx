'use client';

import { useState } from 'react';

export default function BTRCPage() {
    const [copied, setCopied] = useState(false);
    const brtaLink = "https://www.brta.gov.bd/site/page/12fca8a4-84e2-4002-bdf4-34768e5e42bd";

    const handleCopy = () => {
        navigator.clipboard.writeText(brtaLink).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <main className="p-4 sm:p-6 md:p-8">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🚗 গাড়ি রেজিস্ট্রেশন তথ্য</h2>
                    <div className="w-24 h-1 bg-blue-500 mt-2"></div>
                </div>

                <div className="text-gray-700 dark:text-gray-300 mb-6">
                    <p>গাড়ির নাম্বার দিয়ে বাংলাদেশ রোড ট্রান্সপোর্ট অথরিটি (BRTA) এর ওয়েবসাইটে যাচাই করতে নিচের লিংক ব্যবহার করুন।</p>
                </div>

                <div>
                    <input 
                        type="text" 
                        id="vehicleNumber" 
                        placeholder="যেমনঃ ঢাকা-মেট্রো-গ ১২৩৪৫৬" 
                        className="w-full p-3 mb-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    />

                    <div className="bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="font-semibold text-blue-800 dark:text-blue-200 break-all text-left flex-1">
                            {brtaLink}
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                            <button 
                                onClick={handleCopy}
                                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
                            >
                                Copy
                            </button>
                            <a 
                                href={brtaLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 whitespace-nowrap"
                            >
                                Visit
                            </a>
                        </div>
                    </div>

                    {copied && (
                        <div className="mt-4 text-center text-green-600 dark:text-green-400 font-semibold">
                            ✅ লিংক কপি হয়েছে!
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
