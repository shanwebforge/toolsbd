
"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';

const CodeFormatterPage = () => {
  const [language, setLanguage] = useState('html');
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');

  // Dynamically load the beautify library
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/js-beautify@1.14.7/js/lib/beautify-html.min.js";
    document.head.appendChild(script);
    const script2 = document.createElement('script');
    script2.src = "https://cdn.jsdelivr.net/npm/js-beautify@1.14.7/js/lib/beautify-css.min.js";
    document.head.appendChild(script2);
    const script3 = document.createElement('script');
    script3.src = "https://cdn.jsdelivr.net/npm/js-beautify@1.14.7/js/lib/beautify.min.js";
    document.head.appendChild(script3);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(script2);
      document.head.removeChild(script3);
    };
  }, []);

  const formatCode = () => {
    let formatted = "";
    if (language === "html" && (window as any).html_beautify) {
      formatted = (window as any).html_beautify(inputCode);
    } else if (language === "css" && (window as any).css_beautify) {
      formatted = (window as any).css_beautify(inputCode);
    } else if (language === "js" && (window as any).js_beautify) {
      formatted = (window as any).js_beautify(inputCode);
    }
    setOutputCode(formatted);
  };

  return (
    <>
      <Head>
        <title>Code Formatter & Beautifier</title>
      </Head>
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">HTML, CSS, JS Formatter</h2>
            <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
            <div className="mt-4 text-gray-600 dark:text-gray-300">
                <p>This tool formats code used in web development, beautifully organizing HTML, CSS, and JavaScript.</p>
            </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Choose Language:</label>
            <select 
              id="language" 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)} 
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            >
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="js">JavaScript</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="inputCode" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Paste Your Code:</label>
            <textarea 
              id="inputCode" 
              value={inputCode} 
              onChange={(e) => setInputCode(e.target.value)} 
              placeholder="Paste your HTML / CSS / JS code here..." 
              className="w-full h-48 p-2 border border-gray-300 dark:border-gray-600 rounded-md resize-y font-mono bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            ></textarea>
          </div>

          <button 
            onClick={formatCode} 
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Beautify
          </button>

          <div className="mt-6">
            <label htmlFor="outputCode" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Formatted Code:</label>
            <textarea 
              id="outputCode" 
              value={outputCode} 
              readOnly 
              className="w-full h-48 p-2 border border-gray-300 dark:border-gray-600 rounded-md resize-y font-mono bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export default CodeFormatterPage;
