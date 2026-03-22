'use client';

import { useState } from 'react';

const ContractTemplateGenerator = () => {
  const [clientName, setClientName] = useState('');
  const [freelancerName, setFreelancerName] = useState('');
  const [project, setProject] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [terms, setTerms] = useState('');
  const [contract, setContract] = useState('');

  const generateContract = () => {
    if (!clientName || !freelancerName || !project || !date || !amount || !deadline) {
      alert('অনুগ্রহ করে সব আবশ্যক ঘর পূরণ করুন।');
      return;
    }

    const contractText = `
চুক্তিপত্র

এই চুক্তি ${date} তারিখে ${clientName} (যাকে "ক্লায়েন্ট" বলা হবে) এবং ${freelancerName} (যাকে "ফ্রিল্যান্সার" বলা হবে) এর মধ্যে সম্পাদিত হলো।

ফ্রিল্যান্সার ${project} প্রকল্পের দায়িত্ব গ্রহণ করছেন এবং ক্লায়েন্ট এটির জন্য মোট ৳${amount} প্রদান করবেন।

ডেলিভারি সময়সীমা: ${deadline}

অতিরিক্ত শর্তাবলী:
${terms || 'প্রযোজ্য নয়।'}

চুক্তির উভয় পক্ষ এই শর্তাবলীতে সম্মত।
      
_____________________
ক্লায়েন্ট: ${clientName}

_____________________
ফ্রিল্যান্সার: ${freelancerName}
`;

    setContract(contractText);
  };

  const copyContract = () => {
    navigator.clipboard.writeText(contract).then(() => {
      alert("কনট্রাক্ট কপি হয়েছে ✅");
    });
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-lg shadow-2xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">📃 Contract Template Generator</h2>
        <div className="w-48 h-1 bg-rose-500 mx-auto"></div>
        <div className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400">
          <p>Create professional legal contracts quickly</p>
          <p>Choose from various contract templates for freelancers and businesses</p>
          <p>Customize terms, conditions, and clauses according to your needs</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center">Contract Template Generator</h3>

        <label className="font-semibold block mb-1">ক্লায়েন্টের নাম:</label>
        <input
          type="text"
          value={clientName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClientName(e.target.value)}
          placeholder="যেমন: জনাব রাকিব হোসেন"
          className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-rose-500"
        />

        <label className="font-semibold block mb-1">ফ্রিল্যান্সারের নাম:</label>
        <input
          type="text"
          value={freelancerName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFreelancerName(e.target.value)}
          placeholder="যেমন: মোঃ রায়হান ইসলাম"
          className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-rose-500"
        />

        <label className="font-semibold block mb-1">প্রকল্পের নাম / সার্ভিস:</label>
        <input
          type="text"
          value={project}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProject(e.target.value)}
          placeholder="যেমন: ওয়েবসাইট ডিজাইন"
          className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-rose-500"
        />

        <label className="font-semibold block mb-1">চুক্তির তারিখ:</label>
        <input
          type="text"
          value={date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
          placeholder="যেমন: ১ জুলাই ২০২৫"
          className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-rose-500"
        />

        <label className="font-semibold block mb-1">পেমেন্ট পরিমাণ (৳):</label>
        <input
          type="number"
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
          placeholder="যেমন: ১৫,০০০"
          className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-rose-500"
        />

        <label className="font-semibold block mb-1">ডেলিভারি সময়সীমা:</label>
        <input
          type="text"
          value={deadline}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeadline(e.target.value)}
          placeholder="যেমন: ৭ দিন"
          className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-rose-500"
        />

        <label className="font-semibold block mb-1">অতিরিক্ত শর্তাবলী (ঐচ্ছিক):</label>
        <textarea
          value={terms}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTerms(e.target.value)}
          placeholder="যেমন: কাজ চলাকালে অগ্রিম ৫০% পেমেন্ট দিতে হবে।"
          className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 resize-vertical min-h-[80px] focus:ring-2 focus:ring-rose-500"
        ></textarea>

        <button
          onClick={generateContract}
          className="w-full mt-4 px-4 py-2 bg-rose-600 text-white font-semibold rounded-md hover:bg-rose-700 transition-colors"
        >
          ✍️ কনট্রাক্ট তৈরি করুন
        </button>
      </div>

      {contract && (
        <div>
          <div className="mt-8 p-4 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md whitespace-pre-wrap">
            {contract}
          </div>
          <div className="mt-4 flex gap-4">
            <button
              onClick={copyContract}
              className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
            >
              📋 কপি
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
            >
              🖨️ প্রিন্ট
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractTemplateGenerator;
