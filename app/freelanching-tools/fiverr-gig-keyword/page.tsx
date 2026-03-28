'use client';

import { useState } from 'react';
import { 
  Search, Copy, CheckCircle2, X, Zap, 
  ShieldCheck, Globe, MousePointer2, RefreshCcw 
} from 'lucide-react';

const FiverrGigKeywordTool = () => {
  const [keywordInput, setKeywordInput] = useState('');
  const [generatedKeywords, setGeneratedKeywords] = useState<string[]>([]);
  const [alert, setAlert] = useState({ show: false, msg: '' });

  const triggerAlert = (msg: string) => {
    setAlert({ show: true, msg });
    setTimeout(() => setAlert({ show: false, msg: '' }), 3000);
  };

  const generateKeywords = () => {
    if (!keywordInput.trim()) {
      triggerAlert("Please enter a base keyword!");
      return;
    }

    const base = keywordInput.toLowerCase().trim();
    const suggestions = [
      base, `${base} service`, `best ${base}`, `top rated ${base}`,
      `cheap ${base}`, `${base} for business`, `professional ${base}`,
      `custom ${base}`, `${base} expert`, `${base} gig`, `${base} seller`,
      `${base} on fiverr`, `${base} in 24 hours`, `unique ${base}`,
      `seo optimized ${base}`, `${base} portfolio`, `creative ${base}`,
      `premium ${base} package`, `affordable ${base}`, `${base} agency`
    ];

    setGeneratedKeywords(suggestions);
    triggerAlert("Keywords Generated!");
  };

  const copyToClipboard = (text: string, isAll = false) => {
    navigator.clipboard.writeText(text).then(() => {
      triggerAlert(isAll ? "All Keywords Copied!" : "Keyword Copied!");
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 font-sans text-slate-900 dark:text-slate-100 selection:bg-purple-100 relative">
      
      {/* --- FIXED CENTERED ALERT (TOP-CENTER) --- */}
      {alert.show && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-xs animate-in fade-in zoom-in slide-in-from-top-10 duration-300 px-4">
          <div className="bg-indigo-600/95 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center justify-between border border-indigo-400/50">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} />
              <span className="text-[11px] font-black uppercase tracking-widest">{alert.msg}</span>
            </div>
            <button onClick={() => setAlert({ show: false, msg: '' })} className="p-1 opacity-70 hover:opacity-100">
              <X size={16}/>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left: Search Panel (Purple Primary) */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm border-b-4 border-b-purple-600">
            <div className="flex items-center gap-2 mb-6 text-purple-600">
                <Search size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Keyword Research</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[9px] font-black uppercase text-purple-600 ml-1 mb-1 block">Root Keyword</label>
                <input 
                  type="text" 
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="e.g. logo design" 
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none focus:border-indigo-500 transition-all" 
                />
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={generateKeywords}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-black py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg shadow-purple-500/20"
                >
                  <Zap size={14} fill="currentColor" /> Generate Tags
                </button>
                
                <button 
                  onClick={() => copyToClipboard(generatedKeywords.join(", "), true)}
                  disabled={generatedKeywords.length === 0}
                  className="w-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600 text-[10px] font-black py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-[0.2em] transition-all disabled:opacity-50"
                >
                  <Copy size={14} /> Bulk Copy Tags
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Output Cloud (Focus Indigo) */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm h-full flex flex-col min-h-[400px]">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/20">
                <div className="flex items-center gap-2">
                    <Globe size={14} className="text-indigo-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Ranking Suggestions</span>
                </div>
                <div className="text-[9px] font-bold text-slate-400 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
                    {generatedKeywords.length} tags
                </div>
            </div>

            <div className="p-6 flex-1">
              {generatedKeywords.length > 0 ? (
                <div className="flex flex-wrap gap-2.5">
                  {generatedKeywords.map((keyword, index) => (
                    <button
                      key={index}
                      onClick={() => copyToClipboard(keyword)}
                      className="group relative px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 focus:ring-2 focus:ring-indigo-500 transition-all flex items-center gap-2"
                    >
                      <span>{keyword}</span>
                      <MousePointer2 size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 py-20">
                  <RefreshCcw size={40} className="mb-4 opacity-10 animate-spin-slow" />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 italic">Input Root Key</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- INFO TILES (Purple/Indigo Theme) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
            { icon: <Zap size={20}/>, t: "SEO Optimized", d: "High volume keys.", c: "text-purple-600" },
            { icon: <ShieldCheck size={20}/>, t: "Secure", d: "Local processing.", c: "text-indigo-600" },
            { icon: <Globe size={20}/>, t: "Global", d: "Worldwide reach.", c: "text-purple-600" }
        ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex items-center gap-4">
                <div className={`w-10 h-10 bg-slate-50 dark:bg-slate-800/50 ${item.c} rounded-lg flex items-center justify-center`}>{item.icon}</div>
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.t}</h4>
                    <p className="text-[11px] text-slate-400 font-medium">{item.d}</p>
                </div>
            </div>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800"></div>
    </div>
  );
};

export default FiverrGigKeywordTool;