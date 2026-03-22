'use client';

import { useState, useEffect } from 'react';

const TimeTracking = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const formatTime = (timeInSeconds) => {
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
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg shadow-xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">টাইম ট্র্যাকিং টুল</h2>
        <div className="w-48 h-1 bg-purple-500 mx-auto"></div>
        <div className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400">
          <p>সময় ব্যবস্থাপনা এবং প্রোডাক্টিভিটি ট্র্যাকিং টুল</p>
          <p>প্রজেক্ট ও টাস্ক ভিত্তিক সময় ট্র্যাক করুন</p>
          <p>ডেইলি, উইকলি এবং মান্থলি রিপোর্ট জেনারেট করুন</p>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">টাইম ট্র্যাকিং টুল</h3>
        <div className="text-5xl sm:text-6xl font-mono font-bold tracking-wider mb-6 text-slate-900 dark:text-white">
          {formatTime(time)}
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
          >
            শুরু করুন
          </button>
          <button
            onClick={handlePause}
            disabled={!isRunning}
            className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
          >
            বিরতি দিন
          </button>
          <button
            onClick={handleReset}
            disabled={time === 0}
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
          >
            রিসেট
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeTracking;
