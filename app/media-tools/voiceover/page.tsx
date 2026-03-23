'use client';

import { useState, useRef } from 'react';
import { 
  Mic2, Play, Download, CheckCircle2, X, 
  Volume2, FastForward, Music, Settings, RefreshCcw,
  Pause, VolumeX
} from 'lucide-react';

const VoiceoverGenerator = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: '', type: 'success' });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const triggerAlert = (msg: string, type: 'success' | 'error' = 'success') => {
    setAlert({ show: true, msg, type });
    setTimeout(() => setAlert({ show: false, msg: '', type: 'success' }), 3000);
  };

  const generateVoice = async () => {
    if (!text.trim()) {
      triggerAlert("অনুগ্রহ করে কিছু টেক্সট লিখুন।", 'error');
      return;
    }

    setLoading(true);
    setAudioUrl(null); // Reset previous audio

    try {
      const response = await fetch("https://voiceover-api-1.onrender.com/api/voiceover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim() })
      });

      if (!response.ok) throw new Error("Failed to generate");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setAudioUrl(url);
      triggerAlert("✅ ভয়েস তৈরি হয়েছে! এখন শুনতে পারেন।");
    } catch (error) {
      triggerAlert("❌ সার্ভার সমস্যা! আবার চেষ্টা করুন।", 'error');
    } finally {
      setLoading(false);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const downloadAudio = () => {
    if (audioUrl) {
      const a = document.createElement("a");
      a.href = audioUrl;
      a.download = `shan_voice_${Date.now()}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      triggerAlert("✅ ডাউনলোড শুরু হয়েছে!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 font-sans text-slate-900 dark:text-slate-100 selection:bg-purple-100 relative">
      
      {/* --- FIXED CENTERED ALERT --- */}
      {alert.show && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-xs animate-in fade-in zoom-in slide-in-from-top-10 duration-300 px-4">
          <div className={`backdrop-blur-md text-white px-5 py-3 rounded-xl shadow-2xl flex items-center justify-between border ${alert.type === 'error' ? 'bg-red-600/90 border-red-400/50' : 'bg-indigo-600/95 border-indigo-400/50'}`}>
            <div className="flex items-center gap-3">
              {alert.type === 'error' ? <X size={16} /> : <CheckCircle2 size={16} />}
              <span className="text-[10px] font-black uppercase tracking-widest">{alert.msg}</span>
            </div>
          </div>
        </div>
      )}

      {/* --- MAIN GENERATOR BOX --- */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 md:p-8 shadow-xl mb-6 border-b-4 border-b-purple-600">
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-3 text-purple-600">
            <Mic2 size={20} strokeWidth={2.5} />
            <span className="text-[11px] font-black uppercase tracking-[0.3em]">Voice Studio Pro</span>
          </div>
          <div className="flex gap-1.5 items-center">
            {loading && <RefreshCcw size={14} className="animate-spin text-indigo-500 mr-2" />}
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="এখানে আপনার বাংলা টেক্সট পেস্ট করুন..."
          className="w-full p-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-md font-medium leading-relaxed outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all min-h-[200px] md:min-h-[250px] resize-none selection:bg-indigo-100 shadow-inner"
        />

        {/* --- DYNAMIC PLAYER SECTION (Focus Indigo) --- */}
        {audioUrl && (
          <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <button 
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all active:scale-90"
            >
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="ml-1" fill="currentColor" />}
            </button>
            <div className="flex-1">
              <div className="h-1.5 w-full bg-indigo-200 dark:bg-indigo-800 rounded-full overflow-hidden">
                <div className={`h-full bg-indigo-600 ${isPlaying ? 'w-full transition-all duration-[10s] linear' : 'w-0'}`}></div>
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mt-2">Ready to preview</p>
            </div>
            <audio 
              ref={audioRef} 
              src={audioUrl} 
              onEnded={() => setIsPlaying(false)} 
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="hidden" 
            />
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => { setText(''); setAudioUrl(null); }}
            className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-500"
          >
            <RefreshCcw size={14} /> Reset
          </button>

          {!audioUrl ? (
            <button
              onClick={generateVoice}
              disabled={loading}
              className={`flex-[2] flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg ${
                loading 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20'
              }`}
            >
              {loading ? <RefreshCcw size={16} className="animate-spin" /> : <><Play size={14} fill="currentColor" /> Create Audio</>}
            </button>
          ) : (
            <button
              onClick={downloadAudio}
              className="flex-[2] flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20"
            >
              <Download size={16} /> Download MP3
            </button>
          )}
        </div>
      </div>

      {/* --- INFO TILES --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <Volume2 size={18}/>, t: "প্রাকৃতিক শব্দ", d: "বাংলা টেক্সট থেকে ন্যাচারাল ভয়েস" },
          { icon: <FastForward size={18}/>, t: "ইনস্ট্যান্ট প্লে", d: "ডাউনলোড করার আগেই শুনে নিন" },
          { icon: <Music size={18}/>, t: "MP3 এক্সপোর্ট", d: "হাই-কোয়ালিটি অডিও ফাইল" },
          { icon: <Settings size={18}/>, t: "ক্লিন অডিও", d: "ব্যাকগ্রাউন্ড নয়েজ মুক্ত ভয়েস" }
        ].map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50 p-5 rounded-2xl flex items-start gap-4 transition-all hover:translate-y-[-2px]">
            <div className="mt-1 text-purple-600 bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg">{item.icon}</div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1">{item.t}</h4>
              <p className="text-[11px] text-slate-400 font-medium leading-snug">{item.d}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 pt-4 border-t border-slate-100 dark:border-slate-800 opacity-20 text-center italic text-[8px] font-black uppercase tracking-[0.5em]">
          Creative Studio by Shan
      </div>
    </div>
  );
};

export default VoiceoverGenerator;