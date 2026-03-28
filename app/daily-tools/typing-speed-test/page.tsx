'use client';

import { useState, useEffect, useRef } from 'react';
import { Keyboard, Timer, Target, Zap, RotateCcw, Award } from 'lucide-react';

export default function TypingSpeedTestPage() {
    const sampleSentences = [
        "The quick brown fox jumps over the lazy dog.",
        "Success is not final, failure is not fatal.",
        "Coding is the language of the future.",
        "Next.js and Tailwind CSS make a powerful duo.",
        "React state management is essential for developers.",
        "Practice daily to improve your muscle memory."
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [testActive, setTestActive] = useState(false);
    const [timer, setTimer] = useState(60);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [inputText, setInputText] = useState('');
    const [correctChars, setCorrectChars] = useState(0);
    const [totalCharsTyped, setTotalCharsTyped] = useState(0);

    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (testActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setTestActive(false);
        }
        return () => clearInterval(interval);
    }, [testActive, timer]);

    // Calculate WPM & Accuracy
    useEffect(() => {
        if (totalCharsTyped > 0) {
            const timeElapsed = (60 - timer) / 60; // in minutes
            const wordsTyped = totalCharsTyped / 5;
            const calculatedWpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
            setWpm(calculatedWpm);
            setAccuracy(Math.round((correctChars / totalCharsTyped) * 100));
        }
    }, [totalCharsTyped, correctChars, timer]);

    const startTest = () => {
        setTestActive(true);
        setTimer(60);
        setWpm(0);
        setAccuracy(100);
        setInputText('');
        setTotalCharsTyped(0);
        setCorrectChars(0);
        setCurrentIndex(0);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!testActive) return;
        const val = e.target.value;
        const lastChar = val.slice(-1);
        const expectedChar = sampleSentences[currentIndex][val.length - 1];

        if (val.length <= sampleSentences[currentIndex].length) {
            setInputText(val);
            setTotalCharsTyped((prev) => prev + 1);
            if (lastChar === expectedChar) {
                setCorrectChars((prev) => prev + 1);
            }
        }

        if (val.length === sampleSentences[currentIndex].length) {
            if (currentIndex < sampleSentences.length - 1) {
                setCurrentIndex((prev) => prev + 1);
                setInputText('');
            } else {
                setTestActive(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-indigo-50 dark:bg-zinc-950 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                
                {/* Header Section */}
                <div className="bg-white dark:bg-zinc-900 rounded-[1.0rem] shadow-2xl shadow-purple-500/10 overflow-hidden border border-purple-100 dark:border-zinc-800 mb-8">
                    <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-indigo-700 p-8 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Keyboard className="w-8 h-8" />
                                <h1 className="text-2xl font-black uppercase tracking-tighter">Type Master Pro</h1>
                            </div>
                            <Award className="w-8 h-8 opacity-50" />
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Stats Dashboard */}
                        <div className="grid grid-cols-3 gap-4 mb-10">
                            <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-3xl border border-purple-100 dark:border-purple-900/20 text-center">
                                <Timer className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                                <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Time Left</p>
                                <p className="text-2xl font-black text-gray-800 dark:text-white">{timer}s</p>
                            </div>
                            <div className="bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-3xl border border-indigo-100 dark:border-indigo-900/20 text-center">
                                <Zap className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">WPM</p>
                                <p className="text-2xl font-black text-gray-800 dark:text-white">{wpm}</p>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-3xl border border-purple-100 dark:border-purple-900/20 text-center">
                                <Target className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                                <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Accuracy</p>
                                <p className="text-2xl font-black text-gray-800 dark:text-white">{accuracy}%</p>
                            </div>
                        </div>

                        {/* Display Text Box */}
                        <div className="relative mb-8 p-6 bg-gray-50 dark:bg-zinc-800/50 rounded-3xl border-2 border-dashed border-purple-200 dark:border-zinc-700">
                            <div className="text-xl sm:text-2xl font-medium leading-relaxed text-gray-400 dark:text-zinc-500 font-mono">
                                {sampleSentences[currentIndex].split('').map((char, index) => {
                                    let colorClass = "";
                                    if (index < inputText.length) {
                                        colorClass = inputText[index] === char ? "text-indigo-600 dark:text-indigo-400" : "text-red-500 bg-red-100 dark:bg-red-900/30";
                                    }
                                    return <span key={index} className={`${colorClass} transition-colors`}>{char}</span>;
                                })}
                            </div>
                        </div>

                        {/* Input Area */}
                        <textarea
                            ref={inputRef}
                            value={inputText}
                            onChange={handleInputChange}
                            disabled={!testActive}
                            placeholder={testActive ? "Start typing..." : "Click 'Start Test' to begin"}
                            className="w-full p-6 text-lg bg-white dark:bg-zinc-900 border-2 border-purple-100 dark:border-zinc-800 rounded-3xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/5 outline-none transition-all resize-none h-32 mb-6 font-mono text-gray-800 dark:text-zinc-100 shadow-inner"
                        />

                        <button 
                            onClick={startTest}
                            className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            {testActive ? <RotateCcw className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                            {testActive ? 'Restart Session' : 'Start Typing Test'}
                        </button>
                    </div>
                </div>

                {/* Footer Tips */}
                <div className="text-center px-10">
                    <p className="text-[10px] font-bold text-indigo-400 dark:text-zinc-600 uppercase tracking-widest leading-loose">
                        Tip: Keep your eyes on the screen, not the keyboard. Practice daily to reach 80+ WPM. 
                        Your speed is measured by total characters divided by five.
                    </p>
                </div>

            </div>
        </div>
    );
}