'use client';

import { useState } from 'react';
import { evaluate } from 'mathjs';
import { 
  Calculator, 
  Trash2, 
  Equal, 
  Variable, 
  Sparkles,
  RefreshCcw,
  BookOpen
} from 'lucide-react';

export default function MathSolver() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const solveMath = () => {
    try {
      const solved = evaluate(expression);
      setResult(String(solved));
      setError(false);
    } catch (err) {
      setResult('Invalid Expression');
      setError(true);
    }
  };

  const clear = () => {
    setExpression('');
    setResult(null);
    setError(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-4 md:p-8 font-sans flex flex-col items-center justify-center">
      
      {/* Compact Container */}
      <div className="w-full max-w-[480px] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-xl">
        
        {/* Header - Purple Theme */}
        <div className="bg-purple-600 p-5 text-white flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-purple-200" />
            <h1 className="text-[10px] font-black uppercase tracking-[0.2em]">AI Math Solver</h1>
          </div>
          <button onClick={clear} className="p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
            <RefreshCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-5 md:p-6 space-y-5">
          
          {/* Input Section */}
          <div className="space-y-2">
            <p className="text-[8px] font-bold text-slate-400 uppercase px-1 tracking-widest">Enter Equation</p>
            <div className="relative group">
              <input 
                type="text" 
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="e.g. 10 * (5 + 2) / sqrt(16)"
                className="w-full bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-lg border border-slate-200 dark:border-zinc-800 text-sm font-mono font-bold outline-none focus:border-purple-500 transition-all dark:text-white"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-100 transition-opacity">
                <Variable className="w-4 h-4 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="flex gap-3">
             <button 
                onClick={solveMath}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-md active:scale-95 transition-all"
             >
                <Sparkles className="w-3 h-3" /> Solve Now
             </button>
             <button 
                onClick={clear}
                className="px-5 py-3 border border-slate-200 dark:border-zinc-800 text-slate-400 hover:text-rose-500 rounded-lg transition-all"
             >
                <Trash2 className="w-4 h-4" />
             </button>
          </div>

          {/* Result Card - Indigo Theme */}
          <div className={`p-6 rounded-lg shadow-lg flex justify-between items-center relative overflow-hidden group transition-colors ${error ? 'bg-rose-500' : 'bg-indigo-600'}`}>
            <div className="absolute right-0 top-0 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700">
              <Equal className="w-24 h-24 text-white" />
            </div>
            
            <div className="relative z-10">
               <span className="text-[8px] font-bold text-indigo-100 uppercase tracking-[0.3em]">Computed Result</span>
               <h2 className="text-3xl font-black font-mono text-white tracking-tighter mt-1 truncate max-w-[200px]">
                 {result !== null ? result : '0.00'}
               </h2>
            </div>

            <div className="relative z-10 text-right">
                <div className="px-3 py-1 bg-white/10 border border-white/20 rounded-md">
                   <span className="text-[9px] font-black text-white italic uppercase tracking-widest italic">Solution</span>
                </div>
                <p className={`text-[7px] font-bold uppercase mt-3 tracking-widest opacity-60 ${error ? 'text-white' : 'text-indigo-200'}`}>
                  {error ? 'Syntax Error' : 'Accuracy: High'}
                </p>
            </div>
          </div>

          {/* Feature List / Guide */}
          <div className="grid grid-cols-2 gap-3 pt-2">
             <div className="p-3 bg-slate-50 dark:bg-zinc-800/30 rounded-lg border border-slate-100 dark:border-zinc-800">
                <p className="text-[7px] font-black text-slate-400 uppercase mb-1 italic">Supports</p>
                <p className="text-[9px] font-bold text-slate-600 dark:text-zinc-400">Basic Math (+, -, *, /)</p>
             </div>
             <div className="p-3 bg-slate-50 dark:bg-zinc-800/30 rounded-lg border border-slate-100 dark:border-zinc-800">
                <p className="text-[7px] font-black text-slate-400 uppercase mb-1 italic">Advanced</p>
                <p className="text-[9px] font-bold text-slate-600 dark:text-zinc-400">Sin, Cos, Sqrt, Log</p>
             </div>
          </div>

          {/* Minimal Footer */}
          <div className="pt-4 border-t border-dashed border-slate-100 dark:border-zinc-800 text-center">
             <div className="inline-flex items-center gap-2 opacity-30">
                <BookOpen className="w-3 h-3 text-slate-400" />
                <p className="text-[7px] font-bold text-slate-500 uppercase tracking-[0.5em]">Math Engine v3.0</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}