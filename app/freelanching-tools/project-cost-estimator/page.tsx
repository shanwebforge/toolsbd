'use client';

import { useState } from 'react';

// আইটেমের জন্য টাইপ ডিফাইন করা
interface ProjectItem {
  name: string;
  unit: number;
  unitPrice: number;
  total: number;
}

const ProjectCostEstimator = () => {
  const [itemName, setItemName] = useState<string>('');
  const [unit, setUnit] = useState<string>('');
  const [unitPrice, setUnitPrice] = useState<string>('');
  
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [grandTotal, setGrandTotal] = useState<number>(0);

  const addItem = () => {
    const unitValue = parseFloat(unit);
    const unitPriceValue = parseFloat(unitPrice);

    if (!itemName || isNaN(unitValue) || unitValue <= 0 || isNaN(unitPriceValue) || unitPriceValue < 0) {
      alert('সব তথ্য সঠিকভাবে পূরণ করুন!');
      return;
    }

    const total = unitValue * unitPriceValue;
    const newItem: ProjectItem = { 
      name: itemName, 
      unit: unitValue, 
      unitPrice: unitPriceValue, 
      total 
    };

    setItems([...items, newItem]);
    setGrandTotal(grandTotal + total);

    setItemName('');
    setUnit('');
    setUnitPrice('');
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg shadow-lg lg:ml-64 transition-all">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">📊 Project Cost Estimator</h2>
        <div className="w-32 h-1 bg-cyan-500 mx-auto"></div>
        <div className="text-center mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400">
          <p>Professional project cost estimation and budgeting tool</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="আইটেমের নাম (যেমন: ডিজাইন)"
          className="flex-grow p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="number"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          placeholder="পরিমাণ"
          className="w-full sm:w-24 p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="number"
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
          placeholder="ইউনিট মূল্য (৳)"
          className="w-full sm:w-32 p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-cyan-500"
        />
        <button
          onClick={addItem}
          className="px-6 py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition-colors shrink-0"
        >
          + যোগ করুন
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="p-3 border-b border-slate-200 dark:border-slate-700 text-left">আইটেম</th>
              <th className="p-3 border-b border-slate-200 dark:border-slate-700 text-left">পরিমাণ</th>
              <th className="p-3 border-b border-slate-200 dark:border-slate-700 text-left">ইউনিট মূল্য</th>
              <th className="p-3 border-b border-slate-200 dark:border-slate-700 text-left">মোট (৳)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.unit}</td>
                <td className="p-3">৳{item.unitPrice.toFixed(2)}</td>
                <td className="p-3 font-semibold text-cyan-600">৳{item.total.toFixed(2)}</td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-400 italic font-medium">কোনো আইটেম যোগ করা হয়নি</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-5 bg-cyan-50 dark:bg-cyan-950/30 border-2 border-cyan-500 rounded-2xl flex justify-between items-center">
        <span className="text-lg font-bold">মোট আনুমানিক খরচ:</span>
        <span className="text-2xl font-black text-cyan-600 dark:text-cyan-400">
          ৳{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
};

export default ProjectCostEstimator;