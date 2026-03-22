
"use client";
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  stock: number;
}

const MaalStockPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState('');
  const [stock, setStock] = useState('');

  const addProduct = () => {
    if (!productName.trim() || !stock.trim()) {
      alert('অনুগ্রহ করে পণ্যের নাম এবং স্টক পরিমাণ লিখুন');
      return;
    }
    setProducts([...products, { id: Date.now(), name: productName, stock: parseInt(stock) }]);
    setProductName('');
    setStock('');
  };

  const updateStock = (id: number, newStock: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, stock: newStock } : p));
  };

  return (
    <>
      <main className="file-section">
        <div className="file-container">
          <div className="file-header">
            <div className="file-title">
              <h2>মালের স্টক</h2>
              <div className="title-underline"></div>
            </div>
            <div className="file-content-text">
              <p>মালের স্টক - দোকানের পণ্যের স্টক ব্যবস্থাপনার টুল</p>
              <p>পণ্যের নাম এবং স্টকের পরিমাণ যোগ করুন</p>
              <p>স্টক আপডেট করুন</p>
              <p>কম স্টক वाले পণ্যের তালিকা দেখুন</p>
              <p>স্টক রিপোর্ট তৈরি করুন</p>
              <p>সহজে ব্যবহারযোগ্য ইন্টারফেস</p>
            </div>
          </div>
          <div className="file-footer">
            <h3>নতুন পণ্য যোগ করুন</h3>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="পণ্যের নাম"
            />
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="স্টক পরিমাণ"
            />
            <button onClick={addProduct}>পণ্য যোগ করুন</button>

            <ul className="product-list">
              {products.map(p => (
                <li key={p.id}>
                  <span>{p.name}</span>
                  <input
                    type="number"
                    value={p.stock}
                    onChange={(e) => updateStock(p.id, parseInt(e.target.value) || 0)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

export default MaalStockPage;
