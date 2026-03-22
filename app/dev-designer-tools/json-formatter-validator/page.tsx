
"use client";

import { useState } from 'react';

const JSONFormatterValidatorPage = () => {
  const [jsonInput, setJsonInput] = useState('{ "name": "John", "age": 30, "city": "New York" }');
  const [formattedJSON, setFormattedJSON] = useState('');
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const formatJSON = () => {
    setError('');
    setFormattedJSON('');
    try {
      const obj = JSON.parse(jsonInput);
      const pretty = JSON.stringify(obj, null, 2);
      setFormattedJSON(pretty);
    } catch (e) {
      setError('❌ Invalid JSON! Please check your input.');
    }
  };

  const copyOutput = () => {
    if (!formattedJSON) {
      alert("Nothing to copy!");
      return;
    }
    navigator.clipboard.writeText(formattedJSON).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">JSON Formatter & Validator</h2>
            <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
            <div className="mt-4 text-gray-600 dark:text-gray-300">
                <p>Format and validate your JSON data with ease.</p>
            </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <textarea 
                value={jsonInput} 
                onChange={(e) => setJsonInput(e.target.value)} 
                placeholder="Paste your JSON here..."
                className="w-full h-48 p-3 font-mono text-sm bg-gray-50 border border-gray-300 rounded-lg resize-y focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            ></textarea>
            
            <div className="mt-4 flex gap-2">
                <button onClick={formatJSON} className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Format JSON</button>
                <button onClick={copyOutput} className={`px-6 py-2 rounded-md ${isCopied ? 'bg-green-500' : 'bg-gray-600'} text-white`}>
                    {isCopied ? 'Copied!' : 'Copy'}
                </button>
            </div>

            {error && <p className="mt-4 text-red-500 font-bold">{error}</p>}

            {formattedJSON && (
                <pre className="mt-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg text-left text-sm whitespace-pre-wrap font-mono overflow-x-auto">
                    {formattedJSON}
                </pre>
            )}
        </div>
    </div>
  );
}

export default JSONFormatterValidatorPage;
