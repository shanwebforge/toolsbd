'use client';

import { useState, useRef } from 'react';
import { Camera, Download, UploadCloud, Sparkles, Image as ImageIcon, Frame, RefreshCcw, UserCircle } from 'lucide-react';

export default function FacebookDPMakerPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [frameUrl, setFrameUrl] = useState("https://i.ibb.co/DYFSgJS/sample-frame.png");
    const [hasImage, setHasImage] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

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
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                
                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-indigo-200 dark:border-indigo-800">
                        <Camera className="w-3.5 h-3.5" /> Studio Pro
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">Facebook DP Maker</h1>
                    <p className="text-sm text-gray-500 dark:text-zinc-500 font-medium max-w-xs mx-auto">Create stunning profile pictures with custom branding frames.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    
                    {/* Controls - Left Side */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-xl shadow-indigo-500/5">
                            <div className="flex items-center gap-2 mb-6">
                                <Frame className="w-4 h-4 text-indigo-500" />
                                <span className="text-xs font-black uppercase tracking-widest text-gray-800 dark:text-zinc-200">Editor Controls</span>
                            </div>

                            {/* Upload Area */}
                            <div className="relative group">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImageUpload} 
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="p-8 border-2 border-dashed border-gray-100 dark:border-zinc-800 rounded-3xl text-center group-hover:border-indigo-500/50 transition-all bg-zinc-50/50 dark:bg-zinc-950/50">
                                    <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <UploadCloud className="w-6 h-6 text-indigo-500" />
                                    </div>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-700 dark:text-zinc-300 mb-1">Upload Photo</h4>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">JPG, PNG up to 5MB</p>
                                </div>
                            </div>

                            {/* Frame URL (Optional) */}
                            <div className="mt-6">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2 px-1">Active Frame URL</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={frameUrl}
                                        onChange={(e) => setFrameUrl(e.target.value)}
                                        className="flex-1 p-3 bg-zinc-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 rounded-xl text-[10px] font-mono text-gray-500 outline-none focus:border-indigo-500"
                                    />
                                    <button className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-gray-400 hover:text-indigo-500 transition-colors">
                                        <RefreshCcw className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Download Action */}
                        <button 
                            onClick={downloadImage}
                            disabled={!hasImage}
                            className={`w-full py-4 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-500/20 active:scale-95 ${
                                hasImage 
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white cursor-pointer' 
                                : 'bg-zinc-200 dark:bg-zinc-800 text-gray-400 cursor-not-allowed shadow-none'
                            }`}
                        >
                            <Download className="w-4 h-4" /> Save Result
                        </button>
                    </div>

                    {/* Preview Area - Right Side */}
                    <div className="lg:col-span-3">
                        <div className="bg-white dark:bg-zinc-900 p-4 sm:p-10 rounded-[3rem] border border-gray-100 dark:border-zinc-800 shadow-2xl relative overflow-hidden">
                            
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10">
                                <ImageIcon className="w-32 h-32" />
                            </div>

                            <div className="relative z-10 flex flex-col items-center">
                                {/* Canvas Wrapper */}
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-[2.2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                    <div className="relative bg-zinc-100 dark:bg-zinc-950 rounded-[2rem] overflow-hidden border-4 border-white dark:border-zinc-800 shadow-inner">
                                        <canvas 
                                            ref={canvasRef} 
                                            width="800" 
                                            height="800" 
                                            className="w-full max-w-[400px] aspect-square object-cover"
                                        />
                                        
                                        {!hasImage && (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                                                <UserCircle className="w-20 h-20 text-gray-200 dark:text-zinc-800 mb-4" />
                                                <span className="text-xs font-black uppercase tracking-widest text-gray-400">Preview Area</span>
                                                <p className="text-[10px] text-gray-400 mt-2">Upload a photo to see the magic</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Mini Info */}
                                <div className="mt-8 flex gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">High Resolution</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                        <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Auto Frame Fit</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-3 h-3 text-purple-400" />
                                        <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Premium Output</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}