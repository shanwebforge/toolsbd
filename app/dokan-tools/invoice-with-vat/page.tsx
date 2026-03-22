
"use client";
import { useState } from 'react';

interface Item {
  description: string;
  quantity: number;
  price: number;
}

const InvoiceWithVatPage = () => {
  const [items, setItems] = useState<Item[]>([{ description: '', quantity: 1, price: 0 }]);
  const [vatRate, setVatRate] = useState(0);

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }]);
  };

  const updateItem = (index: number, field: keyof Item, value: string | number) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = value;
    setItems(newItems);
  };

  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const vatAmount = (subtotal * vatRate) / 100;
  const total = subtotal + vatAmount;

  return (
    <>
      <main className="file-section">
        <div className="file-container">
          <div className="file-header">
            <div className="file-title">
              <h2>ইনভয়েস উইথ ভ্যাট</h2>
              <div className="title-underline"></div>
            </div>
            <div className="file-content-text">
              <p>ইনভয়েস উইথ ভ্যাট - ভ্যাটসহ ইনভয়েস বা চালান তৈরির টুল</p>
              <p>পণ্যের বিবরণ, পরিমাণ ও একক মূল্য যোগ করুন</p>
              <p>ভ্যাটের হার উল্লেখ করে চালান তৈরি করুন</p>
              <p>স্বয়ংক্রিয়ভাবে মোট মূল্য, ভ্যাট ও সর্বমোট হিসাব করুন</p>
              <p>প্রিন্ট বা শেয়ার করার জন্য উপযুক্ত ফরম্যাট</p>
              <p>ব্যবসার পেশাদারিত্ব বাড়াতে সাহায্য করে</p>
            </div>
          </div>
          <div className="file-footer">
            <h3>ইনভয়েসের বিবরণ</h3>
            {items.map((item, index) => (
              <div key={index} className="invoice-item-input">
                <input
                  type="text"
                  placeholder="পণ্যের বিবরণ"
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="পরিমাণ"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                />
                <input
                  type="number"
                  placeholder="একক মূল্য"
                  value={item.price}
                  onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                />
              </div>
            ))}
            <button onClick={addItem}>আরও আইটেম যোগ করুন</button>

            <div className="vat-input">
              <label>ভ্যাটের হার (%): </label>
              <input
                type="number"
                value={vatRate}
                onChange={(e) => setVatRate(parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="invoice-summary">
              <p>মোট: {subtotal.toFixed(2)} টাকা</p>
              <p>ভ্যাট ({vatRate}%): {vatAmount.toFixed(2)} টাকা</p>
              <h3>সর্বমোট: {total.toFixed(2)} টাকা</h3>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default InvoiceWithVatPage;
