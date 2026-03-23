'use client';

import { useState } from 'react';
import jsPDF from 'jspdf'; // ছোট হাতের jspdf হবে
import { 
  Users, UserCheck, Star, Download, Send, 
  ShieldCheck, Zap, FileBarChart, CheckCircle2, X
} from 'lucide-react';

const EmployeeEvaluation = () => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    communication: '5',
    punctuality: '5',
    productivity: '5',
    remarks: '',
  });
  
  const [pdfData, setPdfData] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { communication, punctuality, productivity } = formData;
    const total = parseInt(communication, 10) + parseInt(punctuality, 10) + parseInt(productivity, 10);
    const average = (total / 3).toFixed(1);

    setPdfData({ ...formData, total, average });
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    const content = `EMPLOYEE EVALUATION REPORT\nName: ${pdfData.name}\nPosition: ${pdfData.position}\nScore: ${pdfData.average}/5`;
    doc.text(content, 15, 20);
    doc.save(`${pdfData.name}_Evaluation.pdf`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 font-sans text-slate-900 dark:text-slate-100 selection:bg-purple-100 relative">
      
      {/* --- FIXED CENTERED ALERT --- */}
      {showSuccess && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-xs md:max-w-sm animate-in fade-in zoom-in slide-in-from-top-10 duration-300 px-4">
          <div className="bg-emerald-600/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-xl flex items-center justify-between border border-emerald-400/50">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-white" />
              <span className="text-[11px] font-black uppercase tracking-widest">Report Ready!</span>
            </div>
            <button onClick={() => setShowSuccess(false)} className="p-1 opacity-70 hover:opacity-100">
              <X size={16}/>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm border-b-4 border-b-purple-600/20">
            <div className="flex items-center gap-2 mb-6 text-purple-600">
                <Users size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Evaluation Lab</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[9px] font-black uppercase text-purple-600 ml-1 mb-1 block">Full Name</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} required placeholder="Rakib Hasan" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none focus:border-purple-500 transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-black uppercase text-purple-600 ml-1 mb-1 block">Role</label>
                  <input type="text" id="position" value={formData.position} onChange={handleChange} required placeholder="UI Dev" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase text-purple-600 ml-1 mb-1 block">Team</label>
                  <input type="text" id="department" value={formData.department} onChange={handleChange} required placeholder="Frontend" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none focus:border-purple-500" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {['communication', 'punctuality', 'productivity'].map((field) => (
                  <div key={field}>
                    <label className="text-[8px] font-black uppercase text-slate-400 ml-1 mb-1 block truncate">{field}</label>
                    <select id={field} value={(formData as any)[field]} onChange={handleChange} className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none focus:border-purple-500">
                      {[5,4,3,2,1].map(v => <option key={v} value={v}>{v} ★</option>)}
                    </select>
                  </div>
                ))}
              </div>

              <div>
                <label className="text-[9px] font-black uppercase text-purple-600 ml-1 mb-1 block">Performance Notes</label>
                <textarea id="remarks" value={formData.remarks} onChange={handleChange} placeholder="Summary..." className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none focus:border-purple-500 min-h-[90px] resize-none"></textarea>
              </div>

              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg shadow-indigo-500/20">
                <Send size={14} /> Process Analysis
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-7">
          {pdfData ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl h-full flex flex-col overflow-hidden animate-in zoom-in-95 duration-500">
              <div className="p-10 flex-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -mr-16 -mt-16 border border-purple-500/10"></div>
                
                <div className="flex justify-between items-start border-b-2 border-slate-100 dark:border-slate-800 pb-8 mb-8">
                    <div>
                        <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-800 dark:text-white">Performance Scorecard</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ref ID: EVAL-{Math.floor(Math.random() * 9000) + 1000}</p>
                    </div>
                    <div className="bg-purple-600 text-white px-4 py-2 rounded-xl text-center shadow-lg shadow-purple-500/30">
                        <div className="text-xl font-black leading-none">{pdfData.average}</div>
                        <div className="text-[7px] font-bold uppercase tracking-widest opacity-80">Score</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-10 mb-10">
                    <div className="space-y-6">
                        <div>
                            <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-1">Subject</p>
                            <p className="text-md font-bold text-slate-700 dark:text-slate-100">{pdfData.name}</p>
                            <p className="text-[11px] text-slate-400 font-medium">{pdfData.position} / {pdfData.department}</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        {['Communication', 'Punctuality', 'Productivity'].map((label, idx) => (
                            <div key={label} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg">
                                <span className="text-[9px] font-bold uppercase text-slate-500">{label}</span>
                                <div className="flex gap-0.5 text-amber-500">
                                    {[...Array(Number(Object.values(pdfData)[idx+3]))].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-indigo-50/50 dark:bg-indigo-900/10 border-l-4 border-indigo-600 p-4 rounded-r-xl">
                    <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-2">Internal Assessment</p>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 italic leading-relaxed">"{pdfData.remarks || 'Standard performance across evaluated metrics.'}"</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800">
                <button onClick={downloadPdf} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all hover:bg-slate-800 active:scale-95 shadow-xl">
                  <Download size={16} strokeWidth={3} /> Download PDF Document
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-300 bg-slate-50/20">
              <FileBarChart size={50} className="mb-4 opacity-10" />
              <p className="text-[11px] font-black uppercase tracking-[0.4em] opacity-30">Waiting for Data Submission</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
            { icon: <ShieldCheck size={20}/>, t: "Encrypted", d: "Local processing." },
            { icon: <Zap size={20}/>, t: "Dynamic", d: "Live calculations." },
            { icon: <Download size={20}/>, t: "Vector", d: "HD PDF Export." }
        ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-lg flex items-center justify-center">{item.icon}</div>
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.t}</h4>
                    <p className="text-[11px] text-slate-400 font-medium">{item.d}</p>
                </div>
            </div>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800"></div>
    </div>
  );
};

export default EmployeeEvaluation;