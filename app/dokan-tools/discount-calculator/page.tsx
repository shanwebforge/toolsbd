'use client';

import { useState, useEffect } from 'react';
import { 
  Percent, 
  Tag, 
  Wallet, 
  RefreshCcw,
  BadgePercent,
  Calculator,
  ArrowRight
} from 'lucide-react';

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<string>('');
  const [savedAmount, setSavedAmount] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);

  useEffect(() => {
    const price = parseFloat(originalPrice) || 0;
    const discount = parseFloat(discountPercent) || 0;
    
    const saving = (price * discount) / 100;
    setSavedAmount(saving);
    setFinalPrice(price - saving);
  }, [originalPrice, discountPercent]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-4 md:p-8 flex items-center justify-center font-sans">
      {/* কার্ডের সাইজ w-full এবং max-w-[450px] করা হয়েছে যাতে বড় দেখায় */}
      <div className="w-full max-w-[450px] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-2xl transition-all">
        
        {/* Header - Stronger & Larger */}
        <div className="bg-purple-600 p-6 text-white flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Calculator className="w-5 h-5" />
            </div>
            <h1 className="text-xs md:text-sm font-black uppercase tracking-[0.2em]">Discount Calculator</h1>
          </div>
          <button 
            onClick={() => {setOriginalPrice(''); setDiscountPercent('');}}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all active:rotate-180 duration-500"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Inputs Section */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                <Tag className="w-3.5 h-3.5 text-indigo-500" /> Original Price (BDT)
              </label>
              <input 
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full p-4 bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-lg text-base font-mono font-bold outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-800 dark:text-white"
                placeholder="Enter amount..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                <BadgePercent className="w-3.5 h-3.5 text-indigo-500" /> Discount Rate (%)
              </label>
              <input 
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="w-full p-4 bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-lg text-base font-mono font-bold outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-800 dark:text-white"
                placeholder="0"
              />
            </div>
          </div>

          {/* Savings Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 dark:bg-emerald-500/5 p-4 rounded-lg border border-emerald-100 dark:border-emerald-500/10 transition-colors">
               <p className="text-[8px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">Total Savings</p>
               <h3 className="text-sm md:text-base font-black font-mono text-emerald-600 tracking-tight">৳{savedAmount.toLocaleString()}</h3>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/20">
               <p className="text-[8px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">Tax/Discounted</p>
               <h3 className="text-sm md:text-base font-black font-mono text-indigo-600 dark:text-indigo-400 tracking-tight">৳{finalPrice.toLocaleString()}</h3>
            </div>
          </div>

          {/* Final Large Display Card - Secondary Indigo */}
          <div className="p-6 bg-indigo-600 rounded-lg shadow-xl shadow-indigo-500/20 flex justify-between items-center relative overflow-hidden group mt-2">
            <div className="absolute right-0 top-0 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700">
                <Wallet className="w-24 h-24 text-white" />
            </div>
            <div className="relative z-10">
               <span className="text-[9px] font-bold text-indigo-100 uppercase tracking-[0.3em] flex items-center gap-2">
                 Payable Amount <ArrowRight className="w-3 h-3" />
               </span>
               <h2 className="text-3xl font-black font-mono text-white tracking-tighter mt-1">
                 ৳{finalPrice.toLocaleString()}
               </h2>
            </div>
            <div className="relative z-10 px-4 py-2 bg-white/10 rounded-md backdrop-blur-md border border-white/20">
                <span className="text-[10px] font-black text-white italic tracking-widest uppercase">Result</span>
            </div>
          </div>

          {/* Clean Footer */}
          <div className="pt-6 border-t border-dashed border-slate-200 dark:border-zinc-800 text-center">
             <p className="text-[8px] font-bold text-slate-300 dark:text-zinc-600 uppercase tracking-[0.5em]">Optimized Calculation System</p>
          </div>
        </div>
      </div>
    </div>
  );
}