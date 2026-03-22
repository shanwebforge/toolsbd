
"use client";

import { useState } from 'react';

const TextToHandwritingPage = () => {
  const [text, setText] = useState('');
  const [handwritingImage, setHandwritingImage] = useState<string | null>(null);

  const generateHandwriting = () => {
    if (text.trim()) {
      // In a real application, you would send the text to a server-side API
      // to generate the handwriting image.
      // For demonstration purposes, we will use a placeholder image.
      setHandwritingImage('/images/sample-handwriting.png');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">✍️ টেক্সট থেকে হাতের লেখা</h2>
          <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">আপনার লেখা টেক্সটকে হাতের লেখায় রূপান্তর করুন।</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <textarea 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              placeholder="এখানে আপনার টেক্সট লিখুন..."
              className="w-full h-48 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />

          <div className="text-center mt-6">
              <button onClick={generateHandwriting} className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
                  হাতের লেখায় রূপান্তর করুন
              </button>
          </div>

          {handwritingImage &&
              <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-3 text-center text-gray-900 dark:text-gray-200">نتیجه:</h3>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <img src={handwritingImage} alt="Generated Handwriting" className="w-full rounded-md"/>
                  </div>
              </div>
          }
      </div>
    </div>
  );
}

export default TextToHandwritingPage;
