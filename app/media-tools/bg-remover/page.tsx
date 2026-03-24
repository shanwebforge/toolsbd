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
            const { removeBackground } = await import('@imgly/background-removal');
            
            // তোর ডোমেইন পাথ
            const modelPath = `${window.location.origin}/models/`;

            const blob = await removeBackground(file, {
                publicPath: modelPath,
                // --- সলিউশন: যেহেতু ফাইলের নাম resources.json (s সহ) ---
                // এখানে 'medium' এর বদলে সরাসরি তোর ইনডেক্স ফাইলটা ধরিয়ে দিচ্ছি
                model: `${modelPath}resources.json`, 
                progress: (id, p) => setProgress(Math.round(p * 100)),
            });

            setResult(URL.createObjectURL(blob));
        } catch (err) {
            console.error("BG Removal Error:", err);
            alert("মডেল লোড ফেইল! resources.json ফাইলটা কি public/models ফোল্ডারে আছে?");
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
            <h1 className="text-3xl font-black italic text-indigo-500 mb-10 uppercase">SHAN AI ENGINE</h1>

            <div className="w-full max-w-lg bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 shadow-2xl">
                {!result && (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-zinc-700 rounded-3xl cursor-pointer hover:bg-zinc-800 transition-all">
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Select Image</span>
                        <input type="file" className="hidden" onChange={handleAction} disabled={loading} accept="image/*" />
                    </label>
                )}

                {loading && (
                    <div className="mt-6 space-y-4">
                        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-indigo-500 h-full transition-all duration-300 shadow-[0_0_15px_rgba(79,70,229,0.5)]" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="text-center text-[10px] font-black text-indigo-400 uppercase tracking-widest animate-pulse">Processing... {progress}%</p>
                    </div>
                )}

                {result && (
                    <div className="mt-6 space-y-6">
                        <div className="rounded-2xl overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')] bg-zinc-800 border border-zinc-700">
                            <img src={result} alt="Result" className="w-full h-auto" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => setResult(null)} className="py-4 text-[10px] font-bold text-zinc-500 uppercase">Discard</button>
                            <a href={result} download="shan_no_bg.png" className="bg-indigo-600 text-center py-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20">Download PNG</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}