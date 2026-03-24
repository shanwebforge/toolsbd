'use client';

import { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  GraduationCap, 
  RefreshCcw,
  LayoutGrid,
  PenLine
} from 'lucide-react';

export default function GradeCalculator() {
  const [activeTab, setActiveTab] = useState<'gpa' | 'cgpa'>('gpa');
  const [gpaInputs, setGpaInputs] = useState([{ id: 1, name: '', point: '' }]);
  const [gpaResult, setGpaResult] = useState<number>(0);
  const [cgpaInputs, setCgpaInputs] = useState([{ id: 1, name: '', gpa: '', credit: '' }]);
  const [cgpaResult, setCgpaResult] = useState<number>(0);

  const calculateGPA = () => {
    let total = 0, count = 0;
    gpaInputs.forEach(i => {
      const p = parseFloat(i.point);
      if (!isNaN(p)) { total += p; count++; }
    });
    setGpaResult(count > 0 ? total / count : 0);
  };

  const calculateCGPA = () => {
    let totalPoints = 0, totalCredits = 0;
    cgpaInputs.forEach(i => {
      const g = parseFloat(i.gpa);
      const c = parseFloat(i.credit);
      if (!isNaN(g) && !isNaN(c)) { totalPoints += g * c; totalCredits += c; }
    });
    setCgpaResult(totalCredits > 0 ? totalPoints / totalCredits : 0);
  };

  const reset = () => {
    setGpaInputs([{id: Date.now(), name: '', point: '' }]);
    setCgpaInputs([{id: Date.now(), name: '', gpa: '', credit: '' }]);
    setGpaResult(0);
    setCgpaResult(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-4 md:p-8 font-sans flex flex-col items-center justify-center">
      {/* Compact Container */}
      <div className="w-full max-w-[480px] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-xl">
        
        {/* Header Section */}
        <div className="bg-purple-600 p-5 text-white">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              <h1 className="text-[10px] font-black uppercase tracking-[0.2em]">Grade Studio</h1>
            </div>
            <button onClick={reset} className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-all active:rotate-180 duration-500">
              <RefreshCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tab Switcher - Simple & Compact */}
          <div className="flex bg-black/20 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('gpa')}
              className={`flex-1 py-2 text-[9px] font-bold uppercase tracking-widest rounded-md transition-all ${activeTab === 'gpa' ? 'bg-white text-purple-600 shadow-sm' : 'text-white/60'}`}
            >
              GPA (Average)
            </button>
            <button 
              onClick={() => setActiveTab('cgpa')}
              className={`flex-1 py-2 text-[9px] font-bold uppercase tracking-widest rounded-md transition-all ${activeTab === 'cgpa' ? 'bg-white text-purple-600 shadow-sm' : 'text-white/60'}`}
            >
              CGPA (Credits)
            </button>
          </div>
        </div>

        <div className="p-5 md:p-6 space-y-5">
          {/* List Section */}
          <div className="max-h-[320px] overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-zinc-800">
            {(activeTab === 'gpa' ? gpaInputs : cgpaInputs).map((input) => (
              <div key={input.id} className="bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-100 dark:border-zinc-800 transition-all">
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-zinc-700 pb-1.5 mb-2">
                  <PenLine className="w-3 h-3 text-purple-500" />
                  <input 
                    type="text" 
                    value={input.name}
                    onChange={(e) => activeTab === 'gpa' 
                      ? setGpaInputs(gpaInputs.map(i => i.id === input.id ? {...i, name: e.target.value} : i))
                      : setCgpaInputs(cgpaInputs.map(i => i.id === input.id ? {...i, name: e.target.value} : i))
                    }
                    placeholder="Subject Name"
                    className="w-full bg-transparent text-[9px] font-bold uppercase outline-none text-slate-500 dark:text-zinc-400 placeholder:opacity-50"
                  />
                </div>
                
                <div className="flex gap-3 items-center">
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    {activeTab === 'gpa' ? (
                      <div className="col-span-2">
                        <p className="text-[7px] font-bold text-slate-400 uppercase mb-1 px-1">Grade Point</p>
                        <input 
                          type="number" 
                          value={(input as any).point}
                          onChange={(e) => setGpaInputs(gpaInputs.map(i => i.id === input.id ? {...i, point: e.target.value} : i))}
                          placeholder="0.00"
                          className="w-full bg-white dark:bg-zinc-900 p-2 rounded border border-slate-200 dark:border-zinc-700 font-mono font-bold text-xs outline-none focus:border-purple-500 dark:text-white"
                        />
                      </div>
                    ) : (
                      <>
                        <div>
                          <p className="text-[7px] font-bold text-slate-400 uppercase mb-1 px-1">GPA</p>
                          <input type="number" value={(input as any).gpa} onChange={(e) => setCgpaInputs(cgpaInputs.map(i => i.id === input.id ? {...i, gpa: e.target.value} : i))} placeholder="0.00" className="w-full bg-white dark:bg-zinc-900 p-2 rounded border border-slate-200 dark:border-zinc-700 font-mono font-bold text-xs outline-none focus:border-purple-500 dark:text-white" />
                        </div>
                        <div>
                          <p className="text-[7px] font-bold text-slate-400 uppercase mb-1 px-1">Credit</p>
                          <input type="number" value={(input as any).credit} onChange={(e) => setCgpaInputs(cgpaInputs.map(i => i.id === input.id ? {...i, credit: e.target.value} : i))} placeholder="0" className="w-full bg-white dark:bg-zinc-900 p-2 rounded border border-slate-200 dark:border-zinc-700 font-mono font-bold text-xs outline-none focus:border-purple-500 dark:text-white" />
                        </div>
                      </>
                    )}
                  </div>
                  {(activeTab === 'gpa' ? gpaInputs.length : cgpaInputs.length) > 1 && (
                    <button onClick={() => activeTab === 'gpa' ? setGpaInputs(gpaInputs.filter(i => i.id !== input.id)) : setCgpaInputs(cgpaInputs.filter(i => i.id !== input.id))} className="mt-3 p-1.5 text-rose-500 hover:bg-rose-50 rounded transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={() => activeTab === 'gpa' ? setGpaInputs([...gpaInputs, {id: Date.now(), name: '', point: ''}]) : setCgpaInputs([...cgpaInputs, {id: Date.now(), name: '', gpa: '', credit: ''}])}
              className="flex-1 py-2.5 border border-dashed border-slate-200 dark:border-zinc-800 rounded-lg text-[8px] font-bold uppercase tracking-widest text-slate-400 hover:text-purple-600 transition-all"
            >
              + Add {activeTab === 'gpa' ? 'Subject' : 'Entry'}
            </button>
            <button 
              onClick={activeTab === 'gpa' ? calculateGPA : calculateCGPA}
              className="px-8 py-2.5 bg-purple-600 text-white rounded-lg text-[9px] font-bold uppercase tracking-widest shadow-md active:scale-95 transition-all"
            >
              Calculate
            </button>
          </div>

          {/* Compact Result Display - Indigo Theme */}
          <div className="p-5 bg-indigo-600 rounded-lg shadow-lg flex justify-between items-center relative overflow-hidden group">
            <div className="absolute right-0 top-0 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700">
              <LayoutGrid className="w-20 h-20 text-white" />
            </div>
            <div className="relative z-10">
               <span className="text-[8px] font-bold text-indigo-100 uppercase tracking-[0.3em]">{activeTab === 'gpa' ? 'Average GPA' : 'Total CGPA'}</span>
               <h2 className="text-3xl font-black font-mono text-white tracking-tighter mt-0.5">
                 {(activeTab === 'gpa' ? gpaResult : cgpaResult).toFixed(2)}
               </h2>
            </div>
            <div className="relative z-10 text-right">
                <div className="px-3 py-1 bg-white/10 border border-white/20 rounded-md">
                   <span className="text-[9px] font-black text-white italic uppercase">{activeTab} Result</span>
                </div>
            </div>
          </div>

          {/* Minimal Footer */}
          <div className="pt-4 border-t border-dashed border-slate-100 dark:border-zinc-800 text-center">
             <p className="text-[7px] font-bold text-slate-300 dark:text-zinc-600 uppercase tracking-[0.5em]">Academic Calc System</p>
          </div>
        </div>
      </div>
    </div>
  );
}