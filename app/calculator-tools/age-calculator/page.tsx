"use client";

import React, { useState } from 'react';
import { Calendar, RefreshCw, Calculator, Info, ShieldCheck, Gift } from 'lucide-react';

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('');
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);
  const [nextBirthday, setNextBirthday] = useState<number | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;
    const today = new Date();
    const birth = new Date(birthDate);

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    setAge({ years, months, days });

    const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < today) nextBday.setFullYear(today.getFullYear() + 1);
    const diffTime = Math.abs(nextBday.getTime() - today.getTime());
    setNextBirthday(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const handleReset = () => {
    setBirthDate('');
    setAge(null);
    setNextBirthday(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0c12] text-slate-900 dark:text-slate-100 flex flex-col items-center">
      
      {/* Container with top and side spacing for mobile */}
      <div className="w-full max-w-4xl mt-8 mb-8 px-4 md:px-6">
        
        {/* Main Card */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm rounded-lg overflow-hidden">
          
          <div className="flex flex-col md:flex-row">
            {/* Left Side: Input & Primary Result */}
            <div className="flex-1 p-6 md:p-10 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-purple-600 rounded-lg text-white shadow-lg shadow-purple-500/20">
                  <Calculator size={20} />
                </div>
                <div>
                  <h1 className="text-lg font-bold tracking-tight leading-none">Age Tracker</h1>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Professional Tool</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
                    Select Date of Birth
                  </label>
                  <input 
                    type="date" 
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all font-semibold"
                  />
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={calculateAge}
                    disabled={!birthDate}
                    className="flex-[4] bg-purple-600 hover:bg-purple-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white py-3.5 rounded-lg font-bold transition-all text-sm shadow-md shadow-purple-600/10 active:scale-[0.98]"
                  >
                    CALCULATE
                  </button>
                  <button 
                    onClick={handleReset}
                    className="flex-1 flex items-center justify-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 rounded-lg hover:bg-red-50 hover:text-red-500 transition-all"
                    title="Reset"
                  >
                    <RefreshCw size={20} />
                  </button>
                </div>
              </div>

              {/* Age Result Grid */}
              {age && (
                <div className="mt-10 grid grid-cols-3 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-400">
                  <div className="bg-purple-50/50 dark:bg-purple-900/10 p-4 rounded-lg border border-purple-100 dark:border-purple-900/20 text-center">
                    <span className="block text-3xl font-black text-purple-600 leading-none mb-1">{age.years}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Years</span>
                  </div>
                  <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/20 text-center">
                    <span className="block text-3xl font-black text-indigo-600 leading-none mb-1">{age.months}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Months</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                    <span className="block text-3xl font-black text-slate-700 dark:text-slate-300 leading-none mb-1">{age.days}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Days</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side: Secondary Info */}
            <div className="w-full md:w-80 bg-slate-50/50 dark:bg-slate-900/40 p-8 flex flex-col justify-center border-t md:border-t-0 border-slate-200 dark:border-slate-800">
              {nextBirthday !== null ? (
                <div className="text-center md:text-left">
                  <div className="inline-flex p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 mb-5">
                    <Gift className="text-purple-600" size={24} />
                  </div>
                  <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Next Birthday In</h2>
                  <div className="flex items-baseline gap-2 justify-center md:justify-start">
                    <p className="text-4xl font-black text-slate-800 dark:text-white leading-none">
                      {nextBirthday}
                    </p>
                    <span className="text-lg font-bold text-slate-400">Days</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-3 font-medium italic">"Time is a created thing."</p>
                </div>
              ) : (
                <div className="text-center md:text-left opacity-40">
                  <Calendar className="mx-auto md:ml-0 text-slate-400 mb-4" size={40} />
                  <p className="text-sm font-semibold text-slate-500 leading-relaxed">Input your date of birth to reveal detailed statistics.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info/SEO Footer Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-10">
          <div className="flex gap-4">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
              <Info size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">Precise Methodology</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                We calculate age using the exact day difference, considering leap years and Gregorian calendar variations to ensure accuracy for official use.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">Privacy Guaranteed</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Security is our priority. Your birth date information is processed locally in your browser and is never stored or shared with external servers.
              </p>
            </div>
          </div>
        </div>

        {/* Final Footer Label */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
            Precision Systems &copy; 2026
          </p>
        </div>

      </div>
    </div>
  );
};

export default AgeCalculator;