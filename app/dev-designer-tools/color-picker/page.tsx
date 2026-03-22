
"use client";

import { useState, useEffect } from 'react';

const ColorPickerPage = () => {
  const [color, setColor] = useState('#3498db');
  const [palette, setPalette] = useState<string[]>([]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  useEffect(() => {
    generatePalette(color);
  }, [color]);

  const generatePalette = (baseColor: string) => {
    const baseRGB = hexToRgb(baseColor);
    if (!baseRGB) return;

    const newPalette: string[] = [];
    for (let i = 1; i <= 5; i++) {
      const factor = i * 0.2;
      const shade = adjustBrightness(baseRGB, -factor);
      const tint = adjustBrightness(baseRGB, factor);
      newPalette.push(rgbToHex(shade));
      newPalette.push(rgbToHex(tint));
    }
    setPalette(newPalette);
  };

  const handleColorBoxClick = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1000);
  };

  // Color conversion functions
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = ({ r, g, b }: { r: number, g: number, b: number }) => {
    const toHex = (c: number) => `0${Math.round(c).toString(16)}`.slice(-2);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const adjustBrightness = ({ r, g, b }: { r: number, g: number, b: number }, factor: number) => {
    const adjust = (c: number) => Math.max(0, Math.min(255, c + c * factor));
    return { r: adjust(r), g: adjust(g), b: adjust(b) };
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 text-center">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">🎨 Color Picker & Palette Generator</h2>
        <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
        <div className="mt-4 text-gray-600 dark:text-gray-300">
          <p>Pick a color to generate a harmonious palette.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md inline-block">
        <input 
          type="color" 
          value={color}
          onChange={(e) => setColor(e.target.value)} 
          className="w-32 h-32 border-none cursor-pointer rounded-full mb-4 bg-transparent"
        />
      </div>
      
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {palette.map((hex, index) => (
          <div 
            key={index}
            className="relative h-24 rounded-lg cursor-pointer flex items-end justify-center p-2 text-white font-bold text-sm transition-transform hover:scale-105"
            style={{ backgroundColor: hex }}
            onClick={() => handleColorBoxClick(hex)}
          >
            {hex}
            {copiedColor === hex && 
              <span className="absolute top-1 right-1 bg-white/70 text-black text-xs rounded-full px-2 py-1">✔</span>
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColorPickerPage;
