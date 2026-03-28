'use client';

import { useState, useEffect } from 'react';
import { Type, Copy, RefreshCw, CheckCircle2, Sparkles, Languages, Zap, FileText, AlignLeft } from 'lucide-react';

export default function LoremIpsumPage() {
    const [paragraphs, setParagraphs] = useState(3);
    const [generatedText, setGeneratedText] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [language, setLanguage] = useState<'en' | 'bn'>('en');

    const loremBank = {
        en: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus eu elit consequat viverra. Aenean at semper nisi. Integer in tincidunt magna.",
            "Sed facilisis fermentum leo, nec pulvinar libero feugiat non. Donec nec lacus eu libero dignissim dignissim. Curabitur vel porta velit, in hendrerit nisl.",
            "Phasellus interdum eros at sem scelerisque, eget tempor nulla pretium. Pellentesque ut varius nisl. Maecenas dapibus, risus a gravida sodales, elit velit convallis tellus.",
            "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam sit amet purus erat. Mauris varius, nisl sed elementum pretium."
        ],
        bn: [
            "ডিজাইন করার সময় ডামি টেক্সট অত্যন্ত প্রয়োজনীয়। এটি আপনার লেআউটকে পূর্ণতা দেয়। বাংলা কন্টেন্ট দিয়ে চেক করলে আপনার ফন্ট এবং স্পেসিং এর সঠিক ধারণা পাওয়া যায়।",
            "একটি সুন্দর ওয়েবসাইট তৈরির জন্য সঠিক টেক্সট বিন্যাস আবশ্যক। লোরিম ইপসাম ব্যবহারের মাধ্যমে আপনি খুব সহজেই কন্টেন্ট প্লেসমেন্ট পরীক্ষা করে নিতে পারেন।",
            "আধুনিক ইউআই ডিজাইনে বাংলার ব্যবহার বাড়ছে। তাই ডেভেলপারদের জন্য সঠিক বাংলা প্লেসহোল্ডার টেক্সট থাকা জরুরি। এটি আপনার কাজের গতিকে অনেক বাড়িয়ে দেয়।",
            "প্রয়োজন অনুযায়ী আপনি প্যারাগ্রাফ সেট করে নিতে পারেন। আপনার ডিজাইনকে আরও প্রফেশনাল এবং ইউজার ফ্রেন্ডলি করতে আমাদের এই টুলটি সাহায্য করবে।"
        ]
    };

    const generateLorem = () => {
        const count = Math.max(1, Math.min(50, paragraphs));
        const bank = loremBank[language];
        
        const result = Array.from({ length: count }, (_, i) => {
            const pText = bank.slice(0, (i % 4) + 2).join(' ');
            return `<p class="mb-5 leading-relaxed last:mb-0">${pText}</p>`;
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
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 font-sans">
            <div className="max-w-4xl mx-auto">
                
                {/* Header Section - Purple Primary */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-lg shadow-lg shadow-purple-500/20 mb-4">
                        <FileText className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight uppercase">
                        {language === 'en' ? 'Lorem ' : 'বাংলা '}
                        <span className="text-purple-600">Ipsum</span>
                    </h1>
                    <p className="text-slate-400 text-xs font-medium mt-1">Generate high-fidelity placeholder text for your UI/UX prototypes.</p>
                </div>

                {/* Main Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-slate-200 dark:border-zinc-800 overflow-hidden">
                    
                    {/* Control Bar */}
                    <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50/30">
                        
                        <div className="flex flex-wrap items-center gap-6">
                            {/* Language Switcher - Indigo Secondary */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest block px-1">Language</label>
                                <div className="flex bg-slate-100 dark:bg-zinc-800 p-1 rounded-lg border border-slate-200 dark:border-zinc-700">
                                    <button 
                                        onClick={() => setLanguage('en')}
                                        className={`px-4 py-1.5 text-[11px] font-bold rounded-md transition-all ${language === 'en' ? 'bg-white dark:bg-zinc-700 text-indigo-600 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        English
                                    </button>
                                    <button 
                                        onClick={() => setLanguage('bn')}
                                        className={`px-4 py-1.5 text-[11px] font-bold rounded-md transition-all ${language === 'bn' ? 'bg-white dark:bg-zinc-700 text-indigo-600 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        বাংলা
                                    </button>
                                </div>
                            </div>

                            {/* Paragraph Counter */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest block px-1">Paragraphs</label>
                                <div className="relative group">
                                    <input 
                                        type="number" 
                                        value={paragraphs} 
                                        onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)} 
                                        min="1" max="50" 
                                        className="w-24 p-2.5 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs font-bold text-slate-700 dark:text-white focus:border-purple-500 outline-none transition-all shadow-sm"
                                    />
                                    <AlignLeft className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-slate-300 pointer-events-none group-focus-within:text-purple-500" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <button 
                                onClick={generateLorem} 
                                className="p-3 bg-slate-100 dark:bg-zinc-800 text-slate-500 rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-700 transition-all active:scale-95 border border-slate-200 dark:border-zinc-700"
                            >
                                <RefreshCw className="w-4 h-4" />
                            </button>
                            
                            <button 
                                onClick={copyText} 
                                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all ${
                                    isCopied 
                                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/10' 
                                    : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-500/10 active:scale-[0.98]'
                                }`}
                            >
                                {isCopied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {isCopied ? 'Copied' : 'Copy All Text'}
                            </button>
                        </div>
                    </div>

                    {/* Output Area */}
                    <div className="p-8 md:p-12 min-h-[300px] bg-white dark:bg-zinc-900/50">
                        <div className="max-w-2xl mx-auto">
                            <div className="flex items-center gap-3 mb-8 opacity-20">
                                <div className="h-[1px] flex-1 bg-slate-300 dark:bg-zinc-700"></div>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em]">Canvas Preview</span>
                                <div className="h-[1px] flex-1 bg-slate-300 dark:bg-zinc-700"></div>
                            </div>
                            
                            <div 
                                className={`text-slate-600 dark:text-zinc-400 selection:bg-purple-500/20 transition-all duration-300 ${
                                    language === 'bn' ? 'text-base leading-relaxed' : 'text-sm leading-relaxed font-normal italic'
                                }`}
                                dangerouslySetInnerHTML={{ __html: generatedText }}
                            />
                        </div>
                    </div>

                    {/* Footer Row */}
                    <div className="px-6 py-4 bg-slate-50 dark:bg-zinc-800/30 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Instant Generation</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                            <span className="text-[9px] font-bold text-indigo-500/70 uppercase tracking-widest">Premium Content Engine</span>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 text-center">
                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">Designed for Modern Web Workflows</p>
                </div>
            </div>
        </div>
    );
}