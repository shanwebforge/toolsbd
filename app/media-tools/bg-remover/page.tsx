'use client';

import { useState } from 'react';

export default function BackgroundRemover() {
    const [isRemoving, setIsRemoving] = useState(false);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    const handleRemoveBackground = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsRemoving(true);
        setProgress(0);

        try {
            // Named import
            const { removeBackground } = await import('@imgly/background-removal');

            const blob = await removeBackground(file, {
                // Official Stable CDN
                publicPath: 'https://static.img.ly/packages/@imgly/background-removal-data/1.4.5/dist/',
                progress: (id, p) => setProgress(Math.round(p * 100)),
                model: 'medium', 
            });

            const url = URL.createObjectURL(blob);
            setResultImage(url);
        } catch (error) {
            console.error("Critical BG Error:", error);
            // Error details check korar jonno alert
            alert("Error: " + (error instanceof Error ? error.message : "Model Load Failed"));
        } finally {
            setIsRemoving(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-black italic text-indigo-500 uppercase">Shan AI Engine</h1>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1 text-center">Cloud WASM Processing</p>
                </div>

                {!resultImage && (
                    <label className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-3xl transition-all ${isRemoving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}>
                        <div className="text-center space-y-4">
                           <div className="mx-auto w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                           </div>
                           <p className="text-sm font-black text-zinc-600 dark:text-zinc-300 uppercase italic">Choose Image</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleRemoveBackground} disabled={isRemoving} />
                    </label>
                )}

                {isRemoving && (
                    <div className="space-y-4 py-8">
                        <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="text-[10px] font-black text-indigo-500 animate-pulse text-center uppercase tracking-tighter">AI Processing... {progress}%</p>
                    </div>
                )}

                {resultImage && (
                    <div className="space-y-6 animate-in fade-in zoom-in-95">
                        <div className="rounded-2xl overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')] bg-zinc-200 border-4 border-white dark:border-zinc-800">
                            <img src={resultImage} alt="Result" className="w-full h-auto" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => setResultImage(null)} className="py-4 text-[10px] font-black uppercase text-zinc-400">Cancel</button>
                            <a href={resultImage} download="shan-bg-removed.png" className="py-4 bg-indigo-600 text-white rounded-xl text-center text-[10px] font-black uppercase shadow-lg shadow-indigo-600/20">Download</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}