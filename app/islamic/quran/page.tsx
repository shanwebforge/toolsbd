'use client';

import { useState, useEffect } from 'react';

interface Ayah {
  number: number;
  text: string;
}

interface SurahData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: Ayah[];
}

const surahNames = [
  "Al-Fatihah", "Al-Baqarah", "Aal-e-Imran", "An-Nisa", "Al-Ma'idah", "Al-An'am", "Al-A'raf", "Al-Anfal", "At-Tawbah", "Yunus",
  "Hud", "Yusuf", "Ar-Ra'd", "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Isra", "Al-Kahf", "Maryam", "Ta-Ha",
  "Al-Anbiya", "Al-Hajj", "Al-Mu'minun", "An-Nur", "Al-Furqan", "Ash-Shu'ara", "An-Naml", "Al-Qasas", "Al-Ankabut", "Ar-Rum",
  "Luqman", "As-Sajdah", "Al-Ahzab", "Saba", "Fatir", "Ya-Sin", "As-Saffat", "Sad", "Az-Zumar", "Ghafir",
  "Fussilat", "Ash-Shura", "Az-Zukhruf", "Ad-Dukhan", "Al-Jathiyah", "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf",
  "Adh-Dhariyat", "At-Tur", "An-Najm", "Al-Qamar", "Ar-Rahman", "Al-Waqi'ah", "Al-Hadid", "Al-Mujadila", "Al-Hashr", "Al-Mumtahanah",
  "As-Saff", "Al-Jumu'ah", "Al-Munafiqun", "At-Taghabun", "At-Talaq", "At-Tahrim", "Al-Mulk", "Al-Qalam", "Al-Haqqah", "Al-Ma'arij",
  "Nuh", "Al-Jinn", "Al-Muzzammil", "Al-Muddathir", "Al-Qiyamah", "Al-Insan", "Al-Mursalat", "An-Naba", "An-Nazi'at", "Abasa",
  "At-Takwir", "Al-Infitar", "Al-Mutaffifin", "Al-Inshiqaq", "Al-Buruj", "At-Tariq", "Al-A'la", "Al-Ghashiyah", "Al-Fajr", "Al-Balad",
  "Ash-Shams", "Al-Lail", "Ad-Duha", "Ash-Sharh", "At-Tin", "Al-Alaq", "Al-Qadr", "Al-Bayyina", "Az-Zalzala", "Al-Adiyat",
  "Al-Qari'ah", "At-Takathur", "Al-Asr", "Al-Humazah", "Al-Fil", "Quraysh", "Al-Ma'un", "Al-Kawthar", "Al-Kafirun", "An-Nasr",
  "Al-Masad", "Al-Ikhlas", "Al-Falaq", "An-Nas"
];

const QuranPage = () => {
  const [surahList, setSurahList] = useState<string[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [surahName, setSurahName] = useState<string>('');
  const [arabicAyahs, setArabicAyahs] = useState<Ayah[]>([]);
  const [banglaAyahs, setBanglaAyahs] = useState<Ayah[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSurahList(surahNames);
  }, []);

  const loadSurah = async (surahNumber: number, name: string) => {
    setSelectedSurah(surahNumber);
    setSurahName(name);
    setIsLoading(true);
    setError(null);
    try {
      const [arabicRes, banglaRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`),
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/bn.bengali`)
      ]);

      if (!arabicRes.ok || !banglaRes.ok) {
        throw new Error('ডেটা লোডে সমস্যা হয়েছে');
      }

      const arabicData = await arabicRes.json();
      const banglaData = await banglaRes.json();

      if (!arabicData.data || !banglaData.data) {
        throw new Error('ডেটা পাওয়া যায়নি');
      }

      setArabicAyahs(arabicData.data.ayahs);
      setBanglaAyahs(banglaData.data.ayahs);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="w-full md:w-1/4 bg-gray-50 dark:bg-gray-800 p-4 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <h1 className="text-2xl font-bold text-center text-teal-600 dark:text-teal-400 mb-4">সূরা তালিকা</h1>
        <ul>
          {surahList.map((name, index) => (
            <li
              key={index}
              className={`p-2 cursor-pointer border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 ${selectedSurah === index + 1 ? 'bg-teal-100 dark:bg-teal-800 font-bold' : ''}`}
              onClick={() => loadSurah(index + 1, name)}
            >
              {`${index + 1}. ${name}`}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full md:w-3/4 p-4 md:p-6 overflow-y-auto">
        {isLoading ? (
          <div>
            <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">{surahName}</h2>
            <p>লোড হচ্ছে...</p>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : selectedSurah ? (
          <div>
            <h2 className="text-3xl font-bold text-center text-green-600 dark:text-green-400 mb-4">{`${selectedSurah}. ${surahName}`}</h2>
            {arabicAyahs.map((ayah, i) => (
              <div key={i} className="mb-6 pb-4 border-b border-dashed border-gray-300 dark:border-gray-600">
                <p className="text-lg font-bold text-teal-600 dark:text-teal-400 mb-2">আয়াত {i + 1}</p>
                <p className="text-2xl md:text-3xl text-right font-arabic leading-relaxed text-gray-800 dark:text-gray-200">{ayah.text}</p>
                <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">{banglaAyahs[i]?.text || 'অনুবাদ পাওয়া যায়নি'}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold">সূরা নির্বাচন করুন</h2>
            <p className="text-gray-600 dark:text-gray-400">বাম থেকে সূরা নির্বাচন করুন অনুবাদ দেখতে।</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-4">অনেক সময় সূরা লোড হতে কিছুটা সময় লাগতে পারে। দয়া করে একটু অপেক্ষা করুন।</p>
            <p className="text-xs text-gray-500 mt-2">সূরা সংগ্রহ করা হয়েছে <strong>alquran.cloud</strong> থেকে।</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuranPage;