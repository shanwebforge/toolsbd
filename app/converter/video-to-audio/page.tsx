"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { 
  Video, Music, Scissors, Download, 
  Trash2, Loader2, FileVideo, Zap 
} from 'lucide-react';

// এটি বিল্ড এরর এড়াতে সাহায্য করবে
export const dynamic = 'force-dynamic';

const VideoToAudio: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // FFmpeg লোড হয়েছে কি না দেখার জন্য
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // FFmpeg লোড করার ফাংশন
  const loadFFmpeg = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    const ffmpeg = new FFmpeg();
    
    // Progress দেখানোর জন্য (ঐচ্ছিক)
    ffmpeg.on('log', ({ message }) => {
      console.log(message);
    });

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    
    ffmpegRef.current = ffmpeg;
    setIsLoaded(true);
  };

  // মাউন্ট হওয়ার পর লোড হবে
  useEffect(() => {
    loadFFmpeg();
  }, []);

  const convertToMp3 = async () => {
    if (!videoFile || !ffmpegRef.current) return;
    
    try {
      setIsConverting(true);
      const ffmpeg = ffmpegRef.current;

      // File Read & Write to Virtual FS
      await ffmpeg.writeFile('input.mp4', await fetchFile(videoFile));

      // FFmpeg Command: Extract Audio to MP3
      await ffmpeg.exec(['-i', 'input.mp4', '-q:a', '0', '-map', 'a', 'output.mp3']);

      // Result Read kora
      const data = await ffmpeg.readFile('output.mp3');
      const url = URL.createObjectURL(new Blob([data], { type: 'audio/mp3' }));
      
      setAudioUrl(url);
    } catch (error) {
      console.error("Conversion Error:", error);
      alert("Conversion failed. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleReset = () => {
    setVideoFile(null);
    setAudioUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Build টাইমে যাতে কোডটি না চলে
  if (typeof window === "undefined") return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-[#0b0f1a] p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#161b2c] rounded-lg shadow-xl border border-indigo-100 dark:border-slate-800 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Music size={20} fill="currentColor" />
            <h2 className="font-bold tracking-tight text-sm uppercase">MP3 Extractor</h2>
          </div>
          <button onClick={handleReset} className="text-white/70 hover:text-white transition-all">
            <Trash2 size={16} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Upload Area */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`group cursor-pointer rounded-lg border-2 border-dashed transition-all p-8 flex flex-col items-center justify-center gap-3 bg-slate-50 dark:bg-slate-900/50 
              ${videoFile ? 'border-indigo-500' : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400'}`}
          >
            {videoFile ? (
              <>
                <FileVideo className="text-indigo-500 animate-bounce" size={40} />
                <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase truncate max-w-[200px]">{videoFile.name}</p>
                <p className="text-[9px] text-slate-400">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-600">
                  <Video size={24} />
                </div>
                <div className="text-center">
                  <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Select Video</p>
                  <p className="text-[10px] text-slate-400 mt-1">MP4, MKV, AVI supported</p>
                </div>
              </>
            )}
            <input type="file" ref={fileInputRef} onChange={(e) => setVideoFile(e.target.files?.[0] || null)} className="hidden" accept="video/*" />
          </div>

          {/* Action Button */}
          {!audioUrl ? (
            <button 
              onClick={convertToMp3}
              disabled={!videoFile || isConverting || !isLoaded}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-lg font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-95 disabled:opacity-50 transition-all"
            >
              {!isLoaded ? (
                <> <Loader2 className="animate-spin" size={18} /> INITIALIZING... </>
              ) : isConverting ? (
                <> <Loader2 className="animate-spin" size={18} /> PROCESSING AUDIO... </>
              ) : (
                <> <Scissors size={18} /> EXTRACT AUDIO (MP3) </>
              )}
            </button>
          ) : (
            <div className="space-y-4 animate-in fade-in zoom-in-95">
              <div className="p-4 bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 rounded-lg flex items-center gap-3 text-green-600">
                <Music size={20} />
                <p className="text-xs font-bold uppercase tracking-widest">Audio Ready!</p>
              </div>
              <a 
                href={audioUrl} 
                download={`audio_${videoFile?.name.split('.')[0] || 'extracted'}.mp3`}
                className="w-full bg-slate-900 text-white py-4 rounded-lg font-black text-xs flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
              >
                <Download size={18} /> DOWNLOAD MP3
              </a>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-3 text-center border-t border-slate-100 dark:border-slate-800">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            <Zap size={10} className="text-indigo-500" /> High Quality Extraction
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoToAudio;