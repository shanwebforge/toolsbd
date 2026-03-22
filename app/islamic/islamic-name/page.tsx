'use client';

import { useState } from 'react';

interface IslamicName {
  english: string;
  arabic: string;
  bangla: string;
  meaning: string;
}

const islamicNames: IslamicName[] = [
  { english: "Ayaan", arabic: "أيّان", bangla: "আয়ান", meaning: "আল্লাহর উপহার" },
  { english: "Maryam", arabic: "مريم", bangla: "মারইয়াম", meaning: "ধার্মিক, পবিত্র" },
  { english: "Zayd", arabic: "زيد", bangla: "যাইদ", meaning: "বৃদ্ধি, উন্নতি" },
  { english: "Fatima", arabic: "فاطمة", bangla: "ফাতিমা", meaning: "মুগ্ধকর" },
  { english: "Hassan", arabic: "حسن", bangla: "হাসান", meaning: "সুন্দর, মোহনীয়" },
  { english: "Abdullah", arabic: "عبد الله", bangla: "আব্দুল্লাহ", meaning: "আল্লাহর দাস" },
  { english: "Yusuf", arabic: "يوسف", bangla: "ইউসুফ", meaning: "আল্লাহ বৃদ্ধি করেন" },
  { english: "Aisha", arabic: "عائشة", bangla: "আয়েশা", meaning: "জীবিত, প্রাণবন্ত" },
  { english: "Khadija", arabic: "خديجة", bangla: "খাদিজা", meaning: "নবী (সা.)-এর প্রথম স্ত্রী" },
  { english: "Omar", arabic: "عمر", bangla: "ওমর", meaning: "দীর্ঘায়ু" },
  { english: "Ibrahim", arabic: "إبراهيم", bangla: "ইব্রাহিম", meaning: "অনেক সন্তানদের পিতা" },
  { english: "Sulaiman", arabic: "سليمان", bangla: "সুলায়মান", meaning: "শান্তির পুরুষ" },
  { english: "Ali", arabic: "علي", bangla: "আলী", meaning: "মহিমান্বিত, মহৎ" },
  { english: "Zainab", arabic: "زينب", bangla: "জয়নব", meaning: "পিতার মূল্যবান রত্ন" },
  { english: "Abbas", arabic: "عباس", bangla: "আব্বাস", meaning: "সিংহ" },
  { english: "Anas", arabic: "أنس", bangla: "আনাস", meaning: "বন্ধুত্বপূর্ণ" },
  { english: "Bilal", arabic: "بلال", bangla: "বিলাল", meaning: "নির্বাচিত, মহান" },
  { english: "Hamza", arabic: "حمزة", bangla: "হামজা", meaning: "সিংহ, শক্তিশালী" },
  { english: "Imran", arabic: "عمران", bangla: "ইমরান", meaning: "সমৃদ্ধি, দীর্ঘজীবী" },
  { english: "Jafar", arabic: "جعفر", bangla: "জাফর", meaning: "ঝরণা" },
  { english: "Laila", arabic: "ليلى", bangla: "লাইলা", meaning: "রাত" },
  { english: "Musa", arabic: "موسى", bangla: "মূসা", meaning: "জল থেকে উত্তোলিত" },
  { english: "Nadia", arabic: "نادية", bangla: "নাদিয়া", meaning: "আহ্বানকারী" },
  { english: "Rashid", arabic: "رشيد", bangla: "রাশিদ", meaning: "সঠিক পথের নেতা" },
  { english: "Safa", arabic: "صفا", bangla: "সাফা", meaning: "পবিত্রতা" },
  { english: "Tariq", arabic: "طارق", bangla: "তারিক", meaning: "প্রভাতের তারা" },
  { english: "Yasin", arabic: "يس", bangla: "ইয়াসিন", meaning: "নেতা, প্রধান" },
  { english: "Zain", arabic: "زين", bangla: "জাইন", meaning: "সৌন্দর্য, অনুগ্রহ" },
  { english: "Amina", arabic: "أمينة", bangla: "আমিনা", meaning: "বিশ্বস্ত, নির্ভরযোগ্য" },
  { english: "Faisal", arabic: "فيصل", bangla: "ফয়সল", meaning: "সিদ্ধান্তমূলক" },
  { english: "Hadi", arabic: "هادي", bangla: "হাদি", meaning: "পথপ্রদর্শক" },
  { english: "Iman", arabic: "إيمان", bangla: "ইমান", meaning: "বিশ্বাস" },
  { english: "Jamil", arabic: "جميل", bangla: "জামিল", meaning: "সুন্দর" },
  { english: "Karim", arabic: "كريم", bangla: "করিম", meaning: "দয়ালু, মহানুভব" },
  { english: "Lina", arabic: "لينا", bangla: "লিনা", meaning: "নরম, কোমল" },
  { english: "Maha", arabic: "مها", bangla: "মাহা", meaning: "জঙ্গলে বসবাসকারী গরু" },
  { english: "Nabil", arabic: "نبيل", bangla: "নাবিল", meaning: "সহজ, মহৎ" },
  { english: "Qasim", arabic: "قاسم", bangla: "কাসিম", meaning: "বণ্টনকারী" },
  { english: "Rania", arabic: "رانية", bangla: "রানিয়া", meaning: "নজর রাখার মানসিকতা" },
  { english: "Sami", arabic: "سامي", bangla: "সামী", meaning: "উচ্চ, মহিমান্বিত" },
  { english: "Tahira", arabic: "طاهرة", bangla: "তাহিরা", meaning: "পবিত্র, বিশুদ্ধ" },
  { english: "Usman", arabic: "عثمان", bangla: "উসমান", meaning: "এক ধরনের পাখি" },
  { english: "Yahya", arabic: "يحيى", bangla: "ইয়াহ্যা", meaning: "জীবিত" },
  { english: "Zahara", arabic: "زهرة", bangla: "জাহারা", meaning: "উজ্জ্বল, দীপ্তিময়" },
  { english: "Abdulrahman", arabic: "عبد الرحمن", bangla: "আব্দুল রহমান", meaning: "করুণাময় আল্লাহর দাস" },
  { english: "Bashir", arabic: "بشير", bangla: "বশির", meaning: "সুখবর আনার" },
  { english: "Dina", arabic: "دينا", bangla: "দিনা", meaning: "ভালোবাসা, ধর্ম" },
  { english: "Ehsan", arabic: "إحسان", bangla: "এহসান", meaning: "সদয়তা, উৎকর্ষতা" },
  { english: "Farah", arabic: "فرح", bangla: "ফারাহ", meaning: "আনন্দ, সুখ" },
  { english: "Ghani", arabic: "غني", bangla: "গনি", meaning: "ধনী, সমৃদ্ধ" },
  { english: "Habib", arabic: "حبيب", bangla: "হাবিব", meaning: "প্রিয়" },
  { english: "Idris", arabic: "إدريس", bangla: "ইদ্রিস", meaning: "অনুবাদক" },
  { english: "Jannah", arabic: "جنة", bangla: "জান্নাত", meaning: "স্বর্গ" },
  { english: "Khalid", arabic: "خالد", bangla: "খালিদ", meaning: "চিরকালীন" },
  { english: "Latifa", arabic: "لطيفة", bangla: "লতিফা", meaning: "সৌম্য, নম্র" },
  { english: "Nora", arabic: "نورة", bangla: "নোরা", meaning: "আলো" },
  { english: "Rashida", arabic: "رشيدة", bangla: "রশিদা", meaning: "বুদ্ধিমান, সঠিক পথে" },
  { english: "Salman", arabic: "سلمان", bangla: "সালমান", meaning: "নিরাপদ, সুরক্ষিত" },
  { english: "Talha", arabic: "طلحة", bangla: "তালহা", meaning: "এক ধরনের গাছ" },
  { english: "Umar", arabic: "عمر", bangla: "উমর", meaning: "জীবনের সময়" },
  { english: "Waleed", arabic: "وليد", bangla: "ওয়ালিদ", meaning: "নবজাতক" },
  { english: "Yumna", arabic: "يمنه", bangla: "ইয়ুমনা", meaning: "সৌভাগ্য" },
  { english: "Zaki", arabic: "زكي", bangla: "জাকী", meaning: "বিশুদ্ধ, ধার্মিক" },
  { english: "Adeel", arabic: "عديل", bangla: "আদিল", meaning: "ন্যায়পরায়ণ" },
  { english: "Bushra", arabic: "بشرى", bangla: "বুশরা", meaning: "সুখবর" },
  { english: "Dawood", arabic: "داود", bangla: "দাউদ", meaning: "প্রিয়" },
  { english: "Eman", arabic: "إيمان", bangla: "ইমান", meaning: "বিশ্বাস" },
  { english: "Farid", arabic: "فريد", bangla: "ফারিদ", meaning: "অনন্য, অনুপম" },
  { english: "Ghassan", arabic: "غسان", bangla: "ঘাসান", meaning: "প্রকৃতির নাম" },
  { english: "Hamid", arabic: "حامد", bangla: "হামিদ", meaning: "প্রশংসক" },
  { english: "Ihsan", arabic: "إحسان", bangla: "ইহসান", meaning: "সদয়তা" },
  { english: "Jamila", arabic: "جميلة", bangla: "জামিলা", meaning: "সুন্দরী" },
  { english: "Khadija", arabic: "خديجة", bangla: "খাদিজা", meaning: "প্রথম নবীর স্ত্রী" },
  { english: "Latif", arabic: "لطيف", bangla: "লতিফ", meaning: "দয়ালু" },
  { english: "Munir", arabic: "منير", bangla: "মুনির", meaning: "দীপ্তিমান" },
  { english: "Nadia", arabic: "نادية", bangla: "নাদিয়া", meaning: "আহ্বানকারী" },
  { english: "Omar", arabic: "عمر", bangla: "ওমর", meaning: "দীর্ঘজীবী" },
  { english: "Parveen", arabic: "برفين", bangla: "পারভীন", meaning: "তারকা" },
  { english: "Qamar", arabic: "قمر", bangla: "কামার", meaning: "চাঁদ" },
  { english: "Rida", arabic: "رضا", bangla: "রিদা", meaning: "সন্তুষ্টি" },
  { english: "Sana", arabic: "ثناء", bangla: "সানা", meaning: "প্রশংসা" },
  { english: "Taha", arabic: "طه", bangla: "তাহা", meaning: "নবীর নাম" },
  { english: "Umair", arabic: "عمير", bangla: "উমাইর", meaning: "বুদ্ধিমান" },
  { english: "Yasmin", arabic: "ياسمين", bangla: "ইয়াসমিন", meaning: "জাসমিন ফুল" },
  { english: "Zainab", arabic: "زينب", bangla: "জয়নব", meaning: "মূল্যবান ফুল" }
];

const IslamicNameFinderPage = () => {
  const [query, setQuery] = useState('');
  const [matchedNames, setMatchedNames] = useState<IslamicName[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value.trim().toLowerCase();
    setQuery(newQuery);

    if (!newQuery) {
      setMatchedNames([]);
      return;
    }

    const matched = islamicNames.filter(name =>
      name.english.toLowerCase().startsWith(newQuery) ||
      name.bangla.toLowerCase().startsWith(newQuery) ||
      name.arabic.startsWith(newQuery)
    );

    setMatchedNames(matched);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-10">
      <div className="container mx-auto max-w-2xl p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-teal-700 dark:text-teal-400 mb-6">ইসলামিক নাম অনুসন্ধান</h2>
        <div className="text-center mb-6">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="ইংরেজি, বাংলা অথবা আরবি নাম লিখুন..."
            className="w-full max-w-md px-4 py-3 text-lg border-2 border-teal-200 dark:border-teal-700 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          />
        </div>

        <div>
          {query && matchedNames.length > 0 && (
            <div className="space-y-4">
              {matchedNames.map((name, index) => (
                <div key={index} className="p-5 bg-teal-50 dark:bg-teal-900/50 rounded-lg shadow-md">
                  <p><strong className="font-semibold text-teal-800 dark:text-teal-300">ইংরেজি নাম:</strong> {name.english}</p>
                  <p><strong className="font-semibold text-teal-800 dark:text-teal-300">আরবি নাম:</strong> {name.arabic}</p>
                  <p><strong className="font-semibold text-teal-800 dark:text-teal-300">বাংলা উচ্চারণ:</strong> {name.bangla}</p>
                  <p className="mt-2"><strong className="font-semibold text-teal-800 dark:text-teal-300">অর্থ:</strong> {name.meaning}</p>
                </div>
              ))}
            </div>
          )}
          {query && matchedNames.length === 0 && (
            <p className="text-center text-red-500 font-bold">এই নামটি খুঁজে পাওয়া যায়নি।</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IslamicNameFinderPage;
