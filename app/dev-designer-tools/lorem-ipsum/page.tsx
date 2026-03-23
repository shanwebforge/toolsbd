'use client';

import { useState, useEffect } from 'react';
import { Type, Copy, RefreshCw, Layers, CheckCircle2, FileText, Sparkles, Languages, Zap } from 'lucide-react';

export default function LoremIpsumPage() {
    const [paragraphs, setParagraphs] = useState(3);
    const [generatedText, setGeneratedText] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [language, setLanguage] = useState('en'); // 'en' or 'bn'

    const loremBank = {
        en: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus eu elit consequat viverra. Aenean at semper nisi. Integer in tincidunt magna.",
            "Sed facilisis fermentum leo, nec pulvinar libero feugiat non. Donec nec lacus eu libero dignissim dignissim. Curabitur vel porta velit, in hendrerit nisl.",
            "Phasellus interdum eros at sem scelerisque, eget tempor nulla pretium. Pellentesque ut varius nisl. Maecenas dapibus, risus a gravida sodales, elit velit convallis tellus.",
            "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam sit amet purus erat. Mauris varius, nisl sed elementum pretium."
        ],
        bn: [
            "ডিজাইন করার সময় ডামি টেক্সট অত্যন্ত প্রয়োজনীয়। এটি আপনার লেআউটকে পূর্ণতা দেয়। বাংলা কন্টেন্ট দিয়ে চেক করলে আপনার ফন্ট এবং স্পেসিং এর সঠিক ধারণা পাওয়া যায়।",
            "একটি সুন্দর ওয়েবসাইট তৈরির জন্য সঠিক টেক্সট বিন্যাস আবশ্যক। লোরিম ইপসাম ব্যবহারের মাধ্যমে আপনি খুব সহজেই কন্টেন্ট প্লেসমেন্ট পরীক্ষা করে নিতে পারেন।",
            "আধুনিক ইউআই ডিজাইনে বাংলার ব্যবহার বাড়ছে। তাই ডেভেলপারদের জন্য সঠিক বাংলা প্লেসহোল্ডার টেক্সট থাকা জরুরি। এটি আপনার কাজের গতিকে অনেক বাড়িয়ে দেয়।",
            "প্রয়োজন অনুযায়ী আপনি প্যারাগ্রাফ সেট করে নিতে পারেন। আপনার ডিজাইনকে আরও প্রফেশনাল এবং ইউজার ফ্রেন্ডলি করতে আমাদের এই টুলটি সাহায্য করবে।"
        ]
    };

    const generateLorem = () => {
        const count = Math.max(1, Math.min(50, paragraphs));
        const bank = loremBank[language];
        
        const result = Array.from({ length: count }, (_, i) => {
            const pText = bank.slice(0, (i % 4) + 2).join(' ');
            return `<p class="mb-6 leading-relaxed last:mb-0">${pText}</p>`;
        }).join('');
        setGeneratedText(result);
    };

    const copyText = () => {
        const plainText = generatedText.replace(/<\/p>/g, '\n\n').replace(/<p[^>]*>/g, '');
        if (!plainText.trim()) return;
        
        navigator.clipboard.writeText(plainText).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    useEffect(() => {
        generateLorem();
    }, [paragraphs, language]);

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] py-16 px-4 selection:bg-indigo-500/30">
            {/* Background Accent */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-indigo-500/5 blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative">
                
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 rounded-full text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-6">
                        <Zap className="w-3 h-3 fill-current" /> Content Lab Pro
                    </div>
                    <h1 className="text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
                        {language === 'en' ? 'Lorem ' : 'বাংলা '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Ipsum</span>
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                        Instant placeholder text for high-fidelity prototypes.
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white dark:border-zinc-800 overflow-hidden">
                    
                    {/* Control Bar */}
                    <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8">
                        
                        <div className="flex flex-wrap items-center gap-8">
                            {/* Language Switcher */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest block ml-1">Output Language</label>
                                <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-2xl w-fit border border-zinc-200 dark:border-zinc-700">
                                    <button 
                                        onClick={() => setLanguage('en')}
                                        className={`px-6 py-2 text-xs font-bold rounded-xl transition-all duration-300 ${language === 'en' ? 'bg-white dark:bg-zinc-700 text-indigo-600 dark:text-white shadow-md' : 'text-zinc-500 hover:text-zinc-700'}`}
                                    >
                                        English
                                    </button>
                                    <button 
                                        onClick={() => setLanguage('bn')}
                                        className={`px-6 py-2 text-xs font-bold rounded-xl transition-all duration-300 ${language === 'bn' ? 'bg-white dark:bg-zinc-700 text-indigo-600 dark:text-white shadow-md' : 'text-zinc-500 hover:text-zinc-700'}`}
                                    >
                                        বাংলা
                                    </button>
                                </div>
                            </div>

                            {/* Paragraph Counter */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest block ml-1">Paragraphs</label>
                                <div className="relative group">
                                    <input 
                                        type="number" 
                                        value={paragraphs} 
                                        onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)} 
                                        min="1" 
                                        max="50" 
                                        className="w-24 p-3 bg-zinc-100 dark:bg-zinc-800 border-none rounded-2xl text-sm font-bold text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
                                    />
                                    <Type className="absolute right-3 top-3.5 w-4 h-4 text-zinc-400 pointer-events-none group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-8">
                            <button 
                                onClick={generateLorem} 
                                className="flex-1 md:flex-none px-6 py-3.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                            </button>
                            
                            <button 
                                onClick={copyText} 
                                className={`flex-[3] md:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-500 ${
                                    isCopied 
                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 hover:-translate-y-0.5'
                                }`}
                            >
                                {isCopied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {isCopied ? 'Copied to Clipboard' : 'Copy All Text'}
                            </button>
                        </div>
                    </div>

                    {/* Output Area */}
                    <div className="relative p-8 md:p-12 min-h-[450px]">
                        <div className="absolute top-12 left-12 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                            <Languages className="w-48 h-48 text-indigo-600" />
                        </div>
                        
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="h-[1px] flex-1 bg-zinc-100 dark:bg-zinc-800"></div>
                                <span className="text-[10px] font-black text-zinc-300 dark:text-zinc-600 uppercase tracking-[0.4em]">Preview</span>
                                <div className="h-[1px] flex-1 bg-zinc-100 dark:bg-zinc-800"></div>
                            </div>
                            
                            <div 
                                className={`text-zinc-700 dark:text-zinc-300 selection:bg-indigo-500/20 transition-all duration-500 ${
                                    language === 'bn' ? 'text-lg leading-[1.8] font-medium' : 'text-base leading-[1.7] font-normal italic'
                                }`}
                                dangerouslySetInnerHTML={{ __html: generatedText }}
                            />
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="px-8 py-5 bg-zinc-50/50 dark:bg-zinc-800/30 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
                        <div className="flex items-center gap-3">
                           <div className="flex -space-x-2">
                               {[1,2,3].map(i => (
                                   <div key={i} className={`w-6 h-6 rounded-full border-2 border-white dark:border-zinc-900 bg-indigo-${i}00`}></div>
                               ))}
                           </div>
                           <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
                               Trusted by 2k+ designers
                           </p>
                        </div>
                        <div className="flex items-center gap-2">
                             <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                             <span className="text-[10px] font-bold text-indigo-500/60 uppercase tracking-widest">Premium Content Engine</span>
                        </div>
                    </div>
                </div>
                
                {/* Minimalist Footer Link */}
                <div className="mt-8 text-center">
                    <button className="text-[10px] font-bold text-zinc-400 hover:text-indigo-500 transition-colors uppercase tracking-[0.2em]">
                        Documentation • API Access • Github
                    </button>
                </div>
            </div>
        </div>
    );
}