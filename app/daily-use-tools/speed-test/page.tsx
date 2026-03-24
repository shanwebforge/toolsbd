'use client';

import { useState, useEffect } from 'react';
import { ArrowDownCircle, ArrowUpCircle, Globe, Monitor, MapPin, Zap, ShieldCheck, RefreshCw, Cpu, Database, Battery } from 'lucide-react';

export default function SpeedTestPage() {
    const [mainSpeed, setMainSpeed] = useState('--');
    const [downloadSpeed, setDownloadSpeed] = useState('--');
    const [uploadSpeed, setUploadSpeed] = useState('--');
    const [status, setStatus] = useState('Ready to test your connection');
    const [isTesting, setIsTesting] = useState(false);
    const [networkData, setNetworkData] = useState<any>(null);
    const [deviceInfo, setDeviceInfo] = useState<any>({
        ram: '--',
        cores: '--',
        battery: '--',
        browser: '--'
    });

    useEffect(() => {
        // Fetch Network Info
        const fetchNetworkInfo = async () => {
            try {
                const res = await fetch("https://geolocation-db.com/json/");
                const data = await res.json();
                setNetworkData(data);
            } catch (e) {
                console.error("Failed to load network info");
            }
        };

        // Fetch Device Hardware Info
        const getDeviceInfo = async () => {
            const info: any = {
                ram: (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : 'Unknown',
                cores: navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} Cores` : 'Unknown',
                browser: navigator.userAgent.split(' ').pop()
            };

            if ('getBattery' in navigator) {
                const battery: any = await (navigator as any).getBattery();
                info.battery = `${Math.round(battery.level * 100)}%`;
            }

            setDeviceInfo(info);
        };

        fetchNetworkInfo();
        getDeviceInfo();
    }, []);

    const startSpeedTest = async () => {
        setIsTesting(true);
        setStatus("Connecting to server...");
        setMainSpeed("--");
        setDownloadSpeed("--");
        setUploadSpeed("--");

        // 1. Download Test (Streaming mode for accuracy)
        try {
            setStatus("Measuring Download...");
            const downloadUrl = `https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg?nocache=${Date.now()}`;
            
            const start = performance.now();
            const response = await fetch(downloadUrl, { cache: "no-store" });
            
            if (!response.body) throw new Error("Body not found");
            
            const reader = response.body.getReader();
            let loaded = 0;

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                loaded += value.length;
                
                const intermediateTime = (performance.now() - start) / 1000;
                if (intermediateTime > 0) {
                    const intermediateSpeed = ((loaded * 8) / intermediateTime / (1024 * 1024)).toFixed(2);
                    setMainSpeed(intermediateSpeed);
                }
            }

            const end = performance.now();
            const finalDownloadSpeed = ((loaded * 8) / ((end - start) / 1000) / (1024 * 1024)).toFixed(2);

            setDownloadSpeed(finalDownloadSpeed);
            setMainSpeed(finalDownloadSpeed);
        } catch (e) {
            setDownloadSpeed('Err');
        }

        // 2. Upload Test (Bigger chunk for accuracy)
        try {
            setStatus("Measuring Upload...");
            const byteSize = 8 * 1024 * 1024; // 8MB chunk
            const uploadData = new Uint8Array(byteSize);
            
            const start = performance.now();
            await fetch("https://api.sofy.ai/api/v1/test/upload", {
                method: "POST",
                body: uploadData,
                mode: 'cors'
            });
            const end = performance.now();
            
            const finalUploadSpeed = ((byteSize * 8) / ((end - start) / 1000) / (1024 * 1024)).toFixed(2);
            setUploadSpeed(finalUploadSpeed);
        } catch (e) {
            setUploadSpeed('Err');
        }

        setStatus("Test complete.");
        setIsTesting(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-8 px-4 font-sans">
            <div className="max-w-4xl mx-auto mt-4">
                
                {/* Main Gauge Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-zinc-800 mb-6 transition-all duration-300">
                    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10 animate-pulse">
                            <Zap className="w-24 h-24" />
                        </div>
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-black tracking-tighter uppercase">Speed Test Pro</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className={`w-2 h-2 rounded-full ${isTesting ? 'bg-yellow-400 animate-ping' : 'bg-emerald-400'}`} />
                                    <p className="text-purple-100 text-[11px] font-bold tracking-widest uppercase">{status}</p>
                                </div>
                            </div>
                            <ShieldCheck className="w-7 h-7 text-white/80" />
                        </div>
                    </div>

                    <div className="p-10 text-center">
                        <div className="relative inline-flex items-center justify-center mb-10">
                            <div className={`w-52 h-52 rounded-full border-[8px] flex flex-col items-center justify-center transition-all duration-500 ${isTesting ? 'border-slate-100 border-t-purple-500 animate-spin-slow shadow-[0_0_30px_rgba(168,85,247,0.2)]' : 'border-purple-500/10'}`}>
                                <div className="text-center">
                                    <span className="text-6xl font-black text-slate-800 dark:text-white tracking-tighter block leading-none">
                                        {mainSpeed}
                                    </span>
                                    <span className="text-xs font-black text-purple-500 uppercase tracking-[0.3em] mt-2 block">Mbps</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto mb-10">
                            <div className="bg-slate-50 dark:bg-zinc-800/40 p-5 rounded-3xl border border-slate-100 dark:border-zinc-800 transition-transform hover:scale-105">
                                <ArrowDownCircle className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Download</p>
                                <p className="text-2xl font-black text-slate-800 dark:text-zinc-100 leading-none mt-1">{downloadSpeed}</p>
                            </div>
                            <div className="bg-slate-50 dark:bg-zinc-800/40 p-5 rounded-3xl border border-slate-100 dark:border-zinc-800 transition-transform hover:scale-105">
                                <ArrowUpCircle className="w-5 h-5 text-blue-500 mx-auto mb-2" />
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upload</p>
                                <p className="text-2xl font-black text-slate-800 dark:text-zinc-100 leading-none mt-1">{uploadSpeed}</p>
                            </div>
                        </div>

                        <button 
                            onClick={startSpeedTest}
                            disabled={isTesting}
                            className={`px-12 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all active:scale-[0.95] shadow-2xl flex items-center gap-3 mx-auto ${isTesting ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-purple-500/40'}`}
                        >
                            {isTesting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-current" />}
                            {isTesting ? 'Testing Now' : 'Run Speed Test'}
                        </button>
                    </div>
                </div>

                {/* Hardware & Network Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <InfoCard icon={<MapPin className="text-rose-500" />} label="Location" value={networkData ? `${networkData.city}` : '...'} />
                    <InfoCard icon={<Globe className="text-indigo-500" />} label="IP Address" value={networkData ? networkData.IPv4 : '...'} />
                    <InfoCard icon={<Cpu className="text-amber-500" />} label="Processor" value={deviceInfo.cores} />
                    <InfoCard icon={<Database className="text-emerald-500" />} label="Memory (RAM)" value={deviceInfo.ram} />
                    <InfoCard icon={<Battery className="text-pink-500" />} label="Battery" value={deviceInfo.battery} />
                    <InfoCard icon={<Monitor className="text-sky-500" />} label="User Agent" value={deviceInfo.browser} />
                    <InfoCard icon={<Zap className="text-yellow-500" />} label="ISP" value={networkData ? networkData.state : '...'} />
                    <InfoCard icon={<Globe className="text-purple-500" />} label="Country" value={networkData ? networkData.country_name : '...'} />
                </div>

                <p className="mt-8 text-center text-[10px] text-slate-400 dark:text-zinc-600 font-bold uppercase tracking-[0.2em]">
                    *Hardware specs are provided by browser API. Accuracy may vary.
                </p>
            </div>
            
            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 1.5s linear infinite;
                }
            `}</style>
        </div>
    );
}

// Helper Component for Info Cards
function InfoCard({ icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 flex flex-col gap-2 shadow-sm transition-all hover:border-purple-300 dark:hover:border-purple-900">
            <div className="p-2 bg-slate-50 dark:bg-zinc-800/50 w-fit rounded-xl">
                {icon}
            </div>
            <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
                <p className="text-xs font-black text-slate-700 dark:text-zinc-200 truncate mt-0.5">{value}</p>
            </div>
        </div>
    );
}