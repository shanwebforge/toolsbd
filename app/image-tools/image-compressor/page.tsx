"use client";

import React, { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import { Upload, Download, Trash2, Zap, Image as ImageIcon, Sparkles, MoveRight } from 'lucide-react';

const ImageCompressor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setCompressedFile(null);
      await compressImage(selectedFile);
    }
  };

  const compressImage = async (imgFile: File) => {
    setLoading(true);
    const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true, initialQuality: quality };
    try {
      const compressed = await imageCompression(imgFile, options);
      setCompressedFile(compressed);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed_${file?.name}`;
    a.click();
  };

  const formatSize = (size: number) => (size / 1024).toFixed(1) + " KB";

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white dark:bg-[#161b2c] rounded-lg shadow-xl border border-indigo-100 dark:border-slate-800 overflow-hidden transition-all">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Zap size={18} fill="currentColor" />
            <h2 className="font-bold tracking-tight text-sm uppercase">Quick Compress</h2>
          </div>
          <button onClick={() => { setFile(null); setPreview(null); }} className="text-white/70 hover:text-white">
            <Trash2 size={16} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Preview / Upload Area */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`relative group cursor-pointer overflow-hidden rounded-lg border-2 border-dashed transition-all flex items-center justify-center bg-slate-50 dark:bg-slate-900/50 
              ${preview ? 'border-indigo-500' : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400'} aspect-video`}
          >
            {preview ? (
              <img src={preview} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center space-y-2">
                <div className="mx-auto w-10 h-10 bg-indigo-100 dark:bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-600">
                  <Upload size={20} />
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">Click to Upload Image</p>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*" />
          </div>

          {/* Stats Bar */}
          {file && (
            <div className="flex items-center justify-between bg-indigo-50/50 dark:bg-indigo-500/5 p-3 rounded-lg border border-indigo-100 dark:border-indigo-500/10">
              <div className="text-center flex-1 border-r border-indigo-100 dark:border-slate-800">
                <p className="text-[9px] font-black text-slate-400 uppercase">Original</p>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{formatSize(file.size)}</p>
              </div>
              <div className="px-3 text-indigo-500">
                <MoveRight size={14} />
              </div>
              <div className="text-center flex-1">
                <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Compressed</p>
                <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  {compressedFile ? formatSize(compressedFile.size) : '...'}
                </p>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase">Quality: {Math.round(quality * 100)}%</label>
            </div>
            <input 
              type="range" min="0.1" max="1.0" step="0.1" value={quality} 
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              onMouseUp={() => file && compressImage(file)}
              className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none accent-indigo-600"
            />
          </div>

          {/* Action Button */}
          <button 
            disabled={!compressedFile || loading}
            onClick={download}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? <Sparkles className="animate-spin" size={16} /> : <Download size={16} />}
            {loading ? "COMPRESSING..." : "DOWNLOAD COMPRESSED"}
          </button>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-3 text-center border-t border-slate-100 dark:border-slate-800">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Lossless Efficiency Engaged</p>
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;