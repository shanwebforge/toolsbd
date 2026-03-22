
"use client";

import { useState } from 'react';

const questions = [
    { 
        question: "বাংলাদেশের স্বাধীনতা দিবস কবে?", 
        options: ["১৬ ডিসেম্বর", "২৬ মার্চ", "২১ ফেব্রুয়ারি"], 
        answer: "২৬ মার্চ"
    },
    { 
        question: "পৃথিবীর সবচেয়ে বড় মহাসাগর কোনটি?", 
        options: ["আটলান্টিক", "ভারত মহাসাগর", "প্রশান্ত মহাসাগর"], 
        answer: "প্রশান্ত মহাসাগর"
    },
    { 
        question: "বাংলাদেশের রাজধানী কোথায়?", 
        options: ["খুলনা", "ঢাকা", "চট্টগ্রাম"], 
        answer: "ঢাকা"
    }
];

const McqPracticePage = () => {
    const [currentAnswers, setCurrentAnswers] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const handleOptionChange = (qIndex: number, option: string) => {
        setCurrentAnswers({...currentAnswers, [qIndex]: option});
    };

    const handleSubmit = () => {
        let newScore = 0;
        questions.forEach((q, index) => {
            if (currentAnswers[index] === q.answer) {
                newScore++;
            }
        });
        setScore(newScore);
        setSubmitted(true);
    };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">📝 MCQ প্র্যাকটিস টুল</h2>
          <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">আপনার জ্ঞান পরীক্ষা করার জন্য ইন্টারেক্টিভ কুইজ।</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          {questions.map((q, qIndex) => (
              <div key={qIndex} className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-lg text-gray-900 dark:text-gray-200 mb-3">{qIndex + 1}. {q.question}</p>
                  <div className="space-y-2">
                      {q.options.map((option, oIndex) => (
                          <label key={oIndex} className={`block p-3 rounded-lg cursor-pointer transition-colors 
                              ${submitted ? 
                                  (option === q.answer ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : (currentAnswers[qIndex] === option ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' : 'bg-gray-100 dark:bg-gray-700')) 
                                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                              <input 
                                  type="radio" 
                                  name={`question-${qIndex}`} 
                                  value={option} 
                                  onChange={() => handleOptionChange(qIndex, option)}
                                  checked={currentAnswers[qIndex] === option}
                                  disabled={submitted}
                                  className="mr-3"
                              />
                              {option}
                          </label>
                      ))}
                  </div>
              </div>
          ))}

          <div className="text-center mt-6">
              <button onClick={handleSubmit} disabled={submitted} className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
                  ফলাফল দেখুন
              </button>
          </div>

          {submitted && 
              <div className="mt-8 text-center text-xl font-semibold p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-200">
                  আপনি {questions.length} টি প্রশ্নের মধ্যে {score}টি সঠিক উত্তর দিয়েছেন।
              </div>
          }
      </div>
    </div>
  );
}

export default McqPracticePage;
