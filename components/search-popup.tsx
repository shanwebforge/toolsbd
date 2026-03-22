"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample tools data for search
const toolsData = [
  { name: "BMI Calculator", path: "/tools/daily-use/bmi-calculator", category: "Daily Use Tools" },
  { name: "Typing Speed Test", path: "/tools/daily-use/typing-speed-test", category: "Daily Use Tools" },
  { name: "Password Generator", path: "/tools/daily-use/password-generator", category: "Daily Use Tools" },
  { name: "Color Picker", path: "/tools/daily-use/color-picker", category: "Daily Use Tools" },
  { name: "JSON Formatter", path: "/tools/daily-use/json-formatter", category: "Daily Use Tools" },
  { name: "Todo App", path: "/tools/daily-use/todo", category: "Daily Use Tools" },
  { name: "Age Calculator", path: "/tools/daily-use/age-calculator", category: "Daily Use Tools" },
  { name: "Unit Converter", path: "/tools/daily-use/unit-converter", category: "Daily Use Tools" },
  { name: "QR Code Generator", path: "/tools/daily-use/qr-code", category: "Daily Use Tools" },
  { name: "Image Compressor", path: "/tools/daily-use/image-compressor", category: "Daily Use Tools" },
];

export function SearchPopup({ isOpen, onClose }: SearchPopupProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<typeof toolsData>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = toolsData.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  const handleClose = () => {
    setSearchQuery("");
    setResults([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[120px] px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Search Container */}
      <div className="relative w-full max-w-[600px] animate-fade-in">
        {/* Search Input */}
        <div className="flex items-stretch rounded-xl overflow-hidden shadow-lg shadow-primary/30 border-2 border-primary bg-card">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="খোঁজ করুন..."
            className="flex-grow border-none px-5 py-4 text-base outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
          />
          <button
            onClick={() => {}}
            className="bg-primary border-none text-white px-6 flex items-center justify-center hover:bg-primary-dark transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        {results.length > 0 && (
          <div className="mt-2 max-h-[60vh] overflow-y-auto bg-card border-2 border-primary rounded-xl shadow-lg shadow-primary/30">
            <div className="flex justify-between items-center bg-primary text-white px-5 py-4 font-semibold rounded-t-lg">
              <span>সার্চ রেজাল্ট ({results.length})</span>
              <button
                onClick={handleClose}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              {results.map((result, index) => (
                <a
                  key={index}
                  href={result.path}
                  onClick={handleClose}
                  className="flex flex-col mb-4 pb-3 border-b border-border last:border-0 last:mb-0 last:pb-0 text-primary font-medium hover:bg-primary/5 hover:translate-x-1 p-3 rounded-lg transition-all cursor-pointer"
                >
                  <span className="text-base">{result.name}</span>
                  <span className="text-xs text-muted-foreground mt-1">{result.category}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {searchQuery && results.length === 0 && (
          <div className="mt-2 bg-card border-2 border-primary rounded-xl shadow-lg shadow-primary/30 p-5 text-center text-muted-foreground">
            কোনো ফলাফল পাওয়া যায়নি
          </div>
        )}
      </div>
    </div>
  );
}
