'use client';

import { useState } from 'react';
import { 
  Printer, 
  Plus, 
  User, 
  Hash, 
  ShieldCheck, 
  Trash2,
  Layers,
  Store,
  CreditCard
} from 'lucide-react';

export default function ToolxBDReceipt() {
  const [shopName, setShopName] = useState('');
  const [customer, setCustomer] = useState('');
  const [orderId, setOrderId] = useState(`TX-${Math.floor(1000 + Math.random() * 9000)}`);
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('Paid');
  const [isGenerated, setIsGenerated] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setIsGenerated(false);
    setShopName('');
    setCustomer('');
    setItem('');
    setAmount('');
    setStatus('Paid');
    setOrderId(`TX-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-4 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-center gap-8">
        
        {/* Form Section - Hidden on Print */}
        <div className="w-full max-w-sm flex flex-col gap-4 print:hidden">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-slate-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-800 dark:text-white">Create Receipt</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase px-1 flex items-center gap-1">
                  <Store className="w-3 h-3" /> Shop / Business Name
                </label>
                <input 
                  value={shopName} 
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-purple-500 transition-all"
                  placeholder="e.g. My Digital Store"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Customer Name</label>
                <input 
                  value={customer} 
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-purple-500 transition-all"
                  placeholder="e.g. Shan"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Amount (৳)</label>
                  <input 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-purple-500 font-mono"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase px-1 flex items-center gap-1">
                    <CreditCard className="w-3 h-3" /> Status
                  </label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-purple-500 appearance-none cursor-pointer"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Service/Product</label>
                <input 
                  value={item} 
                  onChange={(e) => setItem(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-purple-500 transition-all"
                  placeholder="e.g. Premium Subscription"
                />
              </div>
              
              <button 
                onClick={() => setIsGenerated(true)}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-purple-500/20 transition-all active:scale-95"
              >
                Generate Preview
              </button>
            </div>
          </div>

          {/* Action Buttons: Form er niche (PC-te bame thakbe) */}
          {isGenerated && (
            <div className="flex gap-3 w-full animate-in fade-in slide-in-from-top-2">
              <button onClick={handlePrint} className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-md transition-colors">
                <Printer className="w-4 h-4" /> Print
              </button>
              <button onClick={handleReset} className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors">
                <Trash2 className="w-4 h-4" /> Reset
              </button>
            </div>
          )}
        </div>

        {/* Receipt Preview */}
        {isGenerated && (
          <div className="w-full max-w-md flex flex-col items-center animate-in zoom-in-95 duration-300">
            <div className="relative w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-xl print:shadow-none print:border-slate-200">
              
              {/* FIXED TOOLXBD WATERMARK */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] dark:opacity-[0.05] rotate-[-35deg] overflow-hidden">
                <h1 className="text-8xl font-black uppercase tracking-tighter whitespace-nowrap">
                  ToolxBD
                </h1>
              </div>

              {/* Header */}
              <div className="bg-purple-600 p-6 text-white flex justify-between items-center">
                <div>
                  <h1 className="text-sm font-black uppercase tracking-tighter flex items-center gap-2">
                     <Layers className="w-4 h-4" /> {shopName || 'Your Shop'} <span className="opacity-60 font-light italic">Receipt</span>
                  </h1>
                  <p className="text-[8px] uppercase tracking-[0.3em] font-bold opacity-80 mt-1">Verified Digital Asset</p>
                </div>
                <div className="text-right">
                  <p className={`text-[10px] font-mono font-bold tracking-tighter uppercase italic px-3 py-1 rounded shadow-sm ${
                    status === 'Paid' ? 'bg-emerald-400/30 text-emerald-100' : 'bg-red-400/30 text-red-100 border border-red-400/20'
                  }`}>
                    {status}
                  </p>
                </div>
              </div>

              <div className="p-8 relative z-10">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                      <User className="w-2.5 h-2.5 text-indigo-500" /> Billed To
                    </p>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase leading-tight">{customer || 'Guest User'}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1 justify-end">
                      <Hash className="w-2.5 h-2.5 text-indigo-500" /> ID
                    </p>
                    <h3 className="text-xs font-mono font-bold text-purple-600">{orderId}</h3>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                   <div className="pb-2 border-b border-slate-100 dark:border-zinc-800 flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      <span>Description</span>
                      <span>Subtotal</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-tight">{item || 'Digital Service'}</span>
                      <span className="text-sm font-black font-mono text-slate-900 dark:text-white">৳{amount || '0.00'}</span>
                   </div>
                </div>

                {/* Total Section */}
                <div className={`p-4 rounded-lg border flex justify-between items-center ${
                  status === 'Paid' 
                  ? 'bg-indigo-50 border-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-900/30' 
                  : 'bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:border-amber-900/30'
                }`}>
                   <span className={`text-[9px] font-black uppercase tracking-widest ${
                     status === 'Paid' ? 'text-indigo-700' : 'text-amber-700'
                   }`}>Total Amount</span>
                   <span className={`text-xl font-black font-mono tracking-tighter ${
                     status === 'Paid' ? 'text-indigo-600' : 'text-amber-600'
                   }`}>৳{amount || '0.00'}</span>
                </div>

                {/* Footer */}
                <div className="mt-10 text-center border-t border-dashed border-slate-200 dark:border-zinc-800 pt-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 rounded-full mb-4">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest">Secured by ToolxBD</span>
                  </div>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.4em]">
                    Thank You For Your Business
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .print\:hidden { display: none !important; }
          .min-h-screen { min-height: auto !important; padding: 0 !important; }
          .shadow-xl { box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}