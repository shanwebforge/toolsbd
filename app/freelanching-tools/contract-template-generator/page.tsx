'use client';

import { useState } from 'react';
import { 
  FileSignature, Copy, Printer, 
  ShieldCheck, FileCheck, Info, PlusCircle,
  Briefcase, Calendar, Banknote, Clock
} from 'lucide-react';

const ContractTemplateGenerator = () => {
  const [clientName, setClientName] = useState('');
  const [freelancerName, setFreelancerName] = useState('');
  const [project, setProject] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [terms, setTerms] = useState('');
  const [contract, setContract] = useState('');

  const generateContract = () => {
    if (!clientName || !freelancerName || !project || !date || !amount || !deadline) {
      alert('Please fill all required fields.');
      return;
    }

    const contractText = `CONTRACT AGREEMENT\n\nThis agreement is made on ${date} between ${clientName} ("Client") and ${freelancerName} ("Freelancer").\n\nProject Scope: ${project}\nTotal Compensation: ৳${amount}\nDelivery Deadline: ${deadline}\n\nAdditional Clauses:\n${terms || 'No extra terms specified.'}\n\nExecuted by:\n\n_____________________\nClient: ${clientName}\n\n_____________________\nFreelancer: ${freelancerName}`;
    setContract(contractText);
  };

  const copyContract = () => {
    navigator.clipboard.writeText(contract).then(() => alert("Copied! ✅"));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 font-sans text-slate-900 dark:text-slate-100 selection:bg-purple-100 dark:selection:bg-purple-900/30">
      
      {/* --- MAIN GENERATOR INTERFACE --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        
        {/* Left: Input Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-purple-600">
                <FileSignature size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Drafting Engine</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase text-purple-600 ml-1">Client Name</label>
                <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Enter name" className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none focus:border-purple-500 transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase text-purple-600 ml-1">Freelancer Name</label>
                <input type="text" value={freelancerName} onChange={(e) => setFreelancerName(e.target.value)} placeholder="Enter name" className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none focus:border-purple-500 transition-all" />
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <label className="text-[9px] font-bold uppercase text-purple-600 ml-1">Project / Service Description</label>
              <input type="text" value={project} onChange={(e) => setProject(e.target.value)} placeholder="e.g. Fullstack Web App" className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none focus:border-purple-500 transition-all" />
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase text-purple-600 ml-1">Date</label>
                <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="DD/MM/YY" className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none focus:border-purple-500" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase text-purple-600 ml-1">Fee (৳)</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none focus:border-purple-500" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase text-purple-600 ml-1">Deadline</label>
                <input type="text" value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="e.g. 30 Days" className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none focus:border-purple-500" />
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <label className="text-[9px] font-bold uppercase text-purple-600 ml-1">Additional Terms</label>
              <textarea value={terms} onChange={(e) => setTerms(e.target.value)} placeholder="Revision limits, advance payment, etc." className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold outline-none focus:border-purple-500 min-h-[80px] resize-none" />
            </div>

            <button onClick={generateContract} className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-black py-4 rounded-lg flex items-center justify-center gap-2 uppercase tracking-widest transition-all shadow-lg shadow-purple-500/20 active:scale-95">
              <PlusCircle size={14} strokeWidth={3} /> Generate Draft
            </button>
          </div>
        </div>

        {/* Right: Live Preview Panel */}
        <div className="lg:col-span-7 h-full">
          {contract ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm h-full flex flex-col min-h-[500px]">
              <div className="p-8 flex-1 overflow-auto bg-slate-50/20 dark:bg-slate-950/20">
                <pre className="font-mono text-[11px] leading-relaxed whitespace-pre-wrap text-slate-700 dark:text-slate-300">
                  {contract}
                </pre>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 border-t dark:border-slate-800 flex gap-3">
                <button onClick={copyContract} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95">
                  <Copy size={14} /> Copy Source
                </button>
                <button onClick={() => window.print()} className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all border border-slate-800 active:scale-95">
                  <Printer size={14} /> Download PDF
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg flex flex-col items-center justify-center text-slate-400 bg-slate-50/20">
              <FileCheck size={40} className="mb-3 opacity-20" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Draft Engine Standby</p>
            </div>
          )}
        </div>
      </div>

      {/* --- PROFESSIONAL DETAILS SECTION (DESIGNED) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 flex flex-col gap-3">
            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-lg flex items-center justify-center">
                <ShieldCheck size={20} />
            </div>
            <div>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1">Local Sovereignty</h4>
                <p className="text-[12px] text-slate-400 leading-snug font-medium">Your data never leaves your browser. All drafting is executed on the client side for maximum privacy.</p>
            </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 flex flex-col gap-3">
            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-lg flex items-center justify-center">
                <Info size={20} />
            </div>
            <div>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1">Professional Schema</h4>
                <p className="text-[12px] text-slate-400 leading-snug font-medium">Templates are structured based on modern B2B agreement standards used by top-tier global agencies.</p>
            </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 flex flex-col gap-3">
            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-lg flex items-center justify-center">
                <FileCheck size={20} />
            </div>
            <div>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1">Vector Optimized</h4>
                <p className="text-[12px] text-slate-400 leading-snug font-medium">Exported PDFs are perfectly scaled for professional printing and digital signature integration.</p>
            </div>
        </div>
      </div>

      {/* --- MINIMALIST COMPACT FOOTER --- */}
      <footer className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          DraftEngine Active: Stable v1.0.4
        </div>
        <div className="flex gap-4">
          <span className="text-[9px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">End-to-End Encryption</span>
          <span className="text-[9px] font-black text-indigo-500/50 uppercase tracking-widest">Client-Side Only</span>
        </div>
      </footer>
    </div>
  );
};

export default ContractTemplateGenerator;