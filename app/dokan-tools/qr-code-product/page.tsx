
"use client";
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QrCodeProductPage = () => {
  const [productInput, setProductInput] = useState('');
  const [qrCodeText, setQrCodeText] = useState('');

  const generateQR = () => {
    if (!productInput.trim()) {
      alert('অনুগ্রহ করে প্রোডাক্টের লিংক বা টেক্সট দিন');
      return;
    }
    setQrCodeText(productInput);
  };

  return (
    <>
      <main className="file-section">
        <div className="file-container">
          <div className="file-header">
            <div className="file-title">
              <h2>প্রোডাক্টের জন্য QR কোড জেনারেটর</h2>
              <div className="title-underline"></div>
            </div>
            <div className="file-content-text">
              <p>প্রোডাক্টের জন্য QR কোড জেনারেটর - পণ্যের জন্য কাস্টম QR কোড তৈরি করার টুল</p>
              <p>পণ্যের বিবরণ, মূল্য ও অন্যান্য তথ্য সংবলিত QR কোড তৈরি করুন</p>
              <p>QR কোডের ডিজাইন, রং ও সাইজ কাস্টোমাইজ করুন</p>
              <p>প্রোডাক্ট প্যাকেজিং, লেবেল ও বিজ্ঞাপনে ব্যবহারের জন্য উপযোগী</p>
              <p>কাস্টমাররা QR কোড স্ক্যান করে পণ্যের তথ্য পেতে পারবে</p>
              <p>ডিজিটাল মার্কেটিং এবং প্রোডাক্ট ট্র্যাকিং এর জন্য কার্যকরী টুল</p>
            </div>
          </div>
          <div className="file-footer">
            <h3>প্রোডাক্টের জন্য QR কোড জেনারেটর</h3>
            <input
              type="text"
              value={productInput}
              onChange={(e) => setProductInput(e.target.value)}
              placeholder="প্রোডাক্ট লিংক বা টেক্সট দিন"
            />
            <button onClick={generateQR}>QR কোড তৈরি করুন</button>
            {qrCodeText && (
              <div id="qrcode">
                <QRCodeSVG
                  value={qrCodeText}
                  size={200}
                  fgColor="#2a4d69"
                  bgColor="#ffffff"
                  level="H"
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default QrCodeProductPage;
