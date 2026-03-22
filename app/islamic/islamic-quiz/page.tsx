'use client';

import { useState } from 'react';

const quizData = [
  {
    question: "কুরআনের প্রথম সূরার নাম কী?",
    options: ["সূরা আল কাহফ", "সূরা আল বাকারাহ", "সূরা আল ফাতিহা", "সূরা আল ইখলাস"],
    answer: "সূরা আল ফাতিহা",
  },
  {
    question: "পয়গম্বর মুহাম্মাদ (সা.) কোথায় জন্মগ্রহণ করেন?",
    options: ["মদিনা", "তাইফ", "মক্কা", "ইয়াসরিব"],
    answer: "মক্কা",
  },
  {
    question: "ইসলামের ৫টি স্তম্ভের একটি কী?",
    options: ["নামায", "তাওবা", "হালাল খাবার", "জাকাহ দেওয়া না দেওয়া"],
    answer: "নামায",
  },
  {
    question: "হজ কোন মাসে আদায় করা হয়?",
    options: ["রমজান", "শাবান", "জিলহজ", "মুহাররম"],
    answer: "জিলহজ",
  },
  {
    question: "পবিত্র কুরআন কতটি সূরা নিয়ে গঠিত?",
    options: ["১১৪", "১০৪", "১২০", "১১০"],
    answer: "১১৪",
  },
];

const IslamicQuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const handleAnswer = (option: string) => {
    if (isAnswered) return;

    setSelectedAnswer(option);
    setIsAnswered(true);
    if (option === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsQuizFinished(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-teal-600 dark:text-teal-400 mb-6">ইসলামিক কুইজ</h2>
        {isQuizFinished ? (
          <div className="text-center">
            <p className="text-2xl font-semibold mb-4">✅ আপনার স্কোর: {score} / {quizData.length}</p>
            <button
              onClick={restartQuiz}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition-transform transform hover:scale-105"
            >
              🔁 আবার খেলুন
            </button>
          </div>
        ) : (
          <div>
            <div className="text-xl font-semibold mb-4">
              প্রশ্ন {currentQuestion + 1}: {quizData[currentQuestion].question}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quizData[currentQuestion].options.map((option, index) => {
                const isCorrect = option === quizData[currentQuestion].answer;
                const isSelected = option === selectedAnswer;
                const getButtonClass = () => {
                  if (!isAnswered) {
                    return 'bg-gray-200 dark:bg-gray-700 hover:bg-teal-100 dark:hover:bg-teal-800';
                  }
                  if (isSelected) {
                    return isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
                  }
                  if (isCorrect) {
                    return 'bg-green-500 text-white';
                  }
                  return 'bg-gray-200 dark:bg-gray-700';
                };

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-lg transition ${getButtonClass()}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {isAnswered && (
              <div className="mt-6 text-center">
                <p className={`font-bold ${selectedAnswer === quizData[currentQuestion].answer ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedAnswer === quizData[currentQuestion].answer
                    ? "✔️ সঠিক উত্তর!"
                    : `❌ ভুল উত্তর! সঠিক উত্তর: ${quizData[currentQuestion].answer}`}
                </p>
                <button
                  onClick={handleNext}
                  className="mt-4 px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition-transform transform hover:scale-105"
                >
                  পরবর্তী প্রশ্ন
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IslamicQuizPage;
