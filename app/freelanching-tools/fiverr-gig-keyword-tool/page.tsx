'use client';

import { useState } from 'react';

const FiverrGigKeywordTool = () => {
  const [keywordInput, setKeywordInput] = useState('');
  const [generatedKeywords, setGeneratedKeywords] = useState<string[]>([]);
  const [copiedKeyword, setCopiedKeyword] = useState('');

  const generateKeywords = () => {
    if (!keywordInput.trim()) {
      alert("দয়া করে একটি মূল কিওয়ার্ড লিখুন!");
      return;
    }

    const base = keywordInput.toLowerCase().trim();
    const suggestions = [
      base,
      `${base} service`,
      `best ${base}`,
      `top rated ${base}`,
      `cheap ${base}`,
      `${base} for business`,
      `professional ${base}`,
      `custom ${base}`,
      `${base} expert`,
      `${base} gig`,
      `${base} seller`,
      `${base} on Fiverr`,
      `${base} in 24 hours`,
      `unique ${base}`,
      `seo optimized ${base}`,
      `${base} portfolio`,
      `${base} with fast delivery`,
      `creative ${base}`,
      `premium ${base} package`,
      `trusted ${base} provider`,
      `affordable ${base}`,
      `${base} agency`,
      `${base} freelancer bangladesh`,
      `${base} usa market`,
      `low cost ${base}`,
      `top 10 ${base}`,
      `${base} reviews`,
      `hire ${base} expert`,
    ];

    setGeneratedKeywords(suggestions);
  };

  const copyAllKeywords = () => {
    if (generatedKeywords.length === 0) {
      alert("প্রথমে কিওয়ার্ড তৈরি করুন!");
      return;
    }
    const allText = generatedKeywords.join(", ");
    navigator.clipboard.writeText(allText).then(() => {
      alert("✅ সব কিওয়ার্ড কপি হয়েছে!");
    });
  };

  const handleKeywordClick = (keyword: string) => {
    navigator.clipboard.writeText(keyword).then(() => {
      setCopiedKeyword(keyword);
      setTimeout(() => {
        setCopiedKeyword('');
      }, 1200);
    });
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg shadow-lg">
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Fiverr / Gig Keyword Tool</h2>
        <div className="w-32 h-1 bg-green-500 mx-auto"></div>
        <div className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400">
          <p>Optimize your Fiverr gigs with the right keywords</p>
          <p>Find high-ranking keywords for your Fiverr services and gig titles</p>
          <p>Improve gig visibility and ranking in Fiverr search results</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-center mb-4">Fiverr / Gig Keyword Tool</h3>
        <input
          type="text"
          value={keywordInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeywordInput(e.target.value)}
          placeholder="যেমন: logo design"
          className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-green-500"
        />
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={generateKeywords}
            className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
          >
            🎯 কিওয়ার্ড সাজেশন দেখাও
          </button>
          <button
            onClick={copyAllKeywords}
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
          >
            📋 সব কিওয়ার্ড কপি করুন
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {generatedKeywords.map((keyword, index) => (
          <div
            key={index}
            onClick={() => handleKeywordClick(keyword)}
            className={`p-2 rounded-md cursor-pointer transition-colors font-semibold ${copiedKeyword === keyword ? 'bg-lime-300 dark:bg-lime-700 text-black dark:text-white' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>
            {copiedKeyword === keyword ? `✅ কপি হয়েছে!` : keyword}
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-slate-500 mt-6">একটি কিওয়ার্ডে ক্লিক করলে তা কপি হয়ে যাবে ✅</p>
    </div>
  );
};

export default FiverrGigKeywordTool;
