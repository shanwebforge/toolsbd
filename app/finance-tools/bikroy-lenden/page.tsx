
"use client";
import { useState } from 'react';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: string;
}

const BikroyLendenPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('bikroy');

  const addTransaction = () => {
    if (!description.trim() || !amount.trim()) {
      alert('অনুগ্রহ করে বিবরণ এবং টাকার পরিমাণ লিখুন');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type
    };

    setTransactions([...transactions, newTransaction]);
    setDescription('');
    setAmount('');
  };

  const totalBikroy = transactions.filter(t => t.type === 'bikroy').reduce((acc, curr) => acc + curr.amount, 0);
  const totalLenden = transactions.filter(t => t.type === 'lenden').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <>
      <main className="file-section">
        <div className="file-container">
          <div className="file-header">
            <div className="file-title">
              <h2>দৈনিক বিক্রয় ও লেনদেন</h2>
              <div className="title-underline"></div>
            </div>
            <div className="file-content-text">
              <p>দৈনিক বিক্রয় ও লেনদেন - প্রতিদিনকার বিক্রয় এবং লেনদেনের হিসাব রাখার টুল</p>
              <p>প্রতিদিনের আয়-ব্যয়ের হিসাব সহজে সংরক্ষণ করুন</p>
              <p>নগদ, কার্ড বা অন্যান্য মাধ্যমে হওয়া লেনদেন ট্র্যাক করুন</p>
              <p>দৈনিক, সাপ্তাহিক বা মাসিক রিপোর্ট তৈরি করুন</p>
              <p>ব্যবসার আর্থিক অবস্থা সম্পর্কে অবগত থাকুন</p>
              <p>সহজ এবং ব্যবহারবান্ধব ইন্টারফেস</p>
            </div>
          </div>
          <div className="file-footer">
            <h3>নতুন লেনদেন যোগ করুন</h3>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="বিবরণ" />
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="টাকার পরিমাণ" />
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="bikroy">বিক্রয়</option>
              <option value="lenden">লেনদেন</option>
            </select>
            <button onClick={addTransaction}>যোগ করুন</button>

            <div className="transaction-summary">
              <h3>আজকের হিসাব</h3>
              <p>মোট বিক্রয়: {totalBikroy.toFixed(2)} টাকা</p>
              <p>মোট লেনদেন: {totalLenden.toFixed(2)} টাকা</p>
            </div>

            <ul className="transaction-list">
              {transactions.map(t => (
                <li key={t.id} className={`transaction-item ${t.type}`}>
                  <span>{t.description}</span>
                  <span>{t.amount.toFixed(2)} টাকা</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

export default BikroyLendenPage;
