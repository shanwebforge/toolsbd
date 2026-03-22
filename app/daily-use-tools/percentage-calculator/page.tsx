
"use client";

import { useState } from 'react';

const PercentageCalculatorPage = () => {
  const [originalValue, setOriginalValue] = useState('');
  const [percentage, setPercentage] = useState('');
  const [result, setResult] = useState('ফলাফল এখানে দেখানো হবে');

  const calculatePercentage = () => {
    const original = parseFloat(originalValue);
    const percent = parseFloat(percentage);

    if (isNaN(original) || isNaN(percent)) {
      setResult('দয়া করে সঠিক সংখ্যা প্রদান করুন।');
      return;
    }
    if (original < 0 || percent < 0) {
      setResult('সংখ্যাগুলো শূন্য বা তার বেশি হতে হবে।');
      return;
    }
    if (percent > 100) {
      setResult('শতাংশ ১০০ এর বেশি হতে পারে না।');
      return;
    }

    const value = (original * percent) / 100;

    setResult(`<strong>${percent}%</strong> এর মান: <strong>${value.toFixed(2)}</strong>`);
  };

  return (
    <div className="file-section">
      <div className="file-container">
        <div className="file-header">
          <div className="file-title">
            <h2>📊 শতাংশ ক্যালকুলেটর</h2>
            <div className="title-underline"></div>
          </div>
          <div className="file-content-text">
            <p>সংখ্যার শতাংশ গণনা করুন (যেমন: ২০০ এর ১৫% = ৩০)</p>
            <p>শতাংশ বৃদ্ধি বা হ্রাস গণনা করুন (যেমন: ৫০ থেকে ৭৫ = ৫০% বৃদ্ধি)</p>
            <p>মূল সংখ্যা খুঁজুন যখন শতাংশ ও ফলাফল জানা আছে</p>
            <p>দুই সংখ্যার মধ্যে শতাংশ পার্থক্য নির্ণয় করুন</p>
            <p>ছাড় বা ডিসকাউন্ট গণনা করুন</p>
            <p>মার্কআপ এবং মার্জিন পার্সেন্টেজ গণনা করুন</p>
          </div>
        </div>

        <div className="percent-container">
          <h3 style={{ textAlign: 'center' }}>শতাংশ ক্যালকুলেটর</h3>

          <label htmlFor="originalValue">মূল সংখ্যা দিন:</label>
          <input type="number" id="originalValue" placeholder="যেমন: ২০০" min="0" value={originalValue} onChange={(e) => setOriginalValue(e.target.value)} />

          <label htmlFor="percentage">শতাংশ (%) দিন:</label>
          <input type="number" id="percentage" placeholder="যেমন: ১৫" min="0" max="100" value={percentage} onChange={(e) => setPercentage(e.target.value)} />

          <button onClick={calculatePercentage}>হিসাব করুন</button>

          <div className="result" id="resultBox" dangerouslySetInnerHTML={{ __html: result }}></div>
        </div>
      </div>
    </div>
  );
};

export default PercentageCalculatorPage;
