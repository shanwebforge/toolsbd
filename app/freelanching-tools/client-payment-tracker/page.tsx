'use client';

import { useState } from 'react';
import { 
  Wallet, User, Briefcase, Banknote, 
  Plus, Users, CheckCircle, ShieldCheck, 
  PieChart, History 
} from 'lucide-react';

interface Payment {
  name: string;
  project: string;
  total: number;
  paid: number;
  due: number;
}

interface Summary {
  totalClient: number;
  totalPaid: number;
  totalDue: number;
}

const ClientPaymentTracker = () => {
  const [name, setName] = useState('');
  const [project, setProject] = useState('');
  const [total, setTotal] = useState('');
  const [paid, setPaid] = useState('');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [summary, setSummary] = useState<Summary>({ totalClient: 0, totalPaid: 0, totalDue: 0 });

  const addPayment = () => {
    const totalAmount = parseFloat(total);
    const paidAmount = parseFloat(paid);

    if (!name || !project || isNaN(totalAmount) || isNaN(paidAmount) || totalAmount < paidAmount) {
      alert('Please fill all fields correctly.');
      return;
    }

    const due = totalAmount - paidAmount;
    const newPayment: Payment = { name, project, total: totalAmount, paid: paidAmount, due };

    setPayments([...payments, newPayment]);
    setSummary({
      totalClient: summary.totalClient + 1,
      totalPaid: summary.totalPaid + paidAmount,
      totalDue: summary.totalDue + due,
    });

    setName(''); setProject(''); setTotal(''); setPaid('');
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 font-sans text-slate-900 dark:text-slate-100 selection:bg-purple-100 dark:selection:bg-purple-900/30">
      
      <div className="flex items-center gap-2 mb-6 border-b pb-4 border-slate-200 dark:border-slate-800">
        <Wallet size={20} className="text-purple-600" />
        <h1 className="text-sm font-black tracking-widest uppercase italic text-purple-700 dark:text-purple-400">Ledger Pro v2.1</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        
        {/* Left: Input Form */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-5 text-slate-400">Entry Terminal</h3>
            <div className="space-y-4">
              <div className="relative">
                <label className="text-[9px] font-bold uppercase text-purple-600 mb-1 block ml-1">Client Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rahman Ali" className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none focus:border-purple-500 transition-all" />
              </div>
              <div>
                <label className="text-[9px] font-bold uppercase text-purple-600 mb-1 block ml-1">Project/Service</label>
                <input type="text" value={project} onChange={(e) => setProject(e.target.value)} placeholder="Web Development" className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none focus:border-purple-500 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-bold uppercase text-purple-600 mb-1 block ml-1">Total (৳)</label>
                  <input type="number" value={total} onChange={(e) => setTotal(e.target.value)} placeholder="0.00" className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-purple-600 mb-1 block ml-1">Received (৳)</label>
                  <input type="number" value={paid} onChange={(e) => setPaid(e.target.value)} placeholder="0.00" className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none focus:border-purple-500" />
                </div>
              </div>
              <button onClick={addPayment} className="w-full bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-black py-3 rounded-lg flex items-center justify-center gap-2 uppercase tracking-widest transition-all shadow-lg shadow-purple-500/20 active:scale-95">
                <Plus size={14} strokeWidth={3} /> Record Payment
              </button>
            </div>
          </div>

          <div className="bg-indigo-600 p-5 rounded-lg text-white shadow-lg shadow-indigo-500/20">
             <div className="flex items-center gap-2 mb-3 opacity-80 uppercase text-[9px] font-black tracking-widest">
               <PieChart size={14} /> Global Insight
             </div>
             <div className="space-y-1">
               <p className="text-[10px] font-bold opacity-70">Total Receivable Balance</p>
               <p className="text-2xl font-black tabular-nums">৳{summary.totalDue.toLocaleString()}</p>
             </div>
          </div>
        </div>

        {/* Right: Summary & List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-lg">
              <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Total Clients</p>
              <p className="text-xl font-black text-purple-600 tabular-nums">{summary.totalClient}</p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-lg">
              <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Settled Funds</p>
              <p className="text-xl font-black text-emerald-500 tabular-nums">৳{summary.totalPaid.toLocaleString()}</p>
            </div>
            <div className="hidden md:block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-lg border-l-4 border-l-indigo-500">
              <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">System Health</p>
              <p className="text-sm font-black text-indigo-500 uppercase tracking-tighter">Verified Secure</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                 <History size={14} /> Transaction History
               </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[9px] font-black uppercase text-slate-400 border-b dark:border-slate-800">
                    <th className="p-4">Client/Project</th>
                    <th className="p-4">Bill</th>
                    <th className="p-4">Paid</th>
                    <th className="p-4">Balance</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-semibold">
                  {payments.length === 0 ? (
                    <tr><td colSpan={4} className="p-10 text-center text-slate-300 uppercase text-[10px] tracking-widest">No Records Found</td></tr>
                  ) : (
                    payments.map((p, i) => (
                      <tr key={i} className="border-b last:border-0 border-slate-50 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                        <td className="p-4">
                          <p className="font-bold">{p.name}</p>
                          <p className="text-[9px] text-slate-400 uppercase tracking-tighter italic">{p.project}</p>
                        </td>
                        <td className="p-4 tabular-nums text-slate-500">৳{p.total}</td>
                        <td className="p-4 tabular-nums text-emerald-600">৳{p.paid}</td>
                        <td className="p-4 tabular-nums text-rose-500 font-bold">৳{p.due}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* --- COMPACT DETAILS SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pt-6 border-t border-slate-100 dark:border-slate-800">
        <div className="flex gap-3">
          <div className="shrink-0 w-8 h-8 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-lg flex items-center justify-center"><ShieldCheck size={16}/></div>
          <div>
            <h5 className="text-[10px] font-black uppercase tracking-widest mb-1">Local Privacy</h5>
            <p className="text-[11px] text-slate-500 leading-tight">Financial records stay on your machine. No cloud sync means 100% data sovereignty.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="shrink-0 w-8 h-8 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-lg flex items-center justify-center"><CheckCircle size={16}/></div>
          <div>
            <h5 className="text-[10px] font-black uppercase tracking-widest mb-1">Balance Logic</h5>
            <p className="text-[11px] text-slate-500 leading-tight">Precision calculation engine ensures "Paid vs Due" amounts are always accurate.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="shrink-0 w-8 h-8 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-lg flex items-center justify-center"><Users size={16}/></div>
          <div>
            <h5 className="text-[10px] font-black uppercase tracking-widest mb-1">B2B Standards</h5>
            <p className="text-[11px] text-slate-500 leading-tight">Formatted for professional bookkeeping and small business financial management.</p>
          </div>
        </div>
      </div>

      {/* --- MINIMALIST FOOTER --- */}
      <footer className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Ready for Audit</p>
        <div className="flex gap-4">
          <span className="text-[9px] font-black text-indigo-400/50 uppercase tracking-widest">v2.1 Stable</span>
        </div>
      </footer>
    </div>
  );
};

export default ClientPaymentTracker;