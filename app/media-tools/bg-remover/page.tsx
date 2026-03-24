'use client';
import { useState, useEffect } from 'react';

export default function BgRemoverPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [mounted, setMounted] = useState(false);

    // সার্ভার আর ক্লায়েন্ট ম্যাচ করার জন্য মাউন্ট চেক
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
            // লাইব্রেরি ইমপোর্ট
            const { removeBackground } = await import('@imgly/background-removal');
            
            // ইউজার যে ডোমেইনে আছে (লোকাল বা লাইভ) সেই ডোমেইন নেওয়া
            const modelPath = `${window.location.origin}/models/`;

            const blob = await removeBackground(file, {
                publicPath: modelPath, 
                progress: (id, p) => setProgress(Math.round(p * 100)),
                model: 'medium', // অথবা তোর ফোল্ডারে থাকা মডেলের নাম
            });

            const url = URL.createObjectURL(blob);
            setResult(url);
        } catch (err) {
            console.error("Error details:", err);
            alert("মডেল লোড হতে পারছে না। public/models ফোল্ডারে সব ফাইল আছে তো?");
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center">
            <h1 className="text-3xl font-black italic text-indigo-500 mb-10">SHAN AI ENGINE</h1>

            <div className="w-full max-w-lg bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 shadow-2xl">
                {!result && (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-zinc-700 rounded-3xl cursor-pointer hover:bg-zinc-800 transition-all">
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">ছবি সিলেক্ট করো</span>
                        <input type="file" className="hidden" onChange={handleAction} disabled={loading} accept="image/*" />
                    </label>
                )}

                {loading && (
                    <div className="mt-6 space-y-4">
                        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-indigo-600 h-full transition-all" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="text-center text-[10px] font-black text-indigo-400">প্রসেসিং হচ্ছে... {progress}%</p>
                    </div>
                )}

                {result && (
                    <div className="mt-6 space-y-6">
                        <div className="rounded-2xl overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')] bg-zinc-700">
                            <img src={result} alt="Result" className="w-full h-auto" />
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => setResult(null)} className="flex-1 text-xs font-bold text-zinc-500 uppercase">বাদ দাও</button>
                            <a href={result} download="no-bg.png" className="flex-[2] bg-indigo-600 text-center py-4 rounded-xl text-xs font-black uppercase">ডাউনলোড করো</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}