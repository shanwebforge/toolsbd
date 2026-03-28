'use client';

import { useState, useRef } from 'react';
import { Camera, Download, UploadCloud, Sparkles, Image as ImageIcon, Frame, RefreshCcw, UserCircle, ShieldCheck } from 'lucide-react';

export default function FacebookDPMakerPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [frameUrl, setFrameUrl] = useState("https://i.ibb.co/DYFSgJS/sample-frame.png");
    const [hasImage, setHasImage] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsProcessing(true);
        const reader = new FileReader();
        reader.onload = (event) => {
            const userImage = new Image();
            userImage.onload = () => {
                const canvas = canvasRef.current;
                if (!canvas) return;

                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                // Reset and draw user image
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(userImage, 0, 0, canvas.width, canvas.height);

                // Overlay Frame
                const frameImage = new Image();
                frameImage.crossOrigin = "anonymous";
                frameImage.onload = () => {
                    ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
                    setHasImage(true);
                    setIsProcessing(false);
                };
                frameImage.src = frameUrl;
            };
            userImage.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;
        if (!canvas || !hasImage) return;

        const link = document.createElement('a');
        link.download = `FB_DP_${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 font-sans">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section - Purple Primary */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-lg shadow-lg shadow-purple-500/20 mb-4">
                        <Camera className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight uppercase">FB Profile Architect</h1>
                    <p className="text-slate-400 text-xs font-medium mt-1">Generate professional-grade profile pictures with high-fidelity frames.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Controls - Left Side (4 Cols) */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-slate-200 dark:border-zinc-800 shadow-md">
                            <div className="flex items-center gap-2 mb-6 text-indigo-600 dark:text-indigo-400">
                                <Frame className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Design Studio</span>
                            </div>

                            {/* Upload Area */}
                            <div className="relative group mb-6">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImageUpload} 
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="p-8 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-lg text-center group-hover:border-purple-500/50 transition-all bg-slate-50/50 dark:bg-zinc-950/50">
                                    <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-lg shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border border-slate-100 dark:border-zinc-700">
                                        <UploadCloud className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-700 dark:text-zinc-300 mb-1">Upload Photo</h4>
                                    <p className="text-[9px] text-slate-400 font-medium">PNG or JPG up to 5MB</p>
                                </div>
                            </div>

                            {/* Frame URL Configuration */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Active Frame Source</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={frameUrl}
                                        onChange={(e) => setFrameUrl(e.target.value)}
                                        className="flex-1 p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-[10px] font-mono text-slate-500 outline-none focus:border-purple-500"
                                    />
                                    <button className="p-2.5 bg-slate-100 dark:bg-zinc-800 rounded-lg text-slate-400 hover:text-purple-600 transition-colors border border-slate-200 dark:border-zinc-700">
                                        <RefreshCcw className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Download Action - Purple Primary */}
                        <button 
                            onClick={downloadImage}
                            disabled={!hasImage || isProcessing}
                            className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${
                                hasImage && !isProcessing
                                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/10' 
                                : 'bg-slate-200 dark:bg-zinc-800 text-slate-400 cursor-not-allowed shadow-none border border-slate-300 dark:border-zinc-700'
                            }`}
                        >
                            <Download className="w-4 h-4" /> Save Final Result
                        </button>
                    </div>

                    {/* Preview Area - Right Side (8 Cols) */}
                    <div className="lg:col-span-8">
                        <div className="bg-white dark:bg-zinc-900 p-6 sm:p-10 rounded-lg border border-slate-200 dark:border-zinc-800 shadow-md relative overflow-hidden flex flex-col items-center">
                            
                            {/* Canvas Section */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                                <div className="relative bg-slate-100 dark:bg-zinc-950 rounded-lg overflow-hidden border-4 border-white dark:border-zinc-800 shadow-inner max-w-full">
                                    <canvas 
                                        ref={canvasRef} 
                                        width="800" 
                                        height="800" 
                                        className="w-full max-w-[400px] aspect-square object-cover"
                                    />
                                    
                                    {!hasImage && !isProcessing && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-slate-50/90 dark:bg-zinc-900/90 backdrop-blur-sm">
                                            <UserCircle className="w-16 h-16 text-slate-200 dark:text-zinc-800 mb-4" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Live Preview</span>
                                            <p className="text-[9px] text-slate-400 mt-2 font-medium">Select a photo to begin customization</p>
                                        </div>
                                    )}

                                    {isProcessing && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 dark:bg-black/60 backdrop-blur-sm">
                                            <RefreshCcw className="w-8 h-8 text-purple-600 animate-spin" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Features Row */}
                            <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-lg">
                                <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
                                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                    <span className="text-[8px] font-bold uppercase text-slate-500 dark:text-zinc-400">Secure Processing</span>
                                </div>
                                <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
                                    <Sparkles className="w-4 h-4 text-purple-500" />
                                    <span className="text-[8px] font-bold uppercase text-slate-500 dark:text-zinc-400">HD Rendering</span>
                                </div>
                                <div className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
                                    <RefreshCcw className="w-4 h-4 text-indigo-500" />
                                    <span className="text-[8px] font-bold uppercase text-slate-500 dark:text-zinc-400">Auto Layout</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-10 text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Branding Engine &copy; 2026 • Build for Social Identity</p>
                </div>
            </div>
        </div>
    );
}