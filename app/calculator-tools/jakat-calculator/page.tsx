'use client';

import { useState } from 'react';

const ZakatCalculatorPage = () => {
  const [cash, setCash] = useState(0);
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [business, setBusiness] = useState(0);
  const [loan, setLoan] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [netAssets, setNetAssets] = useState(0);
  const [zakat, setZakat] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const calculateZakat = () => {
    const total = cash + gold + silver + business;
    const net = total - loan;
    const zakatAmount = net > 0 ? net * 0.025 : 0;

    setTotalAssets(total);
    setNetAssets(net);
    setZakat(zakatAmount);
    setShowResult(true);
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(parseFloat(e.target.value) || 0);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10">
      <div className="container mx-auto max-w-2xl p-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-teal-700 dark:text-teal-400 mb-6">যাকাত ক্যালকুলেটর</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="cash" className="block font-semibold mb-2">নগদ টাকা (৳)</label>
            <input type="number" id="cash" placeholder="যেমনঃ ৫০০০০" onChange={handleInputChange(setCash)} className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label htmlFor="gold" className="block font-semibold mb-2">সোনার মূল্য (৳)</label>
            <input type="number" id="gold" placeholder="যেমনঃ ১০০০০০" onChange={handleInputChange(setGold)} className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label htmlFor="silver" className="block font-semibold mb-2">রূপার মূল্য (৳)</label>
            <input type="number" id="silver" placeholder="যেমনঃ ২০০০০" onChange={handleInputChange(setSilver)} className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label htmlFor="business" className="block font-semibold mb-2">ব্যবসার সম্পদ (৳)</label>
            <input type="number" id="business" placeholder="যেমনঃ ৭৫০০০" onChange={handleInputChange(setBusiness)} className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500" />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="loan" className="block font-semibold mb-2">ঋণ / দেনা (৳)</label>
            <input type="number" id="loan" placeholder="যেমনঃ ২০০০০" onChange={handleInputChange(setLoan)} className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500" />
          </div>
        </div>

        <div className="text-center mt-6">
          <button onClick={calculateZakat} className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-transform transform hover:scale-105">
            যাকাত হিসাব করুন
          </button>
        </div>

        {showResult && (
          <div className="mt-8 p-6 bg-teal-50 dark:bg-teal-900/50 rounded-lg shadow-inner text-lg space-y-2">
            <p><strong>মোট সম্পদ:</strong> ৳{totalAssets.toFixed(2)}</p>
            <p><strong>ঋণ বাদে নিট সম্পদ:</strong> ৳{netAssets.toFixed(2)}</p>
            <p className="font-bold text-xl"><strong className="text-green-600 dark:text-green-400">প্রদেয় যাকাত (২.৫%):</strong> <span className="text-green-600 dark:text-green-400">৳{zakat.toFixed(2)}</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZakatCalculatorPage;
