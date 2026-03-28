'use client';

import { useState } from 'react';
import { Hash, Languages, ArrowRightLeft, Copy, Check, Sparkles, ChevronRight } from 'lucide-react';

export default function NumberToWordPage() {
    const [numberInput, setNumberInput] = useState('');
    const [language, setLanguage] = useState('bn');
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);

    // Bangla Number Mapping Logic
    const bnNumbers = [
        "", "এক", "দুই", "তিন", "চার", "পাঁচ", "ছয়", "সাত", "আট", "নয়", "দশ",
        "এগারো", "বারো", "তেরো", "চৌদ্দ", "পনেরো", "ষোল", "সতেরো", "আঠারো", "উনিশ", "বিশ",
        "একুশ", "বাইশ", "তেইশ", "চব্বিশ", "পঁচিশ", "ছাব্বিশ", "সাতাশ", "আটাশ", "ঊনত্রিশ", "ত্রিশ",
        "একত্রিশ", "বত্রিশ", "তেতাল্লিশ", "চুয়াল্লিশ", "পঁয়তাল্লিশ", "ছেচল্লিশ", "সাতচল্লিশ", "আটচল্লিশ", "ঊনপঞ্চাশ", "পঞ্চাশ",
        "একান্ন", "বাহান্ন", "তিপ্পান্ন", "চুয়ান্ন", "পঞ্চান্ন", "ছাপ্পান্ন", "সাতান্ন", "আটান্ন", "ঊনষাট", "ষাট",
        "একষট্টি", "বাষট্টি", "তেষট্টি", "চৌষট্টি", "পঁয়ষট্টি", "ছেষট্টি", "সাতষট্টি", "আটষট্টি", "ঊনসত্তর", "সত্তর",
        "একাত্তর", "বাহাত্তর", "তেয়াত্তর", "চুয়াত্তর", "পঁচাত্তর", "ছেয়াত্তর", "সাতাত্তর", "আষ্টাত্তর", "ঊনআশি", "আশি",
        "একাশি", "বিরাশি", "তিরাশি", "চুরাশি", "পঁচাশী", "ছিয়াশি", "সাতাশি", "আটাশি", "ঊননব্বই", "নব্বই",
        "একানব্বই", "বিয়ানব্বই", "তিরানব্বই", "চুরানব্বই", "পঁচানব্বই", "ছেয়ানব্বই", "সাতানব্বই", "আটানব্বই", "নিরানব্বই"
    ];

    const numberToBanglaWords = (num: number): string => {
        if (num === 0) return "শূন্য";
        let word = "";
        let crore = Math.floor(num / 10000000);
        if (crore > 0) { word += numberToBanglaWords(crore) + " কোটি "; num %= 10000000; }
        let lakh = Math.floor(num / 100000);
        if (lakh > 0) { word += bnNumbers[lakh] + " লাখ "; num %= 100000; }
        let thousand = Math.floor(num / 1000);
        if (thousand > 0) { word += bnNumbers[thousand] + " হাজার "; num %= 1000; }
        let hundred = Math.floor(num / 100);
        if (hundred > 0) { word += bnNumbers[hundred] + " শত "; num %= 100; }
        if (num > 0) { word += bnNumbers[num]; }
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
            setResult(language === 'bn' ? "সঠিক সংখ্যা দিন" : "Invalid number");
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
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 font-sans">
            <div className="max-w-2xl mx-auto">
                
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-lg shadow-lg shadow-purple-500/20 mb-4">
                        <Hash className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Number To Word</h1>
                    <p className="text-slate-400 text-xs font-medium mt-1">Convert digital numbers into human-readable text.</p>
                </div>

                {/* Main Converter Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-slate-200 dark:border-zinc-800 overflow-hidden">
                    <div className="p-6 sm:p-8 space-y-6">
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Input Field */}
                            <div className="sm:col-span-2">
                                <label className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-2 block ml-1">Input Amount</label>
                                <input 
                                    type="number" 
                                    value={numberInput}
                                    onChange={(e) => setNumberInput(e.target.value)}
                                    placeholder="Enter number..."
                                    className="w-full p-3.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all font-semibold"
                                />
                            </div>

                            {/* Language Selector */}
                            <div>
                                <label className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-2 block ml-1">Language</label>
                                <div className="relative">
                                    <select 
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="w-full p-3.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-slate-900 dark:text-white outline-none appearance-none cursor-pointer font-bold text-sm"
                                    >
                                        <option value="bn">Bengali</option>
                                        <option value="en">English</option>
                                    </select>
                                    <Languages className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Convert Button - Indigo Secondary */}
                        <button 
                            onClick={handleConvert}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md shadow-indigo-500/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
                        >
                            <ArrowRightLeft className="w-4 h-4" /> Convert Now
                        </button>

                        {/* Result Display */}
                        {result && (
                            <div className="mt-6 p-6 bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/20 rounded-lg relative group animate-in fade-in duration-300">
                                <p className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2">Word Representation</p>
                                <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-100 leading-relaxed pr-10">
                                    {result}
                                </h2>
                                <button 
                                    onClick={copyToClipboard}
                                    className="absolute top-4 right-4 p-2 hover:bg-white dark:hover:bg-zinc-800 rounded-lg transition-all"
                                    title="Copy Text"
                                >
                                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Details Section */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-slate-200 dark:border-zinc-800">
                        <div className="flex items-center gap-2 mb-3 text-purple-600">
                            <Sparkles className="w-4 h-4" />
                            <h3 className="font-bold text-sm uppercase tracking-tight">Conversion Rule</h3>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                            Bengali follows the **Lakh-Crore** system, while English follows the **Million-Billion** standard. This tool automatically adjusts based on your choice.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-slate-200 dark:border-zinc-800">
                        <div className="flex items-center gap-2 mb-3 text-indigo-600">
                            <ChevronRight className="w-4 h-4" />
                            <h3 className="font-bold text-sm uppercase tracking-tight">Professional Use</h3>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                            Perfect for writing bank cheques, formal letters, or educational purposes where numeric amounts need a literal description.
                        </p>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Utility Engine &copy; 2026</p>
                </div>

            </div>
        </div>
    );
}