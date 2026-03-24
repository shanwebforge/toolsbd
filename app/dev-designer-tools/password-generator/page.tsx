'use client';

import { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Copy, RefreshCw, Lock, Zap, CheckCircle2, ShieldAlert, Key, Fingerprint } from 'lucide-react';

const PasswordGeneratorPage = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [isCopied, setIsCopied] = useState(false);
  const [strength, setStrength] = useState({ label: '', color: 'bg-slate-200' });

  const generatePassword = useCallback(() => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const symbols = "!@#$%^&*()-_=+[]{}|;:',.<>/?";
    const all = upper + lower + nums + symbols;

    let newPassword = "";
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
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 font-sans">
      <div className="max-w-2xl mx-auto relative">
        
        {/* Header - Purple Primary */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-lg shadow-lg shadow-purple-500/20 mb-4">
            <Fingerprint className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight uppercase">
            Fortress <span className="text-purple-600">Key</span>
          </h1>
          <p className="text-slate-400 text-xs font-medium mt-1">Generate uncrackable passwords with high-entropy randomness.</p>
        </div>

        {/* Main Interface Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-slate-200 dark:border-zinc-800 overflow-hidden">
          
          {/* Result Area */}
          <div className="p-6 md:p-8 bg-slate-50/50 dark:bg-zinc-800/20 border-b border-slate-100 dark:border-zinc-800">
            <div className="relative group">
              <input 
                type="text" 
                value={password} 
                readOnly 
                className="w-full p-5 text-xl md:text-2xl font-mono tracking-widest text-center bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-lg text-indigo-600 dark:text-indigo-400 focus:outline-none focus:border-purple-500 transition-all cursor-default shadow-sm"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <button 
                  onClick={generatePassword}
                  className="p-2.5 bg-slate-100 dark:bg-zinc-800 text-slate-400 hover:text-purple-600 rounded-md transition-colors border border-slate-200 dark:border-zinc-700 shadow-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Strength Meter */}
            <div className="mt-6">
              <div className="flex justify-between items-end mb-2 px-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Security Level</span>
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md ${strength.color.replace('bg-', 'text-')} bg-opacity-10 border border-current opacity-80`}>
                  {strength.label}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${strength.color} transition-all duration-500 shadow-[0_0_8px] shadow-current`} 
                  style={{ width: `${(length / 32) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Controls Area */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Key className="w-3.5 h-3.5 text-indigo-500" /> Password Length
                </label>
                <span className="text-sm font-bold text-purple-600 dark:text-purple-400 font-mono bg-purple-50 dark:bg-purple-900/30 px-3 py-1 rounded-md border border-purple-100 dark:border-purple-800/50">
                  {length < 10 ? `0${length}` : length}
                </span>
              </div>
              <input 
                type="range" 
                min="8" 
                max="32" 
                value={length} 
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            <button 
              onClick={handleCopy}
              className={`w-full py-4 rounded-lg text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 shadow-md active:scale-[0.98] ${
                isCopied 
                ? 'bg-emerald-500 text-white shadow-emerald-500/10' 
                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/10'
              }`}
            >
              {isCopied ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Copied To Clipboard
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy Secure Key
                </>
              )}
            </button>
          </div>

          {/* Footer Info */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-zinc-800/30 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-center">
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="text-[9px] font-bold uppercase tracking-widest">Client-Side Only</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Instant Entropy</span>
            </div>
          </div>
        </div>

        {/* Minimalist Footer Link */}
        <div className="mt-8 flex justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
          <Lock className="w-4 h-4 text-slate-400" />
          <ShieldCheck className="w-4 h-4 text-slate-400" />
          <Zap className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
};

export default PasswordGeneratorPage;