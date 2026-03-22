
"use client";

import { useState } from 'react';

const NumberToWordPage = () => {
  const [numberInput, setNumberInput] = useState('');
  const [language, setLanguage] = useState('bn');
  const [result, setResult] = useState('ফলাফল এখানে দেখানো হবে');

  const numberToBanglaWords = (num: number): string => {
    if (num === 0) return "শূন্য";

    const ones = ["", "এক", "দুই", "তিন", "চার", "পাঁচ", "ছয়", "সাত", "আট", "নয়"];
    const teens = ["দশ", "এগারো", "বারো", "তেরো", "চৌদ্দ", "পনেরো", "ষোল", "সতেরো", "আঠারো", "উনিশ"];
    const tens = ["", "", "বিশ", "ত্রিশ", "চল্লিশ", "পঞ্চাশ", "ষাট", "সত্তর", "আশি", "নব্বই"];
    const hundreds = "শত";
    const thousands = "হাজার";
    const lakhs = "লাখ";
    const crores = "কোটি";

    function twoDigitWords(n: number): string {
      if (n < 10) return ones[n];
      else if (n >= 10 && n < 20) return teens[n - 10];
      else {
        let t = Math.floor(n / 10);
        let o = n % 10;
        return tens[t] + (o > 0 ? " " + ones[o] : "");
      }
    }

    let word = "";

    let crore = Math.floor(num / 10000000);
    num = num % 10000000;

    let lakh = Math.floor(num / 100000);
    num = num % 100000;

    let thousand = Math.floor(num / 1000);
    num = num % 1000;

    let hundred = Math.floor(num / 100);
    num = num % 100;

    if (crore > 0) {
      word += numberToBanglaWords(crore) + " " + crores + " ";
    }
    if (lakh > 0) {
      word += numberToBanglaWords(lakh) + " " + lakhs + " ";
    }
    if (thousand > 0) {
      word += numberToBanglaWords(thousand) + " " + thousands + " ";
    }
    if (hundred > 0) {
      word += ones[hundred] + " " + hundreds + " ";
    }
    if (num > 0) {
      word += twoDigitWords(num);
    }
    return word.trim();
  }

  const numberToEnglishWords = (num: number): string => {
    if (num === 0) return "zero";

    const a = [
      "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
      "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
      "seventeen", "eighteen", "nineteen"
    ];
    const b = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

    function inWords(num: number): string {
      if (num < 20) return a[num];
      if (num < 100) return b[Math.floor(num / 10)] + (num % 10 ? "-" + a[num % 10] : "");
      if (num < 1000) return a[Math.floor(num / 100)] + " hundred" + (num % 100 ? " and " + inWords(num % 100) : "");
      if (num < 1000000) return inWords(Math.floor(num / 1000)) + " thousand" + (num % 1000 ? " " + inWords(num % 1000) : "");
      if (num < 1000000000) return inWords(Math.floor(num / 1000000)) + " million" + (num % 1000000 ? " " + inWords(num % 1000000) : "");
      return inWords(Math.floor(num / 1000000000)) + " billion" + (num % 1000000000 ? " " + inWords(num % 1000000000) : "");
    }

    return inWords(num).trim();
  }

  const convertNumber = () => {
    if (numberInput.trim() === "") {
      setResult("অনুগ্রহ করে একটি সংখ্যা দিন।");
      return;
    }

    const num = parseInt(numberInput);
    if (isNaN(num) || num < 0) {
      setResult("সঠিক এবং ধনাত্মক সংখ্যা দিন।");
      return;
    }

    if (language === "bn") {
      const banglaWords = numberToBanglaWords(num);
      setResult(banglaWords);
    } else {
      const englishWords = numberToEnglishWords(num);
      setResult(englishWords.charAt(0).toUpperCase() + englishWords.slice(1));
    }
  };

  return (
    <div className="file-section">
      <div className="file-container">
        <div className="file-header">
          <div className="file-title">
            <h2>🔢 সংখ্যা থেকে লেখা উদাহরণ</h2>
            <div className="title-underline"></div>
          </div>
          <div className="file-content-text">
            <p>১২৩ → "এক শত তেইশ" / "One Hundred Twenty Three"</p>
            <p>২,৫০০ → "দুই হাজার পাঁচশত" / "Two Thousand Five Hundred"</p>
            <p>১,০০,০০০ → "এক লক্ষ" / "One Lakh"</p>
            <p>৫,০০০,০০০ → "পঞ্চাশ লক্ষ" / "Five Million"</p>
            <p>১২.৭৫ → "বারো দশমিক সাত পাঁচ" / "Twelve Point Seven Five"</p>
            <p>৳২,৫০০.৫০ → "দুই হাজার পাঁচশত টাকা পঞ্চাশ পয়সা"</p>
            <p>$১০০.২৫ → "একশত ডলার পঁচিশ সেন্ট"</p>
          </div>
        </div>

        <div className="nword-container">
          <h3 style={{ textAlign: 'center' }}>সংখ্যা থেকে লেখা উদাহরণ</h3>

          <label htmlFor="numberInput">সংখ্যা দিন:</label>
          <input type="number" id="numberInput" placeholder="যেমন: 1200" min="0" value={numberInput} onChange={(e) => setNumberInput(e.target.value)} />

          <label htmlFor="languageSelect">ভাষা নির্বাচন করুন:</label>
          <select id="languageSelect" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="bn">বাংলা</option>
            <option value="en">English</option>
          </select>

          <button onClick={convertNumber}>রূপান্তর করুন</button>

          <div className="result" id="resultBox">{result}</div>
        </div>
      </div>
    </div>
  );
};

export default NumberToWordPage;
