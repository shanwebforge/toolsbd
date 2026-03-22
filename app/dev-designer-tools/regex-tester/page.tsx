
"use client";

import { useState } from 'react';

const RegexTesterPage = () => {
  const [pattern, setPattern] = useState('\\d+');
  const [text, setText] = useState('My phone number is 01712345678 and email is test@example.com');
  const [error, setError] = useState('');
  const [highlightedText, setHighlightedText] = useState('');

  const runRegex = () => {
    setError('');
    setHighlightedText('');

    if (!pattern) {
      return;
    }

    try {
      const regex = new RegExp(pattern, 'g');
      const result = text.replace(regex, (match) => `<span class="bg-yellow-300 font-bold">${match}</span>`);
      setHighlightedText(result || '(No match)');
    } catch (e) {
      setError('❌ Invalid Regular Expression!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">🧪 Regex Tester</h2>
            <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Test and debug your regular expressions in real-time.</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="space-y-4">
                <input 
                    type="text" 
                    value={pattern} 
                    onChange={(e) => setPattern(e.target.value)} 
                    placeholder="Enter your Regular Expression (e.g. \\d+)"
                    className="w-full p-3 font-mono border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                />
                <textarea 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    rows={6}
                    placeholder="Enter your test text here..."
                    className="w-full p-3 font-mono border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                ></textarea>
            </div>

            <div className="text-center mt-6">
                <button 
                    onClick={runRegex} 
                    className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                    Test Regex
                </button>
            </div>

            {error && <div className="mt-6 text-center text-red-500 font-bold">{error}</div>}
            
            <div className="mt-6 p-5 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner min-h-[100px]">
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: highlightedText }}></p>
            </div>
        </div>
    </div>
  );
}

export default RegexTesterPage;
