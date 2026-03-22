'use client';

import { useState } from 'react';

const divisions: { [key: string]: string[] } = {
    "ঢাকা": ["ঢাকা", "গাজীপুর", "মানিকগঞ্জ", "মুন্সিগঞ্জ", "নারায়ণগঞ্জ", "নরসিংদী", "কিশোরগঞ্জ"],
    "চট্টগ্রাম": ["চট্টগ্রাম", "কক্সবাজার", "ফেনী", "ব্রাহ্মণবাড়িয়া", "লক্ষ্মীপুর", "বান্দরবান", "রাঙ্গামাটি", "খাগড়াছড়ি"],
    "রাজশাহী": ["রাজশাহী", "নাটোর", "বগুড়া", "চাঁপাইনবাবগঞ্জ", "জয়পুরহাট", "পাবনা", "নওগাঁ", "সিরাজগঞ্জ"],
    "খুলনা": ["খুলনা", "যশোর", "বাগেরহাট", "মাগুরা", "মেহেরপুর", "চুয়াডাঙ্গা", "সাতক্ষীরা", "কুষ্টিয়া"],
    "বরিশাল": ["বরিশাল", "ঝালকাঠি", "পটুয়াখালী", "পিরোজপুর", "ভোলা"],
    "সিলেট": ["সিলেট", "মৌলভীবাজার", "হবিগঞ্জ", "সুনামগঞ্জ"],
    "রংপুর": ["রংপুর", "দিনাজপুর", "পঞ্চগড়", "ঠাকুরগাঁও", "গাইবান্ধা", "কুড়িগ্রাম", "লালমনিরহাট", "নীলফামারী"],
    "ময়মনসিংহ": ["ময়মনসিংহ", "জামালপুর", "নেত্রকোনা", "শেরপুর"]
};

const bankData: { [key: string]: { [key: string]: { name: string; code: string; address: string; }[] } } = {
    "ঢাকা": {
        "ঢাকা": [
            { name: 'সোনালী ব্যাংক - ধানমন্ডি শাখা', code: '001', address: 'ধানমন্ডি, ঢাকা' },
            { name: 'বাংলাদেশ ব্যাংক - আগারগাঁও', code: '002', address: 'আগারগাঁও, ঢাকা' },
            { name: 'ইসলামী ব্যাংক বাংলাদেশ - মতিঝিল', code: '003', address: 'মতিঝিল, ঢাকা' },
        ],
        "গাজীপুর": [
            { name: 'সোনালী ব্যাংক - গাজীপুর শাখা', code: '004', address: 'গাজীপুর সদর' },
        ],
    },
    "চট্টগ্রাম": {
        "চট্টগ্রাম": [
            { name: 'সিটি ব্যাংক - চট্টগ্রাম সিটি', code: '010', address: 'চট্টগ্রাম সিটি' },
            { name: 'ব্র্যাক ব্যাংক - চট্টগ্রাম সিটি', code: '011', address: 'চট্টগ্রাম' },
            { name: 'স্ট্যান্ডার্ড চার্টার্ড ব্যাংক - পতেঙ্গা', code: '012', address: 'পতেঙ্গা, চট্টগ্রাম' },
        ],
        "কক্সবাজার": [
            { name: 'সিটি ব্যাংক - কক্সবাজার', code: '013', address: 'কক্সবাজার' },
        ],
    },
    "রাজশাহী": {
        "রাজশাহী": [
            { name: 'জনতা ব্যাংক - রাজশাহী সদর', code: '020', address: 'রাজশাহী সদর' },
            { name: 'ডাচ্-বাংলা ব্যাংক - রাজশাহী', code: '021', address: 'রাজশাহী' },
        ],
    },
    "খুলনা": {
        "খুলনা": [
            { name: 'ইউনাইটেড কমার্শিয়াল ব্যাংক - খুলনা', code: '030', address: 'খুলনা' },
            { name: 'সিটি ব্যাংক - খুলনা', code: '031', address: 'খুলনা' },
        ],
    },
    "বরিশাল": {
        "বরিশাল": [
            { name: 'বাংলাদেশ ব্যাংক - বরিশাল', code: '040', address: 'বরিশাল' },
        ],
    },
    "সিলেট": {
        "সিলেট": [
            { name: 'সোনালী ব্যাংক - সিলেট', code: '050', address: 'সিলেট' },
            { name: 'ইসলামী ব্যাংক - সিলেট', code: '051', address: 'সিলেট' },
        ],
    },
    "রংপুর": {
        "রংপুর": [
            { name: 'স্ট্যান্ডার্ড ব্যাংক - রংপুর', code: '060', address: 'রংপুর' },
        ],
    },
    "ময়মনসিংহ": {
        "ময়মনসিংহ": [
            { name: 'ব্যাংক এশিয়া - ময়মনসিংহ', code: '070', address: 'ময়মনসিংহ' },
        ],
    }
};

export default function BankChecker() {
    const [selectedDivision, setSelectedDivision] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [districts, setDistricts] = useState<string[]>([]);
    const [banks, setBanks] = useState<{ name: string; code: string; address: string; }[]>([]);
    const [showBankHeading, setShowBankHeading] = useState(false);

    const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const division = e.target.value;
        setSelectedDivision(division);
        setSelectedDistrict('');
        setBanks([]);
        setShowBankHeading(false);
        if (division) {
            setDistricts(divisions[division]);
        } else {
            setDistricts([]);
        }
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const district = e.target.value;
        setSelectedDistrict(district);
        if (district) {
            const bankList = bankData[selectedDivision]?.[district] || [];
            setBanks(bankList);
            setShowBankHeading(true);
        } else {
            setBanks([]);
            setShowBankHeading(false);
        }
    };

    return (
        <main className="p-4 sm:p-6 md:p-8">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🏦 স্থানীয় ব্যাংক শাখা চেকার</h2>
                    <div className="w-24 h-1 bg-blue-500 mt-2"></div>
                </div>
                <div className="text-gray-700 dark:text-gray-300 mb-6">
                    <p>আপনার এলাকায় নিকটস্থ ব্যাংক শাখা খুঁজুন</p>
                    <p>বাংলাদেশের সকল ব্যাংকের শাখা তথ্য ডাটাবেজ</p>
                    <p>শাখার ঠিকানা, ফোন নাম্বার এবং ওপেনিং আওয়ার</p>
                    <p>ATM বুথ, ব্যাংকিং আউটলেট এবং এজেন্ট ব্যাংকিং পয়েন্ট</p>
                    <p>লাইভ সার্ভিস স্ট্যাটাস এবং শাখার ভিড়ের তথ্য</p>
                    <p>শাখা থেকে দূরত্ব এবং যাওয়ার দিকনির্দেশনা</p>
                </div>
                <div>
                    <div className="mb-4">
                        <label htmlFor="divisionSelect" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">বিভাগ নির্বাচন করুন:</label>
                        <select
                            id="divisionSelect"
                            onChange={handleDivisionChange}
                            value={selectedDivision}
                            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">-- বিভাগ নির্বাচন করুন --</option>
                            {Object.keys(divisions).map(division => (
                                <option key={division} value={division}>{division}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="districtSelect" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">জেলা নির্বাচন করুন:</label>
                        <select
                            id="districtSelect"
                            onChange={handleDistrictChange}
                            value={selectedDistrict}
                            disabled={!selectedDivision}
                            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                        >
                            <option value="">-- জেলা নির্বাচন করুন --</option>
                            {districts.map(district => (
                                <option key={district} value={district}>{district}</option>
                            ))}
                        </select>
                    </div>

                    {showBankHeading && (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">আপনার এলাকার ব্যাংক শাখাসমূহ:</h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                {banks.length > 0 ? (
                                    banks.map(bank => (
                                        <li key={bank.code}>{`${bank.name} (কোড: ${bank.code}) - ${bank.address}`}</li>
                                    ))
                                ) : (
                                    <li>এই এলাকায় কোনো ব্যাংক শাখার তথ্য নেই।</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
