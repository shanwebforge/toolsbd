
"use client";

import { useState } from 'react';

const Base64ConverterPage = () => {
  const [mode, setMode] = useState('encode');
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [copyButtonText, setCopyButtonText] = useState('Copy');

  const handleProcess = () => {
    try {
      if (mode === 'encode') {
        setResult(btoa(unescape(encodeURIComponent(inputText))));
      } else {
        setResult(decodeURIComponent(escape(atob(inputText))));
      }
    } catch (e) {
      setResult("❌ Error: Invalid input for selected mode.");
    }
  };

  const handleCopy = () => {
    if (!result.trim()) {
      alert("Nothing to copy!");
      return;
    }
    navigator.clipboard.writeText(result).then(() => {
      setCopyButtonText("Copied!");
      setTimeout(() => setCopyButtonText("Copy"), 1000);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">🔐 Base64 Encoder / Decoder</h2>
        <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
        <div className="mt-4 text-gray-600 dark:text-gray-300">
          <p>A tool for converting data to and from Base64 format.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="mb-4 flex justify-center space-x-4">
          <label className="flex items-center space-x-2">
            <input type="radio" name="mode" value="encode" checked={mode === 'encode'} onChange={() => setMode('encode')} className="form-radio text-indigo-600" />
            <span className="text-gray-700 dark:text-gray-200">Encode</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="mode" value="decode" checked={mode === 'decode'} onChange={() => setMode('decode')} className="form-radio text-indigo-600" />
            <span className="text-gray-700 dark:text-gray-200">Decode</span>
          </label>
        </div>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-md resize-y font-mono bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        ></textarea>

        <div className="flex justify-center space-x-4 mt-4">
          <button onClick={handleProcess} className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Convert</button>
          <button onClick={handleCopy} className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">{copyButtonText}</button>
        </div>

        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-900 rounded-md text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words min-h-[50px] font-mono">
          {result}
        </div>
      </div>
    </div>
  );
}

export default Base64ConverterPage;
