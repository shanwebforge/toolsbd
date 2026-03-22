'use client';

import { useState, useEffect, useMemo } from 'react';

interface Ayah {
  number: number;
  numberInSurah: number;
  arabicText: string;
  banglaText: string;
}

interface Surah {
  number: number;
  name: string;
  nameArabic: string;
  ayahs: Ayah[];
}

const QuranSearchPage = () => {
  const [combinedQuran, setCombinedQuran] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [arabicResponse, banglaResponse] = await Promise.all([
          fetch('https://api.alquran.cloud/v1/quran/quran-uthmani'),
          fetch('https://api.alquran.cloud/v1/quran/bn.bengali'),
        ]);

        const arabicData = await arabicResponse.json();
        const banglaData = await banglaResponse.json();

        if (!arabicData.data || !banglaData.data) {
          throw new Error("Invalid API response");
        }

        const combined = arabicData.data.surahs.map((surah: any) => {
          const banglaSurah = banglaData.data.surahs.find((s: any) => s.number === surah.number);
          return {
            number: surah.number,
            name: surah.englishName,
            nameArabic: surah.name,
            ayahs: surah.ayahs.map((ayah: any) => {
              const banglaAyah = banglaSurah?.ayahs.find((a: any) => a.number === ayah.number);
              return {
                number: ayah.number,
                numberInSurah: ayah.numberInSurah,
                arabicText: ayah.text,
                banglaText: banglaAyah?.text || 'অনুবাদ পাওয়া যায়নি',
              };
            }),
          };
        });

        setCombinedQuran(combined);
        setLoading(false);
      } catch (err) {
        setError('ডেটা লোড করতে সমস্যা হয়েছে। ইন্টারনেট কানেকশন চেক করুন অথবা পরে আবার চেষ্টা করুন।');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const performSearch = (query: string) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    const normalizedQuery = query.trim().toLowerCase();
    const matches: any[] = [];

    for (const surah of combinedQuran) {
      for (const ayah of surah.ayahs) {
        if (
          ayah.arabicText.toLowerCase().includes(normalizedQuery) ||
          ayah.banglaText.toLowerCase().includes(normalizedQuery)
        ) {
          matches.push({
            surahNumber: surah.number,
            surahName: surah.name,
            surahNameArabic: surah.nameArabic,
            ayahNumber: ayah.numberInSurah,
            arabicText: ayah.arabicText,
            banglaText: ayah.banglaText,
          });
        }
      }
    }
    setSearchResults(matches.slice(0, 100));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    performSearch(query);
  };

  const highlightedText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="bg-yellow-200 dark:bg-yellow-600">$1</span>');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">Quran Search Tool</h2>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="আয়াত খুঁজুন (বাংলা বা العربية)..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full py-3 pl-4 pr-12 text-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 transition"
          />
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        {loading && <p className="text-center text-lg">কুরআন লোড হচ্ছে, অপেক্ষা করুন...</p>}
        {error && <p className="text-center text-lg text-red-500">{error}</p>}

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {!loading && !error && searchResults.length > 0 && (
            searchResults.map((match, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
                <p className="font-bold text-lg text-teal-700 dark:text-teal-400 mb-2">
                  সুরা {match.surahNumber}: {match.surahName} ({match.surahNameArabic}), আয়াত {match.ayahNumber}
                </p>
                <p
                  className="text-xl leading-relaxed text-right font-arabic text-gray-800 dark:text-gray-100 mb-2"
                  dangerouslySetInnerHTML={{ __html: highlightedText(match.arabicText, searchTerm) }}
                ></p>
                <p
                  className="text-md leading-relaxed text-gray-700 dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: highlightedText(match.banglaText, searchTerm) }}
                ></p>
              </div>
            ))
          )}
          {!loading && !error && searchTerm.length > 1 && searchResults.length === 0 && (
            <p className="text-center text-lg">`{searchTerm}` এর জন্য কোন ফলাফল পাওয়া যায়নি।</p>
          )}
           {!loading && !error && searchTerm.length <= 1 && (
            <p className="text-center text-lg">কুরআন লোড সম্পন্ন। এখন আয়াত খুঁজুন।</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuranSearchPage;
