
"use client";

import { useState, useEffect } from 'react';

const StudyTimerPage = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setIsActive(false);
          alert("Time is up!");
        }
      }, 1000);
    } 

    return () => {
        if(interval) {
            clearInterval(interval)
        }
    };
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = parseInt(e.target.value, 10);
    if (!isNaN(newMinutes) && newMinutes >= 0) {
      setMinutes(newMinutes);
      setSeconds(0);
      setIsActive(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">⏱️ স্টাডি টাইমার</h2>
          <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">আপনার পড়ার সময় ট্র্যাক করুন।</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-full shadow-2xl w-80 h-80 mx-auto flex flex-col justify-center items-center">
          <div className="text-6xl font-mono text-gray-900 dark:text-gray-200">
              <span>{minutes.toString().padStart(2, '0')}</span>:
              <span>{seconds.toString().padStart(2, '0')}</span>
          </div>
      </div>

      <div className="max-w-md mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-center gap-4">
              <label htmlFor="minutes-input" className="text-lg font-semibold text-gray-700 dark:text-gray-300">সময় নির্ধারণ (মিনিট):</label>
              <input 
                  id="minutes-input"
                  type="number" 
                  value={minutes}
                  onChange={handleMinutesChange}
                  className="w-24 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 text-center"
              />
          </div>

          <div className="flex justify-center gap-4 mt-6">
              <button onClick={toggleTimer} className={`px-8 py-3 font-semibold rounded-lg transition ${isActive ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-green-500 text-white hover:bg-green-600'}`}>
                  {isActive ? 'Pause' : 'Start'}
              </button>
              <button onClick={resetTimer} className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
                  রিসেট
              </button>
          </div>
      </div>
    </div>
  );
}

export default StudyTimerPage;
