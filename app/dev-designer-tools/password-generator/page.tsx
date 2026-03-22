
"use client";

import { useState } from 'react';

const PasswordGeneratorPage = () => {
  const [password, setPassword] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  const generatePassword = (length = 14) => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const symbols = "!@#$%^&*()-_=+[]{}|;:',.<>/?";
    const all = upper + lower + nums + symbols;

    let newPassword = 
      upper[Math.floor(Math.random() * upper.length)] +
      lower[Math.floor(Math.random() * lower.length)] +
      nums[Math.floor(Math.random() * nums.length)] +
      symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = 4; i < length; i++) {
      newPassword += all[Math.floor(Math.random() * all.length)];
    }

    newPassword = newPassword.split('').sort(() => 0.5 - Math.random()).join('');
    setPassword(newPassword);
    setCopyMessage('');
  };

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopyMessage('Copied!');
      setTimeout(() => setCopyMessage(''), 1500);
    }).catch(() => {
      setCopyMessage('Failed to copy!');
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">🔐 Strong Password Generator</h2>
            <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
            <div className="mt-4 text-gray-600 dark:text-gray-300">
                <p>Generate secure, random passwords to protect your accounts.</p>
            </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <button 
                onClick={() => generatePassword()} 
                className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition mb-6"
            >
                Generate Password
            </button>

            <div className="relative w-full max-w-md mx-auto">
                <input 
                    type="text" 
                    value={password} 
                    readOnly 
                    onClick={handleCopy}
                    placeholder="Your password will appear here"
                    className="w-full p-4 pr-12 text-lg font-mono bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-2 border-transparent rounded-lg cursor-pointer text-center select-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {copyMessage && (
                    <small className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-green-500 font-medium">
                        {copyMessage}
                    </small>
                )}
            </div>
        </div>
    </div>
  );
}

export default PasswordGeneratorPage;
