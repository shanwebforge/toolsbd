'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Trash2, 
  Mail, 
  Phone, 
  DollarSign, 
  Briefcase, 
  X, 
  Search,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  project: string;
  status: 'Pending' | 'Active' | 'Completed';
  amount: string;
}

export default function ClientManager() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [project, setProject] = useState('');
  const [status, setStatus] = useState<'Pending' | 'Active' | 'Completed'>('Pending');
  const [amount, setAmount] = useState('');

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('shan_clients');
    if (saved) setClients(JSON.parse(saved));
  }, []);

  const saveToLocal = (updatedClients: Client[]) => {
    setClients(updatedClients);
    localStorage.setItem('shan_clients', JSON.stringify(updatedClients));
  };

  const addClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newClient: Client = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      project,
      status,
      amount
    };

    saveToLocal([newClient, ...clients]);
    setIsModalOpen(false);
    // Reset Form
    setName(''); setEmail(''); setPhone(''); setProject(''); setStatus('Pending'); setAmount('');
  };

  const deleteClient = (id: string) => {
    const filtered = clients.filter(c => c.id !== id);
    saveToLocal(filtered);
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-10 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600 rounded-lg shadow-lg shadow-purple-500/20 mb-3">
              <Users className="w-4 h-4 text-white" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">CRM Console</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white uppercase">
              Client <span className="text-purple-600">Base</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search clients..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg text-xs outline-none focus:border-purple-500 w-full md:w-64 transition-all shadow-sm"
              />
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-95 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> Add Client
            </button>
          </div>
        </div>

        {/* Clients Table/Grid */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-slate-200 dark:border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-zinc-800/50 border-b border-slate-100 dark:border-zinc-800">
                <tr>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client Name</th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project</th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                {filteredClients.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-slate-400 text-xs font-medium uppercase tracking-widest">No clients found</td>
                  </tr>
                ) : (
                  filteredClients.map((client) => (
                    <tr key={client.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors group">
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700 dark:text-white">{client.name}</span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 tracking-tight"><Mail className="w-3 h-3" /> {client.email}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-xs font-medium text-slate-600 dark:text-zinc-400 flex items-center gap-2">
                          <Briefcase className="w-3.5 h-3.5 text-indigo-500" /> {client.project}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md border ${
                          client.status === 'Active' ? 'text-indigo-600 border-indigo-100 bg-indigo-50' : 
                          client.status === 'Completed' ? 'text-emerald-600 border-emerald-100 bg-emerald-50' : 
                          'text-amber-600 border-amber-100 bg-amber-50'
                        }`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-xs font-bold text-slate-700 dark:text-white flex items-center gap-1 font-mono">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-500" /> {client.amount || '0.00'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => deleteClient(client.id)}
                          className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-md transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Client Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-lg shadow-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center bg-slate-50/50 dark:bg-zinc-800/50">
                <div className="flex items-center gap-2">
                   <div className="p-2 bg-purple-600 rounded-md shadow-lg shadow-purple-500/20">
                      <Users className="w-4 h-4 text-white" />
                   </div>
                   <h2 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-widest ml-1">New Client Registry</h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><X className="w-5 h-5" /></button>
              </div>
              
              <form onSubmit={addClient} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                    <input required value={name} onChange={e => setName(e.target.value)} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-purple-500 transition-all shadow-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                    <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-purple-500 transition-all shadow-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Project Name</label>
                    <input required value={project} onChange={e => setProject(e.target.value)} className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-purple-500 transition-all shadow-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Budget ($)</label>
                    <input type="text" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className="w-full p-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs outline-none focus:border-purple-500 transition-all shadow-sm" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Project Status</label>
                  <div className="flex bg-slate-100 dark:bg-zinc-800 p-1 rounded-lg border border-slate-200 dark:border-zinc-700">
                    {(['Pending', 'Active', 'Completed'] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setStatus(s)}
                        className={`flex-1 py-2 text-[10px] font-bold rounded-md transition-all ${status === s ? 'bg-white dark:bg-zinc-700 text-purple-600 shadow-sm' : 'text-slate-400 hover:text-slate-500'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" className="w-full py-3.5 bg-purple-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-[0.2em] mt-4 shadow-xl shadow-purple-500/20 active:scale-[0.98] transition-all">
                  Onboard Client
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Security Tag */}
        <div className="mt-8 flex justify-center items-center gap-2">
           <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
           <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">Local CRM Data Encryption Ready</span>
        </div>
      </div>
    </div>
  );
}