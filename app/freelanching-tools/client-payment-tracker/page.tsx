'use client';

import { useState } from 'react';

interface Payment {
  name: string;
  project: string;
  total: number;
  paid: number;
  due: number;
}

interface Summary {
  totalClient: number;
  totalPaid: number;
  totalDue: number;
}

const ClientPaymentTracker = () => {
  const [name, setName] = useState('');
  const [project, setProject] = useState('');
  const [total, setTotal] = useState('');
  const [paid, setPaid] = useState('');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [summary, setSummary] = useState<Summary>({ totalClient: 0, totalPaid: 0, totalDue: 0 });

  const addPayment = () => {
    const totalAmount = parseFloat(total);
    const paidAmount = parseFloat(paid);

    if (!name || !project || isNaN(totalAmount) || isNaN(paidAmount) || totalAmount < paidAmount) {
      alert('অনুগ্রহ করে সব তথ্য সঠিকভাবে পূরণ করুন।');
      return;
    }

    const due = totalAmount - paidAmount;
    const newPayment: Payment = { name, project, total: totalAmount, paid: paidAmount, due };

    setPayments([...payments, newPayment]);

    setSummary({
      totalClient: summary.totalClient + 1,
      totalPaid: summary.totalPaid + paidAmount,
      totalDue: summary.totalDue + due,
    });

    setName('');
    setProject('');
    setTotal('');
    setPaid('');
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg shadow-md">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">💳 ক্লায়েন্ট পেমেন্ট ট্র্যাকার</h2>
        <div className="w-32 h-1 bg-indigo-500 mx-auto"></div>
        <div className="text-center mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400">
          <p>ক্লায়েন্ট পেমেন্ট ব্যবস্থাপনা ও ট্র্যাকিং টুল</p>
          <p>ক্লায়েন্টভিত্তিক পেমেন্ট ইনভয়েস তৈরি ও ট্র্যাক করুন</p>
          <p>পেমেন্ট স্ট্যাটাস (পেন্ডিং, পেইড, ওভারডিউ) মনিটর করুন</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="font-semibold block mb-1 text-left">ক্লায়েন্টের নাম:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            placeholder="যেমন: মোঃ সুমন"
            className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="project" className="font-semibold block mb-1 text-left">প্রকল্প / সেবা:</label>
          <input
            type="text"
            id="project"
            value={project}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProject(e.target.value)}
            placeholder="যেমন: ওয়েব ডিজাইন"
            className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="total" className="font-semibold block mb-1 text-left">মোট বিল (৳):</label>
          <input
            type="number"
            id="total"
            value={total}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTotal(e.target.value)}
            placeholder="যেমন: 10000"
            className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="paid" className="font-semibold block mb-1 text-left">প্রাপ্ত টাকা (৳):</label>
          <input
            type="number"
            id="paid"
            value={paid}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaid(e.target.value)}
            placeholder="যেমন: 6000"
            className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={addPayment}
          className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
        >
          + যোগ করুন
        </button>
      </div>

      <div className="mt-8 p-4 bg-green-100 dark:bg-teal-900 border-l-4 border-green-500 dark:border-teal-500 rounded-md font-semibold text-green-800 dark:text-green-200">
        মোট ক্লায়েন্ট: {summary.totalClient} | মোট প্রাপ্ত: ৳{summary.totalPaid.toFixed(2)} | বাকি: ৳{summary.totalDue.toFixed(2)}
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-200 dark:bg-slate-700">
              <th className="p-3 border border-slate-300 dark:border-slate-600 text-left">নাম</th>
              <th className="p-3 border border-slate-300 dark:border-slate-600 text-left">প্রকল্প</th>
              <th className="p-3 border border-slate-300 dark:border-slate-600 text-left">মোট বিল</th>
              <th className="p-3 border border-slate-300 dark:border-slate-600 text-left">প্রাপ্ত</th>
              <th className="p-3 border border-slate-300 dark:border-slate-600 text-left">বাকি</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className="odd:bg-slate-50 dark:odd:bg-slate-800">
                <td className="p-3 border border-slate-300 dark:border-slate-600">{payment.name}</td>
                <td className="p-3 border border-slate-300 dark:border-slate-600">{payment.project}</td>
                <td className="p-3 border border-slate-300 dark:border-slate-600">৳{payment.total.toFixed(2)}</td>
                <td className="p-3 border border-slate-300 dark:border-slate-600">৳{payment.paid.toFixed(2)}</td>
                <td className="p-3 border border-slate-300 dark:border-slate-600">৳{payment.due.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientPaymentTracker;
