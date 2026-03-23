'use client';

import { useState } from 'react';
import { Hash, Languages, ArrowRightLeft, Copy, Check, Info, Sparkles } from 'lucide-react';

export default function NumberToWordPage() {
    const [numberInput, setNumberInput] = useState('');
    const [language, setLanguage] = useState('bn');
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);

    const numberToBanglaWords = (num: number): string => {
        if (num === 0) return "শূন্য";
        const ones = ["", "এক", "দুই", "তিন", "চার", "পাঁচ", "ছয়", "সাত", "আট", "নয়"];
        const teens = ["দশ", "এগারো", "বারো", "তেরো", "চৌদ্দ", "পনেরো", "ষোল", "সতেরো", "আঠারো", "উনিশ"];
        const tens = ["", "", "বিশ", "ত্রিশ", "চল্লিশ", "পঞ্চাশ", "ষাট", "সত্তর", "আশি", "নব্বই"];
        
        function twoDigitWords(n: number): string {
            if (n < 10) return ones[n];
            else if (n >= 10 && n < 20) return teens[n - 10];
            else {
                let t = Math.floor(n / 10);
                let o = n % 10;
                return tens[t] + (o > 0 ? " " + ones[o] : "");
            }
        }

        let word = "";
        let crore = Math.floor(num / 10000000);
        num = num % 10000000;
        let lakh = Math.floor(num / 100000);
        num = num % 100000;
        let thousand = Math.floor(num / 1000);
        num = num % 1000;
        let hundred = Math.floor(num / 100);
        num = num % 100;

        if (crore > 0) word += numberToBanglaWords(crore) + " কোটি ";
        if (lakh > 0) word += twoDigitWords(lakh) + " লাখ ";
        if (thousand > 0) word += twoDigitWords(thousand) + " হাজার ";
        if (hundred > 0) word += ones[hundred] + " শত ";
        if (num > 0) word += twoDigitWords(num);
        
        return word.trim();
    };

    const numberToEnglishWords = (num: number): string => {
        if (num === 0) return "zero";
        const a = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
        const b = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

        function inWords(n: number): string {
            if (n < 20) return a[n];
            if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? "-" + a[n % 10] : "");
            if (n < 1000) return a[Math.floor(n / 100)] + " hundred" + (n % 100 ? " and " + inWords(n % 100) : "");
            if (n < 1000000) return inWords(Math.floor(n / 1000)) + " thousand" + (n % 1000 ? " " + inWords(n % 1000) : "");
            if (n < 1000000000) return inWords(Math.floor(n / 1000000)) + " million" + (n % 1000000 ? " " + inWords(n % 1000000) : "");
            return inWords(Math.floor(n / 1000000000)) + " billion" + (n % 1000000000 ? " " + inWords(n % 1000000000) : "");
        }
        return inWords(num).trim();
    };

    const handleConvert = () => {
        const num = parseInt(numberInput);
        if (isNaN(num) || num < 0) {
            setResult(language === 'bn' ? "সঠিক সংখ্যা দিন।" : "Please enter a valid number.");
            return;
        }
        const converted = language === 'bn' ? numberToBanglaWords(num) : numberToEnglishWords(num);
        setResult(converted.charAt(0).toUpperCase() + converted.slice(1));
    };

    const copyToClipboard = () => {
        if (!result) return;
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-10 px-4">
            <div className="max-w-4xl mx-auto">
                
                {/* Main Converter Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 dark:border-zinc-800 mb-8">
                    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-8 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            <Hash className="w-8 h-8" />
                            <h1 className="text-2xl sm:text-3xl font-bold">Number to Words</h1>
                        </div>
                        <p className="text-violet-100 text-sm">Convert any numeric value into written text format instantly.</p>
                    </div>

                    <div className="p-6 sm:p-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Enter Number</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        value={numberInput}
                                        onChange={(e) => setNumberInput(e.target.value)}
                                        placeholder="e.g. 1250"
                                        className="w-full p-4 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Select Language</label>
                                <div className="relative">
                                    <select 
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="w-full p-4 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 transition-all outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="bn">Bengali (বাংলা)</option>
                                        <option value="en">English (ইংরেজি)</option>
                                    </select>
                                    <Languages className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={handleConvert}
                            className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl shadow-lg shadow-violet-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 mb-8"
                        >
                            Convert Now <ArrowRightLeft className="w-5 h-5" />
                        </button>

                        {result && (
                            <div className="relative group animate-in fade-in zoom-in duration-300">
                                <div className="p-6 bg-violet-50 dark:bg-violet-900/10 border border-violet-100 dark:border-violet-900/20 rounded-3xl">
                                    <p className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase mb-2">Output Text</p>
                                    <h2 className="text-xl sm:text-2xl font-black text-gray-800 dark:text-zinc-100 leading-relaxed pr-10">
                                        {result}
                                    </h2>
                                    <button 
                                        onClick={copyToClipboard}
                                        className="absolute top-6 right-6 p-2 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 hover:text-violet-600 transition-all"
                                    >
                                        {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Reference Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-gray-100 dark:border-zinc-800">
                        <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-zinc-200 mb-6">
                            <Sparkles className="w-5 h-5 text-yellow-500" /> Conversion Examples
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-100 dark:border-zinc-800">
                                <span className="font-bold text-violet-600">123:</span> এক শত তেইশ
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-100 dark:border-zinc-800">
                                <span className="font-bold text-violet-600">2,500:</span> Two Thousand Five Hundred
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-100 dark:border-zinc-800">
                                <span className="font-bold text-violet-600">100,000:</span> এক লক্ষ
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-100 dark:border-zinc-800">
                                <span className="font-bold text-violet-600">5M:</span> Fifty Lakh / 50,00,000
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-gray-100 dark:border-zinc-800">
                        <h3 className="flex items-center gap-2 font-bold text-gray-800 dark:text-zinc-200 mb-4">
                            <Info className="w-5 h-5 text-blue-500" /> Why use this?
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-zinc-500 leading-relaxed">
                            Perfect for bank checks, official invoices, and academic documents where writing numbers in words is mandatory to prevent errors.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}