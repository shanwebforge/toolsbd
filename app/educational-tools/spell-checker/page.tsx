
"use client";

import { useState } from 'react';

const englishWordsSet = new Set([
    "education", "university", "language", "hello", "science", "beautiful", "computer", "student",
    "book", "teacher", "school", "technology", "keyboard", "mouse", "internet", "online", "dictionary", "library",
    "exam", "result", "learn", "practice", "hard", "work", "goal", "success", "motivation", "focus"
]);

const banglaDict = ["বাংলাদেশ", "শিক্ষা", "বিশ্ববিদ্যালয়", "কম্পিউটার", "ছাত্র", "ভাষা", "প্রযুক্তি"];

const SpellCheckerPage = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const checkSpelling = () => {
    const words = text.trim().split(/\s+/);
    const resultHTML = words.map(word => {
      const isEnglish = /^[a-zA-Z]+$/.test(word);
      const isBangla = /^[\u0980-\u09FF]+$/.test(word);
      let valid = false;

      if (isEnglish) {
        valid = englishWordsSet.has(word.toLowerCase());
      } else if (isBangla) {
        valid = banglaDict.includes(word);
      } else {
        valid = true; // For numbers or symbols
      }

      if (valid) {
        return `<span>${word}</span>`;
      } else {
        return `<span class="bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 px-1 rounded">${word}</span>`;
      }
    }).join(' ');

    setResult(resultHTML);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">📝 স্পেল চেকার (বাংলা-ইংরেজি)</h2>
        <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">বাংলা ও ইংরেজি বানান পরীক্ষা করুন।</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="এখানে আপনার টেক্সট লিখুন..."
          className="w-full h-48 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />

        <div className="text-center mt-6">
          <button onClick={checkSpelling} className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
            স্পেল চেক করুন
          </button>
        </div>

        {result &&
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3 text-center text-gray-900 dark:text-gray-200">ফলাফল:</h3>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700" 
                 dangerouslySetInnerHTML={{ __html: result }} />
          </div>
        }
      </div>
    </div>
  );
}

export default SpellCheckerPage;
