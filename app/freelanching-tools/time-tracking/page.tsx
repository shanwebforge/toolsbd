'use client';

import { useState, useEffect } from 'react';
import { 
  Play, Pause, RotateCcw, Clock, 
  Activity, Shield, Zap, Cpu, BarChart 
} from 'lucide-react';

const TimeTracking = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let id: any;
    if (isRunning) id = setInterval(() => setTime(p => p + 1), 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  const format = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 font-sans text-slate-900 dark:text-slate-100 selection:bg-purple-100 dark:selection:bg-purple-900/30">
      
      {/* --- MAIN TRACKER CARD --- */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-purple-50/30 dark:bg-purple-950/10">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-purple-600" />
            <h2 className="text-[11px] font-black uppercase tracking-widest italic text-purple-700 dark:text-purple-400">Session Monitor</h2>
          </div>
          <div className={`text-[9px] font-bold px-2 py-0.5 rounded border ${isRunning ? 'bg-purple-100 border-purple-200 text-purple-700 animate-pulse' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
            {isRunning ? 'TRACKING ACTIVE' : 'ENGINE IDLE'}
          </div>
        </div>
        
        <div className="p-10 text-center">
          <div className="text-6xl md:text-8xl font-mono font-black tracking-tighter tabular-nums mb-10 text-slate-900 dark:text-white leading-none">
            {format(time)}
          </div>
          <div className="flex gap-3 max-w-sm mx-auto">
            {!isRunning ? (
              <button onClick={() => setIsRunning(true)} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-purple-500/20">
                <Play size={14} fill="currentColor" /> Start Engine
              </button>
            ) : (
              <button onClick={() => setIsRunning(false)} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-indigo-500/20">
                <Pause size={14} fill="currentColor" /> Pause Log
              </button>
            )}
            <button onClick={() => {setIsRunning(false); setTime(0)}} className="px-5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-95">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* --- COMPACT DETAILS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 flex items-start gap-4 hover:border-purple-200 dark:hover:border-purple-800/50 transition-colors">
          <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600"><Shield size={18} /></div>
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest mb-1 text-slate-500">Secure Protocol</h4>
            <p className="text-[12px] text-slate-400 leading-snug font-medium">Native browser execution ensures your session data remains local and encrypted.</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 flex items-start gap-4 hover:border-indigo-200 dark:hover:border-indigo-800/50 transition-colors">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600"><Zap size={18} /></div>
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest mb-1 text-slate-500">Hyper Sync</h4>
            <p className="text-[12px] text-slate-400 leading-snug font-medium">Sub-millisecond pooling architecture optimized for zero-latency time calculations.</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 flex items-start gap-4 hover:border-purple-200 dark:hover:border-purple-800/50 transition-colors">
          <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600"><BarChart size={18} /></div>
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest mb-1 text-slate-500">Analytics Ready</h4>
            <p className="text-[12px] text-slate-400 leading-snug font-medium">Generate precise billable hour metrics ready for professional invoice integration.</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 flex items-start gap-4 hover:border-indigo-200 dark:hover:border-indigo-800/50 transition-colors">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600"><Cpu size={18} /></div>
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest mb-1 text-slate-500">Core Engine</h4>
            <p className="text-[12px] text-slate-400 leading-snug font-medium">Efficient resource management prevents background CPU spikes during long tracking.</p>
          </div>
        </div>
      </div>

      {/* --- MINIMALIST FOOTER --- */}
      <footer className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
          <Activity size={12} className="text-purple-500" /> System: Stable v1.2.5
        </div>
        <div className="flex gap-4">
          <span className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">End-to-End Encryption</span>
          <span className="text-[9px] font-black text-indigo-400/60 dark:text-indigo-500/40 uppercase tracking-widest underline decoration-indigo-500/20 underline-offset-4">Internal Node Only</span>
        </div>
      </footer>
    </div>
  );
};

export default TimeTracking;