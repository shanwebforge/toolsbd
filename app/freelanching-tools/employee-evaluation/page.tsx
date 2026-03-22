'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';

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
  const [pdfData, setPdfData] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, position, department, communication, punctuality, productivity, remarks } = formData;
    const total = parseInt(communication, 10) + parseInt(punctuality, 10) + parseInt(productivity, 10);
    const average = (total / 3).toFixed(2);

    const data = `
কর্মচারী মূল্যায়ন রিপোর্ট

নাম: ${name}
পদবি: ${position}
বিভাগ: ${department}

যোগাযোগ দক্ষতা: ${communication} / 5
সময়নিষ্ঠা: ${punctuality} / 5
উৎপাদনশীলতা: ${productivity} / 5

মোট স্কোর: ${total} / 15
গড় স্কোর: ${average}

মন্তব্য:
${remarks}
`;

    setPdfData(data);
    alert("✅ ফর্ম সফলভাবে জমা হয়েছে! এখন আপনি PDF ডাউনলোড করতে পারবেন।");
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.setFont("Helvetica");
    doc.setFontSize(12);
    doc.text(pdfData, 15, 20);
    doc.save("Employee_Evaluation.pdf");
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg shadow-xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">কর্মচারী মূল্যায়ন ফর্ম</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="font-semibold block mb-1">নাম</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-teal-500" />
        </div>

        <div>
          <label htmlFor="position" className="font-semibold block mb-1">পদবি</label>
          <input type="text" id="position" value={formData.position} onChange={handleChange} required className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-teal-500" />
        </div>

        <div>
          <label htmlFor="department" className="font-semibold block mb-1">বিভাগ</label>
          <input type="text" id="department" value={formData.department} onChange={handleChange} required className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-teal-500" />
        </div>

        <div>
          <label htmlFor="communication" className="font-semibold block mb-1">যোগাযোগ দক্ষতা</label>
          <select id="communication" value={formData.communication} onChange={handleChange} className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-teal-500">
            <option value="5">5 - চমৎকার</option>
            <option value="4">4 - ভালো</option>
            <option value="3">3 - গড়</option>
            <option value="2">2 - দুর্বল</option>
            <option value="1">1 - খুব দুর্বল</option>
          </select>
        </div>

        <div>
          <label htmlFor="punctuality" className="font-semibold block mb-1">সময়নিষ্ঠা</label>
          <select id="punctuality" value={formData.punctuality} onChange={handleChange} className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-teal-500">
            <option value="5">5 - চমৎকার</option>
            <option value="4">4 - ভালো</option>
            <option value="3">3 - গড়</option>
            <option value="2">2 - দুর্বল</option>
            <option value="1">1 - খুব দুর্বল</option>
          </select>
        </div>

        <div>
          <label htmlFor="productivity" className="font-semibold block mb-1">কাজের উৎপাদনশীলতা</label>
          <select id="productivity" value={formData.productivity} onChange={handleChange} className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-teal-500">
            <option value="5">5 - চমৎকার</option>
            <option value="4">4 - ভালো</option>
            <option value="3">3 - গড়</option>
            <option value="2">2 - দুর্বল</option>
            <option value="1">1 - খুব দুর্বল</option>
          </select>
        </div>

        <div>
          <label htmlFor="remarks" className="font-semibold block mb-1">মন্তব্য</label>
          <textarea id="remarks" value={formData.remarks} onChange={handleChange} placeholder="এই কর্মচারীর সম্পর্কে আরও বিস্তারিত লিখুন..." className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 resize-vertical min-h-[100px] focus:ring-2 focus:ring-teal-500"></textarea>
        </div>

        <button type="submit" className="w-full px-4 py-2 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition-colors">জমা দিন</button>
      </form>

      {pdfData && (
        <button onClick={downloadPdf} className="w-full mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors">📥 PDF ডাউনলোড করুন</button>
      )}
    </div>
  );
};

export default EmployeeEvaluation;
