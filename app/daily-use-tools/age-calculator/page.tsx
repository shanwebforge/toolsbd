"use client";

import React, { useState } from 'react';
import { Calendar, RefreshCw, Calculator, Star, Trophy } from 'lucide-react';

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

    // Adjustment logic for days and months
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

    // Next Birthday Calculation
    const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < today) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    const diffTime = Math.abs(nextBday.getTime() - today.getTime());
    setNextBirthday(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const handleReset = () => {
    setBirthDate('');
    setAge(null);
    setNextBirthday(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f1a] p-4 md:p-12 transition-all font-sans flex items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-[#161b2c] rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-center relative">
          <div className="absolute top-4 right-4 opacity-20">
            <Calendar size={80} />
          </div>
          <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
            <Calculator className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Age Tracker</h1>
          <p className="text-indigo-100 text-xs font-medium uppercase tracking-widest mt-1">Precision Calculator</p>
        </div>

        {/* Input Section */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">
              Select Birth Date
            </label>
            <input 
              type="date" 
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#0f1425] border border-slate-100 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 dark:text-slate-200 font-bold transition-all"
            />
          </div>

          <div className="flex gap-3">
            <button 
              onClick={calculateAge}
              disabled={!birthDate}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black shadow-lg shadow-indigo-500/20 active:scale-95 disabled:opacity-50 transition-all text-sm"
            >
              CALCULATE
            </button>
            <button 
              onClick={handleReset}
              className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all"
            >
              <RefreshCw size={20} />
            </button>
          </div>

          {/* Result Area */}
          {age && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-indigo-50 dark:bg-indigo-500/5 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-500/10">
                  <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{age.years}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Years</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-500/5 p-4 rounded-2xl border border-purple-100 dark:border-purple-500/10">
                  <p className="text-2xl font-black text-purple-600 dark:text-purple-400">{age.months}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Months</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <p className="text-2xl font-black text-slate-700 dark:text-slate-300">{age.days}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Days</p>
                </div>
              </div>

              {/* Fun Stat Card */}
              <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-5 rounded-3xl border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm">
                    <Trophy className="text-yellow-500" size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Next Birthday</p>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{nextBirthday} Days to go!</p>
                  </div>
                </div>
                <Star className="text-indigo-300 animate-pulse" size={16} />
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="p-4 bg-slate-50 dark:bg-[#0f1425] text-center border-t dark:border-slate-800">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Accurate Age Intelligence</p>
        </div>

      </div>
    </div>
  );
};

export default AgeCalculator;