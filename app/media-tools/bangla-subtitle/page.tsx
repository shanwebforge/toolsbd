'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Type, 
  Upload, 
  Download, 
  Trash2, 
  Clock, 
  Video, 
  Languages, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Play
} from 'lucide-react';

interface Subtitle {
  id: string;
  start: number;
  end: number;
  text: string;
  lang: string;
}

const SubtitleGenerator = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(3);
  const [selectedLang, setSelectedLang] = useState('English');
  const [activeSubtitle, setActiveSubtitle] = useState('');
  const [alert, setAlert] = useState({ show: false, msg: '', type: 'success' });

  const videoRef = useRef<HTMLVideoElement>(null);

  const languages = [
    { name: 'English', font: 'font-sans' },
    { name: 'Bangla', font: 'font-serif' },
    { name: 'Hindi', font: 'font-sans' },
    { name: 'Urdu', font: 'font-serif' }
  ];

  const triggerAlert = (msg: string, type: 'success' | 'error' = 'success') => {
    setAlert({ show: true, msg, type });
    setTimeout(() => setAlert({ show: false, msg: '', type: 'success' }), 3000);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) { // 50MB limit example
      triggerAlert("File too large. Max 50MB allowed.", "error");
      return;
    }

    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setSubtitles([]);
    triggerAlert("Video uploaded successfully!");
  };

  const addSubtitle = () => {
    if (!currentText.trim() || !videoUrl) {
      triggerAlert("Please enter text and upload a video", "error");
      return;
    }

    if (startTime >= endTime) {
      triggerAlert("Start time must be before end time", "error");
      return;
    }

    const newSub: Subtitle = {
      id: Date.now().toString(),
      start: startTime,
      end: endTime,
      text: currentText,
      lang: selectedLang
    };

    const updated = [...subtitles, newSub].sort((a, b) => a.start - b.start);
    setSubtitles(updated);
    setCurrentText('');
    setStartTime(endTime);
    setEndTime(endTime + 3);
    triggerAlert("Subtitle added!");
  };

  const deleteSubtitle = (id: string) => {
    setSubtitles(subtitles.filter(s => s.id !== id));
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const now = videoRef.current.currentTime;
    const active = subtitles.find(s => now >= s.start && now <= s.end);
    setActiveSubtitle(active ? active.text : '');
  };

  const downloadSRT = () => {
    if (subtitles.length === 0) return;

    let content = '';
    subtitles.forEach((s, i) => {
      content += `${i + 1}\n${formatTime(s.start)} --> ${formatTime(s.end)}\n${s.text}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subtitles_${selectedLang.toLowerCase()}.srt`;
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 font-sans text-slate-900 dark:text-slate-100 relative">
      
      {/* --- ALERT SYSTEM --- */}
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT: VIDEO PREVIEW & MONITOR --- */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-slate-800 relative group aspect-video flex items-center justify-center">
            {videoUrl ? (
              <>
                <video 
                  ref={videoRef}
                  src={videoUrl} 
                  controls 
                  onTimeUpdate={handleTimeUpdate}
                  className="w-full h-full object-contain"
                />
                {/* --- LIVE SUBTITLE OVERLAY --- */}
                {activeSubtitle && (
                  <div className="absolute bottom-12 left-0 right-0 text-center px-4 pointer-events-none">
                    <span className="bg-black/80 text-white px-4 py-2 rounded-lg text-lg md:text-xl font-medium shadow-xl border border-white/10 backdrop-blur-sm">
                      {activeSubtitle}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center space-y-4 opacity-30">
                <Video size={64} className="mx-auto" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em]">Preview Monitor</p>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm border-b-4 border-b-purple-600">
             <div className="flex items-center gap-2 text-purple-600 mb-6">
                <Upload size={20} />
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Video Source</span>
             </div>
             <label className="flex items-center justify-center w-full py-10 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group">
                <div className="text-center">
                  <Plus size={24} className="mx-auto text-slate-300 mb-2 group-hover:text-purple-600 transition-colors" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Click to Upload MP4/WebM</span>
                </div>
                <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
             </label>
          </div>
        </div>

        {/* --- RIGHT: EDITOR & LIST --- */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-2 text-indigo-600">
                  <Type size={18} />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">Subtitle Editor</span>
               </div>
               <select 
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="bg-slate-100 dark:bg-slate-800 text-[10px] font-bold px-3 py-1 rounded-full outline-none border-none cursor-pointer"
               >
                 {languages.map(l => <option key={l.name} value={l.name}>{l.name}</option>)}
               </select>
            </div>

            <div className="space-y-4">
              <textarea 
                placeholder={`Type ${selectedLang} subtitle here...`}
                value={currentText}
                onChange={(e) => setCurrentText(e.target.value)}
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-medium outline-none focus:border-indigo-500 min-h-[100px] resize-none"
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Start (sec)</label>
                  <input 
                    type="number" step="0.1" value={startTime}
                    onChange={(e) => setStartTime(parseFloat(e.target.value))}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1 block">End (sec)</label>
                  <input 
                    type="number" step="0.1" value={endTime}
                    onChange={(e) => setEndTime(parseFloat(e.target.value))}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold outline-none"
                  />
                </div>
              </div>

              <button 
                onClick={addSubtitle}
                className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
              >
                <Plus size={16} /> Add to Timeline
              </button>
            </div>

            {/* --- SUBTITLE LIST --- */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Timeline Items</span>
                <span className="text-[9px] font-bold opacity-40">{subtitles.length} lines</span>
              </div>
              
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {subtitles.length === 0 ? (
                  <p className="text-center py-10 text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">No subtitles yet</p>
                ) : (
                  subtitles.map((sub) => (
                    <div key={sub.id} className="group bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-transparent hover:border-indigo-200 dark:hover:border-indigo-900 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2 text-indigo-500">
                          <Clock size={10} />
                          <span className="text-[9px] font-black">{sub.start.toFixed(1)}s - {sub.end.toFixed(1)}s</span>
                          <span className="bg-white dark:bg-slate-700 px-2 py-0.5 rounded text-[8px] uppercase tracking-tighter">{sub.lang}</span>
                        </div>
                        <button onClick={() => deleteSubtitle(sub.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                          <Trash2 size={12} />
                        </button>
                      </div>
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed">{sub.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button 
              onClick={downloadSRT}
              disabled={subtitles.length === 0}
              className="w-full mt-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all active:scale-95 disabled:opacity-20"
            >
              <Download size={16} /> Export .SRT File
            </button>
          </div>
          <p className="text-center text-[8px] font-black uppercase tracking-[0.6em] opacity-20">Subtitle Master Engine v3.0</p>
        </div>
      </div>
    </div>
  );
};

export default SubtitleGenerator;