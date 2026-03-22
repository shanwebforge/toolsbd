'use client';

import { useState, useEffect } from 'react';

interface Surah {
  number: number;
  englishName: string;
  name: string;
  revelationType: string;
}

const QuranAudioPage = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then(res => res.json())
      .then(data => {
        setSurahs(data.data);
        setIsLoading(false);
      });
  }, []);

  const selectSurah = (surah: Surah) => {
    setSelectedSurah(surah);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto max-w-6xl p-4">
        <div className="md:flex md:space-x-4">
          <div className="md:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-screen overflow-y-auto">
            <h1 className="text-2xl font-bold text-center text-teal-700 dark:text-teal-400 mb-4">সূরা তালিকা</h1>
            {isLoading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <ul className="space-y-2">
                {surahs.map(surah => (
                  <li key={surah.number}>
                    <button
                      onClick={() => selectSurah(surah)}
                      className={`w-full text-left p-3 rounded-lg transition ${selectedSurah?.number === surah.number ? 'bg-teal-100 dark:bg-teal-900 font-bold' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                      {surah.number}. {surah.englishName} ({surah.name})
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="md:w-2/3 mt-4 md:mt-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
              {selectedSurah ? (
                <div>
                  <h2 className="text-3xl font-bold mb-4">{selectedSurah.englishName}</h2>
                  <p className="mb-4 text-lg">({selectedSurah.name}) - {selectedSurah.revelationType}</p>
                  <audio
                    controls
                    autoPlay
                    src={`https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${selectedSurah.number}.mp3`}
                    className="w-full"
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ) : (
                <div className="text-center">
                  <h2 className="text-2xl font-bold">সূরা নির্বাচন করুন</h2>
                  <p className="mt-2">বাম থেকে সূরা নির্বাচন করে শ্রবণ শুরু করুন।</p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-6">🔊 অনেক সময় সূরা লোড হতে কিছুটা সময় লাগতে পারে। দয়া করে একটু অপেক্ষা করুন অথবা অডিও বন্ধ করে আবার প্লে করুন।</p>
                  <p className="text-xs mt-2">📥 অডিও সংগ্রহ করা হয়েছে <strong>alquran.cloud</strong> থেকে।</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuranAudioPage;
