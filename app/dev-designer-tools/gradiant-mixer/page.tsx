
"use client";

import { useState, useEffect } from 'react';

const GradientGeneratorPage = () => {
  const [color1, setColor1] = useState('#1C24D0');
  const [color2, setColor2] = useState('#B82230');
  const [direction, setDirection] = useState('to right');
  const [cssCode, setCssCode] = useState('');

  const directions = [
    { label: '↖', value: '-135deg', title: 'Top Left' },
    { label: '→', value: 'to right', title: 'Right' },
    { label: '←', value: 'to left', title: 'Left' },
    { label: '↓', value: 'to bottom', title: 'Bottom' },
    { label: '↑', value: 'to top', title: 'Top' },
    { label: '↗', value: '135deg', title: 'Top Right' },
  ];

  useEffect(() => {
    const grad = `linear-gradient(${direction}, ${color1}, ${color2})`;
    setCssCode(`background: ${grad};`);
  }, [color1, color2, direction]);

  const copyCode = () => {
    navigator.clipboard.writeText(cssCode);
    alert("CSS code copied!");
  };

  return (
    <div className="flex justify-center items-start pt-10">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/30 dark:bg-gray-800/30 shadow-lg backdrop-blur-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">CSS Gradient Generator</h2>
        <div className="w-20 h-1 bg-indigo-500 mx-auto mt-2 mb-6 rounded"></div>

        <div className="flex gap-5 justify-center flex-wrap my-5">
          <div className="bg-white/50 dark:bg-gray-700/50 p-4 rounded-xl text-center shadow-md">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-300 block mb-2">Color 1</label>
            <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-16 h-10 border-none rounded-lg cursor-pointer bg-transparent" />
          </div>
          <div className="bg-white/50 dark:bg-gray-700/50 p-4 rounded-xl text-center shadow-md">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-300 block mb-2">Color 2</label>
            <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-16 h-10 border-none rounded-lg cursor-pointer bg-transparent" />
          </div>
        </div>

        <div className="my-5">
          <label className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-3 block text-center">Direction</label>
          <div className="flex justify-center items-center gap-3 flex-wrap">
            {directions.map(d => (
              <button 
                key={d.value} 
                title={d.title}
                className={`w-11 h-11 flex items-center justify-center text-xl rounded-lg border transition-all ${direction === d.value ? 'bg-indigo-500 text-white border-indigo-600' : 'bg-white/40 dark:bg-gray-600/40 border-gray-300 dark:border-gray-500 hover:bg-indigo-100 dark:hover:bg-gray-600'}`}
                onClick={() => setDirection(d.value)}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div id="preview" style={{ background: `linear-gradient(${direction}, ${color1}, ${color2})` }} className="h-48 rounded-2xl my-6 border border-black/10 dark:border-white/10"></div>
        
        <div className="p-4 rounded-lg font-mono text-sm break-all bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
          {cssCode}
        </div>

        <button onClick={copyCode} className="w-full p-3 bg-indigo-600 text-white rounded-lg mt-4 text-base font-bold transition hover:bg-indigo-700">
          Copy Code
        </button>
      </div>
    </div>
  );
}

export default GradientGeneratorPage;
