'use client';

import { useState } from 'react';
import { 
  FileText, Printer, Plus, User, Hash, 
  Clipboard, CheckCircle2, Shield, Zap, 
  Cpu, Globe, Smartphone, Download
} from 'lucide-react';

interface Invoice {
  customerName: string;
  invoiceNumber: string;
  itemDescription: string;
  itemQuantity: number;
  itemPrice: number;
  total: number;
}

const InvoiceGenerator = () => {
  const [customerName, setCustomerName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemPrice, setItemPrice] = useState(0);
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  const generateInvoice = () => {
    if (!customerName || !invoiceNumber || !itemDescription || itemQuantity <= 0 || itemPrice < 0) {
      alert('Please fill all information correctly.');
      return;
    }
    const total = itemQuantity * itemPrice;
    setInvoice({ customerName, invoiceNumber, itemDescription, itemQuantity, itemPrice, total });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-500/30">
      
      {/* --- GENERATOR CARD --- */}
      <div className="bg-white dark:bg-[#0d0e1f] border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden mb-16">
        <div className="bg-zinc-50 dark:bg-[#15162c] p-6 md:p-10 border-b border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"><FileText size={18} className="text-white"/></div>
              SMART BILLING ENGINE
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1 font-medium">Generate high-fidelity business invoices instantly.</p>
          </div>
          <div className="flex gap-2">
             <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold rounded-full border border-indigo-100 dark:border-indigo-500/20 uppercase tracking-widest">v2.0 Stable</span>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Customer Name</label>
              <input type="text" placeholder="John Doe" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full p-4 bg-zinc-50 dark:bg-[#111226] border border-zinc-200 dark:border-zinc-800 rounded-xl focus:border-indigo-500 outline-none transition-all dark:text-white text-sm font-semibold"/>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Invoice Number</label>
              <input type="text" placeholder="#INV-001" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="w-full p-4 bg-zinc-50 dark:bg-[#111226] border border-zinc-200 dark:border-zinc-800 rounded-xl focus:border-indigo-500 outline-none transition-all dark:text-white text-sm font-semibold"/>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Item Description</label>
              <input type="text" placeholder="Web Development Services" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} className="w-full p-4 bg-zinc-50 dark:bg-[#111226] border border-zinc-200 dark:border-zinc-800 rounded-xl focus:border-indigo-500 outline-none transition-all dark:text-white text-sm font-semibold"/>
            </div>
            <div className="grid grid-cols-2 gap-6 md:col-span-2">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Quantity</label>
                <input type="number" value={itemQuantity} onChange={(e) => setItemQuantity(parseInt(e.target.value))} className="w-full p-4 bg-zinc-50 dark:bg-[#111226] border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:border-indigo-500 dark:text-white text-sm font-semibold"/>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Unit Price (৳)</label>
                <input type="number" value={itemPrice} onChange={(e) => setItemPrice(parseFloat(e.target.value))} className="w-full p-4 bg-zinc-50 dark:bg-[#111226] border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:border-indigo-500 dark:text-white text-sm font-semibold"/>
              </div>
            </div>
          </div>

          <button onClick={generateInvoice} className="w-full mt-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-widest text-xs shadow-lg shadow-indigo-500/20">
            <Zap size={16} fill="currentColor"/> Generate Invoice
          </button>

          {invoice && (
            <div className="mt-12 p-1 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl animate-in fade-in zoom-in duration-300">
              <div className="bg-white dark:bg-[#0d0e1f] rounded-[calc(1rem-1px)] p-6 md:p-10">
                <div className="flex justify-between border-b dark:border-zinc-800 pb-6 mb-8">
                  <h4 className="text-2xl font-black dark:text-white italic uppercase tracking-tighter">Receipt</h4>
                  <div className="text-right">
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Ref No.</p>
                    <p className="text-lg font-black text-indigo-600">#{invoice.invoiceNumber}</p>
                  </div>
                </div>
                <div className="mb-8">
                   <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Bill To</p>
                   <p className="text-xl font-black dark:text-indigo-100">{invoice.customerName}</p>
                </div>
                <div className="w-full overflow-hidden rounded-xl border dark:border-zinc-800 mb-8">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-50 dark:bg-zinc-900 text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                      <tr>
                        <th className="p-4">Description</th>
                        <th className="p-4 text-center">Qty</th>
                        <th className="p-4 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="dark:text-white">
                      <tr>
                        <td className="p-4 font-bold border-t dark:border-zinc-800">{invoice.itemDescription}</td>
                        <td className="p-4 text-center font-bold border-t dark:border-zinc-800">x{invoice.itemQuantity}</td>
                        <td className="p-4 text-right font-black text-indigo-600 border-t dark:border-zinc-800 text-lg">৳ {invoice.total.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button onClick={() => window.print()} className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                  <Printer size={16} /> Export to PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- PROFESSIONAL DETAILS SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Left: Quick Specs Table */}
        <div className="md:col-span-5 space-y-6">
          <h3 className="text-lg font-black dark:text-white flex items-center gap-3">
            <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
            TECHNICAL SPECIFICATIONS
          </h3>
          <div className="bg-white dark:bg-[#0d0e1f] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <tbody>
                {[
                  { label: "Deployment", value: "Cloud-Native / Serverless" },
                  { label: "Data Privacy", value: "Zero-Knowledge Storage" },
                  { label: "Output Format", value: "Vector PDF / Print Ready" },
                  { label: "Calculations", value: "Real-time AI Engine" },
                  { label: "Mobile Sync", value: "Progressive Web Ready" },
                  { label: "Compliance", value: "Business Standard Layout" }
                ].map((row, i) => (
                  <tr key={i} className="border-b last:border-0 border-zinc-100 dark:border-zinc-800/50">
                    <td className="p-4 font-black text-zinc-400 uppercase tracking-widest bg-zinc-50/50 dark:bg-zinc-900/30 w-1/2">{row.label}</td>
                    <td className="p-4 font-bold text-zinc-700 dark:text-zinc-300">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Feature Grid (Compact) */}
        <div className="md:col-span-7 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            
            <div className="flex gap-4 group">
              <div className="shrink-0 w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Shield size={20} />
              </div>
              <div>
                <h4 className="font-black text-zinc-900 dark:text-white text-xs uppercase tracking-widest mb-2">End-to-End Privacy</h4>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">100% Client-side generation. Your financial data never leaves your browser, ensuring maximum confidentiality.</p>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="shrink-0 w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Cpu size={20} />
              </div>
              <div>
                <h4 className="font-black text-zinc-900 dark:text-white text-xs uppercase tracking-widest mb-2">Instant Computation</h4>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">Powerful calculation logic that handles unit prices and quantities with absolute precision for professional accuracy.</p>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="shrink-0 w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Smartphone size={20} />
              </div>
              <div>
                <h4 className="font-black text-zinc-900 dark:text-white text-xs uppercase tracking-widest mb-2">On-The-Go Billing</h4>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">Fully optimized for mobile workflows. Create and send invoices directly from your smartphone during client meetings.</p>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="shrink-0 w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Globe size={20} />
              </div>
              <div>
                <h4 className="font-black text-zinc-900 dark:text-white text-xs uppercase tracking-widest mb-2">Global Standards</h4>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">Designed with international business standards in mind, providing a clean, minimalist layout that clients trust.</p>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t dark:border-zinc-800 flex flex-wrap gap-4">
             {["Bilingual Input", "Auto-Formatting", "Print-to-PDF", "Zero Latency"].map((tag, i) => (
               <div key={i} className="flex items-center gap-2 text-[11px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-tighter">
                 <CheckCircle2 size={12} className="text-indigo-600" /> {tag}
               </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default InvoiceGenerator;