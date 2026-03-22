
"use client";

import { useState, useEffect } from 'react';

const LoremIpsumPage = () => {
  const [paragraphs, setParagraphs] = useState(3);
  const [generatedText, setGeneratedText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus eu elit consequat viverra. Aenean at semper nisi. Integer in tincidunt magna. Sed facilisis fermentum leo, nec pulvinar libero feugiat non. Donec nec lacus eu libero dignissim dignissim.";

  const generateLorem = () => {
    if (isNaN(paragraphs) || paragraphs < 1) {
      setGeneratedText("Please enter a valid number of paragraphs.");
      return;
    }
    const output = Array.from({ length: paragraphs }, () => `<p>${loremText}</p>`).join('');
    setGeneratedText(output);
  };

  const copyText = () => {
    const textToCopy = generatedText.replace(/<\/p>/g, '\n\n').replace(/<p>/g, '');
    if (!textToCopy.trim()) {
      alert("Nothing to copy!");
      return;
    }
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    });
  };

  useEffect(() => {
    generateLorem();
  }, [paragraphs]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Lorem Ipsum Generator</h2>
            <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Generate placeholder text for your designs.</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
                <input 
                    type="number" 
                    value={paragraphs} 
                    onChange={(e) => setParagraphs(parseInt(e.target.value))} 
                    min="1" 
                    max="50" 
                    className="p-2 w-24 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                />
                <button onClick={generateLorem} className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Generate</button>
                <button onClick={copyText} className={`px-6 py-2 rounded-md ${isCopied ? 'bg-green-500' : 'bg-gray-600'} text-white`}>
                    {isCopied ? 'Copied!' : 'Copy'}
                </button>
            </div>

            <div 
                id="output" 
                className="text-left p-5 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner min-h-[200px] text-gray-800 dark:text-gray-200"
                dangerouslySetInnerHTML={{ __html: generatedText }}
            >
            </div>
        </div>
    </div>
  );
}

export default LoremIpsumPage;
