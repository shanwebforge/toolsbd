'use client';

import { useState, useRef } from 'react';
import { 
  Scissors, Upload, Play, Download, 
  Clock, RefreshCcw, CheckCircle2, X,
  AlertCircle, Music, Pause
} from 'lucide-react';

const MP3Cutter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cutAudioUrl, setCutAudioUrl] = useState<string | null>(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: 'success' });

  const audioContext = useRef<AudioContext | null>(null);
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
    setCutAudioUrl(null);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      if (!audioContext.current) audioContext.current = new AudioContext();
      
      const decodedBuffer = await audioContext.current.decodeAudioData(arrayBuffer);
      audioBuffer.current = decodedBuffer;
      
      const totalSec = decodedBuffer.duration;
      setDuration(totalSec);
      setStartTime(0);
      setEndTime(totalSec);

      if (audioRef.current) {
        audioRef.current.src = URL.createObjectURL(selectedFile);
      }
      triggerAlert("Audio file loaded successfully!");
    } catch (error) {
      triggerAlert("Failed to process audio file", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCut = async () => {
    if (!audioBuffer.current || !audioContext.current) return;

    if (startTime >= endTime) {
      triggerAlert("Start time must be less than end time", "error");
      return;
    }

    setLoading(true);
    try {
      const startSample = Math.floor(startTime * audioBuffer.current.sampleRate);
      const endSample = Math.floor(endTime * audioBuffer.current.sampleRate);
      const frameCount = endSample - startSample;

      const newBuffer = audioContext.current.createBuffer(
        audioBuffer.current.numberOfChannels,
        frameCount,
        audioBuffer.current.sampleRate
      );

      for (let i = 0; i < audioBuffer.current.numberOfChannels; i++) {
        const nowBuffering = newBuffer.getChannelData(i);
        audioBuffer.current.copyFromChannel(nowBuffering, i, startSample);
      }

      const wavBlob = audioBufferToWav(newBuffer);
      const url = URL.createObjectURL(wavBlob);
      setCutAudioUrl(url);

      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
      }
      triggerAlert("✅ Audio trimmed successfully!");
    } catch (error) {
      triggerAlert("Trimming failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const audioBufferToWav = (buffer: AudioBuffer) => {
    const numOfChan = buffer.numberOfChannels;
    const length = buffer.length * numOfChan * 2 + 44;
    const bufferArray = new ArrayBuffer(length);
    const view = new DataView(bufferArray);
    let offset = 0;

    const writeString = (s: string) => {
      for (let i = 0; i < s.length; i++) view.setUint8(offset++, s.charCodeAt(i));
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
    <div className="max-w-5xl mx-auto p-4 md:p-6 font-sans text-slate-900 dark:text-slate-100 selection:bg-purple-100 relative">
      
      {/* --- ALERT (Indigo Focus) --- */}
      {alert.show && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-xs animate-in fade-in zoom-in slide-in-from-top-10 duration-300">
          <div className={`backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center justify-between border ${alert.type === 'error' ? 'bg-red-600/90 border-red-400/50' : 'bg-indigo-600/95 border-indigo-400/50'}`}>
            <div className="flex items-center gap-2.5">
              {alert.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
              <span className="text-[10px] font-black uppercase tracking-widest">{alert.msg}</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Uploader & Features (Purple) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm border-b-4 border-b-purple-600">
             <div className="flex items-center gap-2 text-purple-600 mb-6">
                <Scissors size={20} />
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Cutter Studio</span>
             </div>

             <label className="w-full aspect-square max-h-48 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group overflow-hidden relative">
                <Upload size={24} className="text-slate-300 group-hover:text-purple-600 group-hover:scale-110 transition-all" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Upload MP3</span>
                <input type="file" accept="audio/mp3,audio/mpeg" onChange={handleFileChange} className="hidden" />
                {file && (
                  <div className="absolute inset-0 bg-purple-600/95 flex items-center justify-center p-4 text-center">
                    <p className="text-white text-[10px] font-bold truncate w-full uppercase">{file.name}</p>
                  </div>
                )}
             </label>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {[
              { t: "Precise Trim", d: "Cut audio with millisecond accuracy" },
              { t: "Instant Play", d: "Preview your trim immediately" },
              { t: "Lossless Export", d: "Maintain original audio quality" }
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-purple-600 mb-1">{item.t}</h4>
                <p className="text-[11px] text-slate-400 font-medium">{item.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Timeline & Controls (Indigo Focus) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
            
            {/* --- VISUAL TIMELINE --- */}
            <div className="mb-10 px-2">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Visual Timeline</span>
                <div className="flex gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] uppercase font-bold opacity-40">Start</span>
                    <span className="text-xs font-black">{startTime.toFixed(2)}s</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] uppercase font-bold opacity-40">End</span>
                    <span className="text-xs font-black">{endTime.toFixed(2)}s</span>
                  </div>
                </div>
              </div>

              <div className="relative h-16 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center px-4">
                <div className="flex items-center gap-1 w-full opacity-20">
                  {[...Array(40)].map((_, i) => (
                    <div key={i} className="flex-1 bg-indigo-500 rounded-full" style={{ height: `${Math.random() * 100}%`, minHeight: '4px' }}></div>
                  ))}
                </div>
                
                <div className="absolute inset-x-4 inset-y-0 flex items-center">
                  <input 
                    type="range" min="0" max={duration} step="0.01" value={startTime} 
                    onChange={(e) => setStartTime(Math.min(parseFloat(e.target.value), endTime - 0.1))}
                    disabled={!file}
                    className="absolute w-full h-1 pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:rounded-md [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-lg"
                  />
                  <input 
                    type="range" min="0" max={duration} step="0.01" value={endTime} 
                    onChange={(e) => setEndTime(Math.max(parseFloat(e.target.value), startTime + 0.1))}
                    disabled={!file}
                    className="absolute w-full h-1 pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:rounded-md [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* --- ACTION PANEL --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><Clock size={12}/> Manual Start (sec)</label>
                 <input 
                  type="number" value={startTime} step="0.1"
                  onChange={(e) => setStartTime(parseFloat(e.target.value))}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold outline-none focus:border-indigo-500"
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><Clock size={12}/> Manual End (sec)</label>
                 <input 
                  type="number" value={endTime} step="0.1"
                  onChange={(e) => setEndTime(parseFloat(e.target.value))}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold outline-none focus:border-indigo-500"
                 />
               </div>
            </div>

            {/* --- CUSTOM AUDIO PLAYER --- */}
            <div className="bg-slate-900 rounded-3xl p-5 mb-8 flex items-center gap-5 shadow-2xl">
              <audio 
                ref={audioRef} 
                onPlay={() => setIsPlaying(true)} 
                onPause={() => setIsPlaying(false)} 
                onEnded={() => setIsPlaying(false)}
                className="hidden" 
              />
              <button 
                onClick={() => isPlaying ? audioRef.current?.pause() : audioRef.current?.play()}
                disabled={!file}
                className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-all active:scale-90 disabled:opacity-20"
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
              </button>
              <div className="flex-1">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 block">Audio Monitor</span>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full bg-indigo-500 ${isPlaying ? 'w-full' : 'w-0'} transition-all duration-1000 linear`}></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleCut}
                disabled={!file || loading}
                className={`flex-[2] py-4 rounded-2xl flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg ${
                  !file || loading ? 'bg-slate-100 text-slate-400' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20'
                }`}
              >
                {loading ? <RefreshCcw size={18} className="animate-spin" /> : <><Scissors size={18} /> Process Trim</>}
              </button>

              {cutAudioUrl && (
                <a 
                  href={cutAudioUrl} 
                  download="trimmed_audio.wav"
                  className="flex-1 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
                >
                  <Download size={18} /> Save File
                </a>
              )}
            </div>
          </div>
          
          <p className="text-center text-[8px] font-black uppercase tracking-[0.6em] opacity-20">Sample Accurate Clipping Engine v2.0</p>
        </div>
      </div>
    </div>
  );
};

export default MP3Cutter;