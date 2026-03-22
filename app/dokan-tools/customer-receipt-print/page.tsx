
"use client";
import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

interface Item {
  name: string;
  quantity: number;
  price: number;
}

const CustomerReceiptPrintPage = () => {
  const [items, setItems] = useState<Item[]>([{ name: '', quantity: 1, price: 0 }]);
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  } as any);

  const addItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }]);
  };

  const updateItem = (index: number, field: keyof Item, value: string | number) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = value;
    setItems(newItems);
  };

  const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <>
      <main className="file-section">
        <div className="file-container">
          <div className="file-header">
            <div className="file-title">
              <h2>কাস্টমার রিসিট প্রিন্ট</h2>
              <div className="title-underline"></div>
            </div>
            <div className="file-content-text">
              <p>কাস্টমার রিসিট প্রিন্ট - কাস্টমারদের জন্য বিক্রয় রিসিট তৈরি ও প্রিন্ট করার টুল</p>
              <p>সহজে পণ্যের তালিকা, পরিমাণ ও মূল্য যোগ করুন</p>
              <p>স্বয়ংক্রিয়ভাবে মোট মূল্য এবং ভ্যাট গণনা করুন</p>
              <p>প্রিন্ট-ফ্রেন্ডলি ডিজাইনে রিসিট তৈরি করুন</p>
              <p>ব্যবসার ব্র্যান্ডিং অনুযায়ী রিসিট কাস্টমাইজ করুন</p>
              <p>ডিজিটাল বা প্রিন্টেড উভয় ফরম্যাটে রিসিট প্রদান করুন</p>
            </div>
          </div>
          <div className="file-footer">
            <div className="receipt-form">
              <h3>রিসিটের বিবরণ</h3>
              {items.map((item, index) => (
                <div key={index} className="receipt-item-input">
                  <input
                    type="text"
                    placeholder="পণ্যের নাম"
                    value={item.name}
                    onChange={(e) => updateItem(index, 'name', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="পরিমাণ"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                  />
                  <input
                    type="number"
                    placeholder="মূল্য"
                    value={item.price}
                    onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                  />
                </div>
              ))}
              <button onClick={addItem}>আরও পণ্য যোগ করুন</button>
            </div>

            <div ref={receiptRef} className="receipt-preview">
              <h3>রিসিট প্রিভিউ</h3>
              <table>
                <thead>
                  <tr>
                    <th>পণ্যের নাম</th>
                    <th>পরিমাণ</th>
                    <th>মূল্য</th>
                    <th>মোট</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price.toFixed(2)}</td>
                      <td>{(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3}>সর্বমোট</td>
                    <td>{total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <button onClick={handlePrint}>রিসিট প্রিন্ট করুন</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default CustomerReceiptPrintPage;
