
"use client";

import { useState, useEffect, useRef } from 'react';

const TypingSpeedTestPage = () => {
  const sampleSentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect.",
    "Typing speed improves with time.",
    "JavaScript is fun to learn.",
    "Stay focused and keep typing."
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [testActive, setTestActive] = useState(false);
  const [totalTyped, setTotalTyped] = useState('');
  const [timer, setTimer] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [inputText, setInputText] = useState('');
  const [sampleText, setSampleText] = useState('');

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setSampleText(sampleSentences[currentIndex]);
  }, [currentIndex]);

  useEffect(() => {
    if (testActive) {
      const interval = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - (startTime || 0)) / 1000);
        const timeLeft = 60 - elapsedSeconds;
        if (timeLeft >= 0) {
          setTimer(timeLeft);
        } else {
          endTest();
        }
      }, 1000);
      setIntervalId(interval);

      return () => clearInterval(interval);
    }
  }, [testActive, startTime]);

  const startTest = () => {
    setInputText('');
    setTotalTyped('');
    setTestActive(true);
    setStartTime(Date.now());
    setTimer(60);
    setWpm(0);
    setAccuracy(0);
    setCurrentIndex(0);
    setSampleText(sampleSentences[0]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const endTest = () => {
    if (intervalId) clearInterval(intervalId);
    setTestActive(false);
    const timeElapsed = (Date.now() - (startTime || 0)) / 1000;
    const wordsTyped = totalTyped.trim().split(/\s+/).filter(Boolean).length;
    const calculatedWpm = timeElapsed > 0 ? Math.round(wordsTyped / (timeElapsed / 60)) : 0;
    setWpm(calculatedWpm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!testActive) return;

    const value = e.target.value;
    setInputText(value);
    setTotalTyped(totalTyped + value.slice(-1));

    let correctChars = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === sampleText[i]) {
        correctChars++;
      }
    }
    setAccuracy(Math.round((correctChars / value.length) * 100) || 0);

    if (value.length === sampleText.length) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sampleSentences.length);
      setInputText('');
    }
  };

  const renderSampleText = () => {
    return sampleText.split('').map((char, index) => {
      let className = '';
      if (index < inputText.length) {
        className = inputText[index] === char ? 'correct' : 'incorrect';
      }
      return <span key={index} className={className}>{char}</span>;
    });
  };

  return (
    <div className="file-section">
      <div className="file-container">
        <div className="file-header">
          <div className="file-title">
            <h2>⌨️ Typing Speed Test</h2>
            <div className="title-underline"></div>
          </div>
          <div className="file-content-text">
            <p>• Test your typing speed in words per minute (WPM)</p>
            <p>• Improve typing accuracy with real-time feedback</p>
            <p>• Track progress over time with detailed results</p>
            <p>• Practice with different text samples</p>
            <p>• Perfect for students, professionals, and coders</p>
          </div>
        </div>

        <div className="typing-container">
          <h3>Typing Speed Test</h3>
          <div className="sample-text-box" id="sample-text">
            {renderSampleText()}
          </div>
          <textarea
            ref={inputRef}
            id="input-text"
            placeholder="Start typing here..."
            rows={5}
            value={inputText}
            onChange={handleInputChange}
            disabled={!testActive}
          ></textarea>
          <button id="start-btn" onClick={startTest}>
            {testActive ? 'Restart Test' : 'Start Test'}
          </button>
          <div id="timer" className="typing-stat">Time: <span>{timer}s</span></div>
          <div id="wpm-result" className="typing-stat">WPM: <span>{wpm}</span></div>
          <div id="accuracy" className="typing-stat">Accuracy: <span>{accuracy}%</span></div>
        </div>
      </div>
    </div>
  );
};

export default TypingSpeedTestPage;
