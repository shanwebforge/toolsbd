
"use client";

import { useState, useEffect } from 'react';

interface QA {
  question: string;
  answer: string;
}

const VivaQuestionPage = () => {
  const [qaList, setQaList] = useState<QA[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const savedList = localStorage.getItem('vivaQAList');
    if (savedList) {
      try {
        const parsedList = JSON.parse(savedList);
        if (Array.isArray(parsedList)) {
          setQaList(parsedList);
        }
      } catch (error) {
        console.error("Error parsing viva Q&A list from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    if (qaList.length > 0) {
        localStorage.setItem('vivaQAList', JSON.stringify(qaList));
    }
  }, [qaList]);

  const addQA = () => {
    if (!question.trim() || !answer.trim()) {
      alert("প্রশ্ন ও উত্তর দুইটাই লিখুন!");
      return;
    }
    const newQA: QA = { question, answer };
    setQaList([newQA, ...qaList]);
    setQuestion('');
    setAnswer('');
  };

  const deleteQA = (index: number) => {
    if (confirm("আপনি কি মুছে ফেলতে চান?")) {
      const newList = [...qaList];
      newList.splice(index, 1);
      setQaList(newList);
      localStorage.setItem('vivaQAList', JSON.stringify(newList));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">🎤 ভাইভা প্রশ্ন এবং উত্তর</h2>
        <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">আপনার ভাইভা পরীক্ষার জন্য প্রশ্ন ও উত্তর সংরক্ষণ করুন।</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 gap-4">
          <input 
            type="text" 
            value={question} 
            onChange={e => setQuestion(e.target.value)} 
            placeholder="প্রশ্ন লিখুন..." 
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
          <textarea 
            value={answer} 
            onChange={e => setAnswer(e.target.value)} 
            rows={3} 
            placeholder="উত্তর লিখুন..." 
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
        </div>
        <button onClick={addQA} className="mt-6 w-full px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
          ➕ সংরক্ষণ করুন
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {qaList.length > 0 ? (
          qaList.map((item, i) => (
            <div key={i} className="relative p-4 mb-4 bg-gray-100 dark:bg-gray-700 rounded-md">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-200">প্রশ্ন: {item.question}</h3>
              <p className="mt-2 text-gray-800 dark:text-gray-300">উত্তর: {item.answer}</p>
              <button onClick={() => deleteQA(i)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">🗑️</button>
            </div>
          )))
          : <p className='text-center text-gray-500'>No Q&A saved yet.</p>
        }
      </div>
    </div>
  );
}

export default VivaQuestionPage;
