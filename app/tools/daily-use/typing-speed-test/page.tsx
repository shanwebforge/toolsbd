"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Keyboard, RefreshCw, Clock, Target, Zap } from "lucide-react";
import { ToolLayout } from "@/components/tool-layout";

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet.",
  "Programming is the art of telling a computer what to do. It requires patience, logic, and creativity.",
  "In the world of technology, change is the only constant. New innovations emerge every day.",
  "Practice makes perfect. The more you type, the faster and more accurate you will become.",
  "Web development combines design and programming to create interactive online experiences.",
  "Artificial intelligence is transforming how we work, live, and interact with technology.",
  "The best way to predict the future is to create it. Start building your dreams today.",
  "Learning to code opens up a world of possibilities. It empowers you to solve problems creatively.",
];

export default function TypingSpeedTestPage() {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLimit, setTimeLimit] = useState(60); // seconds
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRef = useRef<HTMLInputElement>(null);

  const initTest = useCallback(() => {
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setText(randomText);
    setUserInput("");
    setStartTime(null);
    setEndTime(null);
    setIsRunning(false);
    setTimeLeft(timeLimit);
  }, [timeLimit]);

  useEffect(() => {
    initTest();
  }, [initTest]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setEndTime(Date.now());
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!isRunning && value.length === 1) {
      setStartTime(Date.now());
      setIsRunning(true);
    }
    
    setUserInput(value);
    
    // Check if completed
    if (value === text) {
      setIsRunning(false);
      setEndTime(Date.now());
    }
  };

  const calculateStats = () => {
    if (!startTime) return { wpm: 0, accuracy: 0, cpm: 0, errors: 0 };
    
    const endTimeToUse = endTime || Date.now();
    const timeInMinutes = (endTimeToUse - startTime) / 1000 / 60;
    
    // Calculate errors
    let errors = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] !== text[i]) errors++;
    }
    
    const correctChars = userInput.length - errors;
    const words = correctChars / 5; // Standard: 5 chars = 1 word
    const wpm = Math.round(words / timeInMinutes) || 0;
    const cpm = Math.round(correctChars / timeInMinutes) || 0;
    const accuracy = userInput.length > 0 
      ? Math.round((correctChars / userInput.length) * 100) 
      : 100;
    
    return { wpm, accuracy, cpm, errors };
  };

  const stats = calculateStats();
  const isComplete = userInput === text || timeLeft === 0;

  const renderText = () => {
    return text.split("").map((char, index) => {
      let className = "text-muted-foreground";
      if (index < userInput.length) {
        className = userInput[index] === char 
          ? "text-green-500" 
          : "text-red-500 bg-red-500/20";
      } else if (index === userInput.length) {
        className = "text-foreground bg-primary/30 animate-pulse";
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <ToolLayout
      title="Typing Speed Test"
      description="Test your typing speed and accuracy"
      icon={Keyboard}
      backHref="/tools/daily-use"
      backLabel="Back to Daily Use Tools"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Time Selection */}
        <div className="flex items-center justify-center gap-4">
          {[30, 60, 120].map((time) => (
            <button
              key={time}
              onClick={() => {
                setTimeLimit(time);
                setTimeLeft(time);
                initTest();
              }}
              disabled={isRunning}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeLimit === time
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              } ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {time}s
            </button>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-4 bg-muted rounded-xl">
            <Clock className="w-5 h-5 text-primary mb-2" />
            <span className="text-2xl font-bold text-foreground">{timeLeft}</span>
            <span className="text-xs text-muted-foreground">Seconds</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-muted rounded-xl">
            <Zap className="w-5 h-5 text-primary mb-2" />
            <span className="text-2xl font-bold text-foreground">{stats.wpm}</span>
            <span className="text-xs text-muted-foreground">WPM</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-muted rounded-xl">
            <Target className="w-5 h-5 text-primary mb-2" />
            <span className="text-2xl font-bold text-foreground">{stats.accuracy}%</span>
            <span className="text-xs text-muted-foreground">Accuracy</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-muted rounded-xl">
            <span className="w-5 h-5 text-primary mb-2 text-sm font-bold">Err</span>
            <span className="text-2xl font-bold text-red-500">{stats.errors}</span>
            <span className="text-xs text-muted-foreground">Errors</span>
          </div>
        </div>

        {/* Text Display */}
        <div className="p-6 bg-muted rounded-xl font-mono text-lg leading-relaxed select-none">
          {renderText()}
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          disabled={isComplete}
          placeholder={isComplete ? "Test complete!" : "Start typing..."}
          className="w-full px-4 py-4 rounded-xl border border-border bg-background text-foreground font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          autoFocus
        />

        {/* Results */}
        {isComplete && (
          <div className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border border-primary/20 space-y-4">
            <h3 className="text-xl font-bold text-foreground text-center">Test Complete!</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{stats.wpm}</div>
                <div className="text-sm text-muted-foreground">Words/Min</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">{stats.accuracy}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">{stats.cpm}</div>
                <div className="text-sm text-muted-foreground">Chars/Min</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500">{stats.errors}</div>
                <div className="text-sm text-muted-foreground">Errors</div>
              </div>
            </div>
          </div>
        )}

        {/* Reset Button */}
        <button
          onClick={initTest}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          {isComplete ? "Try Again" : "New Text"}
        </button>
      </div>
    </ToolLayout>
  );
}
