
"use client";
import { useState } from 'react';

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

const ExpenseTrackerPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('uncategorized');

  const addExpense = () => {
    if (!description.trim() || !amount.trim()) {
      alert('অনুগ্রহ করে বিবরণ এবং খরচের পরিমাণ লিখুন');
      return;
    }
    const newExpense: Expense = { id: Date.now(), description, amount: parseFloat(amount), category };
    setExpenses([...expenses, newExpense]);
    setDescription('');
    setAmount('');
  };

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <>
      <main className="file-section">
        <div className="file-container">
          <div className="file-header">
            <div className="file-title">
              <h2>দৈনিক খরচের হিসাব</h2>
              <div className="title-underline"></div>
            </div>
            <div className="file-content-text">
              <p>দৈনিক খরচের হিসাব - প্রতিদিনকার খরচের হিসাব রাখার টুল</p>
              <p>প্রতিদিনের খরচের বিবরণ ও পরিমাণ সংরক্ষণ করুন</p>
              <p>খরচের ধরণ অনুযায়ী ক্যাটাগরি তৈরি করুন</p>
              <p>মাসিক বা বাৎসরিক খরচের রিপোর্ট দেখুন</p>
              <p>বাজেট নিয়ন্ত্রণে সহায়তা করে</p>
              <p>ব্যবসা ও ব্যক্তিগত উভয় খরচের জন্য উপযোগী</p>
            </div>
          </div>
          <div className="file-footer">
            <h3>নতুন খরচ যোগ করুন</h3>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="খরচের বিবরণ"
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="খরচের পরিমাণ"
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="uncategorized">ক্যাটাগরি</option>
              <option value="food">খাবার</option>
              <option value="transport">যাতায়াত</option>
              <option value="utilities">ইউটিলিটি বিল</option>
              <option value="others">অন্যান্য</option>
            </select>
            <button onClick={addExpense}>খরচ যোগ করুন</button>

            <div className="expense-summary">
              <h3>মোট খরচ: {totalExpense.toFixed(2)} টাকা</h3>
            </div>

            <ul className="expense-list">
              {expenses.map(e => (
                <li key={e.id}>
                  <span>{e.description} ({e.category})</span>
                  <span>{e.amount.toFixed(2)} টাকা</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

export default ExpenseTrackerPage;
