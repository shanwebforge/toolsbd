
"use client";

import { useState } from 'react';

const MathSolverPage = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');

  const calculate = (operator: '+' | '-' | '*' | '/') => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (isNaN(number1) || isNaN(number2)) {
      setResult("দয়া করে দুটি সঠিক সংখ্যা দিন।");
      return;
    }

    let calculationResult;
    switch (operator) {
      case '+':
        calculationResult = number1 + number2;
        break;
      case '-':
        calculationResult = number1 - number2;
        break;
      case '*':
        calculationResult = number1 * number2;
        break;
      case '/':
        if (number2 === 0) {
          setResult("০ দিয়ে ভাগ করা যায় না!");
          return;
        }
        calculationResult = number1 / number2;
        break;
      default:
        calculationResult = "ত্রুটি!";
    }
    setResult(`ফলাফল: ${calculationResult}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">🔢 গণিত সমস্যা সমাধান</h2>
            <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">সাধারণ গাণিতিক গণনা সম্পাদন করুন।</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="space-y-4">
                <input 
                    type="number" 
                    value={num1} 
                    onChange={(e) => setNum1(e.target.value)} 
                    placeholder="প্রথম সংখ্যা দিন"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                />
                <input 
                    type="number" 
                    value={num2} 
                    onChange={(e) => setNum2(e.target.value)} 
                    placeholder="দ্বিতীয় সংখ্যা দিন"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
                <button onClick={() => calculate('+')} className="py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">➕ যোগ</button>
                <button onClick={() => calculate('-')} className="py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">➖ বিয়োগ</button>
                <button onClick={() => calculate('*')} className="py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">✖️ গুণ</button>
                <button onClick={() => calculate('/')} className="py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">➗ ভাগ</button>
            </div>

            {result && 
                <div className="mt-8 text-center text-xl font-semibold p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-200">
                    {result}
                </div>
            }
        </div>
    </div>
  );
}

export default MathSolverPage; 
