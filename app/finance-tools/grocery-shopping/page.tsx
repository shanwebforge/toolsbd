
"use client";
import { useState } from 'react';

interface Item {
  id: number;
  name: string;
  quantity: number;
  purchased: boolean;
}

const GroceryShoppingPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const addItem = () => {
    if (!itemName.trim()) {
      alert('অনুগ্রহ করে জিনিসের নাম লিখুন');
      return;
    }
    setItems([...items, { id: Date.now(), name: itemName, quantity, purchased: false }]);
    setItemName('');
    setQuantity(1);
  };

  const togglePurchased = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, purchased: !item.purchased } : item));
  };

  return (
    <>
      <main className="file-section">
        <div className="file-container">
          <div className="file-header">
            <div className="file-title">
              <h2>গ্রোসারি শপিং লিস্ট</h2>
              <div className="title-underline"></div>
            </div>
            <div className="file-content-text">
              <p>গ্রোসারি শপিং লিস্ট - দোকানের জন্য প্রয়োজনীয় জিনিসপত্রের তালিকা তৈরির টুল</p>
              <p>সহজে নতুন আইটেম যোগ করুন</p>
              <p>পরিমাণ উল্লেখ করার সুবিধা</p>
              <p>কেনা হয়ে গেলে আইটেমটি মার্ক করুন</p>
              <p>শপিং লিস্ট প্রিন্ট বা শেয়ার করার সুবিধা</p>
              <p>সময় এবং অর্থ সাশ্রয় করুন</p>
            </div>
          </div>
          <div className="file-footer">
            <h3>নতুন আইটেম যোগ করুন</h3>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="জিনিসের নাম"
            />
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              placeholder="পরিমাণ"
              min="1"
            />
            <button onClick={addItem}>লিস্টে যোগ করুন</button>

            <ul className="grocery-list">
              {items.map(item => (
                <li key={item.id} className={item.purchased ? 'purchased' : ''} onClick={() => togglePurchased(item.id)}>
                  <span>{item.name} (পরিমাণ: {item.quantity})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

export default GroceryShoppingPage;
