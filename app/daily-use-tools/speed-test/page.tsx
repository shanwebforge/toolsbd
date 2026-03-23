'use client';

import { useState, useEffect } from 'react';
import { Gauge, ArrowDownCircle, ArrowUpCircle, Globe, Monitor, MapPin, Zap, RefreshCcw, ShieldCheck } from 'lucide-react';

export default function SpeedTestPage() {
    const [mainSpeed, setMainSpeed] = useState('--');
    const [downloadSpeed, setDownloadSpeed] = useState('--');
    const [uploadSpeed, setUploadSpeed] = useState('--');
    const [status, setStatus] = useState('Ready to test your connection');
    const [isTesting, setIsTesting] = useState(false);
    const [networkData, setNetworkData] = useState<any>(null);

    useEffect(() => {
        const fetchNetworkInfo = async () => {
            try {
                const res = await fetch("https://geolocation-db.com/json/");
                const data = await res.json();
                setNetworkData(data);
            } catch (e) {
                console.error("Failed to load network info");
            }
        };
        fetchNetworkInfo();
    }, []);

    const startSpeedTest = async () => {
        setIsTesting(true);
        setStatus("Initialising sensors...");
        setMainSpeed("--");
        setDownloadSpeed("--");
        setUploadSpeed("--");

        // Download speed test
        try {
            setStatus("Measuring Download Speed...");
            const start = performance.now();
            const response = await fetch(`https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg?nocache=${Date.now()}`, {
                method: "GET",
                headers: { 'Range': 'bytes=0-1000000' },
                cache: "no-store"
            });
            const blob = await response.blob();
            const end = performance.now();
            const duration = (end - start) / 1000;
            const bits = blob.size * 8;
            const speedMbps = (bits / duration / 1024 / 1024).toFixed(2);

            setDownloadSpeed(speedMbps);
            setMainSpeed(speedMbps);
        } catch (e) {
            setDownloadSpeed('Error');
        }

        // Upload speed test
        try {
            setStatus("Measuring Upload Speed...");
            const data = new Blob([new Uint8Array(1_000_000)]); 
            const start = performance.now();
            await fetch("https://api.sofy.ai/api/v1/test/upload", {
                method: "POST",
                body: data,
            });
            const end = performance.now();
            const duration = (end - start) / 1000;
            const bits = data.size * 8;
            const speedMbps = (bits / duration / 1024 / 1024).toFixed(2);

            setUploadSpeed(speedMbps);
        } catch (e) {
            setUploadSpeed('Error');
        }

        setStatus("System check complete.");
        setIsTesting(false);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10 px-4">
            <div className="max-w-4xl mx-auto">
                
                {/* Main Speed Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 mb-8">
                    <div className="bg-indigo-600 p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-10">
                            <Zap className="w-40 h-40" />
                        </div>
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-black italic tracking-tighter uppercase">Speed Test Pro</h1>
                                <p className="text-indigo-200 text-xs font-bold tracking-widest">{status}</p>
                            </div>
                            <ShieldCheck className="w-8 h-8 text-indigo-300" />
                        </div>
                    </div>

                    <div className="p-8 sm:p-12 text-center">
                        {/* Gauge Display */}
                        <div className="relative inline-flex items-center justify-center mb-10">
                            <div className={`w-56 h-56 sm:w-64 sm:h-64 rounded-full border-8 border-gray-100 dark:border-zinc-800 flex flex-col items-center justify-center transition-all duration-700 ${isTesting ? 'border-t-indigo-500 animate-spin-slow' : 'border-indigo-500/20'}`}>
                                <span className="text-5xl sm:text-6xl font-black text-gray-800 dark:text-white tracking-tighter">
                                    {mainSpeed}
                                </span>
                                <span className="text-xs font-black text-indigo-500 uppercase tracking-widest">Mbps</span>
                            </div>
                            {isTesting && (
                                <div className="absolute inset-0 rounded-full border-4 border-indigo-500 animate-ping opacity-20" />
                            )}
                        </div>

                        {/* Sub Speeds */}
                        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-10">
                            <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-3xl border border-gray-100 dark:border-zinc-700">
                                <ArrowDownCircle className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Download</p>
                                <p className="text-xl font-black text-gray-800 dark:text-zinc-100">{downloadSpeed} <span className="text-[10px]">Mb</span></p>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-3xl border border-gray-100 dark:border-zinc-700">
                                <ArrowUpCircle className="w-5 h-5 text-blue-500 mx-auto mb-2" />
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Upload</p>
                                <p className="text-xl font-black text-gray-800 dark:text-zinc-100">{uploadSpeed} <span className="text-[10px]">Mb</span></p>
                            </div>
                        </div>

                        <button 
                            onClick={startSpeedTest}
                            disabled={isTesting}
                            className={`px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm transition-all active:scale-95 shadow-xl ${isTesting ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white shadow-indigo-500/30 hover:bg-indigo-700'}`}
                        >
                            {isTesting ? 'Testing...' : 'Start Speed Test'}
                        </button>
                    </div>
                </div>

                {/* Network & Device Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-gray-100 dark:border-zinc-800 flex items-center gap-4">
                        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
                            <MapPin className="w-6 h-6 text-indigo-500" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</p>
                            <p className="text-sm font-bold text-gray-700 dark:text-zinc-300">
                                {networkData ? `${networkData.city}, ${networkData.country_name}` : 'Scanning...'}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-gray-100 dark:border-zinc-800 flex items-center gap-4">
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl">
                            <Globe className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Public IP</p>
                            <p className="text-sm font-bold text-gray-700 dark:text-zinc-300">
                                {networkData ? networkData.IPv4 : '0.0.0.0'}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-gray-100 dark:border-zinc-800 flex items-center gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                            <Monitor className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Platform</p>
                            <p className="text-xs font-bold text-gray-700 dark:text-zinc-300 truncate max-w-[150px]">
                                {typeof window !== 'undefined' ? navigator.platform : 'Unknown'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-gray-400 dark:text-zinc-600 font-medium px-10">
                        *This test calculates speed by measuring time to download/upload small data chunks. Results may vary based on server distance and browser overhead.
                    </p>
                </div>

            </div>
            
            {/* Custom Animation for Spinner */}
            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 2s linear infinite;
                }
            `}</style>
        </div>
    );
}