'use client';

import { useState, useRef } from 'react';
import { 
  Languages, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCcw,
  Sparkles,
  Type,
  FileText,
  Copy,
  Check
} from 'lucide-react';

interface Match {
  message: string;
  offset: number;
  length: number;
  replacements: { value: string }[];
}

export default function GrammarStudio() {
  const [text, setText] = useState('');
  const [matches, setMatches] = useState<Match[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [showToast, setShowToast] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const checkGrammar = async () => {
    if (!text.trim()) return;
    setStatus('loading');
    try {
      const response = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ text, language: 'en-US' }),
      });
      const data = await response.json();
      setMatches(data.matches || []);
      setStatus('done');
    } catch (error) {
      console.error(error);
      setStatus('idle');
    }
  };

  // Tag এ ক্লিক করলে সরাসরি টেক্সট রিপ্লেস হবে
  const applyFix = (replacement: string, offset: number, length: number) => {
    const newText = text.substring(0, offset) + replacement + text.substring(offset + length);
    setText(newText);
    
    // রিয়েল-টাইমে লিস্ট আপডেট (ঐ ভুলটা রিমুভ করা)
    setMatches(matches.filter(m => m.offset !== offset));
    
    // Success Toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const clear = () => {
    setText('');
    setMatches([]);
    setStatus('idle');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-4 md:p-8 font-sans flex flex-col items-center justify-center">
      
      {/* Toast Notification - Custom Design */}
      {showToast && (
        <div className="fixed top-10 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-indigo-400">
            <Check className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Fixed Successfully!</span>
          </div>
        </div>
      )}

      <div className="w-full max-w-[480px] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-xl relative">
        
        {/* Header */}
        <div className="bg-purple-600 p-5 text-white flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-purple-200" />
            <h1 className="text-[10px] font-black uppercase tracking-[0.2em]">Grammar Studio</h1>
          </div>
          <button onClick={clear} className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-all active:rotate-180 duration-500">
            <RefreshCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-5 md:p-6 space-y-5">
          {/* Input Area */}
          <div className="space-y-2">
            <div className="flex justify-between px-1">
              <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">Editor</p>
              <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">{text.length} Chars</p>
            </div>
            <textarea 
              ref={textAreaRef}
              rows={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing..."
              className="w-full bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-lg border border-slate-200 dark:border-zinc-800 text-xs font-bold outline-none focus:border-purple-500 transition-all dark:text-white resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button 
              onClick={checkGrammar}
              disabled={status === 'loading'}
              className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest shadow-md active:scale-95 transition-all"
            >
              {status === 'loading' ? <RefreshCcw className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
              {status === 'loading' ? 'Analyzing...' : 'Fix Errors'}
            </button>
            <button onClick={clear} className="px-5 py-3 border border-slate-200 dark:border-zinc-800 text-slate-400 hover:text-rose-500 rounded-lg transition-all">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="space-y-3">
             <div className="flex items-center gap-2 px-1">
                <FileText className="w-3 h-3 text-purple-500" />
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Suggestions List</p>
             </div>

            <div className="max-h-[220px] overflow-y-auto space-y-3 pr-1 scrollbar-thin">
              {status === 'done' && matches.length === 0 && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-800 rounded-lg flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <p className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-tighter">Everything looks perfect!</p>
                </div>
              )}

              {matches.map((match, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-zinc-800/40 p-4 rounded-lg border border-slate-100 dark:border-zinc-800 border-l-4 border-l-rose-500 animate-in slide-in-from-right-2 duration-300">
                  <div className="flex gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <div className="space-y-3 w-full">
                      <p className="text-[10px] font-bold text-slate-700 dark:text-zinc-200 uppercase leading-tight tracking-tight">
                        {match.message}
                      </p>
                      
                      {match.replacements.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {match.replacements.slice(0, 3).map((rep, i) => (
                            <button 
                              key={i} 
                              onClick={() => applyFix(rep.value, match.offset, match.length)}
                              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[8px] font-black rounded uppercase flex items-center gap-1 shadow-sm transition-all active:scale-90"
                            >
                              <Check className="w-2.5 h-2.5" />
                              {rep.value}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-dashed border-slate-100 dark:border-zinc-800 text-center">
             <p className="text-[7px] font-bold text-slate-300 dark:text-zinc-600 uppercase tracking-[0.5em]">ToolsBD Grammar Engine</p>
          </div>
        </div>
      </div>
    </div>
  );
}