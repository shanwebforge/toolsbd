
"use client";

import { useState } from 'react';

const VoicePronunciationPage = () => {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateVoice = async () => {
    if (!text.trim()) {
      alert("টেক্সট ফাঁকা হতে পারে না!");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAudioUrl(null);

    try {
      const res = await fetch('https://voiceover-api-1.onrender.com//api/voiceover', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      if (!res.ok) {
        throw new Error("⚠️ ভয়েস তৈরি করা যায়নি!");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred.");
        }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">🔊 ভয়েস উচ্চারণ জেনারেটর</h2>
        <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">বাংলা বা ইংরেজি লেখা দিয়ে তার উচ্চারণ শুনুন।</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="এখানে আপনার টেক্সট লিখুন..."
          className="w-full h-48 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />

        <div className="text-center mt-6">
          <button onClick={generateVoice} disabled={isLoading} className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:bg-indigo-400 disabled:cursor-not-allowed">
            {isLoading ? "লোড হচ্ছে..." : "🔈 প্লে ভয়েস"}
          </button>
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {audioUrl &&
          <div className="mt-8">
            <audio src={audioUrl} controls autoPlay className="w-full" />
          </div>
        }
      </div>
    </div>
  );
}

export default VoicePronunciationPage;
