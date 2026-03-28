'use client';

import { useState, useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';
import { 
  Barcode as BarcodeIcon, 
  Download, 
  Printer, 
  Type, 
  Layers,
  CheckCircle2,
  X,
  Palette
} from 'lucide-react';

export default function BarcodeGenerator() {
  const [text, setText] = useState('SHAN-9901');
  const [format, setFormat] = useState('CODE128');
  // Primary Purple default for barcode lines
  const [color, setColor] = useState('#7C3AED'); 
  const [showText, setShowText] = useState(true);
  const barcodeRef = useRef<SVGSVGElement>(null);

  const generateBarcode = () => {
    if (barcodeRef.current && text) {
      try {
        JsBarcode(barcodeRef.current, text, {
          format: format,
          lineColor: color,
          width: 2,
          height: 80,
          displayValue: showText,
          fontSize: 14,
          margin: 10,
          background: "transparent"
        });
      } catch (error) {
        console.error("Invalid input for format", error);
      }
    }
  };

  useEffect(() => {
    generateBarcode();
  }, [text, format, color, showText]);

  const downloadBarcode = () => {
    const svg = barcodeRef.current;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const svgSize = svg.getBBox();
    canvas.width = svgSize.width + 20;
    canvas.height = svgSize.height + 20;
    
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 10, 10);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `barcode-${text}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 font-sans text-slate-800 dark:text-zinc-200">
      <div className="max-w-4xl mx-auto">
        
        {/* Header - Indigo Secondary Accent */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20 mb-3">
            <BarcodeIcon className="w-4 h-4 text-white" />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Utility Studio</span>
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">
            Barcode <span className="text-purple-600">Generator</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-[0.2em]">Personalized for Shan Folio</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Controls - Using Purple for focus and Primary actions */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm space-y-5">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase px-1 flex items-center gap-2">
                <Type className="w-3 h-3 text-purple-500" /> Data / SKU
              </label>
              <input 
                value={text} 
                onChange={(e) => setText(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-xs outline-none focus:border-purple-500 font-mono transition-all"
                placeholder="Enter text or number..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase px-1 flex items-center gap-2">
                  <Layers className="w-3 h-3 text-indigo-500" /> Format
                </label>
                <select 
                  value={format} 
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-xs outline-none appearance-none focus:border-indigo-500 transition-all"
                >
                  <option value="CODE128">Code 128</option>
                  <option value="EAN13">EAN-13</option>
                  <option value="CODE39">Code 39</option>
                  <option value="ITF14">ITF-14</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase px-1 flex items-center gap-2">
                  <Palette className="w-3 h-3 text-purple-500" /> Color
                </label>
                <input 
                  type="color" 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-11 p-1 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl outline-none cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-900/20">
              <input 
                type="checkbox" 
                id="showText" 
                checked={showText} 
                onChange={(e) => setShowText(e.target.checked)}
                className="accent-purple-600 w-4 h-4 cursor-pointer" 
              />
              <label htmlFor="showText" className="text-[10px] font-bold text-purple-700 dark:text-purple-400 uppercase cursor-pointer tracking-wider">Display Value Below</label>
            </div>
          </div>

          {/* Preview & Actions */}
          <div className="space-y-6">
            {/* Barcode Preview Box with Purple Glow */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border-2 border-purple-100 dark:border-purple-900/30 shadow-xl shadow-purple-500/5 flex items-center justify-center min-h-[220px] overflow-hidden relative group transition-all hover:border-purple-300">
              <div className="absolute top-4 right-4 bg-emerald-500/10 p-1 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="bg-white p-4 rounded-lg">
                <svg ref={barcodeRef} className="max-w-full h-auto"></svg>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Primary Purple Button */}
              <button 
                onClick={downloadBarcode}
                className="flex items-center justify-center gap-2 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.15em] shadow-lg shadow-purple-500/25 active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" /> Save PNG
              </button>
              {/* Secondary Indigo Button */}
              <button 
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.15em] shadow-lg shadow-indigo-500/25 active:scale-95 transition-all"
              >
                <Printer className="w-4 h-4" /> Print Label
              </button>
            </div>
          </div>
        </div>

        {/* Footer info with Indigo touch */}
        <p className="mt-16 text-center text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em]">
          Powered by <span className="text-indigo-500">ShanFolio</span> Utility Core
        </p>
      </div>
    </div>
  );
}