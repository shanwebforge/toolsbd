'use client';
import { useState, useEffect } from 'react';

export default function BgRemoverPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleAction = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        setProgress(0);
        setResult(null);

        try {
            // ডায়নামিক ইমপোর্ট
            const { removeBackground } = await import('@imgly/background-removal');
            
            // মডেল পাথ সেট করা (তোর resources.json ফাইলটি public/models ফোল্ডারে থাকতে হবে)
            const modelPath = `${window.location.origin}/models/`;

            const blob = await removeBackground(file, {
                publicPath: modelPath, 
                progress: (id, p) => setProgress(Math.round(p * 100)),
                // তোর ফাইলের নাম resources.json হলেও লাইব্রেরি সাধারণত 'medium' মডেল হিসেবেই চেনে
                model: 'medium', 
            });

            const url = URL.createObjectURL(blob);
            setResult(url);
        } catch (err) {
            console.error("Error details:", err);
            alert("মডেল লোড করা সম্ভব হয়নি। public/models/resources.json চেক করো।");
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
            <h1 className="text-3xl font-black italic text-indigo-500 mb-8 tracking-tighter uppercase">Shan AI Remover</h1>

            <div className="w-full max-w-lg bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 shadow-2xl">
                {!result && (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-zinc-700 rounded-3xl cursor-pointer hover:border-indigo-500 transition-all group">
                        <div className="text-center">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-indigo-400">Select Image</p>
                        </div>
                        <input type="file" className="hidden" onChange={handleAction} disabled={loading} accept="image/*" />
                    </label>
                )}

                {loading && (
                    <div className="mt-6 space-y-4">
                        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-indigo-600 h-full transition-all duration-300 shadow-[0_0_10px_rgba(79,70,229,0.5)]" style={{ width: `${progress}%` }}></div>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black uppercase text-indigo-400">
                           <span>Processing Engine...</span>
                           <span>{progress}%</span>
                        </div>
                    </div>
                )}

                {result && (
                    <div className="mt-6 space-y-6">
                        <div className="rounded-2xl overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')] bg-zinc-700 border-2 border-zinc-800">
                            <img src={result} alt="Result" className="w-full h-auto" />
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => setResult(null)} className="flex-1 text-[10px] font-bold text-zinc-500 uppercase">Discard</button>
                            <a href={result} download="shan-bg-removed.png" className="flex-[2] bg-indigo-600 text-center py-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20">Download PNG</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}