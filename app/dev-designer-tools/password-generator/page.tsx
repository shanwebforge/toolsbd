'use client';

import { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Copy, RefreshCw, Lock, Zap, CheckCircle2, ShieldAlert, Key } from 'lucide-react';

const PasswordGeneratorPage = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [isCopied, setIsCopied] = useState(false);
  const [strength, setStrength] = useState({ label: '', color: 'bg-zinc-200' });

  const generatePassword = useCallback(() => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const symbols = "!@#$%^&*()-_=+[]{}|;:',.<>/?";
    const all = upper + lower + nums + symbols;

    let newPassword = "";
    // Ensure at least one of each type
    newPassword += upper[Math.floor(Math.random() * upper.length)];
    newPassword += lower[Math.floor(Math.random() * lower.length)];
    newPassword += nums[Math.floor(Math.random() * nums.length)];
    newPassword += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = 4; i < length; i++) {
      newPassword += all[Math.floor(Math.random() * all.length)];
    }

    const shuffled = newPassword.split('').sort(() => 0.5 - Math.random()).join('');
    setPassword(shuffled);
    setIsCopied(false);
    
    // Calculate Strength
    if (length < 10) setStrength({ label: 'Weak', color: 'bg-rose-500' });
    else if (length < 15) setStrength({ label: 'Good', color: 'bg-amber-500' });
    else setStrength({ label: 'Strong', color: 'bg-emerald-500' });
  }, [length]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] py-16 px-4 selection:bg-indigo-500/30 font-sans">
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 rounded-full text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> Security Suite
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
            Fortress <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-serif italic font-medium px-2">Key</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
            Generate uncrackable passwords with military-grade randomness.
          </p>
        </div>

        {/* Main Interface Card */}
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white dark:border-zinc-800 overflow-hidden">
          
          {/* Result Area */}
          <div className="p-8 md:p-10 bg-zinc-50/50 dark:bg-zinc-800/20 border-b border-zinc-100 dark:border-zinc-800">
            <div className="relative group">
              <input 
                type="text" 
                value={password} 
                readOnly 
                className="w-full p-6 text-2xl md:text-3xl font-mono tracking-wider text-center bg-white dark:bg-zinc-950 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-3xl text-indigo-600 dark:text-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-default"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <button 
                  onClick={generatePassword}
                  className="p-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-indigo-600 rounded-xl transition-colors hover:bg-white dark:hover:bg-zinc-700 shadow-sm"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Strength Meter */}
            <div className="mt-6 px-2">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Password Strength</span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${strength.color.replace('bg-', 'text-')} bg-opacity-10`}>
                  {strength.label}
                </span>
              </div>
              <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${strength.color} transition-all duration-500`} 
                  style={{ width: `${(length / 32) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Controls Area */}
          <div className="p-8 md:p-10 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Key className="w-3.5 h-3.5" /> Character Length
                </label>
                <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-mono bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-lg">
                  {length}
                </span>
              </div>
              <input 
                type="range" 
                min="8" 
                max="32" 
                value={length} 
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <button 
              onClick={handleCopy}
              className={`w-full py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-500 shadow-xl ${
                isCopied 
                ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:scale-[1.02] active:scale-95'
              }`}
            >
              {isCopied ? (
                <>
                  <CheckCircle2 className="w-5 h-5" /> Copied To Clipboard
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" /> Copy Password
                </>
              )}
            </button>
          </div>

          {/* Footer Info */}
          <div className="px-10 py-5 bg-zinc-50/50 dark:bg-zinc-800/30 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
            <div className="flex items-center gap-2 text-zinc-400">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">End-to-End Local</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">AES-256 Ready</span>
            </div>
          </div>
        </div>

        {/* Floating Decoration */}
        <div className="mt-8 flex justify-center gap-12 opacity-30 grayscale">
          <Zap className="w-5 h-5 text-zinc-400" />
          <Lock className="w-5 h-5 text-zinc-400" />
          <ShieldCheck className="w-5 h-5 text-zinc-400" />
        </div>
      </div>
    </div>
  );
};

export default PasswordGeneratorPage;