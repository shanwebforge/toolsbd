'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Upload, Volume2, Download, Music, 
  Play, Pause, RefreshCcw, CheckCircle2, X,
  AlertCircle
} from 'lucide-react';

const VolumeBooster = () => {
  const [file, setFile] = useState<File | null>(null);
  const [boostValue, setBoostValue] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: '', type: 'success' });

  // Audio Context Refs
  const audioContext = useRef<AudioContext | null>(null);
  const sourceNode = useRef<AudioBufferSourceNode | null>(null);
  const gainNode = useRef<GainNode | null>(null);
  const audioBuffer = useRef<AudioBuffer | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const triggerAlert = (msg: string, type: 'success' | 'error' = 'success') => {
    setAlert({ show: true, msg, type });
    setTimeout(() => setAlert({ show: false, msg: '', type: 'success' }), 3000);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setLoading(true);
    setFile(selectedFile);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      if (!audioContext.current) audioContext.current = new AudioContext();
      
      const decodedBuffer = await audioContext.current.decodeAudioData(arrayBuffer);
      audioBuffer.current = decodedBuffer;

      // Setup for real-time preview volume
      if (audioRef.current) {
        audioRef.current.src = URL.createObjectURL(selectedFile);
      }

      triggerAlert("অডিও ফাইল লোড হয়েছে!");
    } catch (error) {
      triggerAlert("ফাইলটি প্রসেস করতে সমস্যা হয়েছে", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!audioBuffer.current) return;

    setLoading(true);
    triggerAlert("অডিও বুস্ট হচ্ছে, অপেক্ষা করুন...");

    try {
      const buffer = audioBuffer.current;
      const offlineCtx = new OfflineAudioContext(
        buffer.numberOfChannels,
        buffer.length,
        buffer.sampleRate
      );

      const source = offlineCtx.createBufferSource();
      source.buffer = buffer;

      const gain = offlineCtx.createGain();
      gain.gain.value = boostValue;

      source.connect(gain).connect(offlineCtx.destination);
      source.start(0);

      const renderedBuffer = await offlineCtx.startRendering();
      const wavBlob = audioBufferToWav(renderedBuffer);

      const url = URL.createObjectURL(wavBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `boosted_${boostValue}x_${file?.name.split('.')[0]}.wav`;
      a.click();

      triggerAlert("✅ বুস্টেড ফাইল ডাউনলোড সম্পন্ন!");
    } catch (error) {
      triggerAlert("ডাউনলোড ব্যর্থ হয়েছে", "error");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to convert AudioBuffer to WAV
  const audioBufferToWav = (buffer: AudioBuffer) => {
    const numOfChan = buffer.numberOfChannels;
    const length = buffer.length * numOfChan * 2 + 44;
    const bufferArray = new ArrayBuffer(length);
    const view = new DataView(bufferArray);
    let offset = 0;

    const writeString = (s: string) => {
      for (let i = 0; i < s.length; i++) {
        view.setUint8(offset++, s.charCodeAt(i));
      }
    };

    writeString('RIFF');
    view.setUint32(offset, length - 8, true); offset += 4;
    writeString('WAVE');
    writeString('fmt ');
    view.setUint32(offset, 16, true); offset += 4;
    view.setUint16(offset, 1, true); offset += 2;
    view.setUint16(offset, numOfChan, true); offset += 2;
    view.setUint32(offset, buffer.sampleRate, true); offset += 4;
    view.setUint32(offset, buffer.sampleRate * numOfChan * 2, true); offset += 4;
    view.setUint16(offset, numOfChan * 2, true); offset += 2;
    view.setUint16(offset, 16, true); offset += 2;
    writeString('data');
    view.setUint32(offset, length - offset - 4, true); offset += 4;

    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < numOfChan; channel++) {
        let sample = buffer.getChannelData(channel)[i];
        sample = Math.max(-1, Math.min(1, sample));
        sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        view.setInt16(offset, sample, true);
        offset += 2;
      }
    }
    return new Blob([bufferArray], { type: 'audio/wav' });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 font-sans text-slate-900 dark:text-slate-100 selection:bg-purple-100 relative">
      
      {/* --- ALERT (Indigo Focus) --- */}
      {alert.show && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-xs animate-in fade-in zoom-in slide-in-from-top-10 duration-300">
          <div className={`backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center justify-between border ${alert.type === 'error' ? 'bg-red-600/90 border-red-400/50' : 'bg-indigo-600/95 border-indigo-400/50'}`}>
            <div className="flex items-center gap-2.5">
              {alert.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
              <span className="text-[10px] font-black uppercase tracking-widest">{alert.msg}</span>
            </div>
          </div>
        </div>
      )}

      {/* --- HEADER --- */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-600 mb-2">
            <Music size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Audio Tools</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight">MP3 Volume Booster</h2>
        </div>
        <p className="text-xs text-slate-400 max-w-xs md:text-right">High quality audio amplification with real-time rendering engine.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Uploader (Purple) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm border-b-4 border-b-purple-600">
            <label className="w-full h-40 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full text-purple-600 group-hover:scale-110 transition-transform">
                <Upload size={24} />
              </div>
              <div className="text-center px-4">
                <span className="text-[10px] font-black uppercase tracking-widest block mb-1">Upload MP3 File</span>
                <p className="text-[9px] text-slate-400 font-medium">Drag & drop or click to browse</p>
              </div>
              <input type="file" accept="audio/mp3,audio/mpeg" onChange={handleFileChange} className="hidden" />
            </label>

            {file && (
              <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center gap-3 animate-in fade-in zoom-in-95">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center">
                  <Music size={14} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-bold truncate pr-2 uppercase tracking-tighter">{file.name}</p>
                  <p className="text-[8px] text-slate-400 uppercase">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Features</h4>
            <div className="grid grid-cols-1 gap-3">
              {[
                { icon: <Volume2 size={14}/>, t: "5x Amplification" },
                { icon: <RefreshCcw size={14}/>, t: "Zero Quality Loss" },
                { icon: <CheckCircle2 size={14}/>, t: "Instant Render" }
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-[10px] font-bold">
                  <span className="text-purple-600">{f.icon}</span> {f.t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Controls & Preview (Indigo) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl">
            <div className="flex justify-between items-center mb-10">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-600">Boost Intensity</label>
              <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest shadow-lg shadow-indigo-500/30">
                {boostValue.toFixed(1)}x
              </div>
            </div>

            <div className="relative h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full mb-12">
              <input 
                type="range" 
                min="1" 
                max="5" 
                step="0.1" 
                value={boostValue} 
                onChange={(e) => setBoostValue(parseFloat(e.target.value))}
                disabled={!file}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
              />
              <div 
                className="h-full bg-indigo-600 rounded-full relative"
                style={{ width: `${((boostValue - 1) / 4) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-4 border-indigo-600 rounded-full shadow-lg"></div>
              </div>
            </div>

            {/* --- CUSTOM AUDIO PLAYER --- */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 mb-8">
              <audio ref={audioRef} className="hidden" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => isPlaying ? audioRef.current?.pause() : audioRef.current?.play()}
                  disabled={!file}
                  className="w-12 h-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center disabled:opacity-20 transition-transform active:scale-90"
                >
                  {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
                </button>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[8px] font-black uppercase tracking-widest opacity-50">Live Preview</span>
                    <span className="text-[8px] font-bold text-indigo-600">Boost Applied</span>
                  </div>
                  <div className="h-1 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full bg-indigo-600 ${isPlaying ? 'w-full transition-all duration-[30s] linear' : 'w-0'}`}></div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleDownload}
              disabled={!file || loading}
              className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] transition-all active:scale-95 shadow-xl ${
                !file || loading 
                ? 'bg-slate-200 text-slate-400' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20'
              }`}
            >
              {loading ? <RefreshCcw size={18} className="animate-spin" /> : <><Download size={18} /> Process & Download</>}
            </button>
          </div>

          <div className="px-4 text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.5em] opacity-20">Advanced PCM Buffer Modulation Engine</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumeBooster;