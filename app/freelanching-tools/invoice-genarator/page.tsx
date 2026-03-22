'use client';

import { useState } from 'react';

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
      alert('দয়া করে সকল তথ্য সঠিকভাবে পূরণ করুন।');
      return;
    }

    const total = itemQuantity * itemPrice;

    setInvoice({
      customerName,
      invoiceNumber,
      itemDescription,
      itemQuantity,
      itemPrice,
      total,
    });
  };

  return (
    <div className="file-container bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-8 rounded-lg shadow-lg">
      <div className="file-header mb-8">
        <div className="file-title text-center mb-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">ইনভয়েস জেনারেটর</h2>
          <div className="title-underline bg-blue-500 h-1 w-24 mx-auto mt-2"></div>
        </div>
        <div className="file-content-text text-center text-gray-600 dark:text-gray-400">
          <p>ইনভয়েস জেনারেটর - পেশাদার মানের ইনভয়েস তৈরির টুল</p>
          <p>কাস্টমাইজেবল টেমপ্লেট ব্যবহার করে ইনভয়েস তৈরি করুন</p>
          <p>স্বয়ংক্রিয়ভাবে গণনা, ট্যাক্স এবং ডিসকাউন্ট যোগ করে</p>
          <p>কোম্পানি লোগো, ঠিকানা এবং ব্যাংক তথ্য সংযোজন</p>
          <p>PDF, এক্সেল বা ইমেজ ফরম্যাটে ইনভয়েস ডাউনলোড করুন</p>
          <p>ছোট ব্যবসা ও ফ্রিল্যান্সারদের জন্য আদর্শ সমাধান</p>
        </div>
      </div>

      <div className="file-footer">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">ইনভয়েস জেনারেটর</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="customerName" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">গ্রাহকের নাম:</label>
            <input
              type="text"
              id="customerName"
              placeholder="গ্রাহকের নাম লিখুন"
              value={customerName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomerName(e.target.value)}
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label htmlFor="invoiceNumber" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">ইনভয়েস নম্বর:</label>
            <input
              type="text"
              id="invoiceNumber"
              placeholder="ইনভয়েস নম্বর দিন"
              value={invoiceNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInvoiceNumber(e.target.value)}
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label htmlFor="itemDescription" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">আইটেম বিবরণ:</label>
            <input
              type="text"
              id="itemDescription"
              placeholder="আইটেমের নাম/বিবরণ"
              value={itemDescription}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItemDescription(e.target.value)}
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label htmlFor="itemQuantity" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">পরিমাণ:</label>
            <input
              type="number"
              id="itemQuantity"
              placeholder="পরিমাণ"
              min="1"
              value={itemQuantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItemQuantity(parseInt(e.target.value))}
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label htmlFor="itemPrice" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">একক মূল্য (টাকা):</label>
            <input
              type="number"
              id="itemPrice"
              placeholder="একক মূল্য"
              min="0"
              step="0.01"
              value={itemPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItemPrice(parseFloat(e.target.value))}
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        <button
          onClick={generateInvoice}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-lg"
        >
          ইনভয়েস তৈরি করুন
        </button>

        {invoice && (
          <div id="invoice" className="invoice mt-10 p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">ইনভয়েস</h2>
            <p className="mb-2"><strong>গ্রাহক:</strong> {invoice.customerName}</p>
            <p className="mb-4"><strong>ইনভয়েস নম্বর:</strong> {invoice.invoiceNumber}</p>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600">বিবরণ</th>
                    <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600">পরিমাণ</th>
                    <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600">একক মূল্য (টাকা)</th>
                    <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600">মোট (টাকা)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-gray-300 dark:border-gray-600">{invoice.itemDescription}</td>
                    <td className="p-3 border border-gray-300 dark:border-gray-600">{invoice.itemQuantity}</td>
                    <td className="p-3 border border-gray-300 dark:border-gray-600">{invoice.itemPrice.toFixed(2)}</td>
                    <td className="p-3 border border-gray-300 dark:border-gray-600">{invoice.total.toFixed(2)}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="total-row font-bold bg-gray-100 dark:bg-gray-700">
                    <td colSpan="3" className="text-right p-3 border border-gray-300 dark:border-gray-600">মোট</td>
                    <td className="p-3 border border-gray-300 dark:border-gray-600">{invoice.total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <button
              onClick={() => window.print()}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-lg"
            >
              প্রিন্ট করুন
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceGenerator;
