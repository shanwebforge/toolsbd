'use client';

import { useState, useEffect } from 'react';
import { 
  Wallet, 
  Plus, 
  Trash2, 
  TrendingDown, 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  X,
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar
} from 'lucide-react';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export default function ExpenseTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('shan_expenses');
    if (saved) setTransactions(JSON.parse(saved));
  }, []);

  const saveToLocal = (data: Transaction[]) => {
    setTransactions(data);
    localStorage.setItem('shan_expenses', JSON.stringify(data));
  };

  const addTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      type,
      category: category || 'General',
      date: new Date().toLocaleDateString()
    };

    saveToLocal([newTransaction, ...transactions]);
    setIsModalOpen(false);
    setTitle(''); setAmount(''); setType('expense'); setCategory('');
  };

  const deleteTransaction = (id: string) => {
    const filtered = transactions.filter(t => t.id !== id);
    saveToLocal(filtered);
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 font-sans text-slate-800 dark:text-zinc-200">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-600 rounded-lg shadow-lg shadow-rose-500/20 mb-3">
              <Wallet className="w-4 h-4 text-white" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Finance Hub</span>
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-tight">Expense <span className="text-rose-600">Tracker</span></h1>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="p-3 bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-lg transition-all active:scale-95"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Balance</p>
            <h2 className={`text-2xl font-black font-mono ${balance >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>৳{balance.toLocaleString()}</h2>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><ArrowUpCircle className="w-3 h-3 text-emerald-500" /> Income</p>
            <h2 className="text-2xl font-black font-mono text-emerald-500">৳{totalIncome.toLocaleString()}</h2>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><ArrowDownCircle className="w-3 h-3 text-rose-500" /> Expense</p>
            <h2 className="text-2xl font-black font-mono text-rose-500">৳{totalExpense.toLocaleString()}</h2>
          </div>
        </div>

        {/* Transaction History */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Recent Transactions</h3>
          {transactions.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-xl">
               <PieChart className="w-10 h-10 text-slate-200 mx-auto mb-3" />
               <p className="text-xs font-bold text-slate-400 uppercase">No transactions found</p>
            </div>
          ) : (
            transactions.map((t) => (
              <div key={t.id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-xl flex items-center justify-between group hover:border-rose-200 transition-all shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-lg ${t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {t.type === 'income' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-tight">{t.title}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-2">
                      {t.category} • <Calendar className="w-2.5 h-2.5" /> {t.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`font-mono font-bold text-sm ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {t.type === 'income' ? '+' : '-'}৳{t.amount.toLocaleString()}
                  </span>
                  <button onClick={() => deleteTransaction(t.id)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-sm rounded-2xl shadow-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                <h2 className="text-xs font-bold uppercase tracking-widest">Add Transaction</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={addTransaction} className="p-6 space-y-4">
                <div className="flex p-1 bg-slate-100 dark:bg-zinc-800 rounded-lg">
                  <button type="button" onClick={() => setType('income')} className={`flex-1 py-2 text-[10px] font-bold rounded-md transition-all ${type === 'income' ? 'bg-white dark:bg-zinc-700 text-emerald-600 shadow-sm' : 'text-slate-400'}`}>INCOME</button>
                  <button type="button" onClick={() => setType('expense')} className={`flex-1 py-2 text-[10px] font-bold rounded-md transition-all ${type === 'expense' ? 'bg-white dark:bg-zinc-700 text-rose-600 shadow-sm' : 'text-slate-400'}`}>EXPENSE</button>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Title</label>
                  <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="Rent, Salary, Food..." className="w-full p-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-xs outline-none focus:border-rose-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Amount (৳)</label>
                    <input required type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-xs outline-none focus:border-rose-500 font-mono" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Category</label>
                    <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Food" className="w-full p-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-xs outline-none focus:border-rose-500" />
                  </div>
                </div>
                <button type="submit" className="w-full py-4 bg-rose-600 text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-rose-500/20 active:scale-95 transition-all">
                  Save Transaction
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}