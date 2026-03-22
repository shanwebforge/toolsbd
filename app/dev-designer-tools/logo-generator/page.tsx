
"use client";

import { useState, useRef, useEffect } from 'react';

const LogoGeneratorPage = () => {
  const [text, setText] = useState('লোগো');
  const [font, setFont] = useState('Segoe UI');
  const [textColor, setTextColor] = useState('#077A7D');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(60);
  const [canvasWidth, setCanvasWidth] = useState(500);
  const [canvasHeight, setCanvasHeight] = useState(200);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fonts = [
    'Segoe UI', 'Roboto', 'Poppins', 'Lobster', 'Oswald', 
    'Great Vibes', 'Anton', 'Inconsolata', 'Noto Sans Bengali'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text
    ctx.font = `${fontSize}px "${font}"`;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  }, [text, font, textColor, bgColor, fontSize, canvasWidth, canvasHeight]);

  const downloadLogo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'text-logo.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">🎨 Text to Logo Generator</h2>
            <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
            <div className="mt-4 text-gray-600 dark:text-gray-300">
                <p>Create your own logo from text.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Customize Your Logo</h3>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Logo Text</label>
                        <input type="text" value={text} onChange={e => setText(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Font</label>
                        <select value={font} onChange={e => setFont(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700">
                            {fonts.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium">Text Color</label>
                        <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-12 h-8 p-1 border-none rounded-md" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium">Background Color</label>
                        <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-12 h-8 p-1 border-none rounded-md" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Font Size: {fontSize}px</label>
                        <input type="range" min="10" max="200" value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))} className="w-full" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Canvas Width: {canvasWidth}px</label>
                        <input type="range" min="100" max="1200" value={canvasWidth} onChange={e => setCanvasWidth(parseInt(e.target.value))} className="w-full" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Canvas Height: {canvasHeight}px</label>
                        <input type="range" min="50" max="800" value={canvasHeight} onChange={e => setCanvasHeight(parseInt(e.target.value))} className="w-full" />
                    </div>
                </div>
            </div>

            <div className="md:col-span-2 flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <canvas ref={canvasRef} className="max-w-full h-auto border-2 border-dashed border-indigo-300 dark:border-indigo-600 rounded-lg"></canvas>
                <button onClick={downloadLogo} className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    💾 Download as PNG
                </button>
            </div>
        </div>
    </div>
  );
}

export default LogoGeneratorPage;
