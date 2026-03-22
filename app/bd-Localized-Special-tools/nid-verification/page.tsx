'use client';

import { useState } from 'react';

export default function NIDVerificationPage() {
    const [copied, setCopied] = useState(false);
    const nidLink = "https://services.nidw.gov.bd/nid-pub/";

    const copyLink = () => {
        navigator.clipboard.writeText(nidLink).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        });
    };

    return (
        <main className="p-4 sm:p-6 md:p-8">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🔎 NID Verification Link Info</h2>
                    <div className="w-24 h-1 bg-blue-500 mt-2"></div>
                </div>

                <div className="text-gray-700 dark:text-gray-300 mb-6">
                    <p>আপনি যদি আপনার জাতীয় পরিচয়পত্র (NID) অনলাইনে যাচাই করতে চান, তাহলে নিচের অফিসিয়াল লিংকে গিয়ে আপনার তথ্য যাচাই করতে পারবেন।</p>
                </div>

                <div>
                    <div className="bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="font-semibold text-blue-800 dark:text-blue-200 break-all text-left flex-1">
                            {nidLink}
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                            <button 
                                onClick={copyLink}
                                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
                            >
                                Copy
                            </button>
                            <a 
                                href={nidLink} 
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
                            ✅ Link copied to clipboard!
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
