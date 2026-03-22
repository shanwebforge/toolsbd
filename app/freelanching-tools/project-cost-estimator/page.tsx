'use client';

import { useState } from 'react';

const ProjectCostEstimator = () => {
  const [itemName, setItemName] = useState('');
  const [unit, setUnit] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [items, setItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  const addItem = () => {
    const unitValue = parseFloat(unit);
    const unitPriceValue = parseFloat(unitPrice);

    if (!itemName || isNaN(unitValue) || unitValue <= 0 || isNaN(unitPriceValue) || unitPriceValue < 0) {
      alert('সব তথ্য সঠিকভাবে পূরণ করুন!');
      return;
    }

    const total = unitValue * unitPriceValue;
    const newItem = { name: itemName, unit: unitValue, unitPrice: unitPriceValue, total };

    setItems([...items, newItem]);
    setGrandTotal(grandTotal + total);

    setItemName('');
    setUnit('');
    setUnitPrice('');
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">📊 Project Cost Estimator</h2>
        <div className="w-32 h-1 bg-cyan-500 mx-auto"></div>
        <div className="text-center mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400">
          <p>Professional project cost estimation and budgeting tool</p>
          <p>Accurately estimate costs for web development, design, and software projects</p>
          <p>Break down projects into tasks with time and resource allocations</p>
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
          min="1"
          className="w-full sm:w-24 p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="number"
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
          placeholder="ইউনিট মূল্য (৳)"
          min="0"
          className="w-full sm:w-32 p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-cyan-500"
        />
        <button
          onClick={addItem}
          className="px-6 py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition-colors"
        >
          + যোগ করুন
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-200 dark:bg-slate-700">
              <th className="p-3 border border-slate-300 dark:border-slate-600 text-left">আইটেম</th>
              <th className="p-3 border border-slate-300 dark:border-slate-600 text-left">পরিমাণ</th>
              <th className="p-3 border border-slate-300 dark:border-slate-600 text-left">ইউনিট মূল্য</th>
              <th className="p-3 border border-slate-300 dark:border-slate-600 text-left">মোট (৳)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="odd:bg-slate-50 dark:odd:bg-slate-800">
                <td className="p-3 border border-slate-300 dark:border-slate-600">{item.name}</td>
                <td className="p-3 border border-slate-300 dark:border-slate-600">{item.unit}</td>
                <td className="p-3 border border-slate-300 dark:border-slate-600">৳{item.unitPrice.toFixed(2)}</td>
                <td className="p-3 border border-slate-300 dark:border-slate-600">৳{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-green-100 dark:bg-emerald-900 border-l-4 border-green-500 dark:border-emerald-500 rounded-md font-bold text-lg text-green-800 dark:text-green-200">
        মোট খরচ: ৳{grandTotal.toFixed(2)}
      </div>
    </div>
  );
};

export default ProjectCostEstimator;
