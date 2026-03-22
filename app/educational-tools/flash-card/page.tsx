
"use client";

import { useState } from 'react';

const FlashcardPage = () => {
  const [cards, setCards] = useState<{ question: string; answer: string; }[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [flipped, setFlipped] = useState<number | null>(null);

  const addCard = () => {
    if (!question || !answer) {
      alert("প্রশ্ন ও উত্তর পূরণ করুন");
      return;
    }
    setCards([...cards, { question, answer }]);
    setQuestion('');
    setAnswer('');
  };

  const handleFlip = (index: number) => {
    setFlipped(flipped === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">📚 ফ্ল্যাশকার্ড তৈরি টুল</h2>
            <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">আপনার নিজের ফ্ল্যাশকার্ড তৈরি করুন এবং পড়ুন</p>
        </div>

        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="space-y-4">
                <input 
                    type="text" 
                    value={question} 
                    onChange={(e) => setQuestion(e.target.value)} 
                    placeholder="প্রশ্ন লিখুন (উদাঃ: রাজধানী কী?)"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                />
                <textarea 
                    value={answer} 
                    onChange={(e) => setAnswer(e.target.value)} 
                    rows={3}
                    placeholder="উত্তর লিখুন (উদাঃ: ঢাকা)"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                ></textarea>
            </div>

            <div className="text-center mt-6">
                <button 
                    onClick={addCard} 
                    className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                    ফ্ল্যাশকার্ড যুক্ত করুন
                </button>
            </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
                <div key={index} className="perspective-1000" onClick={() => handleFlip(index)}>
                    <div className={`relative w-full h-48 transform-style-preserve-3d transition-transform duration-500 ${flipped === index ? 'rotate-y-180' : ''}`}>
                        <div className="absolute w-full h-full backface-hidden bg-white dark:bg-gray-700 rounded-lg shadow-lg flex items-center justify-center p-4 text-center">
                            <p className="text-gray-800 dark:text-gray-200 font-semibold">{card.question}</p>
                        </div>
                        <div className="absolute w-full h-full backface-hidden bg-indigo-100 dark:bg-indigo-900 rounded-lg shadow-lg flex items-center justify-center p-4 text-center rotate-y-180">
                            <p className="text-indigo-800 dark:text-indigo-200">{card.answer}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}

export default FlashcardPage;
