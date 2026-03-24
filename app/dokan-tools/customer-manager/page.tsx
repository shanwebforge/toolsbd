'use client';

import { useState, useEffect } from 'react';
import { 
  UserPlus, 
  Search, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  X, 
  Star, 
  ArrowRight,
  UserCircle,
  TrendingUp,
  History
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalSpent: string;
  status: 'VIP' | 'Regular' | 'New';
  lastOrder: string;
}

export default function CustomerManager() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [spent, setSpent] = useState('');
  const [status, setStatus] = useState<Customer['status']>('New');

  useEffect(() => {
    const saved = localStorage.getItem('shan_customers_data');
    if (saved) setCustomers(JSON.parse(saved));
  }, []);

  const saveToLocal = (newCustomers: Customer[]) => {
    setCustomers(newCustomers);
    localStorage.setItem('shan_customers_data', JSON.stringify(newCustomers));
  };

  const addCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      address,
      totalSpent: spent || '0',
      status: status,
      lastOrder: new Date().toLocaleDateString()
    };
    saveToLocal([newCustomer, ...customers]);
    setIsModalOpen(false);
    // Reset
    setName(''); setEmail(''); setPhone(''); setAddress(''); setSpent('');
  };

  const deleteCustomer = (id: string) => {
    const filtered = customers.filter(c => c.id !== id);
    saveToLocal(filtered);
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20 mb-3">
              <UserCircle className="w-4 h-4 text-white" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Customer Relations</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white uppercase">
              Customer <span className="text-indigo-600">Directory</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                className="pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg text-xs outline-none focus:border-indigo-500 w-full md:w-64 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all shadow-md active:scale-95"
            >
              <UserPlus className="w-4 h-4" /> Add Customer
            </button>
          </div>
        </div>

        {/* Customer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.length === 0 ? (
            <div className="col-span-full border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-lg p-20 text-center">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">No customers registered yet</p>
            </div>
          ) : (
            filteredCustomers.map((customer) => (
              <div key={customer.id} className="bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 p-6 hover:shadow-xl hover:border-indigo-200 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg">
                    {customer.name.charAt(0)}
                  </div>
                  <span className={`text-[9px] font-bold uppercase px-2 py-1 rounded-md ${
                    customer.status === 'VIP' ? 'bg-amber-100 text-amber-600 border border-amber-200' :
                    customer.status === 'Regular' ? 'bg-indigo-100 text-indigo-600 border border-indigo-200' :
                    'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}>
                    {customer.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-tight mb-4">{customer.name}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-zinc-400">
                    <Mail className="w-3.5 h-3.5 text-indigo-400" /> {customer.email}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-zinc-400">
                    <Phone className="w-3.5 h-3.5 text-indigo-400" /> {customer.phone}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {customer.address}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-50 dark:border-zinc-800">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Total Spent
                    </p>
                    <p className="text-sm font-black text-indigo-600 dark:text-indigo-400 font-mono">৳{customer.totalSpent}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
                      <History className="w-3 h-3" /> Last Activity
                    </p>
                    <p className="text-[10px] font-bold text-slate-600 dark:text-zinc-300">{customer.lastOrder}</p>
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button onClick={() => deleteCustomer(customer.id)} className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="flex items-center gap-1 text-[9px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-2 rounded-lg hover:bg-indigo-100 transition-all">
                    View Profile <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Customer Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-xl shadow-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-[11px] font-bold text-slate-800 dark:text-white uppercase tracking-[0.2em]">Register New Customer</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><X className="w-5 h-5" /></button>
              </div>
              
              <form onSubmit={addCustomer} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Customer Name</label>
                    <input required value={name} onChange={e => setName(e.target.value)} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-indigo-500 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Email</label>
                    <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-indigo-500 transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Phone Number</label>
                    <input required value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-indigo-500 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Status Tag</label>
                    <select value={status} onChange={e => setStatus(e.target.value as any)} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none">
                      <option value="New">New Customer</option>
                      <option value="Regular">Regular</option>
                      <option value="VIP">VIP Customer</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Address / Location</label>
                  <input value={address} onChange={e => setAddress(e.target.value)} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-indigo-500 transition-all" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase px-1">Initial Total Spent (৳)</label>
                  <input value={spent} onChange={e => setSpent(e.target.value)} placeholder="0.00" className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-indigo-500 transition-all" />
                </div>

                <button type="submit" className="w-full py-3.5 bg-indigo-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-[0.2em] mt-4 shadow-xl shadow-indigo-500/20 active:scale-95 transition-all">
                  Onboard Customer
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}