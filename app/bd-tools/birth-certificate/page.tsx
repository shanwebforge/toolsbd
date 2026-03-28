'use client';

import { useState } from 'react';

export default function BirthCertificatePage() {
    const [copied, setCopied] = useState(false);
    const link = "https://eservice.bangladesh.gov.bd/birthcertificate";

    const copyLink = () => {
        navigator.clipboard.writeText(link).then(() => {
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
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📝 জন্ম সনদ আবেদন তথ্য</h2>
                    <div className="w-24 h-1 bg-blue-500 mt-2"></div>
                </div>

                <div className="text-gray-700 dark:text-gray-300 space-y-4 text-justify">
                    <p>
                        জন্ম সনদ হলো একজন নাগরিকের জন্মের তথ্য নিশ্চিত করার একটি সরকারি দলিল। বাংলাদেশে জন্ম সনদ সাধারণত স্থানীয় ইউনিয়ন পরিষদ বা পৌরসভা অফিস থেকে পাওয়া যায়।
                    </p>
                    <p>
                        আবেদন করার জন্য প্রয়োজনীয় কাগজপত্র এবং প্রক্রিয়া সম্পর্কে বিস্তারিত জানতে অফিসিয়াল ওয়েবসাইট বা সংশ্লিষ্ট উপজেলা/জেলা সিভিল সার্জন অফিসে যোগাযোগ করতে পারেন।
                    </p>
                    <p>
                        এখন অনলাইনে জন্ম সনদের জন্য আবেদন করা যায় বাংলাদেশ সরকারের <strong>জাতীয় ই-সেবা</strong> পোর্টালের মাধ্যমে।
                    </p>
                </div>

                <div className="mt-8">
                    <div className="bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="font-semibold text-blue-800 dark:text-blue-200 break-all text-left flex-1">
                            {link}
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                            <button 
                                onClick={copyLink}
                                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
                            >
                                Copy Link
                            </button>
                            <a 
                                href={link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 whitespace-nowrap"
                            >
                                Visit Site
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
