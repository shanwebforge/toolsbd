
"use client";

import { useState } from 'react';

const FontPreviewPage = () => {
  const fonts = [
    'Adorsho Lipi','Anek Bangla','Atma','Baloo Da 2','BenSen Handwriting',
    'Galada','Hind Siliguri','Kalpurush','Mina','Mukti','Noto Sans Bengali',
    'Noto Serif Bengali','Siyam Rupali','Tiro Bangla','UN Bangla',
    'Sutonny MJ','Solaiman Lipi','Apona Lohit','Ekushey Bangla','Likhan',
    'Rupali','BanglaMN','Mitra','Prothoma','Rajon Shoily','Charukola',
    'Ekushey Mukto','AB Shapla','Himel Borno','Baraka','Ekushey Saraswatii',
    'Akash','Hoogli','Aikya','Sapa','Kala','Bensen','Bornoporichay','Sunar Bangla',
    'Mamun Bornolipi','Hasan Priyotoma','Srabondhara','Mahfuj Raiyan','Helal Laveriya',
    'Linda Bangla','Ekushey Lal Sabuj','Bornomala','Chitra MJ','Tuli','Vrinda',
    'Amar Desh','Kongsho MJ','Chandrabati MJ','Kalindi MJ','Teeshta MJ','Mohanonda MJ',
    'Nota Sans','Prothoma Light','Kumarkhali MJ','LikhoKotha','Swopno','Moyna Unicode',
    'Buriganga','Sundori Unicode','Ekush','Priyo Nabi','Aborton','Mahin Shefa','Mahin Sayedi',
    'Shonar Bangla','Bornoporichay',
  ];

  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [text, setText] = useState('এখানে বাংলা লেখা লিখুন...');

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">🔤 বাংলা ফন্ট প্রিভিউ টুল</h2>
        <div className="w-24 h-1 bg-indigo-500 mx-auto mt-2"></div>
        <div className="mt-4 text-gray-600 dark:text-gray-300">
          <p>বাংলা ফন্টের প্রিভিউ এবং পরীক্ষার সুবিধা</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fontSelect" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">ফন্ট নির্বাচন করুন:</label>
            <select 
              id="fontSelect" 
              value={selectedFont} 
              onChange={(e) => setSelectedFont(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
            >
              {fonts.map(font => <option key={font} value={font}>{font}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="textInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">ফন্ট প্রিভিউ:</label>
            <input 
              id="textInput"
              type="text" 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              placeholder="এখানে বাংলা লেখা লিখুন..."
            />
          </div>
        </div>

        <div 
          className="mt-6 p-5 min-h-[200px] text-4xl border-2 border-dashed border-indigo-300 dark:border-indigo-600 rounded-lg flex items-center justify-center"
          style={{ fontFamily: `'${selectedFont}', sans-serif` }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

export default FontPreviewPage;
