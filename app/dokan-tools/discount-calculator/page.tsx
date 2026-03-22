
"use client";
import { useState, useEffect } from 'react';

const DiscountCalculatorPage = () => {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [finalPrice, setFinalPrice] = useState<string | null>(null);
  const [savedAmount, setSavedAmount] = useState<string | null>(null);

  useEffect(() => {
    const price = parseFloat(originalPrice);
    const disc = parseFloat(discount);

    if (price > 0 && disc >= 0) {
      if (disc <= 100) { // Percentage discount
        const saved = (price * disc) / 100;
        setSavedAmount(saved.toFixed(2));
        setFinalPrice((price - saved).toFixed(2));
      } else { // Fixed amount discount
        const saved = disc;
        setSavedAmount(saved.toFixed(2));
        setFinalPrice((price - saved).toFixed(2));
      }
    } else {
      setFinalPrice(null);
      setSavedAmount(null);
    }
  }, [originalPrice, discount]);

  return (
    <>
      <main className="file-section">
        <div className="file-container">
          <div className="file-header">
            <div className="file-title">
              <h2>ডিসকাউন্ট ক্যালকুলেটর</h2>
              <div className="title-underline"></div>
            </div>
            <div className="file-content-text">
              <p>ডিসকাউন্ট ক্যালকুলেটর - পণ্যের উপর ডিসকাউন্ট এবং সঞ্চয়ের পরিমাণ হিসাব করার টুল</p>
              <p>পণ্যের আসল মূল্য এবং ডিসকাউন্টের হার ইনপুট দিন</p>
              <p>স্বয়ংক্রিয়ভাবে ডিসকাউন্টের পরের মূল্য দেখুন</p>
              <p>কত টাকা সাশ্রয় হচ্ছে তা সহজেই জানুন</p>
              <p>শতাংশ বা নির্দিষ্ট পরিমাণ উভয় প্রকার ডিসকাউন্ট হিসাব করুন</p>
              <p>বিক্রয়কর্মী এবং ক্রেতা উভয়ের জন্য প্রয়োজনীয় টুল</p>
            </div>
          </div>
          <div className="file-footer">
            <h3>ডিসকাউন্ট হিসাব করুন</h3>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="আসল মূল্য"
            />
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="ডিসকাউন্ট (%, বা পরিমাণ)"
            />
            {finalPrice !== null && (
              <div className="discount-result">
                <p>শেষ মূল্য: {finalPrice} টাকা</p>
                <p>আপনি বাঁচিয়েছেন: {savedAmount} টাকা</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default DiscountCalculatorPage;
