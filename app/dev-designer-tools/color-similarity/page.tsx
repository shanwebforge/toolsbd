
"use client";

import { useState } from 'react';

const ColorSimilarityPage = () => {
  const [colorInput, setColorInput] = useState('#3498DB');
  const [suggestedColors, setSuggestedColors] = useState<any[]>([]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
      hex = hex.split('').map(x => x + x).join('');
    }
    const bigint = parseInt(hex, 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('').toUpperCase();
  };

  const lightenColor = (rgb: {r:number, g:number, b:number}, amt: number) => ({
    r: Math.min(255, rgb.r + (255 - rgb.r) * amt),
    g: Math.min(255, rgb.g + (255 - rgb.g) * amt),
    b: Math.min(255, rgb.b + (255 - rgb.b) * amt),
  });

  const darkenColor = (rgb: {r:number, g:number, b:number}, amt: number) => ({
    r: Math.max(0, rgb.r * (1 - amt)),
    g: Math.max(0, rgb.g * (1 - amt)),
    b: Math.max(0, rgb.b * (1 - amt)),
  });

  const suggestColors = () => {
    if (!colorInput) {
      alert('Please enter a color code!');
      return;
    }
    const validHex = /^#?([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;
    if (!validHex.test(colorInput)) {
      alert('Invalid HEX color! Please enter a valid 3 or 6 digit HEX code like #3498DB');
      return;
    }

    const rgb = hexToRgb(colorInput);
    const lightShades = Array.from({ length: 4 }, (_, i) => lightenColor(rgb, (i + 1) / 5)).reverse();
    const darkShades = Array.from({ length: 4 }, (_, i) => darkenColor(rgb, (i + 1) / 5));

    const colors = [
      ...lightShades.map((c, i) => ({ label: `Light ${4 - i}`, rgb: c })),
      { label: 'Original', rgb },
      ...darkShades.map((c, i) => ({ label: `Dark ${i + 1}`, rgb: c }))
    ];
    setSuggestedColors(colors);
  };
  
  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex).then(() => {
        setCopiedColor(hex);
        setTimeout(() => setCopiedColor(null), 1000);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 text-center">
        <div className="mb-8">
            <h2 className="text-3xl font-bold">🎨 Color Similarity Suggestion</h2>
            <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
            <div className="mt-4 text-gray-600 dark:text-gray-300">
                <p>Find similar colors and generate palettes.</p>
            </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-center items-center mb-6">
                <input 
                    type="text" 
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)} 
                    placeholder="#3498DB"
                    maxLength={7}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-l-md w-48 font-mono bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                />
                <button onClick={suggestColors} className="px-6 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700">Suggest</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {suggestedColors.map(({ label, rgb }, index) => {
                    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
                    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
                    const textColor = brightness > 160 ? 'text-black' : 'text-white';
                    
                    return (
                        <div 
                            key={index}
                            className={`h-28 rounded-lg cursor-pointer p-2 flex flex-col justify-end items-center ${textColor} transition-transform hover:scale-105 shadow-lg`}
                            style={{ backgroundColor: hex }}
                            onClick={() => handleCopy(hex)}
                        >
                            <div className="font-semibold text-sm">{label}</div>
                            <div className="text-xs bg-black/30 px-2 py-1 rounded-full mt-1">
                                {copiedColor === hex ? 'Copied!' : hex}
                           </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  );
}

export default ColorSimilarityPage;
