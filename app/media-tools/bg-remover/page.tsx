'use client';
import { useState, useEffect } from 'react';

export default function BgRemoverPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    const handleAction = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        setProgress(0);
        setResult(null);

        try {
            const imgly = await import('@imgly/background-removal');
            const removeBackground = imgly.removeBackground;
            
            // তোর বর্তমান ডোমেইন পাথ
            const origin = window.location.origin;

            const blob = await removeBackground(file, {
                // ১. পাবলিক পাথ হিসেবে রুট ডোমেইন দে যাতে /models/ এবং /onnxruntime-web/ খুঁজে পায়
                publicPath: `${origin}/`, 
                
                // ২. মডেল হিসেবে তোর resources.json ফাইলটা সরাসরি ধরিয়ে দে
                model: `${origin}/models/resources.json`,
                
                progress: (id, p) => {
                    setProgress(Math.round(p * 100));
                    console.log(`Working on: ${id}`);
                },
            });

            const url = URL.createObjectURL(blob);
            setResult(url);
        } catch (err) {
            console.error("AI Engine Error:", err);
            alert("প্রসেসিং ফেল! দয়া করে নিশ্চিত কর public/models এবং public/onnxruntime-web ফোল্ডারগুলো ঠিক জায়গায় আছে।");
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center font-sans">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-black italic text-indigo-500 tracking-tighter uppercase">
                    SHAN AI ENGINE 3
                </h1>
                <p className="text-[10px] text-zinc-500 font-bold tracking-[0.3em] mt-2">
                    REMOVING BACKGROUND LIKE A PRO
                </p>
            </div>

            <div className="w-full max-w-lg bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 shadow-2xl relative overflow-hidden">
                {!result && (
                    <label className={`flex flex-col items-center justify-center w-full h-72 border-2 border-dashed border-zinc-700 rounded-3xl transition-all duration-300 ${loading ? 'opacity-40 cursor-wait' : 'cursor-pointer hover:border-indigo-500 hover:bg-zinc-800/50 group'}`}>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="p-4 bg-zinc-800 rounded-2xl group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-white">
                                {loading ? 'Engine Loading...' : 'Select Image'}
                            </span>
                        </div>
                        <input type="file" className="hidden" onChange={handleAction} disabled={loading} accept="image/*" />
                    </label>
                )}

                {loading && (
                    <div className="mt-8 space-y-6">
                        <div className="relative w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                            <div 
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full transition-all duration-500 shadow-[0_0_20px_rgba(79,70,229,0.6)]" 
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                            <span className="text-indigo-400 animate-pulse">Processing...</span>
                            <span className="text-white">{progress}%</span>
                        </div>
                    </div>
                )}

                {result && (
                    <div className="mt-6 space-y-6 animate-in fade-in zoom-in-95 duration-500">
                        <div className="rounded-2xl overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')] bg-zinc-800 border-4 border-zinc-800 shadow-inner">
                            <img src={result} alt="Result" className="w-full h-auto" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => setResult(null)} 
                                className="py-4 text-[10px] font-bold text-zinc-500 hover:text-white uppercase transition-colors"
                            >
                                Discard
                            </button>
                            <a 
                                href={result} 
                                download="shan_ai_output.png" 
                                className="bg-indigo-600 hover:bg-indigo-500 text-center py-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
                            >
                                Download
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}