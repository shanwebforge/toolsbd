'use client';

import { useState, useEffect } from 'react';

interface HistoryItem {
  time: string;
  count: number;
  total: number;
}

const DigitalTasbihPage = () => {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedCount = parseInt(localStorage.getItem("tasbih_count") || '0');
    const savedTotal = parseInt(localStorage.getItem("tasbih_total") || '0');
    const savedHistory = JSON.parse(localStorage.getItem("tasbih_saved") || "[]");

    setCount(savedCount);
    setTotal(savedTotal);
    setHistory(savedHistory.reverse());
  }, []);

  const increment = () => {
    const newCount = count + 1;
    const newTotal = total + 1;
    setCount(newCount);
    setTotal(newTotal);
    localStorage.setItem("tasbih_count", newCount.toString());
    localStorage.setItem("tasbih_total", newTotal.toString());
  };

  const reset = () => {
    setCount(0);
    localStorage.setItem("tasbih_count", '0');
  };

  const restart = () => {
    setCount(0);
    setTotal(0);
    localStorage.setItem("tasbih_count", '0');
    localStorage.setItem("tasbih_total", '0');
  };

  const save = () => {
    const time = new Date().toLocaleString();
    const newHistoryItem: HistoryItem = { count, total, time };
    const updatedHistory = [newHistoryItem, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("tasbih_saved", JSON.stringify(updatedHistory.reverse()));
    alert("✅ সংরক্ষণ সফল!");
  };

  const clearAll = () => {
    if (confirm("তুমি কি নিশ্চিত সব মুছতে চাও? (কাউন্ট, মোট ও হিস্টোরি)?")) {
      setCount(0);
      setTotal(0);
      setHistory([]);
      localStorage.removeItem("tasbih_count");
      localStorage.removeItem("tasbih_total");
      localStorage.removeItem("tasbih_saved");
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl shadow-2xl">
      <h2 className="text-2xl font-bold text-center mb-4">ডিজিটাল তাসবিহ</h2>
      <div className="text-6xl font-extrabold text-center text-teal-500 dark:text-teal-300 mb-2">{count}</div>
      <div className="text-center text-gray-600 dark:text-gray-400 mb-6">সর্বমোট: {total}</div>

      <div className="flex justify-center mb-6">
        <button
          className="w-24 h-24 rounded-full bg-teal-600 hover:bg-teal-700 text-white text-3xl font-bold flex items-center justify-center transition-transform transform hover:scale-110"
          onClick={increment}
        >
          +১
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition" onClick={restart}>🔁 শুরু</button>
        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition" onClick={reset}>🔄 রিসেট</button>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition" onClick={save}>💾 সংরক্ষণ</button>
        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition" onClick={clearAll}>🗑️ সব মুছুন</button>
      </div>

      <div className="max-h-48 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold border-b border-gray-300 dark:border-gray-600 pb-2 mb-3">সংরক্ষিত হিস্টোরি</h3>
        {history.length > 0 ? (
          <div>
            {history.map((item, index) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-600 p-3 rounded-md mb-2 text-sm">
                <p className="font-bold">{item.time}</p>
                <p>কাউন্ট: {item.count}, মোট: {item.total}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">কোনো হিস্টোরি নেই।</p>
        )}
      </div>
    </div>
  );
};

export default DigitalTasbihPage;
