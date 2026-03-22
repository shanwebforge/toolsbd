'use client';

import { useState, useEffect } from 'react';

const TimeTracking = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  
  // টাইপস্ক্রিপ্ট এরর ফিক্স করতে এখানে টাইপ ডিফাইন করা হয়েছে
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }

    // কম্পোনেন্ট আনমাউন্ট হলে বা স্টপ হলে ইন্টারভাল ক্লিয়ার করা
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);

  // প্যারামিটার টাইপ 'number' করা হয়েছে
  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg shadow-xl lg:ml-64 transition-all">
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">📊 টাইম ট্র্যাকিং টুল</h2>
        <div className="w-48 h-1 bg-purple-500 mx-auto"></div>
        <div className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
          <p>সময় ব্যবস্থাপনা এবং প্রোডাক্টিভিটি ট্র্যাকিং টুল</p>
          <p>প্রজেক্ট ও টাস্ক ভিত্তিক সময় ট্র্যাক করুন এবং রিপোর্ট জেনারেট করুন</p>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 p-10 rounded-3xl border border-slate-100 dark:border-slate-800 text-center max-w-xl mx-auto shadow-inner">
        <div className="text-6xl sm:text-7xl font-mono font-black tracking-tighter mb-10 text-slate-900 dark:text-white tabular-nums drop-shadow-sm">
          {formatTime(time)}
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="flex-1 min-w-[140px] px-6 py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-[0_4px_0_rgb(5,150,105)] active:translate-y-1 active:shadow-none disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:shadow-none disabled:cursor-not-allowed transition-all uppercase tracking-wider text-sm"
          >
            শুরু করুন
          </button>
          
          <button
            onClick={handlePause}
            disabled={!isRunning}
            className="flex-1 min-w-[140px] px-6 py-4 bg-amber-500 text-white font-bold rounded-2xl shadow-[0_4px_0_rgb(217,119,6)] active:translate-y-1 active:shadow-none disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:shadow-none disabled:cursor-not-allowed transition-all uppercase tracking-wider text-sm"
          >
            বিরতি দিন
          </button>
          
          <button
            onClick={handleReset}
            disabled={time === 0}
            className="flex-1 min-w-[140px] px-6 py-4 bg-rose-600 text-white font-bold rounded-2xl shadow-[0_4px_0_rgb(190,18,60)] active:translate-y-1 active:shadow-none disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:shadow-none disabled:cursor-not-allowed transition-all uppercase tracking-wider text-sm"
          >
            রিসেট
          </button>
        </div>
      </div>
      
      {/* একটি বোনাস সেকশন যা আপনি পরে কাজে লাগাতে পারেন */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 text-center">
            <span className="block text-xs text-blue-500 font-bold uppercase mb-1">Status</span>
            <span className="font-bold">{isRunning ? "Running" : "Paused"}</span>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-900/30 text-center col-span-2">
            <span className="block text-xs text-purple-500 font-bold uppercase mb-1">Efficiency Tip</span>
            <span className="text-sm font-medium italic">"Focus on one task at a time."</span>
        </div>
      </div>
    </div>
  );
};

export default TimeTracking;