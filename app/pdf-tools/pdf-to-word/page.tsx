
"use client";

import { useState } from 'react';

const PdfToTextPage = () => {
  const [fileName, setFileName] = useState('');
  const [extractedText, setExtractedText] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) {
        setFileName(file.name);
        // In a real application, you would process the PDF file here.
        // For demonstration, we'll just show a placeholder.
        setExtractedText(`"${file.name}" থেকে টেক্সট এক্সট্রাক্ট করা হচ্ছে... (ডেমো)`);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">📄 PDF থেকে Text</h2>
          <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">আপনার PDF ফাইল থেকে টেক্সট এক্সট্রাক্ট করুন।</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="text-center">
              <input 
                  type="file" 
                  onChange={handleFileChange} 
                  className="hidden" 
                  id="pdf-upload"
                  accept=".pdf"
              />
              <label htmlFor="pdf-upload" className="cursor-pointer px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
                  <i className="fas fa-upload mr-2"></i> আপনার PDF ফাইল আপলোড করুন
              </label>
              {fileName && <p className="mt-4 text-gray-700 dark:text-gray-300"> নির্বাচিত ফাইল: {fileName}</p>}
          </div>

          {extractedText && 
              <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-200">এক্সট্রাক্ট করা টেক্সট:</h3>
                  <textarea 
                      readOnly 
                      value={extractedText} 
                      className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  />
              </div>
          }
      </div>
    </div>
  );
}

export default PdfToTextPage;
