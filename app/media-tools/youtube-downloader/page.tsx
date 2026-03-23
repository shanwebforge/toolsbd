'use client';

import { useState } from 'react';
import { Download, Youtube, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function YoutubeDownloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ msg: string; type: 'success' | 'error' | null }>({ msg: '', type: null });

  const handleDownload = async () => {
    if (!url.trim()) {
      setStatus({ msg: 'Please enter a URL', type: 'error' });
      return;
    }

    setLoading(true);
    setStatus({ msg: 'Downloading...', type: 'success' });

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error("Failed");

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `video_${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      
      setStatus({ msg: 'Download Started!', type: 'success' });
      setUrl('');
    } catch (err) {
      setStatus({ msg: 'Download failed. Use another link.', type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ msg: '', type: null }), 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[400px] bg-[#0c0c0e] p-4 text-slate-200">
      <div className="w-full max-w-[380px] bg-[#16161a] border border-white/5 rounded-[32px] p-8 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-red-600/10 rounded-2xl border border-red-600/20">
            <Youtube size={24} className="text-red-500" />
          </div>
          <h1 className="text-lg font-black tracking-tight">Video Downloader</h1>
        </div>

        {/* Input & Button */}
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Paste YouTube Link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-[#1c1c21] border border-white/10 p-4 rounded-2xl outline-none focus:border-red-500/40 transition-all text-sm font-medium placeholder:text-slate-600"
          />

          <button 
            onClick={handleDownload}
            disabled={loading}
            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.2em] transition-all active:scale-95 ${
              loading ? 'bg-slate-800 text-slate-500' : 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/10'
            }`}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
            {loading ? 'Processing' : 'Download Video'}
          </button>
        </div>

        {/* Status Messages */}
        {status.type && (
          <div className={`mt-6 p-4 rounded-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
            status.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
          }`}>
            {status.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
            <span className="text-[10px] font-black uppercase tracking-widest">{status.msg}</span>
          </div>
        )}

      </div>
    </div>
  );
}